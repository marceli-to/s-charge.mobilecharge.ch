<?php
use App\Http\Controllers\Api\TranslationController;
use App\Http\Controllers\Api\CommissioningController;
use Illuminate\Http\Request;

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


Route::get('/translations/{locale}', [TranslationController::class, 'fetch']);
Route::post('/commissioning-form/send', [CommissioningController::class, 'sendUrl']);
Route::get('/commissioning-form/{uuid}', [CommissioningController::class, 'get']);
Route::post('/commissioning-form/store', [CommissioningController::class, 'store']);
Route::post('/commissioning-form/save', [CommissioningController::class, 'save']);
Route::delete('/commissioning-form/delete-contract/{uuid}', [CommissioningController::class, 'removeContract']);

/**
 * Fallback if no route is defined
 */
Route::fallback(function(){
  return response()->json(
    ['message' => 'Page Not Found. If error persists, contact m@marceli.to'],
    404
  );
});

