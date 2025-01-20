<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Product;
use App\Models\User;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function getOverview()
    {
        $totalOrders = Order::count();
        $totalRevenue = Order::where('status', 'completed')->sum('total_price');
        $totalUsers = User::where('is_admin', 'false')->count();
        $totalProducts = Product::count();
        $pendingOrders = Order::where('status', 'unpaid')->count();

        $data = [
            'totalOrders' => $totalOrders,
            'totalRevenue' => $totalRevenue,
            'totalUsers' => $totalUsers,
            'totalProducts' => $totalProducts,
            'pendingOrders' => $pendingOrders,
        ];

        return response()->json($data);
    }
}
