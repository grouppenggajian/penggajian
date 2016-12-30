Ext.define('Penggajian.store.rumus.RmsTHR', {
    extend: 'Ext.data.Store',
    storeId:'storerumusthr',
    id:'storerumusthr_id',
    //    autoLoad:true,
    proxy: {
        type: 'ajax',        
        url: Penggajian.Global.getApiUrl()+'rumusthr/load',
        reader: {
            type: 'json',
            
            rootProperty    : 'data',
            totalProperty   : 'record'
        }
    }
    ,
    fields: [
               
    {
        name: 'id'
    },
    {
        name: 'kode'
    },
    {
        name: 'komponen'
    },
    {
        name: 'rowset'
    },
    {
        name: 'column_name'
    }
        
        
      
    ]
    
});

//Ext.create('app.store.department');