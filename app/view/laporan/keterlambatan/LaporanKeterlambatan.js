
Ext.define('Penggajian.view.laporan.keterlambatan.LaporanKeterlambatan',{
    extend: 'Ext.container.Container',
    xtype: 'TabLaporanKeterlambatan',
    alias: 'widget.TabLaporanKeterlambatan',
    requires: [
        'Penggajian.view.laporan.keterlambatan.LaporanKeterlambatanController',
        'Penggajian.view.laporan.keterlambatan.LaporanKeterlambatanModel',
        'Penggajian.view.laporan.keterlambatan.LaporanKeterlambatanNikEditor',
        'Penggajian.view.laporan.WinPrint'
    ],

    controller: 'laporanketerlambatan',
    viewModel: {
        type: 'laporanketerlambatan'
    },

    title: 'Laporan Keterlambatan',
    id: 'tab3a',
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
                                padding:'18 5 5 5',
                                items:[
                                    {xtype:'fieldcontainer'
                                        ,anchor:'100%'  
                                        ,layout:'hbox'
                                        ,padding:'5 5 2 8'
                                        ,defaults:{
                                            padding:'0 0 0 5',
                                            labelWidth:100
                                        }
                                        ,items:[{
                                                xtype:'checkbox',
                                                id:'lapterlambat_nik_check',
                                                name:'check_nik',
                                                listeners:{
                                                    change:function( me, newValue, oldValue, eOpts ){                                                
                                                        if(!newValue){
                                                            Ext.getCmp('lapterlambat_nik').setValue('');
                                                            Ext.getCmp('lapterlambat_nama').setValue('');
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
                                                },flex:1,

                                                items: [
                                            
                                                    {
                                                        xtype:'twincombo',
                                                        id:'lapterlambat_nik',        
                                                        afterLabelTextTpl: required_css,                        
//                                                        fieldLabel: 'NIK',
                                                        menu:'lapterlambat_nik_editor',                                    
                                                        name: 'nik',
                                                        itemId: 'itemIdlapterlambat_nik' ,
                                                        width:120  
                                                    },
                                                    {
                                                        flex: 1,
                                                        itemId: 'itemIdlapterlambat_nama',
                                                        id:'lapterlambat_nama',
                                                        name: 'nama',
                                                        readOnly:true

                                                    }]
                                            },
                                        ]
                                    },
                                    {xtype:'fieldcontainer'
                                        ,anchor:'100%'  
                                        ,layout:'hbox'
                                        ,padding:'5 5 2 8'
                                        ,defaults:{
                                            padding:'0 0 0 5',
                                            labelWidth:100
                                        }
                                        ,items:[{
                                                xtype:'checkbox',
                                                id:'lapterlambat_jabatan_check',
                                                name:'check_jabatan',
                                                listeners:{
                                                    change:function( me, newValue, oldValue, eOpts ){                                                
                                                        if(!newValue){
                                                            Ext.getCmp('lapterlambat_kodejabatan').setValue(null);
//                                                            Ext.getCmp('lapterlambat_namajabatan').setValue('');
                                                        }
                                                    }
                                                }
                        
                                            },{
                                                        xtype:'combo',
                                                        name: 'kode_jabatan',
                                                        id: 'lapterlambat_kodejabatan',                        
//                                                        afterLabelTextTpl: required_css,                        
                                                        fieldLabel: 'Jabatan',                                                        
                                                        hiddenName:'kode_jabatan',
                                                        allowBlank: false,                                             
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
                            },
                            //-----------------
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
                                        xtype:'fieldset'
                                        ,id:'lapterlambat_periode'                                        
                                        ,checkboxToggle:true,
                                        title: 'Periode',
                                        defaultType: 'textfield',
                                        collapsed: false,  
                                        width:390,
                                        layout: 'anchor',
                                        defaults: {
                                            anchor: '100%'
                                        },
                                        items :[

                                            {
                                                xtype: 'datefield',
                                                name: 'tglawal',
//                                                vtype:'daterange',
//                                                endDateField: 'lapterlambat_tglakhir',
                                                //                                                afterLabelTextTpl: required_css,
                                                fieldLabel: 'Mulai',
                                                format:'Y-m-d',
                                                anchor: '90%'
                                                ,id:'lapterlambat_tglawal'
                                            },
                                            {
                                                xtype: 'datefield',
                                                name: 'tglakhir',
//                                                vtype:'daterange',
//                                                startDateField:  'lapterlambat_tglawal',
                                                //                                                afterLabelTextTpl: required_css,
                                                fieldLabel: 'Selesai',
                                                anchor: '90%',
                                                format:'Y-m-d'
                                                ,id:'lapterlambat_tglakhir'
                                            }]
                                    }
                                ]
                            }
                        ],
                        bbar:{
                                xtype:'toolbar',
                                style: 'background-color: #5FA2DD;',
                                items:[
                                    {
                                text:'Search',
                                iconCls:Ext.baseCSSPrefix + 'form-search-trigger',
                                handler:'onClickSearch'//Ext.Date.format(valuedate, dateformat);
                            },
                            {
                                text:'Report',
                                iconCls:'icon-preview_report',
                                handler:'onClickReport'//Ext.Date.format(valuedate, dateformat);
                            }
                                ]
                            }
                    },
                    {
        xtype:'grid',
        id:'idlapterlambatlist',
        region:'center',
        border:true,
        bind:{
            store:'{strlapterlambat}'
        },        
        columns: [                   
            {
            text:'Tanggal',
            dataIndex:'tgl',
            sortable:true,
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
            text:'Kode Jabatan',
            dataIndex:'kode_jabatan',
            sortable:false,
            width:170,
            hidden:true,
            align:'left'
        }, {
            text:'Jabatan',
            dataIndex:'nama_jabatan',
            sortable:false,
            width:170,
            hidden:false,
            align:'left'
        }, {
            text:'DescJabatan',
            dataIndex:'jabatan',
            sortable:false,
            width:170,
            hidden:true,
            align:'left'
        },    
           
         {
            text:'Terlambat',
            dataIndex:'terlambat',
            sortable:true,
            width:120,
            hidden:false,
            align:'center'
        },{
            text:'Ijin',
            dataIndex:'tidakmasukijin',
            sortable:false,
            width:120,
            hidden:false,
            align:'center',
            xtype:'checkcolumn',
            processEvent:function ( type , view , cell , recordIndex , cellIndex , e , record , row ){
                return false;
            }
        },{
            text:'Tanpa Ijin',
            dataIndex:'tidakmasuktanpaijin',
            sortable:false,
            width:120,
            hidden:false,
            align:'center',
            xtype:'checkcolumn',
            processEvent:function ( type , view , cell , recordIndex , cellIndex , e , record , row ){
                return false;
            }
        },{
            text:'Sakit',
            dataIndex:'sakit',
            sortable:false,
            width:120,
            hidden:false,
            align:'center',
            xtype:'checkcolumn',
            processEvent:function ( type , view , cell , recordIndex , cellIndex , e , record , row ){
                return false;
            }
        },{
            text:'Cuti',
            dataIndex:'cuti',
            sortable:false,
            width:120,
            hidden:false,
            align:'center',
            xtype:'checkcolumn',
            processEvent:function ( type , view , cell , recordIndex , cellIndex , e , record , row ){
                return false;
            }
        }
        ],
        bbar: [
            
            {
            xtype: 'pagingtoolbar',
            displayInfo: true,
            pageSize: 10,
            bind:{
                store:'{strlapterlambat}'
            }   
        }]
        }
            ]
        }
    ]
});
