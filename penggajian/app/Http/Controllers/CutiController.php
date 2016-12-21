<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of IjinController
 *
 * @author miyzan
 */
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\MYModel;
class CutiController extends Controller{
    
    public function getKategoriAbsen(Request $request){
        $search=$request->searchvalue?$request->searchvalue:NULL;
        $jenis=$request->jenis>-1?$request->jenis:NULL;
        $wherevalue=$jenis>-1?array(['loadform','=',"$jenis"],['keterangan','like','%'.$search.'%']):array(['keterangan','like','%'.$search.'%']);
        $query = MYModel::getRowsTable($wherevalue, 'mst_kategori_absens', []);
        return json_encode([
                    'success' => true,
                    'data' => $query,
                    'record' => count($query)
                        ]);
    }
}

?>
