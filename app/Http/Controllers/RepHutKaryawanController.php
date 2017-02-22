<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\MYModel;

use App\Reports\HutKaryawan;
class RepHutKaryawanController extends Controller
{
  public function index(Request $request) {
        $start = $request->start ? $request->start : 0;
        $limit = $request->limit ? $request->limit : 100;
        $tglawal = $request->tglawal ? $request->tglawal : null;
        $tglakhir = $request->tglakhir ? $request->tglakhir : null;
        
        $limit_stmt = ' limit ' . $start . ',' . $limit;
        $param = array($tglawal,$tglakhir, $limit_stmt);
        $param2 = array($tglawal,$tglakhir, '');
        
        $data=MYModel::SP_getData('sp_hut_karyawan', $param, true);
        $dataall = MYModel::SP_getData('sp_hut_karyawan', $param2, true);
        
        return json_encode([
                    'success' => true,
                    'data' => $data,
                    'record' => count($dataall)
                ]);
        
        
  }
  public function loadreport(Request $request) {
        $start = $request->start ? $request->start : 0;
        $limit = $request->limit ? $request->limit : 100;
        $tglawal = $request->tglawal ? $request->tglawal : null;
        $tglakhir = $request->tglakhir ? $request->tglakhir : null;
        
        
        
        $param = array($tglawal,$tglakhir, '');
        $paramheader='Periode : '.date_format(date_create( $tglawal),"d/m/Y").' s.d '.date_format(date_create( $tglakhir),"d/m/Y");
        $data=MYModel::SP_getData('sp_hut_karyawan', $param, true);
//        return json_encode($data);
        $companyname = \Config::get('custom.company_name');
        $companyaddress = \Config::get('custom.company_address');
        $pdf= new HutKaryawan('P', 'mm', 'A4');
        $pdf->AliasNbPages();
        $pdf->SetMargins(5, 5, 5);        
        $pdf->SetTitle('LAPORAN HUT KARYAWAN');
        $pdf->setCompany($companyname, $companyaddress);
        $pdf->setDataheader(array($paramheader));
        $pdf->SetFont('Arial','',14);
        $pdf->setUrlLogo(url('/images/logo2.jpg'));
        $pdf->setPrintBy($request->session()->get('userid'));
//        $pdf->AddPage('L');
        $pdf->create_pdf(array($data));
        $pdf->Output("reporting","I");
        exit;
        
        
        
  }
  
}
