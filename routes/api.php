<?php

use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\JobsServicesController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\PlaceController;
use App\Http\Controllers\ReservationController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\WorkHourController;
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
    'middleware' => 'jwt',
    'prefix' => 'user'
], function($router){
    Route::post('check-password', [UserController::class,'checkPassword']);
    Route::get('me',  [UserController::class,'authUser']);
    Route::post('change-password',[UserController::class,'changePassword']);
    Route::post('update-data',[UserController::class,'update']);
    Route::get('dashboard-info',[UserController::class,'userDashboardInfo']);
    Route::get('client-active-reservations', [ReservationController::class, 'listClientActiveReservations']);
    Route::get('client-every-reservations', [ReservationController::class, 'listClientEveryReservations']);
    Route::post('cancel-reservation', [ReservationController::class, 'cancelReservation']);
});

Route::group([
    'middleware' => 'jwt',
    'prefix' => 'employee'
], function($router){
    Route::post('all-reservations-info', [ReservationController::class, 'listEmployeeAllReservationsInfo']);
});

Route::group([
    'middleware' => 'jwt',
    'prefix' => 'places'
], function ($router){
   Route::get('/', [PlaceController::class, 'list']);
   Route::post('/', [PlaceController::class, 'store']);
   Route::delete('/{id}', [PlaceController::class, 'destroy']);
   Route::put('/{id}', [PlaceController::class, 'update']);
});

Route::group([], function($router){
    Route::get('services', [JobsServicesController::class, 'index']);
    Route::post('services/assign', [JobsServicesController::class,'assignToEmployee']);
    Route::resource('reservations', ReservationController::class);
    Route::resource('employees', EmployeeController::class);
    Route::resource('workHours', WorkHourController::class);
    Route::post('list-workhours', [WorkHourController::class,'list']);
    Route::post('get-available-reservations', [ReservationController::class,'listAvailable']);
    Route::post('get-all-reservations', [ReservationController::class,'listAll']);
    Route::post('get-employees-by-service',[EmployeeController::class,'listEmployeesByService']);
});

Route::group([
    'middleware' => 'auth:api',
    'namespace' => 'App\Http\Controllers',
    'prefix' => 'payments',
], function ($router){
    Route::post('create-payment-intent', [PaymentController::class, 'createPaymentIntent']);
});
Route::group([
    'namespace' => 'App\Http\Controllers',
    'prefix' => 'payments',
], function ($router){
    Route::get('handle-payment-response', [PaymentController::class, 'handlePaymentResponse']);
});


 /** TODO - endpoint do dodawania wizyt
 *      - endpoint do wyświetlenia wizyt użytkownika
  *     - endpoint z ilością odbytych wizyt i oczekujących
 *
 */
