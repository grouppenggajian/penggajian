Ext.define('Penggajian.view.adminpanel.user.UserSetting',
    {
        extend: 'Ext.container.Container',
        xtype: 'TabUserSetting',
        alias: 'widget.UserSetting',
        title: 'User Setting',
        id: 'tab4b',
        requires: [
        'Penggajian.view.adminpanel.user.UserSettingController',
        'Penggajian.view.adminpanel.user.UserSettingInput',
        'Penggajian.view.adminpanel.user.ResetPassword'
        ],
        controller:'usersetting',
        closable: true,        
        height:'100%',
        layout: 'border',
        items: [
        {
            xtype: 'panel',
            autoShow: true,
            id: 'userset_panel',
            region: 'center',
            margins: '5 5 5 5',
            layout: 'border',
            items:[
            {
                xtype:'grid',
                region:'center',                           
                id:'userset_grid',
                //                        width:450,
                store: 'storeuser',
                stripeRows: true,
                loadMask: true,
                stateful:true,
                stateId:'stateGridUSET'                        
                ,
                columns:[
                {
                    xtype: 'actioncolumn',
                    header: 'Edit/Delete',
                    menuDisabled: true,
                    sortable: false,                                
                    width: 85,
                    align:'center',
                    items: [
                    {
                        iconCls: 'icon-edit-record',
                        tooltip: 'Edit Row',
                        handler: 'onEditUser'
                    },{
                        getClass: function(v, meta, rec) {
                            return 'icon-delete';
                        },
                        getTip: function(v, meta, rec) {
                            return 'Delete Plant';
                        },
                        handler: function(grid, rowIndex, colIndex) {
                            var rec = grid.getStore().getAt(rowIndex);
                            var data = Ext.JSON.encode(rec.data);
                            execute_confirm('Are you sure delete selected row ?', 
                                Penggajian.Global.getApiUrl()+'adminpanel/deleteuser',
                                {
                                    cmd: 'delete',
                                    postdata: data,
                                    _token:tokendata
                                }, function(obj){
                                    var   resp = Ext.decode(obj.responseText);                                                                
                                    if(resp.success==true){
                                        set_message(0,resp.message);
                                        Ext.getCmp('userset_grid').store.reload();
                                                                    
                                    }else{
                                        Ext.Msg.show({
                                            title: 'Error',
                                            msg: resp.msg,
                                            modal: true,
                                            icon: Ext.Msg.ERROR,
                                            buttons: Ext.Msg.OK,
                                            fn: function(btn){
                                                if (btn == 'ok' && resp.msg == 'Session Expired') {
                                                    clearSession();
                                                }
                                            }
                                        });
                                    }
                                })                                                                               
                                           
                        }
                    }
                    ]
                                
                },{
                    header:'User ID',
                    dataIndex:'user_id',
                    sortable: true,
                    align:'left',
                    width: 100
                },{
                    header:'User Name',
                    dataIndex:'user_name',
                    align:'left',
                    sortable: true,
                    width: 150
                },{
                    header:'Password',
                    dataIndex:'user_password',
                    align:'left',
                    sortable: true,
                    width: 100
                },{
                    header:'Role ID',
                    dataIndex:'role_id',
                    sortable: true,
                    align:'center',
                    width: 65
                },{
                    header:'Role Name',
                    dataIndex:'role_name',
                    sortable: true,
                    align:'left',
                    width: 200
                },{
                    header:'Reg Code',
                    dataIndex:'reg_code',
                    sortable: true,
                    align:'left',
                    width: 90
                },{
                    xtype:'checkcolumn',
                    header:'Active',
                    dataIndex:'aktif',
                    sortable: false,
                    align:'center',
                    width: 80,
                    disabled:false,
                    listeners:{
                        checkchange:function( grid, rowIndex, checked, eOpts ){
                            
                            
                            if(checked){
                                Ext.Msg.show({
                                    title: 'Confirm',
                                    msg: 'Are you sure to Enabled this user ?',
                                    buttons: Ext.Msg.YESNO,
                                    icon: Ext.Msg.QUESTION,
                                    fn: function(btn){
                                        if (btn == 'yes') {
                                            var rec = Ext.getCmp('userset_grid').getStore().getAt(rowIndex);
                                            var data = Ext.JSON.encode(rec.data);                                                                                                                
                                            Ext.Ajax.request({                                                            
                                                url: Penggajian.Global.getApiUrl()+'adminpanel/aktifuser',
                                                method: 'POST',
                                                params: {
                                                    _token:tokendata,
                                                    cmd: 'setaktif',
                                                    postdata: data
                                                },
                                                success: function(obj) {
                                                    var   resp = Ext.decode(obj.responseText);                                                                
                                                    if(resp.success==true){
                                                        set_message(0,resp.message);
                                                        Ext.getCmp('userset_grid').store.reload();
                                                                    
                                                    }else{
                                                        Ext.Msg.show({
                                                            title: 'Error',
                                                            msg: resp.msg,
                                                            modal: true,
                                                            icon: Ext.Msg.ERROR,
                                                            buttons: Ext.Msg.OK,
                                                            fn: function(btn){
                                                                if (btn == 'ok' && resp.msg == 'Session Expired') {
                                                                    clearSession();
                                                                }
                                                            }
                                                        });
                                                    }
                                                },
                                                failure: function(obj) {
                                                    var  resp = Ext.decode(obj.responseText);
                                                    Ext.Msg.alert('info',resp.reason);
                                                }
                                            }); 
                                        }else{
                                            Ext.getCmp('userset_grid').store.reload();
                                        }
                                                    
                                    }
                                });
                            
                            }else{
                                Ext.Msg.show({
                                    title: 'Confirm',
                                    msg: 'Are you sure to Disabled this user ?',
                                    buttons: Ext.Msg.YESNO,
                                    icon: Ext.Msg.QUESTION,
                                    fn: function(btn){
                                        if (btn == 'yes') {
                                            var rec = Ext.getCmp('userset_grid').getStore().getAt(rowIndex);
                                            var data = Ext.JSON.encode(rec.data);                                                                                                                
                                            Ext.Ajax.request({                                                            
                                                url: Penggajian.Global.getApiUrl()+'adminpanel/aktifuser',
                                                method: 'POST',
                                                params: {
                                                    _token:tokendata,
                                                    cmd: 'setaktif',
                                                    postdata: data
                                                },
                                                success: function(obj) {
                                                    var   resp = Ext.decode(obj.responseText);                                                                
                                                    if(resp.success==true){
                                                        set_message(0,resp.message);
                                                        Ext.getCmp('userset_grid').store.reload();
                                                                    
                                                    }else{
                                                        Ext.Msg.show({
                                                            title: 'Error',
                                                            msg: resp.msg,
                                                            modal: true,
                                                            icon: Ext.Msg.ERROR,
                                                            buttons: Ext.Msg.OK,
                                                            fn: function(btn){
                                                                if (btn == 'ok' && resp.msg == 'Session Expired') {
                                                                    clearSession();
                                                                }
                                                            }
                                                        });
                                                    }
                                                },
                                                failure: function(obj) {
                                                    var  resp = Ext.decode(obj.responseText);
                                                    Ext.Msg.alert('info',resp.reason);
                                                }
                                            }); 
                                        }else{
                                            Ext.getCmp('userset_grid').store.reload();
                                        }
                                                    
                                    }
                                });                             
                            }
                        }
                    }
                },{
                    xtype: 'actioncolumn',
                    header: 'Reset Password',
                    menuDisabled: true,
                    sortable: false,                                
                    width: 120,
                    align:'center',
                    items: [
                    {
                        iconCls: 'icon-key',
                        tooltip: 'Reset Password',
                        handler: function(grid, rowIndex, colIndex) {
                            var rec = grid.getStore().getAt(rowIndex);
                            Ext.Msg.show({
                                title: 'Confirm',
                                msg: 'Are you sure to reset users password ?',
                                buttons: Ext.Msg.YESNO,
                                icon: Ext.Msg.QUESTION,
                                fn: function(btn){
                                    if (btn == 'yes') {
                                        var winrespwd=Ext.create({
                                            xtype:'resetpassword'
                                        });
                                        Ext.getCmp('userset_user_respwd_id').setValue(rec.get('user_id'));
                                        winrespwd.show();

                                    } 
                                }
                            });
                        }
                    }
                    ]
                                
                },{
                    header:'Last Login',
                    dataIndex:'last_login',
                    sortable: true,
                    align:'center',
                    width: 150
                },{
                    header:'Last Logout',
                    dataIndex:'last_logout',
                    sortable: true,
                    align:'center',
                    width: 150
                }
                ]
                ,
                tbar: [{
                    xtype: 'toolbar',
                    items: [
                    {
                        xtype: 'button',
                        text: 'Add',
                        iconCls: 'icons-add',
                        handler: 'onAdd'
                    },
                    {
                        xtype: 'searchfield',
                        store: 'storeuser',
                        width: 380,
                        emptyText: 'Quick Search...'
                    }]
                }]
                ,
                bbar: 
                {
                    xtype: 'pagingtoolbar',   
                    pageSize: 10,
                    store: 'storeuser',
                    displayInfo: true
                }                           
                   
            }
            ]
        }
        ],
        listeners:{
            show:function(){
                var storegrid=Ext.getCmp('userset_grid').store;
                storegrid.load();
                    
                
            }
        }
        
    });