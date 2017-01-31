<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\MYModel;
class HitungInsentifHadirController extends Controller
{
    public function index(Request $request){
        $start = $request->start?$request->start:0;
        $limit = $request->limit?$request->limit:0;
        $searchvalue=$request->searchvalue?$request->searchvalue:NULL;
        $periode = MYModel::getRowsTable([], 'v_periodegaji_aktif', []);
        $thbl = $request->thbl ? $request->thbl : $periode[0]->thbl;
        
        $table=MYModel::getDBTable('v_insentifhadir');
//        if($tglawal){
//            if($tglakhir){
//                
//            }
//        }
        $table->where(array(array('thbl','=',$thbl)));
        if($searchvalue){
//            $table->where(array(['nik', 'LIKE', '%'.$query.'%']));
            $table->orWhere(array(['nik', 'LIKE', '"%'.$searchvalue.'%']));
            $table->orWhere(array(['nama', 'LIKE', '%'.$searchvalue.'%']));
            $table->orWhere(array(['jabatan', 'LIKE', '%'.$searchvalue.'%']));
        }
                
        $totalrec=$table->count();        
//        echo $totalrec;
//        $table=MYModel::getDBTable('harilibur_pantangan');
        $table->where(array(array('thbl','=',$thbl)));  
         if($searchvalue){
//            $table->where(array(['nik', 'LIKE', '%'.$query.'%']));
            $table->orWhere(array(['nik', 'LIKE', '"%'.$searchvalue.'%']));
            $table->orWhere(array(['nama', 'LIKE', '%'.$searchvalue.'%']));
            $table->orWhere(array(['jabatan', 'LIKE', '%'.$searchvalue.'%']));
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
    public function executeRow(Request $request){
        $thbl = $request->thbl?$request->thbl:NULL;
        $data=MYModel::SP_execData('sp_calc_insentifhadir',array($thbl),true);
        $data += [ "thbl" => $thbl];
        return response($data,200);
    }
}
