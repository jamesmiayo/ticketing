<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TicketSatisfactory extends Model
{
    use HasFactory;

    protected $fillable = ['ticket_id', 'user_id', 'satisfactory_1', 'satisfactory_2', 'satisfactory_3', 'satisfactory_4', 'satisfactory_5'];

    protected $with = ['user:id,name'];

    protected $appends = ['average_satisfactory'];
    public function ticket_hdr()
    {
        return $this->belongsTo(TicketHdr::class, 'ticket_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function getSatisfactory1Attribute($value)
    {
        return (int) $value; // Convert string to integer
    }

    public function getSatisfactory2Attribute($value)
    {
        return (int) $value;
    }

    public function getSatisfactory3Attribute($value)
    {
        return (int) $value;
    }

    public function getSatisfactory4Attribute($value)
    {
        return (int) $value;
    }

    public function getSatisfactory5Attribute($value)
    {
        return (int) $value;
    }

    public function getAverageSatisfactoryAttribute()
    {
        $ratings = [
            $this->satisfactory_1,
            $this->satisfactory_2,
            $this->satisfactory_3,
            $this->satisfactory_4,
            $this->satisfactory_5,
        ];

        $average = array_sum($ratings) / count($ratings);
        $percentage = ($average / 5) * 100;

        return $percentage;
    }
}
