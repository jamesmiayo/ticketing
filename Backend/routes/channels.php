<?php

use App\Events\GotMessage;
use Illuminate\Support\Facades\Broadcast;

Broadcast::channel('ticket-message' , function () {
    return true;
});

Broadcast::channel('channel-for-everyone', function ($user) {
    return true;
});
