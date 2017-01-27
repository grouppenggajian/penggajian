Ext.define('Penggajian.store.pegawai.PegawaiJadwal', {
    extend: 'Ext.data.Store',
    storeId:'storepegawaijadwal',
    requires:[
        'Ext.ux.DataFieldTime'
    ],
    //    autoLoad:true,
    proxy: {
        type: 'ajax',        
        url: Penggajian.Global.getApiUrl()+'pegawai/loadjadwal',
        reader: {
            type: 'json',
            
            rootProperty    : 'data',
            totalProperty   : 'record'
        }
    }
    ,
    fields: [
        {name:'nik'},
        {name:'nama'},
        {name:'kode_jabatan'},        
        {name:'nama_jabatan'},
        {name:'tanggal'},
        {name:'hari'},
        {name:'kode_shift'},
        {
        name: 'jam_kerja_1',type: 'time'
 
    },

    {
        name: 'jam_kerja_2', type:'time'
    },

    {
        name: 'jam_kerja_3', type:'time'
    },

    {
        name: 'jam_kerja_4', type:'time'
    }
    ]
})