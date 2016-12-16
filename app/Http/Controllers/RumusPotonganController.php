<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of RumusPotongan
 *
 * @author miyzan
 */

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\RumusPotongan;

class RumusPotonganController extends Controller {

    public function index(Request $request) {
        $data=RumusPotongan::all();
//        echo json_encode($data);
        $mapdata = array();
        $arrdata = array();
        $rowset = -1;
        $i = -1;
        foreach ($data as $value) {

            if ($rowset == $value->rowset) {
                if($value->column_name=='col0'){
                    $mapdata[$i][$value->column_name] = $value->kode;
                }else{
                    $mapdata[$i][$value->column_name] = $value->komponen;
                }
                
//                array_merge($mapdata, array($value->column_name=>$value->name));
            } 
            else {

                if($value->column_name=='col0'){
                    array_push($mapdata, array($value->column_name => $value->kode));
                }else{
                    array_push($mapdata, array($value->column_name => $value->komponen));
                }
                $rowset = $value->rowset;
                $i++;
//                $mapdata=array($value->column_name=>$value->name);
                
            }
            
        }
        return  json_encode([
                    'success' => true,
                    'data' => $mapdata,
                    'record' => count($mapdata)
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
            $data=RumusPotongan::SP_execData('sp_rumuspotongan',$param,true);
            foreach ($postdata as $value) {
                $param = array('insert', $value->kode, $value->komponen,$value->rowset,$value->column_name);
                $data=RumusPotongan::SP_execData('sp_rumuspotongan',$param,true);
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
