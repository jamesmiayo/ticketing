<?php

namespace App\Services;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;
use App\Models\User;

class ApiAuthenticationService
{
    protected $request;

    public function __construct($request)
    {
        $this->request = $request;
    }

    public function authenticate(): JsonResponse
    {
        $user = User::where('email', $this->request->email)->first();

        if (!$user || !$user->checkPassword($this->request->password)) {
            return new JsonResponse(['error' => 'Invalid credentials'], Response::HTTP_UNAUTHORIZED);
        }

        $token = $user->createToken('authToken')->plainTextToken;

        return new JsonResponse([
            'status' => Response::HTTP_OK,
            'user' => $user,
            'access_token' => $token
        ], Response::HTTP_OK);
    }

    public function validateToken(): JsonResponse
    {
        return new JsonResponse([
            'user' => $this->request,
        ], Response::HTTP_OK);
    }
}
