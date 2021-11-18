<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class IndexController extends Controller
{
    public function index()
    {
        echo "<pre>";
        print_r("Index Controller");
        echo "</pre>";
        die();
    }
}
