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
        'body',
        'priority',
        'b_status',
        'remarks',
        'updated_by'
    ];

    protected $with = ['ticket_files', 'ticket_images', 'ticket_documents', 'ticket_attachment', 'updatedBy', 'ticket_logs_latest', 'requestor:id,branch_id,section_id,name,phone_number', 'requestor.section:id,section_description,department_id', 'requestor.section.department:id,department_description', 'sub_category:id,category_id,subcategory_description', 'sub_category.category:id,category_description,division_id,resolution_time', 'requestor.branch:id,branch_description', 'sub_category.category.division'];

    protected $appends = ['ticket_status', 'time_finished'];

    protected $casts = [
        'created_at' => 'datetime:Y-m-d H:i:s A',
        'total_duration' => 'float',
    ];

    public function getTimeFinishedAttribute()
    {
        $latestTicketLog = $this->ticket_logs_latest;

        if ($latestTicketLog && $this->ticket_status === 'Completed') {
            $diffInSeconds = $this->created_at->diffInSeconds($latestTicketLog->created_at);
            $hours = floor($diffInSeconds / 3600);
            $minutes = floor(($diffInSeconds % 3600) / 60);
            $seconds = $diffInSeconds % 60;

            return sprintf('%02d:%02d:%02d', $hours, $minutes, $seconds);
        }
        return 'No related logs';
    }


    public function getTicketStatusAttribute()
    {
        return GlobalConstants::getStatusType($this->b_status);
    }

    public function ticket_attachment()
    {
        return $this->hasMany(TicketAttachment::class, 'ticket_id');
    }

    public function sla()
    {
        return $this->belongsTo(SLA::class, 'priority', 'SLA_ID');
    }

    public function requestor()
    {
        return $this->belongsTo(User::class, 'emp_id');
    }

    public function updatedBy()
    {
        return $this->belongsTo(User::class, 'updated_by');
    }

    public function ticket_statuses()
    {
        return $this->hasMany(TicketStatus::class, 'ticket_id', 'id')->with('updated_by:id,name', 'assignee:id,name,profile_picture');
    }

    public function sub_category()
    {
        return $this->belongsTo(SubCategory::class, 'subcategory_id');
    }

    public function ticket_messages()
    {
        return $this->hasMany(TicketDtl::class, 'ticket_id')->with('documents');
    }

    public function ticket_images()
    {
        return $this->ticket_messages()->whereHas('documents', function ($query) {
            $query->where('type', 1);
        });
    }

    public function ticket_documents()
    {
        return $this->ticket_messages()->whereHas('documents', function ($query) {
            $query->where('type', 2);
        });
    }

    public function ticket_files()
    {
        return $this->hasMany(TicketAttachment::class, 'ticket_id');
    }

    public function ticket_satisfactory()
    {
        return $this->hasOne(TicketSatisfactory::class, 'ticket_id');
    }

    public function ticket_logs()
    {
        return $this->hasMany(TicketStatus::class, 'ticket_id');
    }

    public function ticket_logs_in_inprogress()
    {
        return $this->hasMany(TicketStatus::class, 'ticket_id')
            ->where('status', GlobalConstants::IN_PROGRESS)
            ->orderBy('created_at', 'asc');
    }

    public function ticket_logs_done()
    {
        return $this->hasMany(TicketStatus::class, 'ticket_id')
            ->where('status', GlobalConstants::VALIDATION)
            ->orderBy('created_at', 'desc');
    }

    public function ticket_logs_latest()
    {
        return $this->hasOne(TicketStatus::class, 'ticket_id')->with('updated_by:id,name', 'assignee:id,name,section_id')->latestOfMany();
    }

    public function getTicketLog($searchParams)
    {

        $query = self::query();

        if (array_key_exists('ticket_id', $searchParams)) {
            $query->ticketId($searchParams['ticket_id']);
        }

        if (array_key_exists('title', $searchParams)) {
            $query->title($searchParams['title']);
        }

        if (array_key_exists('priority', $searchParams) && $searchParams['priority'] !== null) {
            $query->priority($searchParams['priority']);
        }

        if (array_key_exists('subcategory_id', $searchParams) && $searchParams['subcategory_id'] !== null) {
            $query->subCategoryId($searchParams['subcategory_id']);
        }

        if (array_key_exists('category_id', $searchParams) && $searchParams['category_id'] !== null) {
            $query->categoryId($searchParams['category_id']);
        }

        if (array_key_exists('start_date', $searchParams) && $searchParams['start_date'] !== null) {
            $query->startDate($searchParams['start_date']);
        }

        if (array_key_exists('end_date', $searchParams) && $searchParams['end_date'] !== null) {
            $query->endDate($searchParams['end_date']);
        }

        if (array_key_exists('status', $searchParams) && $searchParams['status'] !== null) {
            $query->status($searchParams['status']);
        }

        if (array_key_exists('requested_by', $searchParams) && $searchParams['requested_by'] !== null) {
            $query->requested($searchParams['requested_by']);
        }

        if (array_key_exists('assigned_by', $searchParams) && $searchParams['assigned_by'] !== null) {
            $query->assignee($searchParams['assigned_by']);
        }

        if (array_key_exists('branch_id', $searchParams) && $searchParams['branch_id'] !== null) {
            $query->branchId($searchParams['branch_id']);
        }

        return $query;
    }

    public static function getTicketAHT($searchParams)
    {
        $query = self::with('ticket_logs', 'sla')->whereHas('ticket_logs', function ($query) {
            $query->where('status', GlobalConstants::VALIDATION);
        });

        if (array_key_exists('ticket_id', $searchParams)) {
            $query->ticketId($searchParams['ticket_id']);
        }

        if (array_key_exists('priority', $searchParams) && $searchParams['priority'] !== null) {
            $query->priority($searchParams['priority']);
        }

        if (array_key_exists('start_date', $searchParams) && $searchParams['start_date'] !== null) {
            $query->startDate($searchParams['start_date']);
        }

        if (array_key_exists('end_date', $searchParams) && $searchParams['end_date'] !== null) {
            $query->endDate($searchParams['end_date']);
        }

        return $query;
    }

    public static function getTicketCSAT($searchParams)
    {
        $query = self::with([
            'ticket_satisfactory',
            'ticket_logs:id,ticket_id,status',
        ])
            ->whereHas('ticket_logs', function ($query) {
                $query->where('status', GlobalConstants::VALIDATION)
                    ->orWhere('status', GlobalConstants::COMPLETED);
            });

        if (array_key_exists('branch_id', $searchParams) && $searchParams['branch_id'] !== null) {
            $query->branchId($searchParams['branch_id']);
        }

        if (array_key_exists('division_id', $searchParams) && $searchParams['division_id'] !== null) {
            $query->divisionId($searchParams['division_id']);
        }

        if (array_key_exists('department_id', $searchParams) && $searchParams['department_id'] !== null) {
            $query->departmentId($searchParams['department_id']);
        }

        if (array_key_exists('section_id', $searchParams) && $searchParams['section_id'] !== null) {
            $query->sectionId($searchParams['section_id']);
        }

        if (array_key_exists('user_id', $searchParams) && $searchParams['user_id'] !== null) {
            $query->assignee($searchParams['user_id']);
        }

        if (array_key_exists('start_date', $searchParams) && $searchParams['start_date'] !== null) {
            $query->startDate($searchParams['start_date']);
        }

        if (array_key_exists('end_date', $searchParams) && $searchParams['end_date'] !== null) {
            $query->endDate($searchParams['end_date']);
        }

        return $query;
    }

    public static function getSpecificTicket()
    {
        $query = self::with([
            'ticket_logs_latest',
            'ticket_statuses' => function ($query) {
                $query->orderBy('id', 'desc');
            },
            'ticket_messages',
            'ticket_messages.user:id,name',
            'sla'
        ]);
        return $query;
    }

    public function scopeDivisionId($query, $division_id)
    {
        return $query->whereHas('ticket_logs_latest.assignee.section.department.division', function ($query) use ($division_id) {
            $query->where('id', $division_id);
        });
    }

    public function scopeDepartmentId($query, $department_id)
    {
        return $query->whereHas('ticket_logs_latest.assignee.section.department', function ($query) use ($department_id) {
            $query->where('id', $department_id);
        });
    }

    public function scopeSectionId($query, $section_id)
    {
        return $query->whereHas('ticket_logs_latest.assignee.section', function ($query) use ($section_id) {
            $query->where('id', $section_id);
        });
    }

    public function scopeAssignee($query, $assignee)
    {
        return $query->whereHas('ticket_logs_latest.assignee', function ($query) use ($assignee) {
            $query->where('id', $assignee);
        });
    }

    public function scopeRequested($query, $requested)
    {
        return $query->whereHas('requestor', function ($query) use ($requested) {
            $query->where('id', $requested);
        });
    }
    public function scopeBranchId($query, $branch_id)
    {
        return $query->whereHas('requestor.section.department.division', function ($query) use ($branch_id) {
            $query->where('id', $branch_id);
        });
    }
    public function scopeTicketId($query, $ticket_id)
    {
        return $query->where('ticket_id', 'LIKE', '%' . $ticket_id . '%');
    }

    public function scopePriority($query, $priority)
    {
        return $query->whereHas('sla', function ($query) use ($priority) {
            $query->where('id', $priority);
        });
    }

    public function scopeStatus($query, $status)
    {
        return $query->whereHas('ticket_logs_latest', function ($query) use ($status) {
            $query->where('status', $status);
        });
    }

    public function scopeCategoryId($query, $category_id)
    {
        return $query->whereHas('sub_category.category', function ($query) use ($category_id) {
            $query->where('id', $category_id);
        });
    }

    public function scopeTitle($query, $title)
    {
        return $query->where('title', 'LIKE', '%' . $title . '%');
    }

    public function scopeSubCategoryId($query, $subcategory_id)
    {
        return $query->where('subcategory_id', $subcategory_id);
    }

    public function scopeStartDate($query, $start_date)
    {
        return $query->whereDate('created_at', '>=', Carbon::parse($start_date)->startOfDay());
    }

    public function scopeEndDate($query, $end_date)
    {
        return $query->whereDate('created_at', '<=', Carbon::parse($end_date)->endOfDay());
    }

    //AHT
    public function ahtTotalDuration()
    {
        $inProgressLog = $this->ticket_logs_in_inprogress()->first();

        $doneLog = $this->ticket_logs_done()->first();

        if ($inProgressLog && $doneLog) {
            $inProgressTime = Carbon::parse($inProgressLog->created_at);
            $doneTime = Carbon::parse($doneLog->created_at);
            $diffInSeconds = $doneTime->diffInSeconds($inProgressTime);
            $diffInMinutes = round($diffInSeconds / 60, 2);
            return abs($diffInMinutes);
        }

        return null;
    }

    public function ahtPassed()
    {
        $totalDuration = $this->ahtTotalDuration();
        $resolutionTime = $this->sub_category?->category?->resolution_time;

        [$hours, $minutes] = explode(':', $resolutionTime);

        $valueConverted = ($hours * 60) + $minutes;
        return $totalDuration < $valueConverted ? 1 : 0;
    }

    public function ahtIdleTime()
    {
        $inProgressLog = $this->ticket_logs_in_inprogress()->first();
        if (!empty($inProgressLog)) {
            $diffInSeconds = Carbon::parse($this->created_at)->diffInSeconds(Carbon::parse($inProgressLog?->created_at));
            $diffInMinutes = round($diffInSeconds / 60, 2);
            return abs($diffInMinutes);
        }
        return null;
    }

    public function ahtLeadTime()
    {
        $doneLog = $this->ticket_logs_done()->first();
        if (!empty($doneLog)) {
            $diffInSeconds = Carbon::parse($this->created_at)->diffInSeconds(Carbon::parse($doneLog?->created_at));
            $diffInMinutes = round($diffInSeconds / 60, 2);
            return abs($diffInMinutes);
        }

        return null;
    }
}
