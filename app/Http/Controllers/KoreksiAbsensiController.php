<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\MYModel;

class KoreksiAbsensiController extends Controller {

    public function index(Request $request) {
        $periode = MYModel::getRowsTable([], 'v_periodegaji_aktif', []);

        $start = $request->start ? $request->start : 0;
        $limit = $request->limit ? $request->limit : 0;
        $searchvalue = $request->searchvalue ? $request->searchvalue : NULL;
        $thbl = $request->thbl ? $request->thbl : $periode[0]->thbl;
        $tglawal = $request->awal ? $request->awal : $periode[0]->tglawal;
        $tglakhir = $request->akhir ? $request->akhir : $periode[0]->tglakhir;

        $table = MYModel::getDBTable('v_koreksi_absensi');
//        if($tglawal){
//            if($tglakhir){
//                
//            }
//        }
        $table->where(array(array('thbl', '=', $thbl)));
        $table->whereBetween('tgl', ["$tglawal", "$tglakhir"]);
        if ($searchvalue) {
//            $table->where(array(['nik', 'LIKE', '%'.$query.'%']));
            $table->orWhere(array(['nik', 'LIKE', '"%' . $searchvalue . '%']));
            $table->orWhere(array(['nama', 'LIKE', '%' . $searchvalue . '%']));
        }

        $totalrec = $table->count();
//        echo $totalrec;
//        $table=MYModel::getDBTable('v_koreksi_absensi');
        $table->where(array(array('thbl', '=', $thbl)));
        $table->whereBetween('tgl', ["$tglawal", "$tglakhir"]);
        if ($searchvalue) {
//            $table->where(array(['nik', 'LIKE', '%'.$query.'%']));
            $table->where(array(['nik', 'LIKE', '%' . $searchvalue . '%']));
            $table->orWhere(array(['nama', 'LIKE', '%' . $searchvalue . '%']));
        }

        $table->offset($start);
        $table->limit($limit);
        $query = $table->get();
        return json_encode([
                    'success' => true,
                    'data' => $query,
                    'record' => $totalrec
                ]);
    }

    public function historyLoad(Request $request) {
        $start = $request->start ? $request->start : 0;
        $limit = $request->limit ? $request->limit : 0;
        $nik = $request->nik ? $request->nik : NULL;        
        $tgl = $request->tgl ? $request->tgl : null;

        $table = MYModel::getDBTable('v_koreksi_absensi_histo');
//        if($tglawal){
//            if($tglakhir){
//                
//            }
//        }
        $table->where(array(array('tgl', '=', $tgl)));
        $table->where(array(array('nik', '=', $nik)));        

        $totalrec = $table->count();
//        echo $totalrec;
//        $table=MYModel::getDBTable('v_koreksi_absensi');
        $table->where(array(array('tgl', '=', $tgl)));
        $table->where(array(array('nik', '=', $nik)));   
        $table->orderBy('x_koreksi', 'ASC');
        $table->offset($start);
        $table->limit($limit);
        
        $query = $table->get();
        return json_encode([
                    'success' => true,
                    'data' => $query,
                    'record' => $totalrec
                ]);
    }
    
    public function loadJadwalPegawai(Request $request) {
        $tanggal = $request->tanggal ? $request->tanggal : null;
        $nik = $request->nik ? $request->nik : null;
        $jabatan = $request->kode_jabatan ? $request->kode_jabatan : null;
        //$hari=  str_ireplace("'", "", $hari);
        $data = MYModel::getDBTable('v_jadwal_karyawan')
                ->select('kode_shift', 'jam_kerja_1', 'jam_kerja_2', 'jam_kerja_3', 'jam_kerja_4')
                ->where(array(array('tanggal', '=', $tanggal), array('nik', '=', $nik), array('kode_jabatan', '=', $jabatan)))
                ->get();


        return json_encode([
                    'success' => true,
                    'data' => $data,
                    'record' => count($data)
                ]);
    }

    public function executeRow(Request $request) {

        $pin = $request->pin ? $request->pin : NULL;
        $nik = $request->nik ? $request->nik : NULL;
        $tgl = $request->vtgl ? $request->vtgl : NULL;
        $thbl = $request->thbl ? $request->thbl : NULL;
        $hari = $request->hari ? $request->hari : NULL;
        $is_pantangan = $request->is_pantangan ? $request->is_pantangan : NULL;
        $kode_shift = $request->kode_shift ? $request->kode_shift : NULL;
        $jmljamkerja = $request->jmljamkerja ? $request->jmljamkerja : NULL;
        $jam_kerja_1 = $request->jam_kerja_1 ? $request->jam_kerja_1 : NULL;
        $jam_kerja_2 = $request->jam_kerja_2 ? $request->jam_kerja_2 : NULL;
        $jam_kerja_3 = $request->jam_kerja_3 ? $request->jam_kerja_3 : NULL;
        $jam_kerja_4 = $request->jam_kerja_4 ? $request->jam_kerja_4 : NULL;
        $masuk = $request->masuk ? $request->masuk : NULL;
        $keluar = $request->keluar ? $request->keluar : NULL;
        $masuk_kembali = $request->masuk_kembali ? $request->masuk_kembali : NULL;
        $pulang = $request->pulang ? $request->pulang : NULL;
        $lembur_masuk = $request->lembur_masuk ? $request->lembur_masuk : NULL;
        $lembur_keluar = $request->lembur_keluar ? $request->lembur_keluar : NULL;
        $keterangan = $request->keterangan ? $request->keterangan : NULL;

        $nomor = MYModel::getsetIdMaster('set', 'KA', 1, 6);
        $koreksi_id = $nomor[0]->idmaster;

        $koreksi_by = $request->session()->get('userid');
        $param = array(
            $koreksi_id,
            $pin,
            $nik,
            $tgl,
            $thbl,
            str_ireplace("'", "\'",  $hari),
            $is_pantangan=='on'?1:0,
            $kode_shift,
            $jmljamkerja,
            $jam_kerja_1,
            $jam_kerja_2,
            $jam_kerja_3,
            $jam_kerja_4,
            $masuk,
            $keluar,
            $masuk_kembali,
            $pulang,
            $lembur_masuk,
            $lembur_keluar,
            $koreksi_by,
            $keterangan
        );
//        echo 'test';
//        return;
        $data = MYModel::SP_execData('sp_koreksi_absensi', $param, true);


        return response($data, 200);
    }
    
//--------------approval---------------
    
    public function loadApproval(Request $request) {
        $start = $request->start ? $request->start : 0;
        $limit = $request->limit ? $request->limit : 0;
        $table = MYModel::getDBTable('v_koreksi_absensi_approval');
        $totalrec=$table->count();
        $table->offset($start);
        $table->limit($limit);
        $query = $table->get();

        return json_encode([
                    'success' => true,
                    'data' => $query,
                    'record' => $totalrec
                ]);
    }
    
    public function executeApproval(Request $request) {
        $opt = $request->opt ? $request->opt : null;
        $postdata=$request->postdata?json_decode($request->postdata):array();
        $approval_by = $request->session()->get('userid');
        $param = array(
            $opt,
            $postdata->koreksi_id,
            $postdata->nik,            
            $postdata->tgl,
            $approval_by
        );
        $data = MYModel::SP_execData('sp_koreksi_absensi_approval', $param, true);


        return response($data, 200);
    }

}
