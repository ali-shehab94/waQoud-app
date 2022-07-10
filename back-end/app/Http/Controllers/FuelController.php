<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Goutte\Client;
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



    public function scrapeFuelPrices()
    {
        //create a goutte client
        $client = new Client();
        $url = 'https://www.iptgroup.com.lb/ipt/en/our-stations/fuel-prices';
        $page = $client->request('GET', $url);
        $rawData = $page->filter('.pricesTable')->text();
        $myArray = explode(' ', $rawData);
        $UNL95 = $myArray[2];
        $prices = array(
            'UNL_95' => $myArray[2],
            'UNL_95_difference' => $myArray[4],
            'UNL_98' => $myArray[8],
            'UNL_98_difference' => $myArray[10],
            'Diesel' => $myArray[13],
            'Diesel difference' => $myArray[15],
        );
        return response()->json([
            "status" => "success",
            "prices" => $prices
        ], 200);
    }
}
