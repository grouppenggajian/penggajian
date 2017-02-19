<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\MYModel;
class ApprovalGajiController extends Controller
{
     
        public function index(Request $request) {
        $start = $request->start ? $request->start : 0;
        $limit = $request->limit ? $request->limit : 100;
        $periode = MYModel::getRowsTable([], 'v_periodegaji_aktif', []);
        $thbl = $request->thbl ? $request->thbl : $periode[0]->thbl;
        
        
        $data=MYModel::SP_getData('sp_getapproval_gaji',array($thbl));
        return json_encode([
                    'success' => true,
                    'data' => $data,
                    'record' => count($data)
                ]);
    }

        
    public function executeRow(Request $request) {
        $approval_by = $request->session()->get('userid');
        $thbl = $request->thbl ? $request->thbl: NULL;
        
        $data = MYModel::SP_execData('sp_setapproval_gaji', array($thbl,$approval_by), true);


        return response($data, 200);
        
                    
                
                
        
    }
}
