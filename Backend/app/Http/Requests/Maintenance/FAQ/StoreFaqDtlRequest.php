<?php

namespace App\Http\Requests\Maintenance\FAQ;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class StoreFaqDtlRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
        // return $this->user()->can('Can Create FAQs');
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'FAQ_ID' => 'required',
            'title' => 'required',
            'body' => 'required',
        ];
    }

    public function getFAQData(): array
    {
        return [
            'FAQ_ID' => $this->FAQ_ID,
            'title' => $this->title,
            'body' => $this->body,
            'created_by' => Auth::user()->id,
        ];
    }
}