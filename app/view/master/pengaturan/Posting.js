Ext.define('Penggajian.view.master.pengaturan.Posting',
    {
        extend: 'Ext.container.Container',
        xtype:'TabPosting',
        alias: 'widget.Posting',
        title: 'Posting',        
        id: 'tab1f4',
        requires:[
        'Penggajian.view.master.pengaturan.PostingController' ,
        'Penggajian.view.master.pengaturan.PostingModel' 
        ],
        controller:'posting',
        viewModel:'posting',        
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
                margin: '5 5 5 5',
                xtype:'grid',                 
                id:'posting_pendapatan',   
                region:'center',
                border:true,
                height:'100%',
                flex:1,
                //            hideHeaders:true,
//                autoScroll:true,           
                store: 'storepostingpendapatan',
                stripeRows: true,
                loadMask: true,
                stateful:true,
                stateId:'statepostingpendapatan',
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
                        handler: 'onDeletePostingPendapatan' 
                    }]

                },
                {
                    text: 'Jenis',  
                    dataIndex: 'jenis',
                    align:'center',
                    width:150
                    ,
                    field:{
                        xtype:'combo',
                        id: 'posting_pendapatanjenis',                            
                        allowBlank: false,    
                        bind:{
                            store:'{refpostingpendapatan}'
                        },                        
                        valueField: 'keterangan',
                        displayField: 'keterangan',
                        typeAhead: true,
                        triggerAction: 'all' ,
                        queryParam:'searchvalue',
                        width:150,
                        listeners:{
                            select:function( combo, records, eOpts ){
                                var gridstore=Ext.getCmp('posting_pendapatan').store;
                               var frec= gridstore.findRecord('jenis',records.get('keterangan'));
                                if(frec){
                                    combo.setValue(null);
                                    Ext.getCmp('posting_pendapatan').getPlugin().cancelEdit();
                                }
                                
                                
                            }
                        }
                    }
                },
                {
                    text: 'Kode',  
                    dataIndex: 'kode',
                    align:'center',
                    width:150
                    ,
                    field:{
                        xtype:'combo',                        
                        id: 'posting_pendapatankode',                            
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
                                var gridstore=Ext.getCmp('posting_pendapatan').store;
                               var frec= gridstore.findRecord('kode',records.get('kode'));
                                if(!frec){
                                    Ext.getCmp('posting_pendapatanketerangan').setValue(records.get('keterangan'));
                                }else{
                                    combo.setValue(null);
                                    Ext.getCmp('posting_pendapatan').getPlugin().cancelEdit();
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
                        id: 'posting_pendapatanketerangan',                                
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
                            // empty record
                            var grid=Ext.getCmp('posting_pendapatan');
                            var str=grid.getStore();
                            var edit=grid.getPlugin();
                            var rec = new str.getModel();
                            grid.store.insert(0, rec);
                            edit.startEdit(0, 0);
                        }
                    } ,
                    {
                        
                        xtype:'button',
                        text:'Refresh',
                        iconCls:'icon-preview',
                        handler:'onRefreshPendapatan'
                        
                    },{
                        
                        xtype:'button',
                        text:'Simpan',
                        iconCls:'icon-simpan',
                        handler:'onSavePendapatan'
                        
                    }
                    ]
                }
            
          
            },{   
                margin: '5 5 5 5',
                xtype:'grid',
                region:'east',   
                border:true,
                height:'100%',
                width:500,
                minWidth:500,
                id:'posting_potongan',   
                flex:1,
                
                store: 'storepostingpotongan',
                stripeRows: true,
                loadMask: true,
                stateful:true,
                stateId:'statepostingpotongan',
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
                        handler: 'onDeletePostingPendapatan' 
                    }]

                },
                {
                    text: 'Jenis',  
                    dataIndex: 'jenis',
                    align:'center',
                    width:150
                    ,
                    field:{
                        xtype:'combo',
                        id: 'posting_potonganjenis',                            
                        allowBlank: false,    
                        bind:{
                            store:'{refpostingpotongan}'
                        },                        
                        valueField: 'keterangan',
                        displayField: 'keterangan',
                        typeAhead: true,
                        triggerAction: 'all' ,
                        queryParam:'searchvalue',
                        width:150,
                        listeners:{
                            select:function( combo, records, eOpts ){
                                var gridstore=Ext.getCmp('posting_potongan').store;
                               var frec= gridstore.findRecord('jenis',records.get('keterangan'));
                                if(frec){
                                    combo.setValue(null);
                                    Ext.getCmp('posting_potongan').getPlugin().cancelEdit();
                                }
                                
                                
                            }
                        }
                    }
                },
                {
                    text: 'Kode',  
                    dataIndex: 'kode',
                    align:'center',
                    width:150
                    ,
                    field:{
                        xtype:'combo',                        
                        id: 'posting_potongankode',                            
                        allowBlank: false,                            
                        store: 'storepotongan',
                        valueField: 'kode',
                        displayField: 'keterangan',
                        typeAhead: true,
                        triggerAction: 'all' ,
                        queryParam:'searchvalue',
                        width:150,
                        listeners:{
                            select:function( combo, records, eOpts ){
                                var gridstore=Ext.getCmp('posting_potongan').store;
                               var frec= gridstore.findRecord('kode',records.get('kode'));
                                if(!frec){
                                    Ext.getCmp('posting_potonganketerangan').setValue(records.get('keterangan'));
                                }else{
                                    combo.setValue(null);
                                    Ext.getCmp('posting_potongan').getPlugin().cancelEdit();
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
                        id: 'posting_potonganketerangan',                                
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
                        text:'Add Potongan',
                        iconCls:'icon-grid',
                        handler:function(){
                            // empty record
                            var grid=Ext.getCmp('posting_potongan');
                            var str=grid.getStore();
                            var edit=grid.getPlugin();
                            var rec = new str.getModel();
                            grid.store.insert(0, rec);
                            edit.startEdit(0, 0);
                        }
                    } ,
                    {
                        
                        xtype:'button',
                        text:'Refresh',
                        iconCls:'icon-preview',
                        handler:'onRefreshPotongan'
                        
                    },
                    {
                        
                        xtype:'button',
                        text:'Simpan',
                        iconCls:'icon-simpan',
                        handler:'onSavePotongan'
                        
                    }
                    ]
                }
            }
            ]
            }
        ]
        ,listeners:{
        
                        show:function(){
                            var mycontroller=Ext.getCmp('tab1f4').getController();
                            mycontroller.onRefreshPendapatan();
                            mycontroller.onRefreshPotongan();
                        }
    }
    });
        