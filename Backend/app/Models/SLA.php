<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SLA extends Model
{
    use HasFactory;

    protected $table = 'TBL_SLA';

    protected $fillable = [
        'SLA_ID',
        'priority_label',
        'priority_color',
        'response_time',
        'created_by',
        'updated_by',
    ];

}