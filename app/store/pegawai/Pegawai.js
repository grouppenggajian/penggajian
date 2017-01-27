Ext.define('Penggajian.store.pegawai.Pegawai', {
    extend: 'Ext.data.Store',
    storeId:'storepegawai',
    //    autoLoad:true,
    proxy: {
        type: 'ajax',        
        url: Penggajian.Global.getApiUrl()+'pegawai/load',
        reader: {
            type: 'json',
            
            rootProperty    : 'data',
            totalProperty   : 'record'
        }
    }
    ,
    fields: [
               
    {
        name:	'nik'
    },{
        name:	'pin'
    },{
        name:	'post_finger',type:'bool'
    },
{
        name:	'nama'
    },
{
        name:	'nama_panggilan'
    },
{
        name:	'tgl_masuk'
    },
{
        name:	'jabatan'
    },
{
        name:	'status_kerja'
    },
{
        name:	'no_ktp'
    },
{
        name:	'tgl_ktp'
    },
{
        name:	'alamat'
    },
{
        name:	'propinsi'
    },
{
        name:	'kabupaten'
    },
{
        name:	'kecamatan'
    },
{
        name:	'kelurahan'
    },
{
        name:	'telp'
    },
{
        name:	'hp'
    },
{
        name:	'tempat_lahir'
    },
{
        name:	'tgl_lahir'
    },
{
        name:	'jns_kelamin'
    },
{
        name:	'gol_darah'
    },
{
        name:	'agama'
    },
{
        name:	'pendidikan'
    },
{
        name:	'status_kawin'
    },
{
        name:	'status_pajak'
    },
{
        name:	'libur_perminggu'
    },
{
        name:	'status_pegawai'
    },
{
        name:	'tgl_keluar'
    },
{
        name:	'photo'
    },

        
      
    ]
    
});

//Ext.create('app.store.department');
// nik
// nama
// alamat
// kelurahan
// nama_panggilan
// tgl_masuk
// jabatan
// no_ktp
// tgl_ktp
// tempat_lahir
// jns_kelamin
// tgl_lahir
// agama
// pendidikan
// status_kerja
// status_kawin
// telp
// hp
// libur_perminggu
// is_keluar
// tgl_keluar
// gol_darah