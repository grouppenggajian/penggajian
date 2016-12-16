Ext.define('Penggajian.store.referensi.TipePinjaman', {
    extend: 'Ext.data.Store',
    storeId:'storetipepinjaman',
//    autoLoad:true,
    proxy: {
        type: 'ajax',        
        url: Penggajian.Global.getApiUrl()+'referensi/tipepinjaman',
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