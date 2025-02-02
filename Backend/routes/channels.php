<?php

use Illuminate\Support\Facades\Broadcast;

Broadcast::channel('ticket-message' , function () {
    return true;
});
