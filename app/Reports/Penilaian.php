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
class Penilaian extends MY_FPDF {
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
        $datahead=$this->dataheader[1];
        $alignhead = array( 'C', 'C', 'C');
        $borderhead = array(1,  'RTB', 'RTB');
        $head=array( 'NIK','NAMA','JABATAN');        
//        $countdatahead=count($datahead)+count($head);
         for ($i = 0; $i < count($datahead); $i++) {
             $head[count($head)]=$datahead[$i]->coldate;
             $w[count($w)]=12;
             $alignhead[count($alignhead)]='C';
             if($i==(count($datahead)-1)){
                 $borderhead[count($borderhead)]=1;
             }else{
                 $borderhead[count($borderhead)]='RTB';
             }
                 
             
         }
        $borderhead = array();
        for($i=0;$i<count($head);$i++){
            $borderhead[$i]='T';
        }
        
        $this->SetFont('courier', 'B', 8);
//        $yy=  $this->GetY();
//        
//        for ($i = 0; $i < count($w); $i++) {
//            $this->Cell($w[$i], 5, $head[$i], $borderhead[$i], 0, 'C', FALSE);            
//        }
        
        $yy=  $this->GetY();
        $yn=  $this->GetY();
        for ($i = 0; $i < count($w); $i++) {
            //$this->Cell($w[$i], 5, $head[$i], $borderhead[$i], 0, 'C', FALSE);
            IF($i>0){
                $xx +=$w[$i-1];//                $this->SetX($this->GetX()+$w[$i-1]);
            }else{
                $xx=5;
            }
            $this->SetXY($xx,$yy);
            $this->MultiCell($w[$i], $this->lineh, $head[$i], $borderhead[$i],$alignhead[$i],FALSE );
            if($yn<$this->GetY()){
                $yn=  $this->GetY();
            }
        }
        $xn=0;
        for ($i = 0; $i < count($w); $i++) {
            IF($i>0){
                $xx +=$w[$i-1];
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
        $this->Ln(1);
        
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
        $w=array(20,38,38);
        $this->SetWidths($w);        
        $this->set_header_column($w) ;
        $align= array('C', 'L', 'L');
        for ($i = 0; $i < count($this->dataheader[1]); $i++) {             
             $align[count($align)]='R';
             $w[count($w)]=12;
         }
         
        foreach ($data[0] as $v) {
            $datarow = array(                                                  
                        $v->nik,
                $v->nama,
                        $v->jabatan);
               for ($i = 0; $i < count($this->dataheader[1]); $i++) {             
                    $datarow[count($datarow)]=$v->{$this->dataheader[1][$i]->coldate};
                }
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
                        false,false,
                        []); 
        }
        if(($this->GetY()+$this->lineh)>273){
                        $this->AddPage();
        }
        
    }
    
}

?>
