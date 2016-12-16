Ext.define('Penggajian.store.pegawai.PegawaiPendapatanEdit', {
    extend: 'Ext.data.Store',
    storeId:'storepegawaipendapatanedit',
    //    autoLoad:true,
    proxy: {
        type: 'ajax',        
        url: Penggajian.Global.getApiUrl()+'pegawai/loadpendapatanedit',
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
        {name:'kode'},
        {name:'keterangan'},
        {name:'batas'},
        {name:'batas_min'},
        {name:'batas_max'},
        {name:'nilai'}
    ]
})