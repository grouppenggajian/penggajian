<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of PeriodeController
 *
 * @author miyzan
 */
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\MYModel;
 
class PeriodeController extends Controller{
    //put your code here
    public function index(Request $request){
        $start = $request->start?$request->start:0;
        $limit = $request->limit?$request->limit:0;
//        $limit = isset($_POST['limit']) ? $this->db->escape_str($this->input->post('limit', TRUE)) : $this->config->item("length_records");
        $data=MYModel::getRowsTableQueryLimit('periode_gaji',[],$start,$limit,['thbl','DESC']);
        return  json_encode([
                    'success' => true,
                    'data' => $data[0],
                    'record' => $data[1]
                        ]);
    }
    public function executeRow(Request $request){
        $param = array($request->opt, $request->id, $request->tglawal,$request->tglakhir,$request->thnbln,$request->aktif);
//        echo 'test';
//        return;
          $data=MYModel::SP_execData('sp_periode',$param,true);
          
          
        return response($data,200);
    }
    public function deleteRow(Request $request){
        $param = array($request->opt, $request->kode, null,null);
        $data=MYModel::SP_execData('sp_periode',$param,true);
          
          
        return response($data,200);
    }
}

?>
