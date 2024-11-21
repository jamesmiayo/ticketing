<?php

namespace App\Http\Controllers\Ticket;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\TicketDtl;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;

class TicketDtlController extends Controller
{
    public function create(Request $request) : JsonResponse
    {
        TicketDtl::create([
            'thread_id' => mt_rand(1000, 9999),
            'ticket_id' => $request->ticket_id,
            'message' => $request->message,
            'user_id' => Auth::id()
        ]);

        return new JsonResponse(['status' => Response::HTTP_OK, 'message' => 'Message Sent Successfully'], Response::HTTP_OK);
    }

    public function show(Request $request) : JsonResponse
    {
        $data = TicketDtl::with('user')->where('ticket_id', $request->ticket_id)->get();
        return new JsonResponse(['status' => Response::HTTP_OK, 'data' => $data], Response::HTTP_OK);

    }
}
