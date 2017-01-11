<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of MesinController
 *
 * @author miyzan
 */

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\MYModel;

class MesinController extends Controller {

    public static function getKetentuan() {
        $query = MYModel::getRowsTable(null, 'ketentuan');
        return $query;
    }

    public static function getPeriode() {
        $query = MYModel::getRowsTable(null, 'v_periodegaji_aktif');
        return $query;
    }

    public static function setSoapMesin($Connect, $soap_request) {
        $newLine = "\r\n";
        fputs($Connect, "POST /iWsService HTTP/1.0" . $newLine);
        fputs($Connect, "Content-Type: text/xml" . $newLine);
        fputs($Connect, "Content-Length: " . strlen($soap_request) . $newLine . $newLine);
        fputs($Connect, $soap_request . $newLine);
        $buffer = "";
        while ($Response = fgets($Connect, 1024)) {
            $buffer = $buffer . $Response;
        }
        return $buffer;
    }

    public static function GetUserInfo($pin = 'All') {
        $ketentuan = MesinController::getKetentuan();
        $ip = $ketentuan[0]->ipmesin;
        $pwd = $ketentuan[0]->pwdmesin;
        $Connect = null;
        $errstr = null;
        $errno = null;

        if(!$ip){
            return "koneksi gagal";
        }
        if(!$pwd){
            return "koneksi gagal";
        }

        if (!$Connect = @fsockopen($ip, "80", $errno, $errstr, 1)) {
            return "koneksi gagal";
        }

        if ($Connect) {
            $soap_request = "<GetUserInfo><ArgComKey Xsi:type=\"xsd:integer\">$pwd</ArgComKey><Arg><PIN Xsi:type=\"xsd:integer\">$pin</ PIN></ Arg></ GetUserInfo>";
            $buffer_soap = MesinController::setSoapMesin($Connect, $soap_request);
            $buffer_xml = Parse_Data($buffer_soap, "<GetUserInfoResponse>", "</GetUserInfoResponse>");
            $buffer = explode("\r\n", $buffer_xml);
            $rowmesin = array();
            for ($a = 0; $a < count($buffer); $a++) {
                $data = Parse_Data($buffer[$a], "<Row>", "</Row>");
                if (strlen($data) > 0) {
                    $PIN = Parse_Data($data, "<PIN>", "</PIN>");
                    $name = Parse_Data($data, "<Name>", "</Name>");
                    $Password = Parse_Data($data, "<Password>", "</Password>");
                    $Group = Parse_Data($data, "<Group>", "</Group>");
                    $Privilege = Parse_Data($data, "<Privilege>", "</Privilege>");
                    $Card = Parse_Data($data, "<Card>", "</Card>");
                    array_push($rowmesin, array(
                        'pin' => $PIN,
                        'name' => $name,
                        'password' => $Password,
                        'group' => $Group,
                        'privilege' => $Privilege,
                        'card' => $Card
                    ));
                }
            }
            @fclose($Connect);
            return $rowmesin;
        }else
            return "Koneksi Gagal";
    }

    public static function SetUserInfo($pin, $name, $card) {
        $ketentuan = MesinController::getKetentuan();
        $ip = $ketentuan[0]->ipmesin;
        $pwd = $ketentuan[0]->pwdmesin;
        if(!$ip){
            return "koneksi gagal";
        }
        if(!$pwd){
            return "koneksi gagal";
        }
        if (!$Connect = @fsockopen($ip, "80", $errno, $errstr, 1)) {
            return "koneksi gagal";
        }
        if ($Connect) {
            // echo "Koneksi Sukses"."\r\n";	
            $soap_request = "<SetUserInfo><ArgComKey Xsi:type=\"xsd:integer\">$pwd</ArgComKey><Arg>
                <PIN>$pin</PIN><Name>$name</Name>
                <Password></Password>
                <Group>0</Group>
                <Privilege>0</Privilege>
                <Card>$card</Card>
                    <PIN2>$pin</PIN2>
                        <TZ1>0</TZ1><TZ2>0</TZ2 <TZ3>0</TZ3>
			</Arg></SetUserInfo>";
            $buffer_soap = MesinController::setSoapMesin($Connect, $soap_request);
            $buffer_xml = Parse_Data($buffer_soap, "<SetUserInfoResponse>", "</SetUserInfoResponse>");
            $buffer = explode("\r\n", $buffer_xml);
//            echo var_dump($buffer);
            $retval = false;
            for ($a = 0; $a < count($buffer); $a++) {
                $data = Parse_Data($buffer[$a], "<Row>", "</Row>");
                if (strlen($data) > 0) {
                    $retval = Parse_Data($data, "<Result>", "</Result>");
                }
            }
            @fclose($Connect);
            return $retval;
        }else
            return "Koneksi Gagal";
    }

