<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\MYModel;
class PeriodeThrController extends Controller
{
    public function index(Request $request) {
        $start = $request->start ? $request->start : 0;
        $limit = $request->limit ? $request->limit : 100;        
        $table = MYModel::getDBTable('periode_thr');
        $totalrec=$table->count();
        $table->orderby('thbl','DESC');
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
        $opt= $request->opt ? $request->opt : NULL;
        $tgl = $request->vtgl ? $request->vtgl : NULL;
        $thbl = $request->vthbl ? $request->vthbl : NULL;
        $aktif = $request->aktif ? $request->aktif : NULL;
        if($aktif==='on'){
            $aktif=1;
        }else{
            $aktif=0;
        }
        $data = MYModel::SP_execData('sp_periode_thr', array($opt,$thbl,$tgl,$aktif), true);


        return response($data, 200);
    }
    
}
