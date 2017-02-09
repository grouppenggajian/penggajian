<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\MYModel;
class GajiPendapatanController extends Controller
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
        $dataall=MYModel::SP_getData('sp_gaji_pendapatan',array('countdata',$thbl,$sqlsearch,$orderby,''));
        $vlimit="limit $start,$limit";
        
            
        $data = MYModel::SP_getData('sp_gaji_pendapatan',array('loaddata',$thbl,$sqlsearch,$orderby,$vlimit));
        return json_encode([
                    'success' => true,
                    'data' => $data,
                    'record' => $dataall[0]->retval
                ]);
    }
    public function executeRow(Request $request){
        $thbl = $request->thbl?$request->thbl:0;
        $wherevalue=array(array('thbl','=',$thbl));        
        $query = MYModel::getRowsTable($wherevalue, 'periode_gaji', []);
        $data=MYModel::SP_execData('sp_calc_pendapatan',array($thbl,$query[0]->tglawal,$query[0]->tglakhir),true);                
        
        $data += [ "thbl" => $thbl  ];
        
          
//          array_push($data,'tglawal', $query->tglawal  );
//          array_push($data,'tglakhir', $query->tglakhir  );
//           $data=  json_encode($arr);
        return response($data,200);
    }
}
