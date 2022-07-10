<?php

namespace App\Http\Controllers;
use App\Models\User;
use App\Models\Vehicle;
use App\Models\UserVehicle;
use Illuminate\Http\Request;

class VehicleController extends Controller
{
    public function getUserVehicles($id) {
        //gets the user plus the vehicles
        $user_vehicles = UserVehicle::where('users_id', $id)->with('vehicle')->get();
        //for each loop to have only vehicles for getUserVehicles' case
        $vehicle = [];
        foreach($user_vehicles as $user_vehicle) {
            array_push($vehicle, $user_vehicle->vehicle);
        }
        //now vehicle array has only vehicles with their info
        return response()->json([
            "status" => "success",
            "user_vehicles" => $vehicle,
        ], 200);
    }
}
