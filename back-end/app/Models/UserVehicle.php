<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserVehicle extends Model
{
    use HasFactory;
    protected $table = 'users_vehicles';

    public function user()
    {
        return $this->hasMany(User::class, 'id', 'users_id');
    }
    public function vehicle()
    {
        return $this->hasMany(Vehicle::class, 'id', 'vehicles_id');
    }
    public function brakes()
    {
        return $this->hasMany(Vehicle::class, 'id', 'brakes_id');
    }
    public function wheels()
    {
        return $this->hasMany(Vehicle::class, 'id', 'wheels_id');
    }
    public function engineOils()
    {
        return $this->hasMany(Vehicle::class, 'id', 'engine_oils_id');
    }
}
