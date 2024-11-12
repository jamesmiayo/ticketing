<?php

namespace App\Http\Requests\Ticket;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
class StoreTicketRequest extends FormRequest
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
            'subcategory_id' => 'required',
            'title' => 'required',
            'body' => 'required',
        ];
    }

    public function getTicketHdr(): array
    {
        return [
            'ticket_id' => mt_rand(1000, 9999),
            'emp_id' => Auth::user()->id,
            'subcategory_id' => $this->subcategory_id,
            'title' => $this->title,
            'body' => $this->body,
            'status' => $this->status,
        ];
    }
}
