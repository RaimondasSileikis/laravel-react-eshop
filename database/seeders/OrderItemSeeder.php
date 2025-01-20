<?php

namespace Database\Seeders;

use App\Models\OrderItem;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class OrderItemSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
         foreach(range(1, 50) as $_) {

            OrderItem::create([
                'order_id' => rand(1, 50),
                'product_id' => rand(1, 50),
                'quantity' => rand(1, 10),
                'unit_price' => fake()->randomFloat(2, 2, 5),
            ]);
        }
    }
}
