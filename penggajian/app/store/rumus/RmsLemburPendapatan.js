Ext.define('Penggajian.store.rumus.RmsLemburPendapatan', {
    extend: 'Ext.data.Store',
    storeId:'storerumuslemburpendapatan',    
    //    autoLoad:true,
    proxy: {
        type: 'ajax',        
        url: Penggajian.Global.getApiUrl()+'rumuslembur/loadpendapatan',
        reader: {
            type: 'json',
            
            rootProperty    : 'data',
            totalProperty   : 'record'
        },writer: {
                type: 'json',
                writeAllFields  : true,
                                    rootProperty            : 'data'
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