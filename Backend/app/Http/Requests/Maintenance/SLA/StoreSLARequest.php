<?php

namespace App\Http\Requests\Maintenance\SLA;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class StoreSLARequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        // return true;
        return $this->user()->can('Can Create SLA');
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
            'priority_color' => 'required',
            'response_time' => 'required',
        ];
    }

    public function getFAQData(): array
    {
        return [
            'SLA_ID' => mt_rand(1000, 9999),
            'priority_label' => $this->priority_label,
            'priority_color' => $this->priority_color,
            'response_time' => $this->response_time,
            'created_by' => Auth::user()->id,
        ];
    }
}
