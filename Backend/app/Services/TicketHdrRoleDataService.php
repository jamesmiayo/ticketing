<?php

namespace App\Services;

use App\Models\TicketHdr;
use Illuminate\Support\Facades\Auth;

class TicketHdrRoleDataService
{
    protected $ticketHdr;

    protected $role;

    public function __construct(TicketHdr $ticketHdr)
    {
        $this->ticketHdr = $ticketHdr;
        $this->role = Auth::user()->roles->first()->name;
    }

    public function ticketData($data = null)
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
                    $query->whereHas('requestor', function ($subQuery) {
                        $subQuery->where('section_id', Auth::user()->section_id);
                    })->orWhereHas('ticket_logs_latest.assignee', function ($subQuery) {
                        $subQuery->where('section_id', Auth::user()->section_id);
                    });
                });
                break;
            default:
                $ticketData = $this->ticketHdr->getTicketLog($data)->where(function ($query) {
                    $query->whereHas('ticket_logs_latest', function ($subQuery) {
                        $subQuery->where('section_id', Auth::user()->section_id);
                    })->orWhereHas('ticket_logs_latest.assignee', function ($subQuery) {
                        $subQuery->where('id', Auth::user()->id);
                    });
                });
        }
        return $ticketData;
    }
}
