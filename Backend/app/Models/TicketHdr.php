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

    protected $with = ['user:id,branch_id,name','ticket_logs_latest', 'sub_category:id,category_id,subcategory_description', 'sub_category.category:id,category_description', 'user.branch:id,branch_description'];

    protected $appends = ['ticket_status'];

    public function getTicketStatusAttribute()
    {
        return GlobalConstants::getStatusType($this->b_status);
    }

    public function created_at()
    {
        return Attribute::make(
            get: fn($value) => $value ? Carbon::parse($value)->format('Y-m-d\TH:i:s.u\Z') : null
        );
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'emp_id');
    }

    public function ticket_statuses()
    {
        return $this->hasMany(TicketStatus::class)->orderBy('created_at', 'desc');
    }

    public function sub_category()
    {
        return $this->belongsTo(SubCategory::class, 'subcategory_id');
    }


    public function ticket_logs_latest()
    {
        return $this->hasOne(TicketStatus::class , 'ticket_id')->latest();
    }

    public static function getTicketLog()
    {
        $query = self::query();
        return $query;
    }
}
