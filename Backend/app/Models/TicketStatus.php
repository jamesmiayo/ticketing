<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Constants\GlobalConstants;

class TicketStatus extends Model
{
    use HasFactory;

    protected $fillable = [
        'updated_by',
        'ticket_id',
        'emp_id',
        'status',
    ];
    protected $with = ['tickets:id,title,status,created_at', 'assignee:id,name', 'updated_by:id,name'];
    protected $appends = ['ticket_status'];

    public function getTicketStatusAttribute()
    {
        return GlobalConstants::getStatusType($this->status);
    }
    public function tickets()
    {
        return $this->belongsTo(TicketHdr::class);
    }

    public function assignee()
    {
        return $this->belongsTo(User::class , 'emp_id');
    }

    public function updated_by()
    {
        return $this->belongsTo(User::class , 'updated_by');
    }
}
