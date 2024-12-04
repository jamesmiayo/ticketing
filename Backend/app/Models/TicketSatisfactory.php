<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Constants\GlobalConstants;

class TicketSatisfactory extends Model
{
    use HasFactory;

    protected $fillable = ['ticket_id', 'user_id', 'satisfactory_1', 'satisfactory_2', 'satisfactory_3', 'satisfactory_4', 'satisfactory_5' ,'overall_satisfaction'];

    protected $with = ['user:id,name'];

    protected $appends = ['average_satisfactory' , 'overall_satisfaction_value'];


    public function getOverallSatisfactionValueAttribute()
    {
        return GlobalConstants::getSatisfactionType($this->overall_satisfaction);
    }

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

        // Avoid division by zero
        $totalRatings = count($ratings);
        $average = $totalRatings > 0 ? array_sum($ratings) / $totalRatings : 0;

        // Calculate percentage
        $percentage = ($average / 5) * 100;

        // Return numeric value or default to 0
        return is_numeric($percentage) ? $percentage : 0;
    }

}
