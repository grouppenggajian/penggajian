Ext.define('Penggajian.store.Potongan', {
    extend: 'Ext.data.Store',
    storeId:'storepotongan',
    //    autoLoad:true,
    proxy: {
        type: 'ajax',        
        url: Penggajian.Global.getApiUrl()+'potongan/load',
        reader: {
            type: 'json',
            
            rootProperty    : 'data',
            totalProperty   : 'record'
        }
    }
    ,
    fields: [
               
    {
        name: 'kode'
    },
    {
        name: 'keterangan'
    }  
        
      
    ]
    
});

//Ext.create('app.store.department');