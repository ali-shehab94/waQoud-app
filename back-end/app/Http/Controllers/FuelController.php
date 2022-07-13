<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Goutte\Client;
use App\Models\FuelType;
use App\Models\Vehicle;
use App\Models\FuelPrice;

class FuelController extends Controller
{

    //setting global varaibles so I can use them in other functions
    public function __construct()
    {
        $this->UNL95_price = FuelPrice::where('fuel_types_id', 1)->latest()->first();
        $this->UNL98_price = FuelPrice::where('fuel_types_id', 2)->latest()->first();
        $this->Diesel_price = FuelPrice::where('fuel_types_id', 3)->latest()->first();
    }
  

    public function getFuelPrices()
    {
        return response()->json([
            "status" => "success",
            "UNL95" => $this->UNL95_price,
            "UNL98" => $this->UNL98_price,
            "Diesel" => $this->Diesel_price,
        ], 200);
    }


    //this api will scrape IPT website for updates in gas price
    //made to be called on refresh
    public function scrapeFuelPrices()
    {
        //create a goutte client
        $client = new Client();
        $url = 'https://www.iptgroup.com.lb/ipt/en/our-stations/fuel-prices';
        //scrape page and filter data
        $page = $client->request('GET', $url);
        $rawData = $page->filter('.pricesTable')->text();
        $myArray = explode(' ', $rawData);
        $new_UNL95_price = str_replace(",","", $myArray[2]);
        $new_UNL98_price = str_replace(",","", $myArray[8]);
        $new_Diesel_price = str_replace(",","", $myArray[13]);

        // dd($UNL95_price->price);
        // dd($UNL95_price->price == $new_UNL95_price);


        //check if db is empty
        if (FuelPrice::exists()) {
            //if condition to check if price changed, if true, the new price is saved in database
            if ($this->UNL95_price->price != $new_UNL95_price)
        {
            $UNL95_difference = $this->UNL95_price->price - $new_UNL95_price;
            $UNL95 = new FuelPrice;
            $UNL95->fuel_types_id = 1;
            $UNL95->price = $new_UNL95_price;
            $UNL95->save();
        }

        if ($this->UNL98_price->price != $new_UNL98_price)
        {
            $UNL98_difference = $this->UNL98_price->price - $new_UNL98_price;
            $UNL98 = new FuelPrice;
            $UNL98->fuel_types_id = 2;
            $UNL98->price = $new_UNL98_price;
            $UNL98->save();
        }

        if ($this->Diesel_price->price != $new_Diesel_price)
        {
            $Diesel_difference = $this->Diesel_price->price - $new_Diesel_price;
            $Diesel = new FuelPrice;
            $Diesel->fuel_types_id = 3;
            $Diesel->price = $new_Diesel_price;
            $Diesel->save();
        }
        } else {
            $UNL95 = new FuelPrice;
            $UNL95->fuel_types_id = 1;
            $UNL95->price = $new_UNL95_price;
            $UNL95->save();

            $UNL98 = new FuelPrice;
            $UNL98->fuel_types_id = 2;
            $UNL98->price = $new_UNL98_price;
            $UNL98->save();

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


    public function calculateTripCost(Request $request)
    {
        //get vehicle by id
        $vehicle = Vehicle::where('id', $request->vehicle_id)->first();
        //assign price variable to 0
        $price = 0;
        //if conditions to determine what fuel type the vehicle uses 
        if ($vehicle->fuel_type == 1)
        {
            $price = $this->UNL95_price->price;
        }
        else if ($vehicle->fuel_type == 2)
        {
            $price = $this->UNL98_price->price;
        }
        else if ($vehicle->fuel_type == 3)
        {
            $price = $this->Diesel_price->price;
        }

        //prices are for 20 L of each
        $liter_price = $price / 20;
        $distance = $request->distance;
        $kmpl = $vehicle->kmpl;
        //amount of fuel needed is the distance divided by km per liter
        $amt_fuel_needed = $distance / $kmpl;
        $total = $amt_fuel_needed * $liter_price;
        $trip_cost = number_format($total);

        return response()->json([
            "status" => "success",
            "trip cost" => $trip_cost . ' LBP'
        ]);
    }

}
