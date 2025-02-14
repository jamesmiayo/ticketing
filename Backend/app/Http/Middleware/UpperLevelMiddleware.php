<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;
class UpperLevelMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (Auth::user()->hasAnyRole(['Admin', 'Head', 'Manager', 'Supervisor'])) {
            return $next($request);
        }

        return response()->json(['status' => Response::HTTP_UNAUTHORIZED , 'message' => 'Unauthorized'], Response::HTTP_UNAUTHORIZED);
    }
}
