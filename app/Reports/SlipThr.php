<?php
namespace App\Reports;
/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of SlipThr
 *
 * @author miyzan
 */
class SlipThr extends MY_FPDF {

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
        $wheader = array(18, 6, 40,55,20,6,45);
        $wdetail = array(35, 5, 25);
//        $this->set_header_column($w) ;
        $alignheader= array('L', 'C', 'L', 'C', 'L', 'C', 'L');
        $aligndetail= array('L', 'C', 'R');
        $rowheader=array(array('Urut/NIK','Tgl Masuk'),array('Nama','Tgl THR'),array('Jabatan','Masa Kerja'));
        $this->SetWidths($wheader);
        $counter=0;
        foreach ($data as $v) {
            
           if($counter>0){
               $this->AddPage();
           }
           $counter++;
           
           $this->SetWidths($wheader);           
           $valueheader=array(
                array($v->pin.'/'.$v->nik,  date_format(date_create( $v->tglmasuk),"d F Y")),
                array($v->nama,date_format(date_create( $v->tglthr),"d F Y")),
                array($v->jabatan,$v->masakerja)
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
               $this->setX(10);
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
               
               $this->Ln();
           $this->setX(10);
           $this->SetFont('courier', 'B', 10);
           $totalw=$wdetail[0]+$wdetail[1]+$wdetail[2];           
           $this->Cell($totalw, 5, 'TOTAL THR DITERIMA');
           
           $this->setX(130);           
           $this->Cell($totalw, 5, number_format($v->nilai, 2),1,0,'C');
           $this->SetFont('courier', '', 8);
//               break;
           
        }
        
    }

}

?>
