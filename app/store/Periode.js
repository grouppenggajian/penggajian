Ext.define('Penggajian.store.Periode', {
    extend: 'Ext.data.Store',
    storeId:'storeperiode',
    //    autoLoad:true,
    proxy: {
        type: 'ajax',        
        url: Penggajian.Global.getApiUrl()+'periode/load',
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
        name: 'tglawal'
    },

    {
        name: 'tglakhir'
    },
    {
        name: 'thnbln'
    },
    {
        name: 'aktif'
    }
        
      
    ]
    
});

//Ext.create('app.store.department');