<?php

namespace Database\Seeders;

use Alirezasedghi\LaravelImageFaker\Services\Picsum;
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

        Category::create([
            'title' => 'men',
            'description' => fake()->realText(),
            'image' => $this->generateImageUrl(),
        ]);

        Category::create([
            'title' => 'women',
            'description' => fake()->realText(),
            'image' => $this->generateImageUrl(),
        ]);

        foreach ($categories as $category) {

            Category::create([
                'title' => $category,
                'parent_id' => rand(1, 2),
                'description' => fake()->realText(),
                'image' => $this->generateImageUrl(),
            ]);
        }

        foreach ($subCategories as $subCategory) {

            Category::create([
                'title' => $subCategory,
                'parent_id' => rand(3, count($categories) + 2),
                'description' => fake()->realText(),
                'image' => $this->generateImageUrl(),
            ]);
        }
    }

    public static function categories()
    {
        return ([
            'clothing',
            'accessories',
            'brands',
            'carry',
            'shoes',
            'new arrivals',
        ]);
    }

    public static function subCategories()
    {
        return ([
            'tops',
            'pants',
            'sweaters',
            't-shirts',
            'jackets',
            'activewear',
            'watches',
            'wallets',
            'bags',
            'sunglasses',
            'hats',
            'belts',
            'sneakers',
            'boots',
            'flats',
            'socks',
            'sandals',
        ]);
    }

    private function generateImageUrl(): string
    {
        return 'https://picsum.photos/800/600?random=' . rand(1000, 9999);
    }
}
