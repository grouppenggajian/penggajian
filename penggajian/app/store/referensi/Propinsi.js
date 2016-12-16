Ext.define('Penggajian.store.referensi.Propinsi', {
    extend: 'Ext.data.Store',
    storeId:'storepropinsi',
//    model:'Penggajian.model.PropinsiModel',    
//    autoLoad:true,
    proxy: {
        type: 'ajax',        
        url: Penggajian.Global.getApiUrl()+'referensi/propinsi',
        reader: {
            type: 'json',
            
                    rootProperty    : 'data'
        }
    }
    ,
     fields: [
               
        { name: 'rpr_kode'  },
        { name: 'rpr_nama'}
      
    ]
    
});

