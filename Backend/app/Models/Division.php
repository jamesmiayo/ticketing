<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Division extends Model
{
    use HasFactory;

    protected $fillable = ['division_id' , 'division_description','b_active'];

    public function department()
    {
        return $this->hasMany(Department::class , 'division_id');
    }
}
