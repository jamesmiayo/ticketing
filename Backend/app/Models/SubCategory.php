<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SubCategory extends Model
{
    use HasFactory;

    protected $fillable = ['subcategory_id', 'category_id', 'subcategory_description', 'b_active'];

    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id');
    }

    public function active_sub_category()
    {
        return $this->where('b_active', true);
    }
}
