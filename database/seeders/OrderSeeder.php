<?php

namespace Database\Seeders;

use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class OrderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        foreach (range(2, 50) as $_) {

            $order = Order::create([
                'user_id' => rand(2, 49),
                'status' => self::statuses()[rand(0, count(self::statuses()) - 1)],
                'total_price' => 0,
            ]);

            $totalPrice = OrderItem::where('order_id', $order->id)
                ->get()
                ->reduce(function ($carry, $item) {
                    return $carry + ($item->quantity * $item->unit_price);
                }, 0);

            $order->update(['total_price' => $totalPrice]);
        }
    }

    public static function statuses()
    {
        return (['unpaid', 'paid', 'cancelled', 'shipped', 'completed']
        );
    }
}
