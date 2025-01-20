<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductListResource extends JsonResource
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
            'title' => $this->title,
            'description' => $this->description,
            'slug' => $this->slug,
            'image_url' => $this->image,
            'image_alt' => $this->title,
            'price' => $this->price,
            'categories' => CategoryResource::collection($this->categories),
            'updated_at' => ( new \DateTime($this->updated_at) )->format('Y-m-d H:i:s'),
        ];
    }
}
