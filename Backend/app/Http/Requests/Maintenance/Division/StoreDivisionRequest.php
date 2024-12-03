<?php

namespace App\Http\Requests\Maintenance\Division;

use Illuminate\Foundation\Http\FormRequest;

class StoreDivisionRequest extends FormRequest
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
            'division_description' => 'required',
        ];
    }

    public function getDivisionData(): array
    {
        return [
            'division_id' => mt_rand(1000, 9999),
            'division_description' => $this->division_description,
        ];
    }
}
