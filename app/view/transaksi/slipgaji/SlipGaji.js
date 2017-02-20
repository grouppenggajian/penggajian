
Ext.define('Penggajian.view.transaksi.slipgaji.SlipGaji',{
    extend: 'Ext.container.Container',
    xtype: 'TabSlipGaji',
    alias: 'widget.SlipGaji',
    requires: [
    'Penggajian.view.transaksi.slipgaji.SlipGajiController',
    'Penggajian.view.transaksi.slipgaji.SlipGajiModel',
    'Penggajian.view.transaksi.slipgaji.SlipGajiNikEditor',
    'Penggajian.view.laporan.WinPrint'
    ],

    controller: 'transaksi-slipgaji-slipgaji',
    viewModel: {
        type: 'transaksi-slipgaji-slipgaji'
    },
    
    id: 'tab2g6',
    title: 'Slip Gaji',
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
            bodyPadding: '3 5 3 5',
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
                padding:'3 5 3 5',
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
                        id:'slipgaji_nik_check',
                        name:'check_nik',
                        listeners:{
                            change:function( me, newValue, oldValue, eOpts ){                                                
                                if(!newValue){
                                    Ext.getCmp('slipgaji_nik').setValue('');
                                    Ext.getCmp('slipgaji_nama').setValue('');
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
                            id:'slipgaji_nik',        
                            afterLabelTextTpl: required_css,                        
                            //                                                        fieldLabel: 'NIK',
                            menu:'slipgaji_nik_editor',                                    
                            name: 'nik',
                            itemId: 'itemIdslipgaji_nik' ,
                            width:120  
                        },
                        {
                            flex: 1,
                            itemId: 'itemIdslipgaji_nama',
                            id:'slipgaji_nama',
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
                        id:'slipgaji_jabatan_check',
                        name:'check_jabatan',
                        listeners:{
                            change:function( me, newValue, oldValue, eOpts ){                                                
                                if(!newValue){
                                    Ext.getCmp('slipgaji_kodejabatan').setValue(null);
                                //                                                            Ext.getCmp('slipgaji_namajabatan').setValue('');
                                }
                            }
                        }
                        
                    },{
                        xtype:'combo',
                        name: 'kode_jabatan',
                        id: 'slipgaji_kodejabatan',                        
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
                padding:'3 5 3 5',
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
                        id:'slipgaji_periode_check',
                        name:'check_periode',
                        listeners:{
                            change:function( me, newValue, oldValue, eOpts ){                                                
                                if(!newValue){
                                    Ext.getCmp('slipgaji_periode').setValue(null);
                                //                                                            Ext.getCmp('slipgaji_namajabatan').setValue('');
                                }
                            }
                        }
                        
                    },{
                        xtype:'monthfield',
                        name: 'periode',
                        id: 'slipgaji_periode',                        
                        fieldLabel: 'Periode',   
                        format:'Y-F',
                        hiddenName:'periode',                                                
                        width:350  ,
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
                    text:'Slip Gaji Preview',
                    iconCls:'icon-preview_report',
                    handler:'onClickReport'//Ext.Date.format(valuedate, dateformat);
                }
                ]
            }
        },{
            xtype:'gridexporter',
            id:'idslipgajilist',
            title:'SLIP GAJI',
            preventHeader:true,
            region:'center',    
            border:true,
            bind:{
                store: '{storeslipgaji}'
            },        
            columns: [            
            {
                text: 'NIK',  
                dataIndex: 'nik',
                align:'center',
                width:100
            },
            {
                text: 'Nama', 
                dataIndex: 'nama', 
                align:'left',
                width:200
            },
            {
                text: 'Jabatan', 
                dataIndex: 'jabatan', 
                align:'left',
                width:200
            }
       
            ],

            bbar: [
                
            {
                xtype: 'pagingtoolbar',
                displayInfo: true,
                pageSize: 10,
                bind:{
                    store: '{storeslipgaji}'
                }
                
            }
            ]
        }
        
        ]
    }
    ] ,
            listeners:{
                show:'onShow'
                        }
   
    
    
});
