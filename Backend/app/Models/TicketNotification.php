<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TicketNotification extends Model
{
    protected $fillable = ['ticket_notification_id', 'ticket_id', 'from_user', 'to_user' , 'is_read'];

    protected $with = ['ticket_hdr:id,ticket_id,title' , 'from_user:id,emp_id,name,profile_picture' , 'to_user:id,emp_id,name,profile_picture'];

    protected $casts = [
        'created_at' => 'datetime:Y-m-d H:i:s',
    ];
    public function ticket_hdr()
    {
        return $this->belongsTo(TicketHdr::class , 'ticket_id')->latest();
    }

    public function from_user()
    {
        return $this->belongsTo(User::class, 'from_user');
    }

    public function to_user()
    {
        return $this->belongsTo(User::class, 'to_user');
    }
}
