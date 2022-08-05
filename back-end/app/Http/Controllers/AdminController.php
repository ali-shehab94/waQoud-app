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
        ]);
    }

   
}
