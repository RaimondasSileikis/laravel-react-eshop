<?php

namespace App\Http\Controllers;

use App\Http\Resources\CategoryResource;
use App\Http\Resources\CategoryTreeResource;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function getCategoryBySlug($slug)
    {
        $category = Category::where('slug', $slug)->first();

        if (!$category->status) {
            return response('', 404);
        }

        $category->load('children');
        return new CategoryResource($category);
    }

    public function getAsTree()
    {
        return Category::getActiveAsTree(CategoryTreeResource::class);
    }
}
