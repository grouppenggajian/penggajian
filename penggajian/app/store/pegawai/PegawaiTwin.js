Ext.define('Penggajian.store.pegawai.PegawaiTwin', {
    extend: 'Ext.data.Store',
    storeId:'storepegawaitwin',
    //    autoLoad:true,
    proxy: {
        type: 'ajax',        
        url: Penggajian.Global.getApiUrl()+'pegawai/getpegawaitwin',
        reader: {
            type: 'json',
            
            rootProperty    : 'data',
            totalProperty   : 'record'
        }
    }
    ,
    fields: [
               
    {
        name:	'nik'
    },
    {
        name:	'nama'
    },

    {
        name:	'jabatan'
    },
    {
        name:	'nama_jabatan'
    }
      
    ]
    
});

