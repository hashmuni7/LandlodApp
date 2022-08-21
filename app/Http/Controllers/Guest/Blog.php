<?php

namespace App\Http\Controllers\Guest;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class Blog extends Controller
{
    //
    public function index()
    {
        return view('guest.blog');
    }
}