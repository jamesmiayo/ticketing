<?php

namespace App\Http\Requests\Maintenance\Section;

use Illuminate\Foundation\Http\FormRequest;

class StoreSectionRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user()->can('Can Create Section');
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'department_id' => 'required',
            'section_description' => 'required',
            'b_active' => 'required',
        ];
    }

    public function getSectionData(): array
    {
        return [
            'department_id' => $this->department_id,
            'section_id' => mt_rand(1000, 9999),
            'section_description' => $this->section_description,
            'b_active' => $this->b_active,
        ];
    }
}
