<?php

namespace App\Http\Requests\Maintenance\Branch;

use Illuminate\Foundation\Http\FormRequest;

class StoreBranchRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user()->can('Can Store Branch');
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'branch_description' => 'required',
            'b_active' => 'required',
        ];
    }

    public function getBranchData(): array
    {
        return [
            'branch_id' => mt_rand(1000, 9999),
            'branch_description' => $this->branch_description,
            'b_active' => $this->b_active,
        ];
    }
}
