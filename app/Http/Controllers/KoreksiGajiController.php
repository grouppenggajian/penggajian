<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\MYModel;
class KoreksiGajiController extends Controller
{
    public function index(Request $request) {
         $start = $request->start ? $request->start : 0;
        $limit = $request->limit ? $request->limit : 100;
        $periode = MYModel::getRowsTable([], 'v_periodegaji_aktif', []);
        $thbl = $request->thbl ? $request->thbl : $periode[0]->thbl;
        $query=$request->searchvalue?$request->searchvalue:NULL;
        
        $sqlsearch='';
//        $sqlsearch=array('where'=>array(['deleted', '=', '0']));
        if($query){
            $sqlsearch=' and (nik LIKE "%'.$query.'%" or nama LIKE "%'.$query.'%" or jabatan LIKE "%'.$query.'%" or get_nama_jabatan(jabatan) LIKE "%'.$query.'%" )';
            
        }
//        return $sqlsearch;
        $orderby='';
        $dataall=MYModel::SP_getData('sp_gaji_rekap',array('countdata',$thbl,$sqlsearch,$orderby,''));
        $vlimit="limit $start,$limit";
        
            
        $data = MYModel::SP_getData('sp_gaji_rekap',array('loaddata',$thbl,$sqlsearch,$orderby,$vlimit));
        return json_encode([
                    'success' => true,
                    'data' => $data,
                    'record' => $dataall[0]->retval
                ]);
    }
    
    public function pendapatanLoad(Request $request) {
        $thbl = $request->thbl ? $request->thbl : NULL;
        $nik=$request->nik?$request->nik:NULL;     
        
        $table = MYModel::getDBTable('v_gajipendapatan');
        
        $table->where(array(array('thbl', '=', $thbl)));
        $table->where(array(array('nik', '=', $nik)));
        
        $totalrec = $table->count();
        
        $table->orderBy('kode', 'ASC');
        $data = $table->get();
        
        return json_encode([
                    'success' => true,
                    'data' => $data,
                    'record' => $totalrec
                ]);
    }
    public function potonganLoad(Request $request) {
        $thbl = $request->thbl ? $request->thbl : NULL;
        $nik=$request->nik?$request->nik:NULL;     
        
        $table = MYModel::getDBTable('v_gajipotongan');
        
        $table->where(array(array('thbl', '=', $thbl)));
        $table->where(array(array('nik', '=', $nik)));
        
        $totalrec = $table->count();
        
        $table->orderBy('kode', 'ASC');
        $data = $table->get();
        
        return json_encode([
                    'success' => true,
                    'data' => $data,
                    'record' => $totalrec
                ]);
    }
    public function executeRow(Request $request) {
        $thbl = $request->vthbl ? $request->vthbl : NULL;
        $nik=$request->nik?$request->nik:NULL;  
        $potongan=$request->potongan?json_decode($request->potongan):array();
        $pendapatan=$request->pendapatan?json_decode($request->pendapatan):array();
        $periode = MYModel::getRowsTable(array(array('thbl','=',$thbl)), 'v_periodegaji_aktif', []);
        $data = array(
                    "success" => false,
                    "message" => 'Execute Is Nothing !!'
                );
        if(count($periode)>0) {
            if (count($pendapatan)>0){                
                foreach ($pendapatan as $value) {
                    $param = array('pendapatan',$thbl,$nik,$value->kode,$value->nilai);
                    $data=MYModel::SP_execData('sp_koreksi_gaji',$param,true);
                }                
            }
            if (count($potongan)>0){                
                foreach ($potongan as $value) {
                    $param = array('potongan',$thbl,$nik,$value->kode,$value->nilai);
                    $data=MYModel::SP_execData('sp_koreksi_gaji',$param,true);
                }                
            }
        }else{
            $data = array(
                    "success" => false,
                    "message" => 'Periode Gaji Is Closed !!'
                );
        }
            
        
          
        return response($data,200);
    }
}
