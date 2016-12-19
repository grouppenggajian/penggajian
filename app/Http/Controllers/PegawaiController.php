<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of PegawaiController
 *
 * @author miyzan
 */

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Pegawai;

class PegawaiController extends Controller {

    //put your code here
    public function index(Request $request) {
        $start = $request->start ? $request->start : 0;
        $limit = $request->limit ? $request->limit : 0;
        
        $query=$request->searchvalue?$request->searchvalue:NULL;
        
        $sqlsearch=NULL;
        $sqlsearch=array('where'=>array(['deleted', '=', '0']));
        if($query){
            array_push($sqlsearch['where'], ['nik', 'LIKE', '%'.$query.'%']);
            $sqlsearch['orwhere']= array(['nama', 'LIKE', '%'.$query.'%']);
        }

        $data = Pegawai::getRowsTableQueryLimit('mst_karyawans', $sqlsearch,$start, $limit);
        return json_encode([
                    'success' => true,
                    'data' => $data[0],
                    'record' => $data[1]
                ]);
    }

    public function loadPendapatan(Request $request) {
        $start = $request->start ? $request->start : 0;
        $limit = $request->limit ? $request->limit : 0;
        $data = Pegawai::getRowsTableAllLimit('mst_karyawans', $start, $limit);
        return json_encode([
                    'success' => true,
                    'data' => $data[0],
                    'record' => $data[1]
                ]);
    }

    public function loadPendapatanEdit(Request $request) {
        $nik = $request->nik ? $request->nik : null;
        $kode_jabatan = $request->kode_jabatan ? $request->kode_jabatan : null;
        $kode = $request->kode ? $request->kode : null;
        $nilai = $request->nilai ? $request->nilai : 0;
        $data = Pegawai::SP_getData('sp_pegawaipendapatan', array('edit', $nik, $kode_jabatan, $kode, $nilai,NULL));
        return json_encode([
                    'success' => true,
                    'data' => $data,
                    'record' => count($data)
                ]);
    }
    
    public function deletePendapatan(Request $request) {
        $nik = $request->nik ? $request->nik : null;
        $kode_jabatan = $request->kode_jabatan ? $request->kode_jabatan : null;
        $kode = $request->kode ? $request->kode : null;        
        $data = Pegawai::SP_execData('sp_pegawaipendapatan', array('deleterow', $nik, $kode_jabatan, $kode, $nilai,NULL),true);
        return response($data,200);
    }
    
    public function savePendapatan(Request $request) {
        $nik = $request->nik ? $request->nik : null;
        $kode_jabatan = $request->kode_jabatan ? $request->kode_jabatan : null;                
        $postdata=$request->postdata?json_decode($request->postdata):array();
        $vuser='test';
        if (count($postdata)>0){ 
            $param = array('deletesave', $nik, $kode_jabatan, NULL, NULL,NULL);
            $data=Pegawai::SP_execData('sp_pegawaipendapatan',$param,true);
            foreach ($postdata as $value) {
                $param = array('save',$nik,$kode_jabatan, $value->kode, $value->nilai,$vuser);
                $data=Pegawai::SP_execData('sp_pegawaipendapatan',$param,true);
            }
            
        }else
        {
            $data= array(
                    "success" => false,
                    "message" => 'No Data Found To Execute!'
                );
        }
        
        return response($data,200);
    }

    public function loadJadwal(Request $request) {
        $nik = $request->nik ? $request->nik : null;
        $kode_jabatan = $request->kode_jabatan ? $request->kode_jabatan : null;
        $opt='get';
        

        $data = Pegawai::SP_getData('sp_jadwalkaryawans', array($opt, $nik, $kode_jabatan, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL));
        return json_encode([
                    'success' => true,
                    'data' => $data,
                    'record' => count($data)
                ]);
    }
    
    public function deleteJadwal(Request $request) {
        $opt= $request->opt ? $request->opt : null;
        $nik = $request->nik ? $request->nik : null;
        $kode_jabatan = $request->kode_jabatan ? $request->kode_jabatan : null;
              
        $data = Pegawai::SP_execData('sp_jadwalkaryawans', array($opt, $nik, $kode_jabatan, NULL, NULL,NULL,NULL,NULL,NULL,NULL,NULL),true);
        return response($data,200);
    }
    
