<?php

namespace App\Http\Controllers\Data;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\User;



class LandlodDB extends Controller
{
    public function getLandlords()
    {
        $status = false;
        $msg = 'Query Successful';
        $data = array();
        
        try{
            $landlords = User::select('*')
                                ->where('usercategoryid', '200')
                                ->orderBy('id', 'desc')
                                ->get();
            $status = true;

            $data = $landlords;
        }catch (QueryException $e) {
            $msg =  'Cannot Retrieve Data';
        }
        return $this->response($status, $msg, $data);
    }

    /**
     * Make a template of how the response data
     * should be arranged
     *
     * @return array
     */
    public function response($status, $msg, $data)
    {
        $response = array(
            'status' => $status,
            'msg' => $msg,
            'data' => $data,
        );
            return  $response;
    }
}
