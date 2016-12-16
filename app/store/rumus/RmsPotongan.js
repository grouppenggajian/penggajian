Ext.define('Penggajian.store.rumus.RmsPotongan', {
    extend: 'Ext.data.Store',
    storeId:'storerumuspotongan',
    id:'storerumuspotongan_id',
    //    autoLoad:true,
    proxy: {
        type: 'ajax',        
        url: Penggajian.Global.getApiUrl()+'rumuspotongan/load',
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