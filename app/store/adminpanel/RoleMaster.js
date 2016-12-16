Ext.define('Penggajian.store.adminpanel.RoleMaster', {
    extend: 'Ext.data.Store',
    storeId:'storerolemaster',
    //    autoLoad:true,
    proxy: {
        type: 'ajax',        
        url: Penggajian.Global.getApiUrl()+'adminpanel/rolemaster',
        reader: {
            type: 'json',
            
            rootProperty    : 'data',
            totalProperty   : 'record'
        }
    }
    ,
    fields: [
       {name:'role_id'},
        {name:'role_name'},
        {name:'active',type:'boolean'}
    ]
})