Ext.define('Penggajian.store.referensi.StatusPajak', {
    extend: 'Ext.data.Store',
    storeId:'storestatuspajak',
//    autoLoad:true,
    proxy: {
        type: 'ajax',        
        url: Penggajian.Global.getApiUrl()+'referensi/statuspajak',
        reader: {
            type: 'json',
            
                    rootProperty    : 'data'
        }
    }
    ,
     fields: [
               
        { name: 'id'  },
        { name: 'name'}
      
    ]
    
});