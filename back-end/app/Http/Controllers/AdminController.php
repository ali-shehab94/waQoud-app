<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\FuelType;
use App\Models\Vehicle;
use App\Models\UserVehicle;
use App\Models\FuelPrice;


class AdminController extends Controller
{
    public function getUsers()
    {
        $users = User::all();
        return response()->json([
            "status" => "success",
            "users" => $users
        ], 200);
    }

    public function deleteUser($id) 
       {
          $user = User::where('id', $id)->firstOrFail()->delete();
          return response()->json([
              "status" => "success",
              "message" => "user record deleted successfully"
          ], 200);
       }

    public function getVehicles()
    {
        $vehicles = Vehicle::all();
        return response()->json([
            "status" => "success",
            "vehicles" => $vehicles
        ], 200);
    }

    public function deleteVehicle($id) 
       {
          $user = Vehicle::where('id', $id)->firstOrFail()->delete();
          return response()->json([
              "status" => "success",
              "message" => "vehicle record deleted successfully"
          ], 200);
       }



}
