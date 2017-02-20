<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

//Route::get('/', function () {
//    return view('main');
//});

Route::get('/', 'MainController@index');
Route::get('/login', function () {
    return view('login');
});
Route::post('/auth/login','AuthController@login');
Route::post('/auth/logout','AuthController@logout');

Route::get('/main/getMainMenu','MainController@getMainMenu');
Route::get('/main/getAccordionMenu','MainController@getAccordionMenu');
Route::get('/main/getMenuHeadJson','MainController@getMenuHeadJson');

Route::get('/jabatan/load','JabatanController@index');
Route::get('/jabatan/loadnew','JabatanController@indexNew');
Route::get('/jabatan/loadcombo','JabatanController@indexCombo');
Route::get('/jabatan/loadkomponen','JabatanController@getKomponen');
Route::get('/jabatan/loadkomponenInput','JabatanController@getKomponenInputLoad');
Route::post('/jabatan/setInput','JabatanController@setJabatanInput');
Route::post('/jabatan/deleteRow','JabatanController@deleteRow');
Route::post('/jabatan/update','JabatanController@updateJabatan');

Route::get('/pendapatan/load','PendapatanController@index');
Route::post('/pendapatan/executeRow','PendapatanController@executeRow');
Route::post('/pendapatan/deleteRow','PendapatanController@deleteRow');

Route::get('/pendapatan/loadcombo','PendapatanController@indexCombo');

Route::get('/potongan/load','PotonganController@index');
Route::post('/potongan/executeRow','PotonganController@executeRow');
Route::post('/potongan/deleteRow','PotonganController@deleteRow');

Route::get('/shift/load','ShiftController@index');
Route::post('/shift/executeRow','ShiftController@executeRow');
Route::post('/shift/deleteRow','ShiftController@deleteRow');

Route::get('/periode/load','PeriodeController@index');
Route::post('/periode/executeRow','PeriodeController@executeRow');
Route::post('/periode/deleteRow','PeriodeController@deleteRow');

Route::get('/pegawai/load','PegawaiController@index');
Route::get('/pegawai/loadpendapatan','PegawaiController@loadPendapatan');
Route::get('/pegawai/loadpendapatanedit','PegawaiController@loadPendapatanEdit');


Route::post('/pegawai/executeRow','PegawaiController@executeRow');
Route::post('/pegawai/deleteRow','PegawaiController@deleteRow');
Route::post('/pegawai/uploadImage','PegawaiController@uploadImage');
Route::get('/pegawai/getImage','PegawaiController@getImage');
Route::post('/pegawai/deletePendapatan','PegawaiController@deletePendapatan');
Route::post('/pegawai/savePendapatan','PegawaiController@savePendapatan');

Route::post('/pegawai/postFinger','PegawaiController@postFinger');
Route::post('/pegawai/deleteFinger','PegawaiController@deleteFinger');

Route::get('/pegawai/loadjadwal','PegawaiController@loadJadwal');
Route::post('/pegawai/deletejadwal','PegawaiController@deleteJadwal');
Route::post('/pegawai/savejadwal','PegawaiController@saveJadwal');
Route::get('/shift/loadpegawai','ShiftController@loadpegawai');
Route::get('/shift/loadcombo','ShiftController@loadcombo');


Route::get('/pegawai/getpegawaitwin','PegawaiController@getPegawaiTwin');
Route::get('/pegawai/getpegawaitwinjabatan','PegawaiController@getPegawaiTwinByjabatan');

Route::get('/rumuspendapatan/load','RumusPendapatanController@index');
Route::post('/rumuspendapatan/save','RumusPendapatanController@executeRows');
Route::get('/rumuspotongan/load','RumusPotonganController@index');
Route::post('/rumuspotongan/save','RumusPotonganController@executeRows');

Route::get('/rumusthr/load','RumusTHRController@index');
Route::post('/rumusthr/save','RumusTHRController@executeRows');
Route::get('/rumusthr/loadpendapatan','RumusTHRController@loadPendapatan');
Route::post('/rumusthr/deletePendapatan','RumusTHRController@deletePendapatan');
Route::post('/rumusthr/deleteMasaKerja','RumusTHRController@deleteMasaKerja');


