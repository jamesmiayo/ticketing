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
    public function averageHandlingTimeTicket(): JsonResponse
    {
        $tickets = TicketHdr::with('ticket_logs')->whereHas('ticket_logs', function ($query) {
            $query->where('status', GlobalConstants::VALIDATION);
        })->get();

        return new JsonResponse([
            'status' => Response::HTTP_OK,
            'data' => $tickets,
        ], Response::HTTP_OK);
    }

    public function averageHandlingTimeUser(Request $request): JsonResponse
    {
        $user = User::where('id', $request->userId)->first();
        dd($user->with('tickethdr.ticket_user_aht')->get());
        $totalDurationAndTicketsByDay = [];
        $startOfMonth = Carbon::now()->startOfMonth();
        $endOfMonth = Carbon::now()->endOfMonth();

        for ($date = $startOfMonth; $date <= $endOfMonth; $date->addDay()) {
            $totalDurationAndTicketsByDay[$date->toDateString()] = [
                'total_duration' => 0,
                'total_tickets' => 0,
                'tickets_with_duration' => 0,
                'tickets_without_duration' => 0,
            ];
        }

        foreach ($user->tickethdr as $tickethdr) {
            $date = Carbon::parse($tickethdr->created_at)->toDateString();
            $totalDurationAndTicketsByDay[$date]['total_tickets'] += 1;

            if ($tickethdr->total_duration !== null) {
                $totalDurationAndTicketsByDay[$date]['total_duration'] += $tickethdr->total_duration;
                $totalDurationAndTicketsByDay[$date]['tickets_with_duration'] += 1;
            } else {
                $totalDurationAndTicketsByDay[$date]['tickets_without_duration'] += 1;
            }
        }

        $result = array_map(function ($date, $data) {
            return [
                'date' => $date,
                'total_duration' => $data['total_duration'],
                'total_tickets' => $data['total_tickets'],
                'tickets_done' => $data['tickets_with_duration'],
                'tickets_in_progress' => $data['tickets_without_duration'],
            ];
        }, array_keys($totalDurationAndTicketsByDay), $totalDurationAndTicketsByDay);

        return new JsonResponse([
            'user' => $user,
            'status' => Response::HTTP_OK,
            'data' => $result,
        ], Response::HTTP_OK);
    }
}
