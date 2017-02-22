<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\MYModel;
use App\Reports\Penilaian;

class RepPenilaianController extends Controller {

    public function indexEntry(Request $request) {
        $opt = $request->opt ? $request->opt : null;
        $tgl = $request->tanggal ? $request->tanggal : null;
        $jabatan = $request->kode_jabatan ? $request->kode_jabatan : null;
        $nik = $request->nik ? $request->nik : null;


        $param = array($opt, $tgl, $jabatan, $nik);

        $data = MYModel::SP_getData('sp_penilaian_loadentry', $param, true);


        return json_encode([
                    'success' => true,
                    'data' => $data,
                    'record' => count($data)
                ]);
    }

    public function index(Request $request) {
        $start = $request->start ? $request->start : 0;
        $limit = $request->limit ? $request->limit : 100;
        $tglawal = $request->tglawal ? $request->tglawal : null;
        $tglakhir = $request->tglakhir ? $request->tglakhir : null;
        $jabatan = $request->kode_jabatan ? $request->kode_jabatan : null;



        $sqlsearch = '';
        if ($tglawal && $tglakhir) {
            $sqlsearch = 'where (tanggal between "' . $tglawal . '" and "' . $tglakhir . '") ';
        }
        if ($jabatan) {
            $sqlsearch.=' and kode_jabatan="' . $jabatan . '" ';
        }

        $vlimit = "limit $start,$limit";
        $param = array('countdata', $sqlsearch, $vlimit);
        $data = MYModel::SP_getData('sp_penilaian_load', $param, true);
        $totalrec = $data[0]->retval;
        $param = array('loaddata', $sqlsearch, $vlimit);
        $data = MYModel::SP_getData('sp_penilaian_load', $param, true);


        return json_encode([
                    'success' => true,
                    'data' => $data,
                    'record' => $totalrec
                ]);
    }

    public function executeRow(Request $request) {
        $postdata = $request->postdata ? json_decode($request->postdata) : array();
        $create_by = $request->session()->get('userid');
        $data = array(
            "success" => false,
            "message" => 'Execute Is Nothing !!'
        );
        if (count($postdata) > 0) {
            foreach ($postdata as $value) {
                $param = array($value->tanggal, $value->nik, $value->kode_jabatan, $value->nilai, $create_by);
                $data = MYModel::SP_execData('sp_penilaian_exec', $param, true);
            }
        }
        return response($data, 200);
    }

    public function loadreport(Request $request) {
        $start = $request->start ? $request->start : 0;
        $limit = $request->limit ? $request->limit : 100;
        $tglawal = $request->tglawal ? $request->tglawal : null;
        $tglakhir = $request->tglakhir ? $request->tglakhir : null;
        $jabatan = $request->kode_jabatan ? $request->kode_jabatan : null;
        $nmjabatan = $request->nama_jabatan ? $request->nama_jabatan : null;
        
        
        
        $paramheader='Periode : '.date_format(date_create( $tglawal),"d/m/Y").' s.d '.date_format(date_create( $tglakhir),"d/m/Y");
        if($jabatan){
            $paramheader.=' & Jabatan : '.$nmjabatan;            
        }
        
        $param = array('loaddate',$tglawal,$tglakhir, $jabatan);        
        $datadate=MYModel::SP_getData('sp_penilaian_loadreport', $param, true);
        $param = array('loaddata',$tglawal,$tglakhir, $jabatan);        
        $data=MYModel::SP_getData('sp_penilaian_loadreport', $param, true);
//        return json_encode($data);
        $companyname = \Config::get('custom.company_name');
        $companyaddress = \Config::get('custom.company_address');
        $pdf= new Penilaian('P', 'mm', 'A4');
        $pdf->AliasNbPages();
        $pdf->SetMargins(5, 5, 5);        
        $pdf->SetTitle('LAPORAN PENILAIAN');
        $pdf->setCompany($companyname, $companyaddress);
        $pdf->setDataheader(array($paramheader,$datadate));
        $pdf->SetFont('Arial','',14);
        $pdf->setUrlLogo(url('/images/logo2.jpg'));
        $pdf->setPrintBy($request->session()->get('userid'));
//        $pdf->AddPage('L');
        $pdf->create_pdf(array($data));
        $pdf->Output("reporting","I");
        exit;
        
        
        
  }
  
}
