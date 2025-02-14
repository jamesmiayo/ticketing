<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class TicketAttachment extends Model
{
    protected $fillable = ['ticket_attachement_id', 'ticket_id', 'attachments', 'type'];

    protected $appends = ['file_url'];

    public function ticket_hdr()
    {
        return $this->belongsTo(TicketHdr::class, 'ticket_id');
    }

    public function getFileUrlAttribute()
    {
        return url(Storage::url($this->attachments));
    }
}
