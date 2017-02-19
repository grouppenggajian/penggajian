<?php

namespace App\Reports;

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of SlipGaji
 *
 * @author miyzan
 */
class SlipGaji extends MY_FPDF {

    function Header() {
        $this->Image($this->logourl, 6, 5, 12, 12);
        $this->SetFont('courier', '', 8);
        $this->SetY(11);
        $this->SetX(19);
//        $this->SetTextColor(224,17,36);
        $this->SetTextColor(1, 152, 74);
        $this->SetFont('courier', 'B', 10);
        $this->Cell(55, 4, $this->companyname, 0, 0, 'L');
        $this->SetY(14);
        $this->SetX(19);
        $this->SetFont('courier', 'B', 8);
//        $this->SetTextColor(1,152,74);
        $this->SetTextColor(224, 17, 36);
        $this->Cell(55, 4, $this->companyaddress, 0, 0, 'L');
        $this->SetTextColor(0);
        $this->SetFont('courier', 'BU', 14);

        $this->SetY(15);
        $this->SetX(5);
        $this->Cell(200, 6, $this->metadata['Title'],0, 0, 'C');

        $this->SetFont('courier', '', 8);

        $this->SetY(22);


        $this->SetFont('courier', 'B', 8);
        $this->Ln(1);
    }

    function Footer() {
        //Position at 1.5 cm from bottom
        $this->SetY(-15);
        //courier italic 8
        $this->SetFont('courier', 'I', 8);
        //Page number
        $this->Cell(0, 10, 'Page ' . $this->PageNo() . '/{nb}', 0, 0, 'C');
        $this->SetX(5);
        $this->SetFont('courier', 'I', 6);

        $this->Cell(0, 10, 'Tanggal Cetak : ' . date("d/m/Y"), 0, 0, 'L');
        $this->SetY($this->GetY() + 3);
        $this->Cell(0, 10, 'Cetak Oleh : ' . $this->printby, 0, 0, 'L');
    }

    public function set_header_column($w) {

    }

