<?php
namespace App\Http\Controllers;
/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of HutangPegawaiController
 *
 * @author miyzan
 */
//use Codedge\Fpdf\Fpdf\FPDF;
use Illuminate\Http\Request;
use App\Models\MYModel;
use App\Reports\HutangPegawai;
use App\Reports\Angsuran;
class HutangPegawaiController extends Controller{
    //put your code here
    public function index(Request $request) {
        $start = $request->start ? $request->start : 0;
        $limit = $request->limit ? $request->limit : 0;
        $postdata = $request->postdata ? json_decode($request->postdata) : array();        
        
        $table=MYModel::getDBTable('v_pinjamans');
        
        foreach ($postdata as $v) {
            
            if ($v->field == 'periode') {
                
                    $table->whereBetween('tgl_pinjam',array($v->value[0],$v->value[1]));
                
            } else {
                if ($v->field == 'status_lunas') {
                    $table->where(array(array($v->field, '=', $v->value=='on'?1:0)));               
                }else{
                    $table->where(array(array($v->field, '=', $v->value)));               
                }
                
            }
        }
        
        $totalrec=$table->count();
        
        $table->orderby('tgl_pinjam','ASC');
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
    public function getAngsuran(Request $request) {
        $start = $request->start ? $request->start : 0;
        $limit = $request->limit ? $request->limit : 0;
        
        $query=$request->searchvalue?$request->searchvalue:NULL;
        
        $sqlsearch=NULL;
//        $sqlsearch=array('where'=>array(['deleted', '=', '0']));
        if($query){
            $sqlsearch=array('where'=>array(['no_pinjaman', '=', "$query"]));            
        }

        $data = MYModel::getRowsTableQueryLimit('pinjaman_angsuran', $sqlsearch,$start, $limit);
        return json_encode([
                    'success' => true,
                    'data' => $data[0],
                    'record' => $data[1]
                ]);
    }
    
    public function loadreport(Request $request){
        
        $postdata = $request->postdata ? json_decode($request->postdata) : array();        
        
        $table=MYModel::getDBTable('v_pinjamans');
        $paramheader='';
        foreach ($postdata as $v) {
            if (strlen($paramheader) > 0) {
                $paramheader.= " & ";
            }
            if ($v->field == 'periode') {
                $paramheader.='Periode : '.date_format(date_create( $v->value[0]),"d/m/Y").' s.d '.date_format(date_create( $v->value[1]),"d/m/Y");
                    $table->whereBetween('tgl_pinjam',array($v->value[0],$v->value[1]));
                
            } else {
                if ($v->field == 'status_lunas') {
//                    $paramheader.='Status Lunas : ';
                    $paramheader.=$v->value=='on'?'Status Lunas : Lunas':'Status Lunas : Belum Lunas';
                    $table->where(array(array($v->field, '=', $v->value=='on'?1:0)));               
                }else{
                    $table->where(array(array($v->field, '=', $v->value)));  
                    $paramheader.= strtoupper($v->field).' : '.$v->value;
                }
                
            }
        }
               
        $table->orderby('tgl_pinjam','ASC');
        $table->orderby('nik','ASC');        
        
        $query = $table->get();
//        foreach ($data as $v) {
//            echo $v->tgl;
//        }
//        return;
        $companyname = \Config::get('custom.company_name');
        $companyaddress = \Config::get('custom.company_address');
        $companylogo = \Config::get('custom.company_logo');
        $pdf= new HutangPegawai('P', 'mm', 'A4');
        $pdf->AliasNbPages();
        $pdf->SetMargins(5, 5, 5);        
        $pdf->SetTitle('HUTANG PEGAWAI');
        $pdf->setCompany($companyname, $companyaddress);
        $pdf->setDataheader(array($paramheader));
        $pdf->SetFont('Arial','',14);
        $pdf->setUrlLogo(url($companylogo));
        $pdf->setPrintBy($request->session()->get('userid'));
//        $pdf->AddPage('L');
        $pdf->create_pdf(array($query));
        $pdf->Output("reporting","I");
        exit;
        
    }
    
    public function loadreportangsuran(Request $request){
        
//        $postdata = $request->postdata ? json_decode($request->postdata) : array();        
        $searchvalue=$request->searchvalue?$request->searchvalue:NULL;
        
        $paramheader='NO.Pinjaman : '.$searchvalue;
        $table=MYModel::getDBTable('v_pinjamans');
        $table->where(array(array('no_pinjaman', '=', $searchvalue)));  
           
//        $table->orderby('tgl_pinjam','ASC');
//        $table->orderby('nik','ASC');        
        
        $query = $table->get();
        
        $tableangsuran=MYModel::getDBTable('pinjaman_angsuran');
        $tableangsuran->where(array(array('no_pinjaman', '=', $searchvalue)));  
        $tableangsuran->orderby('tgl_angsuran','ASC');
        $queryangsuran = $tableangsuran->get();
        
//        $data=array($query,$queryangsuran);
        
        $companyname = \Config::get('custom.company_name');
        $companyaddress = \Config::get('custom.company_address');
        $companylogo = \Config::get('custom.company_logo');
        $pdf= new Angsuran('P', 'mm', 'A4');
        $pdf->AliasNbPages();
        $pdf->SetMargins(5, 5, 5);        
        $pdf->SetTitle('ANGSURAN HUTANG PEGAWAI');
        $pdf->setCompany($companyname, $companyaddress);
        $pdf->setDataheader(array($paramheader));
        $pdf->setDataColumheader($query);
        
        $pdf->SetFont('Arial','',14);
        $pdf->setUrlLogo(url($companylogo));
        $pdf->setPrintBy($request->session()->get('userid'));
//        $pdf->AddPage('L');
        $pdf->create_pdf(array($queryangsuran));
        $pdf->Output("reporting","I");
        exit;
        
    }
}

?>
