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

Route::get('/hutangpegawai/load', 'HutangPegawaiController@index');



