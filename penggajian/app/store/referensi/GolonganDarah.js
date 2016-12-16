Ext.define('Penggajian.store.referensi.GolonganDarah', {
    extend: 'Ext.data.Store',
    storeId:'storegolongandarah',
//    autoLoad:true,
    proxy: {
        type: 'ajax',        
        url: Penggajian.Global.getApiUrl()+'referensi/golongandarah',
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