<?php

namespace App\Services;

use App\Models\TicketLogs;

class TicketLogService
{
    public function log($ticket_id , $user , $status)
    {
        TicketLogs::create([
            'ticket_log_id' => mt_rand(1000, 9999),
            'user_id' => $user->id,
            'ticket_id' => $ticket_id,
            'status' => $status,
        ]);
    }
}
