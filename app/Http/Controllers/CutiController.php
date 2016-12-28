<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of IjinController
 *
 * @author miyzan
 */
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\MYModel;
class CutiController extends Controller{
    public function index(Request $request){
        $start = $request->start?$request->start:0;
        $limit = $request->limit?$request->limit:0;
        $query=$request->searchvalue?$request->searchvalue:NULL;
        
        $tglawal = $request->awal ? $request->awal : date('Y-m-01');
        $tglakhir= $request->akhir ? $request->akhir : date('Y-m-t') ;
        
        $table=MYModel::getDBTable('v_cuti');
//        if($tglawal){
//            if($tglakhir){
//                
//            }
//        }
        
        if($query){
            $table->where(array(['nik', 'LIKE', '%'.$query.'%']));
            $table->orWhere(array(['nama', 'LIKE', '%'.$query.'%'],['jabatan', 'LIKE', '%'.$query.'%']));
        }
        $table->whereBetween('tgl_mulai', [$tglawal, $tglakhir]);        
        $totalrec=$table->count();        
        
//        $table=MYModel::getDBTable('harilibur_pantangan');
         if($query){
            $table->where(array(['nik', 'LIKE', '%'.$query.'%']));
            $table->orWhere(array(['nama', 'LIKE', '%'.$query.'%'],['jabatan', 'LIKE', '%'.$query.'%']));
        }
        $table->whereBetween('tgl_mulai', [$tglawal, $tglakhir]);     
        $table->offset($start);
        $table->limit($limit);
        $query=$table->get();
        return json_encode([
                    'success' => true,
                    'data' => $query,
                    'record' => $totalrec
                        ]);
        
    
    }
    public function getKategoriAbsen(Request $request){
        $search=$request->searchvalue?$request->searchvalue:NULL;
        $jenis=$request->jenis>-1?$request->jenis:NULL;
        $wherevalue=$jenis>-1?array(['loadform','=',"$jenis"],['keterangan','like','%'.$search.'%']):array(['keterangan','like','%'.$search.'%']);
        $query = MYModel::getRowsTable($wherevalue, 'mst_kategori_absens', []);
        return json_encode([
                    'success' => true,
                    'data' => $query,
                    'record' => count($query)
                        ]);
    }
    
    public function getSisaCuti(Request $request){
        $tgl=$request->tgl?$request->tgl:NULL;
        $nik=$request->nik>-1?$request->nik:NULL;
        
        $query = MYModel::GetFunction('get_sisa_cuti',array($nik,$tgl));
        return json_encode([
                    'success' => true,
                    'data' => $query,
                    'record' => count($query)
                        ]);
    }
    public function executeRow(Request $request){ 
        $opt=$request->opt?$request->opt:NULL;
        if($opt=='insert'){
            
            $nomor=MYModel::getsetIdMaster('set','C',1,6);
            $no_cuti=$nomor[0]->idmaster;
        }else{
            $no_cuti=$request->no_cuti?$request->no_cuti:NULL;
        }
        
        $nik=$request->nik?$request->nik:NULL;
        $kategori_cuti=$request->kategori_cuti?$request->kategori_cuti:NULL;
        $keterangan=$request->keterangan?$request->keterangan:NULL;
        $tgl_mulai=$request->tglmulai?$request->tglmulai:NULL;
        $tgl_selesai=$request->tglselesai?$request->tglselesai:NULL;
        $sisa_cuti=$request->sisa_cuti?$request->sisa_cuti:NULL;
        $jml_cuti=$request->jml_cuti?$request->jml_cuti:NULL;
        $sisakuota_cuti=$request->sisakuota_cuti?$request->sisakuota_cuti:NULL;


        
        $this->setDefaultTimeZone();
        $create_date=date("Y-m-d H:i:s");
        $create_by= $request->session()->get('userid');
        

        $param = array($opt, $no_cuti,
                    $nik,
                    $kategori_cuti,
                    $keterangan,
                    $tgl_mulai,
                    $tgl_selesai,
                    $sisa_cuti,
                    $jml_cuti,
                    $sisakuota_cuti,
                    $create_date,
                    $create_by);
//        echo 'test';
//        return;
          $data=MYModel::SP_execData('sp_cuti',$param,true);
          
          
        return response($data,200);
    }
    public function delete(Request $request){ 
        $no_cuti=$request->no_cuti?$request->no_cuti:NULL;
        $param = array($request->opt, $no_cuti, 
            null,null, null,null,null,null,null,null,
            null,null);
        $data=MYModel::SP_execData('sp_cuti',$param,true);
          
          
        return response($data,200);
    }
}

?>
