Ext.define('Penggajian.view.rumus.thr.RmsTHR',
    {
        extend: 'Ext.container.Container',
        xtype:'TabRumusThr',
        alias: 'widget.RumusThr',
        title: 'Rumus THR',        
        id: 'tab1g5',
        requires:[
        'Penggajian.view.rumus.thr.RmsTHRController',
        'Penggajian.view.rumus.thr.RmsTHRModel'
        ],
        controller:'rmsthr',
        viewModel:'rmsthr',
        height: '100%',
        closable: true,
        layout: 'border',
        items:  [
            {                
            xtype:'form',
            region:'center',
            layout:'hbox',
            buttonAlign:'center',
            items:[
                {   
                margin: '5 5 5 0',
                xtype:'grid',                 
                id:'rmsthr_pendapatan',   
                region:'center',
                border:true,
                height:'100%',
                flex:1,
                //            hideHeaders:true,
//                autoScroll:true,           
                store: 'storerumusthrpendapatan',
                stripeRows: true,
                loadMask: true,
                stateful:true,
                stateId:'statermsthrpendapatan',
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
                        handler: 'onDeletePendapatanThr' 
                    }]

                },
                {
                    text: 'Kode',  
                    dataIndex: 'kode',
                    align:'center',
                    width:150
                    ,
                    field:{
                        xtype:'combo',
                        name: 'kode',
                        id: 'rmsthr_kode',                            
                        //                                    afterLabelTextTpl: required_css,                                                                
                        hiddenName:'rmsthr_kode',
                        allowBlank: false,                            
                        store: 'storependapatancombo',
                        valueField: 'kode',
                        displayField: 'keterangan',
                        typeAhead: true,
                        triggerAction: 'all' ,
                        queryParam:'searchvalue',
                        width:150,
                        listeners:{
                            select:function( combo, records, eOpts ){
                                var gridstore=Ext.getCmp('rmsthr_pendapatan').store;
                               var frec= gridstore.findRecord('kode',records.get('kode'));
                                if(!frec){
                                    Ext.getCmp('rmsthr_keterangan').setValue(records.get('keterangan'));
                                }else{
                                    combo.setValue(null);
                                    Ext.getCmp('rmsthr_pendapatan').getPlugin().cancelEdit();
                                }
                                
                                
                            }
                        }
                    }
                },
                {
                    text: 'Keterangan',  
                    dataIndex: 'keterangan',
                    align:'left',
                    flex:1
                    ,
                    editor:{
                        xtype:'textfield',
                        name: 'keterangan',
                        id: 'rmsthr_keterangan',                                
                        hiddenName:'keterangan',
                        allowBlank: true,
                        readOnly:true
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
                        text:'Add Pendapatan',
                        iconCls:'icon-grid',
                        handler:function(){
                            var grid=Ext.getCmp('rmsthr_pendapatan');
                            var str=grid.getStore();
                            var edit=grid.getPlugin();
                            var rec = new str.getModel();

                            grid.store.insert(0, rec);
                            edit.startEdit(0, 0);
                        }
                    } 
                    ]
                }
            
          
            },{   
                margin: '5 5 5 5',
                xtype:'grid',
                region:'east',   
                border:true,
                height:'100%',
                width:'50%',
                minWidth:500,
                id:'rmsthr_masakerja',   
                flex:1,
                //            hideHeaders:true,
//                autoScroll:true,           
                store: 'storerumusthr',
                stripeRows: true,
                loadMask: true,
                stateful:true,
                stateId:'stateGridRmsThrMasakerja',
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
                    header: 'Action',
                    menuDisabled: true,
                    sortable: false,   
                    align:'center',
                    width: 85,
                    items: [
                    {
                        iconCls: 'icon-delete',
                        tooltip: 'Delete Row',
                        handler: 'onDeleteMasakerja' 
                    }]
                
                },
                {
                    text: 'Masa Kerja',  
                    dataIndex: 'masakerja',
                    align:'left',
                    editor:{
                                    xtype:'combo',
                                    name: 'masakerja',
                                    id: 'rmsthreditor_masakerja',                            
                                    hiddenName:'masakerja',
                                    allowBlank: false,                            
                                    store: createArrayStore(datathr),
                                    valueField: 'mid',
                                    displayField: 'mtext',
                                    typeAhead: true,
                                    triggerAction: 'all' ,                                   
                                    width:190                            
                                }
                },
                {
                    text: 'Pembagi',  
                    dataIndex: 'pembagi',
                    align:'center',
                    width:80,
                    editor:{
                                    xtype:'combo',
                                    name: 'pembagi',
                                    id: 'rmsthreditor_pembagi',                            
                                    hiddenName:'pembagi',
                                    allowBlank: false,       
                                    bind:{
                                      store:'{thrpembagi}'  
                                    },
//                                    store: createArrayStore(datathr),
                                    valueField: 'name',
                                    displayField: 'name',
                                    typeAhead: true,
                                    triggerAction: 'all' ,                                   
                                    width:190                            
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
                        text:'Add Pembagi MasaKerja',
                        iconCls:'icon-grid',
                        handler:function(){
                            // empty record
                            var grid=Ext.getCmp('rmsthr_masakerja');
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
                }
            
          
            }
            ],
        buttons:[
        {
                        
                        
                text:'Refresh',
                iconCls:'icon-preview',
                handler:'onRefreshClick'
            } ,{
                        
                        
                text:'Simpan',
                iconCls:'icon-simpan',
                handler:'onSimpanClick'
            } 
        
        
        ]
            }
        ],
        listeners:{
        
            show:'onShow'
        }
    });