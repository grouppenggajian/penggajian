Ext.define('Penggajian.store.referensi.Kabupaten', {
    extend: 'Ext.data.Store',
    storeId:'storekabupaten',
//    model:'Penggajian.model.KabupatenModel',
//    autoLoad:true,
    proxy: {
        type: 'ajax',        
        url: Penggajian.Global.getApiUrl()+'referensi/kabupaten',
        reader: {
            type: 'json',
            
                    rootProperty    : 'data'
        }
    }
    ,
     fields: [
               
        { name: 'rko_kode'  },
        { name: 'rko_nama'},
        { name: 'rpr_kode'  }
      
    ]
    
});

