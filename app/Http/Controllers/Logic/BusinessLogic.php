<?php

namespace App\Http\Controllers\Logic;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Http\Controllers\Data\LandlodDB;

class BusinessLogic extends Controller
{
    protected $data;

    /**
     * Create a new AdminSystem instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->data = new LandlodDB;
        
    }
    //
    public function getLandlords()
    {
        $dbResponse = $this->data->getLandlords();
        return $dbResponse['data'];

        
        
    }

    
}
