<?php

namespace App\Http\Controllers\Maintenance;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;
use Spatie\Permission\Models\Role;
class UserController extends Controller
{
    public function index(): JsonResponse
    {
        $data = User::with('roles','branch', 'section', 'section.department', 'section.department.division')->latest()->get();
        return new JsonResponse(['status' => Response::HTTP_OK, 'data' => $data], Response::HTTP_OK);
    }

    public function updateUserBranch(Request $request): JsonResponse
    {
        $user = User::find($request->user_id);
        $user->update(['branch_id' => $request->branch_id]);
        return new JsonResponse(['status' => Response::HTTP_OK, 'data' => 'User Branch Updated Successfully'], Response::HTTP_OK);
    }

    public function updateUserSection(Request $request): JsonResponse
    {
        $user = User::find($request->user_id);
        $user->update(['section_id' => $request->section_id]);
        return new JsonResponse(['status' => Response::HTTP_OK, 'data' => 'User Section Updated Successfully'], Response::HTTP_OK);
    }

    public function updateUserRole(Request $request): JsonResponse
    {
        $role = Role::where('id',$request->role_id)->first();
        $user = User::find($request->user_id);
        $user->roles()->detach();
        $user->assignRole($role->name);
        return new JsonResponse(['status' => Response::HTTP_OK,'ss' => $role, 'data' => 'User Section Updated Successfully'], Response::HTTP_OK);
    }
}
