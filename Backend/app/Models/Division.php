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

    public function category()
    {
        return $this->hasMany(Category::class , 'division_id');
    }

    public function active_division()
    {
        return $this->where('b_active', true);
    }

    public function active_category()
    {
        return $this->category()->where('b_active', true);
    }

    public function active_department()
    {
        return $this->department()->where('b_active', true);
    }

}
