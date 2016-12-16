Ext.define('Penggajian.store.adminpanel.User', {
    extend: 'Ext.data.Store',
    storeId:'storeuser',
    //    autoLoad:true,
    proxy: {
        type: 'ajax',        
        url: Penggajian.Global.getApiUrl()+'adminpanel/loaduser',
        reader: {
            type: 'json',
            
            rootProperty    : 'data',
            totalProperty   : 'record'
        }
    }
    ,
    fields: [
       {name:'user_id'},
        {name:'user_name'},
        {name:'user_password'},        
        {name:'role_id'},
        {name:'role_name'},
        {name:'jabatan_id'},
        {name:'jabatan'},
        {name:'reg_code'},
        {name:'last_login'},
        {name:'last_logout'},        
        {name:'aktif', type:'boolean'}
    ]
})