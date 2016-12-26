<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
//use Illuminate\Support\Facades\Request;
//use App\Http\Requests;
use App\Models\Jabatan;
class JabatanController extends Controller {
    public function index(Request $request){
        $start = $request->start?$request->start:0;
        $limit = $request->limit?$request->limit:0;
//        echo $request->searchvalue;
//        return;
        $query=$request->searchvalue?$request->searchvalue:NULL;
        
        $sqlsearch=NULL;
        if($query){
            $sqlsearch=array('where'=>array(['kode_jabatan', 'LIKE', '%'.$query.'%']),'orwhere'=>array(['nama_jabatan', 'LIKE', '%'.$query.'%']));
        }

        $data = Jabatan::getRowsTableQueryLimit('jabatans',$sqlsearch,$start,$limit);
        return json_encode([
                    'success' => true,
                    'data' => $data[0],
                    'record' => $data[1]
                        ]);
    }
    public function indexNew(Request $request){
        $start = $request->start?$request->start:0;
        $limit = $request->limit?$request->limit:1;
//        echo $request->searchvalue;
//        return;
        $query=$request->searchvalue?$request->searchvalue:NULL;
        
        $sqlsearch=NULL;
        if($query){
            $sqlsearch='where (a.kode_jabatan LIKE "%'.$query.'%" or nama_jabatan LIKE "%'.$query.'%")';
        }
        $vlimit=NULL;
        $dataall=Jabatan::SP_getData('sp_paging_jabatan',array($sqlsearch,$vlimit));
        $vlimit="limit $start,$limit";
        
                
        $data = Jabatan::SP_getData('sp_paging_jabatan',array($sqlsearch,$vlimit));
        return json_encode([
                    'success' => true,
                    'data' => $data,
                    'record' => count($dataall)
                        ]);
    }
    
