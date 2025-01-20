<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CartItemResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'product_id' => $this->product_id,
            'product_slug' => $this->product->slug,
            'title' => $this->product->title,
            'image_url' => $this->product->image,
            'image_alt' => $this->product->title,
            'price' => $this->product->price,
            'quantity' => $this->quantity,
            'total' => $this->quantity * $this->product->price,
        ];
    }
}
