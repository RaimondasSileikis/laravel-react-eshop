<?php

namespace App\Http\Controllers;

use App\Http\Resources\OrderResource;
use App\Models\CartItem;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{

    public function index(Request $request)
    {
        $user = $request->user();

        $orders = Order::with(['orderItems.product'])
            ->where('user_id', $user->id)
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json([
            'message' => 'Orders fetched successfully',
            'orders' => OrderResource::collection($orders),
        ]);
    }

    public function show($id, Request $request)
    {
        $user = $request->user();

        $order = Order::with(['orderItems.product'])
            ->where('id', $id)
            ->where('user_id', $user->id)
            ->first();

        if (!$order) {
            return response()->json([
                'message' => 'Order not found or unauthorized access',
            ], 404);
        }

        return response()->json([
            'message' => 'Order fetched successfully',
            'order' => new OrderResource($order),
        ]);
    }

    public function store(Request $request)
    {
        $user = $request->user();

        $cartItems = CartItem::where('user_id', $user->id)->with('product')->get();

        if ($cartItems->isEmpty()) {
            return response()->json(['error' => 'Cart is empty'], 400);
        }

        DB::transaction(function () use ($user, $cartItems) {

            $order = Order::create([
                'user_id' => $user->id,
                'total_price' => $cartItems->sum(fn($item) => $item->product->price * $item->quantity),
            ]);

            foreach ($cartItems as $cartItem) {
                OrderItem::create([
                    'order_id' => $order->id,
                    'product_id' => $cartItem->product_id,
                    'quantity' => $cartItem->quantity,
                    'unit_price' => $cartItem->product->price,
                ]);
            }

            CartItem::where('user_id', $user->id)->delete();
        });

        return response()->json(['message' => 'Order placed successfully']);
    }
}
