<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\MYModel;
use App\Http\Controllers\MesinController;

class AbsensiController extends Controller {

    public function index(Request $request) {
        $start = $request->start ? $request->start : 0;
        $limit = $request->limit ? $request->limit : 0;
        $query = $request->searchvalue ? $request->searchvalue : NULL;

        $tglawal = $request->awal ? $request->awal : date('Y-m-01');
        $tglakhir = $request->akhir ? $request->akhir : date('Y-m-t');

        $table = MYModel::getDBTable('v_logabsen');
        //        if($tglawal){
        //            if($tglakhir){
        //                
        //            }
        //        }

        if ($query) {
            $table->where(array(['nik', 'LIKE', '%' . $query . '%']));
            $table->orWhere(array(['nama', 'LIKE', '%' . $query . '%'], ['nama_jabatan', 'LIKE', '%' . $query . '%']));
        }
        $table->whereBetween('tanggal', [$tglawal, $tglakhir]);
        $totalrec = $table->count();

        //        $table=MYModel::getDBTable('harilibur_pantangan');
        if ($query) {
            $table->where(array(['nik', 'LIKE', '%' . $query . '%']));
            $table->orWhere(array(['nama', 'LIKE', '%' . $query . '%'], ['nama_jabatan', 'LIKE', '%' . $query . '%']));
        }
        $table->whereBetween('tanggal', [$tglawal, $tglakhir]);
        $table->offset($start);
        $table->limit($limit);

        $table->orderBy('pin', 'asc');
        $table->orderBy('date_time', 'asc');
        $recquery = $table->get();
        return json_encode([
                    'success' => true,
                    'data' => $recquery,
                    'record' => $totalrec
                ]);
    }

   
    public function getLogMesin(Request $request) {
        $retval=MesinController::GetAttLog();
        $json = array();
        if($retval=='koneksi gagal'){
            $json = array(
                        "success" => false,
                        "message" => 'Download Log koneksi gagal'
                    );
        }
        if($retval==true){
            $json = array(
                        "success" => true,
                        "message" => 'Download Log Finish'
                    );
        }
        if($retval==false){
            $json = array(
                        "success" => false,
                        "message" => 'Download Log Aborted'
                    );
        }
        return response($json, 200);
    }

    public function clearLogMesin(Request $request) {
        $retval=MesinController::ClearLog();
        $json = array();
        if($retval=='koneksi gagal'){
            $json = array(
                        "success" => false,
                        "message" => 'Clear Log koneksi gagal'
                    );
        }
        if($retval==true){
            $json = array(
                        "success" => true,
                        "message" => 'Clear Log Finish'
                    );
        }
        if($retval==false){
            $json = array(
                        "success" => false,
                        "message" => 'Clear Log Aborted'
                    );
        }
        return response($json, 200);
    }

}

?>