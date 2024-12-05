<?php

namespace App\Http\Controllers\Maintenance;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Permission;
use Illuminate\Http\Response;
use Illuminate\Http\JsonResponse;
use App\Models\Role;
use App\Http\Requests\Maintenance\Permission\StorePermissionRequest;
use App\Http\Requests\Maintenance\Permission\UpdatePermissionRequest;

class PermissionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = Permission::latest()->get();
        return new JsonResponse(['status' => Response::HTTP_OK, 'data' => $data], Response::HTTP_OK);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePermissionRequest $request)
    {
        $data = Role::create($request->getPermissionData());
        return new JsonResponse(['status' => Response::HTTP_OK, 'data' => $data , 'message' => 'Created Successfully'], Response::HTTP_OK);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePermissionRequest $request, Permission $permission)
    {
        $permission->update($request->getRoleData());
        return new JsonResponse(['status' => Response::HTTP_OK, 'message' => 'Update Successfully'], Response::HTTP_OK);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Permission $permission)
    {
        $permission->delete();
        return new JsonResponse(['status' => Response::HTTP_OK, 'message' => 'Deleted Successfully'], Response::HTTP_OK);
    }

    public function assignRolePermission(Request $request): JsonResponse
    {
        $role = Role::find($request->role_id);
        $role->syncPermissions($request->data);
        return new JsonResponse(['status' => Response::HTTP_OK , 'message' => 'Update Role Permission Successfully'], Response::HTTP_OK);
    }
}
