<?php

namespace App\Models;

use App\Http\Resources\CategoryResource;
use App\Http\Resources\ProductListResource;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;

class Category extends Model
{
    use HasFactory;
    use HasSlug;

    protected $fillable = [
        'title',
        'description',
        'status',
        'image',
        'parent_id',
        'created_at',
        'updated_at'
    ];

    /**
     * Get the options for generating the slug.
     */
    public function getSlugOptions(): SlugOptions
    {
        return SlugOptions::create()
            ->generateSlugsFrom('title')
            ->saveSlugsTo('slug');
    }


    public function parent()
    {
        return $this->belongsTo(Category::class, 'parent_id');
    }


    public function products()
    {
        return $this->belongsToMany(Product::class, 'product_categories'); // product_category
    }


    public function childrens()
    {
        return $this->hasMany(Category::class, 'parent_id');
    }


    /**
     * Get all featured products from children categories.
     *
     * @return \Illuminate\Support\Collection
     */
    public function featured()
    {
        $allProducts = collect();
        $allCategories = self::getAllChildrenByParent($this);

        foreach ($allCategories as $category) {
            $allProducts = $allProducts->merge($category->products->where('featured', 'Active'));
        }

        return $allProducts;
    }



    public static function getAllChildrenByParent(Category $category)
    {
        $categories = Category::where('status', 'Active')->orderBy('parent_id')->get();
        $result[] = $category;
        self::getCategoriesArray($categories, $category->id, $result);

        return $result;
    }


    private static function getCategoriesArray($categories, $parentId, &$result)
    {
        foreach ($categories as $category) {
            if ($category->parent_id === $parentId) {
                $result[] = $category;
                self::getCategoriesArray($categories, $category->id, $result);
            }
        }
    }



    public static function getActiveAsTree($resourceClassName = null)
    {
        $categories = Category::where('status', 'Active')->orderBy('parent_id')->get();
        return self::buildCategoryTree($categories, null, $resourceClassName);
    }


    private static function buildCategoryTree($categories, $parentId = null, $resourceClassName = null)
    {
        $categoryTree = [];

        foreach ($categories as $category) {
            if ($category->parent_id === $parentId) {
                $children = self::buildCategoryTree($categories, $category->id, $resourceClassName);
                if ($children) {
                    $category->setAttribute('children', $children);
                }
                $categoryTree[] = $resourceClassName ? new $resourceClassName($category) : $category;
            }
        }

        return $categoryTree;
    }
}
