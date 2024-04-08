<?php

namespace App\Http\Controllers;

use App\Http\Resources\CategoryResource;
use App\Http\Resources\CategoryTreeResource;
use App\Models\Category;

class CategoryController extends Controller
{
    public function index()
    {
        $sortField = request('sort_field', 'updated_at');
        $sortDirection = request('sort_direction', 'desc');

        $categories = Category::query()
            ->orderBy($sortField, $sortDirection)
            ->latest()
            ->get();

        return CategoryResource::collection($categories);
    }

    public function getBySlug($slug)
    {
        $category = Category::where('slug', $slug)->first();

        if (!$category->status) {
            return response('', 404);
        }

        $category->load('childrens');
        return new CategoryResource($category);
    }


    public function getAsTree()
    {
        return Category::getActiveAsTree(CategoryTreeResource::class);
    }

}
