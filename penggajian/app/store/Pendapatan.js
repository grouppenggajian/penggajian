Ext.define('Penggajian.store.Pendapatan', {
    extend: 'Ext.data.Store',
    storeId:'storependapatan',
    //    autoLoad:true,
    proxy: {
        type: 'ajax',        
        url: Penggajian.Global.getApiUrl()+'pendapatan/load',
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
    },

    {
        name: 'posting'
    }
    ,
    {
        name: 'showjabatan'
    }
        
        
      
    ]
    
});

//Ext.create('app.store.department');