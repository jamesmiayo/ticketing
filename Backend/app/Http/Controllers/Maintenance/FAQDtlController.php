<?php

namespace App\Http\Controllers\Maintenance;

use App\Http\Controllers\Controller;
use App\Http\Requests\Maintenance\FAQ\StoreFaqDtlRequest;
use App\Http\Requests\Maintenance\FAQ\UpdateFaqDtlRequest;
use App\Models\FaqDtl;
use Illuminate\Http\Response;
use Illuminate\Http\JsonResponse;

class FAQDtlController extends Controller
{
    /**
     * Display a list of FAQ Headers.
     */
    public function index()
    {
        $data = FaqDtl::latest()->get();
        return new JsonResponse(['status' => Response::HTTP_OK, 'data' => $data], Response::HTTP_OK);
    }

    /**
     * Store a newly created FAQ Header.
     */
    public function store(StoreFaqDtlRequest $request)
    {
        $faqHeader = FaqDtl::create($request->getFAQData());

        return response()->json([
            'message' => 'FAQ Header created successfully.',
            'data' => $faqHeader,
        ], 201);
    }

    /**
     * Show the specified FAQ Header.
     */
    public function show($id)
    {
        $faqHeader = FaqDtl::find($id);

        if (!$faqHeader) {
            return response()->json(['message' => 'FAQ Header not found.'], 404);
        }

        return response()->json($faqHeader, 200);
    }

    /**
     * Update the specified FAQ Header.
     */
    public function update(UpdateFaqDtlRequest $request, $id)
    {
        $faqHeader = FaqDtl::find($id);

        if (!$faqHeader) {
            return response()->json(['message' => 'FAQ Header not found.'], 404);
        }

        $faqHeader->update($request->getFAQData());

        return response()->json([
            'message' => 'FAQ Header updated successfully.',
            'data' => $faqHeader,
        ], 200);
    }

    /**
     * Remove the specified FAQ Header.
     */
    public function destroy($id)
    {
        $faqHeader = FaqDtl::find($id);

        if (!$faqHeader) {
            return response()->json(['message' => 'FAQ Header not found.'], 404);
        }

        $faqHeader->delete();

        return response()->json(['message' => 'FAQ Header deleted successfully.'], 200);
    }
}