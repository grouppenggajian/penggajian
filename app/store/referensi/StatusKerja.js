Ext.define('Penggajian.store.referensi.StatusKerja', {
    extend: 'Ext.data.Store',
    storeId:'storestatuskerja',
//    autoLoad:true,
    proxy: {
        type: 'ajax',        
        url: Penggajian.Global.getApiUrl()+'referensi/statuskerja',
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