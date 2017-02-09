<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\MYModel;
class RumusDendaAbsensiController extends Controller
{
    public function comboPotongan(Request $request){        
        $query = $request->searchvalue?$request->searchvalue:'';
        
        $data = MYModel::getRowsTable(array(['keterangan', 'LIKE', '%'.$query.'%']), 'potongans');
        return json_encode([
                    'success' => true,
                    'data' => $data,
                    'record' => count($data)
                        ]);
    }
    public function jenisHariKerja(Request $request) {
        $query = $request->searchvalue?$request->searchvalue:'';
        $table = MYModel::getDBTable('ref_jenisharikerja');
        
    $query = $table->whereIn('id', [1,2,3])->where(array(array('name', 'LIKE', '%'.$query.'%')))->get();

        return json_encode([
                    'success' => true,
                    'data' => $query,
                    'record' => count($query)
                        ]);
    }
    public function loadDenda(Request $request){        
        $query = $request->kode?$request->kode:null;
        $tipe = $request->tipe?$request->tipe:null;
        if($query){
            $data = MYModel::getRowsTable(array(['kode', '=', $query],['tipe_ijin','=',$tipe]), 'rumus_denda');
        }else{
            $data = MYModel::getRowsTable([], 'rumus_denda');
        }
        return json_encode([
                    'success' => true,
                    'data' => $data,
                    'record' => count($data)
                        ]);
    }
    
    public function loadPendapatan(Request $request){        
        $query = $request->kode?$request->kode:'';
        $tipe = $request->tipe?$request->tipe:null;
        $data = MYModel::getRowsTable(array(['kategori_ijin', '=', $query],['tipe_ijin','=',$tipe]), 'v_rumus_denda_pendapatan');
        return json_encode([
                    'success' => true,
                    'data' => $data,
                    'record' => count($data)
                        ]);
    }
    
    public function loadPengali(Request $request){        
        $query = $request->kode?$request->kode:'';
        $tipe = $request->tipe?$request->tipe:null;
        $data = MYModel::getRowsTable(array(['kategori_ijin', '=', $query],['tipe_ijin','=',$tipe]), 'rumus_denda_pengali');
        return json_encode([
                    'success' => true,
                    'data' => $data,
                    'record' => count($data)
                        ]);
    }
    public function deletePendapatan(Request $request){ 
        $opt=$request->opt?$request->opt:null;
        $kategori_ijin=$request->kode?$request->kode:null;
        $tipe_ijin=$request->tipe?$request->tipe:null;
        $postdata=$request->postdata?json_decode($request->postdata):array();
        $param = array($opt,$kategori_ijin,$tipe_ijin, $postdata->kode);
        $data=MYModel::SP_execData('sp_rumusdenda_pendapatan',$param,true);
        return response($data,200);   
    }
    public function deletePengali(Request $request){ 
        $opt=$request->opt?$request->opt:null;
        $kategori_ijin=$request->kode?$request->kode:null;
        $tipe_ijin=$request->tipe?$request->tipe:null;
        $postdata=$request->postdata?json_decode($request->postdata):array();        
        $param = array($opt, $kategori_ijin,$tipe_ijin,$postdata->status, $postdata->nilaikali);
        $data=MYModel::SP_execData('sp_rumusdenda_pengali',$param,true);
        return response($data,200);   
    }
    public function deleteDenda(Request $request){ 
        $opt=$request->opt?$request->opt:null;       
        
        
//        $kategori_ijin=$request->kategori_ijin?$request->kategori_ijin:null;
//        $tipe_ijin=$request->tipe_ijin?$request->tipe_ijin:null;
//        $postpotongan=$request->postpotongan?$request->postpotongan:null;
//        $pembagi=$request->pembagi?$request->pembagi:null;       
        $formvalue=$request->formvalue?json_decode($request->formvalue):array();
        
        
            $kategori_ijin=$formvalue->kategori_ijin;
        $tipe_ijin=$formvalue->tipe_ijin;
        $postpotongan=$formvalue->postpotongan;
        $pembagi=$formvalue->pembagi;
        $data=MYModel::SP_execData('sp_rumusdenda',array('delete',$kategori_ijin,$tipe_ijin,$postpotongan,$pembagi),false);
        $param = array('deleteall', $kategori_ijin,$tipe_ijin, null);
        $data=MYModel::SP_execData('sp_rumusdenda_pendapatan',$param,true);
        $param = array('deleteall', $kategori_ijin,$tipe_ijin,null, null);
        $data=MYModel::SP_execData('sp_rumusdenda_pengali',$param,true);
        return response($data,200);   
    }
    
    public function executeRow(Request $request) {
        
        $pengali=$request->pengali?json_decode($request->pengali):array();
        $pendapatan=$request->pendapatan?json_decode($request->pendapatan):array();
        $formvalue=$request->formvalue?json_decode($request->formvalue):array();
        
        
            $kategori_ijin=$formvalue->kategori_ijin;
        $tipe_ijin=$formvalue->tipe_ijin;
        $postpotongan=$formvalue->postpotongan;
        $pembagi=$formvalue->pembagi;
        
        $data=MYModel::SP_execData('sp_rumusdenda',array('exec',$kategori_ijin,$tipe_ijin,$postpotongan,$pembagi),false);
            if (count($pendapatan)>0){
                $param = array('clear', $kategori_ijin,$tipe_ijin,null);
                $data=MYModel::SP_execData('sp_rumusdenda_pendapatan',$param,false);
                foreach ($pendapatan as $value) {
                    $param = array('insert', $kategori_ijin,$tipe_ijin,$value->kode);
                    $data=MYModel::SP_execData('sp_rumusdenda_pendapatan',$param,true);
                }
                if($data['success']==1){
                    if (count($pengali)>0){
                        $param = array('clear', $kategori_ijin,$tipe_ijin,null, null);
                        $data=MYModel::SP_execData('sp_rumusdenda_pengali',$param,false);
                        foreach ($pengali as $value) {
                            $param = array('insert', $kategori_ijin,$tipe_ijin,$value->status, $value->nilaikali);
                            $data=MYModel::SP_execData('sp_rumusdenda_pengali',$param,true);
                        }                        
                    }
                }
            }
        
          
        return response($data,200);
    }
}
