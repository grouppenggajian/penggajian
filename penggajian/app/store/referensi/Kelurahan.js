Ext.define('Penggajian.store.referensi.Kelurahan', {
    extend: 'Ext.data.Store',
    storeId:'storekelurahan',
//    autoLoad:true,
    proxy: {
        type: 'ajax',        
        url: Penggajian.Global.getApiUrl()+'referensi/kelurahan',
        reader: {
            type: 'json',
            
                    rootProperty    : 'data'
        }
    }
    ,
     fields: [
               
        { name: 'rkl_kode'  },
        { name: 'rkl_nama'},
        { name: 'rkc_kode'  }
      
    ]
    
});