    public static function DeleteUserInfo($pin) {
        $ketentuan = MesinController::getKetentuan();
        $ip = $ketentuan[0]->ipmesin;
        $pwd = $ketentuan[0]->pwdmesin;
        
        if(!$ip){
            return "koneksi gagal";
        }
        if(!$pwd){
            return "koneksi gagal";
        }
        if (!$Connect = @fsockopen($ip, "80", $errno, $errstr, 1)) {
            return "koneksi gagal";
        }

        if ($Connect) {
            // echo "Koneksi Sukses"."\r\n";	
            $soap_request = "<DeleteUser><ArgComKey xsi:type=\"xsd:integer\">$pwd</ArgComKey><Arg><PIN xsi:type=\"xsd:integer\">$pin</PIN></Arg></DeleteUser>";
            $buffer_soap = MesinController::setSoapMesin($Connect, $soap_request);
            $buffer_xml = Parse_Data($buffer_soap, "<DeleteUserResponse>", "</DeleteUserResponse>");
            $buffer = explode("\r\n", $buffer_xml);
//            $rowmesin = array();
            $retval = false;
            for ($a = 0; $a < count($buffer); $a++) {
                $data = Parse_Data($buffer[$a], "<Row>", "</Row>");
                if (strlen($data) > 0) {
                    $retval = Parse_Data($data, "<Result>", "</Result>");
                }
            }
            @fclose($Connect);
            return $retval;
        }else
            return "Koneksi Gagal";
    }

    public static function if_exist_check($PIN, $DateTime) {
        // validasi periode
        $data = MYModel::getRowsTable([['pin', '=', $PIN], ['date_time', '=', $DateTime]], 'log_absen');

        $retval = false;
        if (count($data) > 0) {
            $retval = true;
        }
        return $retval;
    }

    public static function validasi_periode($datefinger, $DateStart, $DateFinish) {
        // validasi periode
        $datef = strtotime($datefinger);
        $datef = date('Y-m-d', $datef);
        if (($datef >= $DateStart) && ($datef <= $DateFinish)) {
            return true;
        } else {
            return false;
        }
    }

    public static function GetAttLogView($pin = 'All') {
        $ketentuan = MesinController::getKetentuan();
        $ip = $ketentuan[0]->ipmesin;
        $pwd = $ketentuan[0]->pwdmesin;

        $periode = MesinController::getPeriode();
        $tglawal = $periode[0]->tglawal;
        $tglakhir = $periode[0]->tglakhir;

        if(!$ip){
            return "koneksi gagal";
        }
        if(!$pwd){
            return "koneksi gagal";
        }
        
        if (!$Connect = @fsockopen($ip, "80", $errno, $errstr, 1)) {
            return "koneksi gagal";
        }
        if ($Connect) {
            // echo "Koneksi Sukses"."\r\n";	
            $soap_request = "<GetAttLog><ArgComKey xsi:type=\"xsd:integer\">$pwd</ArgComKey><Arg><PIN xsi:type=\"xsd:integer\">$pin</PIN></Arg></GetAttLog>";
            $buffer_soap = MesinController::setSoapMesin($Connect, $soap_request);
            $buffer_xml = Parse_Data($buffer_soap, "<GetAttLogResponse>", "</GetAttLogResponse>");
            $buffer = explode("\r\n", $buffer_xml);
//             echo var_dump($buffer);
            for ($a = 0; $a < count($buffer); $a++) {
                $data = Parse_Data($buffer[$a], "<Row>", "</Row>");
                if (strlen($data) > 0) {
                    $PIN = Parse_Data($data, "<PIN>", "</PIN>");
                    $DateTime = Parse_Data($data, "<DateTime>", "</DateTime>");
                    $Verified = Parse_Data($data, "<Verified>", "</Verified>");
                    $Status = Parse_Data($data, "<Status>", "</Status>");
                    $WorkCode = Parse_Data($data, "<WorkCode>", "</WorkCode>");
                    $Card = Parse_Data($data, "<Card>", "</Card>");
                    echo json_encode( array(
                                            'pin' => $PIN,
                                            'date_time' => $DateTime,
                                            'verified' => $Verified,
                                            'status' => $Status));
                }
            }
            @fclose($Connect);
            return true;
        }else return "Koneksi Gagal";
    }
    
