Ext.define('Penggajian.store.hitungabsen.HitungKeterlambatan', {
    extend: 'Ext.data.Store',
    storeId:'storehitungketerlambatan',
//    requires:[
//        'Ext.ux.DataFieldTime'
//    ],
    proxy: {
        type: 'ajax',        
        url: Penggajian.Global.getApiUrl()+'hitungketerlambatan/load',
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
        {name:'is_pantangan'},
        {name:'terlambat_masuk'},
        {name:'keluar_awal'},
        {name:'terlambat_masukkembali'},
        {name:'pulang_awal'},
        {name:'potongan'},
        {name:'nilai_masuk'},
        {name:'nilai_keluar'},
        {name:'nilai_masukkembali'},
        {name:'nilai_pulang'},
        {name:'total'}

    ]
    
});

//Ext.create('app.store.department');