<?php

namespace App\Services;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;
use LdapRecord\Models\Entry;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class LdapAuthenticationService
{

    protected $request;

    public function __construct($request)
    {
        $this->request = $request;
    }

    public function authenticate(): JsonResponse
    {
        $user = Entry::where('samaccountname', $this->request->username)->first();

        if (empty($user)) {
            return response()->json(['status' => Response::HTTP_NOT_FOUND, 'message' => 'User not found.'], Response::HTTP_NOT_FOUND);
        }

        $role = Role::where('name', $user['description'][0])->first();

        $localUser = User::updateOrCreate(
            ['username' =>  $this->request->username],
            [
                'emp_id' => mt_rand(1000, 9999),
                'name' => $user->getName(),
                'description' => $user['description'][0] ?? null,
                'division' => $user->getDn(),
                'password' => Hash::make( $this->request->password)
            ]
        );

        if(!empty($role)){
            $localUser->assignRole($role->name);
            $localUser->givePermissionTo($role->permissions->pluck('name'));
        }

        $token = $localUser->createToken('SAFC')->plainTextToken;

        return response()->json([
            'status' => Response::HTTP_OK,
            'message' => 'Login successful.',
            'user' => $localUser,
            'permissions' => !empty($role) ? $localUser->getAllPermissions()->pluck('name') : null,
            'access_token' => $token,
        ], Response::HTTP_OK);
    }
}
