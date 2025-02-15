<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Branch extends Model
{
    use HasFactory;

    protected $fillable = ['branch_id' , 'branch_description' , 'b_active'];

    public function active_branch()
    {
        return $this->where('b_active', true);
    }
}
