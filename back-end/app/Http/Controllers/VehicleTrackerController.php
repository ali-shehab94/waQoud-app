<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Vehicle;
use App\Models\Brake;
use App\Models\Wheel;
use App\Models\EngineOil;
use App\Models\UserVehicle;
use Illuminate\Http\Request;

class VehicleTrackerController extends Controller
{
    public function addBrakeTracker(Request $request)
    {
        $users_id = $request->users_id;
        $vehicles_id = $request->vehicles_id;
        $users_vehicles_id = UserVehicle::where('users_id', $users_id)->where('vehicles_id', $vehicles_id)->first()->id;
        $brake = new Brake;
        $brake->model_name = $request->model_name;
        $brake->lasts = $request->lasts;
        $brake->installed_at = $request->installed_at;
        $brake->save();
        UserVehicle::where('id', $users_vehicles_id)->update(['brakes_id' => $brake->id]);
        return response()->json([
            "status" => "success",
            "message" => "brakes tracker updated"
        ]);
    }

    public function addWheelTracker(Request $request)
    {
        $users_id = $request->users_id;
        $vehicles_id = $request->vehicles_id;
        $users_vehicles_id = UserVehicle::where('users_id', $users_id)->where('vehicles_id', $vehicles_id)->first()->id;
        $wheel = new Wheel;
        $wheel->model_name = $request->model_name;
        $wheel->lasts = $request->lasts;
        $wheel->installed_at = $request->installed_at;
        $wheel->save();
        UserVehicle::where('id', $users_vehicles_id)->update(['wheels_id' => $wheel->id]);
        return response()->json([
            "status" => "success",
            "message" => "wheels tracker updated"
        ]);
    }

    public function addEngineOilTracker(Request $request)
    {
        $users_id = $request->users_id;
        $vehicles_id = $request->vehicles_id;
        $users_vehicles_id = UserVehicle::where('users_id', $users_id)->where('vehicles_id', $vehicles_id)->first()->id;
        $engine_oil = new EngineOil;
        $engine_oil->model_name = $request->model_name;
        $engine_oil->lasts = $request->lasts;
        $engine_oil->installed_at = $request->installed_at;
        $engine_oil->save();
        UserVehicle::where('id', $users_vehicles_id)->update(['engine_oils_id' => $engine_oil->id]);
        return response()->json([
            "status" => "success",
            "message" => "engine oil tracker updated"
        ]);
    }

    public function getTrackers(Request $request)
    {
        $users_id = $request->users_id;
        $vehicles_id = $request->vehicles_id;
        $users_vehicles_id = UserVehicle::where('users_id', $users_id)->where('vehicles_id', $vehicles_id)->first()->id;
        $vehicle = UserVehicle::where('id', $users_vehicles_id)->with('brakes', 'wheels', 'engineOils')->first();
        
        if (isset($vehicle->brakes[0])) {
            $brakes = $vehicle->brakes[0];
            $brakes['type'] = 'brakes';
        }else $brakes = [];

        if (isset($vehicle->wheels[0])) {
            $wheels = $vehicle->wheels[0];
            $wheels['type'] = 'wheels';
        }else $wheels = [];

        if (isset($vehicle->engineOils[0])) {
            $engineOils = $vehicle->engineOils[0];
            $engineOils['type'] = 'engine_oils';
        }else $engineOils = [];
        
        $tracker = array($brakes, $wheels, $engineOils);
        return response()->json([
            "status" => "success",
            "tracker" => $tracker
        ]);
    }
}
