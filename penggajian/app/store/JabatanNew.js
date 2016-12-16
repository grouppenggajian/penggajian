Ext.define('Penggajian.store.JabatanNew', {
    extend: 'Ext.data.Store',
    storeId:'storejabatannew',
//        autoSync:true,
    proxy: {
        type: 'ajax',        
        url: Penggajian.Global.getApiUrl()+'jabatan/loadnew',
        reader: {
            type: 'json',
            
            rootProperty    : 'data',
            totalProperty   : 'record'
        },writer: {
                type: 'json',
                writeAllFields  : true,
                                    rootProperty            : 'data'
            }
    }
    ,
    fields: [
               
    {
        name: 'kode_jabatan'
    },
    {
        name: 'nama jabatan'
    }
        
        
      
    ]
    
});

//Ext.create('app.store.department');