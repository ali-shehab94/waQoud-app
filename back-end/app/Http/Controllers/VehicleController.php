<?php

namespace App\Http\Controllers;
use App\Models\User;
use App\Models\Vehicle;
use App\Models\UserVehicle;
use Illuminate\Http\Request;

class VehicleController extends Controller
{
    public function getUserVehicles($id, Request $request) {
        //gets the user plus the vehicles
        $user_vehicles = UserVehicle::where('users_id', $id)->with('vehicle')->get();
        $vehicle = Vehicle::where('id', $request["vehicle_id"])->first();
        //for each loop to have only vehicles for getUserVehicles' case
        $vehicles = [];
        foreach($user_vehicles as $user_vehicle) {
            array_push($vehicles, $user_vehicle->vehicle);
        }
        //now vehicle variable is an array that has all vehicles with their info

        //if a vehicle _id is specified in the request, only that vehicle will be return, else all vehicles will be returned
        if($request->has('vehicle_id')) {
            return response()->json([
                "status" => "success",
                "specified" => $vehicle,
            ], 200);
        }else {
            return response()->json([
                "status" => "success",
                "user_vehicles" => $vehicles,
            ], 200);
        };
    }

    public function getVehicleKmpl(Request $request)
    {
        $vehicle = Vehicle::where('id', $request["vehicle_id"])->first();
        $vehicle_kmpl = $vehicle->kmpl;
        return response()->json([
            "status" => "success",
            "kmpl" => $vehicle_kmpl
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
        $vehicle->fuel_type = $request->fuel_type;
        $vehicle->cylinders = $request->cylinders;
        $vehicle->kmpl = $request->mpg / 2.352;
        $vehicle->save();


        return response()->json([
            "status" => "success",
            "message" => "vehicle added successfully"
        ], 200);
    }
    

    public function assignVehicle(Request $request) 
    {
        $vehicles_id = Vehicle::where('make', $request->make)
        ->where('model', $request->model)
        ->where('year', $request->year)
        ->where('cylinders', $request->cylinders)->pluck('id');
        $vehicles_id = $vehicles_id[0];
        if (UserVehicle::where('users_id', $request->users_id)
        ->where('vehicles_id', $vehicles_id)->exists())
        {
            return response()->json([
                "status" => "success",
                "message" => "user already has this vehicle"
            ], 200);
        }

        $user_vehicle = new UserVehicle;
        $user_vehicle->users_id = $request->users_id;
        $user_vehicle->vehicles_id = $vehicles_id;
        $user_vehicle->save();
        // dd($user_vehicle->vehicles_id[0]);
        return response()->json([
            "status" => "success",
            "message" => "vehicle with id $vehicles_id successfully to user with id $user_vehicle->users_id"
        ], 200);
    }

}
