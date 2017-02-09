Ext.define('Penggajian.store.hitunggaji.PerhitunganPendapatan', {
    extend: 'Ext.data.Store',
    storeId:'storehitpendapatan',
    //    autoLoad:true,
    proxy: {
        type: 'ajax',        
        url: Penggajian.Global.getApiUrl()+'hitpendapatan/load',
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