    public function saveJadwal(Request $request) {
        $nik = $request->nik ? $request->nik : null;
        $kode_jabatan = $request->kode_jabatan ? $request->kode_jabatan : null;                
        $postdata=$request->postdata?json_decode($request->postdata):array();
        $vuser='test';
        if (count($postdata)>0){ 
            $param = array('deletesave', $nik, $kode_jabatan, NULL, NULL,NULL,NULL,NULL,NULL,NULL,NULL);
            $data=Pegawai::SP_execData('sp_jadwalkaryawans',$param,true);
            foreach ($postdata as $value) {
                $param = array(
                    'save',
                    $nik,
                    $kode_jabatan, 
                    $value->senin, 
                    $value->selasa,
                    $value->rabu,
                    $value->kamis,
                    $value->jumat,
                    $value->sabtu,
                    $value->minggu,
                    $vuser);
                $data=Pegawai::SP_execData('sp_jadwalkaryawans',$param,true);
            }
            
        }else
        {
            $data= array(
                    "success" => false,
                    "message" => 'No Data Found To Execute!'
                );
        }
        
        return response($data,200);
    }
    
    public function getPegawaiTwin(Request $request) {
        $start = $request->start ? $request->start : 0;
        $limit = $request->limit ? $request->limit : 0;
        
        $query=$request->searchvalue?$request->searchvalue:NULL;
        
        $sqlsearch=NULL;
//        $sqlsearch=array('where'=>array(['deleted', '=', '0']));
        if($query){
            $sqlsearch['where']=array(['nik', 'LIKE', '%'.$query.'%']);
            $sqlsearch['orwhere']= array(['nama', 'LIKE', '%'.$query.'%'],['nama_jabatan', 'LIKE', '%'.$query.'%']);
        }

        $data = Pegawai::getRowsTableQueryLimit('v_pegawai_twin', $sqlsearch,$start, $limit);
        return json_encode([
                    'success' => true,
                    'data' => $data[0],
                    'record' => $data[1]
                ]);
    }
    public function getPegawaiTwinByjabatan(Request $request) {
        $start = $request->start ? $request->start : 0;
        $limit = $request->limit ? $request->limit : 0;
        $jabatan = $request->kode_jabatan ? $request->kode_jabatan : NULL;
        $query=$request->searchvalue?$request->searchvalue:NULL;
//        `sp_paging`(select_stmt TEXT, tbl varchar(50), where_stmt TEXT,order_stmt TEXT,limit_stmt varchar(20))
        $sqlsearch=' where jabatan="'.$jabatan.'" ';
        
        if($query){
            $sqlsearch.=' and (nama LIKE "%'.$query.'%" or nik LIKE "%'.$query.'%")';
        }
//        $vlimit=NULL;
        $dataall=Pegawai::SP_getData('sp_paging',array('select * ','v_pegawai_twin',$sqlsearch,"",""));
        $vlimit=" limit $start,$limit ";

        $data = Pegawai::SP_getData('sp_paging',array('select * ','v_pegawai_twin',$sqlsearch,'',$vlimit));
        return json_encode([
                    'success' => true,
                    'data' => $data,
                    'record' => count($dataall)
                ]);
    }
    
    public function setUploadPhoto($file) {
        $photo = NULL;

        if (file_exists(public_path('images/photo') . $file->getClientOriginalName())) {
            $this->deleteImage(public_path('images/photo'), $file->getClientOriginalName());
        }
        $filename = $file->getClientOriginalName();
        $filezise = $file->getSize();
        $file->move(public_path('images/photo'), $filename);
        $photo = 'public/images/photo/'.$filename;
        return $photo;  
    }

    public function executeRow(Request $request) {
        $opt = $request->opt ? $request->opt : NULL;
        $nik = $request->nik ? $request->nik : NULL;
        $nama = $request->nama ? $request->nama : NULL;
        $nama_panggilan = $request->nama_panggilan ? $request->nama_panggilan : NULL;
        $tgl_masuk = $request->tgl_masuk ? $request->tgl_masuk : NULL;
        $jabatan = $request->jabatan ? $request->jabatan : NULL;
        $status_kerja = $request->status_kerja ? $request->status_kerja : NULL;
        $no_ktp = $request->no_ktp ? $request->no_ktp : NULL;
        $tgl_ktp = $request->tgl_ktp ? $request->tgl_ktp : NULL;
        $alamat = $request->alamat ? $request->alamat : NULL;
        $propinsi = $request->propinsi ? $request->propinsi : NULL;
        $kabupaten = $request->kabupaten ? $request->kabupaten : NULL;
        $kecamatan = $request->kecamatan ? $request->kecamatan : NULL;
        $kelurahan = $request->kelurahan ? $request->kelurahan : NULL;
        $telp = $request->telp ? $request->telp : NULL;
        $hp = $request->hp ? $request->hp : NULL;
        $tempat_lahir = $request->tempat_lahir ? $request->tempat_lahir : NULL;
        $tgl_lahir = $request->tgl_lahir ? $request->tgl_lahir : NULL;
        $jns_kelamin = $request->jns_kelamin ? $request->jns_kelamin : NULL;
        $gol_darah = $request->gol_darah ? $request->gol_darah : NULL;
        $agama = $request->agama ? $request->agama : NULL;
        $pendidikan = $request->pendidikan ? $request->pendidikan : NULL;
        $status_kawin = $request->status_kawin ? $request->status_kawin : NULL;
        $status_pajak = $request->status_pajak ? $request->status_pajak : NULL;
        $libur_perminggu = $request->libur_perminggu ? $request->libur_perminggu : NULL;
        $status_pegawai = $request->status_pegawai ? $request->status_pegawai : NULL;
        $tgl_keluar = $request->tgl_keluar ? $request->tgl_keluar : NULL;
        $photo = $request->photo ? $request->photo : NULL;
        $user = 'test';
        //$file = $request->file('photopath');
        if ($request->hasFile('photopath')) {
            $file = $request->file('photopath');
            $this->validate($request, [
                'photopath' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            ]);
            if ($file->isValid()) {
                $photo = $this->setUploadPhoto($file);
            }
        }
        $param = array(
            $opt,
            $nik,
            $nama,
            $nama_panggilan,
            $tgl_masuk,
            $jabatan,
            $status_kerja,
            $no_ktp,
            $tgl_ktp,
            $alamat,
            $propinsi,
            $kabupaten,
            $kecamatan,
            $kelurahan,
            $telp,
            $hp,
            $tempat_lahir,
            $tgl_lahir,
            $jns_kelamin,
            $gol_darah,
            $agama,
            $pendidikan,
            $status_kawin,
            $status_pajak,
            $libur_perminggu,
            $status_pegawai,
            $tgl_keluar,
            $photo,
            $user
        );
        $data = Pegawai::SP_execData('sp_pegawai', $param, true);        
        return response($data, 200);
    }