Route::get('/rumuslembur/loadpembagi','RumusLemburController@loadPembagi');
Route::get('/rumuslembur/loadpengali','RumusLemburController@loadPengali');
Route::get('/rumuslembur/loadpendapatan','RumusLemburController@loadPendapatan');
Route::post('/rumuslembur/save','RumusLemburController@executeRows');
Route::post('/rumuslembur/deletePendapatan','RumusLemburController@deletePendapatan');
Route::post('/rumuslembur/deletePengali','RumusLemburController@deletePengali');

Route::get('/rumusinsentifhadir/load','RumusInsentifHadirController@index');
Route::get('/rumusinsentifhadir/jenisharikerja','RumusInsentifHadirController@jenisharikerja');
Route::post('/rumusinsentifhadir/executeRow','RumusInsentifHadirController@executeRow');
Route::post('/rumusinsentifhadir/delete','RumusInsentifHadirController@delete');

Route::get('/rumusketerlambatan/loadpembagi','RumusKeterlambatanController@loadPembagi');

Route::get('/rumusketerlambatan/jenisharikerja','RumusKeterlambatanController@jenisHariKerja');
Route::get('/rumusketerlambatan/loadpengali','RumusKeterlambatanController@loadPengali');
Route::get('/rumusketerlambatan/loadpendapatan','RumusKeterlambatanController@loadPendapatan');
//Route::get('/rumusketerlambatan/postpotongan','RumusKeterlambatanController@loadPostPotongan');
Route::post('/rumusketerlambatan/save','RumusKeterlambatanController@executeRows');
Route::post('/rumusketerlambatan/deletePendapatan','RumusKeterlambatanController@deletePendapatan');
Route::post('/rumusketerlambatan/deletePengali','RumusKeterlambatanController@deletePengali');

Route::get('/rumusdendaabsensi/combopotongan','RumusDendaAbsensiController@comboPotongan');
Route::get('/rumusdendaabsensi/loadpendapatan','RumusDendaAbsensiController@loadPendapatan');
Route::get('/rumusdendaabsensi/loadpengali','RumusDendaAbsensiController@loadPengali');
Route::get('/rumusdendaabsensi/loaddenda','RumusDendaAbsensiController@loadDenda');
Route::get('/rumusdendaabsensi/jenisharikerja','RumusDendaAbsensiController@jenisHariKerja');
Route::post('/rumusdendaabsensi/deletependapatan','RumusDendaAbsensiController@deletePendapatan');
Route::post('/rumusdendaabsensi/deletepengali','RumusDendaAbsensiController@deletePengali');
Route::post('/rumusdendaabsensi/deletedenda','RumusDendaAbsensiController@deleteDenda');
Route::post('/rumusdendaabsensi/executeRow','RumusDendaAbsensiController@executeRow');



Route::get('/referensi/agama','ReferensiController@getAgama');
Route::get('/referensi/golongandarah','ReferensiController@getGolonganDarah');
Route::get('/referensi/statuskerja','ReferensiController@getStatusKerja');
Route::get('/referensi/pendidikan','ReferensiController@getPendidikan');
Route::get('/referensi/statuspajak','ReferensiController@getStatusPajak');
Route::get('/referensi/propinsi','ReferensiController@getPropinsi');
Route::get('/referensi/kabupaten','ReferensiController@getKabupaten');
Route::get('/referensi/kecamatan','ReferensiController@getKecamatan');
Route::get('/referensi/kelurahan','ReferensiController@getKelurahan');
Route::get('/referensi/tipepinjaman','ReferensiController@getTipePinjaman');
Route::get('/referensi/thrpembagi','ReferensiController@getThrPembagi');
Route::get('/referensi/refrumus','ReferensiController@getRefRumus');
Route::get('/referensi/periode','PeriodeController@refPeriodeByThbl');


Route::get('/pinjaman/load','PinjamanController@index');
Route::post('/pinjaman/executeRow','PinjamanController@executeRow');
Route::post('/pinjaman/deleteRow','PinjamanController@deleteRow');
Route::get('/pinjaman/getnomor','PinjamanController@getNoPinjaman');
Route::get('/pinjaman/loadAngsuran','PinjamanController@getAngsuran');

