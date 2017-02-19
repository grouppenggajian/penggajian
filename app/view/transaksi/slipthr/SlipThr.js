
Ext.define('Penggajian.view.transaksi.slipthr.SlipThr',{
    extend: 'Ext.container.Container',
    xtype: 'TabSlipThr',
    alias: 'widget.SlipThr',
    requires: [
    'Penggajian.view.transaksi.slipthr.SlipThrController',
    'Penggajian.view.transaksi.slipthr.SlipThrModel',
    'Penggajian.view.transaksi.slipthr.SlipThrNikEditor',
    'Penggajian.view.laporan.WinPrint'
    
//    ,
//    'Penggajian.view.transaksi.slipthr.SlipThrNikEditor'
    ],

    controller: 'transaksi-slipthr-slipthr',
    viewModel: {
        type: 'transaksi-slipthr-slipthr'
    },

    id: 'tab2h5',
    title: 'Slip Thr',
    closable: true,        
    layout: 'fit', 
    items:[
    {
        xtype:'panel',
        layout:'border',
        items:[
        {
            //                        xtype:'form',
            region: 'north',                    
            layout: 'column',
            border: false,                        
            bodyPadding: '3 5 5 5',
            //                        defaults: { 
            //                            labelSeparator: '',
            //                            labelWidth: 80
            //                        },
            items:[
            {
                columnWidth: 1/2,
                border:false,
                //                                bodyStyle:'padding:5px',
                layout:'anchor',
                defaults: {
                    anchor: '100%',
                    labelAlign: 'left',
                    labelSeparator: '',
                    allowBlank: true,
                    labelWidth: 100
                },
                padding:'3 5 5 5',
                items:[
                {
                    xtype:'fieldcontainer',
                    anchor:'100%',
                    layout:'hbox',
                    padding:'5 5 2 8',
                    defaults:{
                        padding:'0 0 0 5',
                        labelWidth:100
                    },
                    items:[{
                        xtype:'checkbox',
                        id:'slipthr_nik_check',
                        name:'check_nik',
                        listeners:{
                            change:function( me, newValue, oldValue, eOpts ){                                                
                                if(!newValue){
                                    Ext.getCmp('slipthr_nik').setValue('');
                                    Ext.getCmp('slipthr_nama').setValue('');
                                }
                            }
                        }
                        
                    },
                    {
                        xtype: 'fieldcontainer',
                        fieldLabel: 'Nama',
                        //                                                afterLabelTextTpl: required_css,
                        //                    labelStyle: 'font-weight:bold;padding:0;',
                        layout: 'hbox',
                        defaultType: 'textfield',

                        fieldDefaults: {
                            labelAlign: 'left'
                        },
                        flex:1,

                        items: [
                                            
                        {
                            xtype:'twincombo',
                            id:'slipthr_nik',        
                            afterLabelTextTpl: required_css,                        
                            //                                                        fieldLabel: 'NIK',
                            menu:'slipthr_nik_editor',                                    
                            name: 'nik',
                            itemId: 'itemIdslipthr_nik' ,
                            width:120  
                        },
                        {
                            flex: 1,
                            itemId: 'itemIdslipthr_nama',
                            id:'slipthr_nama',
                            name: 'nama',
                            readOnly:true

                        }]
                    },
                    ]
                },
                {
                    xtype:'fieldcontainer',
                    anchor:'100%',
                    layout:'hbox',
                    padding:'5 5 2 8',
                    defaults:{
                        padding:'0 0 0 5',
                        labelWidth:100
                    },
                    items:[{
                        xtype:'checkbox',
                        id:'slipthr_jabatan_check',
                        name:'check_jabatan',
                        listeners:{
                            change:function( me, newValue, oldValue, eOpts ){                                                
                                if(!newValue){
                                    Ext.getCmp('slipthr_kodejabatan').setValue(null);
                                //                                                            Ext.getCmp('slipthr_namajabatan').setValue('');
                                }
                            }
                        }
                        
                    },{
                        xtype:'combo',
                        name: 'kode_jabatan',
                        id: 'slipthr_kodejabatan',                        
                        //                                                        afterLabelTextTpl: required_css,                        
                        fieldLabel: 'Jabatan',                                                        
                        hiddenName:'kode_jabatan',
                        allowBlank: true,                                             
                        store: 'storejabatancombo',
                        valueField: 'kode_jabatan',
                        displayField: 'nama_jabatan',
                        typeAhead: true,
                        triggerAction: 'all' ,
                        hideTrigger:false,
                        queryParam:'searchvalue',
                        width:250  ,
                        flex:1,
                        readOnly:false
                    }
                                            
                    ]
                }
                ]
            }
            //-----------------
            ,{
                columnWidth: 1/2,
                border:false,
                //                                bodyStyle:'padding:5px',
                layout:'anchor',
                defaults: {
                    anchor: '100%',
                    labelAlign: 'left',
                    labelSeparator: '',
                    allowBlank: true,
                    labelWidth: 100
                },
                padding:'3 5 5 5',
                items:[
                                                
                {
                    xtype:'fieldcontainer',
                    anchor:'100%',
                    layout:'hbox',
                    padding:'5 5 2 8',
                    defaults:{
                        padding:'0 0 0 5',
                        labelWidth:100,
                        allowBlank: true
                    },
                    items:[{
                        xtype:'checkbox',
                        id:'slipthr_tahun_check',
                        name:'check_tahun',
                        listeners:{
                            change:function( me, newValue, oldValue, eOpts ){                                                
                                if(!newValue){
                                    Ext.getCmp('slipthr_tahun').setValue(null);
                                //                                                            Ext.getCmp('slipthr_namajabatan').setValue('');
                                }
                            }
                        }
                        
                    },{
                        xtype:'numberfield',
                        name: 'tahun',
                        id: 'slipthr_tahun',                        
                        fieldLabel: 'Tahun',   
                        format:'Y-F',
                        hiddenName:'tahun', 
                        value:new Date().getFullYear(),
                        minValue:2000,
                        width:250  ,
                        //                        flex:1,
                        readOnly:false
                    }
                                            
                    ]
                }
                ]
            }
            ],
            bbar:{
                xtype:'toolbar',
                //                style: 'background-color: #5FA2DD;',
                items:[
                {
                    text:'Search',
                    iconCls:Ext.baseCSSPrefix + 'form-search-trigger',
                    handler:'onClickSearch'//Ext.Date.format(valuedate, dateformat);
                },
                {
                    text:'Slip Thr Preview',
                    iconCls:'icon-preview_report',
                    handler:'onClickReport'//Ext.Date.format(valuedate, dateformat);
                }
                ]
            }
        },{
            xtype:'grid',
            id:'idslipthrlist',
            region:'center',
            bind:{
                store:'{strslipthr}'
            },        
            columns: [
            {
            xtype: 'actioncolumn',
            header: 'View Bayar',
            menuDisabled: true,
            sortable: false,   
            align:'center',
            width: 100,
            items: [
            {
                iconCls: 'icon-preview_report',
                tooltip: 'History Payment Thr',
                handler: 'onViewBayar' 
            }]
                                
        },                  
            {
                text:'Tahun',
                dataIndex:'tahun',
                sortable:false,
                width:100,
                hidden:false,
                align:'center'
            },
            {
                text:'NIK',
                dataIndex:'nik',
                sortable:false,
                width:100,
                hidden:false,
                align:'center'
            },

            {
                text:'Nama',
                dataIndex:'nama',
                sortable:false,
                width:150,
                hidden:false,
                align:'left'
            }, {
                text:'Jabatan',
                dataIndex:'jabatan',
                sortable:false,
                width:170,
                hidden:false,
                align:'left'
            },    
            {
                text:'Tgl Masuk',
                dataIndex:'tglmasuk',
                sortable:true,
                width:100,
                hidden:false,
                align:'center'
            },    
            {
                text:'Tgl THR',
                dataIndex:'tglthr',
                sortable:true,
                width:100,
                hidden:false,
                align:'center'
            },{
                text:'Masa Kerja',
                dataIndex:'masakerja',
                sortable:false,
                width:170,
                hidden:false,
                align:'left'
            },{
                text:'Nilai',            
                dataIndex:'nilai',
                sortable:false,
                width:100,
                hidden:false,
                align:'right',
                xtype:'numbercolumn',
                format:'0,0.00'
            }
            ],
            bbar: [
            
            {
                xtype: 'pagingtoolbar',
                displayInfo: true,
                pageSize: 10,
                bind:{
                    store:'{strslipthr}'
                }   
            }]
        }
        ]
    }
    ]
});
