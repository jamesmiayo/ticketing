<?php

namespace App\Http\Controllers\Ticket;

use App\Constants\GlobalConstants;
use App\Http\Controllers\Controller;
use App\Http\Requests\Ticket\StoreTicketRequest;
use App\Http\Requests\Ticket\StoreTicketSatisfactoryRequest;
use App\Http\Requests\Ticket\StoreTicketStatusRequest;
use App\Models\TicketHdr;
use App\Models\TicketSatisfactory;
use App\Models\TicketStatus;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Http\JsonResponse;
use App\Services\TicketLogService;
use Illuminate\Support\Facades\Auth;
use PHPUnit\Framework\Attributes\Ticket;

class TicketHdrController extends Controller
{

    protected $ticketLogServices;

    public function __construct(TicketLogService $ticketLogService)
    {
        $this->ticketLogServices = $ticketLogService;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): JsonResponse
    {
        $data = TicketHdr::getTicketLog($request->all())->latest();

        // if (!Auth::user()->can('Can View Dashboard') || !Auth::user()->hasRole('Supervisor')) {
        //     $data = $data->where('emp_id' , Auth::user()->id);
        // }

        return new JsonResponse(['status' => Response::HTTP_OK, 'data' => $data->paginate(10)], Response::HTTP_OK);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTicketRequest $request)
    {
        $data = TicketHdr::create($request->getTicketHdr());
        TicketStatus::create($request->getTicketStatus($data->id));
        return new JsonResponse(['status' => Response::HTTP_OK, 'data' => $data, 'message' => 'Ticket Created Successfully'], Response::HTTP_OK);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    public function updateStatus(Request $request, TicketHdr $ticketHdr): JsonResponse
    {
        $ticketHdr->update($request->all());
        $this->ticketLogServices->log($ticketHdr->id, Auth::user(), $ticketHdr->status);
        return new JsonResponse(['status' => Response::HTTP_OK, 'message' => 'Ticket status updated'], Response::HTTP_OK);
    }

    /**
     * Display the specified ticket by ticket_id.
     */
    public function show(string $ticket_id): JsonResponse
    {
        $ticket = TicketHdr::getSpecificTicket()->where('ticket_id', $ticket_id)->first();

        if (!$ticket) {
            return new JsonResponse(['status' => Response::HTTP_NOT_FOUND, 'message' => 'Ticket not found'], Response::HTTP_NOT_FOUND);
        }

        return new JsonResponse(['status' => Response::HTTP_OK, 'data' => $ticket], Response::HTTP_OK);
    }

    public function assignTicket(StoreTicketStatusRequest $request): JsonResponse
    {
        TicketStatus::create($request->getTicketStatus());
        return new JsonResponse(['status' => Response::HTTP_OK, 'message' => 'Ticket Successfully Assign'], Response::HTTP_OK);
        //checking if the assignee
        // $data = TicketHdr::whereHas('ticket_logs_latest.assignee', function ($query) {
        //     $query->where('id', Auth::user()->id);
        // })->exists();

        // if($data === false){
        //     return new JsonResponse(['status' => Response::HTTP_FORBIDDEN, 'message' => 'Unauthorized to change assign'], Response::HTTP_FORBIDDEN);
        // }else{
        //     TicketStatus::create($request->getTicketStatus());
        //     return new JsonResponse(['status' => Response::HTTP_OK, 'message' => 'Ticket Successfully Assign'], Response::HTTP_OK);
        // }
    }

    public function updatePriority(Request $request):  JsonResponse
    {
        $ticket = TicketHdr::where('id',$request->ticket_id);
        $ticket->update(['priority' => $request->priority]);
        return new JsonResponse(['status' => Response::HTTP_OK, 'message' => 'Update Priority Successfully'], Response::HTTP_OK);
    }

    public function ticketSatisFactory(StoreTicketSatisfactoryRequest $request){
        $ticket = TicketHdr::where('id',$request->ticket_id)->first();
        if(empty($ticket->ticket_logs_latest->assignee)){
            return new JsonResponse(['status' => Response::HTTP_FORBIDDEN, 'message' => 'Cannot Close the Ticket Without Assignee'], Response::HTTP_FORBIDDEN);
        }
        $ticket->update(['b_status' => GlobalConstants::COMPLETED]);
        TicketSatisfactory::create($request->getTicketSatisfactoryData());
        TicketStatus::create($request->getTicketStatus());
        return new JsonResponse(['status' => Response::HTTP_OK, 'message' => 'Thank You For Answering.'], Response::HTTP_OK);
    }
}