Route::get('/adminpanel/rolemaster','AdminPanelController@roleMaster');
Route::get('/adminpanel/roledetail','AdminPanelController@roleDetail');
Route::get('/adminpanel/roledetailall','AdminPanelController@roleDetailAll');
Route::post('/adminpanel/saverole','AdminPanelController@saveRole');
Route::post('/adminpanel/deleterole','AdminPanelController@deleteRole');


Route::get('/adminpanel/loaduser','AdminPanelController@loadUser');
Route::post('/adminpanel/saveuser','AdminPanelController@saveUser');
Route::post('/adminpanel/deleteuser','AdminPanelController@deleteUser');
Route::post('/adminpanel/aktifuser','AdminPanelController@aktifUser');
Route::post('/adminpanel/resetpassword','AdminPanelController@resetPassword');
Route::post('/adminpanel/updatepassword','AdminPanelController@updatePassword');


Route::get('/jadwal/load','JadwalController@index');
Route::get('/jadwal/loadinputjadwal','JadwalController@loadInput');
Route::post('/jadwal/savejadwal','JadwalController@saveJadwal');
Route::post('/jadwal/deletejadwal','JadwalController@deleteJadwal');

Route::get('/tukaroff/loadjadwalpegawai','JadwalController@loadJadwalPegawai');
Route::get('/tukaroff/load','JadwalController@indexTukarOff');
Route::post('/tukaroff/executeRow','JadwalController@executeRowTukaroff');
Route::post('/tukaroff/delete','JadwalController@deleteTukaroff');

//Route::resource('/ijin', 'IjinController');
Route::get('/ijin/kategoriabsen', 'IjinController@getKategoriAbsen');
Route::get('/ijin/load', 'IjinController@index');
Route::post('/ijin/executeRow', 'IjinController@executeRow');
Route::post('/ijin/delete', 'IjinController@delete');


Route::get('/cuti/kategoriabsen', 'CutiController@getKategoriAbsen');
Route::get('/cuti/sisacuti', 'CutiController@getSisaCuti');
Route::get('/cuti/load', 'CutiController@index');
Route::post('/cuti/executeRow', 'CutiController@executeRow');
Route::post('/cuti/delete', 'CutiController@delete');


Route::get('/libur/load', 'HariLiburController@index');
Route::post('/libur/save', 'HariLiburController@save');
Route::post('/libur/delete', 'HariLiburController@deleteRow');

Route::get('/ketentuan/load', 'KetentuanController@index');
Route::get('/ketentuan/pantangan', 'KetentuanController@indexPantangan');
Route::post('/ketentuan/save', 'KetentuanController@save');
Route::post('/ketentuan/deletePantangan', 'KetentuanController@deletePantangan');

Route::get('/posting/pendapatan', 'PostingController@loadPendapatan');
Route::get('/posting/potongan', 'PostingController@loadPotongan');
Route::get('/posting/jenis', 'PostingController@loadJenis');
Route::post('/posting/savependapatan', 'PostingController@savePendapatan');
Route::post('/posting/deletependapatan', 'PostingController@deletePendapatan');
Route::post('/posting/savepotongan', 'PostingController@savePotongan');
Route::post('/posting/deletepotongan', 'PostingController@deletePotongan');





Route::get('/absensi/load', 'AbsensiController@index');
Route::get('/absensi/getlogmesin', 'AbsensiController@getLogMesin');
Route::post('/absensi/clearlogmesin', 'AbsensiController@clearLogMesin');
Route::post('/absensi/delete', 'AbsensiController@deleteLogAbsen');


Route::get('/mesin/getlogmesin', 'MesinController@GetAttLogView');


Route::get('/mesin/getuserinfo', 'MesinController@GetUserInfo');
Route::get('/mesin/setuserinfo', 'MesinController@SetUserInfo');


Route::get('/hitungketerlambatan/load','HitungKeterlambatanController@index');
Route::post('/hitungketerlambatan/executeRow','HitungKeterlambatanController@executeRow');

