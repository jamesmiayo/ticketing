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
        $authUser = Auth::user();
        $divisionId = $authUser?->section?->department?->division_id;
        $departmentId = $authUser?->section?->department_id;
        $sectionId = $authUser?->section_id;
        $userId = $authUser?->id;

        $ticketLogsFilter = function ($query) use ($divisionId) {
            $query->whereNull('emp_id')->where('division_id' , $divisionId);
        };

        switch ($this->role) {
            case 'Admin':
                $ticketData = $this->ticketHdr->getTicketLog($data);
                break;
                case 'Head':
                    $ticketData = $this->ticketHdr->getTicketLog($data)->where(function ($query) use ($ticketLogsFilter, $divisionId) {
                        $query->whereHas('requestor.section.department.division', function ($subQuery) use ($divisionId) {
                                $subQuery->where('division_id', $divisionId);
                            })
                            ->orWhereHas('ticket_logs_latest.assignee.section.department', function ($subQuery) use ($divisionId) {
                                $subQuery->where('division_id', $divisionId);
                            })->orWhereHas('ticket_logs_latest', $ticketLogsFilter);;
                    });
                    break;
                case 'Manager':
                    $ticketData = $this->ticketHdr->getTicketLog($data)->where(function ($query) use ($ticketLogsFilter, $departmentId) {
                            $query->whereHas('requestor.section.department', function ($subQuery) use ($departmentId) {
                                $subQuery->where('department_id', $departmentId);
                            })
                            ->orWhereHas('ticket_logs_latest.assignee.section', function ($subQuery) use ($departmentId) {
                                $subQuery->where('department_id', $departmentId);
                            })->orWhereHas('ticket_logs_latest', $ticketLogsFilter);;
                    });
                    break;
                case 'Supervisor':
                    $ticketData = $this->ticketHdr->getTicketLog($data)->where(function ($query) use ($ticketLogsFilter, $sectionId) {
                        $query->whereHas('requestor.section', function ($subQuery) use ($sectionId) {
                                $subQuery->where('section_id', $sectionId);
                            })
                        ->orWhereHas('ticket_logs_latest.assignee', function ($subQuery) use ($sectionId) {
                            $subQuery->where('section_id', $sectionId);
                        })->orWhereHas('ticket_logs_latest', $ticketLogsFilter);
                });
                break;
            case 'Tech':
                $ticketData = $this->ticketHdr->getTicketLog($data)->where(function ($query) use ($ticketLogsFilter, $sectionId) {
                    $query->whereHas('requestor.section', function ($subQuery) use ($sectionId) {
                        $subQuery->where('section_id', $sectionId);
                    })
                        ->orWhereHas('ticket_logs_latest.assignee', function ($subQuery) use ($sectionId) {
                            $subQuery->where('section_id', $sectionId);
                        })->orWhereHas('ticket_logs_latest', $ticketLogsFilter);
                });
                break;
            default:
                $ticketData = $this->ticketHdr->getTicketLog($data)->where(function ($query) use ($ticketLogsFilter, $userId) {
                    $query->whereHas('ticket_logs_latest.assignee', function ($subQuery) use ($userId) {
                            $subQuery->where('id', $userId);
                        })->orWhereHas('ticket_logs_latest', $ticketLogsFilter);;
                });
                break;
        }

        return $ticketData->with(['sla']);
    }
}
