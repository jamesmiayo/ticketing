<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TicketLogs extends Model
{
    use HasFactory;

    protected $fillable = ['ticket_id', 'user_id', 'status', 'comments'];

    public function ticket_hdr()
    {
        return $this->belongsTo(TicketHdr::class , 'ticket_id');
    }
}
