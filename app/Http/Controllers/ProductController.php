<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProductListByCategoryResource;
use App\Http\Resources\ProductListResource;
use App\Http\Resources\ProductResource;
use App\Models\Category;
use App\Models\Product;
use Exception;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;

class ProductController extends Controller
{

    public function index()
    {
        $query = Product::query();
        return $this->renderProducts($query);
    }


    public function byCategory($slug)
    {
        try {
            $category = Category::where('slug', $slug)->firstOrFail();

            $categories = Category::getAllChildrenByParent($category);
            $query = Product::query()
                ->select('products.*')
                ->join('product_categories AS pc', 'pc.product_id', 'products.id')
                ->whereIn('pc.category_id', array_map(fn ($c) => $c->id, $categories));

            return $this->renderProducts($query);
        } catch (ModelNotFoundException $e) {
            return response()->json(['status' => 404, 'message' => 'Category not found']);
        }
    }

    public function getBySlug(Product $product)
    {
        if (!$product->status) {
            return response('', 404);
        }

        return new ProductResource($product);
    }

    private function renderProducts($query)
    {
        $perPage = request('per_page', 10);
        $search = request('search', '');
        $sortField = request('sort_field', 'created_at');
        $sortDirection = request('sort_direction', 'desc');

        $products = $query
            ->where('status', 'Active')
            ->where('title', 'like', "%{$search}%")
            ->orWhere('products.description', 'like', "%$search%")
            ->orderBy($sortField, $sortDirection)
            ->paginate($perPage);
        return ProductListResource::collection($products);
    }
}
