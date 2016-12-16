<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of PotonganController
 *
 * @author miyzan
 */
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Potongan;
 
class PotonganController extends Controller{
    //put your code here
    public function index(Request $request){
        $start = $request->start?$request->start:0;
        $limit = $request->limit?$request->limit:0;

        $data=Potongan::getRowsTableAllLimit('potongans',$start,$limit);
        return  json_encode([
                    'success' => true,
                    'data' => $data[0],
                    'record' => $data[1]
                        ]);
    }
    public function executeRow(Request $request){
        $param = array($request->opt, $request->kode, $request->keterangan);
//        echo 'test';
//        return;
          $data=Potongan::SP_execData('sp_potongan',$param,true);
          
          
        return response($data,200);
    }
    public function deleteRow(Request $request){
        $param = array($request->opt, $request->kode, null,null);
        $data=Potongan::SP_execData('sp_potongan',$param,true);
          
          
        return response($data,200);
    }
}

?>
