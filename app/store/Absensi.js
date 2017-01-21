Ext.define('Penggajian.store.Absensi', {
    extend: 'Ext.data.Store',
    storeId:'storeabsensi',
    requires:[
        'Ext.ux.DataFieldTime'
    ],
    proxy: {
        type: 'ajax',        
        url: Penggajian.Global.getApiUrl()+'absensi/load',
        reader: {
            type: 'json',
            
            rootProperty    : 'data',
            totalProperty   : 'record'
        }
    }
    ,
    fields: [               
        {name:'id'},
        {name:'pin'},
        {name:'nik'},
        {name:'nama'},
        {name:'jabatan'},
        {name:'tgl'},
        {name:'hari'},
        {name:'is_pantangan'},
        {name:'kode_shift'},
        {name:'jmlhari'},
        {name:'jmljamkerja'},
        {name:'jam_kerja_1',type: 'time'},
        {name:'jam_kerja_2',type: 'time'},
        {name:'jam_kerja_3',type: 'time'},
        {name:'jam_kerja_4',type: 'time'},
        {name:'masuk',type: 'time'},
        {name:'keluar',type: 'time'},
        {name:'masuk_kembali',type: 'time'},
        {name:'pulang',type: 'time'},
        {name:'lembur_masuk',type: 'time'},
        {name:'lembur_keluar',type: 'time'},
        {name:'jmljamabsen'},
        {name:'jmljamlembur'},
        {name:'update_date'}
    ]
    
});

//Ext.create('app.store.department');