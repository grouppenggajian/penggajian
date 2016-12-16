Ext.define('Penggajian.store.Jabatan', {
    extend: 'Ext.data.Store',
    storeId:'storejabatan',
    //    autoLoad:true,
    proxy: {
        type: 'ajax',        
        url: Penggajian.Global.getApiUrl()+'jabatan/load',
        reader: {
            type: 'json',
            
            rootProperty    : 'data',
            totalProperty   : 'record'
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