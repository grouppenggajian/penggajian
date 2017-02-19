<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\MYModel;
class ValidasiMasaKerjaController extends Controller
{
   
    public function index(Request $request) {
        $start = $request->start ? $request->start : 0;
        $limit = $request->limit ? $request->limit : 100; 
       
        $periode = MYModel::getRowsTable([], 'v_periodethr_aktif', []);
        
        $searchvalue = $request->searchvalue ? $request->searchvalue : NULL;
        $thbl = $request->tahun ? $request->tahun : $periode[0]->thbl;
        $tglthr = $request->tglthr ? $request->tglthr : $periode[0]->tglthr;
        
        $table = MYModel::getDBTable('v_validasimasakerja');
        
        $table->where(array(array('tahun', '=', $thbl)));
        $table->where(array(array('tglthr', '=', $tglthr)));
        if ($searchvalue) {
            $table->where(array(['nik', 'LIKE', '%'.$searchvalue.'%']));            
            $table->orWhere(array(['nama', 'LIKE', '%' . $searchvalue . '%']));
            $table->orWhere(array(['jabatan', 'LIKE', '%' . $searchvalue . '%']));
        }
        
        $totalrec=$table->count();
        $table->orderby('tahun','DESC');
        $table->orderby('nik','ASC');
        $table->offset($start);
        $table->limit($limit);
        $query = $table->get();

        return json_encode([
                    'success' => true,
                    'data' => $query,
                    'record' => $totalrec
                ]);
    }
    
    public function periodeThrLoad(Request $request) {
//        $start = $request->start ? $request->start : 0;
        $aktif = $request->aktif ? $request->aktif : NULL;     
        $thbl = $request->thbl ? $request->thbl : NULL;
        
        $table = MYModel::getDBTable('periode_thr');
        if($aktif){
            if($aktif==='on'){
                $aktif=1;
            }else{
                $aktif=0;
            }
            $table->where(array(array('aktif', '=', $aktif)));
        }else{
            $table->where(array(array('thbl', '=', $thbl)));
        }
        
        $totalrec=$table->count();
        $query = $table->get();

        return json_encode([
                    'success' => true,
                    'data' => $query,
                    'record' => $totalrec
                ]);
    }
    
    public function executeRow(Request $request) {
        $tgl = $request->vtglthr ? $request->vtglthr : NULL;
        $thbl = $request->vtahun ? $request->vtahun : NULL;
        $create_by = $request->session()->get('userid');
        $data = MYModel::SP_execData('sp_generate_validasimasakerja', array($thbl,$tgl,$create_by), true);


        return response($data, 200);
        
                    
                
                
        
    }
    
    public function updateRow(Request $request) {
        $tgl = $request->vtglthr ? $request->vtglthr : NULL;
        $thbl = $request->tahun ? $request->tahun : NULL;
        $nik = $request->nik ? $request->nik : NULL;
        $gajipokok = $request->gajipokok ? $request->gajipokok : NULL;
        $pembagi = $request->pembagi ? $request->pembagi : NULL;
        $pengali = $request->pengali ? $request->pengali : NULL;
        $create_by = $request->session()->get('userid');
        $data = MYModel::SP_execData('sp_update_validasimasakerja', 
                array($thbl,$tgl,$nik,$gajipokok,$pengali,$pembagi,$create_by), true);


        return response($data, 200);
    }
     public function deleteRow(Request $request) {
        
        $thbl = $request->tahun ? $request->tahun : NULL;
        $nik = $request->nik ? $request->nik : NULL;
        
        
        $data = MYModel::SP_execData('sp_delete_validasimasakerja', 
                array($thbl,$nik), true);


        return response($data, 200);
    }
        
            
            
}
