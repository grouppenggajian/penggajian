Ext.define('Penggajian.view.master.pegawai.Pegawai', {
    extend: 'Ext.container.Container',
    xtype: 'TabPegawai',
    alias: 'widget.Pegawai',
    requires: [
    'Penggajian.view.master.pegawai.PegawaiController',
    'Penggajian.view.master.pegawai.PegawaiInput'
    ],
    controller:'pegawai',
    title: 'Master Pegawai',
    id: 'tab1e',
    closable: true,        
    layout: 'border', 
    items:[       
    {
        xtype:'panel',
        region:'center',
        layout: 'fit',
        bodyPadding: '5 5 5 5',
        items:[
        {
            xtype:'grid',
            id:'idpegawailist',
            //        store: 'Department',
            store: 'storepegawai',

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
                                    //data = Ext.JSON.encode(rec.data);
//                                    console.log(data)                                
                                    Ext.Ajax.request({                                                            
                                        url: Penggajian.Global.getApiUrl() + 'pegawai/deleteRow',
                                        method: 'POST',
                                        params: {
                                            opt: 'delete',
                                            _token: tokendata,
                                            nik:data.nik
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
                                                Ext.getCmp('idpegawailist').store.reload();
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
                text: 'NIK',  
                dataIndex: 'nik',
                align:'center'
            },
            {
                text: 'Nama', 
                dataIndex: 'nama', 
                align:'left',
                flex: 1
            },
            {
                text: 'Alamat', 
                dataIndex: 'alamat', 
                align:'left',
                flex: 1
            },
            {
                text: 'Kelurahan', 
                dataIndex: 'kelurahan', 
                align:'left',
                flex: 1
            },
            {
                text: 'Tgl Masuk', 
                dataIndex: 'tgl_masuk', 
                align:'left',
                flex: 1
            },
            {
                text: 'Jabatan', 
                dataIndex: 'jabatan', 
                align:'left',
                flex: 1
            },
            {
                text: 'Tgl Lahir', 
                dataIndex: 'tgl_lahir', 
                align:'left',
                flex: 1
            },
            {
                text: 'Status Kerja', 
                dataIndex: 'status_kerja', 
                align:'left',
                flex: 1
            },
            {
                text: 'Libur', 
                dataIndex: 'libur_perminggu', 
                align:'left',
                flex: 1
            }
       
            ],
            tbar:[
            {
                text:'Add',
                iconCls:'icons-add',
                handler:'onClickAdd'
            },{
                                        xtype: 'searchfield',
                                        id:'pegawaisearch',
                                        store: 'storepegawai',
                                        width: 380,
                                        emptyText: 'Quick Search...'
                                    }],
            bbar: {
                xtype: 'pagingtoolbar',
                displayInfo: true,
                pageSize: 10,
                store: 'storepegawai'
            }
        }
        ]
                
    }
            
    ],
    listeners:{
        show:function(){
            var refstoregrid=Ext.getCmp('idpegawailist').store;   
            ////                        console.log(refjkstoregrid);
            refstoregrid.loadPage(1);
        //            {params:{start:0,limit:10}}
        }
    }
    

        
    
});