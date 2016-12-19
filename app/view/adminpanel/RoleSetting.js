Ext.define('Penggajian.view.adminpanel.RoleSetting',
    {
        extend: 'Ext.container.Container',
        xtype: 'TabRoleSetting',
        alias: 'widget.RoleSetting',
        title: 'Role Setting',
        id: 'tab4a',
          requires: [
    'Penggajian.view.adminpanel.RoleSettingController',
    'Penggajian.view.adminpanel.RoleSettingInput',
    'Ext.ux.SearchField'
    ],
    controller:'rolesetting',
        closable: true,        
        height:'100%',
        layout: 'border',
        items: [
//            {
//                xtype: 'panel',
//                autoShow: true,
//                id: 'roleset_panel',
//                region: 'center',
//                margins: '5 5 5 5',
//                layout: 'border',
//                items:[
                    {
                        xtype:'grid',
                        region:'center',                           
                        id:'roleset_master',                        
                        store: 'storerolemaster',
                        stripeRows: true,
                        loadMask: true,
                        stateful:true,
                        stateId:'stateGridRSET'                        
                        ,columns:[
                            {
                                xtype: 'actioncolumn',
                                header: 'Edit/Delete',
                                menuDisabled: true,
                                sortable: false,   
                                align:'center',
                                width: 85,
                                items: [
                                    {
                                        iconCls: 'icon-edit-record',
                                        tooltip: 'Edit Row',
                                        handler: 'onEditMaster'
                                    },{
                                        getClass: function(v, meta, rec) {
                                            return 'icon-delete';
                                        },
                                        getTip: function(v, meta, rec) {
                                            return 'Delete Plant';
                                        },
                                        handler: function(grid, rowIndex, colIndex) {
                                            var rec = grid.getStore().getAt(rowIndex);
                                            Ext.Msg.show({
                                                title: 'Confirm',
                                                msg: 'Are you sure delete selected row ?',
                                                buttons: Ext.Msg.YESNO,
                                                icon: Ext.Msg.QUESTION,
                                                fn: function(btn){
                                                    if (btn == 'yes') {
                                                                
                                                        var data = '';
                                                        data = Ext.JSON.encode(rec.data);
                                                                    
                                                        Ext.Ajax.request({                                                            
                                                            url: Penggajian.Global.getApiUrl()+'adminpanel/deleterole',
                                                            method: 'POST',
                                                            params: {
                                                                cmd: 'delete',
                                                                postdata: data,
                                                                _token:tokendata
                                                            },
                                                            success: function(obj) {
                                                                var   resp = Ext.decode(obj.responseText);                                                                
                                                                if(resp.success==true){
                                                                    set_message(0,resp.message);
                                                                    Ext.getCmp('roleset_master').store.reload();
                                                                    Ext.getCmp('roleset_detail').store.load();
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
                                                    } 
                                                }
                                            });
                                        }
                                    }]
                                
                            },{
                                header:'Role ID',
                                dataIndex:'role_id',
                                sortable: true,
                                align:'center',
                                width: 60
                            },{
                                header:'Role Name',
                                dataIndex:'role_name',
                                sortable: true,
                                width: 250,
                                align:'left'
                            },{
                                xtype:'checkcolumn',
                                header:'Active',
                                dataIndex:'active',
                                sortable: false,
                                width: 50,
                               processEvent:function(){return false;}
                                
                            }
                        ]
                        ,
                        tbar: [
                                    {
                                        xtype: 'button',
                                        text: 'Add',
                                        iconCls: 'icons-add',
                                        handler: 'onAddRoleMaster'
                                    },
                                    {
                                        xtype: 'searchfield',
                                        store: 'storerolemaster',
                                        width: 380,
                                        emptyText: 'Quick Search...'
                                    }]
                        ,bbar: 
                            {xtype: 'pagingtoolbar',   
                            pageSize: 10,
                            store: 'storerolemaster',
                            displayInfo: true
                        }   
                        ,listeners:{
                            itemclick:function( scope, record, item, index, e, eOpts ){
                                //                                console.log(record.data.role_id);
                                var vroleid=record.data.role_id;     
                                var storedetail=Ext.getCmp('roleset_detail').store;
                                storedetail.load({params:{roleid:vroleid}});                                
                            }
                        }
                   
                    },
                    {
                        region:'east',
                        xtype:'treepanel',
//                        title: 'Menu Detail',
                        id:'roleset_detail',
//                        bodyPadding:'5',
                        width: 500,
                        split:true,
//                        collapsible: true,
                        useArrows: true,
                        rootVisible: false,
                        //store: 'storeroledetail',
                        store:Ext.create('Ext.data.TreeStore', {
                    root: {
                        expanded: true
                        }
                    ,
                    fields: [
                       {name:'text',type:'string'}
                    ],
                    proxy: {
                        type: 'ajax',
                        url: Penggajian.Global.getApiUrl()+'adminpanel/roledetail'
                        ,reader: {
                            type: 'json'

                //            ,rootProperty    : 'data',
                //            totalProperty   : 'record'
                        }
                        ,success:function(){
                            
                        }
                        ,exception:function( tstore, response, operation, eOpts ){
                            if(response.status=='500'){
                                tstore.reload();
                            }
                                
                             var err = Ext.decode(response.responseText); 
                            console.log(err);
                            if (err){
                                if (err.errMsg == 'Session Expired' || err.message == 'Session Expired') {
                                    session_expired('Session Expired');
                                }                                            
                                else{
                                    console.log(err);
                                }  
                            }    
                        }
                    }
                }),                        

                        multiSelect: false,
                        expandAll:true,
                        columns:[
                            {xtype: 'treecolumn', //this is so we know which column will show the tree
                                text: 'Main Menu',
                                flex: 1,
                                sortable: true,
                                ui:'nav',  
                uiCls:'treelist-with-nav',
                                dataIndex: 'text'
                                
                            }
                        ]
                    }
                        
//                ]
//            }
        ]
        ,listeners:{
            show:function(){
                var storegrid=Ext.getCmp('roleset_master').store;
                storegrid.load();
                    
                
            }
        }
        
    });