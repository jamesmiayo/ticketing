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
use App\Models\SLA;
use App\Services\TicketHdrRoleDataService;

class DashboardController extends Controller
{
    protected $ticketHdr;

    protected $role;

    public function __construct(TicketHdr $ticketHdr)
    {
        $this->ticketHdr = $ticketHdr;
        $this->role = Auth::user()->roles->first()->name;
    }

    public function index(): JsonResponse
    {
        return response()->json([
            'status' => Response::HTTP_OK,
            'latest_ticket' => $this->ticketData()->latest()->take(10)->get(),
            'total_priority' => $this->getTicketPerPriority(),
            'total_ticket_count' => $this->getTicketCountsByStatus(),
            'total_ticket_category' => $this->getTicketPerCategory(),
            'total_ticket_branch' => $this->getTicketPerBranch(),
            'total_today_created_ticket' => $this->getTicketPerDay(),
        ], Response::HTTP_OK);
    }

    public function ticketData($data = [])
    {
        $ticket = new TicketHdrRoleDataService($this->ticketHdr);
        return $ticket->ticketData($data);
    }

    public function getTicketPerPriority(): array
    {
        $priorities = SLA::select('priority_label', 'priority_color', 'SLA_ID')->get();

        $ticketCounts = [];

        foreach ($priorities as $priority) {
            $count = $this->ticketData()
                ->where('priority', $priority->SLA_ID)
                ->count();

            $ticketCounts[] = [
                'priority_label' => $priority->priority_label,
                'priority_color' => $priority->priority_color,
                'value' => $count,
            ];
        }

        $nullPriorityCount = $this->ticketData()
            ->whereNull('priority')
            ->count();

        $ticketCounts[] = [
            'priority_label' => 'Not Yet Priority',
            'priority_color' => 'rgb(96, 139, 193)',
            'value' => $nullPriorityCount,
        ];

        return $ticketCounts;
    }

    public function getTicketCountsByStatus($branch = null)
    {
        $ticketsQuery = $this->ticketData();

        if ($branch !== null) {
            $ticketsQuery = $ticketsQuery->whereHas('requestor', function ($query) use ($branch) {
                $query->where('branch_id', $branch);
            });
        }

        $statuses = GlobalConstants::getStatusesType();
        $ticketCounts = [];
        $totalTickets = 0;

        foreach ($statuses as $status => $label) {
            $count = (clone $ticketsQuery)->whereHas('ticket_logs_latest', function ($query) use ($status) {
                $query->where('status', $status);
            })->count();

            $ticketCounts[$label] = $count;
            $totalTickets += $count;
        }

        $nullEmpCount = (clone $ticketsQuery)->whereHas('ticket_logs_latest', function ($query) {
            $query->whereNull('emp_id');
        })->count();

        $formattedCounts = array_map(function ($label, $count) {
            return ['label' => $label, 'value' => $count];
        }, array_keys($ticketCounts), $ticketCounts);
        $formattedCounts[] = [
            'label' => 'Total Tickets',
            'value' => $totalTickets,
        ];

        $formattedCounts[] = [
            'label' => 'Total Unassigned Tickets',
            'value' => $nullEmpCount,
        ];

        return [
            'formatted_counts' => $formattedCounts,
            'unassigned_ticket' => $nullEmpCount
        ];
    }


    public function getTicketPerCategory()
    {
        $ticketsPerCategory = $this->ticketData()->get()->filter(function ($item) {
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
        $ticketsWithBranch = $this->ticketData()->get()
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
        $totalCountWithoutBranch = $this->ticketData()->get()->filter(function ($item) {
            return !isset($item->requestor->branch_id);
        })->count();

        return [
            'total_count_with_branch' => $totalCountWithBranch,
            'total_count_without_branch' => $totalCountWithoutBranch,
            'total_ticket_today' => $this->getTicketPerDay()
        ];
    }

    public function getTicketPerDay(): array
    {
        $today = Carbon::now();
        return [
            'total_created' => $this->ticketData()->whereDate('created_at', $today)->count(),
            'total_open' => $this->ticketData()->whereHas('ticket_logs_latest', function ($query) use ($today) {
                $query->whereDate('created_at', $today)->where('status', GlobalConstants::OPEN);
            })->count(),
            'total_resolved' => $this->ticketData()->whereHas('ticket_logs_latest', function ($query) use ($today) {
                $query->whereDate('created_at', $today)->where('status', GlobalConstants::COMPLETED);
            })->count(),
            'total_unassigned' => $this->ticketData()->whereHas('ticket_logs_latest', function ($query) use ($today) {
                $query->whereDate('created_at', $today)->whereNull('emp_id');
            })->count(),
        ];
    }
}
