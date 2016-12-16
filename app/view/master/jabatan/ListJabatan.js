Ext.define('Penggajian.view.master.jabatan.ListJabatan', {
    extend: 'Ext.grid.Panel',
    xtype: 'jabatanlist',
    id:'idjabatanlist',
    requires: [
        'Penggajian.store.Department'
    ],

//    title: 'Department',

    //store: Ext.data.StoreManager.lookup('storeDepartment'),
    store: 'Department',

    columns: [
        { text: 'dept_id',  dataIndex: 'dept_id' },
        { text: 'dept_name', dataIndex: 'dept_name', flex: 1 },
        { text: 'dept_head', dataIndex: 'dept_head', flex: 1 },
        { text: 'cost_account', dataIndex: 'cost_account', flex: 1 },
        { text: 'aktif', dataIndex: 'aktif', flex: 1 }
       
    ],
    tbar:[
        {
            text:'add',
            handler:'onClickAdd'
    }
],
    listeners: {
        select: 'onItemSelected',
        load:function(me){
            me.getStore().load();
        }
    }
});