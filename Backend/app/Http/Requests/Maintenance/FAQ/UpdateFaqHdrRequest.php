<?php

namespace App\Http\Requests\Maintenance\FAQ;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class UpdateFaqHdrRequest extends FormRequest
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
            'description' => 'required',
        ];
    }

    public function getFAQData(): array
    {
        return [
            'description' => $this->description,
            'updated_by' => Auth::user()->id,
        ];
    }
}