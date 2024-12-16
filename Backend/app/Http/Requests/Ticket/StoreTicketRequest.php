<?php

namespace App\Http\Requests\Ticket;

use App\Models\TicketAttachment;
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
            'b_status' => 'required',
            'division_id' => 'required',
            'files' => 'required|array',
            'files.*' => 'max:2048'
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
            'b_status' => $this->b_status,
        ];
    }

    public function getAttachments($ticket_id , $uploadedFiles)
    {
        $attachments = [];

        foreach ($uploadedFiles as $file) {
            $imageMimeTypes = ['image/jpeg', 'image/png'];
            $documentMimeTypes = [
                'application/pdf',
                'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                'text/csv',
                'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
            ];

            $mimeType = $file->getMimeType();

            if (in_array($mimeType, $imageMimeTypes)) {
                $type = 1;
            } elseif (in_array($mimeType, $documentMimeTypes)) {
                $type = 2;
            } else {
                return response()->json(['error' => 'Invalid file type.'], 400);
            }

            $path = $file->store('ticket_file', 'public');

            $attachments[] = [
                'ticket_attachment_id' => mt_rand(1000, 9999),
                'ticket_id' => $ticket_id,
                'type' => $type,
                'attachments' => $path,
            ];
        }

        return $attachments;
    }


    public function getTicketStatus($ticket_id): array
    {
        return [
            'division_id' => $this->division_id,
            'ticket_id' => $ticket_id,
            'status' => $this->b_status,
            'emp_id' => null,
            'remarks' => '',
            'updated_by' => Auth::user()->id,
        ];
    }
}
