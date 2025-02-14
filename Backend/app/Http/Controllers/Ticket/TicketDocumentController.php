<?php

namespace App\Http\Controllers\Ticket;

use App\Http\Controllers\Controller;
use App\Http\Requests\Ticket\UploadTicketDocumentRequest;
use App\Models\TicketDtl;
use App\Models\TicketDocument;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class TicketDocumentController extends Controller
{
    // public function store(UploadTicketDocumentRequest $request)
    // {
    //     $ticketDtl = TicketDtl::where('ticket_id', $request->ticket_id)->first();

    //     if ($ticketDtl) {
    //         $existingDocuments = TicketDocument::where('ticket_tdl_id', $ticketDtl->id)->get();

    //         foreach ($existingDocuments as $document) {
    //             Storage::disk('public')->delete($document->attachments);

    //             $document->delete();
    //         }

    //         $ticketDtl->update([
    //             'message' => $request->message,
    //         ]);
    //     } else {
    //         $ticketDtl = TicketDtl::create([
    //             'thread_id' => mt_rand(1000, 9999),
    //             'ticket_id' => $request->ticket_id,
    //             'user_id' => Auth::user()->id,
    //             'message' => $request->message,
    //         ]);
    //     }

    //     $uploadedFiles = $request->file('attachments');
    //     foreach ($uploadedFiles as $file) {
    //         $path = $file->store('ticket_documents', 'public');

    //         TicketDocument::create([
    //             'ticket_tdl_id' => $ticketDtl->id,
    //             'attachments' => $path,
    //         ]);
    //     }

    //     return response()->json([
    //         'message' => 'File uploaded successfully',
    //         'ticket_dtl' => $ticketDtl,
    //     ], 200);
    // }

    public function store(UploadTicketDocumentRequest $request)
    {
        $ticketDtl = TicketDtl::create([
            'thread_id' => mt_rand(1000, 9999),
            'ticket_id' => $request->ticket_id,
            'user_id' => Auth::user()->id,
            'message' => $request->message,
        ]);

        $uploadedFiles = $request->file('attachments');
        foreach ($uploadedFiles as $file) {
            $imageMimeTypes = ['image/jpeg', 'image/png'];
            $documentMimeTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'text/csv', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
            $mimeType = $file->getMimeType();
            if (in_array($mimeType, $imageMimeTypes)) {
                $type = 1;
            } elseif (in_array($mimeType, $documentMimeTypes)) {
                $type = 2;
            } else {
                return response()->json(['error' => 'Invalid file type.'], 400);
            }
            $path = $file->store('ticket_documents', 'public');

            TicketDocument::create([
                'ticket_tdl_id' => $ticketDtl->id,
                'type' => $type,
                'attachments' => $path,
            ]);
        }

        return response()->json([
            'message' => 'File uploaded successfully',
            'ticket_dtl' => $ticketDtl,
        ], 200);
    }

    public function getByAuthenticatedUser(Request $request)
    {
        $userId = Auth::id();
        $ticketId = $request->input('ticket_id');

        if (!$ticketId) {
            return response()->json([
                'message' => 'Ticket ID is required.',
            ], 400);
        }

        $ticketDetail = TicketDtl::where('user_id', $userId)
            ->where('ticket_id', $ticketId)
            ->with(['documents' => function ($query) {
                $query->select('id', 'ticket_tdl_id', 'attachments');
            }])
            ->first();

        if (!$ticketDetail) {
            return response()->json([
                'message' => 'No ticket details found for the authenticated user with the specified ticket ID.',
            ], 404);
        }

        $ticketDetail->documents->each(function ($document) {
            $document->file_url = url($document->attachment_url);
        });

        return response()->json([
            'message' => 'Ticket details retrieved successfully.',
            'data' => $ticketDetail,
        ], 200);
    }
}
