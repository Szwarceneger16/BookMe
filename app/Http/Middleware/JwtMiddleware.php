<?php


namespace App\Http\Middleware;

use Closure;
use Exception;
use Illuminate\Auth\Middleware\Authenticate as Middleware;
use Illuminate\Support\Facades\Auth;
use Tymon\JWTAuth\Facades\JWTAuth;

class JwtMiddleware
{

    /**
     * Handle an incoming request.
     *
     * @param \Illuminate\Http\Request $request
     * @param \Closure $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        try {
            $user = JWTAuth::parseToken()->authenticate();
        } catch (Exception $e) {
            if ($e instanceof \Tymon\JWTAuth\Exceptions\TokenInvalidException){
                return response()->json(['status' => 'Token is Invalid'],404);
            }else if ($e instanceof \Tymon\JWTAuth\Exceptions\TokenExpiredException){
                $newToken = JWTAuth::parseToken()->refresh();
                return response()->json(['status' => 'Token is Expired','token' => $newToken],401);
            }else{
                return response()->json(['status' => 'Authorization Token not found'],404);
            }
        }
        return $next($request);
    }
}
