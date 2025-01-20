<?php

namespace App\Http\Controllers;

use App\Http\Resources\CartItemResource;
use App\Models\CartItem;
use App\Models\Product;
use Illuminate\Http\Request;

class CartController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        $cartItems = CartItem::where('user_id', $user->id)
            ->with('product')
            ->get();

        return response()->json([
            'cartItems' => CartItemResource::collection($cartItems),
        ]);
    }

    public function store(Request $request)
    {
        $user = $request->user();
        $productSlug = $request->input('product_slug');
        $quantity = (int) $request->input('quantity', 1);

        $product = Product::where('slug', $productSlug)->first();

        if (!$product) {
            return response()->json(['error' => 'Product not found.'], 404);
        }

        if ($quantity < 1) {
            return response()->json(['error' => 'Invalid quantity.'], 400);
        }

        $cartItem = CartItem::where('user_id', $user->id)
            ->where('product_id', $product->id)
            ->first();

        if ($cartItem) {
            $cartItem->quantity += $quantity;
            $cartItem->save();
        } else {

            $cartItem = CartItem::create([
                'user_id' => $user->id,
                'product_id' => $product->id,
                'quantity' => $quantity,
            ]);
        }

        return response()->json([
            'message' => 'Product added to cart successfully.',
            'cartItem' => new CartItemResource($cartItem),
        ]);
    }

    public function update($productSlug, Request $request)
    {
        $user = $request->user();
        $quantity = (int) $request->input('quantity');

        $product = Product::where('slug', $productSlug)->first();

        if (!$product) {
            return response()->json(['error' => 'Product not found.'], 404);
        }

        if ($quantity < 1) {
            return response()->json(['error' => 'Invalid quantity.'], 400);
        }

        $cartItem = CartItem::where('user_id', $user->id)
            ->where('product_id', $product->id)
            ->first();

        if (!$cartItem) {
            return response()->json(['error' => 'Cart item not found.'], 404);
        }

        $cartItem->quantity = $quantity;
        $cartItem->save();

        return response()->json([
            'message' => 'Cart item updated successfully.',
            'cartItem' => new CartItemResource($cartItem),
        ]);
    }

    public function destroy($slug, Request $request)
    {
        $user = $request->user();

        $product = Product::where('slug', $slug)->first();

        if (!$product) {
            return response()->json(['error' => 'Product not found.'], 404);
        }

        $cartItem = CartItem::where('user_id', $user->id)
            ->where('product_id', $product->id)
            ->first();

        if (!$cartItem) {
            return response()->json(['error' => 'Cart item not found.'], 404);
        }

        $cartItem->delete();

        return response()->json(['message' => 'Cart item removed successfully.']);
    }

    public function mergeGuestCart(Request $request)
    {
        $user = auth()->user();
        $guestCartItems = $request->input('items', []);

        if (!$user) {
            return response()->json(['message' => 'User not authenticated'], 401);
        }

        foreach ($guestCartItems as $item) {
            $productSlug = $item['product_slug'] ?? null;
            $quantity = $item['quantity'] ?? 0;

            if (!$productSlug || $quantity <= 0) {
                continue;
            }

            $product = Product::where('slug', $productSlug)->first();

            if (!$product) {
                continue;
            }

            $cartItem = CartItem::where('user_id', $user->id)
                ->where('product_id', $product->id)
                ->first();

            if ($cartItem) {
                $cartItem->quantity += $quantity;
                $cartItem->save();
            } else {

                CartItem::create([
                    'user_id' => $user->id,
                    'product_id' => $product->id,
                    'quantity' => $quantity,
                ]);
            }
        }

        return response()->json(['message' => 'Guest cart merged successfully']);
    }
}
