Ext.define('Penggajian.store.hitungabsen.HitungInsentifHadir', {
    extend: 'Ext.data.Store',
    storeId:'storehitunginsentifhadir',
//    requires:[
//        'Ext.ux.DataFieldTime'
//    ],
    proxy: {
        type: 'ajax',        
        url: Penggajian.Global.getApiUrl()+'hitinsentifhadir/load',
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
        {name:'jabatan'},
        {name:'thbl'},
        {name:'jadwal_masuk'},
        {name:'jadwal_off'},
        {name:'jumlah_absen'},
        {name:'jumlah_ijin'},
        {name:'kategori_ijin'},
        {name:'prosentase'},
        {name:'nilai_insentif'},
        {name:'insentif'}

    ]
    
});

//Ext.create('app.store.department');