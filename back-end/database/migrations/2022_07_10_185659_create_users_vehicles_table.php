<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersVehiclesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users_vehicles', function (Blueprint $table) {
            $table->id();
            $table->integer('users_id');
            $table->integer('vehicles_id');
            $table->integer('brakes_id')->nullable();
            $table->integer('wheels_id')->nullable();
            $table->integer('engine_oils_id')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('user_vehicles');
    }
}
