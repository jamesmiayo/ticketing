<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TicketDtl extends Model
{
    use HasFactory;

    protected $fillable = ['thread_id', 'ticket_id' , 'user_id', 'message'];

    public function user()
    {
        return $this->belongsTo(User::class , 'user_id');
    }
}
