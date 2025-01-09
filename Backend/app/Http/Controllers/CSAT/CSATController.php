<?php

namespace App\Http\Controllers\CSAT;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;
use App\Models\TicketHdr;
use App\Constants\GlobalConstants;

class CSATController extends Controller
{
    public function __invoke(Request $request)
    {
        $data = TicketHdr::getTicketCSAT($request->all())->latest()->get();

        $satisfactoryValues = $data->pluck('ticket_satisfactory.satisfactory_1')->filter();

        $defaultCounts = collect([1 => 0, 2 => 0, 3 => 0, 4 => 0, 5 => 0]);

        $satisfactoryCounts = $defaultCounts->mapWithKeys(function ($value, $key) use ($satisfactoryValues) {
            return [$key => $satisfactoryValues->countBy()->get($key, 0)];
        });

        $satisfactoryCountsArray = $satisfactoryCounts->map(fn($value, $key) => [
            'name' => (string) $key,
            'value' => $value,
        ])->values()->toArray();

        $totalAnswered = $data->filter(function ($item) {
            return $item->ticket_logs->contains('status', GlobalConstants::COMPLETED);
        })->count();

        $totalSatisfied = $satisfactoryValues->filter(fn($value) => $value == 4 || $value == 5)->count();
        $totalUnsatisfied = $satisfactoryValues->filter(fn($value) => $value == 1 || $value == 2)->count();

        $totalTickets = $data->count();
        $csatPassed = $totalAnswered > 0 && ($totalSatisfied / $totalAnswered * 100) > 70 ? 1 : 0;
        $averageSatisfactory = $totalAnswered > 0 ? round(($totalSatisfied / $totalAnswered * 100), 2) : 0;

        $totalUnresponse = $totalTickets > 0 ? $totalTickets - $totalAnswered : 0;

        return new JsonResponse([
            'status' => Response::HTTP_OK,
            'data' => $data,
            'satisfactory' => $satisfactoryCountsArray,
            'total_answered' => $totalAnswered,
            'total_satisfied' => $totalSatisfied,
            'average_satisfactory' => $averageSatisfactory,
            'csat_passed' => $csatPassed,
            'total_satisfactory' => $totalTickets,
            'total_unresponse' => $totalUnresponse,
            'total_unsatisfied' => $totalUnsatisfied,
            'total_neutral' => $satisfactoryValues->filter(fn($value) => $value == 3)->count()
        ], Response::HTTP_OK);

    }
}
