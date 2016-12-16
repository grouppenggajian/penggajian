Ext.define('Penggajian.view.rumus.lembur.RmsLembur',
    {
        extend: 'Ext.container.Container',
        xtype:'TabRumusLembur',
        alias: 'widget.RumusLembur',
        title: 'Rumus Lembur',        
        id: 'tab1g3',
        requires:[
        'Penggajian.view.rumus.lembur.RmsLemburController' 
        ],
        controller:'rmslembur',
        
        height: '100%',
        closable: true,
        layout: 'border',
        
        items:  [
        {                
            xtype:'form',
            region:'north',
            height:80,
            minHeight:80,
            layout:'anchor',
            items:[
            {
                xtype: 'fieldset',
                anchor: '48%',
                layout: 'anchor',  
                margin: '10 5 3 5',
                padding: '10 5 3 10',
                defaults: {
                    hideEmptyLabel: true
                },
                items: [
                {
                    xtype: 'numberfield',
                    id: 'rmslembur_pembagi',
                    name:'nilai',
                    hiddenName:'nilai',
                    fieldLabel: 'Pembagi',
                    fieldStyle: 'text-align: right;' ,
                    allowBlank: false,   
                    hideTrigger: true,
                    minValue:0,
                    value:0,
                    labelWidth: 90,                        
                    labelAlign: 'left',                        
                    anchor:'50%',
                    width:150
                }
                ]
            }
            ]
        },
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
                id:'rmslembur_pendapatan',   
                region:'center',
                border:true,
                height:'100%',
                flex:1,
                //            hideHeaders:true,
//                autoScroll:true,           
                store: 'storerumuslemburpendapatan',
                stripeRows: true,
                loadMask: true,
                stateful:true,
                stateId:'statermslemburpendapatan',
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
                        handler: 'onDeletePendapatanLembur' 
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
                        id: 'rmslembur_kode',                            
                        //                                    afterLabelTextTpl: required_css,                                                                
                        hiddenName:'rmslembur_kode',
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
                                var gridstore=Ext.getCmp('rmslembur_pendapatan').store;
                               var frec= gridstore.findRecord('kode',records.get('kode'));
                                if(!frec){
                                    Ext.getCmp('rmslembur_keterangan').setValue(records.get('keterangan'));
                                }else{
                                    combo.setValue(null);
                                    Ext.getCmp('rmslembur_pendapatan').getPlugin().cancelEdit();
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
                        id: 'rmslembur_keterangan',                                
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
                            var grid=Ext.getCmp('rmslembur_pendapatan');
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
            ,{   
                margin: '5 5 5 5',
                xtype:'grid',
                region:'east',   
                border:true,
                height:'100%',
                width:580,
                minWidth:580,
                id:'rmslembur_pengali',   
                flex:1,
                //            hideHeaders:true,
//                autoScroll:true,           
                store: 'storerumuslemburpengali',
                stripeRows: true,
                loadMask: true,
                stateful:true,
                stateId:'stateGridRmslemburpengali',
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
                        beforeEdit:function ( editor , context , eOpts ) {
                            context.grid.store.on('update',
                            function ( store , record , operation , modifiedFieldNames , details , eOpts ){
                                var recfind=store.queryRecordsBy( function(rec,id){
                                    return (rec.get('status') == record.get('status') 
                                        && rec.get('id')!= record.get('id')
                                        && rec.get('ordernum')==record.get('ordernum'));
                                });
                                if (recfind.length > 0)
                                {
                                    recfind=store.queryRecordsBy( function(rec,id){
                                       return (rec.get('status') == record.get('status') 
                                           && rec.get('id')!= record.get('id')
                                           );
                                    });   
                                    var maxId = recfind[0].get('ordernum'); // initialise to the first record's id value.
                                    Ext.each(recfind,function(rec) // go through all the records
                                    {
                                      maxId = Math.max(maxId, rec.get('ordernum'));
                                    });
                                    
                                          record.set('ordernum',maxId+1);
                                    
                                }
                                
                                
                            });

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
                                    id: 'rmslembur_status',                            
                                    hiddenName:'status',
                                    allowBlank: false,                            
                                    store: createArrayStore(datastatuslembur),
                                    valueField: 'mid',
                                    displayField: 'mtext',
                                    typeAhead: true,
                                    triggerAction: 'all' ,                                   
                                    width:190                            
                                }
                },
                {
                    text: 'Jam Ke',  
                    dataIndex: 'jam_ke',
                    align:'center',
                    width:80,
                    xtype:'numbercolumn',
                    format:'0,000',
                    editor:{
                        xtype: 'numberfield',
                        id: 'rmslembur_jamke',
                        name:'jam_ke',
                        hiddenName:'jam_ke',                        
                        allowBlank: false,   
                        hideTrigger: true,
                        minValue:0,
                        value:0
                    }
                },
                {
                    text: 'Min',  
                    dataIndex: 'min_jam',
                    align:'center',
                    width:80,
                    xtype:'numbercolumn',
                    format:'0,000',
                    editor:{
                        xtype: 'numberfield',
                        id: 'rmslembur_minjam',
                        name:'min_jam',
                        hiddenName:'min_jam',                        
                        allowBlank: false,   
                        hideTrigger: true,
                        minValue:0,
                        value:0
                    }
                },
                {
                    text: 'Max',  
                    dataIndex: 'max_jam',
                    align:'center',
                    width:80,
                    xtype:'numbercolumn'
                    ,format:'0,000',
                    editor:{
                        xtype: 'numberfield',
                        id: 'rmslembur_maxjam',
                        name:'max_jam',
                        hiddenName:'max_jam',                        
                        allowBlank: false,   
                        hideTrigger: true,
                        minValue:0,
                        value:0
                    }
                },{
                    text: 'Nilai',  
                    dataIndex: 'nilaikali',
                    align:'center',
                    width:80,
                    xtype:'numbercolumn'
                    ,format:'0,000',
                    editor:{
                        xtype: 'numberfield',
                        id: 'rmslembur_nilaikali',
                        name:'nilaikali',
                        hiddenName:'nilaikali',                        
                        allowBlank: false,   
                        hideTrigger: true,
                        minValue:0,
                        value:0
                    }
                },
                {
                    text: 'Order',  
                    dataIndex: 'ordernum',
                    align:'center',
                    width:80,
                    xtype:'numbercolumn'
                    ,format:'0,000',
                    editor:{
                        xtype: 'numberfield',
                        id: 'rmslembur_ordernum',
                        name:'ordernum',
                        hiddenName:'ordernum',                        
                        allowBlank: false,   
                        hideTrigger: true,
                        minValue:0,
                        value:0,
                        enableKeyEvents:false,
                        listeners:{
                            keyup:function(me, e, eOpts){
                                var vstatus=Ext.getCmp('rmslembur_status').getValue();
                                var storelembur=Ext.getCmp('rmslembur_pengali').store;
                                console.log(eOpts);
                                var recfind=storelembur.queryRecordsBy( function(record,id){
                                    return (record.get('status') == vstatus);
                                });
//                                console.log(recfind);
                                if (recfind.length > 0)
                                {
                                  var maxId = recfind[0].get('ordernum'); // initialise to the first record's id value.
                                  Ext.each(recfind,function(rec) // go through all the records
                                  {
                                    maxId = Math.max(maxId, rec.get('ordernum'));
                                  });
                                }
                                console.log(maxId);
                                if (me.getValue()<maxId){
                                    me.setValue(maxId+1);
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
                        text:'Add Range',
                        iconCls:'icon-grid',
                        handler:function(){
                            // empty record
                            var grid=Ext.getCmp('rmslembur_pengali');
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