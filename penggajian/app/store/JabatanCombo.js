Ext.define('Penggajian.store.JabatanCombo', {
    extend: 'Ext.data.Store',
    storeId:'storejabatancombo',
    //    autoLoad:true,
    proxy: {
        type: 'ajax',        
        url: Penggajian.Global.getApiUrl()+'jabatan/loadcombo',
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