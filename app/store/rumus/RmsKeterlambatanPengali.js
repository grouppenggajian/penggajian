Ext.define('Penggajian.store.rumus.RmsKeterlambatanPengali', {
    extend: 'Ext.data.Store',
    storeId:'storerumusketerlambatanpengali',    
    //    autoLoad:true,
    proxy: {
        type: 'ajax',        
        url: Penggajian.Global.getApiUrl()+'rumusketerlambatan/loadpengali',
        reader: {
            type: 'json',
            
            rootProperty    : 'data',
            totalProperty   : 'record'
        }
    }
    ,
    fields: [
               
  
    {
        name: 'status'
    },
    {
        name: 'nilaikali'
    }
        




        
      
    ],
    sorters: [{
         property: 'status',
         direction: 'ASC'
     }, {
         property: 'ordernum',
         direction: 'ASC'
     }]
    
});