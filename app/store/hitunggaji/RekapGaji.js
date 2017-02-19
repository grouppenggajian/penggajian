Ext.define('Penggajian.store.hitunggaji.RekapGaji', {
    extend: 'Ext.data.Store',
    storeId:'storerekapgaji',
    //    autoLoad:true,
    proxy: {
        type: 'ajax',        
        url: Penggajian.Global.getApiUrl()+'rekapgaji/load',
        reader: {
            type: 'json',
            
            rootProperty    : 'data',
            totalProperty   : 'record'
        }
    }
    ,
    fields: [
               
    {
        name: 'nik'
    },
    {
        name: 'nama'
    }
     ,
    {
        name: 'jabatan'
    }   
        
      
    ]
    
});

//Ext.create('app.store.department');