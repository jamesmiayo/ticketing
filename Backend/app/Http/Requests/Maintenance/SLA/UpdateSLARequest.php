<?php

namespace App\Http\Requests\Maintenance\SLA;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class UpdateSLARequest extends FormRequest
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
            'priority_label' => 'required',
            'response_time' => 'required',
        ];
    }

    public function getFAQData(): array
    {
        return [
            'priority_label' => $this->priority_label,
            'response_time' => $this->response_time,
            'updated_by' => Auth::user()->id,
        ];
    }
}