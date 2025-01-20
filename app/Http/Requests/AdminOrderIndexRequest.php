<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AdminOrderIndexRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'search' => ['nullable', 'string', 'max:255'],
            'sort_field' => ['nullable', 'string', 'in:created_at,status,total_price,id,user_name'],
            'sort_direction' => ['nullable', 'string', 'in:asc,desc'],
        ];
    }

    /**
     * Customize error messages (optional).
     */
    public function messages(): array
    {
        return [
            'sort_field.in' => 'The sort field must be one of the following: created_at, status, order number, total_price, or user name.',
            'sort_direction.in' => 'The sort direction must be either asc or desc.',
        ];
    }
}
