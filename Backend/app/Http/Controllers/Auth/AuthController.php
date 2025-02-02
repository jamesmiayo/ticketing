<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Http\Requests\LoginRequest;
use App\Models\Announcement;
use App\Models\TicketNotification;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;
use App\Services\LdapAuthenticationService;
use Illuminate\Support\Facades\Auth;
use Laravel\Sanctum\PersonalAccessToken;
use App\Services\ApiAuthenticationService;

class AuthController extends Controller
{
    public function login(LoginRequest $request)
    {
        return (new ApiAuthenticationService($request))->authenticate();
        // if (env('AUTHENTICATION') == 'LDAP') {
        //     return (new LdapAuthenticationService($request))->authenticate();
        // } elseif (env('AUTHENTICATION') == 'API') {
        //     return (new ApiAuthenticationService($request))->authenticate();
        // } else {
        //     return  new JsonResponse(['status' => Response::HTTP_BAD_REQUEST, 'message' => 'Check env for authentication'], Response::HTTP_BAD_REQUEST);
        // }
    }

    public function logout(): JsonResponse
    {
        User::destroyToken();
        return new JsonResponse(['status' => Response::HTTP_OK, 'message' => 'User logged out'], Response::HTTP_OK);
    }

    public function checkToken(): JsonResponse
    {
        $token = request()->bearerToken();
        $personalAccessToken = PersonalAccessToken::findToken($token);
        $user = User::find($personalAccessToken?->tokenable_id);
        if ($personalAccessToken && !empty($user)) {
            $user->load([ 'section.department', 'section.department.division']);

            return new JsonResponse([
                'isValid' => true,
                'roles' => $user->roles->pluck('name')->first(),
                'user' => $user,
        ], Response::HTTP_OK);
        } else {
            return new JsonResponse([
                'status' => Response::HTTP_UNAUTHORIZED,
                'message' => 'Token expired',
            ], Response::HTTP_UNAUTHORIZED);
        }

    }

}
