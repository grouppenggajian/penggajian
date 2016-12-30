<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of MYModel
 *
 * @author miyzan
 */

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\MYModel;

class RumusTHRController extends Controller {

    public function index(Request $request) {
        $data = MYModel::getRowsTable(NULL, 'rumus_thr_masakerja', NULL, NULL);
        return json_encode([
                    'success' => true,
                    'data' => $data,
                    'record' => count($data)
                ]);      
    }
    public function executeRows(Request $request){
       
        $masakerja=$request->masakerja?json_decode($request->masakerja):array();
        $pendapatan=$request->pendapatan?json_decode($request->pendapatan):array();
        
        
            if (count($pendapatan)>0){
                $param = array('clear', null);
                $data=MYModel::SP_execData('sp_rumusthr_pendapatan',$param,true);
                foreach ($pendapatan as $value) {
                    $param = array('insert', $value->kode);
                    $data=MYModel::SP_execData('sp_rumusthr_pendapatan',$param,true);
                }
                if($data['success']==1){
                    if (count($masakerja)>0){
                        $param = array('clear', null, null);
                        $data=MYModel::SP_execData('sp_rumusthr_masakerja',$param,true);
                        foreach ($masakerja as $value) {
                            $param = array('insert', $value->masakerja, $value->pembagi);
                            $data=MYModel::SP_execData('sp_rumusthr_masakerja',$param,true);
                        }                        
                    }
                }
            }
        
          
        return response($data,200);
    }
    
    public function loadPendapatan(Request $request) {
//        v_rumus_lembur_pendapatan
        $data = MYModel::getRowsTable(NULL, 'v_rumus_thr_pendapatan', NULL, NULL);
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
        $data=MYModel::SP_execData('sp_rumusthr_pendapatan',$param,true);
        return response($data,200);   
    }
    
    public function deleteMasaKerja(Request $request) {
        $opt=$request->opt?$request->opt:null;
        $postdata=$request->postdata?json_decode($request->postdata):array();
        $param = array($opt, $postdata->masakerja,$postdata->pembagi);
        $data=MYModel::SP_execData('sp_rumusthr_masakerja',$param,true);
        return response($data,200);    
    }
   
}

?>
