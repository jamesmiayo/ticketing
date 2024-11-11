<?php

namespace App\Http\Controllers\Ticket;

use App\Http\Controllers\Controller;
use App\Models\TicketLogs;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;

class TicketLogController extends Controller
{
    public function __invoke()
    {
        $data = TicketLogs::getTicketLog()->latest()->get();
        return new JsonResponse(['status' => Response::HTTP_OK, 'data' => $data], Response::HTTP_OK);
    }
}
