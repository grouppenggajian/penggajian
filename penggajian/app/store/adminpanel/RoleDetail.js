Ext.define('Penggajian.store.adminpanel.RoleDetail', {
    extend: 'Ext.data.TreeStore',
    storeId:'storeroledetail',
    //    autoLoad:true,
    proxy: {
        type: 'ajax',        
        url: Penggajian.Global.getApiUrl()+'adminpanel/roledetail',
        reader: {
            type: 'json'
            
//            ,rootProperty    : 'data',
//            totalProperty   : 'record'
        }
    },
    root: {
            expanded: true
        }
    ,
    fields: [
       {name:'text',type:'string'}
    ]
})