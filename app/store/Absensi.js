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
        {name:'nik'},
        {name:'nama'},
        {name:'nama_jabatan'},
        {name:'tanggal'},
        {name:'hari'},
        {name:'jam',type: 'time'},
        {name:'date_time'},
        {name:'verified'},
        {name:'status'},
        {name:'status_absen'}
    ]
    
});

//Ext.create('app.store.department');