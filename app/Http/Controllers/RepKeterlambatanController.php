<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\MYModel;

use App\Reports\Keterlambatan;
class RepKeterlambatanController extends Controller {

    public function index(Request $request) {
        $start = $request->start ? $request->start : 0;
        $limit = $request->limit ? $request->limit : 100;
        $postdata = $request->postdata ? json_decode($request->postdata) : array();
        $sqlsearch = "";
        $where_stmt ="";
        foreach ($postdata as $v) {
            if (strlen($sqlsearch) > 0) {
                $sqlsearch.= " and ";
            }
            if ($v->field == 'tgl' || $v->field == 'tgl') {
                
                    $sqlsearch.= ' '.$v->field.' between "' . $v->value[0] . '" and "'. $v->value[1] . '"';
                
            } else {
                $sqlsearch.=" $v->field ='$v->value'";
            }
        }
        if (strlen($sqlsearch) > 0) {
            $where_stmt = " where $sqlsearch ";
        }
        $limit_stmt = ' limit ' . $start . ',' . $limit;
        $param = array($where_stmt, $limit_stmt);
        $param2 = array($where_stmt, '');
        
        
        $dataall = MYModel::SP_getData('sp_paging_lapterlambat', $param2, true);
        $data=MYModel::SP_getData('sp_paging_lapterlambat', $param, true);
        return json_encode([
                    'success' => true,
                    'data' => $data,
                    'record' => count($dataall)
                ]);
        
    }
    
    public function loadReport(Request $request){
        
        $postdata = $request->postdata ? json_decode($request->postdata) : array();
        $sqlsearch = "";
        $where_stmt ="";
        $paramheader='';
        foreach ($postdata as $v) {
            if (strlen($sqlsearch) > 0) {
                $sqlsearch.= " and ";
            }
            if (strlen($paramheader) > 0) {
                $paramheader.= " & ";
            }
            if ($v->field == 'tgl' || $v->field == 'tgl') {
                $paramheader.='Periode : '.date_format(date_create( $v->value[0]),"d/m/Y").' s.d '.date_format(date_create( $v->value[1]),"d/m/Y");
                    $sqlsearch.= ' '.$v->field.' between "' . $v->value[0] . '" and "'. $v->value[1] . '"';
                
            } else {
                $sqlsearch.= $v->field.' ="'.$v->value.'"';
                $paramheader.= strtoupper($v->field).' : '.$v->value;
            }
        }
        if (strlen($sqlsearch) > 0) {
            $where_stmt = " where $sqlsearch ";
        }        
        $param = array($where_stmt, '');
//        echo $paramheader;
//        return;
        
        $data=MYModel::SP_getData('sp_paging_lapterlambat', $param, true);
//        foreach ($data as $v) {
//            echo $v->tgl;
//        }
//        return;
        $companyname = \Config::get('custom.company_name');
        $companyaddress = \Config::get('custom.company_address');
        $pdf= new Keterlambatan('P', 'mm', 'A4');
        $pdf->AliasNbPages();
        $pdf->SetMargins(5, 5, 5);        
        $pdf->SetTitle('LAPORAN KETERLAMBATAN');
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
