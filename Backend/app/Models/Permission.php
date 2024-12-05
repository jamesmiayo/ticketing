<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Spatie\Permission\Models\Permission as SpatieRole;
use Illuminate\Database\Eloquent\Factories\HasFactory;
class Permission extends SpatieRole
{
    use HasFactory;

    protected $fillable = ['name' , 'guard_name'];
}
