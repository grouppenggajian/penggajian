<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of MYModel
 *
 * @author miyzan
 */

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\MYModel;

class RumusTHRController extends Controller {

    public function index(Request $request) {
        $data=MYModel::SP_getData('sp_rumus_thr_load',null,true);

        
        return  json_encode([
                    'success' => true,
                    'data' => $data,
                    'record' => count($data)
                        ]);
    }
    public function executeRows(Request $request){
//        opt
//vkode
//vkomponen
//vrowset
//vcolumn_name
        $postdata=$request->postdata?json_decode($request->postdata):array();
        if (count($postdata)>0){
            $param = array('clear', null, null,null,null);
            $data=MYModel::SP_execData('sp_rumusthr',$param,true);
            foreach ($postdata as $value) {
                $param = array('insert', $value->kode, $value->komponen,$value->rowset,$value->column_name);
                $data=MYModel::SP_execData('sp_rumusthr',$param,true);
            }
            
        }else
        {
            $data= array(
                    "success" => false,
                    "message" => 'No Data Found To Execute!'
                );
        }
        
          
          
        return response($data,200);
    }

}

?>
