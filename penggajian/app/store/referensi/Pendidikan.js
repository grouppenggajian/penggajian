Ext.define('Penggajian.store.referensi.Pendidikan', {
    extend: 'Ext.data.Store',
    storeId:'storependidikan',
//    autoLoad:true,
    proxy: {
        type: 'ajax',        
        url: Penggajian.Global.getApiUrl()+'referensi/pendidikan',
        reader: {
            type: 'json',
            
                    rootProperty    : 'data'
        }
    }
    ,
     fields: [
               
        { name: 'kode'  },
        { name: 'name'}
      
    ]
    
});