<?php

namespace Database\Seeders;

use App\Models\ProductCategory;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        foreach (range(1, 50) as $i) {
            ProductCategory::create([
                'category_id' => rand(9, 25),
                'product_id' => $i,
            ]);
        }
    }
}
