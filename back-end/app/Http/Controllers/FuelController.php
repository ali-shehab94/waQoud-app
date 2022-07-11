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


    //this api is made to be called on refresh or useEffect
    public function scrapeFuelPrices()
    {
        //get old fuel prices
        $UNL95_price = FuelPrice::where('fuel_types_id', 1)->latest()->first();
        $UNL98_price = FuelPrice::where('fuel_types_id', 2)->latest()->first();
        $Diesel_price = FuelPrice::where('fuel_types_id', 3)->latest()->first();

        //create a goutte client
        $client = new Client();
        $url = 'https://www.iptgroup.com.lb/ipt/en/our-stations/fuel-prices';
        //scrape url and filter data
        $page = $client->request('GET', $url);
        $rawData = $page->filter('.pricesTable')->text();
        $myArray = explode(' ', $rawData);
        $new_UNL95_price = str_replace(",","", $myArray[2]);
        $new_UNL98_price = str_replace(",","", $myArray[8]);
        $new_Diesel_price = str_replace(",","", $myArray[13]);

        // dd($UNL95_price->price);
        // dd($UNL95_price->price == $new_UNL95_price);


        //if condition to check if there is a difference in price, if true, the new price is saved in database
        if ($UNL95_price->price != $new_UNL95_price)
        {
            $UNL95_difference = $UNL95_price->price - $new_UNL95_price;
            $UNL95 = new FuelPrice;
            $UNL95->fuel_types_id = 1;
            $UNL95->price = $new_UNL95_price;
            $UNL95->save();
        }

        if ($UNL98_price->price != $new_UNL98_price)
        {
            $UNL98_difference = $UNL98_price->price - $new_UNL98_price;
            $UNL98 = new FuelPrice;
            $UNL98->fuel_types_id = 2;
            $UNL98->price = $new_UNL98_price;
            $UNL98->save();
        }

        if ($Diesel_price->price != $new_Diesel_price)
        {
            $Diesel_difference = $Diesel_price->price - $new_Diesel_price;
            $Diesel = new FuelPrice;
            $Diesel->fuel_types_id = 3;
            $Diesel->price = $new_Diesel_price;
            $Diesel->save();
        }

        //display prices comes directly from scraping the website
        $display_prices = array(
            'UNL_95' => $myArray[2],
            'UNL_95_difference' => $myArray[4],
            'UNL_98' => $myArray[8],
            'UNL_98_difference' => $myArray[10],
            'Diesel' => $myArray[13],
            'Diesel difference' => $myArray[15],
        );
        return response()->json([
            "status" => "success",
            "prices" => $display_prices
        ], 200);
    }

}
