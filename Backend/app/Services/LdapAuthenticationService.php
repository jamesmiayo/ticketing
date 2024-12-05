<?php

namespace App\Services;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;
use LdapRecord\Models\Entry;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use LdapRecord\Container;
use Illuminate\Support\Arr;

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

        $connection = Container::getDefaultConnection();

        if (!$connection->auth()->attempt($user->getDn(), $this->request->password)) {
            return response()->json(['status' => Response::HTTP_BAD_REQUEST, 'message' => 'Invalid credentials.'], Response::HTTP_BAD_REQUEST);
        }

        $role = Role::where('name', $user['description'][0])->first();

        $localUser = User::where('username', $this->request->username)
            ->where('name', $user->getName())
            ->first();

        if ($localUser) {
            $localUser->update([
                'emp_id' => mt_rand(1000, 9999),
                'description' => $user['description'][0] ?? null,
                'division' => $user->getDn(),
                'password' => Hash::make($this->request->password),
            ]);
        } else {
            // If user does not exist, create a new record
            $localUser = User::create([
                'username' => $this->request->username,
                'name' => $user->getName(),
                'emp_id' => mt_rand(1000, 9999),
                'description' => $user['description'][0] ?? null,
                'division' => $user->getDn(),
                'password' => Hash::make($this->request->password),
                'section_id' => null,
                'branch_id' => null
            ]);
        }
        if (count($localUser->roles) === 0) {
            $localUser->assignRole('User');
        }

        $token = $localUser->createToken('SAFC')->plainTextToken;

        return response()->json([
            'status' => Response::HTTP_OK,
            'message' => 'Login successful.',
            'user' => $localUser,
            'permissions' => $localUser->roles && count($localUser->roles) > 0 ? $localUser->getAllPermissions()->pluck('name') : null,
            'role' => $localUser->roles->pluck('name'),
            'access_token' => $token,
        ], Response::HTTP_OK);
    }
}