    function create_pdf($data) {
        $this->AddPage();
        $this->SetAutoPageBreak(true, 18);
        $this->SetDrawColor(0);
        $this->SetLineWidth(.1);
        $this->SetFont('courier', '', 8);
        $this->lineh = 4;
//        $head=array('No.TICKET','AGENT NAME','GUEST NAME', 'TTL','A','I','C','G','T','F','CURR','PAYMENT','DISC','NETT RECEIVE(IDR)');
        $wheader = array(18, 6, 40,75,20,6,15);
        $wdetail = array(35, 5, 25);
//        $this->set_header_column($w) ;
        $alignheader= array('L', 'C', 'L', 'C', 'L', 'C', 'R');
        $aligndetail= array('L', 'C', 'R');
        $rowheader=array(array('Urut/NIK','Jml Hari'),array('Nama','Hari Kerja'),array('Jabatan','Masa Kerja'));
        $this->SetWidths($wheader);
        $counter=0;
        foreach ($data['header'] as $v) {
            
            $pendapatan=$this->objArraySearch($data['pendapatan'],'nik' , $v->nik);
           $potongan=$this->objArraySearch($data['potongan'],'nik' , $v->nik);
           if(count($pendapatan)==0 && count($potongan)==0){
               continue;
           }
           if($counter>0){
               $this->AddPage();
           }
           
           $counter++;
            $this->SetWidths($wheader);
            $valueheader=array(
                array($v->pin.'/'.$v->nik,$v->jmlharikerja),
                array($v->nama,$v->harijadwal),
                array($v->jabatan,$v->masakerja.' Th')
                );
           for($i=0;$i<count($rowheader);$i++){
               $datarow = array(
                   $rowheader[$i][0],
                   ':',
                   $valueheader[$i][0],
                   ' ',
                   $rowheader[$i][1],
                   ':',
                   $valueheader[$i][1]);
               
               $this->lineh = 3;
               $this->setX(15);
               $this->RowHead4(
                        $datarow,
                        $wheader, 
                        $alignheader, 
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
                        
           //set detail
           

           $this->Ln(1);
           $yloop=$this->GetY();
           $this->setX(15);
           $this->Cell($wdetail[0], 3, 'PENDAPATAN');
           $this->Ln(1);
           $y1=$this->GetY()+2;
           $this->setX(15);
           $x1=15;
           $x2=$x1;
           foreach($wdetail as $v){
               $x2+=$v;
           }
           $this->Line($x1, $y1, $x2, $y1);
           $this->Ln($this->lineh);
           $this->SetWidths($wdetail);
           
           $totalpendapatan=0;
           
           foreach($pendapatan as $v){
               $totalpendapatan+=$v->nilai;
               $datarow = array(
               str_replace('Tunjangan', 'Tunj', $v->keterangan) ,
                   ':',
                   $v->nilai);
               $this->lineh = 3;
               $this->setX(15);
               $this->RowHead4(
                        $datarow,
                        $wdetail, 
                        $aligndetail, 
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
           
           $yl=$this->GetY();
           
           $this->SetY($yloop);
           $this->setX(130);
           $this->Cell($wdetail[0], 3, 'POTONGAN');
           $this->Ln(1);
           $y1=$this->GetY()+2;
           $this->setX(130);
           $x1=130;
           $x2=$x1;
           foreach($wdetail as $v){
               $x2+=$v;
           }
           $this->Line($x1, $y1, $x2, $y1);
           $this->Ln($this->lineh);
//           $this->SetX($xloop);
           $totalpotongan=0;
           foreach($potongan as $v){
               $totalpotongan+=$v->nilai;
               $datarow = array(
               str_replace('Tidak Masuk Tanpa Ijin','TMTI',str_replace('Tidak Masuk Dengan Ijin', 'TMDI', str_replace('Tunjangan', 'Tunj', $v->keterangan))) ,
                   ':',
                   $v->nilai);
               $this->lineh = 3;
               $this->setX(130);
               $this->RowHead4(
                        $datarow,
                        $wdetail, 
                        $aligndetail, 
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
           //total pendapatan
           $yr=$this->GetY();
           $yend=$yr>$yl?$yr:$yl;
           $this->SetY($yend);
           
           $this->Ln(1);
           $ynow=$this->GetY();
           $this->setX(15);
           $x1=$this->GetX()+$wdetail[0]+$wdetail[1];
           $x2=$this->GetX()+$wdetail[0]+$wdetail[1]+$wdetail[2];
           $this->Line($x1, $ynow, $x2, $ynow);
           
//           $totalpendapatan
           $this->Ln(1);
           $this->setX(15);

           $datarow=array('SUBTOTAL 1',' ',$totalpendapatan);
           $this->RowHead4(
                        $datarow,
                        $wdetail, 
                        $aligndetail, 
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
           
           //total potongan
           
           $this->SetY($yend);           
           $this->Ln(1);
           $ynow=$this->GetY();
           $this->setX(130);
           $x1=$this->GetX()+$wdetail[0]+$wdetail[1];
           $x2=$this->GetX()+$wdetail[0]+$wdetail[1]+$wdetail[2];
           $this->Line($x1, $ynow, $x2, $ynow);
           
           $this->Ln(1);
           $this->setX(130);

           $datarow=array('SUBTOTAL 2',' ',$totalpotongan);
           $this->RowHead4(
                        $datarow,
                        $wdetail, 
                        $aligndetail, 
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
           $this->Ln();
           $this->setX(15);
           $this->SetFont('courier', 'B', 10);
           $totalw=$wdetail[0]+$wdetail[1]+$wdetail[2];           
           $this->Cell($totalw, 5, 'TOTAL GAJI DITERIMA');
           $this->setX(130);
           $totalgaji=$totalpendapatan-$totalpotongan;
           $this->Cell($totalw, 5, number_format($totalgaji, 2),1,0,'C');
           $this->SetFont('courier', '', 8);
          
           
//            break;
            
                
        }

//        if(($this->GetY()+$this->lineh)>273){
//                        $this->AddPage();
//        }
    }

}

?>
