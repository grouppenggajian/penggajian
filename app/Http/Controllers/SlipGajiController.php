<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\MYModel;
use App\Reports\SlipGaji;
class SlipGajiController extends Controller
{
    public function validateGaji($thbl,$nik,$jabatan){
        $table=MYModel::getDBTable('v_gajipendapatan_slip');
        $table->where([['thbl','=', $thbl]]);
        $table->where([['nilai','>', 0]]);
        if($nik){
            $table->where(array(array('nik', '=', $nik)));
        }
        if ($jabatan) {
            $table->where(array(array('kode_jabatan', '=', $jabatan)));
        }
        $recordpendapatan=$table->count();
        $table=MYModel::getDBTable('v_gajipotongan_slip');
        $table->where([['thbl','=', $thbl]]);
        $table->where([['nilai','>', 0]]);
        if($nik){
            $table->where(array(array('nik', '=', $nik)));
        }
        if ($jabatan) {
            $table->where(array(array('kode_jabatan', '=', $jabatan)));
        }
        $recordpotongan=$table->count();
        if($recordpendapatan>0 || $recordpotongan>0){
            return true;
        }
        else {
            return false;
        }
    }
    public function indexSetColumn(Request $request) {
        $start = $request->start ? $request->start : 0;
        $limit = $request->limit ? $request->limit : 100;
$start=0;
$limit =2;
        $thbl = $request->thbl ? $request->thbl : 0;
        $nik = $request->nik ? $request->nik : null;
        $jabatan = $request->jabatan ? $request->jabatan : null;
        
        
        $sqlsearch = '';
        if($nik){
            $sqlsearch .= ' and nik="'.$nik.'" ';
        }
        if ($jabatan) {
            $sqlsearch .= ' and jabatan="'.$jabatan.'" ';
        }
//        return $sqlsearch;
        $orderby = '';
        $dataall = MYModel::SP_getData('sp_gaji_rekap', array('countdata', $thbl, $sqlsearch, $orderby, ''));
        $vlimit = "limit $start,$limit";


        $data = MYModel::SP_getData('sp_gaji_rekap', array('loaddata', $thbl, $sqlsearch, $orderby, $vlimit));
        return json_encode([
                    'success' => true,
                    'data' => $data,
                    'record' => $dataall[0]->retval
                ]);
    }
    
    public function index(Request $request) {
        $start = $request->start ? $request->start : 0;
        $limit = $request->limit ? $request->limit : 100;

        $thbl = $request->thbl ? $request->thbl : 0;
        $nik = $request->nik ? $request->nik : null;
        $jabatan = $request->jabatan ? $request->jabatan : null;
        $valid=$this->validateGaji($thbl,$nik,$jabatan);
        if(!$valid){
            return json_encode([
                    'success' => false,
                    "message" => 'Hitung/Approval Gaji Belum Dilakukan!'
                
                ]);
        }
        $sqlsearch = '';
        if($nik){
            $sqlsearch .= ' and nik="'.$nik.'" ';
        }
        if ($jabatan) {
            $sqlsearch .= ' and jabatan="'.$jabatan.'" ';
        }
//        return $sqlsearch;
        $orderby = '';
        $dataall = MYModel::SP_getData('sp_gaji_rekap', array('countdata', $thbl, $sqlsearch, $orderby, ''));
        $vlimit = "limit $start,$limit";


        $data = MYModel::SP_getData('sp_gaji_rekap', array('loaddata', $thbl, $sqlsearch, $orderby, $vlimit));
        return json_encode([
                    'success' => true,
                    'data' => $data,
                    'record' => $dataall[0]->retval
                ]);
    }
    public function objArraySearch($array, $index, $value)
    {
        $retval=array();
        foreach($array as $arrayInf) {
            if($arrayInf->{$index} == $value) {
                array_push($retval, $arrayInf);
            }else{
                if(count($retval)>0){
                    return $retval;
                }
            }
        }
        return $retval;
    }
    
    public function loadreport(Request $request){
        
//        $start = $request->start ? $request->start : 0;
//        $limit = $request->limit ? $request->limit : 2;

        $thbl = $request->thbl ? $request->thbl : 0;
        $nik = $request->nik ? $request->nik : null;
        $jabatan = $request->jabatan ? $request->jabatan : null;
        $headethbl= $this->getThblString($thbl)   ;  
        
        $valid=$this->validateGaji($thbl,$nik,$jabatan);
        if(!$valid){
            return 'Hitung/Approval Gaji '.$headethbl.' Belum Dilakukan!';
                
                
        }
//        $periode = MYModel::getRowsTable([['thbl','=',$thbl]], 'periode_gaji', []);
//        $tglawal=$periode[0]->tglawal;
//        $tglakhir=$periode[0]->tglakhir;
//        $jmlhari=$periode[0]->jmlharikerja;
        
        $sqlsearch = '';
        if($nik){
            $sqlsearch .= ' and nik="'.$nik.'" ';
        }
        if ($jabatan) {
            $sqlsearch .= ' and jabatan="'.$jabatan.'" ';
        }
//        $orderby=' order by jabatan,nik';
        $orderby=' order by nik';
        $dataheader = MYModel::SP_getData('sp_get_header_slipgaji', array($thbl, $sqlsearch, $orderby));
        
        
        
        $table=MYModel::getDBTable('v_gajipendapatan_slip');
        $table->where([['thbl','=', $thbl]]);
        $table->where([['nilai','>', 0]]);
        if($nik){
            $table->where(array(array('nik', '=', $nik)));
        }
        if ($jabatan) {
            $table->where(array(array('kode_jabatan', '=', $jabatan)));
        }
        $table->orderBy('kode_jabatan','ASC');
        $table->orderBy('nik','ASC');
        $table->orderBy('kode','ASC');
        
        $datapendapatan=$table->get();
        
        $table=MYModel::getDBTable('v_gajipotongan_slip');
        $table->where([['thbl','=', $thbl]]);
        $table->where([['nilai','>', 0]]);
        if($nik){
            $table->where(array(array('nik', '=', $nik)));
        }
        if ($jabatan) {
            $table->where(array(array('kode_jabatan', '=', $jabatan)));
        }
        $table->orderBy('kode_jabatan','ASC');
        $table->orderBy('nik','ASC');
        $table->orderBy('kode','ASC');
        
        $datapotongan=$table->get();
//        return json_encode($datapendapatan);
//        $keypendapatan=  $this->objArraySearch($datapendapatan,'nik','00000062');
//        return json_encode($keypendapatan);
        
        
       
        $paramheader=array();
        
        $companyname = \Config::get('custom.company_name');
        $companyaddress = \Config::get('custom.company_address');
        $companylogo = \Config::get('custom.company_logo');
        $pdf= new SlipGaji('P', 'mm', 'A4');
        $pdf->AliasNbPages();
        $pdf->SetMargins(5, 5, 5);        
        $pdf->SetTitle('SLIP GAJI '.$headethbl);
        $pdf->setCompany($companyname, $companyaddress);
        $pdf->setDataheader(array($paramheader));
        $pdf->SetFont('Arial','',14);
        $pdf->setUrlLogo(url($companylogo));
        $pdf->setPrintBy($request->session()->get('userid'));
//        $pdf->AddPage('L');
        $pdf->create_pdf(array('header'=>$dataheader,'pendapatan'=>$datapendapatan,'potongan'=>$datapotongan));
        $pdf->Output("reporting","I");
        exit;
        
    }
}
