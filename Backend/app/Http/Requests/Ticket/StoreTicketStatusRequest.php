<?php

namespace App\Http\Requests\Ticket;

use App\Constants\GlobalConstants;
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
            'emp_id' => 'required',
            'remarks' => 'nullable',
        ];
    }

    public function getTicketStatus(): array
    {
        return [
            'ticket_id' => $this->ticket_id,
            'status' => GlobalConstants::IN_PROGRESS,
            'emp_id' => $this->emp_id,
            'remarks' => $this->remarks,
            'updated_by' => Auth::user()->id,
        ];
    }

    public function getTicketNotifications(): array
    {
        return [
            'ticket_notification_id' =>  mt_rand(1000, 9999),
            'ticket_id' => $this->ticket_id,
            'to_user' => $this->emp_id,
            'from_user' => Auth::user()->id,
        ];
    }
}
