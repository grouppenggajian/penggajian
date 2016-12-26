Ext.define('Penggajian.store.rumus.RmsPendapatan', {
    extend: 'Ext.data.Store',
    storeId:'storerumuspendapatan',
    id:'storerumuspendapatan_id',
    //    autoLoad:true,
    proxy: {
        type: 'ajax',        
        url: Penggajian.Global.getApiUrl()+'rumuspendapatan/load',
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