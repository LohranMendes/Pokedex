<?php

namespace App\Http\Controllers\publico;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class viewController extends Controller
{
    function casaPagina (){
        return view('site.inicial');
    }
}
