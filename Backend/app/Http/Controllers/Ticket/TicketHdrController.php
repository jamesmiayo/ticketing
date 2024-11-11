<?php

namespace App\Http\Controllers\Ticket;

use App\Http\Controllers\Controller;
use App\Http\Requests\Ticket\StoreTicketRequest;
use App\Models\TicketHdr;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Http\JsonResponse;
use App\Services\TicketLogService;
use Illuminate\Support\Facades\Auth;

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
    public function index(): JsonResponse
    {
        $data = TicketHdr::getTicketLog()->latest()->get();
        return new JsonResponse(['status' => Response::HTTP_OK, 'data' => $data], Response::HTTP_OK);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTicketRequest $request)
    {
        $data = TicketHdr::create($request->getTicketHdr());
        return new JsonResponse(['status' => Response::HTTP_OK, 'data' => $data , 'message' => 'Created Successfully'], Response::HTTP_OK);
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
        $this->ticketLogServices->log($ticketHdr->id , Auth::user() , $ticketHdr->status);
        return new JsonResponse(['status' => Response::HTTP_OK, 'message' => 'Ticket status updated'], Response::HTTP_OK);
    }
}
