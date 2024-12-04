<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;
use App\Models\User;

class UserTicketController extends Controller
{
    public function __invoke():JsonResponse
    {
        $data = User::with(
            'branch:id,branch_description',
            'section:id,section_description,department_id',
            'section.department:id,department_description,division_id',
            'section.department.division',
            'ticketdtl:id,ticket_id,emp_id,updated_by',
            'ticketdtl.tickets',
            'ticketdtl.tickets.ticket_satisfactory'
        )->latest()->get();

        $data->map(function ($user) {
            $user->satisfactoryPercentage = $user->satisfactoryPercentage();
            return $user;
        });
                return  new JsonResponse(['status' => Response::HTTP_OK, 'data' => $data], Response::HTTP_OK);

    }
}
