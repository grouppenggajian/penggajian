Ext.define('Penggajian.store.adminpanel.RoleDetailAll', {
    extend: 'Ext.data.TreeStore',
    storeId:'storeroledetailall',
        autoLoad:false,
    proxy: {
        type: 'ajax',        
        url: Penggajian.Global.getApiUrl()+'adminpanel/roledetailall',
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