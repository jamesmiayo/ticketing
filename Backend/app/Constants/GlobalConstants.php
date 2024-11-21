<?php

namespace App\Constants;

class GlobalConstants
{
    const OPEN = 1;
    const IN_PROGRESS = 2;
    const PENDING = 3;
    const ON_HOLD  = 4;
    const CANCELLED  = 5;
    const IN_REVIEW = 6;
    const COMPLETED  = 7;


    public static function getStatusesType()
    {
        return [
            self::OPEN => 'Open',
            self::IN_PROGRESS => 'In Progress',
            self::PENDING => 'Pending',
            self::ON_HOLD => 'On Hold',
            self::CANCELLED => 'Cancelled',
            self::IN_REVIEW => 'In Review',
            self::COMPLETED => 'Completed',
        ];
    }

    public static function getStatusType($Type)
    {
        return static::getStatusesType()[$Type] ?? null;
    }


//      Response::HTTP_OK; // 200
// Response::HTTP_CREATED; // 201
// Response::HTTP_NO_CONTENT; // 204
// Response::HTTP_BAD_REQUEST; // 400
// Response::HTTP_UNAUTHORIZED; // 401
// Response::HTTP_FORBIDDEN; // 403
// Response::HTTP_NOT_FOUND; // 404
// Response::HTTP_INTERNAL_SERVER_ERROR; // 500
}
