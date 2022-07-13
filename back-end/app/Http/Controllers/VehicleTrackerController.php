<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Vehicle;
use App\Models\Brake;
use App\Models\BrakeTracker;
use App\Models\Wheel;
use App\Models\WheelTracker;
use App\Models\EngineOil;
use App\Models\EngineOilTracker;
use App\Models\UserVehicle;
use Illuminate\Http\Request;

class VehicleTrackerController extends Controller
{
    public function addBrakeTracker(Request $request)
    {
        $brake = new Brake;
        $brake->model_name = $request->model_name;
        $brake->lasts = $request->lasts;
        $brake->installed_at = $request->installed_at;
        $brake->save();
        $tracker = new BrakeTracker;
        $users_vehicles_id = UserVehicle::where('users_id', $request->users_id)
        ->where('vehicles_id', $request->vehicles_id)->pluck('id');
        $tracker->users_vehicles_id = $users_vehicles_id[0];
        $tracker->brakes_id = $brake->id;
        $tracker->save();

        return response()->json([
            "status" => "success"
        ]);
    }

    // public function addBrakeTracker(Request $request)
    // {
    //     $brake = new Brake;
    //     $table->model_name = $request->model_name;--->latest()
    //     $table->lasts = $request->lasts;
    //     $table->installed_at = $request->installed_at;
    //     $brake->save();

    //     $tracker = new BrakeTracker;
    //     $table->users_vehicles_id = UserVehicle::where('users_id', $request->users_id)
    //     ->where('vehicles_id', $request->vehicles_id)->pluck('id');
    //     $table->brakes_id = $request->brakes_id;
    //     $tracker->save();

    //     return response()->json([
    //         "status" => "success"
    //     ]);
    // }
}
