<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\MYModel;
class KoreksiAbsensiController extends Controller
{
    public function index(Request $request){
        $periode = MYModel::getRowsTable([], 'v_periodegaji_aktif', []);
        
        $start = $request->start?$request->start:0;
        $limit = $request->limit?$request->limit:0;
        $searchvalue=$request->searchvalue?$request->searchvalue:NULL;        
        $thbl = $request->thbl ? $request->thbl : $periode[0]->thbl;
        $tglawal = $request->awal ? $request->awal : $periode[0]->tglawal;
        $tglakhir = $request->akhir ? $request->akhir : $periode[0]->tglakhir;
        
        $table=MYModel::getDBTable('v_koreksi_absensi');
//        if($tglawal){
//            if($tglakhir){
//                
//            }
//        }
        $table->where(array(array('thbl','=',$thbl)));
        $table->whereBetween('tgl',array($tglawal,$tglakhir));
        if($searchvalue){
//            $table->where(array(['nik', 'LIKE', '%'.$query.'%']));
            $table->orWhere(array(['nik', 'LIKE', '"%'.$searchvalue.'%']));
            $table->orWhere(array(['nama', 'LIKE', '%'.$searchvalue.'%']));
           
        }
                
        $totalrec=$table->count();        
//        echo $totalrec;
//        $table=MYModel::getDBTable('harilibur_pantangan');
        $table->where(array(array('thbl','=',$thbl)));  
        $table->whereBetween('tgl',array($tglawal,$tglakhir));
         if($searchvalue){
//            $table->where(array(['nik', 'LIKE', '%'.$query.'%']));
            $table->orWhere(array(['nik', 'LIKE', '"%'.$searchvalue.'%']));
            $table->orWhere(array(['nama', 'LIKE', '%'.$searchvalue.'%']));
            
        }
           
        $table->offset($start);
        $table->limit($limit);
        $query=$table->get();
        return json_encode([
                    'success' => true,
                    'data' => $query,
                    'record' => $totalrec
                        ]);
        
    
    }
}
