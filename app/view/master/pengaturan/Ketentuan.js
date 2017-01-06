Ext.define('Penggajian.view.master.pengaturan.Ketentuan', {
    extend: 'Ext.container.Container',
    xtype: 'TabKetentuan',
    alias: 'widget.Ketentuan',
    requires: [
        'Penggajian.view.master.pengaturan.KetentuanController',
        'Penggajian.view.master.pengaturan.KetentuanModel'
    ],
    controller:'ketentuan',
    viewModel:'ketentuan',
    title: 'Ketentuan',
    id: 'tab1f3',
    closable: true,        
    layout: 'border', 
    items:[       
    {
        xtype:'form',
        region:'north',
        layout: 'hbox',
        height:250,
            minHeight:250,
        bodyPadding: '5 5 5 5',
        items:[
            {
                xtype:'fieldset',
                title:'Toleransi dan Cuti',
                width:'50%',
                layout:'anchor',
                margin:'0 10 0 5',
                defaults:{
                  labelWidth:150  
                },
                items:[
                    {
                        xtype: 'fieldcontainer',
                        margin:'3 10 3 5',
                        anchor:'100%',
                        fieldLabel:'Toleransi Keterlambatan',
                        combineErrors: false,
                        layout:'hbox',
                        defaults: {
                            hideLabel: true
                        },
                        items: [
                           {
                               id:'ketentuan_toleransi',
                               name : 'absentoleransi',
                               xtype: 'numberfield',
                               width: 70,
                               minValue:0,
                               step: 5,
                               allowBlank: false,
                              margin:'0 10 0 5'
                               
                           },
                           {
                               xtype: 'displayfield',
                               value: 'menit',
                               width: 50
                           }
                        ]
                    },
                    {
                        xtype: 'fieldcontainer',
                        margin:'0 10 0 5',
                        fieldLabel:'Kuota Cuti Tahunan',
                        anchor:'100%',
                        combineErrors: false,
                        layout:'hbox',
                        defaults: {
                            hideLabel: true
                            
                        },
                        items: [
                           {
                               id:'ketentuan_kuotacuti',
                               name : 'kuotacuti',
                               xtype: 'numberfield',
                               width: 70,
                               minValue:0,
                               allowBlank: false,
                               margin:'0 10 0 5'
                           },
                           {
                               xtype: 'displayfield',
                               value: 'hari',
                               width: 50
                           }
                        ]
                    },{
                        xtype: 'fieldcontainer',
                        margin:'3 10 3 5',
                        anchor:'100%',
                        fieldLabel:'Mulai Absen',
                        combineErrors: false,
                        layout:'hbox',
                        defaults: {
                            hideLabel: true
                        },
                        items: [
                           {
                               id:'ketentuan_mulaiabsen',
                               name : 'mulaiabsen',
                               xtype: 'numberfield',
                               width: 70,
                               minValue:0,
                               step: 5,
                               allowBlank: false,
                              margin:'0 10 0 5'
                               
                           },
                           {
                               xtype: 'displayfield',
                               value: 'menit sebelum masuk',
                               width: 150
                           }
                        ]
                    },{
                        xtype: 'fieldcontainer',
                        margin:'3 10 3 5',
                        anchor:'100%',
                        fieldLabel:'IP Mesin',
                        combineErrors: false,
                        layout:'hbox',
                        defaults: {
                            hideLabel: true
                        },
                        items: [
                           {
                               id:'ketentuan_ipmesin',
                               name : 'ipmesin',
                               xtype: 'textfield',
                               width: 120,
                               vtype:{
                                   ip:function(v){
                                   var ipAddress = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/;
                                   var matches = ipAddress.exec(v);
                                    if (matches) {
                                        for (var i = 1; i <= 3; i++)
                                        {
                                            if (matches[i] && !(parseInt(matches[i], 10) < 256 && parseInt(matches[i], 10) >= 0))
                                            {
                                                return false;
                                            }
                                        }
                                        // the last octet should be greater than 0 and lesser than 255
                                        if (matches[4] && !(parseInt(matches[4], 10) < 255 && parseInt(matches[4], 10) > 0))
                                        {
                                            return false;
                                        }return true;
                                    }return false;
                                },
                                ipText : 'Invalid ip address'
                               
                               },
                               allowBlank: false,
                              margin:'0 10 0 5'
                               
                           },
                           {
                               xtype: 'displayfield',
                               value: '127.0.0.1',
                               width: 120
                           }
                        ]
                    }
                ]
            },
            {
                xtype:'fieldset',
                title:'Periode Gaji',
                anchor:'50%',
                flex:1,
                margin:'0 10 0 5',
                layout:'anchor',
                defaults:{
                  labelWidth:150  
                },
                items:[
                    {
                        id:'ketentuan_periodemulai',
                               name : 'periodemulai',
                               fieldLabel:'Mulai',
                               xtype: 'numberfield',
                               width: 225,
                               minValue:1,
                               maxValue:31,
                               allowBlank: false,
                               margin:'3 10 2 5'
                           },{
                               id:'ketentuan_periodeselesai',
                               name : 'periodeselesai',
                               fieldLabel:'Selesai',
                               xtype: 'numberfield',
                               width: 225,
                               minValue:1,
                               maxValue:31,
                               allowBlank: false,
                               margin:'8 10 10 5'
                           }
                    
                ]
            }]
    },
            
                    {   
//                margin: '0 5 3 5',
                xtype:'grid',                 
                id:'ketentuanpantangan',   
                region:'center',
                border:true,
                height:129,
                anchor:'100%',
                bind:{
                  store:'{storepantangan}'  
                },
                stripeRows: true,
                loadMask: true,
                stateful:true,
                stateId:'stateketentuanpantangan',
                queryParam:'searchvalue',
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
                        }

                    }
                },
                columns:[
                {
                    xtype: 'actioncolumn',
                    header: 'Act',
                    menuDisabled: true,
                    sortable: false,   
                    align:'center',
                    width: 50,
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
                                    var data = rec.data;                                                                 
                                    Ext.Ajax.request({                                                            
                                        url: Penggajian.Global.getApiUrl() + 'ketentuan/deletePantangan',
                                        method: 'POST',
                                        params: {
                                            opt: 'delete',
                                            _token: tokendata,                                            
                                            postdata:Ext.JSON.encode(data)
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
                                                Ext.getCmp('ketentuanpantangan').store.reload();
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
                    text: 'Hari',  
                    dataIndex: 'hari',
                    align:'left',
                    width:150
                    ,
                    field:{
                        xtype:'combo',
                        id: 'ketentuan_pantangan',                            
                        allowBlank: false,                            
                        store: createArrayStore(dataharicombo),
                        valueField: 'mtext',
                        displayField: 'mtext',
                        typeAhead: true,
                        triggerAction: 'all' ,
                        queryParam:'searchvalue',
                        width:150,
                        listeners:{
                            select:function( combo, records, eOpts ){
                                var gridstore=Ext.getCmp('ketentuanpantangan').store;
                               var frec= gridstore.findRecord('hari',combo.getValue());
                                if(frec){
                                    combo.setValue(null);
                                    Ext.getCmp('ketentuanpantangan').getPlugin().cancelEdit();
                                }
                                
                                
                            }
                        }
                    }
                    
                }
                
                ]
                ,
                tbar:{
                    xtype:'toolbar',
                    //                    padding: '10 5 10 0',
                    items:[
                    {
                        
                        xtype:'button',
                        text:'Add Pantangan',
                        iconCls:'icon-grid',
                        handler:function(){
                            // empty record
                            var grid=Ext.getCmp('ketentuanpantangan');
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
                    } 
                    ]
                },
    bbar:{
         xtype:'toolbar',
         buttonAlign:'center',
                    items:[ '->',  {
                        
                        
                text:'Refresh',
                iconCls:'icon-preview',
                handler:'onRefreshClick'
            } ,{
                        
                        
                text:'Simpan',
                iconCls:'icon-simpan',
                handler:'onSimpanClick'
            } ]
    }
            
          
            }
                    
              
        
    ],
    listeners:{
        show:'onShow'
    }
}
);
        