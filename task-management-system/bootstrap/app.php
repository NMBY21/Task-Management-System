<?php

// use Illuminate\Foundation\Application;
// use Illuminate\Foundation\Configuration\Exceptions;
// use Illuminate\Foundation\Configuration\Middleware;

// return Application::configure(basePath: dirname(__DIR__))
//     ->withRouting(
//         web: __DIR__.'/../routes/web.php',
//         api: __DIR__.'/../routes/api.php',
//         commands: __DIR__.'/../routes/console.php',
//         health: '/up',
//     )
//     ->withMiddleware(function (Middleware $middleware) {
//         //
//     })
//     ->withExceptions(function (Exceptions $exceptions) {
//         //
//     })->create();


use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful;
use Illuminate\Http\Middleware\HandleCors;
use Illuminate\Routing\Middleware\ThrottleRequests;

$app = Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        // ✅ Global Middleware (CORS Support)
        // $middleware->append(HandleCors::class);

        // ✅ Middleware for the 'api' group (including Sanctum and Throttle)
        $middleware->group('api', [
            EnsureFrontendRequestsAreStateful::class,
            // ThrottleRequests::class . ':api',
            \Illuminate\Foundation\Http\Middleware\ConvertEmptyStringsToNull::class,
            HandleCors::class, // Enable CORS
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })->create();

return $app;

// use Illuminate\Foundation\Application;
// use Illuminate\Foundation\Configuration\Exceptions;
// use Illuminate\Foundation\Configuration\Middleware;
// use Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful;
// use Illuminate\Http\Middleware\HandleCors;
// use Symfony\Component\HttpFoundation\Response;
// use Illuminate\Routing\Middleware\ThrottleRequests;


// $app = Application::configure(basePath: dirname(__DIR__))
//     ->withRouting(
//         web: __DIR__.'/../routes/web.php',
//         api: __DIR__.'/../routes/api.php',
//         commands: __DIR__.'/../routes/console.php',
//         health: '/up',
//     )
//     ->withMiddleware(function (Middleware $middleware) {
//         // ✅ Global Middleware (CORS Support)
//         $middleware->append(HandleCors::class);
//     })
//     ->withExceptions(function (Exceptions $exceptions) {
//         //
//     })->create();

// // ✅ Configure Middleware (including Sanctum)
// $app->configureMiddleware(function (Middleware $middleware) {
//     $middleware->alias([
//         'sanctum' => EnsureFrontendRequestsAreStateful::class,
//     ]);

//     $middleware->group('api', [
//         EnsureFrontendRequestsAreStateful::class,
//         ThrottleRequests::class . ':api',
//         \Illuminate\Routing\Middleware\ThrottleRequests::class.':api',
//         \Illuminate\Foundation\Http\Middleware\ConvertEmptyStringsToNull::class,
//         HandleCors::class, // Enable CORS
//     ]);
// });

// return $app;
