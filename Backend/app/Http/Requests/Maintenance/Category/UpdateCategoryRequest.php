<?php

namespace App\Http\Requests\Maintenance\Category;

use Illuminate\Foundation\Http\FormRequest;

class UpdateCategoryRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user()->can('Can Update Category');
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'category_id' => 'required',
            'category_description' => 'required',
            'b_active' => 'required',
        ];
    }

    public function getCategoryData(): array
    {
        return [
            'category_id' => $this->category_id,
            'category_description' => $this->category_description,
            'b_active' => $this->b_active,
        ];
    }
}
