<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\FuelType;
use App\Models\FuelPrice;

class FuelController extends Controller
{
    public function getFuelPrices()
    {
        $UNL95_price = FuelPrice::where('fuel_types_id', 1)->latest()->first();
        $UNL98_price = FuelPrice::where('fuel_types_id', 2)->latest()->first();
        $Diesel_price = FuelPrice::where('fuel_types_id', 3)->latest()->first();

        return response()->json([
            "status" => "success",
            "UNL95" => $UNL95_price,
            "UNL98" => $UNL98_price,
            "Diesel" => $Diesel_price,
        ], 200);
    }
}
