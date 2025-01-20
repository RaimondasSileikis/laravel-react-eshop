<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\AdminCategoryRequest;
use App\Http\Resources\CategoryResource;
use App\Models\Category;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Str;

class CategoryController extends Controller

{
    public function index()
    {
        $search = request('search', '');
        $sortField = request('sort_field', 'updated_at');
        $sortDirection = request('sort_direction', 'desc');
        $categoriesParent = request('sort_category', null);
        $fetchAll = request('all', false);

        $query = Category::query()
            ->where(function ($q) use ($search) {
                $q->where('categories.title', 'like', "%{$search}%")
                    ->orWhere('categories.description', 'like', "%{$search}%");
            })
            ->when($categoriesParent, function ($q) use ($categoriesParent) {
                $q->where('categories.parent_id', $categoriesParent);
            })
            ->orderBy($sortField, $sortDirection);

        if ($fetchAll) {
            $categories = $query->get();
        } else {
            $categories = $query->paginate(10);
        }

        return CategoryResource::collection($categories);
    }

    public function show($id)
    {
        $category = Category::find($id);

        if (!$category) {
            return response()->json(['message' => 'category not found'], 404);
        }

        return new CategoryResource($category);
    }

    public function store(AdminCategoryRequest $request)
    {
        $data = $request->validated();

        if ($request->hasFile('image')) {
            $data['image'] = $this->handleImageUpload($request->file('image'));
        }

        $data['created_by'] = $request->user()->id;
        $data['updated_by'] = $request->user()->id;
        $category = Category::create($data);

        return new CategoryResource($category);
    }

    public function update(AdminCategoryRequest $request, Category $category)
    {
        $data = $request->validated();

        if ($request->hasFile('image')) {
            if ($category->image && Storage::exists($category->image)) {
                Storage::delete($category->image);
            }

            $data['image'] = $this->handleImageUpload($request->file('image'));
        }

        $data['updated_by'] = $request->user()->id;

        $category->update($data);
        return response()->json([
            'success' => true,
            'message' => 'Category updated successfully',
            'data' => new CategoryResource($category),
        ]);
    }

    public function destroy(Category $category)
    {
        if ($category->image_url && Storage::exists($category->image_url)) {
            Storage::delete($category->image_url);
        }

        $category->delete();

        return response()->json([
            'success' => true,
            'message' => 'Category deleted successfully',
        ]);
    }

    private function handleImageUpload($image)
    {
        $path = 'uploads/categories/' . Str::random(10);

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
