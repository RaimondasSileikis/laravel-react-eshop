<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\AdminOrderIndexRequest;
use App\Http\Resources\OrderResource;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;


class OrderController extends Controller
{
    public function index(AdminOrderIndexRequest $request)
    {
        $validated = $request->validated();
        $search = $validated['search'] ?? '';
        $sortField = $validated['sort_field'] ?? 'created_at';
        $sortDirection = $validated['sort_direction'] ?? 'desc';

        $query = Order::with('user', 'orderItems.product')
            ->whereHas('orderItems.product', function ($query) use ($search) {
                $query->where('title', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%");
            });

        if ($sortField === 'user_name') {
            $query->join('users', 'orders.user_id', '=', 'users.id')
                ->select('orders.*') // Select only the orders fields
                ->orderBy('users.name', $sortDirection);
        } else {
            $query->orderBy($sortField, $sortDirection);
        }

        $orders = $query->paginate(10);

        return OrderResource::collection($orders);
    }

    public function show($id)
    {
        $order = Order::with('user', 'orderItems.product')
            ->find($id);

        if (!$order) {
            return response()->json(['error' => 'Order not found'], 404);
        }

        return response()->json(['data' => $order], 200);
    }

    public function update(Request $request, $id)
    {
        $order = Order::find($id);

        if (!$order) {
            return response()->json(['error' => 'Order not found'], 404);
        }

        $validated = $request->validate([
            'status' => 'required|in:unpaid,paid,cancelled,shipped,completed',
        ]);

        $order->update([
            'status' => $validated['status'],
        ]);

        return response()->json(['message' => 'Order updated successfully', 'data' => $order], 200);
    }

    public function destroy($id)
    {
        $order = Order::find($id);

        if (!$order) {
            return response()->json(['error' => 'Order not found'], 404);
        }

        DB::transaction(function () use ($order) {
            $order->orderItems()->delete();
            $order->delete();
        });

        return response()->json(['message' => 'Order deleted successfully'], 200);
    }

    public function getStatuses()
    {
        return response()->json([
            'statuses' => ['unpaid', 'paid', 'cancelled', 'shipped', 'completed'],
        ]);
    }
}