    public function deleteRow(Request $request) {
        $nik = $request->nik ? $request->nik : NULL;
        $user = 'test';
        $param = array($nik, $user);
        $data = Pegawai::SP_execData('sp_pegawai_delete', $param, true);


        return response($data, 200);
    }

    public function getImage(Request $request) {
        $nik=$request->nik ? $request->nik : NULL;
        $datalink=null;
        if($nik){
            $datalink=Pegawai::getRowsTable([['nik','=',$nik]], 'mst_karyawans', ['photo'], NULL);
            if(count($datalink)==0){
                return json_encode(array("success" => false,
                    "record" => 0,
                    "data" => [],
                    "message"=>'Photo Not Found'
                )
            );
            }
        }else{
            return json_encode(array("success" => false,
                    "record" => 0,
                    "data" => [],
                    "message"=>'NIK Not Found'
                )
            );
        }
//        echo $datalink[0];
//        return;
        $arr = explode('/', $datalink[0]->photo);
        
        $photoname = $arr[count($arr) - 1];
        $dir = public_path('images/photo');
        $images = array();
        $d = dir($dir);
        while ($name = $d->read()) {

            if (!preg_match('/\.(jpg|gif|png)$/', $name))
                continue;
            if ($name == $photoname) {
//                echo $name;
                array_push($images, array("caption" => $photoname, "src" => asset('public/images/photo') . '/' . $photoname));
            }
        }

        $d->close();
//        $o = array('data' => $images);
//        $data = json_encode($images);
        $total = count($images);
        return json_encode(array("success" => true,
                    "record" => $total,
                    "data" => $images)
        );
//        echo "{success:true,record:$total,data:$data }";
    }

    public function deleteImage($dir, $filename) {
//        $dir = "assets/images/logo/";
//        $images = array();
        $d = dir($dir);
        while ($name = $d->read()) {
            if (!preg_match('/\.(jpg|gif|png)$/', $name))
                continue;
            if ($name == $filename) {
                unlink($dir . $name);
            }
        }
    }

    public function uploadImage(Request $request) {

//        $file = $_FILES['photopath']; 
        $filename = '';
        $filezise = '';
//        $filetmp = $file['tmp_name'];
        $json = '';
        if ($request->hasFile('photopath')) {
            $file = $request->file('photopath');
            $this->validate($request, [
                'photopath' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            ]);
            if ($file->isValid()) {
                if (file_exists(public_path('images/photo') . $file->getClientOriginalName())) {
                    $this->deleteImage(public_path('images/photo'), $file->getClientOriginalName());
                }
                $filename = $file->getClientOriginalName();
                $filezise = $file->getSize();
                $file->move(public_path('images/photo'), $file->getClientOriginalName());
                $json = json_encode(array("success" => true,
                    "fileName" => $filename,
                    "fileSize" => $filezise,
                    "message" => ' Upload Success Filename : ' . $filename));
            } else {
                $json = json_encode(array("success" => false,
                    "fileName" => $filename,
                    "fileSize" => $filezise,
                    "message" => ' Upload Abort Filename : ' . $filename));
            }
        } else {
            $json = json_encode(array("success" => false,
                "fileName" => $filename,
                "fileSize" => $filezise,
                "message" => ' Upload Abort Filename : ' . $filename));
        }




        return $json;
    }

}

?>
