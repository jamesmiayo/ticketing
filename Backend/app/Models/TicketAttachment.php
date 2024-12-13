<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TicketAttachment extends Model
{
    protected $fillable = ['ticket_hdr_id', 'attachments', 'type'];

    public function ticket_hdr()
    {
        return $this->belongsTo(TicketHdr::class, 'ticket_hdr_id');
    }
}
