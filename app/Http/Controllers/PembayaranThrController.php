<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\MYModel;
use App\Reports\ThrPayment;
class PembayaranThrController extends Controller
{
    public function index(Request $request) {
        $start = $request->start ? $request->start : 0;
        $limit = $request->limit ? $request->limit : 100; 
        
        $searchvalue = $request->searchvalue ? $request->searchvalue : NULL;
        $thbl = $request->tahun ? $request->tahun : NULL;
        
        
        
        $table = MYModel::getDBTable('v_hitthr_saldo');
        if ($thbl) {
            $table->where(array(array('tahun', '=', $thbl)));
        }
        
        
        if ($searchvalue) {
            
            $table->where(array(['nik', 'LIKE', '%'.$searchvalue.'%']));
            $table->orWhere(array(['nama', 'LIKE', '%' . $searchvalue . '%']));
            $table->orWhere(array(['jabatan', 'LIKE', '%' . $searchvalue . '%']));
        }
        
        $totalrec=$table->count();
        
        
        
        $table->orderby('tahun','ASC');
//        $table->orderby('nik','ASC');
        $table->offset($start);
        $table->limit($limit);
        $query = $table->get();

        return json_encode([
                    'success' => true,
                    'data' => $query,
                    'record' => $totalrec
                ]);
    }
    
    
    public function executeRow(Request $request) {        
        $tahun = $request->tahun ? $request->tahun : NULL;
        $tglpay = $request->vtglpay ? $request->vtglpay : NULL;
        $nik = $request->nik ? $request->nik : NULL;
        $payment = $request->payment ? $request->payment : NULL;
        $create_by = $request->session()->get('userid');
        $nomor = MYModel::getsetIdMaster('set', 'THR', 1, 7);
        $payment_id = $nomor[0]->idmaster;
        $this->setDefaultTimeZone();
        $create_date=date("Y-m-d H:i:s");
        
        
        $data = MYModel::SP_execData('sp_thr_payment', 
                array($payment_id,$tglpay,$tahun,$nik,$payment,$create_by,$create_date), true);


        return response($data, 200);
        
    }
    public function loadreport(Request $request){
        $nik = $request->nik ? $request->nik : NULL;
        $tahun = $request->tahun ? $request->tahun : 0;        
        
        $table = MYModel::getDBTable('v_hitthr');        
        $table->where(array(array('tahun', '=', $tahun)));
        $table->where(array(['nik', '=', $nik]));
        $dataheader = $table->get();
        
        $table = MYModel::getDBTable('hit_thr_pay');        
        $table->where(array(array('tahun', '=', $tahun)));
        $table->where(array(['nik', '=', $nik]));
        $table->orderby('tglpay','ASC');        
        $datadetail = $table->get();
                
         $companyname = \Config::get('custom.company_name');
        $companyaddress = \Config::get('custom.company_address');
        $companylogo = \Config::get('custom.company_logo');
        $pdf= new ThrPayment('P', 'mm', 'A4');
        $pdf->AliasNbPages();
        $pdf->SetMargins(5, 5, 5);        
        $pdf->SetTitle('BUKTI PEMBAYARAN THR TAHUN '.$tahun);
        $pdf->setCompany($companyname, $companyaddress);
        $pdf->setDataheader(array());
        $pdf->SetFont('Arial','',14);
        $pdf->setUrlLogo(url($companylogo));
        $pdf->setPrintBy($request->session()->get('userid'));
//        $pdf->AddPage('L');
        $pdf->create_pdf(array('header'=>$dataheader,'detail'=>$datadetail));
        $pdf->Output("reporting","I");
        exit;
    }
    
}
