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
        UserVehicle::where('id', $request->users_vehicles_id)->update(['brakes_id' => $brake->id]);
        return response()->json([
            "status" => "success",
            "message" => "brakes tracker updated"
        ]);
    }

    public function addWheelTracker(Request $request)
    {
        $wheel = new Wheel;
        $wheel->model_name = $request->model_name;
        $wheel->lasts = $request->lasts;
        $wheel->installed_at = $request->installed_at;
        $wheel->save();
        UserVehicle::where('id', $request->users_vehicles_id)->update(['wheels_id' => $wheel->id]);
        return response()->json([
            "status" => "success",
            "message" => "wheels tracker updated"
        ]);
    }

    public function addEngineOilTracker(Request $request)
    {
        $engine_oil = new EngineOil;
        $engine_oil->model_name = $request->model_name;
        $engine_oil->lasts = $request->lasts;
        $engine_oil->installed_at = $request->installed_at;
        $engine_oil->save();
        UserVehicle::where('id', $request->users_vehicles_id)->update(['engine_oils_id' => $engine_oil->id]);
        return response()->json([
            "status" => "success",
            "message" => "engine oil tracker updated"
        ]);
    }

}
