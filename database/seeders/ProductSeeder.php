<?php

namespace Database\Seeders;

use Alirezasedghi\LaravelImageFaker\Services\Picsum;
use App\Models\Product;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        foreach(range(1, 50) as $_) {

            Product::create([
                'title' => fake()->sentence(rand(2, 5)),
                'description' => fake()->realText(rand(50, 200)),
                'image' => (new Picsum())->imageUrl(800, 600) . "?random=" . rand(1000, 9999),
                'price' => fake()->randomFloat(2, 2, 5),
            ]);
        }
    }
}
