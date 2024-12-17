<?php

namespace App\Http\Controllers\Announcement;

use App\Http\Controllers\Controller;
use App\Http\Requests\Announcement\StoreAnnouncementRequest;
use App\Http\Requests\Announcement\UpdateAnnouncementRequest;
use App\Models\Announcement;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;

class AnnouncementController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        $data = Announcement::with('updated_by', 'created_by')->latest()->get();
        return new JsonResponse(['status' => Response::HTTP_OK, 'data' => $data], Response::HTTP_OK);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreAnnouncementRequest $request)
    {
        $data = Announcement::create($request->getAnnouncementData());
        return new JsonResponse(['status' => Response::HTTP_OK, 'data' => $data, 'message' => 'Created Successfully'], Response::HTTP_OK);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateAnnouncementRequest $request, Announcement $announcement)
    {
        $announcement->update($request->getAnnouncementData());
        return new JsonResponse(['status' => Response::HTTP_OK, 'message' => 'Update Successfully'], Response::HTTP_OK);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Announcement $announcement)
    {
        $announcement->delete();
        return new JsonResponse(['status' => Response::HTTP_OK, 'message' => 'Deleted Successfully'], Response::HTTP_OK);
    }
}
