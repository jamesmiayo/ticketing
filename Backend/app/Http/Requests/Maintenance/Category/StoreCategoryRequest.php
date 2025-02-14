<?php

namespace App\Http\Requests\Maintenance\Category;

use Illuminate\Foundation\Http\FormRequest;

class StoreCategoryRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
        // return $this->user()->can('Can Create Category');
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'category_description' => 'required',
            'resolution_time' => 'required',
            'division_id' => 'required',
        ];
    }

    public function getCategoryData(): array
    {
        return [
            'category_id' => mt_rand(1000, 9999),
            'division_id' => $this->division_id,
            'resolution_time' => $this->resolution_time,
            'category_description' => $this->category_description,
            'b_active' => true
        ];
    }
}