    public static function GetAttLog($pin = 'All') {
        $ketentuan = MesinController::getKetentuan();
        $ip = $ketentuan[0]->ipmesin;
        $pwd = $ketentuan[0]->pwdmesin;

        $periode = MesinController::getPeriode();
        $tglawal = $periode[0]->tglawal;
        $tglakhir = $periode[0]->tglakhir;

        if(!$ip){
            return "koneksi gagal";
        }
        if(!$pwd){
            return "koneksi gagal";
        }
        
        if (!$Connect = @fsockopen($ip, "80", $errno, $errstr, 1)) {
            return "koneksi gagal";
        }
        if ($Connect) {
            // echo "Koneksi Sukses"."\r\n";	
            $soap_request = "<GetAttLog><ArgComKey xsi:type=\"xsd:integer\">$pwd</ArgComKey><Arg><PIN xsi:type=\"xsd:integer\">$pin</PIN></Arg></GetAttLog>";
            $buffer_soap = MesinController::setSoapMesin($Connect, $soap_request);
            $buffer_xml = Parse_Data($buffer_soap, "<GetAttLogResponse>", "</GetAttLogResponse>");
            $buffer = explode("\r\n", $buffer_xml);
            // echo var_dump($buffer);
            $retval=false;
            for ($a = 0; $a < count($buffer); $a++) {
                $data = Parse_Data($buffer[$a], "<Row>", "</Row>");
                if (strlen($data) > 0) {
                    $PIN = Parse_Data($data, "<PIN>", "</PIN>");
                    $DateTime = Parse_Data($data, "<DateTime>", "</DateTime>");
                    $Verified = Parse_Data($data, "<Verified>", "</Verified>");
                    $Status = Parse_Data($data, "<Status>", "</Status>");
                    $WorkCode = Parse_Data($data, "<WorkCode>", "</WorkCode>");
                    $Card = Parse_Data($data, "<Card>", "</Card>");
                    if (MesinController::validasi_periode($DateTime, $tglawal, $tglakhir)) {
                        if (!MesinController::if_exist_check($PIN, $DateTime) && $PIN && $DateTime) {
                            $retval = MYModel::setInsertRow('log_absen', array(array(
                                            'pin' => $PIN,
                                            'date_time' => $DateTime,
                                            'verified' => $Verified,
                                            'status' => $Status)));
                        }
                    }
                }
            }
            @fclose($Connect);
            return true;
        }else return "Koneksi Gagal";
    }

    public static function ClearLog() {
        $ketentuan = MesinController::getKetentuan();
        $ip = $ketentuan[0]->ipmesin;
        $pwd = $ketentuan[0]->pwdmesin;
        
        if(!$ip){
            return "koneksi gagal";
        }
        if(!$pwd){
            return "koneksi gagal";
        }
        
        if (!$Connect = @fsockopen($ip, "80", $errno, $errstr, 1)) {
            return "koneksi gagal";
        }
        if ($Connect) {
            // echo "Koneksi Sukses"."\r\n";	
            $soap_request = "<ClearData><ArgComKey xsi:type=\"xsd:integer\">$pwd</ArgComKey><Arg><Value xsi:type=\"xsd:integer\">3</Value></Arg></ClearData>";
            $buffer_soap = MesinController::setSoapMesin($Connect, $soap_request);
            $buffer_xml = Parse_Data($buffer_soap, "<ClearDataResponse>", "</ClearDataResponse>");
            $buffer = explode("\r\n", $buffer_xml);
            $retval = false;
            for ($a = 0; $a < count($buffer); $a++) {
                $data = Parse_Data($buffer[$a], "<Row>", "</Row>");
                if (strlen($data) > 0) {
                    $retval = Parse_Data($data, "<Result>", "</Result>");
                }
            }
            @fclose($Connect);
            return $retval;
        }else
            return "koneksi gagal";
    }

}

?>
