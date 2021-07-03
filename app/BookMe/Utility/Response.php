<?php

namespace App\BookMe\Utility;

use Illuminate\Contracts\Foundation\Application;
use Illuminate\Contracts\Translation\Translator;
use Illuminate\Http\JsonResponse;

/**
 * Class Response
 * @package App\BookMe\Utility
 */
class Response
{
    /**
     * Custom function to generate plain API responses
     * @param $data
     * @param int $status
     * @param string $message
     * @return JsonResponse
     */
    static function build($data, int $status, $message=""):JsonResponse
    {
        return response()->json([
            'data' => $data ?? [],
            'message'=>static::getMessage($message),
            'status'=>$status
        ],$status);
    }

    /**
     * Responses stored in resources/lang directiory
     * @param $message
     * @return string
     */
    static function getMessage($message):string
    {
        return trans($message);
    }

}
