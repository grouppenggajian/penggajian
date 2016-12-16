Ext.define('Penggajian.store.referensi.Agama', {
    extend: 'Ext.data.Store',
    storeId:'storeagama',
//    autoLoad:true,
    proxy: {
        type: 'ajax',        
        url: Penggajian.Global.getApiUrl()+'referensi/agama',
        reader: {
            type: 'json',
            
                    rootProperty    : 'data'
        }
    }
    ,
     fields: [
               
        { name: 'ag_id'  },
        { name: 'ag_name'}
      
    ]
    
});

//Ext.create('app.store.department');
