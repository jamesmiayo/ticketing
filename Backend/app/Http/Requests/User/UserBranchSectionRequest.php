<?php

namespace App\Http\Requests\User;

use Illuminate\Foundation\Http\FormRequest;

class UserBranchSectionRequest extends FormRequest
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
            'branch_id' => 'required',
            'section_id' => 'required',
            'phone_number' => 'required|digits:11',
        ];
    }

    public function getUserBranchSectionData(): array
    {
        return [
            'branch_id' => $this->branch_id,
           'section_id' => $this->section_id,
            'phone_number' => $this->phone_number,
        ];
    }
}
