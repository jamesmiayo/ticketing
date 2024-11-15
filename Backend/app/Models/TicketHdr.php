<?php

namespace App\Models;

use App\Constants\GlobalConstants;
use Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class TicketHdr extends Model
{
    use HasFactory;

    protected $fillable = [
        'ticket_id',
        'emp_id',
        'subcategory_id',
        'status',
        'title',
        'body'
    ];

    protected $with = ['requestor:id,branch_id,section_id,name', 'requestor.section:id,section_description,department_id', 'requestor.section.department:id,department_description','sub_category:id,category_id,subcategory_description', 'sub_category.category:id,category_description', 'requestor.branch:id,branch_description'];

    protected $appends = ['ticket_status', 'time_finished'];

    protected $casts = [
        'created_at' => 'datetime:Y-m-d H:i:s',
    ];

    public function getTimeFinishedAttribute()
    {
        $latestTicketLog = $this->ticket_logs_latest;

        if ($latestTicketLog) {
            return $this->created_at->diff($latestTicketLog->created_at)->format('%d days, %h hours, %i minutes, %s seconds');
        }
        return 'No related logs';
    }

    public function getTicketStatusAttribute()
    {
        return GlobalConstants::getStatusType($this->b_status);
    }


    public function requestor()
    {
        return $this->belongsTo(User::class, 'emp_id');
    }

    public function ticket_statuses()
    {
        return $this->hasMany(TicketStatus::class, 'ticket_id', 'id')->with('updated_by:id,name', 'assignee:id,name');
    }

    public function sub_category()
    {
        return $this->belongsTo(SubCategory::class, 'subcategory_id');
    }


    public function ticket_logs_latest()
    {
        return $this->hasOne(TicketStatus::class, 'ticket_id')->with('updated_by:id,name', 'assignee:id,name')->latestOfMany();
    }

    public function ticket_logs_completed()
    {
        return $this->hasOne(TicketStatus::class, 'ticket_id')->where('status', GlobalConstants::COMPLETED)->latestOfMany();
    }

    public static function getTicketLog()
    {
        $query = self::with('ticket_logs_latest');
        return $query;
    }

    public static function getSpecificTicket(){
        $query = self::with([
            'ticket_logs_latest',
            'ticket_statuses' => function ($query) {
                $query->orderBy('id', 'desc');
            },
        ]);
        return $query;
    }
}
