<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of PendapatanController
 *
 * @author miyzan
 */
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Pendapatan;
 
class PendapatanController extends Controller{
    //put your code here
    public function index(Request $request){
        $start = $request->start?$request->start:0;
        $limit = $request->limit?$request->limit:0;
//        $limit = isset($_POST['limit']) ? $this->db->escape_str($this->input->post('limit', TRUE)) : $this->config->item("length_records");
        $data=Pendapatan::getRowsTableAllLimit('pendapatans',$start,$limit);
        return  json_encode([
                    'success' => true,
                    'data' => $data[0],
                    'record' => $data[1]
                        ]);
    }
    public function indexCombo(Request $request){
//        $start = $request->start?$request->start:0;
//        $limit = $request->limit?$request->limit:0;
//        $limit = isset($_POST['limit']) ? $this->db->escape_str($this->input->post('limit', TRUE)) : $this->config->item("length_records");
        $query=$request->searchvalue?$request->searchvalue:NULL;
        
        $sqlsearch=NULL;
        if($query){
            $sqlsearch=array('where'=>array(['kode', 'LIKE', '%'.$query.'%']),'orwhere'=>array(['keterangan', 'LIKE', '%'.$query.'%']));
        }

        $data = Pendapatan::getRowsTableWhereOr('pendapatans',$sqlsearch,['kode','asc']);
        return json_encode([
                    'success' => true,
                    'data' => $data[0],
                    'record' => $data[1]
                        ]);        
    }
    
    public function executeRow(Request $request){
        $showjabatan=$request->showjabatan?$request->showjabatan:$request->parshowjabatan;
        if ($showjabatan=='on'){
            $showjabatan=1;
        }else{
            $showjabatan=0;
        }
        $param = array($request->opt, $request->kode, $request->keterangan,$request->posting,$showjabatan);
//        echo 'test';
//        return;
          $data=Pendapatan::SP_execData('sp_pendapatan',$param,true);
          
          
        return response($data,200);
    }
    public function deleteRow(Request $request){
        $param = array($request->opt, $request->kode, null,null,null);
        $data=Pendapatan::SP_execData('sp_pendapatan',$param,true);
          
          
        return response($data,200);
    }
}

?>
