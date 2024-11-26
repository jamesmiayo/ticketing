<?php

namespace App\Http\Requests\Maintenance\SubCategory;

use Illuminate\Foundation\Http\FormRequest;

class UpdateSubCategoryRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
        // return $this->user()->can('Can Create Sub Category');
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
            'b_active' => 'required',
        ];
    }

    public function getSubCategoryData(): array
    {
        return [
            'category_id' => $this->category_id,
            'subcategory_description' => $this->subcategory_description,
            'b_active' => $this->b_active,
        ];
    }
}