Ext.define('Penggajian.store.pegawai.PegawaiTwinJabatan', {
    extend: 'Ext.data.Store',
    storeId:'storepegawaitwinjabatan',
    //    autoLoad:true,
    proxy: {
        type: 'ajax',        
        url: Penggajian.Global.getApiUrl()+'pegawai/getpegawaitwinjabatan',
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

