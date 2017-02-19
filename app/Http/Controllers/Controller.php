<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;
    public function setDefaultTimeZone(){
        date_default_timezone_set('Asia/Jakarta');
    }
    public function getCompayName(){
        return 'LARIS SWALAYAN';
    }
    
    public function getThblString($thbl)
    {
        $th = substr($thbl,0,4);
        $bl = substr($thbl,4,2);
        if ($bl == '01') $bl = 'Januari';
        else if ($bl == '02') $bl = 'Februari';
        else if ($bl == '03') $bl = 'Maret';
        else if ($bl == '04') $bl = 'April';
        else if ($bl == '05') $bl = 'Mei';
        else if ($bl == '06') $bl = 'Juni';
        else if ($bl == '07') $bl = 'Juli';
        else if ($bl == '08') $bl = 'Agustus';
        else if ($bl == '09') $bl = 'September';
        else if ($bl == '10') $bl = 'Oktober';
        else if ($bl == '11') $bl = 'Nopember';
        else if ($bl == '12') $bl = 'Desember';
        return $bl.' '.$th;
    }
}
