<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TicketSatisfactory extends Model
{
    use HasFactory;
    protected $fillable = ['ticket_id', 'user_id', 'satisfactory_1', 'satisfactory_2' , 'satisfactory_3' , 'satisfactory_4' ,'satisfactory_5'];

}
