<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of JadwalController
 *
 * @author miyzan
 */
namespace App\Http\Controllers;

use Illuminate\Http\Request;
//use Illuminate\Support\Facades\Request;
//use App\Http\Requests;
use App\Models\MYModel;
class JadwalController extends Controller{
    //put your code here
    public function index(Request $request){
        $start = $request->start?$request->start:0;
        $limit = $request->limit?$request->limit:0;
//        echo $request->searchvalue;
//        return;
        $query=$request->searchvalue?$request->searchvalue:NULL;
        
        $sqlsearch=NULL;
        if($query){
            $sqlsearch=array('where'=>array(['kode_jabatan', 'LIKE', '%'.$query.'%']),
                'orwhere'=>array(['nama_jabatan', 'LIKE', '%'.$query.'%'],['nik', 'LIKE', '%'.$query.'%'],['nama', 'LIKE', '%'.$query.'%']));
        }

        $data = MYModel::getRowsTableQueryLimit('v_jadwal',$sqlsearch,$start,$limit,['kode_jabatan','asc']);
        return json_encode([
                    'success' => true,
                    'data' => $data[0],
                    'record' => $data[1]
                        ]);
    }
    
    public function loadInput(Request $request){
        $nik = $request->nik ? $request->nik : null;
        $kode_jabatan = $request->kode_jabatan ? $request->kode_jabatan : null;
        $opt='get';
        

        $data = MYModel::SP_getData('sp_jadwalkaryawans', array($opt, $nik, $kode_jabatan, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL));
        return json_encode([
                    'success' => true,
                    'data' => $data,
                    'record' => count($data)
                ]);
    }
    public function deleteJadwal(Request $request) {
        $opt= $request->opt ? $request->opt : null;
        $nik = $request->nik ? $request->nik : null;
        $kode_jabatan = $request->kode_jabatan ? $request->kode_jabatan : null;
              
        $data = MYModel::SP_execData('sp_jadwalkaryawans', array($opt, $nik, $kode_jabatan, NULL, NULL,NULL,NULL,NULL,NULL,NULL,NULL),true);
        return response($data,200);
    }
    public function saveJadwal(Request $request) {
        $opt = $request->opt ? $request->opt : '';
        $nik = $request->nik ? $request->nik : null;
        $kode_jabatan = $request->kode_jabatan ? $request->kode_jabatan : null;                
        $postdata=$request->postdata?json_decode($request->postdata):array();
        $vuser='test';
        if (count($postdata)>0){ 
            if($opt=='insert'){
                foreach ($postdata as $value) {
                    $param = array(
                        $opt,
                        $nik,
                        $kode_jabatan, 
                        $value->senin, 
                        $value->selasa,
                        $value->rabu,
                        $value->kamis,
                        $value->jumat,
                        $value->sabtu,
                        $value->minggu,
                        $vuser);
                    $data=MYModel::SP_execData('sp_jadwalkaryawans',$param,true);
                }
            }else{
                $param = array($opt, $nik, $kode_jabatan, NULL, NULL,NULL,NULL,NULL,NULL,NULL,NULL);
                $data=MYModel::SP_execData('sp_jadwalkaryawans',$param,true);
                foreach ($postdata as $value) {
                    $param = array(
                        'save',
                        $nik,
                        $kode_jabatan, 
                        $value->senin, 
                        $value->selasa,
                        $value->rabu,
                        $value->kamis,
                        $value->jumat,
                        $value->sabtu,
                        $value->minggu,
                        $vuser);
                    $data=MYModel::SP_execData('sp_jadwalkaryawans',$param,true);
                }
            }
            
        }else
        {
            $data= array(
                    "success" => false,
                    "message" => 'No Data Found To Execute!'
                );
        }
        
        return response($data,200);
    }
}

?>
