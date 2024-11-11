<?php

namespace App\Http\Controllers\Maintenance;

use App\Http\Controllers\Controller;
use App\Http\Requests\Maintenance\Branch\StoreBranchRequest;
use App\Http\Requests\Maintenance\Branch\UpdateBranchRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;
use App\Models\Branch;
use Illuminate\Support\Facades\Auth;

class BranchController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = Branch::latest()->get();
        return new JsonResponse(['status' => Response::HTTP_OK, 'data' => $data], Response::HTTP_OK);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreBranchRequest $request)
    {
        $data = Branch::create($request->getBranchData());
        return new JsonResponse(['status' => Response::HTTP_OK, 'data' => $data , 'message' => 'Created Successfully'], Response::HTTP_OK);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateBranchRequest $request, Branch $branch)
    {
        $branch->update($request->getBranchData());
        return new JsonResponse(['status' => Response::HTTP_OK, 'message' => 'Update Successfully'], Response::HTTP_OK);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Branch $branch)
    {
        $branch->delete();
        return new JsonResponse(['status' => Response::HTTP_OK, 'message' => 'Deleted Successfully'], Response::HTTP_OK);
    }
}
