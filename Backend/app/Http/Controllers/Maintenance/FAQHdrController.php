<?php

namespace App\Http\Controllers\Maintenance;

use App\Http\Controllers\Controller;
use App\Http\Requests\Maintenance\FAQ\StoreFaqHdrRequest;
use App\Http\Requests\Maintenance\FAQ\UpdateFaqHdrRequest;
use App\Models\FaqHdr;
use Illuminate\Http\Response;
use Illuminate\Http\JsonResponse;

class FAQHdrController extends Controller
{
    /**
     * Display a list of FAQ Headers.
     */
    public function index()
    {
        $data = FaqHdr::with('faqDetails')->latest()->get();
        return new JsonResponse(['status' => Response::HTTP_OK, 'data' => $data], Response::HTTP_OK);
    }

    /**
     * Store a newly created FAQ Header.
     */
    public function store(StoreFaqHdrRequest $request)
    {
        $faqHeader = FaqHdr::create($request->getFAQData());

        return new JsonResponse(['status' => Response::HTTP_OK, 'data' => $faqHeader , 'message' => 'Created Successfully'], Response::HTTP_OK);
    }

    /**
     * Show the specified FAQ Header.
     */
    public function show($id)
    {
        $faqHeader = FaqHdr::find($id);

        if (!$faqHeader) {
            return new JsonResponse(['status' => Response::HTTP_NOT_FOUND, 'message' => 'FAQ HDR Not Found'], Response::HTTP_NOT_FOUND);
        }

        return new JsonResponse(['status' => Response::HTTP_OK, 'data' => $faqHeader , 'message' => 'Created Successfully'], Response::HTTP_OK);
    }

    /**
     * Update the specified FAQ Header.
     */
    public function update(UpdateFaqHdrRequest $request, $id)
    {
        $faqHeader = FaqHdr::find($id);

        if (!$faqHeader) {
            return new JsonResponse(['status' => Response::HTTP_NOT_FOUND, 'message' => 'FAQ HDR Not Found'], Response::HTTP_NOT_FOUND);
        }

        $faqHeader->update($request->getFAQData());

        return new JsonResponse(['status' => Response::HTTP_OK, 'message' => 'Update Successfully'], Response::HTTP_OK);
    }

    /**
     * Remove the specified FAQ Header.
     */
    public function destroy($id)
    {
        $faqHeader = FaqHdr::find($id);

        if (!$faqHeader) {
            return response()->json(['message' => 'FAQ Header not found.'], 404);
        }

        $faqHeader->delete();

        return new JsonResponse(['status' => Response::HTTP_OK, 'message' => 'Deleted Successfully'], Response::HTTP_OK);
    }
}