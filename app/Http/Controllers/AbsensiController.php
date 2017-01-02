<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\MYModel;
class AbsensiController extends Controller{
	public function index(Request $request){
		$Connect = fsockopen('192.168.1.201', "80", $errno, $errstr, 1);
		if($Connect){
			// echo "Koneksi Sukses"."\r\n";	
			$soap_request="<GetUserInfo><ArgComKey Xsi:type=\"xsd:integer\">tmg123</ArgComKey><Arg><PIN Xsi:type=\"xsd:integer\">All</ PIN></ Arg></ GetUserInfo>";
                $newLine="\r\n";	
            fputs($Connect, "POST /iWsService HTTP/1.0".$newLine);
                fputs($Connect, "Content-Type: text/xml".$newLine);
                fputs($Connect, "Content-Length: ".strlen($soap_request).$newLine.$newLine);
                fputs($Connect, $soap_request.$newLine);
                $buffer="";
                while($Response=fgets($Connect, 1024)){
                    $buffer=$buffer.$Response;
                }
                $buffer = Parse_Data($buffer,"<GetUserInfoResponse>","</GetUserInfoResponse>");
                $buffer = explode("\r\n",$buffer);
                // echo var_dump($buffer);
                for($a=0;$a<count($buffer);$a++){
                    $data = Parse_Data($buffer[$a],"<Row>","</Row>");
                    if(strlen($data)>0){
                    $PIN = Parse_Data($data,"<PIN>","</PIN>");
                    $name = Parse_Data($data,"<Name>","</Name>");
                    $Password = Parse_Data($data,"<Password>","</Password>");
                    $Group = Parse_Data($data,"<Group>","</Group>");
                    $Privilege = Parse_Data($data,"<Privilege>","</Privilege>");
                    $Card = Parse_Data($data,"<Card>","</Card>");
                    echo json_encode(array(
                    	'pin'=>$PIN,
                    	'name'=>$name,
                    	'password'=>$Password,
                    	'group'=>$Group,
                    	'privilege'=>$Privilege,
                    	'card'=>$Card
                    	));
                    }
                }
		}else echo "Koneksi Gagal";
	}

	public function set_mesin(Request $request){
		$Connect = fsockopen('192.168.1.201', "80", $errno, $errstr, 1);
		if($Connect){
			// echo "Koneksi Sukses"."\r\n";	
			$soap_request="<SetUserInfo><ArgComKey Xsi:type=\"xsd:integer\">tmg123</ArgComKey><Arg><PIN>3</ PIN>
			<Name>faroq</ Name><Password></ Password><Group>1</ Group><Privilege>0</ Privilege><Card>3</ Card><PIN2>3</ PIN2> <TZ1>0</ TZ1><TZ2>0</ TZ2 <TZ3>0</ TZ3>
			</ Arg></ SetUserInfo>";
                $newLine="\r\n";	
            fputs($Connect, "POST /iWsService HTTP/1.0".$newLine);
                fputs($Connect, "Content-Type: text/xml".$newLine);
                fputs($Connect, "Content-Length: ".strlen($soap_request).$newLine.$newLine);
                fputs($Connect, $soap_request.$newLine);
                $buffer="";
                while($Response=fgets($Connect, 1024)){
                    $buffer=$buffer.$Response;
                }
                $buffer = Parse_Data($buffer,"<SetUserInfoResponse>","</SetUserInfoResponse>");
                $buffer = explode("\r\n",$buffer);
                echo var_dump($buffer);
                for($a=0;$a<count($buffer);$a++){
                    $data = Parse_Data($buffer[$a],"<Row>","</Row>");
                    if(strlen($data)>0){
                    $result = Parse_Data($data,"<Result>","</Result>");                    
                    echo $result;
                    }
                }
		}else echo "Koneksi Gagal";
	}
}

?>