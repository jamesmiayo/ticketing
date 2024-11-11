<?php

namespace App\Models;

use App\Constants\GlobalConstants;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TicketHdr extends Model
{
    use HasFactory;

    protected $fillable = [
        'emp_id',
        'category_id',
        'status',
        'title',
        'body'
    ];

    protected $with = ['user:id,branch_id,name', 'category:id,category_description' , 'user.branch:id,branch_description'];

    protected $appends = ['ticket_status'];

    public function getTicketStatusAttribute()
    {
        return GlobalConstants::getStatusType($this->status);
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'emp_id');
    }

    public function category() {
        return $this->belongsTo(Category::class, 'category_id');
    }

    public function ticket_logs()
    {
        return $this->hasMany(TicketLogs::class);
    }

    public static function getTicketLog(){
        $query = self::query();
        return $query;
    }
}
