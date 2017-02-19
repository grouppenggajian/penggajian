<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\MYModel;
class ApprovalThrController extends Controller
{
    public function index(Request $request) {
        $start = $request->start ? $request->start : 0;
        $limit = $request->limit ? $request->limit : 100; 
        $table = MYModel::getDBTable('v_hitthr_approval');
        $totalrec=$table->count();        
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
        
        $data = MYModel::SP_execData('sp_approval_thr', array($thbl,$tgl), true);


        return response($data, 200);
        
                    
                
                
        
    }
}
