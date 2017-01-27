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
        $tglawal = $request->awal ? $request->awal : null;
        $tglakhir= $request->akhir ? $request->akhir : null;

        $query=$request->searchvalue?$request->searchvalue:NULL;
        
        $sqlsearch='';         
        
        if($query){
            $sqlsearch='where (mst_karyawans.nik LIKE "%'.$query.'%" or mst_karyawans.nama LIKE "%'.$query.'%" or mst_karyawans.jabatan LIKE "%'.$query.'%" or nama_jabatan LIKE "%'.$query.'%")';
            
        }
        
        $dataall=MYModel::SP_getData('sp_paging_jadwal',array('count',$tglawal,$tglakhir,$sqlsearch,'',''));
        $vlimit="limit $start,$limit";
        
            
        $data = MYModel::SP_getData('sp_paging_jadwal',array('select',$tglawal,$tglakhir,$sqlsearch,'',$vlimit));
        return json_encode([
                    'success' => true,
                    'data' => $data,
                    'record' => $dataall[0]->retval
                        ]);

    }
    
    public function loadInput(Request $request){
        $nik = $request->nik ? $request->nik : null;
        $kode_jabatan = $request->kode_jabatan ? $request->kode_jabatan : null;
        $opt='get';
        $tglawal = $request->awal ? $request->awal : null;
        $tglakhir= $request->akhir ? $request->akhir : null;
              
        $data = MYModel::SP_getData('sp_jadwalkaryawans_new', array($opt, $nik, $kode_jabatan, NULL, NULL,NULL,$tglawal,$tglakhir,NULL),true);

//        $data = Pegawai::SP_getData('sp_jadwalkaryawans', array($opt, $nik, $kode_jabatan, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL));
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
        $postdata=$request->postdata?json_decode($request->postdata):array();      
        $vuser=$request->session()->get('userid');
//        $tanggal=$request->tanggal ? $request->tanggal : null;
        $param = array(
                    $opt,
                    $nik,
                    $kode_jabatan, 
                    $postdata->tanggal, 
                   str_ireplace("'", "\'",  $postdata->hari),
                    $postdata->kode_shift,   
                    null,null,
                    $vuser);
        $data = MYModel::SP_execData('sp_jadwalkaryawans_new', $param,true);
        return response($data,200);
    }
    public function saveJadwal(Request $request) {
        $nik = $request->nik ? $request->nik : null;
        $kode_jabatan = $request->kode_jabatan ? $request->kode_jabatan : null;                
        $postdata=$request->postdata?json_decode($request->postdata):array();
//        return var_dump($postdata);
        $vuser=$request->session()->get('userid');
        if (count($postdata)>0){ 
//            $param = array('deletesave', $nik, $kode_jabatan, NULL, NULL,NULL,NULL,NULL,NULL,NULL,NULL);
//            $data=Pegawai::SP_execData('sp_jadwalkaryawans',$param,true);
            $param = array(
                    'save',
                    $nik,
                    $kode_jabatan,
                $postdata->tanggal,
                str_ireplace("'", "\'",  $postdata->hari),
                $postdata->kode_shift, 
                null,null,
                $vuser
                );
//            foreach ($postdata as $key => $value) {
//                
//                if($key=='tanggal'){
//                    
//                }
//                    $value->tanggal, 
//                    $value->hari,
//                    $value->kode_shift,                    
//                    $vuser);
//                
//                
//               
//            }
            $data=MYModel::SP_execData('sp_jadwalkaryawans_new',$param,true);
                if($data['success']==1){
                    $data += [ "postdata" => $request->postdata];
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
    
    public function loadJadwalPegawai(Request $request) {
        $tanggal = $request->tanggal ? $request->tanggal : null;
        $nik = $request->nik ? $request->nik : null;
        $jabatan = $request->kode_jabatan ? $request->kode_jabatan : null;
              //$hari=  str_ireplace("'", "", $hari);
        $data = MYModel::getDBTable('v_jadwal_karyawan')            
            ->select('kode_shift', 'jam_kerja_1', 'jam_kerja_2',
                    'jam_kerja_3', 'jam_kerja_4' )
            ->where(array(array('tanggal','=',$tanggal),array('nik','=',$nik),array('kode_jabatan','=',$jabatan)))
            ->get();
        
        
        return  json_encode([
                    'success' => true,
                    'data' => $data,
                    'record' => count($data)
                        ]);
    }
    public function executeRowTukaroff(Request $request){ 
        $opt=$request->opt?$request->opt:NULL;
        if($opt=='insert'){
            
            $nomor=MYModel::getsetIdMaster('set','T',1,6);
            $no_tukar=$nomor[0]->idmaster;
        }else{
            $no_tukar=$request->no_tukar?$request->no_tukar:NULL;
        }
        
        $kode_jabatan=$request->kode_jabatan?$request->kode_jabatan:NULL;
        $nik=$request->nik?$request->nik:NULL;
        $tanggal=$request->vtanggal?$request->vtanggal:NULL;
        $hari=$request->hari?$request->hari:NULL;
        $hari=  str_ireplace("'", "\'", $hari);
        $kode_shift=$request->kode_shift?$request->kode_shift:NULL;
        $jam_kerja_1=$request->jam_kerja_1?$request->jam_kerja_1:NULL;
        $jam_kerja_2=$request->jam_kerja_2?$request->jam_kerja_2:NULL;
        $jam_kerja_3=$request->jam_kerja_3?$request->jam_kerja_3:NULL;
        $jam_kerja_4=$request->jam_kerja_4?$request->jam_kerja_4:NULL;
        $nik_tukar=$request->nik_tukar?$request->nik_tukar:NULL;
        $tanggal_tukar=$request->vtanggal_tukar?$request->vtanggal_tukar:NULL;
        $hari_tukar=$request->hari_tukar?$request->hari_tukar:NULL;
        $hari_tukar=  str_ireplace("'", "\'", $hari_tukar);
        $kode_shift_tukar=$request->kode_shift_tukar?$request->kode_shift_tukar:NULL;
        $jam_kerja_1_tukar=$request->jam_kerja_1_tukar?$request->jam_kerja_1_tukar:NULL;
        $jam_kerja_2_tukar=$request->jam_kerja_2_tukar?$request->jam_kerja_2_tukar:NULL;
        $jam_kerja_3_tukar=$request->jam_kerja_3_tukar?$request->jam_kerja_3_tukar:NULL;
        $jam_kerja_4_tukar=$request->jam_kerja_4_tukar?$request->jam_kerja_4_tukar:NULL;



        
        $this->setDefaultTimeZone();
        $create_date=date("Y-m-d H:i:s");
        $create_by= $request->session()->get('userid');
        

        $param = array($opt, $no_tukar,
                    $kode_jabatan,
                    $nik,
                    $tanggal,
                    $hari,
                    $kode_shift,
                    $jam_kerja_1,
                    $jam_kerja_2,
                    $jam_kerja_3,
                    $jam_kerja_4,
                    $nik_tukar,
                    $tanggal_tukar,
                    $hari_tukar,
                    $kode_shift_tukar,
                    $jam_kerja_1_tukar,
                    $jam_kerja_2_tukar,
                    $jam_kerja_3_tukar,
                    $jam_kerja_4_tukar,
                    $create_date,
                    $create_by);
//        echo 'test';
//        return;
          $data=MYModel::SP_execData('sp_tukaroff',$param,true);
          
          
        return response($data,200);
    }
    public function deleteTukaroff(Request $request){ 
        $no_tukar=$request->no_tukar?$request->no_tukar:NULL;
        $param = array($request->opt, $no_tukar, 
            NULL,
            NULL,
            NULL,
            NULL,
            NULL,
            NULL,
            NULL,
            NULL,
            NULL,
            NULL,
            NULL,
            NULL,
            NULL,
            NULL,
            NULL,
            NULL,
            NULL,
            NULL,
            NULL);
        $data=MYModel::SP_execData('sp_tukaroff',$param,true);
          
          
        return response($data,200);
    }
    public function indexTukaroff(Request $request){ 
        $start = $request->start?$request->start:0;
        $limit = $request->limit?$request->limit:1;
        $tglawal = $request->awal ? $request->awal : date('Y-m-01');
        $tglakhir= $request->akhir ? $request->akhir : date('Y-m-t') ;
//        return;
        $query=$request->searchvalue?$request->searchvalue:NULL;        
        $sqlsearch=NULL;
        if($query){
            $sqlsearch='where (nik LIKE "%'.$query.'%" or nama LIKE "%'.$query.'%" or nik_tukar LIKE "%'.$query.'%" or nama_tukar LIKE "%'.$query.'%" or kode_jabatan LIKE "%'.$query.'%" or nama_jabatan LIKE "%'.$query.'%")';
            
        }
        if(strlen($sqlsearch)>0){
            $sqlsearch.=' and ((tanggal between "'.$tglawal.'" and  "'.$tglakhir.'") or (tanggal_tukar between "'.$tglawal.'" and  "'.$tglakhir.'")) ';
        }else{
            $sqlsearch='where ((tanggal between "'.$tglawal.'" and  "'.$tglakhir.'") or (tanggal_tukar between "'.$tglawal.'" and  "'.$tglakhir.'")) ';
        }
        
        $sqlselect='select *';
        $sqltable='v_tukaroff ';
        $vlimit='';
        $dataall=MYModel::SP_getData('sp_paging',array($sqlselect,$sqltable,$sqlsearch,'',$vlimit));
        $vlimit="limit $start,$limit";
        
                
        $data = MYModel::SP_getData('sp_paging',array($sqlselect,$sqltable,$sqlsearch,'',$vlimit));
        return json_encode([
                    'success' => true,
                    'data' => $data,
                    'record' => count($dataall)
                        ]);
    }
}

?>
