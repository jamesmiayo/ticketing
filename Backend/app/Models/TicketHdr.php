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

    protected $with = ['user:id,branch_id,name','sub_category:id,category_id,subcategory_description', 'sub_category.category:id,category_description', 'user.branch:id,branch_description'];

    protected $appends = ['ticket_status'];

    protected $casts = [
        'created_at' => 'datetime:Y-m-d H:i:s', // Custom format
    ];

    public function getTicketStatusAttribute()
    {
        return GlobalConstants::getStatusType($this->b_status);
    }


    public function user()
    {
        return $this->belongsTo(User::class, 'emp_id');
    }

    public function ticket_statuses()
    {
        return $this->hasMany(TicketStatus::class , 'ticket_id' , 'id');
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
        $query = self::with('ticket_logs_latest');
        return $query;
    }
}
