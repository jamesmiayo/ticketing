<?php

namespace App\Http\Requests\Maintenance\Department;

use Illuminate\Foundation\Http\FormRequest;

class StoreDepartmentRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
        // return $this->user()->can('Can Create Department');
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'division_id' => 'required',
            'department_description' => 'required',
        ];
    }

    public function getDepartmentData(): array
    {
        return [
            'department_id' => mt_rand(1000, 9999),
            'division_id' => $this->division_id,
            'department_description' => $this->department_description,
            'b_active' => true,
        ];
    }
}
