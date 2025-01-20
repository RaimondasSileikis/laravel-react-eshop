<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Admin;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {

        $this->call([
            AdminSeeder::class,
            UserSeeder::class,
            CountrySeeder::class,
            CategorySeeder::class,
            ProductSeeder::class,
            ProductCategorySeeder::class,
            OrderItemSeeder::class,
            OrderSeeder::class,
        ]);
    }
}
