<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\publico\viewController as VC;

Route::get('/', [VC::class, 'casaPagina'])->name('inicio');
