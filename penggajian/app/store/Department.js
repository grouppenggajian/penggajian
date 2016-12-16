Ext.define('Penggajian.store.Department', {
    extend: 'Ext.data.Store',
    storeId:'storedepartment',
//    autoLoad:true,
    proxy: {
        type: 'ajax',        
        url: Penggajian.Global.getApiUrl()+'jabatan/load',
        reader: {
            type: 'json',
            
                    rootProperty    : 'data'
        }
    }
    ,
     fields: [
               
        { name: 'dept_id'  },
        { name: 'dept_name'},
        { name: 'dept_head'},
        { name: 'cost_account'},
        { name: 'aktif'}
      
    ]
    
});

//Ext.create('app.store.department');