<?php

namespace App\Http\Requests\Ticket;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class StoreTicketSatisfactoryRequest extends FormRequest
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
            'satisfactory_1' => 'nullable',
            'satisfactory_2' => 'nullable',
            'satisfactory_3' => 'nullable',
            'satisfactory_4' => 'nullable',
            'satisfactory_5' => 'nullable',
        ];
    }

    public function getTicketSatisfactoryData(): array
    {
        return [
            'ticket_id' => $this->ticket_id,
            'satisfactory_1' => $this->satisfactory_1,
            'satisfactory_2' => $this->satisfactory_2,
            'satisfactory_3' => $this->satisfactory_3,
            'satisfactory_4' => $this->satisfactory_4,
            'satisfactory_5' => $this->satisfactory_5,
            'user_id' => Auth::user()->id, // Assuming you have a User model and Laravel's auth() function. Replace with your actual method.
        ];
    }
}
