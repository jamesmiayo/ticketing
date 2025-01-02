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
        'remarks',
        'division_id',
        'department_id',
        'section_id'
    ];
    protected $with = ['assignee:id,name,section_id'];

    protected $appends = ['ticket_status', 'time_difference'];

    protected $casts = [
        // 'created_at' => 'datetime:Y-m-d h:i A',
    ];

    public function getTimeDifferenceAttribute()
    {
        $currentTimestamp = $this->created_at;

        $previousRecord = self::where('ticket_id', $this->ticket_id)
            ->where('id', '<', $this->id)
            ->orderBy('id', 'desc')
            ->first();

        if (is_null($previousRecord)) {
            return 'N/A';
        }

        $diff = $previousRecord->created_at->diffInSeconds($currentTimestamp);
        $diffInMinutes = round($diff / 60, 2);

        return $diffInMinutes;
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
