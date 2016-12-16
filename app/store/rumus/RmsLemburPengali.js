Ext.define('Penggajian.store.rumus.RmsLemburPengali', {
    extend: 'Ext.data.Store',
    storeId:'storerumuslemburpengali',    
    //    autoLoad:true,
    proxy: {
        type: 'ajax',        
        url: Penggajian.Global.getApiUrl()+'rumuslembur/loadpengali',
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
        name: 'jam_ke'
    },
    {
        name: 'min_jam'
    },
    {
        name: 'max_jam'
    },{
        name: 'nilaikali'
    },{
        name: 'ordernum'
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