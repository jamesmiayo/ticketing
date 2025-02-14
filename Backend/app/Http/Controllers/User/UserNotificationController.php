<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;
use App\Models\User;
use App\Models\TicketNotification;
use App\Models\Announcement;
use Illuminate\Support\Facades\Auth;

class UserNotificationController extends Controller
{
    public function __invoke(): JsonResponse
    {
        $user = User::find(Auth::id());

        return  new JsonResponse([
            'permissions' => $user->roles && count($user->roles) > 0 ? $user->getAllPermissions()->pluck('name') : null,
            'role' => $user->roles->pluck('name')->first(),
            'notifications' => [
                'data' => TicketNotification::whereIn('id', function ($query) use ($user) {
                    $query->selectRaw('MAX(id)')
                        ->from('ticket_notifications')
                        ->where('to_user', $user->id)
                        ->groupBy('ticket_id');
                })
                ->orderBy('is_read', 'asc')
                ->orderBy('created_at', 'desc')
                ->take(10)
                ->get(),
                'total_unread_ticket' => TicketNotification::where('to_user', $user->id)
                    ->where('is_read', false)->count()
            ],
            'announcement' => Announcement::with('createdBy')->latest()->first(),
        ], Response::HTTP_OK);
    }
}
