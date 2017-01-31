Ext.define('Penggajian.store.hitungabsen.HitungLembur', {
    extend: 'Ext.data.Store',
    storeId:'storehitunglembur',
    requires:[
        'Ext.ux.DataFieldTime'
    ],
    proxy: {
        type: 'ajax',        
        url: Penggajian.Global.getApiUrl()+'hitunglembur/load',
        reader: {
            type: 'json',
            
            rootProperty    : 'data',
            totalProperty   : 'record'
        }
    }
    ,
    fields: [               
        {name:'pin'},
        {name:'nik'},
        {name:'nama'},
        {name:'jabatan'},
        {name:'tgl'},
        {name:'hari'},
        {name:'thbl'},
        {name:'kode_shift'},
        {name:'status_hari'},        
        {name:'lembur_masuk', type:'time'},
        {name:'lembur_keluar', type:'time'},
        {name:'jmljamlembur'},
        {name:'tarif_lembur'},
        {name:'nilai_lembur'},


    ]
    
});

//Ext.create('app.store.department');