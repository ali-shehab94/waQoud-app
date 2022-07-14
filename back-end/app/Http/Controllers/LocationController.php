<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\FavoriteLocation;
use App\Models\GasStation;
use Illuminate\Http\Request;

class LocationController extends Controller
{
    public function addFavLocation(Request $request)
    {
        $location = new FavoriteLocation;
        $location->users_id = $request->users_id;
        $location->name = $request->name;
        $location->latitude = $request->latitude;
        $location->longitude = $request->longitude;
        $location->save();
        return response()->json([
            "status" => "success",
            "message" => "location added successfully"
        ]);
    }


    public function getFavLocations($id)
    {
        $user_locations = FavoriteLocation::where('users_id', $id)->get();
        return response()->json([
            "status" => "success",
            "favorite locations" => $user_locations
        ]);
    }
}
