Ext.define('Penggajian.store.jadwal.Jadwal', {
    extend: 'Ext.data.Store',
    storeId:'storejadwal',
    requires:[
        'Ext.ux.DataFieldTime'
    ],
//        autoSync:true,
    proxy: {
        type: 'ajax',        
        url: Penggajian.Global.getApiUrl()+'jadwal/load',
        reader: {
            type: 'json',
            
            rootProperty    : 'data',
            totalProperty   : 'record'
        }
    }
    ,groupField: 'kode_jabatan_group'
    ,
    fields: [
      {name:'nik'},
      {name:'nama'},
        {name:'kode_jabatan'},{name:'nama_jabatan'},{name:'kode_jabatan_group'},
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
    
});

//Ext.create('app.store.department');