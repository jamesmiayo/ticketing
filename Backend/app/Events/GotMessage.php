<?php

namespace App\Events;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;


class GotMessage implements ShouldBroadcast
{
    use Dispatchable, SerializesModels;

    public $message;

    // Constructor
    public function __construct($message)
    {
        $this->message = $message;
    }

    // Define which channel to broadcast on
    public function broadcastOn()
    {
        return new Channel('channel_for_everyone');  // Replace with your actual channel
    }

    // Data that will be broadcasted
    public function broadcastWith()
    {
        return ['message' => $this->message];
    }
}
