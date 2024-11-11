<?php

use App\Http\Middleware\AuthMiddleware;
use App\Http\Middleware\CorsMiddleware;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Request;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Symfony\Component\HttpKernel\Exception\MethodNotAllowedHttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Illuminate\Http\Response;
use Illuminate\Http\JsonResponse;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__ . '/../routes/web.php',
        api: __DIR__ . '/../routes/api.php',
        commands: __DIR__ . '/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->alias([
            'auth' => AuthMiddleware::class,
        ]);
        $middleware->append(CorsMiddleware::class);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        $exceptions->render(function (Exception $e, Request $request) {
            if ($request->is('api/*')) {
                switch (get_class($e)) {
                    case NotFoundHttpException::class:
                        return new JsonResponse(['status' => Response::HTTP_NOT_FOUND, 'message' => 'Url does not exist'], Response::HTTP_NOT_FOUND);
                    case AccessDeniedHttpException::class:
                        return new JsonResponse(['status' => Response::HTTP_FORBIDDEN, 'message' => 'This action is unauthorized'], Response::HTTP_FORBIDDEN);
                    case AuthenticationException::class:
                        return new JsonResponse(['status' => Response::HTTP_UNAUTHORIZED, 'message' => 'User Token is invalid.'], Response::HTTP_UNAUTHORIZED);
                    case MethodNotAllowedHttpException::class:
                        return new JsonResponse(['status' => Response::HTTP_METHOD_NOT_ALLOWED, 'message' => 'Method not allowed.'], Response::HTTP_METHOD_NOT_ALLOWED);
                }
            }
        });
    })->create();
