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
use Codedge\Fpdf\Fpdf\FPDF;
use Illuminate\Http\Request;
use App\Models\MYModel;
class HutangPegawaiController extends Controller{
    //put your code here
    public function index(FPDF $pdf,Request $request){
        
        $pdf->AddPage('l', 'A4');
        $pdf->SetFont('Courier', 'B', 18);
        $pdf->Cell(50, 25, 'Hello World!');
        $pdf->Output("reporting","I");
        exit;
        
    }
}

?>
