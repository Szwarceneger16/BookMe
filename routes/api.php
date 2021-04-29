<?php

use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\JobsServicesController;
use App\Http\Controllers\ReservationController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group([
    'middleware' => 'api',
    'namespace' => 'App\Http\Controllers\Auth',
    'prefix' => 'auth'
], function ($router) {
    Route::post('login', [AuthController::class,'login']);
    Route::post('register', [AuthController::class,'register']);
    Route::post('logout', [AuthController::class,'logout']);
    Route::post('refresh', [AuthController::class,'refresh']);

});

Route::group([
    'middleware' => 'api',
    'namespace' => 'App\Http\Controllers',
    'prefix' => 'user',
], function($router){
    Route::post('check-password', [UserController::class,'checkPassword']);
    Route::get('me',  [UserController::class,'authUser']);
    Route::post('change-password',[UserController::class,'changePassword']);
    Route::post('update-data',[UserController::class,'update']);
    Route::get('dashboard-info',[UserController::class,'userDashboardInfo']);
});

Route::get('services', [JobsServicesController::class, 'index']);

Route::group([
    'middleware' => 'api',
], function($router){
    Route::resource('reservations', ReservationController::class);
    Route::post('get-available-reservations', [ReservationController::class,'listAvailable']);
});

 /** TODO - endpoint do dodawania wizyt
 *      - endpoint do wyświetlenia wizyt użytkownika
  *     - endpoint z ilością odbytych wizyt i oczekujących
 *
 */
