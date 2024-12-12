<?php

namespace App\Http\Controllers\Ticket;

use App\Constants\GlobalConstants;
use App\Http\Controllers\Controller;
use App\Http\Requests\Ticket\ChangeTicketStatusRequest;
use App\Http\Requests\Ticket\StoreTicketRequest;
use App\Http\Requests\Ticket\StoreTicketSatisfactoryRequest;
use App\Http\Requests\Ticket\StoreTicketStatusRequest;
use App\Models\TicketDtl;
use App\Models\TicketHdr;
use App\Models\TicketSatisfactory;
use App\Models\TicketStatus;
use App\Services\TicketHdrRoleDataService;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Http\JsonResponse;
use App\Services\TicketLogService;
use Illuminate\Support\Facades\Auth;

class TicketHdrController extends Controller
{

    protected $ticketLogServices;

    protected $ticketHdr;

    public function __construct(TicketLogService $ticketLogService, TicketHdrRoleDataService $tickerHdrService)
    {
        $this->ticketLogServices = $ticketLogService;
        $this->ticketHdr = $tickerHdrService;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): JsonResponse
    {
        $data = $this->ticketHdr->ticketData($request->all())->latest();
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

        $ticket = TicketHdr::where('id', $request->ticket_id)->first();

        if (collect([$ticket->ticket_logs_latest->assignee?->id, $ticket->requestor->id])->contains(Auth::id()) || Auth::user()->can('Can Change Assignee')) {
            TicketStatus::create($request->getTicketStatus());
            return new JsonResponse(['status' => Response::HTTP_OK, 'message' => 'Ticket Successfully Assign'], Response::HTTP_OK);
        } else {
            return new JsonResponse(['status' => Response::HTTP_FORBIDDEN, 'message' => 'Unauthorized to Change Assign'], Response::HTTP_FORBIDDEN);
        }
    }

    public function updatePriority(Request $request): JsonResponse
    {
        $ticket = TicketHdr::find($request->ticket_id);;

        if (collect([$ticket->ticket_logs_latest->assignee?->id])->contains(Auth::id()) || Auth::user()->can('Can Change Priority')) {
            $ticket->update(['priority' => $request->priority]);
            return new JsonResponse(['status' => Response::HTTP_OK, 'message' => 'Update Priority Successfully'], Response::HTTP_OK);
        } else {
            return new JsonResponse(['status' => Response::HTTP_FORBIDDEN, 'message' => 'Unauthorized to Change Assign'], Response::HTTP_FORBIDDEN);
        }
    }

    public function ticketSatisFactory(StoreTicketSatisfactoryRequest $request)
    {
        $ticket = TicketHdr::where('id', $request->ticket_id)->first();

        if (empty($ticket->ticket_logs_latest->assignee)) {
            return new JsonResponse(['status' => Response::HTTP_FORBIDDEN, 'message' => 'Cannot Close the Ticket Without Assignee'], Response::HTTP_FORBIDDEN);
        }
        if ($ticket->requestor->id === Auth::user()->id || Auth::user('Can Done Ticket')) {
            $ticket->update(['b_status' => GlobalConstants::COMPLETED]);
            TicketSatisfactory::create($request->getTicketSatisfactoryData());
            TicketStatus::create($request->getTicketStatus($ticket->ticket_logs_latest->assignee->id));
            return new JsonResponse(['status' => Response::HTTP_OK, 'message' => 'Thank You For Answering.'], Response::HTTP_OK);
        } else {
            return new JsonResponse(['status' => Response::HTTP_FORBIDDEN, 'message' => 'You do not have permission to done this ticket as it is not assigned to you..'], Response::HTTP_FORBIDDEN);
        }
    }

    public function changeTicketStatus(ChangeTicketStatusRequest $request, string $ticket)
    {
        $ticket = TicketHdr::where('id', $ticket)->first();

        if (empty($ticket->ticket_logs_latest->assignee)) {
            return new JsonResponse(['status' => Response::HTTP_FORBIDDEN, 'message' => 'Cannot Close the Ticket Without Assignee'], Response::HTTP_FORBIDDEN);
        }

        if ($ticket->ticket_logs_latest->assignee->id === Auth::user()->id || Auth::user('Can Change Status')) {
            TicketStatus::create($request->getChangeStatusData($ticket));
            return new JsonResponse(['status' => Response::HTTP_OK, 'message' => 'Ticket Status Successfully Changed.'], Response::HTTP_OK);
        } else {
            return new JsonResponse(['status' => Response::HTTP_FORBIDDEN, 'message' => 'You do not have permission to done this ticket as it is not assigned to you..'], Response::HTTP_FORBIDDEN);
        }
    }

    public function updateTicketRemarks(Request $request , string $ticket)
    {
        $ticket = TicketHdr::where('id', $ticket)->first();
        $ticket->update([
            'remarks' => $request->remarks,
            'updated_by' => Auth::user()->id
        ]);
        return new JsonResponse(['status' => Response::HTTP_OK, 'message' => 'Successfully Update The Ticket Remarks.'], Response::HTTP_OK);

    }
}
