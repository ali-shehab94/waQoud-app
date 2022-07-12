<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\VehicleController;
use App\Http\Controllers\FuelController;

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

Route::get('/user_vehicles/{id}', [VehicleController::class, 'getUserVehicles']);
Route::get('/vehicle_kpml', [VehicleController::class, 'getVehicleKmpl']);
Route::post('/add_vehicle', [VehicleController::class, 'addVehicle']);

Route::get('/fuel_prices', [FuelController::class, 'getFuelPrices']);
Route::get('/scrape_fuel_prices', [FuelController::class, 'scrapeFuelPrices']);

