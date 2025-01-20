<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\AdminProductRequest;
use App\Http\Resources\ProductResource;
use App\Models\Product;
use App\Models\ProductCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Str;

class ProductController extends Controller
{

    public function index()
    {
        $search = request('search', '');
        $sortField = request('sort_field', 'updated_at');
        $sortDirection = request('sort_direction', 'desc');

        $products = Product::query()
            ->where(function ($q) use ($search) {
                $q->where('products.title', 'like', "%{$search}%")
                    ->orWhere('products.description', 'like', "%{$search}%");
            })
            ->orderBy($sortField, $sortDirection)
            ->paginate(10);

        return ProductResource::collection($products);
    }

    public function show($id)
    {
        $product = Product::with('categories')->findOrFail($id);

        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }

        return new ProductResource($product);
    }

    public function store(AdminProductRequest $request)
    {
        $data = $request->validated();

        if ($request->hasFile('image')) {
            $data['image'] = $this->handleImageUpload($request->file('image'));
        }

        $data['created_by'] = $request->user()->id;
        $data['updated_by'] = $request->user()->id;
        $product = Product::create($data);

        if (isset($data['category_id'])) {
            $this->saveCategory($data['category_id'], $product->id);
        }

        return new ProductResource($product);
    }

    public function update(AdminProductRequest $request, Product $product)
    {
        $data = $request->validated();

        if ($request->hasFile('image')) {
            if ($product->image && Storage::exists($product->image)) {
                Storage::delete($product->image);
            }

            $data['image'] = $this->handleImageUpload($request->file('image'));
        }

        $data['updated_by'] = $request->user()->id;

        $product->update($data);

        if (isset($data['category_id'])) {
            $this->saveCategory($data['category_id'], $product->id);
        }

        return response()->json([
            'success' => true,
            'message' => 'Product updated successfully',
            'data' => new ProductResource($product),
        ]);
    }

    public function destroy(Product $product)
    {
        $product->categories()->detach();

        if ($product->image_url && Storage::exists($product->image_url)) {
            Storage::delete($product->image_url);
        }

        $product->delete();

        return response()->json([
            'success' => true,
            'message' => 'Product deleted successfully',
        ]);
    }

    private function saveCategory($categoryId, $productId)
    {
        ProductCategory::where('product_id', $productId)->delete();

        $data = [
            'category_id' => $categoryId,
            'product_id' => $productId,
        ];
        $result = ProductCategory::create($data);
    }

    private function handleImageUpload($image)
    {
        $path = 'uploads/products/' . Str::random(10);

        if (!Storage::exists($path)) {
            Storage::makeDirectory($path, 0755, true);
        }

        $name = Str::random(10) . '.' . $image->getClientOriginalExtension();

        if (!Storage::putFileAs('public/' . $path, $image, $name)) {
            throw new \Exception("Unable to save file \"{$image->getClientOriginalName()}\"");
        }

        $relativePath = $path . '/' . $name;

        return URL::to(Storage::url($relativePath));
    }
}
