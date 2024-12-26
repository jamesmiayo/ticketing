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
        $data = FaqDtl::create($request->getFAQData());

        return new JsonResponse(['status' => Response::HTTP_OK, 'data' => $data , 'message' => 'Created Successfully'], Response::HTTP_OK);
    }

    /**
     * Show the specified FAQ Header.
     */
    public function show($id)
    {
        $data = FaqDtl::find($id);

        if (!$data) {
            return new JsonResponse(['status' => Response::HTTP_NOT_FOUND, 'message' => 'FAQ DTL Not Found'], Response::HTTP_NOT_FOUND);

        }

        return new JsonResponse(['status' => Response::HTTP_OK, 'data' => $data , 'message' => 'Created Successfully'], Response::HTTP_OK);
    }

    /**
     * Update the specified FAQ Header.
     */
    public function update(UpdateFaqDtlRequest $request, $id)
    {
        $faqHeader = FaqDtl::find($id);

        if (!$faqHeader) {
            return new JsonResponse(['status' => Response::HTTP_NOT_FOUND, 'message' => 'FAQ DTL Not Found'], Response::HTTP_NOT_FOUND);
        }

        $faqHeader->update($request->getFAQData());

        return new JsonResponse(['status' => Response::HTTP_OK, 'message' => 'Update Successfully'], Response::HTTP_OK);
    }

    /**
     * Remove the specified FAQ Header.
     */
    public function destroy($id)
    {
        $faqHeader = FaqDtl::find($id);

        if (!$faqHeader) {
            return new JsonResponse(['status' => Response::HTTP_NOT_FOUND, 'message' => 'FAQ DTL Not Found'], Response::HTTP_NOT_FOUND);
        }

        $faqHeader->delete();

        return new JsonResponse(['status' => Response::HTTP_OK, 'message' => 'Deleted Successfully'], Response::HTTP_OK);
    }
}