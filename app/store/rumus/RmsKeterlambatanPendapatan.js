Ext.define('Penggajian.store.rumus.RmsKeterlambatanPendapatan', {
    extend: 'Ext.data.Store',
    storeId:'storerumusketerlambatanpendapatan',    
    //    autoLoad:true,
    proxy: {
        type: 'ajax',        
        url: Penggajian.Global.getApiUrl()+'rumusketerlambatan/loadpendapatan',
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