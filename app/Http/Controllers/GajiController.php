<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\MYModel;

use Excel;
class GajiController extends Controller {

    public function index(Request $request) {
        $start = $request->start ? $request->start : 0;
        $limit = $request->limit ? $request->limit : 100;
        $periode = MYModel::getRowsTable([], 'v_periodegaji_aktif', []);
        $thbl = $request->thbl ? $request->thbl : $periode[0]->thbl;
        $query = $request->searchvalue ? $request->searchvalue : NULL;

        $sqlsearch = '';
//        $sqlsearch=array('where'=>array(['deleted', '=', '0']));
        if ($query) {
            $sqlsearch = ' and (nik LIKE "%' . $query . '%" or nama LIKE "%' . $query . '%" or jabatan LIKE "%' . $query . '%" or get_nama_jabatan(jabatan) LIKE "%' . $query . '%" )';
        }
//        return $sqlsearch;
        $orderby = '';
        $dataall = MYModel::SP_getData('sp_gaji_rekap', array('countdata', $thbl, $sqlsearch, $orderby, ''));
        $vlimit = "limit $start,$limit";


        $data = MYModel::SP_getData('sp_gaji_rekap', array('loaddata', $thbl, $sqlsearch, $orderby, $vlimit));
        return json_encode([
                    'success' => true,
                    'data' => $data,
                    'record' => $dataall[0]->retval
                ]);
    }
    public function loadAll(Request $request) {
        $start = $request->start ? $request->start : 0;
        $limit = $request->limit ? $request->limit : 100;
        $periode = MYModel::getRowsTable([], 'v_periodegaji_aktif', []);
        $thbl = $request->thbl ? $request->thbl : $periode[0]->thbl;
        $query = $request->searchvalue ? $request->searchvalue : '';

        $sqlsearch = '';
//        $sqlsearch=array('where'=>array(['deleted', '=', '0']));
        if ($query) {
            $sqlsearch = ' and (nik LIKE "%' . $query . '%" or nama LIKE "%' . $query . '%" or jabatan LIKE "%' . $query . '%" or get_nama_jabatan(jabatan) LIKE "%' . $query . '%" )';
        }
//        return $sqlsearch;
        $orderby = '';
        $dataall = MYModel::SP_getData('sp_gaji_rekap', array('countdata', $thbl, $sqlsearch, $orderby, ''));
        $vlimit = "";


        $data = MYModel::SP_getData('sp_gaji_rekap', array('loaddata', $thbl, $sqlsearch, $orderby, $vlimit));
        return json_encode([
                    'success' => true,
                    'data' => $data,
                    'record' => $dataall[0]->retval
                ]);
    }

    public function exportToExcel(Request $request) {

//        $data = Jabatan::get()->toArray();
//       return Excel::create('datasiswa', function($excel)use($data) {
//
//                    $excel->sheet('siswa', function($sheet)use($data) {
//
//                                $sheet->fromArray($data);
//                            });
//                })->download('csv');
    }

}
