<?php

namespace App\Http\Requests\Maintenance\Permission;

use Illuminate\Foundation\Http\FormRequest;

class StorePermissionRequest extends FormRequest
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
            'name' => 'required',
        ];
    }

    public function getPermissionData(): array
    {
        return [
            'name' => $this->name,
            'guard_name' => "api", // just default for now future adjustment after teams meeting 
        ];
    }
}
