<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;

    protected $fillable = ['category_id' , 'category_description' , 'b_active'];

    public function ticket_hdr() {
        return $this->belongsTo(TicketHdr::class);
    }
}
