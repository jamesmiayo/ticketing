<?php

namespace App\Http\Requests\Maintenance\SubCategory;

use Illuminate\Foundation\Http\FormRequest;

class StoreSubCategoryRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user()->can('Can Create Sub Category');
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
            'subcategory_description' => 'required',
        ];
    }

    public function getSubCategoryData(): array
    {
        return [
            'subcategory_id' => mt_rand(1000, 9999),
            'category_id' => $this->category_id,
            'subcategory_description' => $this->subcategory_description,
        ];
    }
}
