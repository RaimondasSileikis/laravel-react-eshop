<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        $categories = self::categories();
        $subCategories = self::subCategories();
        $width = 640;
        $height = 480;

        Category::create([
            'title' => 'men',
            'description' => fake()->realText(),
            // 'image' => fake()->imageUrl($width, $height, 'men'),
            'image' => "https://tailwindui.com/img/ecommerce-images/home-page-04-collection-01.jpg",
        ]);

        Category::create([
            'title' => 'women',
            'description' => fake()->realText(),
            // 'image' => fake()->imageUrl($width, $height, 'women'),
            'image' => "https://tailwindui.com/img/ecommerce-images/home-page-04-collection-02.jpg",
        ]);


        foreach ($categories as $category) {

            Category::create([
                'title' => $category,
                'parent_id' => rand(1, 2),
                'description' => fake()->realText(),
                'image' => fake()->imageUrl($width, $height, $category),
            ]);
        }


        foreach ($subCategories as $subCategory) {

            Category::create([
                'title' => $subCategory,
                'parent_id' => rand(3, count($categories) + 2),
                'description' => fake()->realText(),
                'image' => fake()->imageUrl($width, $height, $subCategory),
            ]);
        }
    }
    public static function categories()
    {
        return ([
            'clothing', 'accessories', 'brands', 'carry', 'shoes', 'new arrivals',

        ]);
    }
    public static function subCategories()
    {
        return ([

            'tops', 'pants', 'sweaters', 't-shirts', 'jackets', 'activewear', 'watches', 'wallets', 'bags', 'sunglasses', 'hats', 'belts', 'sneakers', 'boots', 'flats', 'socks', 'sandals',
        ]);
    }
}
