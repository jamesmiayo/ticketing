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
        switch ($this->role) {
            case 'Admin':
                $ticketData = $this->ticketHdr->getTicketLog($data);
                break;
            case 'Head':
                $ticketData = $this->ticketHdr->getTicketLog($data)->where(function ($query) {
                    $query->whereHas('ticket_logs_latest', function ($subQuery) {
                        $subQuery->where('division_id', Auth::user()->section->department->division_id);
                    })->orWhereHas('requestor.section.department', function ($subQuery) {
                        $subQuery->where('division_id', Auth::user()->section->department->division_id);
                    })->orWhereHas('ticket_logs_latest.assignee.section.department', function ($subQuery) {
                        $subQuery->where('division_id', Auth::user()->section->department->division_id);
                    });
                });
                break;
            case 'Manager':
                $ticketData = $this->ticketHdr->getTicketLog($data)->where(function ($query) {
                    $query->whereHas('ticket_logs_latest', function ($subQuery) {
                        $subQuery->where('department_id', Auth::user()->section->department_id);
                    })->orWhereHas('requestor.section', function ($subQuery) {
                        $subQuery->where('department_id', Auth::user()->section->department_id);
                    })->orWhereHas('ticket_logs_latest.assignee.section', function ($subQuery) {
                        $subQuery->where('department_id', Auth::user()->section->department_id);
                    });
                });
                break;
            case 'Supervisor':
                $ticketData = $this->ticketHdr->getTicketLog($data)->where(function ($query) {
                    $query->whereHas('ticket_logs_latest', function ($subQuery) {
                        $subQuery->where('section_id', Auth::user()->section_id);
                    })->orWhereHas('requestor', function ($subQuery) {
                        $subQuery->where('section_id', Auth::user()->section_id);
                    })->orWhereHas('ticket_logs_latest.assignee', function ($subQuery) {
                        $subQuery->where('section_id', Auth::user()->section_id);
                    });
                });
                break;
            default:
                $ticketData = $this->ticketHdr->getTicketLog($data)->where(function ($query) {
                    $query->whereHas('requestor', function ($subQuery) {
                        $subQuery->where('section_id', Auth::user()->section_id);
                    })->orWhereHas('ticket_logs_latest.assignee', function ($subQuery) {
                        $subQuery->where('id', Auth::user()->id);
                    });
                });
        }
        return $ticketData;
    }

    public function getTicketPerPriority(): array
    {
        $priorities = GlobalConstants::getPrioritiesType();

        $ticketCounts = [];

        foreach ($priorities as $key => $label) {
            $ticketCounts[] = $this->ticketData()->get()->where('priority', $key)->count();
        }

        $nullPriorityCount = $this->ticketData()->get()->whereNull('priority')->count();

        $ticketCounts[] = $nullPriorityCount;

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
