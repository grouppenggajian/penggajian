Ext.define('Penggajian.store.pegawai.PegawaiJadwal', {
    extend: 'Ext.data.Store',
    storeId:'storepegawaijadwal',
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
        {name:'kode_jabatan'},
        {name:'senin'},
        {name:'selasa'},
        {name:'rabu'},
        {name:'kamis'},
        {name:'jumat'},
        {name:'sabtu'},
        {name:'minggu'}
    ]
})