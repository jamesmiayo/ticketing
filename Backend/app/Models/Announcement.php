<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;

class Announcement extends Model
{
    protected $fillable = ['announcement_id' , 'title' , 'description' , 'attachments' , 'updated_by' , 'created_by'];

    protected $casts = [
        'created_at' => 'datetime:Y-m-d H:i:s A',
    ];

    protected function attachments(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => $value
                ? asset('storage/' . $value)
                : null
        );
    }

    public function updatedBy()
    {
        return $this->belongsTo(User::class , 'updated_by');
    }
    public function createdBy()
    {
        return $this->belongsTo(User::class , 'created_by');
    }
}
