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

        return new JsonResponse(['status' => Response::HTTP_OK, 'data' => $data , 'message' => 'Created Successfully'], Response::HTTP_OK);
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

        return new JsonResponse(['status' => Response::HTTP_OK, 'data' => $data , 'message' => 'Created Successfully'], Response::HTTP_OK);
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
    public function SLAReport()
    {
        $tickets = TicketHdr::getSpecificTicket()->latest()->get();
    
        $timeDifferences = $tickets->filter(function ($ticket) {
            return collect($ticket['ticket_statuses'])->contains(function ($status) {
                return $status['ticket_status'] === GlobalConstants::getStatusType(GlobalConstants::IN_PROGRESS);
            });
        })->mapWithKeys(function ($ticket) {
            $firstStatus = collect($ticket['ticket_statuses'])
                ->filter(function ($status) {
                    return $status['ticket_status'] === GlobalConstants::getStatusType(GlobalConstants::IN_PROGRESS);
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
        $totalCount = $slaPassCount + $slaFailCount;
        $passRate = $totalCount ? ($slaPassCount / $totalCount) * 100 : 0;
    
        return new JsonResponse([
            'status' => Response::HTTP_OK,
            'data' => [
                'sla_report' => $timeDifferences,
                'sla_pass_count' => $slaPassCount,
                'sla_fail_count' => $slaFailCount,
                'total_count' => $totalCount,
                'pass_rate' => $passRate,
            ],
        ], Response::HTTP_OK);
    }
    
    
    
    
}