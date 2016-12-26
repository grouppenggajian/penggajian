Ext.define('Penggajian.view.master.pengaturan.HariLibur', {
    extend: 'Ext.container.Container',
    xtype: 'TabHariLibur',
    alias: 'widget.HariLibur',
    requires: [
    //    'Penggajian.view.master.periode.PeriodeController',
    //    'Penggajian.view.master.periode.PeriodeInput'
    ],
    //    controller:'periode',
    title: 'Hari Libur',
    id: 'tab1f2',
    closable: true,        
    layout: 'border', 
    items:[       
    {
        xtype:'grid',
        id:'idhariliburlist',
        region:'center',            
        store: 'storeharilibur',
        selModel: {
            selType: 'rowmodel'
        },
        plugins: {
            ptype: 'rowediting',
            clicksToEdit: 2,
            listeners: {
                cancelEdit: function(rowEditing, context) {
                    // Canceling editing of a locally added, unsaved record: remove it
                    if (context.record.phantom) {
                        context.grid.store.remove(context.record);
                    }
                },
                 afteredit: function(roweditor, changes, record, rowIndex) {
                            
                            var tgl=changes.newValues.tanggal;
                            var ket=changes.newValues.keterangan;
                              console.log(tgl);
                             Ext.Ajax.request({
                                url   :  Penggajian.Global.getApiUrl()+'libur/save',
                                method: 'POST',
                                params: {
                                    _token:tokendata,
                                    tgl:tgl,
                                    ket:ket
                                },
                                success: function(response) {
                                  var resp= Ext.decode(response.responseText);
                                  if(resp.success){
                                      var awal=Ext.getCmp('harilibur_start').getValue();
                                        var akhir=Ext.getCmp('harilibur_finish').getValue();
                                        Ext.getCmp('idhariliburlist').store.load({params:{awal:awal,akhir:akhir}});
//                                      var recdata=Ext.decode(resp.data);
//                                      var rec=Ext.getCmp('idjabatanlist').store.findRecord('kode_jabatan',recdata.kode_jabatan);
//                                      rec.set(recdata);
                                     set_message(0, resp.message);
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
                iconCls: 'icon-delete',
                tooltip: 'Delete Row',
                handler: function(grid, rowIndex, colIndex) {
                        var rec = grid.getStore().getAt(rowIndex);
                        Ext.Msg.show({
                            title: 'Confirm',
                            msg: 'Are you sure delete selected row ?',
                            buttons: Ext.Msg.YESNO,
                            icon: Ext.Msg.QUESTION,
                            fn: function(btn){
                                if (btn == 'yes') {                                                                
                                    var data = rec.get('tanggal');                                                                 
                                    Ext.Ajax.request({                                                            
                                        url: Penggajian.Global.getApiUrl() + 'libur/delete',
                                        method: 'POST',
                                        params: {
                                            opt: 'delete',
                                            _token: tokendata,
                                            tgl:data
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
                                                Ext.getCmp('idhariliburlist').store.reload();
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
            }
            ]
                                
        },

        {
            text:'Tanggal',
            dataIndex:'tanggal',
            sortable:false,
            width:110,
            align:'center',
            hidden:false,
            xtype: 'datecolumn',   format:'Y-m-d',
            editor:{
                xtype:'datefield',
                format:'Y-m-d'
            }
        },
        {
            text:'Keterangan',
            dataIndex:'keterangan',
            align:'left',
            sortable:false,
            flex:1,
            width:200,
            hidden:false,
            editor:{
                xtype:'textfield'
            }
        },       

        {
            text:'create_date',
            dataIndex:'create_date',
            sortable:false,
            width:100,
            hidden:false
        },

        {
            text:'create_by',
            dataIndex:'create_by',
            sortable:false,
            width:80,
            hidden:false
        }

        
        ],
        tbar:[
        {
            text:'Add',
            iconCls:'icons-add',
            handler:function(){
                            // empty record
                            var grid=Ext.getCmp('idhariliburlist');
                            var str=grid.getStore();
                            var edit=grid.getPlugin();
//                            var rec = new Penggajian.view.rumus.lembur.WriterPendapatan({
//                                kode:'',
//                                keterangan:''
//                            });
                            var rec = new str.getModel();
//                            edit.cancelEdit();
                            grid.store.insert(0, rec);
                            edit.startEdit(0, 0);
                        }
        },
        //        {
        //            xtype: 'searchfield',            
        //            id:'harilibursearch',
        //            store: 'storeharilibur',
        //            width: 380,
        //            emptyText: 'Search nik,nama,jabatan...'
        //        },
        //        '-',
        {
            xtype: 'datefield',
            id:'harilibur_start',
            format:'d-m-Y',
            width:120
        },
        ' s/d ',
        {
            xtype: 'datefield',
            id:'harilibur_finish',
            format:'d-m-Y',
            width:120
        },
        {
            text:'Search Tanggal',
            iconCls:Ext.baseCSSPrefix + 'form-search-trigger',
            handler:function(){
                var awal=Ext.getCmp('harilibur_start').getValue();
                var akhir=Ext.getCmp('harilibur_finish').getValue();
                Ext.getCmp('idhariliburlist').store.load({params:{awal:awal,akhir:akhir}});
            }
        }
        
        
        ],
        bbar: {
            xtype: 'pagingtoolbar',
            displayInfo: true,
            pageSize: 10,
            store: 'storeharilibur'
        }

    }
    ],
    listeners:{
    show:function(){
        var awal=Ext.getCmp('harilibur_start').getValue();
                var akhir=Ext.getCmp('harilibur_finish').getValue();
                Ext.getCmp('idhariliburlist').store.load({params:{awal:awal,akhir:akhir}});
    }
    }
}
);
        