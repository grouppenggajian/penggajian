Ext.define('Penggajian.view.rumus.keterlambatan.RmsKeterlambatan',
    {
        extend: 'Ext.container.Container',
        xtype:'TabRumusKeterlambatan',
        alias: 'widget.RumusKeterlambatan',
        title: 'Rumus Keterlambatan',        
        id: 'tab1g6',
        requires:[
        'Penggajian.view.rumus.keterlambatan.RmsKeterlambatanController' ,
        'Penggajian.view.rumus.keterlambatan.RmsKeterlambatanModel' 
        ],
        controller:'rmsketerlambatan',
        viewModel:'rmsketerlambatan',
        
        height: '100%',
        closable: true,
        layout: 'border',
        
        items:  [
//        {                
//            xtype:'form',
//            region:'north',
//            height:80,
//            minHeight:80,
//            layout:'anchor',
//            items:[
//            {
//                xtype: 'fieldset',
//                anchor: '48%',
//                layout: 'anchor',  
//                margin: '10 5 3 5',
//                padding: '10 5 3 10',
//                defaults: {
//                    hideEmptyLabel: true,
//                    labelWidth:150  
//                },
//                items: [
//                    {
//                               id:'rmsketerlambatan_postpotongan',
//                               name : 'postpotongan',
//                               xtype: 'combo',
//                               fieldLabel:'Posting Potongan',
//                               bind:
//                                   {store:'{storepotong}'},
//                                valueField: 'kode',
//                                displayField: 'keterangan',
//                                typeAhead: true,
//                                triggerAction: 'all' ,
//                                queryParam:'searchvalue',
//                               width: 150,    
//                               anchor:'70%'
//                               
//                           },
//
//                ]
//            }
//            ]
//        },
        {                
            xtype:'form',
            region:'center',
            layout:'hbox',
            buttonAlign:'center',
            items:[
            //              
            {   
                margin: '5 5 5 5',
                xtype:'grid',                 
                id:'rmsketerlambatan_pendapatan',   
                region:'center',
                border:true,
                height:'100%',
                flex:1,
                //            hideHeaders:true,
//                autoScroll:true,           
                store: 'storerumusketerlambatanpendapatan',
                stripeRows: true,
                loadMask: true,
                stateful:true,
                stateId:'statermsketerlambatanpendapatan',
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
                        handler: 'onDeletePendapatanKeterlambatan' 
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
                        id: 'rmsketerlambatan_kode',                            
                        //                                    afterLabelTextTpl: required_css,                                                                
                        hiddenName:'rmsketerlambatan_kode',
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
                                var gridstore=Ext.getCmp('rmsketerlambatan_pendapatan').store;
                               var frec= gridstore.findRecord('kode',records.get('kode'));
                                if(!frec){
                                    Ext.getCmp('rmsketerlambatan_keterangan').setValue(records.get('keterangan'));
                                }else{
                                    combo.setValue(null);
                                    Ext.getCmp('rmsketerlambatan_pendapatan').getPlugin().cancelEdit();
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
                        id: 'rmsketerlambatan_keterangan',                                
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
                            var grid=Ext.getCmp('rmsketerlambatan_pendapatan');
                            var str=grid.getStore();
                            var edit=grid.getPlugin();
//                            var rec = new Penggajian.view.rumus.keterlambatan.WriterPendapatan({
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
            ,{   
                margin: '5 5 5 5',
                xtype:'grid',
                region:'east',   
                border:true,
                height:'100%',
                width:580,
                minWidth:580,
                id:'rmsketerlambatan_pengali',   
                flex:1,
                //            hideHeaders:true,
//                autoScroll:true,           
                store: 'storerumusketerlambatanpengali',
                stripeRows: true,
                loadMask: true,
                stateful:true,
                stateId:'stateGridRmsketerlambatanpengali',
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
//                        ,
//                        beforeEdit:function ( editor , context , eOpts ) {
//                            context.grid.store.on('update',
//                            function ( store , record , operation , modifiedFieldNames , details , eOpts ){
//                                var recfind=store.queryRecordsBy( function(rec,id){
//                                    return (rec.get('status') == record.get('status') 
//                                        && rec.get('id')!= record.get('id')
//                                        && rec.get('ordernum')==record.get('ordernum'));
//                                });
//                                if (recfind.length > 0)
//                                {
//                                    recfind=store.queryRecordsBy( function(rec,id){
//                                       return (rec.get('status') == record.get('status') 
//                                           && rec.get('id')!= record.get('id')
//                                           );
//                                    });   
//                                    var maxId = recfind[0].get('ordernum'); // initialise to the first record's id value.
//                                    Ext.each(recfind,function(rec) // go through all the records
//                                    {
//                                      maxId = Math.max(maxId, rec.get('ordernum'));
//                                    });
//                                    
//                                          record.set('ordernum',maxId+1);
//                                    
//                                }
//                                
//                                
//                            });
//
//                        }
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
                        handler: 'onDeletePengali' 
                    }]
                
                },
                {
                    text: 'Status',  
                    dataIndex: 'status',
                    align:'left',
                    editor:{
                                    xtype:'combo',
                                    name: 'status',
                                    id: 'rmsketerlambatan_status',                            
                                    hiddenName:'status',
                                    allowBlank: false,    
                                    bind:{
                                        store: '{strjenisharikerja}'
                                    },
//                                    store: createArrayStore(datastatuslembur),
                                    valueField: 'name',
                                    displayField: 'name',
                                    typeAhead: true,
                                    triggerAction: 'all' ,                                   
                                    width:190,
                                    listeners:{
                                        select:function( combo, records, eOpts ){
                                            var gridstore=Ext.getCmp('rmsketerlambatan_pengali').store;
                                           var frec= gridstore.findRecord('status',records.get('name'));
                                            if(frec){
                                                combo.setValue(null);
                                                Ext.getCmp('rmsketerlambatan_pengali').getPlugin().cancelEdit();
                                            }


                                        }
                                    }
                                }
                },
                {
                    text: 'Nilai',  
                    dataIndex: 'nilaikali',
                    align:'center',
                    width:80,
                    xtype:'numbercolumn',
                    format:'0,000.00',
                    editor:{
                        xtype: 'numberfield',
                        id: 'rmsketerlambatan_nilaikali',
                        name:'nilaikali',
                        hiddenName:'nilaikali',                        
                        allowBlank: false,   
                        hideTrigger: true,
                        minValue:0,
                        value:0,
                        allowDecimals:true,
                    decimalSeparator:'.'
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
                        text:'Add Range',
                        iconCls:'icon-grid',
                        handler:function(){
                            // empty record
                            var grid=Ext.getCmp('rmsketerlambatan_pengali');
                            var str=grid.getStore();
                            var edit=grid.getPlugin();
//                            var rec = new Penggajian.view.rumus.keterlambatan.WriterPendapatan({
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