<?php

namespace App\Http\Controllers\Maintenance;

use App\Http\Controllers\Controller;
use App\Http\Requests\Maintenance\SLA\StoreSLARequest;
use App\Http\Requests\Maintenance\SLA\UpdateSLARequest;
use App\Models\SLA;
use Illuminate\Http\Response;
use Illuminate\Http\JsonResponse;
use App\Models\TicketHdr;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Constants\GlobalConstants;
use Carbon\Carbon;

class SLAController extends Controller
{
    /**
     * Display a list of SLA.
     */
    public function index()
    {
        $data = SLA::orderBy('response_time', 'asc')->get();
        return new JsonResponse(['status' => Response::HTTP_OK, 'data' => $data], Response::HTTP_OK);
    }

    /**
     * Store a newly created SLA.
     */
    public function store(StoreSLARequest $request)
    {
        $data = SLA::create($request->getFAQData());

        return new JsonResponse(['status' => Response::HTTP_OK, 'data' => $data, 'message' => 'Created Successfully'], Response::HTTP_OK);
    }

    /**
     * Show the specified SLA.
     */
    public function show($id)
    {
        $data = SLA::find($id);

        if (!$data) {
            return new JsonResponse(['status' => Response::HTTP_NOT_FOUND, 'message' => 'SLA Not Found'], Response::HTTP_NOT_FOUND);
        }

        return new JsonResponse(['status' => Response::HTTP_OK, 'data' => $data, 'message' => 'Created Successfully'], Response::HTTP_OK);
    }

    /**
     * Update the specified SLA.
     */
    public function update(UpdateSLARequest $request, $id)
    {
        $data = SLA::find($id);

        if (!$data) {
            return new JsonResponse(['status' => Response::HTTP_NOT_FOUND, 'message' => 'SLA Not Found'], Response::HTTP_NOT_FOUND);
        }

        $data->update($request->getFAQData());

        return new JsonResponse(['status' => Response::HTTP_OK, 'message' => 'Update Successfully'], Response::HTTP_OK);
    }

    /**
     * Remove the specified SLA.
     */
    public function destroy($id)
    {
        $data = SLA::find($id);

        if (!$data) {
            return response()->json(['message' => 'SLA not found.'], 404);
        }

        $data->delete();

        return new JsonResponse(['status' => Response::HTTP_OK, 'message' => 'Deleted Successfully'], Response::HTTP_OK);
    }
    public function SLAReport(Request $request)
    {
        if(!Auth::user('Can View SLA Reports'))
        {
            return response()->json(['message' => 'Unauthorized'], Response::HTTP_UNAUTHORIZED);
        }

        $tickets = TicketHdr::getSpecificTicket($request->all())->latest()->get();

        $timeDifferences = $tickets->filter(
            fn($ticket) =>
            collect($ticket['ticket_statuses'])->contains(
                fn($status) =>
                $status['ticket_status'] === GlobalConstants::getStatusType(GlobalConstants::IN_PROGRESS)
            )
        )->mapWithKeys(function ($ticket) {
            $firstStatus = collect($ticket['ticket_statuses'])
                ->filter(fn($status) => $status['ticket_status'] === GlobalConstants::getStatusType(GlobalConstants::IN_PROGRESS))
                ->sortBy('created_at')
                ->first();

            $firstResponse = collect($ticket['ticket_messages'])->sortBy('created_at')->first();
            $slaPassed = null;

            if ($firstStatus && $firstResponse) {
                $startTime = Carbon::parse($firstStatus['created_at']);
                $responseTime = Carbon::parse($firstResponse['created_at']);
                $timeDifference = $startTime->diffInSeconds($responseTime);
                $slaResponseTimeParts = explode(':', $ticket['sla']['response_time'] ?? '00:00:00');
                $slaResponseTime = ($slaResponseTimeParts[0] * 3600) + ($slaResponseTimeParts[1] * 60) + $slaResponseTimeParts[2];
                $slaPassed = $timeDifference <= $slaResponseTime;
            }

            return [$ticket['id'] => array_merge($ticket->toArray(), [
                'first_created_in_progress' => $firstStatus['created_at'] ?? null,
                'first_response_message' => $firstResponse['created_at'] ?? null,
                'time_difference' => $startTime?->diffForHumans($responseTime, true),
                'sla_passed' => $slaPassed,
            ])];
        });

        $slaPassCount = $timeDifferences->where('sla_passed', true)->count();
        $slaFailCount = $timeDifferences->where('sla_passed', false)->count();
        $totalCount = $slaPassCount + $slaFailCount;
        $passRate = $totalCount ? ($slaPassCount / $totalCount) * 100 : 0;

        $startDate = $request->start_date ? Carbon::parse($request->start_date) : Carbon::now()->startOfMonth();
        $endDate = $request->end_date ? Carbon::parse($request->end_date) : Carbon::now()->endOfMonth();

        $labels = collect(range(0, $startDate->diffInDays($endDate)))
            ->map(fn($i) => $startDate->copy()->addDays($i)->format('d-m'));

        $ticketData = $labels->mapWithKeys(function ($label) use ($timeDifferences) {
            $date = Carbon::createFromFormat('d-m', $label);

            $dailyTickets = $timeDifferences->filter(
                fn($ticket) =>
                Carbon::parse($ticket['created_at'])->isSameDay($date)
            );

            return [$label => [
                'passed' => $dailyTickets->where('sla_passed', true)->count(),
                'failed' => $dailyTickets->where('sla_passed', false)->count(),
            ]];
        });

        return new JsonResponse([
            'status' => Response::HTTP_OK,
            'data' => [
                'sla_report' => $timeDifferences,
                'sla_pass_count' => $slaPassCount,
                'sla_pass_percentage' => $passRate,
                'sla_fail_count' => $slaFailCount,
                'sla_fail_percentage' => 100 - $passRate,
                'total_count' => $totalCount,
                'labels' => $labels->toArray(),
                'passed_data' => array_column($ticketData->toArray(), 'passed'),
                'failed_data' => array_column($ticketData->toArray(), 'failed'),
            ],
        ], Response::HTTP_OK);
    }
}
