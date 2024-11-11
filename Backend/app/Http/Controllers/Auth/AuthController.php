<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Http\Requests\LoginRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;
use App\Services\LdapAuthenticationService;
use App\Services\ApiAuthenticationService;

class AuthController extends Controller
{
    public function login(LoginRequest $request)
    {
        if (env('AUTHENTICATION') === 'LDAP') {
            return (new LdapAuthenticationService($request))->authenticate();
        } elseif (env('AUTHENTICATION') === 'API') {
            return (new ApiAuthenticationService($request))->authenticate();
        } else {
            return  new JsonResponse(['status' => Response::HTTP_BAD_REQUEST, 'message' => 'Check env for authentication'], Response::HTTP_BAD_REQUEST);
        }
    }

    public function logout(): JsonResponse
    {
        User::destroyToken();
        return new JsonResponse(['status' => Response::HTTP_OK, 'message' => 'User logged out'], Response::HTTP_OK);
    }
}
