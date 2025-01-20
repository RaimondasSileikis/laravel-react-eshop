<?php

namespace App\Http\Controllers;

use App\Http\Resources\CategoryResource;
use App\Http\Resources\ProductResource;
use App\Models\Category;
use App\Models\Product;
use Exception;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class ProductController extends Controller
{
    public function getAllProducts()
    {
        $query = $this->buildProductQuery();
        $allProducts = $query->get();

        $categoryIds = $allProducts->pluck('categories')
            ->flatten()
            ->pluck('id')
            ->unique()
            ->toArray();

        $categories = $this->getAllCategoriesByIds($categoryIds);
        $products = $query->paginate(10);

        return $this->buildResponse($products, $categories);
    }

    public function getProductsByCategory($slug)
    {
        $query = $this->buildProductQuery();

        try {
            $category = Category::where('slug', $slug)->firstOrFail();
            $categories = Category::getAllChildrenByParent($category);
            $categoryIds = array_map(fn($c) => $c->id, $categories);

            $products = $query
                ->select('products.*')
                ->join('product_categories AS pc', 'pc.product_id', '=', 'products.id')
                ->whereIn('pc.category_id', $categoryIds)
                ->paginate(10);

            return $this->buildResponse($products, $categories );

        } catch (ModelNotFoundException $e) {
            return response()->json(['status' => 404, 'message' => 'Category not found']);
        }
    }

    public function getProductBySlug(Product $product)
    {
        if (!$product->status) {
            return response('', 404);
        }
        return new ProductResource($product);
    }

    private function getAllCategoriesByIds(array $categoryIds)
    {
        $allCategories = collect();

        foreach ($categoryIds as $categoryId) {
            $category = Category::find($categoryId);

            if ($category) {
                $childrenCategories = collect(Category::getAllChildrenByParent($category));
                $parentCategories = collect(Category::getAllParents($category));

                $allCategories = $allCategories->merge($childrenCategories)
                    ->merge($parentCategories);
            }
        }
        return $allCategories->unique('id')->values()->sortBy('title');
    }

    /**
     * Build the base product query with filters and sorting.
     *
     * @return \Illuminate\Database\Eloquent\Builder
     */
    private function buildProductQuery()
    {
        $search = request('search', '');
        $sortField = request('sort_field', 'updated_at');
        $sortDirection = request('sort_direction', 'desc');

        return Product::query()
            ->where(function ($q) use ($search) {
                $q->where('products.title', 'like', "%{$search}%")
                    ->orWhere('products.description', 'like', "%{$search}%");
            })
            ->orderBy($sortField, $sortDirection);
    }
    /**
     * Build a JSON response with products and categories.
     *
     * @param \Illuminate\Pagination\LengthAwarePaginator $products
     * @param \Illuminate\Support\Collection $categories
     * @return \Illuminate\Http\JsonResponse
     */
    private function buildResponse($products, $categories)
    {
        $meta = [
            'current_page' => $products->currentPage(),
            'from' => $products->firstItem(),
            'last_page' => $products->lastPage(),
            'links' => $products->linkCollection()->toArray(),
            'path' => $products->path(),
            'per_page' => $products->perPage(),
            'to' => $products->lastItem(),
            'total' => $products->total(),
        ];

        $links = [
            'first' => $products->url(1),
            'last' => $products->url($products->lastPage()),
            'next' => $products->nextPageUrl(),
            'prev' => $products->previousPageUrl(),
        ];

        return response()->json([
            'products' => ProductResource::collection($products),
            'categories' => CategoryResource::collection($categories),
            'meta' => $meta,
            'links' => $links,
        ]);
    }
}
