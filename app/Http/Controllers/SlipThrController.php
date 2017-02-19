<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\MYModel;
use App\Reports\SlipThr;
class SlipThrController extends Controller
{
    public function index(Request $request) {
        $start = $request->start ? $request->start : 0;
        $limit = $request->limit ? $request->limit : 100; 
       
        $nik = $request->nik ? $request->nik : NULL;
        $tahun = $request->tahun ? $request->tahun : 0;
        $jabatan = $request->jabatan ? $request->jabatan : NULL;
        
        $periode = MYModel::getRowsTable([['thbl','=',$tahun],['approval','=',1]], 'periode_thr', []);
        $table = array();
        if(count($periode)>0){
           $table = MYModel::getDBTable('v_hitthr');
        }else{
            return json_encode([
                    'success' => false,
                    "message" => 'No Data Found!'
                
                ]);
        }
        
//        $table = MYModel::getDBTable('v_hitthr');
        
        $table->where(array(array('tahun', '=', $tahun)));
       if($nik){
            $table->where(array(['nik', '=', $nik]));
        }
        if ($jabatan) {
            $table->where(array(['kode_jabatan', '=', $jabatan]));
        }
                
        $totalrec=$table->count();        
        $table->orderby('kode_jabatan','ASC');
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
    public function loadreport(Request $request){
        $nik = $request->nik ? $request->nik : NULL;
        $tahun = $request->tahun ? $request->tahun : 0;
        $jabatan = $request->jabatan ? $request->jabatan : NULL;
        
        $periode = MYModel::getRowsTable([['thbl','=',$tahun],['approval','=',1]], 'periode_thr', []);
        $table = array();
        
        if(count($periode)>0){
           $table = MYModel::getDBTable('v_hitthr');
        }else{
            return 'No Data Found!';
        }
        
//        $table = MYModel::getDBTable('v_hitthr');
        
        $table->where(array(array('tahun', '=', $tahun)));
        $table->where(array(array('nilai', '>', 0)));
       if($nik){
            $table->where(array(['nik', '=', $nik]));
        }
        if ($jabatan) {
            $table->where(array(['kode_jabatan', '=', $jabatan]));
        }
                
//        $totalrec=$table->count();        
        $table->orderby('kode_jabatan','ASC');
        $table->orderby('nik','ASC');
//        $table->offset($start);
//        $table->limit($limit);
        $data = $table->get();
//        return json_encode($data);
         $companyname = \Config::get('custom.company_name');
        $companyaddress = \Config::get('custom.company_address');
        $companylogo = \Config::get('custom.company_logo');
        $pdf= new SlipThr('P', 'mm', 'A4');
        $pdf->AliasNbPages();
        $pdf->SetMargins(5, 5, 5);        
        $pdf->SetTitle('SLIP THR TAHUN '.$tahun);
        $pdf->setCompany($companyname, $companyaddress);
        $pdf->setDataheader(array());
        $pdf->SetFont('Arial','',14);
        $pdf->setUrlLogo(url($companylogo));
        $pdf->setPrintBy($request->session()->get('userid'));
//        $pdf->AddPage('L');
        $pdf->create_pdf($data);
        $pdf->Output("reporting","I");
        exit;
    }
}
