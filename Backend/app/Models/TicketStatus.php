<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Constants\GlobalConstants;
use Carbon\Carbon;
class TicketStatus extends Model
{
    use HasFactory;

    protected $fillable = [
        'updated_by',
        'ticket_id',
        'emp_id',
        'status',
        'remarks'
    ];
    protected $with = ['assignee:id,name', 'updated_by:id,name'];

    protected $appends = ['ticket_status', 'time_difference'];

    protected $casts = [
        'created_at' => 'datetime:Y-m-d h:i A',
    ];

    public function getTimeDifferenceAttribute()
    {
        $currentTimestamp = $this->updated_at;

        $previousRecord = self::where('ticket_id', $this->ticket_id)
            ->where('id', '<', $this->id)
            ->orderBy('id', 'desc')
            ->first();

        if (is_null($previousRecord)) {
            return 'N/A';
        }

        $diff = $previousRecord->updated_at->diff($currentTimestamp);

        return sprintf('%02d:%02d:%02d', $diff->h, $diff->i, $diff->s);
    }




    public function getTicketStatusAttribute()
    {
        return GlobalConstants::getStatusType($this->status);
    }
    public function tickets()
    {
        return $this->belongsTo(TicketHdr::class , 'ticket_id');
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
