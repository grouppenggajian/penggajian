<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\MYModel;
class HitungThrController extends Controller
{
    public function index(Request $request) {
        $start = $request->start ? $request->start : 0;
        $limit = $request->limit ? $request->limit : 100; 
       
        $periode = MYModel::getRowsTable([], 'v_periodethr_aktif', []);
        
        $searchvalue = $request->searchvalue ? $request->searchvalue : NULL;
        $thbl = $request->tahun ? $request->tahun : $periode[0]->thbl;
        $tglthr = $request->tglthr ? $request->tglthr : $periode[0]->tglthr;
        
        $table = MYModel::getDBTable('v_hitthr');
        
        $table->where(array(array('tahun', '=', $thbl)));
        $table->where(array(array('tglthr', '=', $tglthr)));
        if ($searchvalue) {
            $table->where(array(['nik', 'LIKE', '%'.$searchvalue.'%']));
            $table->orWhere(array(['nama', 'LIKE', '%' . $searchvalue . '%']));
            $table->orWhere(array(['jabatan', 'LIKE', '%' . $searchvalue . '%']));
        }
        
        $totalrec=$table->count();
        $table->orderby('tahun','DESC');
        $table->orderby('nik','ASC');
        $table->offset($start);
        $table->limit($limit);
        $query = $table->get();

        return json_encode([
                    'success' => true,
                    'data' => $query,
                    'record' => $totalrec
                ]);
    }
    public function executeRow(Request $request) {
        $tgl = $request->vtglthr ? $request->vtglthr : NULL;
        $thbl = $request->vtahun ? $request->vtahun : NULL;
        $create_by = $request->session()->get('userid');
        $data = MYModel::SP_execData('sp_hit_thr', array($thbl,$tgl,$create_by), true);


        return response($data, 200);
        
                    
                
                
        
    }
}
