<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of KetentuanController
 *
 * @author miyzan
 */

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\MYModel;

class KetentuanController extends controller {

    public function index(Request $request) {
        $query = MYModel::getRowsTable(null, 'ketentuan');
        return json_encode([
                    'success' => true,
                    'data' => $query,
                    'record' => count($query)
                ]);
    }

    public function indexPantangan(Request $request) {
        $query = MYModel::getRowsTable(null, 'ketentuan_pantangan');
        return json_encode([
                    'success' => true,
                    'data' => $query,
                    'record' => count($query)
                ]);
    }

    public function save(Request $request) {

        $toleransi = $request->toleransi ? $request->toleransi : NULL;
        $kuotacuti = $request->kuotacuti ? $request->kuotacuti : NULL;
        $mulaiabsen = $request->mulaiabsen ? $request->mulaiabsen : NULL;
        $ipmesin = $request->ipmesin ? $request->ipmesin : NULL;
        $pwdmesin = $request->pwdmesin  ? $request->pwdmesin  : NULL;
        $periodemulai = $request->periodemulai ? $request->periodemulai : NULL;
        $periodeselesai = $request->periodeselesai ? $request->periodeselesai : NULL;
        $pantangan = $request->pantangan ? json_decode($request->pantangan) : array();

        $query = MYModel::getRowsTable(NULL, 'ketentuan');
        $retval = 1;
        if (count($query) > 0) {
            $retval = MYModel::setUpdateRow('ketentuan', NULL
                            , array(
                        'toleransi' => $toleransi,
                        'kuotacuti' => $kuotacuti,
                        'periodemulai' => $periodemulai,
                        'periodeselesai' => $periodeselesai,
                                'mulaiabsen' => $mulaiabsen,
                        'ipmesin' => $ipmesin,
                                'pwdmesin'=> $pwdmesin
                                ));
        }else{
            $retval = MYModel::setInsertRow('ketentuan', array( array(
                        'toleransi' => $toleransi,
                        'kuotacuti' => $kuotacuti,
                        'periodemulai' => $periodemulai,
                        'periodeselesai' => $periodeselesai,
                                'mulaiabsen' => $mulaiabsen,
                        'ipmesin' => $ipmesin,
                                'pwdmesin'=> $pwdmesin
                )));
        }
//        if($retval){
            $param = array('clear', null);
            $data=MYModel::SP_execData('sp_ketentuanpantangan',$param,true);
            if($data['success']==1){
                foreach ($pantangan as $value) {
                            $param = array('insert', $value->hari);
                            $data=MYModel::SP_execData('sp_ketentuanpantangan',$param,true);
                        }              
            }else{
                $retval=$data['success'];
            }
//        }
        
//        if ($retval) {
//                return response(array("success" => true,
//                            "message" => 'Execute Successfull!'), 200);
//            }else{
//                return response(array("success" => false,
//                            "message" => 'Execute Aborted!'), 200);
//            }
             return response(array("success" => true,
                            "message" => 'Execute Successfull!'), 200);
    }
    public function deletePantangan(Request $request) {
        $opt=$request->opt?$request->opt:null;
        $postdata=$request->postdata?json_decode($request->postdata):array();
        $param = array($opt, $postdata->hari);
        $data=MYModel::SP_execData('sp_ketentuanpantangan',$param,true);
        return response($data,200);   
    }
    

}

?>
