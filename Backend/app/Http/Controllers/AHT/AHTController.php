<?php

namespace App\Http\Controllers\AHT;

use App\Constants\GlobalConstants;
use App\Http\Controllers\Controller;
use App\Models\TicketHdr;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class AHTController extends Controller
{
    public function __invoke(Request $request): JsonResponse
    {
        $tickets = TicketHdr::with('ticket_logs')->whereHas('ticket_logs_latest', function($query){
            $query->where('status' , GlobalConstants::VALIDATION);
        })->get();

        return new JsonResponse([
            'status' => Response::HTTP_OK,
            'data' => $tickets,
        ], Response::HTTP_OK);
    }
}
