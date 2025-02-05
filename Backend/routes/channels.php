<?php

use App\Events\GotMessage;
use App\Models\TicketHdr;
use Illuminate\Support\Facades\Broadcast;

Broadcast::channel('ticket-message.{ticketId}', function ($ticketId) {
    return true;
});

Broadcast::channel('channel-for-everyone.{ticketId}', function ($user , $ticketId) {
    return true;
});
