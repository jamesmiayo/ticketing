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
        $faqHeader = SLA::create($request->getFAQData());

        return response()->json([
            'message' => 'SLA created successfully.',
            'data' => $faqHeader,
        ], 201);
    }

    /**
     * Show the specified SLA.
     */
    public function show($id)
    {
        $faqHeader = SLA::find($id);

        if (!$faqHeader) {
            return response()->json(['message' => 'SLA not found.'], 404);
        }

        return response()->json($faqHeader, 200);
    }

    /**
     * Update the specified SLA.
     */
    public function update(UpdateSLARequest $request, $id)
    {
        $faqHeader = SLA::find($id);

        if (!$faqHeader) {
            return response()->json(['message' => 'SLA not found.'], 404);
        }

        $faqHeader->update($request->getFAQData());

        return response()->json([
            'message' => 'SLA updated successfully.',
            'data' => $faqHeader,
        ], 200);
    }

    /**
     * Remove the specified SLA.
     */
    public function destroy($id)
    {
        $faqHeader = SLA::find($id);

        if (!$faqHeader) {
            return response()->json(['message' => 'SLA not found.'], 404);
        }

        $faqHeader->delete();

        return response()->json(['message' => 'SLA deleted successfully.'], 200);
    }

    public function SLAReport() 
    {
        $tickets = TicketHdr::getSpecificTicket()->latest()->get();
    
        $latestInProgressTickets = $tickets->filter(function ($ticket) {
            $authUserId = Auth::id();
    
            return collect($ticket['ticket_statuses'])->contains(function ($status) use ($authUserId) {
                return $status['ticket_status'] === 'In Progress' && $status['emp_id'] === $authUserId;
            });
        });
    
        $timeDifferences = $latestInProgressTickets->mapWithKeys(function ($ticket) {
            $authUserId = Auth::id();
    
            $firstStatus = collect($ticket['ticket_statuses'])
                ->filter(function ($status) use ($authUserId) {
                    return $status['ticket_status'] === 'In Progress' && $status['emp_id'] === $authUserId;
                })
                ->sortBy('created_at')
                ->first();
    
            $firstResponse = collect($ticket['ticket_messages'])->sortBy('created_at')->first();
    
            $timeDifference = null;
            $slaPassed = null;
            if ($firstStatus && $firstResponse) {
                $startTime = \Carbon\Carbon::parse($firstStatus['created_at']);
                $responseTime = \Carbon\Carbon::parse($firstResponse['created_at']);
    
                $timeDifference = $startTime->diffForHumans($responseTime, true);
    
                $slaResponseTimeString = $ticket['sla']['response_time'] ?? '00:00:00';
                $slaResponseTimeParts = explode(':', $slaResponseTimeString);
                $slaResponseTime = \Carbon\CarbonInterval::hours($slaResponseTimeParts[0])
                    ->minutes($slaResponseTimeParts[1])
                    ->seconds($slaResponseTimeParts[2]);
    
                $slaPassed = $responseTime->lessThanOrEqualTo($startTime->add($slaResponseTime));
            }
    
            // Merge the ticket data with SLA-related fields
            return [
                $ticket['id'] => array_merge($ticket->toArray(), [
                    'first_created_in_progress' => $firstStatus['created_at'] ?? null,
                    'first_response_message' => $firstResponse['created_at'] ?? null,
                    'time_difference' => $timeDifference,
                    'sla_passed' => $slaPassed,
                ])
            ];
        });
    
        $slaPassCount = $timeDifferences->filter(fn($data) => $data['sla_passed'] === true)->count();
        $slaFailCount = $timeDifferences->filter(fn($data) => $data['sla_passed'] === false)->count();
    
        return new JsonResponse([
            'status' => Response::HTTP_OK,
            'data' => [
                'sla_report' => $timeDifferences,
                'sla_pass_count' => $slaPassCount,
                'sla_fail_count' => $slaFailCount,
            ],
        ], Response::HTTP_OK);
    }
    
    
    
    
    
    
    
}