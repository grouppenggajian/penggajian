<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of ReferensiController
 *
 * @author miyzan
 */
namespace App\Http\Controllers;

use Illuminate\Http\Request;
//use Illuminate\Support\Facades\Request;
//use App\Http\Requests;
use App\Models\MYModel;
class ReferensiController extends Controller{
    public function getAgama(Request $request){
        $query = MYModel::getRowsTable(NULL, 'ref_agama', [], ['ag_id', 'asc']);
        return json_encode([
                    'success' => true,
                    'data' => $query,
                    'record' => count($query)
                        ]);
    }
    public function getGolonganDarah(Request $request){
        $query = MYModel::getRowsTable(NULL, 'ref_golongandarah', [], ['id', 'asc']);
        return json_encode([
                    'success' => true,
                    'data' => $query,
                    'record' => count($query)
                        ]);
    }
    
    public function getStatusKerja(Request $request){
        $query = MYModel::getRowsTable(NULL, 'ref_statuskerja', [], ['id', 'asc']);
        return json_encode([
                    'success' => true,
                    'data' => $query,
                    'record' => count($query)
                        ]);
    }
    public function getStatusPajak(Request $request){
        $query = MYModel::getRowsTable(NULL, 'ref_statuspajak', [], ['id', 'asc']);
        return json_encode([
                    'success' => true,
                    'data' => $query,
                    'record' => count($query)
                        ]);
    }
    public function getPendidikan(Request $request){
        $query = MYModel::getRowsTable(NULL, 'ref_pendidikan', [], ['id', 'asc']);
        return json_encode([
                    'success' => true,
                    'data' => $query,
                    'record' => count($query)
                        ]);
    }
    
    public function getPropinsi(Request $request){
        $search=$request->searchvalue?$request->searchvalue:null;
        $query = MYModel::getRowsTable([['rpr_nama','like','%'.$search.'%']], 'ref_propinsi', [], ['RPR_KODE', 'asc']);
        return json_encode([
                    'success' => true,
                    'data' => $query,
                    'record' => count($query)
                        ]);
    }
    public function getKabupaten(Request $request){
        $search=$request->searchvalue?$request->searchvalue:NULL;
        $searchname=$request->searchname?$request->searchname:NULL;
//        $query = MYModel::getRowsTable(NULL, 'ref_kotakab', [], ['RKO_KODE', 'asc']);
        
        $query = MYModel::getRowsTable([['RPR_KODE','=',$search],['RKO_NAMA','like','%'.$searchname.'%']], 'ref_kotakab', [], ['RKO_KODE', 'asc']);
        return json_encode([
                    'success' => true,
                    'data' => $query,
                    'record' => count($query)
                        ]);
    }
    public function getKecamatan(Request $request){
        $search=$request->searchvalue?$request->searchvalue:NULL;
        $searchname=$request->searchname?$request->searchname:NULL;
//        $query = MYModel::getRowsTable(NULL, 'ref_kecamatan', [], ['RKC_KODE', 'asc']);
        $query = MYModel::getRowsTable([['RKO_KODE','=',$search],['RKC_NAMA','like','%'.$searchname.'%']], 'ref_kecamatan', [], ['RKC_KODE', 'asc']);
        return json_encode([
                    'success' => true,
                    'data' => $query,
                    'record' => count($query)
                        ]);
    }
    public function getKelurahan(Request $request){
        $search=$request->searchvalue?$request->searchvalue:NULL;
        $searchname=$request->searchname?$request->searchname:NULL;
        $query = MYModel::getRowsTable([['RKC_KODE','=',$search],['RKL_NAMA','like','%'.$searchname.'%']], 'ref_kelurahan', [], ['RKL_KODE', 'asc']);
        return json_encode([
                    'success' => true,
                    'data' => $query,
                    'record' => count($query)
                        ]);
    }
    public function getTipePinjaman(Request $request){
        $query = MYModel::getRowsTable(NULL, 'ref_tipepinjaman', [], ['id', 'asc']);
        return json_encode([
                    'success' => true,
                    'data' => $query,
                    'record' => count($query)
                        ]);
    }
    
    public function getThrPembagi(Request $request){
        $query = MYModel::getRowsTable(NULL, 'ref_thrpembagi', [], ['id', 'asc']);
        return json_encode([
                    'success' => true,
                    'data' => $query,
                    'record' => count($query)
                        ]);
    }
    
    public function getRefRumus(Request $request){
        $isdenda=$request->isdenda>-1?$request->isdenda:NULL;
        $search=$request->searchvalue?$request->searchvalue:NULL;
        
        if($isdenda){            
            $query = MYModel::getRowsTable(array(array('isdenda','=',$isdenda),array('kode','like','%'.$search.'%')), 'ref_rumus', [], ['id', 'asc']);
        }else{
            $query = MYModel::getRowsTable(array(array('kode','like','%'.$search.'%')), 'ref_rumus', [], ['id', 'asc']);
        }
        
        return json_encode([
                    'success' => true,
                    'data' => $query,
                    'record' => count($query)
                        ]);
    }
    
    
}

?>
