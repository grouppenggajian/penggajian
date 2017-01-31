<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\MYModel;
class HitungLemburController extends Controller
{
    public function index(Request $request){
        $start = $request->start?$request->start:0;
        $limit = $request->limit?$request->limit:0;
        $searchvalue=$request->searchvalue?$request->searchvalue:NULL;
        $periode = MYModel::getRowsTable([], 'v_periodegaji_aktif', []);
        $tglawal = $request->awal ? $request->awal : $periode[0]->tglawal;//date('Y-m-01');
        $tglakhir= $request->akhir ? $request->akhir : $periode[0]->tglakhir;//date('Y-m-t') ;
        
        $table=MYModel::getDBTable('v_absen_lembur');
//        if($tglawal){
//            if($tglakhir){
//                
//            }
//        }
        
        if($searchvalue){
//            $table->where(array(['nik', 'LIKE', '%'.$query.'%']));
            $table->orWhere(array(['nik', 'LIKE', '"%'.$searchvalue.'%']));
            $table->orWhere(array(['nama', 'LIKE', '%'.$searchvalue.'%']));
            $table->orWhere(array(['jabatan', 'LIKE', '%'.$searchvalue.'%']));
        }
        $table->whereBetween('tgl', [$tglawal, $tglakhir]);        
        $totalrec=$table->count();        
//        echo $totalrec;
//        $table=MYModel::getDBTable('harilibur_pantangan');
         if($searchvalue){
//            $table->where(array(['nik', 'LIKE', '%'.$query.'%']));
            $table->orWhere(array(['nik', 'LIKE', '"%'.$searchvalue.'%']));
            $table->orWhere(array(['nama', 'LIKE', '%'.$searchvalue.'%']));
            $table->orWhere(array(['jabatan', 'LIKE', '%'.$searchvalue.'%']));
        }
        $table->whereBetween('tgl', [$tglawal, $tglakhir]);     
        $table->offset($start);
        $table->limit($limit);
        $query=$table->get();
        return json_encode([
                    'success' => true,
                    'data' => $query,
                    'record' => $totalrec
                        ]);
        
    
    }
    
    public function executeRow(Request $request){
        $thbl = $request->thbl?$request->thbl:NULL;
        $data=MYModel::SP_execData('sp_calc_lembur',array($thbl),true);
        $wherevalue=array(array('thbl','=',$thbl));
         $query = MYModel::getRowsTable($wherevalue, 'periode_gaji', []);
         if(count($query)>0){
             $data += [ "tglawal" => $query[0]->tglawal, "tglakhir" => $query[0]->tglakhir  ];
         }
          
//          array_push($data,'tglawal', $query->tglawal  );
//          array_push($data,'tglakhir', $query->tglakhir  );
//           $data=  json_encode($arr);
        return response($data,200);
    }
}
