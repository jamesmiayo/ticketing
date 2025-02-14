<?php

namespace App\Http\Controllers\Report;

use App\Http\Controllers\AHT\AHTController;
use App\Http\Controllers\Controller;
use App\Http\Controllers\CSAT\CSATController;
use App\Http\Controllers\Maintenance\SLAController;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;

class ReportController extends Controller
{
    protected $sla;

    protected $aht;

    protected $csat;

    public function __construct(SLAController $SLAController, AHTController $aHTController, CSATController $cSATController)
    {
        $this->sla = $SLAController;
        $this->aht = $aHTController;
        $this->csat = $cSATController;
    }

    public function __invoke(Request $request)
    {
        $slaData = $this->sla->SLAReport($request)->original['data'];
        $ahtData = $this->aht->averageHandlingTimeTicket($request)->original['analytics'];
        $csat = $this->csat->CsatReport($request)->original;
        $ticketWithoutCsat = !empty($csat['data']->count()) ? round($csat['total_satisfied'] / ($csat['data']->count()) * 100, 2) : 0;
        return new JsonResponse([
            'status' => Response::HTTP_OK,
            'data' => [
                'total_ticket_w_csat' => $csat['total_answered'],
                'total_ticket_wo_csat' => $csat['total_unresponse'],
                'total_passed_percentage' => round(($slaData['sla_pass_percentage'] + $ahtData[6]['value'] + $csat['average_satisfactory']) / 3, 2),
                'total_passed_w_csat_percentage' => round(($slaData['sla_pass_percentage'] + $ahtData[6]['value'] + $ticketWithoutCsat) / 3, 2),
                'sla' => [
                    'sla_pass' => $slaData['sla_pass_count'],
                    'sla_fail' => $slaData['sla_fail_count'],
                    'sla_pass_percentage' => $slaData['sla_pass_percentage'],
                    'sla_fail_percentage' => $slaData['sla_fail_percentage'],
                ],
                'aht' => [
                    'aht_pass' => $ahtData[4]['value'],
                    'aht_fail' => $ahtData[5]['value'],
                    'aht_pass_percentage' => $ahtData[6]['value'],
                    'aht_fail_percentage' => $ahtData[7]['value'],
                ],
                'csat' => [
                    'csat_pass' => $csat['total_satisfied'],
                    'csat_fail' => $csat['total_unsatisfied'] + $csat['total_neutral'],
                    'csat_w_pass_percentage' => $csat['average_satisfactory'],
                    'csat_w_fail_percentage' => !empty($csat['total_answered']) ? round(($csat['total_unsatisfied'] + $csat['total_neutral']) / $csat['total_answered'] * 100, 2) : 0,
                    'csat_w_o_pass_percentage' => $ticketWithoutCsat,
                    'csat_w_o_fail_percentage' => !empty($csat['data']->count()) ? round(($csat['total_unsatisfied'] + $csat['total_neutral']) / $csat['data']->count() * 100, 2) : 0,
                    'csat_unresponse' => $csat['total_unresponse']
                ]
            ],
        ]);
    }
}
