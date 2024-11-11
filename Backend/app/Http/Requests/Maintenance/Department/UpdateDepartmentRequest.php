<?php

namespace App\Http\Requests\Maintenance\Department;

use Illuminate\Foundation\Http\FormRequest;

class UpdateDepartmentRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user()->can('Can Update Department');
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'department_description' => 'required',
            'b_active' => 'required',
        ];
    }

    public function getDepartmentData(): array
    {
        return [
            'department_id' => mt_rand(1000, 9999),
            'department_description' => $this->department_description,
            'b_active' => $this->b_active,
        ];
    }
}
