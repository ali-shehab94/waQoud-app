<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\VehicleController;
use App\Http\Controllers\FuelController;
use App\Http\Controllers\VehicleTrackerController;
use App\Http\Controllers\AuthController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout']);
Route::post('/refresh', [AuthController::class, 'refresh']);
Route::post('/profile', [AuthController::class, 'profile']);

Route::get('/user_vehicles/{id}', [VehicleController::class, 'getUserVehicles']);
Route::get('/vehicle_kpml', [VehicleController::class, 'getVehicleKmpl']);
Route::post('/add_vehicle', [VehicleController::class, 'addVehicle']);
Route::post('/assign_vehicle', [VehicleController::class, 'assignVehicle']);

Route::post('/trip_cost', [FuelController::class, 'calculateTripCost']);
Route::get('/fuel_prices', [FuelController::class, 'getFuelPrices']);
Route::get('/scrape_fuel_prices', [FuelController::class, 'scrapeFuelPrices']);

Route::post('/add_brake_tracker', [VehicleTrackerController::class, 'addBrakeTracker']);
