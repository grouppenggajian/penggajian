Ext.define('Penggajian.store.referensi.ImageStore', {
    extend: 'Ext.data.Store',
    storeId:'storeimage',
//    model:'Penggajian.model.KabupatenModel',
//    autoLoad:true,
    proxy: {
        type: 'ajax',        
        url: Penggajian.Global.getApiUrl()+'pegawai/getImage',
        reader: {
            type: 'json',
            
                    rootProperty    : 'data'
        }
    }
    ,
     fields: [
               
        {name: 'caption'},
        {name: 'src'}      
      
    ]
    
});

