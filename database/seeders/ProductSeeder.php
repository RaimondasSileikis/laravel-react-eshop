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
        $imageFaker = (new Picsum())->imageUrl(width: 800, height: 600);
      


        foreach(range(1, 100) as $_) {

            Product::create([
                'title' => fake()->sentence(rand(2, 5)),
                'description' => fake()->realText(rand(50, 200)),
                'image' => $imageFaker,
                'price' => fake()->randomFloat(2, 2, 5),
            ]);
        }
    }






}
