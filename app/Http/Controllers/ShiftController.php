<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of ShiftController
 *
 * @author miyzan
 */
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Shift;
 
class ShiftController extends Controller{
    //put your code here
    public function index(Request $request){
        $start = $request->start?$request->start:0;
        $limit = $request->limit?$request->limit:0;
//        $limit = isset($_POST['limit']) ? $this->db->escape_str($this->input->post('limit', TRUE)) : $this->config->item("length_records");
        $data=Shift::getRowsTableAllLimit('shifts',$start,$limit);
        return  json_encode([
                    'success' => true,
                    'data' => $data[0],
                    'record' => $data[1]
                        ]);
    }
    public function executeRow(Request $request){
        $param = array($request->opt, $request->kode, $request->keterangan,$request->jam_kerja_1,$request->jam_kerja_2,$request->jam_kerja_3,$request->jam_kerja_4);
//        echo 'test';
//        return;
          $data=Shift::SP_execData('sp_shift',$param,true);
          
          
        return response($data,200);
    }
    public function deleteRow(Request $request){
        $param = array($request->opt, $request->kode, null,null, null,null,null);
        $data=Shift::SP_execData('sp_shift',$param,true);
          
          
        return response($data,200);
    }
    public function loadpegawai(Request $request){
        $start = $request->start?$request->start:0;
        $limit = $request->limit?$request->limit:0;
        
        $query=$request->searchvalue?$request->searchvalue:NULL;        
        $sqlsearch=NULL;

        if($query){
            $sqlsearch['where']=array(['kode', 'LIKE', '%'.$query.'%']);
            $sqlsearch['orwhere']= array(
                ['keterangan', 'LIKE', '%'.$query.'%'],
                ['jam_kerja_1', '=', "$query"],
                ['jam_kerja_2', '=', "$query"],
                ['jam_kerja_3', '=', "$query"],
                ['jam_kerja_4', '=', "$query"]
                );
        }

        $data = Shift::getRowsTableQueryLimit('shifts', $sqlsearch,$start, $limit);
        return  json_encode([
                    'success' => true,
                    'data' => $data[0],
                    'record' => $data[1]
                        ]);
    }
    
}

?>
