<?php
namespace App\Reports;
/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Keterlambatan
 *
 * @author miyzan
 */
class Keterlambatan extends MY_FPDF {
    //put your code here
    function Header() {
        $this->Image($this->logourl, 6, 5, 12,12);
        $this->SetFont('courier', '', 8);
        $this->SetY(11);
        $this->SetX(19);
//        $this->SetTextColor(224,17,36);
        $this->SetTextColor(1,152,74);
        $this->SetFont('courier', 'B', 10);
        $this->Cell(55, 4, $this->companyname, 0, 0, 'L');
        $this->SetY(14);
        $this->SetX(19);
        $this->SetFont('courier', 'B', 8);
//        $this->SetTextColor(1,152,74);
        $this->SetTextColor(224,17,36);
        $this->Cell(55, 4, $this->companyaddress, 0, 0, 'L');
       $this->SetTextColor(0);
        $this->SetY(10);
        $this->SetX(130);
//        $this->Cell(75, 4, 'Department : ' . $this->dataheader[0], 0, 0, 'R', false);
        
        $this->SetFont('courier', 'B', 14);
        
        $this->SetY(12);
        $this->SetX(5);
        $this->Cell(200, 6, $this->metadata['Title'], 0, 0, 'C');
        $this->SetY(18);
        $this->SetFont('courier', '', 8);
        $this->Cell(200, 5, $this->dataheader[0], 0, 0, 'C');
//        $this->Cell(200, 5, 'test', 0, 0, 'C');
        $this->SetY(22);
        
        $this->SetFont('courier', 'B', 8);
        $this->Ln(1);
    }
    function Footer()
    {
            //Position at 1.5 cm from bottom
            $this->SetY(-15);
            //courier italic 8
            $this->SetFont('courier','I',8);
            //Page number
            $this->Cell(0,10,'Page '.$this->PageNo().'/{nb}',0,0,'C');
            $this->SetX(5);
            $this->SetFont('courier','I',6);

            $this->Cell(0,10,'Tanggal Cetak : '.date("d/m/Y"),0,0,'L');
            $this->SetY($this->GetY()+3);
            $this->Cell(0,10,'Cetak Oleh : '.$this->printby,0,0,'L');
    }
    public function set_header_column($w) {
//        $head = array();
//        $head1=array('ADULT','CHILD','INFANT','GUIDE','TOUR LEADER','FOC');
        $head=array('TANGGAL', 'NIK','NAMA','JABATAN','TERLAMBAT','TM IJIN','TM TANPA IJIN','SAKIT','CUTI');        
        $alignhead = array( 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C');
        $borderhead = array(1,  'RTB', 'RTB', 'RTB', 'RTB', 'RTB','RTB', 'RTB', 1);
        $this->SetFont('courier', 'B', 8);
        $yy=  $this->GetY();
        for ($i = 0; $i < count($w); $i++) {
            $this->Cell($w[$i], 5, $head[$i], $borderhead[$i], 0, 'C', FALSE);            
        }
        $this->SetFont('courier', '', 8);
        $this->Ln();
        
    }
    function checkmark(){
//        SetFont('ZapfDingbats','', 10);
        $this->SetFont('ZapfDingbats', '', 8);
        $string=4;
        $this->SetFont('courier', '', 8);
        return $string;
    }

    function create_pdf($data)
    {
        $this->AddPage();
        $this->SetAutoPageBreak(true, 18);
        $this->SetDrawColor(0);
        $this->SetLineWidth(.1);
        $this->SetFont('courier', '', 8);
        $this->lineh = 4;
//        $head=array('No.TICKET','AGENT NAME','GUEST NAME', 'TTL','A','I','C','G','T','F','CURR','PAYMENT','DISC','NETT RECEIVE(IDR)');
        $w=array(20,20,38,38,18,15,25,10,10);
        $this->SetWidths($w);        
        $this->set_header_column($w) ;
        $align= array('C', 'L', 'L', 'L', 'R', 'C', 'C','C', 'C');
        foreach ($data[0] as $v) {
            $datarow = array(                           
                       date_format(date_create( $v->tgl),"d/m/Y"),
                        $v->nik,
                $v->nama,
                        $v->nama_jabatan,
                $v->terlambat,                        
                $v->tidakmasukijin?4:null,
                $v->tidakmasuktanpaijin?4:null,
                $v->sakit?4:null,
                $v->cuti?4:null
                    );
//                $this->RowHead3($data, $wd, $al, $hkali, $rect, $pb, $b, $bcolumn, 
//                        $usenumberformat, $numberdecimal, $numbercolumn, $bordertype, $celllines)
                $this->RowHead4(
                        $datarow,
                        $w, 
                        $align, 
                        $this->lineh, 
                        0,
                        1,
                        0,
                        null,
                        false,
                        0,
                        null,
                        null,
                        false,true,
                        [5,6,7,8]); 
        }
//        if(($this->GetY()+$this->lineh)>273){
//                        $this->AddPage();
//        }
        
    }
    
}

?>
