<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Models\User;

class UserTicketController extends Controller
{
    public function __invoke():JsonResponse
    {
        $data = User::with('section:id,section_description,department_id' , 'section.department:id,department_description','ticketdtl:id,ticket_id,emp_id,updated_by' ,'ticketdtl.tickets','ticketdtl.tickets.ticket_satisfactory')->get();
        return  new JsonResponse(['status' => Response::HTTP_OK, 'data' => $data], Response::HTTP_OK);

    }
}
