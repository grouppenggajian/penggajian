Ext.define('Penggajian.store.referensi.Kecamatan', {
    extend: 'Ext.data.Store',
    storeId:'storekecamatan',
//    autoLoad:true,
    proxy: {
        type: 'ajax',        
        url: Penggajian.Global.getApiUrl()+'referensi/kecamatan',
        reader: {
            type: 'json',
            
                    rootProperty    : 'data'
        }
    }
    ,
     fields: [
               
        { name: 'rkc_kode'  },
        { name: 'rkc_nama'},
        { name: 'rko_kode'  }
      
    ]
    
});

