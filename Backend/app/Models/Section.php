<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Section extends Model
{
    use HasFactory;

    protected $fillable = ['department_id' , 'section_id' , 'section_description' , 'b_active'];

    public function department()
    {
        return $this->belongsTo(Department::class , 'department_id' , 'id');
    }
}
