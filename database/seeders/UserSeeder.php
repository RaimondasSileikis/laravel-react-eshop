<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'name' => 'shopper',
            'email' => 'shopper@example.com',
            'is_admin' => 0,
            'password' => Hash::make('shopper123')
        ]);

        User::factory(50)->create();
    }
}
