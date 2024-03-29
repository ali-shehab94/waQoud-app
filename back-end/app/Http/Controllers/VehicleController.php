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

        //if a vehicle _id is specified in the request, only that vehicle will be returned, else all vehicles will be returned
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

    public function getVehicleName(Request $request)
    {
        $vehicle = Vehicle::where('id', $request["vehicle_id"])->first();
        $vehicle_name = $vehicle->make. ' '. $vehicle->model. ' '. $vehicle->year;
        return response()->json([
            "status" => "success",
            "vehicle_name" => $vehicle_name
        ], 200);
    }


    public function addVehicle(Request $request) {
        //check if the vehicle already exists in database
        $vehicle_exists = Vehicle::where('make', $request->make)
        ->where('model', $request->model)
        ->where('year', $request->year)
        ->where('fuel_type', $request->fuel_type)
        ->where('cylinders', $request->cylinders)->exists();
        // $vehicles_id = $this->queryVehicle($request);
        if (!$vehicle_exists)
            {   
                $vehicle = new Vehicle;
                $vehicle->make = $request->make;
                $vehicle->model = $request->model;
                $vehicle->year = $request->year;
                $vehicle->fuel_type = $request->fuel_type;
                $vehicle->cylinders = $request->cylinders;
                $vehicle->kmpl = $request->mpg / 2.352;
                $vehicle->save();
            }

        $vehicles_id = Vehicle::where('make', $request->make)
        ->where('model', $request->model)
        ->where('year', $request->year)
        ->where('fuel_type', $request->fuel_type)
        ->where('cylinders', $request->cylinders)->pluck('id');
        $vehicles_id = $vehicles_id[0];
        //get id from variable
        //check if user already added same vehicle to prevent duplicates
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
        return response()->json([
            "status" => "success",
            "message" => "vehicle with id $vehicles_id successfully to user with id $request->users_id"
        ], 200);
    }
}
