Ext.define('Penggajian.store.jadwal.TukarOff', {
    extend: 'Ext.data.Store',
    storeId:'storetukaroff',
//        autoSync:true,
    proxy: {
        type: 'ajax',        
        url: Penggajian.Global.getApiUrl()+'jadwal/tukaroff',
        reader: {
            type: 'json',
            
            rootProperty    : 'data',
            totalProperty   : 'record'
        }
    }
//    ,groupField: 'kode_jabatan_group'
    ,
    fields: [
      {name:'nik'},
      {name:'nama'}
//      ,
//        {name:'kode_jabatan'},{name:'nama_jabatan'},{name:'kode_jabatan_group'},
//        {name:'senin'},
//        {name:'selasa'},
//        {name:'rabu'},
//        {name:'kamis'},
//        {name:'jumat'},
//        {name:'sabtu'},
//        {name:'minggu'}
    ]
    
});

//Ext.create('app.store.department');