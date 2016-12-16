Ext.define('Penggajian.store.jadwal.InputJadwal', {
    extend: 'Ext.data.Store',
    storeId:'storeinputjadwal',
    //    autoLoad:true,
    proxy: {
        type: 'ajax',        
        url: Penggajian.Global.getApiUrl()+'jadwal/loadinputjadwal',
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