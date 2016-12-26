<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of HariLiburController
 *
 * @author miyzan
 */

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\MYModel;

class HariLiburController extends controller {

    //put your code here
    
    public function index(Request $request) {
        $tglawal = $request->awal ? $request->awal : date('Y-m-01');
        $tglakhir= $request->akhir ? $request->akhir : date('Y-m-t') ;
        $start = $request->start?$request->start:0;
        $limit = $request->limit?$request->limit:0;
        $table=MYModel::getDBTable('harilibur_pantangan');
        $table->whereBetween('tanggal', [$tglawal, $tglakhir]);        
        $totalrec=$table->count();        
        
//        $table=MYModel::getDBTable('harilibur_pantangan');
        $table->whereBetween('tanggal', [$tglawal, $tglakhir]);     
        $table->offset($start);
        $table->limit($limit);
        $query=$table->get();
        return json_encode([
                    'success' => true,
                    'data' => $query,
                    'record' => $totalrec
                        ]);
    }
    public function save(Request $request) {
        date_default_timezone_set('Asia/Jakarta');
//        return date("Y-m-d H:i:s");
        $tgl = $request->tgl ? $request->tgl : NULL;
        $ket = $request->ket ? $request->ket : NULL;
        $user = $request->session()->get('userid');
        $createdate = date("Y-m-d H:i:s");
        if ($tgl && $ket) {
           $query= MYModel::getRowsTable(array(['tanggal','=',$tgl]), 'harilibur_pantangan');
           $retval=1;
           if(count($query)>0){
               $retval = MYModel::setUpdateRow('harilibur_pantangan',
                    array(['tanggal','=',$tgl])
                    ,array(
                            'tanggal' => $tgl,
                            'keterangan' => $ket,
                            'create_date' => $createdate,
                            'create_by' => $user));
           }else{
               $retval = MYModel::setInsertRow('harilibur_pantangan',array(array(
                            'tanggal' => $tgl,
                            'keterangan' => $ket,
                            'create_date' => $createdate,
                            'create_by' => $user)));
           }
            
            
            
            
            
            if ($retval) {
                return response(array("success" => true,
                            "message" => 'Execute Successfull!'), 200);
            }else{
                return response(array("success" => false,
                            "message" => 'Execute Aborted!'), 200);
            }
            
            
            
        }
    }
    
    public function deleteRow(Request $request) {
        $tgl = $request->tgl ? $request->tgl : NULL;
        $retval = MYModel::setDeleteRow('harilibur_pantangan',
                    array(['tanggal','=',$tgl])
              );
            
            if ($retval) {
                return response(array("success" => true,
                            "message" => 'Execute Successfull!'), 200);
            }else{
                return response(array("success" => false,
                            "message" => 'Execute Aborted!'), 200);
            }
    }

}

?>
