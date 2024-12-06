<?php

namespace App\Http\Requests\Ticket;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class ChangeTicketStatusRequest extends FormRequest
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
            'status' => 'required',
        ];
    }

    public function getChangeStatusData($ticket): array
    {
        return [
            'ticket_id' => $ticket->id,
            'status' => $this->status,
            'emp_id' => Auth::user('Can Change Status') ? $ticket->ticket_logs_latest->assignee->id : Auth::user()->id,
            'remarks' => '',
            'updated_by' => Auth::user()->id,
        ];
    }
}
