<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('main');
});
Route::get('/login', function () {
    return view('login');
});
Route::get('/main/getMainMenu','MainController@getMainMenu');
Route::get('/main/getAccordionMenu','MainController@getAccordionMenu');
Route::get('/main/getMenuHeadJson','MainController@getMenuHeadJson');

Route::get('/jabatan/load','JabatanController@index');
Route::get('/pendapatan/load','PendapatanController@index');
Route::post('/pendapatan/executeRow','PendapatanController@executeRow');
Route::post('/pendapatan/deleteRow','PendapatanController@deleteRow');
