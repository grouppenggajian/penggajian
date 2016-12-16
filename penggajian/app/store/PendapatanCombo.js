Ext.define('Penggajian.store.PendapatanCombo', {
    extend: 'Ext.data.Store',
    storeId:'storependapatancombo',
    //    autoLoad:true,
    proxy: {
        type: 'ajax',        
        url: Penggajian.Global.getApiUrl()+'pendapatan/loadcombo',
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