<?php

namespace App\Http\Resources;

use App\Models\Product;
use Database\Seeders\ProductSeeder;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CategoryTreeResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $data = [
            'id' => $this->id,
            'title' => $this->title,
            'description' => $this->description,
            'slug' => $this->slug,
            'image_url' => $this->image,
            'image_alt' => $this->title,
        ];

        if ($this->children ?? false) {
            $data['children'] = $this->children;
        }

        if ($this->parent_id === null) {
            // $data['featured_products'] = $this->resource->featured();
            $data['featured_products'] = ProductListResource::collection($this->resource->featured());

        }

        return $data;
    }
}
