Ext.define('Penggajian.view.master.jabatan.Jabatan', {
    extend: 'Ext.container.Container',
    xtype: 'TabJabatan',
    alias: 'widget.Jabatan',
    requires: [
    'Penggajian.view.master.jabatan.JabatanController',
    'Penggajian.view.master.jabatan.JabatanInput'
    ],
    controller:'jabatan',
    title: 'Master Jabatan',
    id: 'tab1b',
    closable: true,        
    layout: 'border', 
    items:[       
    {
        xtype:'panel',
        region:'center',
        layout: 'border',
        bodyPadding: '5 5 5 5',
        items:[
        {
            xtype:'grid',
            id:'idjabatanlist',
            region:'center',            
            store: 'storejabatannew',
            selModel: 'rowmodel',
                plugins: {
                    ptype: 'rowediting',
                    autoUpdate : true,
                    clicksToEdit: 2,
                    listeners:{
                        afteredit: function(roweditor, changes, record, rowIndex) {
                            var kdjab=changes.newValues.kode_jabatan;
                              
                             Ext.Ajax.request({
                                url   :  Penggajian.Global.getApiUrl()+'jabatan/update',
                                method: 'POST',
                                params: {_token:tokendata,postdata:Ext.JSON.encode(changes.newValues)},
                                success: function(response) {
                                  var resp= Ext.decode(response.responseText);
                                  if(resp.success){
                                      var recdata=Ext.decode(resp.data);
                                      var rec=Ext.getCmp('idjabatanlist').store.findRecord('kode_jabatan',recdata.kode_jabatan);
                                      rec.set(recdata);
                                  }else{
                                      set_message(1, resp.message);
                                  }
                                  
                                  //post-processing here - this might include reloading the grid if there are calculated fields
                                },
                                failure:function(response) {
                                    console.log(response);
                                }
                              });
                        }
                    }
                     

                },
            columns: [
            {
                xtype: 'actioncolumn',
                header: 'Action',
                menuDisabled: true,
                sortable: false,   
                align:'center',
                width: 85,
                items: [
                {
                    iconCls: 'icon-edit-record',
                    tooltip: 'Edit Row',
                    handler: 'onEditClick' 
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
                                                                
                                    var data = rec.data;
                                    var vkodejabatan=data.kode_jabatan;
                                    //data = Ext.JSON.encode(rec.data);
//                                    console.log(data)                                
                                    Ext.Ajax.request({                                                            
                                        url: Penggajian.Global.getApiUrl() + 'jabatan/deleteRow',
                                        method: 'POST',
                                        params: {
                                            opt: 'delete',
                                            _token: tokendata,
                                            kode:vkodejabatan
                                        },
                                        success: function(obj) {
                                            var   resp = Ext.decode(obj.responseText);                                                                
                                            if(resp.success==true){
                                                Ext.Msg.show({
                                                    title:'Message Info',
                                                    msg: resp.message,
                                                    buttons: Ext.Msg.OK,
                                                    icon: Ext.Msg.INFO
                                                });
                                                 Ext.getCmp('jabatansearch').setValue(vkodejabatan);
                                                    Ext.getCmp('jabatansearch').onSearchClick();
                                                    Ext.getCmp('idjabatanpendapatan').store.reload({params:{kode_jabatan:vkodejabatan}});
                                            }else{
                                                Ext.Msg.show({
                                                    title: 'Error',
                                                    msg: resp.message,
                                                    modal: true,
                                                    icon: Ext.Msg.ERROR,
                                                    buttons: Ext.Msg.OK,
                                                    fn: function(btn){
                                                        if (btn == 'ok' && resp.msg == 'Session Expired') {
                                                            window.location = Penggajian.Global.getApiUrl();
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
                                
            },
            {
                text: 'Kode',  
                dataIndex: 'kode_jabatan',
                align:'center'
            },
            {
                text: 'Jabatan', 
                dataIndex: 'nama_jabatan', 
                align:'left',
                flex: 1,
                editor:{
                    xtype:'textfield'
                }
            }
       
            ],
            tbar:[
            {
                text:'Add',
                iconCls:'icons-add',
                handler:'onClickAdd'
            },
                                    {
                                        xtype: 'searchfield',
                                        id:'jabatansearch',
                                        store: 'storejabatannew',
                                        width: 380,
                                        emptyText: 'Quick Search...'
                                    }],
            bbar: {
                xtype: 'pagingtoolbar',
                displayInfo: true,
                pageSize: 10,
                store: 'storejabatannew'
            },listeners:{
//                            itemclick:'onGridRowClick'
                        }
        }
//        ,{
//            split:true,
//            xtype:'grid',
//            title:'Pendapatan',
//            id:'idjabatanpendapatan',
//            region:'south',
//            heigth:200,
//            minHeight:200,
//            
//            //        store: 'Department',
//            store: 'storejabatanpendapatan',
//
//            columns: [
//            {
//                text: 'Kode',  
//                dataIndex: 'kode_jabatan',
//                align:'center',
//                hidden:true,
//                flex: 1
//            },
//            {
//                text: 'Kode Pendapatan',  
//                dataIndex: 'kode_pendapatan',
//                align:'center',
//                hidden:true,
//                flex: 1
//            },
//            {
//                text: 'Pendapatan', 
//                dataIndex: 'keterangan', 
//                align:'left',
//                flex: 1
//            }
//            ,
//            {
//                
//                text: 'Batas', 
//                dataIndex: 'batas', 
//                align:'center',
//                xtype: 'checkcolumn',
////                flex: 1,
//                processEvent:function(){
//                    return false;
//                }
//            },
//            {
//                text: 'Min', 
//                dataIndex: 'batas_min', 
//                align:'right',
//                xtype:'numbercolumn',
//                format:'0,0',
//                flex: 1
//            },
//            {
//                text: 'Max', 
//                dataIndex: 'batas_max', 
//                align:'right',
//                xtype:'numbercolumn',
//                format:'0,0',
//                flex: 1
//            },
//            {
//                text: 'Nilai Default', 
//                dataIndex: 'nilai_default', 
//                align:'right',
//                xtype:'numbercolumn',
//                format:'0,0',
//                flex: 1
//            }
//       
//            ]
//        }
        ]
                
    }
            
    ],
    listeners:{
        show:'onShow'
//        show:function(){
//            var refdeptstoregrid=Ext.getCmp('idjabatanlist').store;   
//            ////                        console.log(refjkstoregrid);
//            refdeptstoregrid.load();
//        }
    }
    

        
    
});