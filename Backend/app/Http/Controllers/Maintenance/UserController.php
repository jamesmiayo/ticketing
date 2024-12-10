<?php

namespace App\Http\Controllers\Maintenance;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
class UserController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $data = User::getUserData($request->all())->latest()->get();
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

    public function showProfile()
    {
        $data = User::with('roles', 'section', 'section.department', 'section.department.division')
            ->where('id', Auth::user()->id)
            ->first();

        // if ($data && $data->profile_picture) {
        //     $data->profile_picture = url(Storage::url($data->profile_picture));
        // }

        return new JsonResponse(['status' => Response::HTTP_OK, 'data' => $data], Response::HTTP_OK);
    }

    public function updateUserBranchSection(Request $request): JsonResponse
    {
        $user = Auth::user();
        $user->update([
            'branch_id' => $request->branch_id,
            'section_id' => $request->section_id,
        ]);
        return new JsonResponse(['status' => Response::HTTP_OK, 'message' => 'Your Account Has been Successfully Updated' , 'data' => $user], Response::HTTP_OK);
    }

    public function uploadProfilePicture(Request $request): JsonResponse
    {
        $request->validate([
            'profile_picture' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $user = Auth::user();

        if ($request->hasFile('profile_picture')) {
            $file = $request->file('profile_picture');

            if ($user->profile_picture && Storage::exists($user->profile_picture)) {
                Storage::delete($user->profile_picture);
            }

            $filename = time() . '_' . $user->id . '.' . $file->getClientOriginalExtension();

            $path = $file->storeAs('profile_pictures', $filename, 'public');

            $user->update(['profile_picture' => $path]);

            return new JsonResponse([
                'status' => Response::HTTP_OK,
                'message' => 'Profile picture updated successfully',
                'data' => ['path' => url(Storage::url($path))],
            ], Response::HTTP_OK);
        }

        return new JsonResponse([
            'status' => Response::HTTP_BAD_REQUEST,
            'message' => 'No file uploaded',
        ], Response::HTTP_BAD_REQUEST);
    }

}
