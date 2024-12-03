<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class TicketDocument extends Model
{
    use HasFactory;
    protected $fillable = ['ticket_tdl_id', 'attachments'];

    protected $appends = ['file_url'];

    public function ticketDtl()
    {
        return $this->belongsTo(TicketDtl::class, 'ticket_tdl_id');
    }

    public function getFileUrlAttribute()
        {
            return url(Storage::url($this->attachments));
        }
}