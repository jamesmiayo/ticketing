<?php

namespace App\Http\Controllers\AHT;

use App\Http\Controllers\Controller;
use App\Models\TicketHdr;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
class AHTController extends Controller
{
    public function averageHandlingTimeTicket(Request $request): JsonResponse
    {
        if(!Auth::user('Can View Ticket AHT'))
        {
            return response()->json(['message' => 'Unauthorized'], Response::HTTP_UNAUTHORIZED);
        }
        $tickets = TicketHdr::getTicketAHT($request->all())->get();

        $processedTickets = $tickets->map(function ($ticket) {
            return array_merge(
                $ticket->toArray(),
                [
                    'aht_passed' => $ticket->ahtPassed(),
                    'aht_lead_time' => $ticket->ahtLeadTime(),
                    'aht_idle_time' =>$ticket->ahtIdleTime(),
                    'aht_total_duration_time' => $ticket->ahtTotalDuration(),
                ]
            );
        });

        $analytics = $processedTickets->reduce(function ($carry, $ticket) {
            $carry['Total Tickets']++;
            $carry['Passed'] += $ticket['aht_passed'];
            $carry['Failed'] += !$ticket['aht_passed'] ? 1 : 0;
            $carry['Total Lead Time'] += $ticket['aht_lead_time'];
            $carry['Total Idle Time'] += $ticket['aht_idle_time'];
            $carry['Total Duration Time'] += $ticket['aht_total_duration_time'];
            return $carry;
        }, [
            'Total Lead Time' => 0,
            'Total Idle Time' => 0,
            'Total Duration Time' => 0,
            'Total Tickets' => 0,
            'Passed' => 0,
            'Failed' => 0,
        ]);

        $totalTickets = max($analytics['Total Tickets'], 1);
        $analytics['Total Lead Time'] = round($analytics['Total Lead Time'], 2) . ' min';
        $analytics['Total Idle Time'] = round($analytics['Total Idle Time'], 2) . ' min';
        $analytics['Total Duration Time'] = round($analytics['Total Duration Time'], 2) . ' min';
        $analytics['Average Total Passed'] = round(($analytics['Passed'] / $totalTickets) * 100, 2);
        $analytics['Average Total Failed'] = round(($analytics['Failed'] / $totalTickets) * 100, 2);

        $analytics = collect($analytics)->map(function ($value, $key) {
            return [
                'label' => $key,
                'value' => $value,
            ];
        })->values();

        return response()->json([
            'status' => Response::HTTP_OK,
            'data' => $processedTickets,
            'analytics' => $analytics,
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