Route::get('/hitunglembur/load','HitungLemburController@index');
Route::post('/hitunglembur/executeRow','HitungLemburController@executeRow');

Route::get('/hitinsentifhadir/load','HitungInsentifHadirController@index');
Route::post('/hitinsentifhadir/executeRow','HitungInsentifHadirController@executeRow');

Route::get('/hitdenda/load','HitungDendaController@index');
Route::post('/hitdenda/executeRow','HitungDendaController@executeRow');

Route::get('/hitpotongan/load','GajiPotonganController@index');
Route::post('/hitpotongan/executeRow','GajiPotonganController@executeRow');

Route::get('/hitpendapatan/load','GajiPendapatanController@index');
Route::post('/hitpendapatan/executeRow','GajiPendapatanController@executeRow');

Route::get('/rekapgaji/load','GajiController@index');
Route::get('/rekapgaji/toexcel','GajiController@exportToExcel');
Route::get('/rekapgaji/loadAll','GajiController@loadAll');


Route::get('/koreksiabsensi/load','KoreksiAbsensiController@index');
Route::get('/koreksiabsensi/historyload','KoreksiAbsensiController@historyLoad');
Route::get('/koreksiabsensi/loadjadwalpegawai','KoreksiAbsensiController@loadJadwalPegawai');
Route::get('/koreksiabsensi/loadapproval','KoreksiAbsensiController@loadApproval');

Route::post('/koreksiabsensi/executeRow','KoreksiAbsensiController@executeRow');
Route::post('/koreksiabsensi/executeApproval','KoreksiAbsensiController@executeApproval');

Route::get('/periodethr/load','PeriodeThrController@index');
Route::post('/periodethr/executeRow','PeriodeThrController@executeRow');


Route::get('/validasimasakerja/load','ValidasiMasaKerjaController@index');
Route::get('/validasimasakerja/loadperiodethr','ValidasiMasaKerjaController@periodeThrLoad');

Route::post('/validasimasakerja/executeRow','ValidasiMasaKerjaController@executeRow');
Route::post('/validasimasakerja/updateRow','ValidasiMasaKerjaController@updateRow');
Route::post('/validasimasakerja/deleteRow','ValidasiMasaKerjaController@deleteRow');


Route::get('/hitungthr/load','HitungThrController@index');
Route::post('/hitungthr/executeRow','HitungThrController@executeRow');

Route::get('/approvalthr/load','ApprovalThrController@index');
Route::post('/approvalthr/executeRow','ApprovalThrController@executeRow');

Route::get('/koreksigaji/load','KoreksiGajiController@index');
Route::get('/koreksigaji/pendapatanLoad','KoreksiGajiController@pendapatanLoad');
Route::get('/koreksigaji/potonganLoad','KoreksiGajiController@potonganLoad');
Route::post('/koreksigaji/executeRow','KoreksiGajiController@executeRow');

Route::get('/approvalgaji/load','ApprovalGajiController@index');
Route::post('/approvalgaji/executeRow','ApprovalGajiController@executeRow');

Route::get('/paymentthr/load','PembayaranThrController@index');
Route::get('/paymentthr/loadreport','PembayaranThrController@loadreport');
Route::post('/paymentthr/executeRow','PembayaranThrController@executeRow');

Route::get('/lapterlambat/load','RepKeterlambatanController@index');
Route::get('/lapterlambat/loadreport','RepKeterlambatanController@loadReport');

Route::get('/hutangpegawai/load', 'HutangPegawaiController@index');
Route::get('/hutangpegawai/loadAngsuran', 'HutangPegawaiController@getAngsuran');
Route::get('/hutangpegawai/loadreport', 'HutangPegawaiController@loadreport');
Route::get('/hutangpegawai/loadreportangsuran', 'HutangPegawaiController@loadreportangsuran');


Route::get('/slipgaji/load', 'SlipGajiController@index');
Route::get('/slipgaji/loadsetcolumn', 'SlipGajiController@indexSetColumn');

Route::get('/slipgaji/loadreport', 'SlipGajiController@loadreport');

Route::get('/slipthr/load', 'SlipThrController@index');
Route::get('/slipthr/loadreport', 'SlipThrController@loadreport');