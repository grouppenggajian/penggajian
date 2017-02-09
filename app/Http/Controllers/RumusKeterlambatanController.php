<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of RumusKeterlambatanController
 *
 * @author miyzan
 */
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\MYModel;
class RumusKeterlambatanController extends Controller {

    //put your code here
    public function jenisHariKerja(Request $request) {
        $table = MYModel::getDBTable('ref_jenisharikerja');
    $query = $table->whereIn('id', [1, 2])->get();

        return json_encode([
                    'success' => true,
                    'data' => $query,
                    'record' => count($query)
                        ]);
    }
    
//    public function loadPostPotongan(Request $request) {
////        v_rumus_lembur_pendapatan
//        $data = MYModel::getRowsTable(NULL, 'rumus_terlambat_postpotongan', NULL, NULL);
//        return json_encode([
//                    'success' => true,
//                    'data' => $data,
//                    'record' => count($data)
//                ]);        
//    }
    public function loadPendapatan(Request $request) {
//        v_rumus_lembur_pendapatan
        $data = MYModel::getRowsTable(NULL, 'v_rumus_terlambat_pendapatan', NULL, NULL);
        return json_encode([
                    'success' => true,
                    'data' => $data,
                    'record' => count($data)
                ]);        
    }
    
    public function loadPengali(Request $request) {
//        v_rumus_lembur_pendapatan
        $data = MYModel::getRowsTable(NULL, 'rumus_terlambat_pengali', NULL, NULL);
        return json_encode([
                    'success' => true,
                    'data' => $data,
                    'record' => count($data)
                ]);        
    }
    
    public function deletePendapatan(Request $request) {
        $opt=$request->opt?$request->opt:null;
        $postdata=$request->postdata?json_decode($request->postdata):array();
        $param = array($opt, $postdata->kode);
        $data=MYModel::SP_execData('sp_rumusterlambat_pendapatan',$param,true);
        return response($data,200);   
    }
    
    public function deletePengali(Request $request) {
        $opt=$request->opt?$request->opt:null;
        $postdata=$request->postdata?json_decode($request->postdata):array();
        $param = array($opt, $postdata->status,$postdata->nilaikali);
        $data=MYModel::SP_execData('sp_rumusterlambat_pengali',$param,true);
        return response($data,200);    
    }
    
    
    public function executeRows(Request $request) {
        
        $pengali=$request->pengali?json_decode($request->pengali):array();
        $pendapatan=$request->pendapatan?json_decode($request->pendapatan):array();
//        $postpotongan=$request->postpotongan?$request->postpotongan:'';
//        $exec=MYModel::SP_execData('sp_rumusterlambat_postpotongan',array($postpotongan),true);
            if (count($pendapatan)>0){
                $param = array('clear', null);
                $data=MYModel::SP_execData('sp_rumusterlambat_pendapatan',$param,false);
                foreach ($pendapatan as $value) {
                    $param = array('insert', $value->kode);
                    $data=MYModel::SP_execData('sp_rumusterlambat_pendapatan',$param,true);
                }
                if($data['success']==1){
                    if (count($pengali)>0){
                        $param = array('clear', null, null);
                        $data=MYModel::SP_execData('sp_rumusterlambat_pengali',$param,false);
                        foreach ($pengali as $value) {
                            $param = array('insert', $value->status, $value->nilaikali);
                            $data=MYModel::SP_execData('sp_rumusterlambat_pengali',$param,true);
                        }                        
                    }
                }
            }
        
          
        return response($data,200);
    }

}

?>
