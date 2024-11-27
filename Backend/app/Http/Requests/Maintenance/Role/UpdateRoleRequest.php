<?php

namespace App\Http\Requests\Maintenance\Role;

use Illuminate\Foundation\Http\FormRequest;

class UpdateRoleRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
        // return $this->user()->can('Can Create Role');
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
            // 'guard_name' => 'required',
        ];
    }

    public function getRoleData(): array
    {
        return [
            'name' => $this->name,
            'guard_name' => "api",
        ];
    }
}