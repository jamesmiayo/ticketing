<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;

    protected $fillable = ['division_id', 'category_id' , 'resolution_time' , 'category_description' , 'b_active'];

    public function ticket_hdr() {
        return $this->belongsTo(TicketHdr::class);
    }

    public function division() {
        return $this->belongsTo(Division::class , 'division_id');
    }

    public function sub_category(){
        return $this->hasMany(SubCategory::class);
    }
}
