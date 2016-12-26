<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of RumusInsentifHadir
 *
 * @author miyzan
 */
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\MYModel;
class RumusInsentifHadirController extends Controller{
    public function index(Request $request){        
        
        $query = MYModel::getRowsTable(NULL, 'v_rumus_insentifhadir', []);
        return json_encode([
                    'success' => true,
                    'data' => $query,
                    'record' => count($query)
                        ]);
    }
    public function jenisharikerja(Request $request){        
        
        $query = MYModel::getRowsTable(NULL, 'ref_jenisharikerja', []);
        return json_encode([
                    'success' => true,
                    'data' => $query,
                    'record' => count($query)
                        ]);
    }
    public function executeRow(Request $request){ 
        $opt=$request->opt?$request->opt:NULL;
        $id=$request->id?$request->id:NULL;
       $kategori_ijin=$request->kategori_ijin?$request->kategori_ijin:NULL;
        $tipe_ijin=$request->tipe_ijin?$request->tipe_ijin:NULL;
        $jenisharikerja=$request->jenisharikerja?$request->jenisharikerja:NULL;
        $kali_ijin=$request->kali_ijin?$request->kali_ijin:NULL;
        $nilai_insentif=$request->nilai_insentif?$request->nilai_insentif:NULL;
        $param = array($opt, $id, $kategori_ijin,
                    $tipe_ijin,
                    $jenisharikerja,
                    $kali_ijin,
                    $nilai_insentif,
                    );
//        echo 'test';
//        return;
          $data=MYModel::SP_execData('sp_rumus_insentifhadir',$param,true);
          
          
        return response($data,200);
    }
    public function delete(Request $request){ 
        $param = array($request->opt, $request->id, null,null, null,null,null);
        $data=MYModel::SP_execData('sp_rumus_insentifhadir',$param,true);
          
          
        return response($data,200);
    }
    
}

?>
