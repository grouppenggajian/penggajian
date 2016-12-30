Ext.define('Penggajian.store.rumus.RmsThrPendapatan', {
    extend: 'Ext.data.Store',
    storeId:'storerumusthrpendapatan',    
    //    autoLoad:true,
    proxy: {
        type: 'ajax',        
        url: Penggajian.Global.getApiUrl()+'rumusthr/loadpendapatan',
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