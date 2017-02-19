<?php
namespace App\Reports;
/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Angsuran
 *
 * @author miyzan
 */
class Angsuran extends MY_FPDF {
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
        
        $this->SetFont('courier', '', 8);
//        $this->Cell(200, 5, $this->dataheader[0], 0, 0, 'C');
//        $this->Cell(200, 5, 'test', 0, 0, 'C');
        
        
        $data=$this->datacolumnheader[0];
        //kolom kiri
        $this->SetY(19);
        $this->Cell(20, 3,'No.Pinjaman', 0, 0, 'L');
        $this->Cell(5, 3,':', 0, 0, 'C');        
        $this->Cell(50, 3,$data->no_pinjaman, 0, 0, 'L');
        
        $this->SetY(22);
        $this->Cell(20, 3,'Tanggal', 0, 0, 'L');
        $this->Cell(5, 3,':', 0, 0, 'C');        
        $this->Cell(50, 3,date_format(date_create( $data->tgl_pinjam),"d/m/Y"), 0, 0, 'L');
        
        $this->SetY(25);
        $this->Cell(20, 3,'NIK/Nama', 0, 0, 'L');
        $this->Cell(5, 3,':', 0, 0, 'C');        
        $this->Cell(50, 3,$data->nik.'/'.$data->nama, 0, 0, 'L');
        
        $this->SetY(28);
        $this->Cell(20, 3,'Keterangan', 0, 0, 'L');
        $this->Cell(5, 3,':', 0, 0, 'C');        
        $this->Cell(50, 3,$data->keterangan, 0, 0, 'L');
        
        //kolom kanan
        $this->SetXY(153,19);        
        $this->Cell(20, 3,'Nominal', 0, 0, 'L');
        $this->Cell(5, 3,':', 0, 0, 'C');        
        $this->Cell(28, 3,is_numeric($data->nominal)?number_format($data->nominal, 2):0, 0, 0, 'R');
        $this->SetXY(153,22);
//        $this->SetY(22);
        $this->Cell(20, 3,'Kali', 0, 0, 'L');
        $this->Cell(5, 3,':', 0, 0, 'C');        
        $this->Cell(28, 3,$data->kali_angsuran, 0, 0, 'R');
        $this->SetXY(153,25);
//        $this->SetY(25);
        $this->Cell(20, 3,'Angsuran', 0, 0, 'L');
        $this->Cell(5, 3,':', 0, 0, 'C');        
        $this->Cell(28, 3,is_numeric($data->jumlah_angsuran)?number_format($data->jumlah_angsuran):0, 0, 0, 'R');
        $this->SetXY(153,28);
//        $this->SetY(28);
        $this->Cell(20, 3,'Lunas/Saldo', 0, 0, 'L');
        $this->Cell(5, 3,':', 0, 0, 'C'); 
        $this->SetFont('ZapfDingbats', '', 8);
        $this->Cell(5, 3,$data->status_lunas?'4':'6', 0, 0, 'C'); 
        $this->SetFont('courier', '', 8);
        $this->Cell(23, 3,is_numeric($data->saldo_pinjaman)?number_format($data->saldo_pinjaman):0, 0, 0, 'R');
        
        
        $this->SetY(30);
        
        
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
       
        $head=array('ANGSURAN KE','TGL ANGSURAN', 'JUMLAH ANGSURAN');        
        $alignhead = array();
        for($i=0;$i<count($head);$i++){
            $alignhead[$i]='C';
        }
//        $borderhead = array(1,  'RTB', 'RTB', 'RTB', 'RTB', 'RTB','RTB', 'RTB','RTB', 'RTB', 1);
        $borderhead = array();
        for($i=0;$i<count($head);$i++){
            $borderhead[$i]='T';
        }

        $this->SetFont('courier', 'B', 8);
        $yy=  $this->GetY();
        $yn=  $this->GetY();
        $this->SetX(30);
        for ($i = 0; $i < count($w); $i++) {
            $this->Cell($w[$i], 5, $head[$i], $borderhead[$i], 0, 'C', FALSE);
//            IF($i>0){
//                $xx +=$w[$i-1];//                $this->SetX($this->GetX()+$w[$i-1]);
//            }else{
//                $xx=5;
//            }
//            $this->SetXY($xx+25,$yy);
//            $this->MultiCell($w[$i], $this->lineh, $head[$i], $borderhead[$i],$alignhead[$i],FALSE );
//            if($yn<$this->GetY()){
//                $yn=  $this->GetY();
//            }
        }
        $xn=0;
        $this->SetX(30);
        $yn=  $this->GetY()+5;
        for ($i = 0; $i < count($w); $i++) {
            IF($i>0){
//                $xx +=$w[$i-1];
                $xn +=$w[$i-1];
                $this->Line($xn, $yy, $xn, $yn);
                $this->Line($xn, $yn,$xn+$w[$i], $yn);
            }else{
                $xn=$this->GetX();
                $this->Line($this->GetX(), $yy, $this->GetX(), $yn);
                $this->Line($this->GetX(), $yn, $this->GetX()+$w[$i], $yn);
            }
            IF($i==count($w)-1){
                $this->Line($xn+$w[$i], $yy, $xn+$w[$i], $yn);
            }
            
        }
        
        $this->SetFont('courier', '', 8);
        $this->Ln();
        
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
        $w=array(50,50,50);
        $this->SetWidths($w);        
        $this->set_header_column($w) ;
        $align= array('C', 'C', 'C', 'L', 'L', 'R', 'C','R', 'R', 'C');
        $this->SetX(30);
//        $this->SetY(40);
        foreach ($data[0] as $v) {
            $datarow = array(        
                $v->angsuran_ke,
                       date_format(date_create( $v->tgl_angsuran),"d/m/Y"),
                                       
                $v->jumlah_angsuran
                
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
                        true,
                        2,
                        [2],
                        null,
                        false,false,
                        []); 
        }

//        if(($this->GetY()+$this->lineh)>273){
//                        $this->AddPage();
//        }
        
    }
}

?>
