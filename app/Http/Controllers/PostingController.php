<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of PostingController
 *
 * @author miyzan
 */
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\MYModel;
class PostingController extends controller {

    public function loadPendapatan(Request $request) {
        $query = MYModel::getRowsTable(null, 'v_posting_pendapatan');
        return json_encode([
                    'success' => true,
                    'data' => $query,
                    'record' => count($query)
                ]);
    }
    public function loadPotongan(Request $request) {
        $query = MYModel::getRowsTable(null, 'v_posting_potongan');
        return json_encode([
                    'success' => true,
                    'data' => $query,
                    'record' => count($query)
                ]);
    }
    
    public function loadJenis(Request $request) {
        $cat = $request->cat ? $request->cat : 0;
        $query = MYModel::getRowsTable(array(array('cat','=',$cat)), 'ref_posting');
        return json_encode([
                    'success' => true,
                    'data' => $query,
                    'record' => count($query)
                ]);
    }
    
    public function deletePendapatan(Request $request) {
        $opt='delete';
        $postdata=$request->postdata?json_decode($request->postdata):array();
        $param = array($opt,$postdata->jenis, $postdata->kode);
        $data=MYModel::SP_execData('sp_posting_pendapatan',$param,true);
        return response($data,200);   
    }
    public function deletePotongan(Request $request) {
        $opt='delete';
        $postdata=$request->postdata?json_decode($request->postdata):array();
        $param = array($opt,$postdata->jenis, $postdata->kode);
        $data=MYModel::SP_execData('sp_posting_potongan',$param,true);
        return response($data,200);   
    }
    public function savePendapatan(Request $request) {
        $opt='insert';
        $postdata=$request->postdata?json_decode($request->postdata):array();
        
        if (count($postdata)>0){
            $param =array('clear', null,null);
            $data=MYModel::SP_execData('sp_posting_pendapatan',$param,true);
                foreach ($postdata as $value) {
                    $param = array($opt,$value->jenis, $value->kode);
                    $data=MYModel::SP_execData('sp_posting_pendapatan',$param,true);
                }
            
        }
        
        return response($data,200);   
    }
    public function savePotongan(Request $request) {
        $opt='insert';
        $postdata=$request->postdata?json_decode($request->postdata):array();
        
        if (count($postdata)>0){
            $param =array('clear', null,null);
            $data=MYModel::SP_execData('sp_posting_potongan',$param,true);
                foreach ($postdata as $value) {
                    $param = array($opt,$value->jenis, $value->kode);
                    $data=MYModel::SP_execData('sp_posting_potongan',$param,true);
                }
            
        }
        
        return response($data,200);   
    }
    
    
    
    
    public function executeRows(Request $request) {
        
        $pengali=$request->pengali?json_decode($request->pengali):array();
        $pendapatan=$request->pendapatan?json_decode($request->pendapatan):array();
        $postpotongan=$request->postpotongan?$request->postpotongan:'';
        $exec=MYModel::SP_execData('sp_rumusterlambat_postpotongan',array($postpotongan),true);
            if (count($pendapatan)>0){
                $param = array('clear', null);
                $data=MYModel::SP_execData('sp_rumusterlambat_pendapatan',$param,true);
                foreach ($pendapatan as $value) {
                    $param = array('insert', $value->kode);
                    $data=MYModel::SP_execData('sp_rumusterlambat_pendapatan',$param,true);
                }
                if($data['success']==1){
                    if (count($pengali)>0){
                        $param = array('clear', null, null);
                        $data=MYModel::SP_execData('sp_rumusterlambat_pengali',$param,true);
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
