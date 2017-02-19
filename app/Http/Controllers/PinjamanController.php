<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of PinjamanController
 *
 * @author miyzan
 */
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Pinjaman;
 
class PinjamanController extends Controller{
    //put your code here
    public function index(Request $request) {
        $start = $request->start ? $request->start : 0;
        $limit = $request->limit ? $request->limit : 0;
        
        $query=$request->searchvalue?$request->searchvalue:NULL;
        
        $sqlsearch=NULL;
//        $sqlsearch=array('where'=>array(['deleted', '=', '0']));
        if($query){
            $sqlsearch=array('where'=>array(['nik', 'LIKE', '%'.$query.'%']));
            $sqlsearch['orwhere']= array(['nama', 'LIKE', '%'.$query.'%'],['no_pinjaman', '=', "$query"]);
        }

        $data = Pinjaman::getRowsTableQueryLimit('v_pinjamans', $sqlsearch,$start, $limit);
        return json_encode([
                    'success' => true,
                    'data' => $data[0],
                    'record' => $data[1]
                ]);
    }
    
    public function getAngsuran(Request $request) {
        $start = $request->start ? $request->start : 0;
        $limit = $request->limit ? $request->limit : 0;
        
        $query=$request->searchvalue?$request->searchvalue:NULL;
        
        $sqlsearch=NULL;
//        $sqlsearch=array('where'=>array(['deleted', '=', '0']));
        if($query){
            $sqlsearch=array('where'=>array(['no_pinjaman', '=', "$query"]));            
        }

        $data = Pinjaman::getRowsTableQueryLimit('pinjaman_angsuran', $sqlsearch,$start, $limit);
        return json_encode([
                    'success' => true,
                    'data' => $data[0],
                    'record' => $data[1]
                ]);
    }
    public function executeRow(Request $request){
        
        $datanomor=Pinjaman::getsetIdMaster('set','PJ',0,6);
        $no_pinjaman=$datanomor[0]->idmaster;
        $tgl_pinjam=$request->tgl_pinjam?$request->tgl_pinjam:NULL;
        $tipe_pinjaman=$request->tipe_pinjaman?$request->tipe_pinjaman:NULL;
        $nik=$request->nik?$request->nik:NULL;
        $keterangan=$request->keterangan?$request->keterangan:NULL;
        $nominal=$request->nominal?$request->nominal:NULL;
        $kali_angsuran=$request->kali_angsuran?$request->kali_angsuran:NULL;
        $jumlah_angsuran=$request->jumlah_angsuran?$request->jumlah_angsuran:NULL;
        $saldo_pinjaman=$nominal;
        $status_lunas=false;        
        $create_by='test';
        
        $param = array($request->opt, 
            $no_pinjaman,
            $tgl_pinjam,
            $nik,
            $tipe_pinjaman,
            $keterangan,
            $nominal,
            $kali_angsuran,
            $jumlah_angsuran,
            $saldo_pinjaman,
            $status_lunas,
            $create_by
            );
          $data=Pinjaman::SP_execData('sp_pinjaman',$param,true);
          
          
        return response($data,200);
    }
    public function deleteRow(Request $request){
        $param = array($request->opt, $request->kode, null,null);
        $data=Pinjaman::SP_execData('sp_pinjaman',$param,true);
          
          
        return response($data,200);
    }
    public function getNoPinjaman(Request $request){
       $data=Pinjaman::getsetIdMaster('get','PJ',0,10);
       $respArray=  array(
                    'success' => true,
                    'data' => $data[0],
                    'record' => count($data)
                        );
       return response($respArray,200);
    }
    
}

?>
