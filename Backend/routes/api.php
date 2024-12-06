<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\Maintenance\BranchController;
use App\Http\Controllers\Maintenance\DepartmentController;
use App\Http\Controllers\Maintenance\SectionController;
use App\Http\Controllers\Maintenance\CategoryController;
use App\Http\Controllers\Maintenance\RoleController;
use App\Http\Controllers\Maintenance\DivisionController;
use App\Http\Controllers\Maintenance\PermissionController;
use App\Http\Controllers\Maintenance\UserController;
use App\Http\Controllers\Maintenance\SubCategoryController;
use App\Http\Controllers\Ticket\TicketDtlController;
use App\Http\Controllers\Ticket\TicketHdrController;
use App\Http\Controllers\Ticket\TicketLogController;
use App\Http\Controllers\Ticket\TicketDocumentController;
use App\Http\Controllers\User\UserTicketController;

Route::prefix('auth')->group(function () {
    Route::post('login', [AuthController::class, 'login']);
    Route::post('validate-token', [AuthController::class, 'checkToken']);
});

Route::middleware(['auth'])->group(function () {
    Route::get('dashboard', [DashboardController::class , 'index']);
    Route::get('get-user', [UserController::class, 'index']);
    Route::post('logout', [AuthController::class, 'logout']);
    //maintenance routes
    Route::prefix('maintenance')->group(function () {
        Route::resource('permission', PermissionController::class);
        Route::resource('division', DivisionController::class);
        Route::resource('branch', BranchController::class);
        Route::resource('department', DepartmentController::class);
        Route::resource('section', SectionController::class);
        Route::resource('category', CategoryController::class);
        Route::resource('sub-category', SubCategoryController::class);
        Route::resource('role', RoleController::class);
        Route::post('role-permission', [PermissionController::class, 'assignRolePermission']);
    });

    //tickets routes
    Route::prefix('ticket')->group(function () {
        Route::post('satisfactory', [TicketHdrController::class, 'ticketSatisFactory']);
        Route::post('sent-message', [TicketDtlController::class, 'create']);
        Route::get('sent-message/{ticket_id}', [TicketDtlController::class, 'show']);
        Route::get('ticket-logs', TicketLogController::class);
        Route::resource('ticket-hdr', TicketHdrController::class);
        Route::post('assign' , [TicketHdrController::class , 'assignTicket']);
        Route::put('priority', [TicketHdrController::class , 'updatePriority']);
        Route::post('upload', [TicketDocumentController::class, 'store']);
        Route::get('documents', [TicketDocumentController::class, 'getByAuthenticatedUser']);
        Route::put('change-status/{ticket_id}', [TicketHdrController::class, 'changeTicketStatus']);
    });

    Route::prefix('user')->group(function () {
        Route::post('branch-section' , [UserController::class, 'updateUserBranchSection']);
        Route::get('profile', [UserController::class, 'showProfile']);
        Route::get('ticket', UserTicketController::class);
        Route::post('branch', [UserController::class, 'updateUserBranch']);
        Route::post('section', [UserController::class, 'updateUserSection']);
        Route::post('role', [UserController::class, 'updateUserRole']);
        Route::post('upload-profile', [UserController::class, 'uploadProfilePicture']);
    });
});