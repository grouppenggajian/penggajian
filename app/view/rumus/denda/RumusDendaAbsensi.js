
Ext.define('Penggajian.view.rumus.denda.RumusDendaAbsensi',{
    extend: 'Ext.container.Container',
    xtype:'TabRumusDendaAbsensi',
        alias: 'widget.RumusDendaAbsensi',
        title: 'Rumus Denda Absensi',        
        id: 'tab1g7',
    requires: [
        'Penggajian.view.rumus.denda.RumusDendaAbsensiController',
        'Penggajian.view.rumus.denda.RumusDendaAbsensiModel'
    ],

    controller: 'rumusdendaabsensi',
    viewModel: {
        type: 'rumusdendaabsensi'
    },

    height: '100%',
        closable: true,
        layout: 'border',
        
        items:  [
        {                
            xtype:'form',
            id:'rmsdendaabsensi_formnorth',
            region:'north',
            height:230,
            minHeight:230,
            layout:'anchor',
            defaults:{
              labelWidth:150,
              allowBlank:false
            },
            
            items:[
               {
                xtype: 'fieldset',
                anchor: '60%',
                layout: 'anchor',  
                margin: '0 5 3 5',
                padding: '5 5 3 10',
                height:180,
                defaults: {
                    hideEmptyLabel: true,
                    labelWidth:180,
                    allowBlank:false
                },
                items:[{
                               id:'rmsdendaabsensi_kategori_ijin',
                               afterLabelTextTpl: required_css, 
                               name : 'kategori_ijin',
                               hiddenName:'kategori_ijin',
                               xtype: 'combo',
                               fieldLabel:'Kategori Ijin',
                               
                               bind:
                                   {store:'{strkategori_ijin}'},
                                valueField: 'kode',
                                displayField: 'keterangan',
                                typeAhead: true,
                                triggerAction: 'all' ,
                                queryParam:'searchvalue',
                               width: 150,    
                               anchor:'90%',
                               listeners:{
                                   select:'onSelectDenda'
                               }
                               
                           },
                           {
                               id:'rmsdendaabsensi_tipe_ijin',
                               afterLabelTextTpl: required_css, 
                               name : 'tipe_ijin',
                               hiddenName:'tipe_ijin',
                               xtype: 'combo',
                               fieldLabel:'Tipe Ijin',                               
                               store:createArrayStore(datatipeijin),
                                valueField: 'mid',
                                displayField: 'mtext',
                                typeAhead: true,
                                triggerAction: 'all' ,
                                queryParam:'searchvalue',
                               width: 150,    
                               anchor:'90%',
                               listeners:{
                                   select:'onSelectDenda'
                               }
                               
                           },
                           
                        {
                               id:'rmsdendaabsensi_postpotongan',
                               afterLabelTextTpl: required_css, 
                               name : 'postpotongan',
                               hiddenName:'postpotongan',
                               xtype: 'combo',
                               fieldLabel:'Posting Potongan',
                               bind:
                                   {store:'{strpotongan}'},
                                valueField: 'kode',
                                displayField: 'keterangan',
                                typeAhead: true,
                                triggerAction: 'all' ,
                                queryParam:'searchvalue',
                               width: 150,    
                               anchor:'90%'
                               
                           },
                        {
                               id:'rmsdendaabsensi_pembagi',
                               afterLabelTextTpl: required_css, 
                               name : 'pembagi',
                               hiddenName:'pembagi',
                               xtype: 'combo',
                               fieldLabel:'Pembagi',
                               bind:
                                   {store:'{strrefrumus}'},
                                valueField: 'kode',
                                displayField: 'kode',
                                typeAhead: true,
                                triggerAction: 'all' ,
                                queryParam:'searchvalue',
                               width: 150,    
                               anchor:'90%'
                               
                           }]
               }
                
            ],tbar:{
                xtype:'toolbar',
                    //                    padding: '10 5 10 0',
                    items:[
                    {
                        
                        xtype:'button',
                        text:'Delete Rumus',
                        iconCls:'icon-delete',
                        handler:'onDeleteRumus'
                    } 
                    ]
            }
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
                id:'rmsdendaabsensi_pendapatan',   
                region:'center',
                border:true,
                height:'100%',
                flex:1,
                //            hideHeaders:true,
//                autoScroll:true,    
                bind:{
                    store:'{strdendapendapatan}'
                },
//                store: 'storermsdendaabsensipendapatan',
                stripeRows: true,
                loadMask: true,
                stateful:true,
                stateId:'statermsdendaabsensipendapatan',
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
                        handler: 'onDeletePendapatan' 
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
                        id: 'rmsdendaabsensi_kode',                            
                        //                                    afterLabelTextTpl: required_css,                                                                
                        hiddenName:'rmsdendaabsensi_kode',
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
                                var gridstore=Ext.getCmp('rmsdendaabsensi_pendapatan').store;
                               var frec= gridstore.findRecord('kode',records.get('kode'));
                                if(!frec){
                                    Ext.getCmp('rmsdendaabsensi_keterangan').setValue(records.get('keterangan'));
                                }else{
                                    combo.setValue(null);
                                    Ext.getCmp('rmsdendaabsensi_pendapatan').getPlugin().cancelEdit();
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
                        id: 'rmsdendaabsensi_keterangan',                                
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
                            var grid=Ext.getCmp('rmsdendaabsensi_pendapatan');
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
                id:'rmsdendaabsensi_pengali',   
                flex:1,
                //            hideHeaders:true,
//                autoScroll:true,           
                bind:{
                    store:'{strdendapengali}'
                },
                stripeRows: true,
                loadMask: true,
                stateful:true,
                stateId:'stateGridrmsdendaabsensipengali',
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
                                    id: 'rmsdendaabsensi_status',                            
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
                                            var gridstore=Ext.getCmp('rmsdendaabsensi_pengali').store;
                                           var frec= gridstore.findRecord('status',records.get('name'));
                                            if(frec){
                                                combo.setValue(null);
                                                Ext.getCmp('rmsdendaabsensi_pengali').getPlugin().cancelEdit();
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
                        id: 'rmsdendaabsensi_nilaikali',
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
                            var grid=Ext.getCmp('rmsdendaabsensi_pengali');
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
                formBind:true,
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
