<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;
use App\Models\TicketHdr;
use App\Constants\GlobalConstants;
use App\Models\Branch;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use App\Models\Category;
use App\Models\SubCategory;

class DashboardController extends Controller
{
    protected $ticketHdr;

    public function __construct(TicketHdr $ticketHdr)
    {
        $this->ticketHdr = $ticketHdr;
    }

    public function __invoke(): JsonResponse
    {
        if (Auth::user()->can('Can View Dashboard') || Auth::user()->hasRole('Supervisor')) {
            return response()->json([
                'status' => Response::HTTP_OK,
                'total_ticket_count' => $this->getTicketCountsByStatus(),
                'total_ticket_branch' => $this->getTicketPerBranch(),
                'total_ticket_category' => $this->getTicketPerCategory(),
                'total_today_created_ticket' =>  $this->getTicketPerDay(),
                'latest_ticket' =>  $this->ticketHdr->latest()->take(10)->get(),
            ], Response::HTTP_OK);
        } else {
            return response()->json([
                'status' => Response::HTTP_OK,
                'total_ticket_count' => $this->getTicketCountsByStatus(),
                'data' => $this->ticketHdr->where('emp_id', Auth::user()->id)->latest()->get(),
            ], Response::HTTP_OK);
        }
    }

    public function getTicketPerDay(): array
    {
        $today = Carbon::now();

        return [
            'total_created' => $this->ticketHdr->whereDate('created_at', $today)->count(),
            'total_open' => $this->ticketHdr->whereHas('ticket_logs_latest', function ($query) use ($today) {
                $query->whereDate('created_at', $today)->where('status', GlobalConstants::OPEN);
            })->count(),
            'total_resolved' => $this->ticketHdr->whereHas('ticket_logs_latest', function ($query) use ($today) {
                $query->whereDate('created_at', $today)->where('status', GlobalConstants::COMPLETED);
            })->count(),
        ];
    }

    public function getTicketCountsByStatus($branch = null): array
    {
        $tickets = Auth::user()->hasRole('Supervisor') ? $this->ticketHdr : $this->ticketHdr->where('emp_id', Auth::user()->id);

        if ($branch !== null) {
            $tickets = $tickets->whereHas('requestor', function ($query) use ($branch) {
                $query->where('branch_id', $branch);
            });
        }

        $statuses = GlobalConstants::getStatusesType();

        $ticketCounts = [];
        $totalTickets = 0;

        foreach ($statuses as $status => $label) {
            $count = $tickets->whereHas('ticket_logs_latest', function ($query) use ($status) {
                $query->where('status', $status);
            })->count();

            $ticketCounts[$label] = $count;
            $totalTickets += $count;
        }

        $formattedCounts = array_map(function ($label, $count) {
            return ['label' => $label, 'value' => $count];
        }, array_keys($ticketCounts), $ticketCounts);

        $formattedCounts[] = [
            'label' => 'Total Tickets',
            'value' => $totalTickets,
        ];

        return $formattedCounts;
    }


    public function getTicketPerCategory()
    {
        $ticketsPerCategory = $this->ticketHdr->get()->filter(function ($item) {
            return isset($item->subcategory_id);
        })->groupBy(function ($item) {
            return $item->subcategory_id;
        });
        $totalCountPerCategory = [];
        $index = 0;
        foreach ($ticketsPerCategory as $categoryId => $tickets) {
            $subcategory = SubCategory::with('category')->find($categoryId);
            $totalCountPerCategory[] = [
                'id' => $index++,
                'category' => $subcategory ? $subcategory->category->category_description : 'Category Does Not Exist',
                'sub_category' => $subcategory ? $subcategory->subcategory_description : 'Sub Category Does Not Exist',
                'total_tickets' => $tickets->count(),
            ];
        }

        return $totalCountPerCategory;
    }


    public function getTicketPerBranch(): array
    {
        $ticketsWithBranch = $this->ticketHdr->get()
            ->filter(function ($item) {
                return !empty($item->requestor) && !empty($item->requestor->branch_id);
            })
            ->groupBy(function ($item) {
                return $item->requestor->branch_id;
            });

        $totalCountWithBranch = [];
        $index = 0;
        foreach ($ticketsWithBranch as $branchId => $tickets) {
            $branch = Branch::find($branchId);
            $totalCountWithBranch[] = [
                'id' => $index++,
                'branch_name' => $branch ? $branch->branch_description : 'Branch Does Not Exist',
                'total_tickets' => $tickets->count(),
                'status_counts' => $this->getTicketCountsByStatus($branch ? $branch->id : null) // Handle null branch case
            ];
        }

        $totalCountWithoutBranch = $this->ticketHdr->get()->filter(function ($item) {
            return !isset($item->requestor->branch_id);
        })->count();

        return [
            'total_count_with_branch' => $totalCountWithBranch,
            'total_count_without_branch' => $totalCountWithoutBranch,
        ];
    }
}