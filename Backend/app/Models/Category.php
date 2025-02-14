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

    public function active_sub_category()
    {
        return $this->sub_category()->where('b_active', true);
    }

    public function active_division()
    {
        return $this->division()->where('b_active', true);
    }
    public function active_category()
    {
        return $this->where('b_active', true);
    }
}
