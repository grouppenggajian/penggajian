Ext.define('Penggajian.store.rumus.RmsLemburPembagi', {
    extend: 'Ext.data.Store',
    storeId:'storerumuslemburpembagi',    
    //    autoLoad:true,
    proxy: {
        type: 'ajax',        
        url: Penggajian.Global.getApiUrl()+'rumuslembur/loadpembagi',
        reader: {
            type: 'json',
            
            rootProperty    : 'data',
            totalProperty   : 'record'
        }
    }
    ,
    fields: [
               
   
    {
        name: 'nilai'
    }
        
        
      
    ]
    
});