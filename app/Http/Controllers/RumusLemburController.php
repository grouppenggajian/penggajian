<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of RumusLembur
 *
 * @author miyzan
 */

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\MYModel;

class RumusLemburController extends Controller {

    //put your code here
    public function loadPembagi(Request $request) {
//        rumus_lembur_pembagi
        $data = MYModel::getRowsTable(NULL, 'rumus_lembur_pembagi', NULL, NULL);
        return json_encode([
                    'success' => true,
                    'data' => $data,
                    'record' => count($data)
                ]);        
    }
    
    public function loadPendapatan(Request $request) {
//        v_rumus_lembur_pendapatan
        $data = MYModel::getRowsTable(NULL, 'v_rumus_lembur_pendapatan', NULL, NULL);
        return json_encode([
                    'success' => true,
                    'data' => $data,
                    'record' => count($data)
                ]);        
    }
    
    public function loadPengali(Request $request) {
//        v_rumus_lembur_pendapatan
        $data = MYModel::getRowsTable(NULL, 'rumus_lembur_pengali', NULL, NULL);
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
        $data=MYModel::SP_execData('sp_rumuslembur_pendapatan',$param,true);
        return response($data,200);   
    }
    
    public function deletePengali(Request $request) {
        $opt=$request->opt?$request->opt:null;
        $postdata=$request->postdata?json_decode($request->postdata):array();
        $param = array($opt, $postdata->status,$postdata->jam_ke,
            $postdata->min_jam,$postdata->max_jam,$postdata->nilaikali,$postdata->ordernum);
        $data=MYModel::SP_execData('sp_rumuslembur_pengali',$param,true);
        return response($data,200);    
    }
    
    
    public function executeRows(Request $request) {
        $pembagi=$request->pembagi?$request->pembagi:null;
        $pengali=$request->pengali?json_decode($request->pengali):array();
        $pendapatan=$request->pendapatan?json_decode($request->pendapatan):array();
        if($pembagi){
            $data=MYModel::SP_execData('sp_rumuslembur_pembagi',array($pembagi),true);
        }
        if($data['success']==1){
            if (count($pendapatan)>0){
                $param = array('clear', null);
                $data=MYModel::SP_execData('sp_rumuslembur_pendapatan',$param,true);
                foreach ($pendapatan as $value) {
                    $param = array('insert', $value->kode);
                    $data=MYModel::SP_execData('sp_rumuslembur_pendapatan',$param,true);
                }
                if($data['success']==1){
                    if (count($pengali)>0){
                        $param = array('clear', null, null, null, null, null, null);
                        $data=MYModel::SP_execData('sp_rumuslembur_pengali',$param,true);
                        foreach ($pengali as $value) {
                            $param = array('insert', $value->status, $value->jam_ke, 
                                    $value->min_jam, $value->max_jam, $value->nilaikali, $value->ordernum);
                            $data=MYModel::SP_execData('sp_rumuslembur_pengali',$param,true);
                        }                        
                    }
                }
            }
        } 
          
        return response($data,200);
    }

}

?>
