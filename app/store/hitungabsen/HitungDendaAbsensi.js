Ext.define('Penggajian.store.hitungabsen.HitungDendaAbsensi', {
    extend: 'Ext.data.Store',
    storeId:'storehitungdenda',
//    requires:[
//        'Ext.ux.DataFieldTime'
//    ],
    proxy: {
        type: 'ajax',        
        url: Penggajian.Global.getApiUrl()+'hitdenda/load',
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
        {name:'tgl_ijin'},
        {name:'kategori_ijin'},
        {name:'keterangan_ijin'},
        {name:'lama_ijin'},
        {name:'keterangan'},
        {name:'kode_potongan'},
        {name:'posting'},
        {name:'nilai_denda'}

    ]
    
});

//Ext.create('app.store.department');