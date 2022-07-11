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

    public function addVehicle(Request $request) {
        if (Vehicle::where('make', $request->make)
        ->where('model', $request->model)
        ->where('year', $request->year)
        ->where('cylinders', $request->cylinders)->exists())
            {
                return $this->assignVehicle($request);
            }

        $vehicle = new Vehicle;
        $vehicle->make = $request->make;
        $vehicle->model = $request->model;
        $vehicle->year = $request->year;
        $vehicle->cylinders = $request->cylinders;
        $vehicle->highway_kmpl = $request->highway_mpg / 2.352;
        $vehicle->city_kmpl = $request->city_mpg / 2.352;
        $vehicle->save();


        return response()->json([
            "status" => "success",
            "message" => "vehicle added successfully"
        ], 200);
    }
    

    public function assignVehicle(Request $request) 
    {
        $user_vehicle = new UserVehicle;
        $user_vehicle->users_id = 1;
        $user_vehicle->vehicles_id = Vehicle::where('make', $request->make)
        ->where('model', $request->model)
        ->where('year', $request->year)
        ->where('cylinders', $request->cylinders)->pluck(id);
        dd($user_vehicle->vehicles_id);
    }
}
