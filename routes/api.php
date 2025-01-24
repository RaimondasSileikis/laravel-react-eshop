<?php

use App\Http\Controllers\Admin\AdminAuthController;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\UserAuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Authentication Routes
Route::prefix('auth')->group(function () {
    Route::post('sign-up', [AuthController::class, 'signUp'])->name('auth.signUp');
    Route::post('login', [AuthController::class, 'login'])->name('auth.login');
});

Route::middleware('auth:sanctum')->group(function () {
    Route::prefix('auth')->group(function () {
        Route::get('/get-me', [AuthController::class, 'getMe'])->name('auth.getMe');
        Route::post('/user-logout', [AuthController::class, 'logout'])->name('auth.logout');
    });
});

// Shop Routes
Route::prefix('shop')->group(function () {
    Route::prefix('categories')->group(function () {
        Route::get('tree', [CategoryController::class, 'getAsTree'])->name('shop.categories.tree');
        Route::get('get-category-by-slug/{category:slug}', [CategoryController::class, 'getCategoryBySlug'])->name('shop.categories.getBySlug');
    });

    Route::prefix('products')->group(function () {
        Route::get('{category:slug}', [ProductController::class, 'getProductsByCategory'])->name('shop.products.getByCategory');
        Route::get('/', [ProductController::class, 'getAllProducts'])->name('shop.products');
        Route::get('get-by-slug/{product:slug}', [ProductController::class, 'getProductBySlug'])->name('shop.products.getBySlug');
    });
});

Route::middleware('auth:sanctum')->prefix('shop')->group(function () {
    Route::apiResource('cart', \App\Http\Controllers\CartController::class)->names('shop.cart');
    Route::apiResource('/shopper/orders', \App\Http\Controllers\OrderController::class)->names('shop.shopper.orders');
    Route::post('/cart/merge-guest-cart', [CartController::class, 'mergeGuestCart'])->name('shop.cart.mergeGuestCart');
});

// Admin Routes
Route::middleware(['auth:sanctum'])->group(function () {
    Route::middleware(['admin'])->prefix('admin')->name('admin.')->group(function () {
        Route::apiResource('products', \App\Http\Controllers\Admin\ProductController::class)->names('admin.products');
        Route::apiResource('categories', \App\Http\Controllers\Admin\CategoryController::class)->names('admin.categories');
        Route::apiResource('orders', \App\Http\Controllers\Admin\OrderController::class)->names('admin.orders');
        Route::get('orders-statuses', [\App\Http\Controllers\Admin\OrderController::class, 'getStatuses'])->name('admin.orders.statuses');
        Route::get('dashboard/overview', [\App\Http\Controllers\Admin\DashboardController::class, 'getOverview'])->name('admin.dashboard.overview');
    });
});