    public function indexCombo(Request $request){
//        $start = $request->start?$request->start:0;
//        $limit = $request->limit?$request->limit:0;
//        echo $request->searchvalue;
//        return;
        $query=$request->searchvalue?$request->searchvalue:NULL;
        
        $sqlsearch=NULL;
        if($query){
            $sqlsearch=array(['nama_jabatan', 'LIKE', '%'.$query.'%']);
        }
        $data = Jabatan::getRowsTable($sqlsearch, 'jabatans') ;
//        $data = Jabatan::getRowsTableQueryLimit('jabatans',$sqlsearch,$start,$limit);
        return json_encode([
                    'success' => true,
                    'data' => $data,
                    'record' =>count($data)
                        ]);
    }
    public function getKomponen(Request $request){
        $start = $request->start?$request->start:0;
        $limit = $request->limit?$request->limit:0;
        $kode=$request->kode_jabatan?$request->kode_jabatan:NULL;
        $opt='getview';
        $vkode_jabatan=$kode;
        $vkode_pendapatan=$request->kode_pendapatan?$request->kode_pendapatan:NULL;
        $vbatas=null;
        $vbatas_min=null;
        $vbatas_max=null;
        $vnilai_default=null;
        $data = Jabatan::SP_getData('sp_pendapatanjabatan',
                array($opt,$vkode_jabatan,$vkode_pendapatan,$vbatas,$vbatas_min,$vbatas_max,$vnilai_default));
        return json_encode([
                    'success' => true,
                    'data' => $data,
                    'record' => count($data)
                        ]);
    }
    public function getKomponenInputLoad(Request $request){
        $start = $request->start?$request->start:0;
        $limit = $request->limit?$request->limit:0;
        $kode=$request->kode_jabatan?$request->kode_jabatan:NULL;
        $opt='get';
        $vkode_jabatan=$kode;
        $vkode_pendapatan=$request->kode_pendapatan?$request->kode_pendapatan:NULL;
        $vbatas=NULL;
        $vbatas_min=NULL;
        $vbatas_max=NULL;
        $vnilai_default=NULL;
//        echo json_encode(array($opt,$vkode_jabatan,$vkode_pendapatan,$vbatas,$vbatas_min,$vbatas_max,$vnilai_default));
//        return;
        $data = Jabatan::SP_getData('sp_pendapatanjabatan',
                array($opt,$vkode_jabatan,$vkode_pendapatan,$vbatas,$vbatas_min,$vbatas_max,$vnilai_default));
        return json_encode([
                    'success' => true,
                    'data' => $data,
                    'record' => count($data)
                        ]);
    }
    public function setJabatanInput(Request $request){
        $start = $request->start?$request->start:0;
        $limit = $request->limit?$request->limit:0;
        $vkode_jabatan=$request->kode_jabatan?$request->kode_jabatan:NULL;
        $vnama_jabatan=$request->nama_jabatan?$request->nama_jabatan:NULL;
        $opt=$request->opt?$request->opt:'';
        $postdata=$request->post_data?json_decode($request->post_data):array();
        $retval = Jabatan::SP_execData('sp_jabatan',array($opt,$vkode_jabatan,$vnama_jabatan),true);                
        $param=array();
        $retvalmsg=array();
        
        
        if($retval['success']==1){
            $opt='insert';
            foreach ($postdata as $value) {
                $param=array($opt,$vkode_jabatan,
                    $value->kode_pendapatan,
                    $value->batas=='on'?1:0,$value->batas_min,$value->batas_max,$value->nilai_default);
                $query = Jabatan::SP_execData('sp_pendapatanjabatan',$param,true);
                if(!$query['success']==1){
                    array_push($retvalmsg,$value->kode_pendapatan.' '. $query['message']);
                }
            }
            if(count($retvalmsg)>0){
            $msg=implode(" ",$retvalmsg);
            $retval = array(
                    "success" => false,
                    "message" => $msg
                );
            }else{
                $retval = array(
                        "success" => true,
                        "message" => 'Execute Successfully'
                    );
            }
        }  
        return response($retval,200);
    }
    public function deleteRow(Request $request){        
        $vkode_jabatan=$request->kode?$request->kode:NULL;       
        $opt=$request->opt?$request->opt:'';
        $postdata=$request->post_data?json_decode($request->post_data):array();
       $param= array($opt,$vkode_jabatan,'');
        $data=Jabatan::SP_execData('sp_jabatan',$param,true);
          
          
        return response($data,200);
    }
    public function updateJabatan(Request $request){
        $postdata=$request->postdata?json_decode($request->postdata):array();
        $vkode_jabatan=$postdata->kode_jabatan;
        $retvalmsg=array();
        foreach ($postdata as $key => $value) {
//                            echo $key;

            if($key!='kode_jabatan'){
                if($key!=='nama_jabatan'){
//                    echo $value.' ';
//                    if($key=='TunjanganJabatan'){
//                        continue ;
//                    }
//                    if($key=='TunjanganMasaKerja'){
//                        continue ;
//                    }
                    $param=array('update',$vkode_jabatan,
                    $key,
                    0,null,null,$value);
//                    echo json_encode($param);
                    $query = Jabatan::SP_execData('sp_pendapatanjabatan',$param,true);
//                    echo json_encode($query['message']);
                    if(!$query['success']==1){
                        array_push($retvalmsg,$key.' '. $query['message']);
                    }
                }
                
            }
        }
//        return;
         if(count($retvalmsg)>0){
            $msg=implode(", ",$retvalmsg);
            $retval = array(
                    "success" => false,
                    "message" => $msg
                );
            }else{
                $retval = array(
                        "success" => true,
                        "message" => 'Execute Successfully',
                        "data"=>$request->postdata
                    );
            }
         
//        return;
//        $retval = array(
//                        "success" => true,
//                        "message" => 'Execute Successfully',
//                        "data"=>$request->postdata
//                    );
        return response($retval,200);
    }
}
?>
