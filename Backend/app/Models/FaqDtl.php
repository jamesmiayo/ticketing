<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FaqDtl extends Model
{
    use HasFactory;

    protected $table = 'TBL_FAQ_DTL';

    protected $fillable = [
        'FAQ_ID',
        'title',
        'body',
        'created_by',
        'updated_by',
    ];

    public function faqHeader()
    {
        return $this->belongsTo(FaqHdr::class, 'FAQ_ID', 'FAQ_ID');
    }
}