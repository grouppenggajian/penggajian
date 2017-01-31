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
class IjinController extends Controller{
    public function index(Request $request){
        $start = $request->start?$request->start:0;
        $limit = $request->limit?$request->limit:0;
        $query=$request->searchvalue?$request->searchvalue:NULL;
        
        $tglawal = $request->awal ? $request->awal : date('Y-m-01');
        $tglakhir= $request->akhir ? $request->akhir : date('Y-m-t') ;
        
        $table=MYModel::getDBTable('v_ijin');
//        if($tglawal){
//            if($tglakhir){
//                
//            }
//        }
        
        if($query){
            $table->where(array(['nik', 'LIKE', '%'.$query.'%']));
            $table->orWhere(array(['nama', 'LIKE', '%'.$query.'%'],['jabatan', 'LIKE', '%'.$query.'%']));
        }
        $table->whereBetween('tgl_ijin', [$tglawal, $tglakhir]);        
        $totalrec=$table->count();        
        
//        $table=MYModel::getDBTable('harilibur_pantangan');
         if($query){
            $table->where(array(['nik', 'LIKE', '%'.$query.'%']));
            $table->orWhere(array(['nama', 'LIKE', '%'.$query.'%'],['jabatan', 'LIKE', '%'.$query.'%']));
        }
        $table->whereBetween('tgl_ijin', [$tglawal, $tglakhir]);     
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
    
    public function executeRow(Request $request){ 
        $opt=$request->opt?$request->opt:NULL;
        if($opt=='insert'){
            
            $nomor=MYModel::getsetIdMaster('set','I',1,6);
            $no_ijin=$nomor[0]->idmaster;
        }else{
            $no_ijin=$request->no_ijin?$request->no_ijin:NULL;
        }
        
        $tgl_ijin=$request->tgl_ijin?$request->tgl_ijin:NULL;
        $hari_ijin=$request->hari?$request->hari:NULL;
        $jam_ijin_awal=$request->jam_awal?$request->jam_awal:NULL;
        $jam_ijin_akhir=$request->jam_akhir?$request->jam_akhir:NULL;
        $nik=$request->nik?$request->nik:NULL;
        $kategori_ijin=$request->kategori_ijin?$request->kategori_ijin:NULL;
        $tipe_ijin=$request->tipe_ijin?$request->tipe_ijin:NULL;
        $keterangan=$request->keterangan?$request->keterangan:NULL;
        $jadwal=$request->kode_shift?$request->kode_shift:NULL;
        $jam_kerja_1=$request->jam_kerja_1?$request->jam_kerja_1:NULL;
        $jam_kerja_2=$request->jam_kerja_2?$request->jam_kerja_2:NULL;
        $jam_kerja_3=$request->jam_kerja_3?$request->jam_kerja_3:NULL;
        $jam_kerja_4=$request->jam_kerja_4?$request->jam_kerja_4:NULL;
        
        $this->setDefaultTimeZone();
        $create_date=date("Y-m-d H:i:s");
        $create_by= $request->session()->get('userid');
        

        $param = array($opt, $no_ijin,
                $tgl_ijin,
               str_ireplace("'", "\'",  $hari_ijin),
                $jam_ijin_awal,
                $jam_ijin_akhir,
                $nik,
                $kategori_ijin,
                $tipe_ijin,
                $keterangan,
                $jadwal,
                $jam_kerja_1,
                $jam_kerja_2,
                $jam_kerja_3,
                $jam_kerja_4,
                $create_date,
                $create_by );
//        echo 'test';
//        return;
          $data=MYModel::SP_execData('sp_ijin',$param,true);
          
          
        return response($data,200);
    }
    public function delete(Request $request){ 
        $no_ijin=$request->no_ijin?$request->no_ijin:NULL;
        $param = array($request->opt, $no_ijin, 
            null,null, null,null,null,null,null,null,
            null,null, null,null,null,null,null);
        $data=MYModel::SP_execData('sp_ijin',$param,true);
          
          
        return response($data,200);
    }
}

?>
