<?php

namespace App\Http\Requests\Announcement;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class UpdateAnnouncementRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
        // return $this->user()->can('Can Update Announcement');
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => 'required',
            'description' => 'required',
            'attachments' => 'file|max:2048|mimes:pdf,csv,xlsx,docx,jpg,jpeg,png,gif,bmp,svg',
        ];
    }

    public function getAnnouncementData(): array
    {
        if ($this->file('attachments') !== null) {
            $path = $this->file('attachments')->store('announcement', 'public');
        }

        return [
            'announcement_id' => mt_rand(1000, 9999),
            'title' => $this->title,
            'description' => $this->description,
            'updated_by' => Auth::id(),
            'attachments' => $this->file('attachments')
                ? $path
                : ($this->announcements->attachments ?? null),
        ];
    }
}
