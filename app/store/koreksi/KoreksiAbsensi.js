Ext.define('Penggajian.store.koreksi.KoreksiAbsensi', {
    extend: 'Ext.data.Store',
    storeId:'storekoreksiabsensi',
    requires:[
        'Ext.ux.DataFieldTime'
    ],
    proxy: {
        type: 'ajax',        
        url: Penggajian.Global.getApiUrl()+'koreksiabsensi/load',
        reader: {
            type: 'json',
            
            rootProperty    : 'data',
            totalProperty   : 'record'
        }
    }
    ,
    fields: [               
        {name:'tgl'},
        {name:'thbl'},
        {name:'koreksi_id'},
        {name:'x_koreksi'},
        {name:'nik'},
        {name:'nama'},       
        {name:'hari'},
        {name:'is_pantangan'},
        {name:'kode_shift'},        
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
        {name:'koreksi_by'},
        {name:'tglkoreksi'}

    ]
    
});

//Ext.create('app.store.department');