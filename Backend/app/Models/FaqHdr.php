<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FaqHdr extends Model
{
    use HasFactory;

    protected $table = 'TBL_FAQ_HDR';

    protected $fillable = [
        'FAQ_ID',
        'description',
        'created_by',
        'updated_by',
    ];

    public function faqDetails()
    {
        return $this->hasMany(FaqDtl::class, 'FAQ_ID', 'FAQ_ID');
    }
}