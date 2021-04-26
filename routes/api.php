<?php

use App\Http\Controllers\JobsServicesController;
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
    Route::post('login', 'AuthController@login');
    Route::post('register', 'AuthController@register');
    Route::post('logout', 'AuthController@logout');
    Route::post('refresh', 'AuthController@refresh');

});

Route::group([
    'middleware' => 'api',
    'namespace' => 'App\Http\Controllers',
    'prefix' => 'user',
], function($router){
    Route::post('check-password', 'UserController@checkPassword');
    Route::get('me', 'UserController@authUser');
    Route::post('change-password','UserController@changePassword');
    Route::post('update-data','UserController@update');
    Route::post('update-data2','UserController@update2');
});

Route::get('services', [JobsServicesController::class, 'index']);
