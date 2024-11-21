<?php

namespace App\Http\Requests\Ticket;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class StoreTicketStatusRequest extends FormRequest
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
            'ticket_id' => 'required',
            'status' => 'required',
            'emp_id' => 'required',
            'remarks' => 'nullable',
        ];
    }

    public function getTicketStatus(): array
    {
        return [
            'ticket_id' => $this->ticket_id,
            'status' => $this->status,
            'emp_id' => $this->emp_id,
            'remarks' => $this->remarks,
            'updated_by' => Auth::user()->id,
        ];
    }
}
