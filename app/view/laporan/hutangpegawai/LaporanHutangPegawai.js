
Ext.define('Penggajian.view.laporan.hutangpegawai.LaporanHutangPegawai',{
    extend: 'Ext.container.Container',
    xtype: 'TabLaporanHutangPegawai',
    alias: 'widget.TabLaporanHutangPegawai',
    requires: [
    'Penggajian.view.laporan.hutangpegawai.LaporanHutangPegawaiController',
    'Penggajian.view.laporan.hutangpegawai.LaporanHutangPegawaiModel',
    'Penggajian.view.laporan.hutangpegawai.LaporanHutangPegawaiInput',
    'Penggajian.view.laporan.WinPrint'
    ],

    controller: 'laporan-hutangpegawai-laporanhutangpegawai',
    viewModel: {
        type: 'laporan-hutangpegawai-laporanhutangpegawai'
    },

    title: 'Hutang Pegawai',
    id: 'tab3c',
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
                        id:'laphutang_nik_check',
                        name:'check_nik',
                        listeners:{
                            change:function( me, newValue, oldValue, eOpts ){                                                
                                if(!newValue){
                                    Ext.getCmp('laphutang_nik').setValue('');
                                    Ext.getCmp('laphutang_nama').setValue('');
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
                            id:'laphutang_nik',        
                            afterLabelTextTpl: required_css,                        
                            //                                                        fieldLabel: 'NIK',
                            menu:'laphutang_nik_editor',                                    
                            name: 'nik',
                            itemId: 'itemIdlaphutang_nik' ,
                            width:120  
                        },
                        {
                            flex: 1,
                            itemId: 'itemIdlaphutang_nama',
                            id:'laphutang_nama',
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
                        id:'laphutang_jabatan_check',
                        name:'check_jabatan',
                        listeners:{
                            change:function( me, newValue, oldValue, eOpts ){                                                
                                if(!newValue){
                                    Ext.getCmp('laphutang_kodejabatan').setValue(null);
                                //                                                            Ext.getCmp('laphutang_namajabatan').setValue('');
                                }
                            }
                        }
                        
                    },{
                        xtype:'combo',
                        name: 'kode_jabatan',
                        id: 'laphutang_kodejabatan',                        
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
                },{
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
                        id:'laphutang_statuslunas_check',
                        name:'check_jabatan',
                        listeners:{
                            change:function( me, newValue, oldValue, eOpts ){                                                
                                if(!newValue){
                                    Ext.getCmp('laphutang_status_lunas').setValue(false);
                                //                                                            Ext.getCmp('laphutang_namajabatan').setValue('');
                                }
                            }
                        }
                        
                    },{
                        xtype:'checkboxfield',
                        name: 'status_lunas',
                        id: 'laphutang_status_lunas',                        
                        fieldLabel: 'Status Lunas',   
                        boxLabel  : '<span style="color:#6691C8;">Lunas</span>',                                                       
                        hiddenName:'status_lunas',                                                
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
                                                    xtype:'fieldset'
                                                    ,id:'laphutang_periode'                                        
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
            //                                                endDateField: 'laphutang_tglakhir',
                                                            //                                                afterLabelTextTpl: required_css,
                                                            fieldLabel: 'Mulai',
                                                            format:'Y-m-d',
                                                            anchor: '90%'
                                                            ,id:'laphutang_tglawal'
                                                        },
                                                        {
                                                            xtype: 'datefield',
                                                            name: 'tglakhir',
            //                                                vtype:'daterange',
            //                                                startDateField:  'laphutang_tglawal',
                                                            //                                                afterLabelTextTpl: required_css,
                                                            fieldLabel: 'Selesai',
                                                            anchor: '90%',
                                                            format:'Y-m-d'
                                                            ,id:'laphutang_tglakhir'
                                                        }]
                                                }
                                            ]
                                        }
            ],
            bbar:{
                xtype:'toolbar',
//                style: 'background-color: #5FA2DD;',
                items:[
                {
                    text:'Search Hutang',
                    iconCls:Ext.baseCSSPrefix + 'form-search-trigger',
                    handler:'onClickSearchHutang'//Ext.Date.format(valuedate, dateformat);
                },{
                    text:'Search Angsuran',
                    iconCls:Ext.baseCSSPrefix + 'form-search-trigger',
                    handler:'onClickSearchAngsuran'//Ext.Date.format(valuedate, dateformat);
                },
                {
                    text:'Report Hutang',
                    iconCls:'icon-preview_report',
                    handler:'onClickReport'//Ext.Date.format(valuedate, dateformat);
                },
                {
                    text:'Report Angsuran',
                    iconCls:'icon-preview_report',
                    handler:'onClickReportAngsuran'//Ext.Date.format(valuedate, dateformat);
                }
                ]
            }
        },
        {
        region:'center',
        xtype:'panel',
        layout:'border',
        items:[
            {
                    
            region:'center',
            xtype:'grid',
            id:'idlaphutanglist',
            title:'Hutang Pegawai',
            bind:{
                store: '{storelaphutang}'
            },

            columns: [            
            {
                text: 'No Pinjaman',  
                dataIndex: 'no_pinjaman',
                align:'center'
            },
            {
                text: 'Tanggal', 
                dataIndex: 'tgl_pinjam', 
                align:'left'
            },
            {
                text: 'Keterangan', 
                dataIndex: 'keterangan', 
                align:'left',
                width:150
            },
            {
                text: 'NIK', 
                dataIndex: 'nik', 
                align:'left'
            },
            {
                text: 'Nama', 
                dataIndex: 'nama', 
                align:'left',
                width:150
            },
            {
                text: 'Jabatan', 
                dataIndex: 'nama_jabatan', 
                align:'left',
                width:150
            },
            
            {
                text: 'Nominal', 
                dataIndex: 'nominal', 
                align:'right',
                xtype:'numbercolumn',
                format:'0,0',
                width:150
            },
            {
                text: 'Kali', 
                dataIndex: 'kali_angsuran', 
                align:'center',
                width:60
            },
            {
                text: 'Jumlah Angsuran', 
                dataIndex: 'jumlah_angsuran', 
                align:'right',
                xtype:'numbercolumn',
                format:'0,0',
                width:150
                
            },
            {
                text: 'Saldo Angsuran', 
                dataIndex: 'saldo_laphutang', 
                align:'right',
                xtype:'numbercolumn',
                format:'0,0',
                width:150
            },
            {
                text: 'Status Lunas', 
                dataIndex: 'status_lunas', 
                align:'center',
                xtype: 'checkcolumn',
                //                flex: 1,
                processEvent:function(){
                    return false;
                }
            }
       
            ],
            
            bbar: {
                xtype: 'pagingtoolbar',
                displayInfo: true,
                pageSize: 10,
                bind:{
                    store: '{storelaphutang}'
                }
            },
            listeners:{
                itemclick:'onGridRowClick'
            }
            
        },{
            split:true,
            xtype:'grid',
            title:'Angsuran',
            id:'idlaphutanggsuran',
            region:'east',
            width:380,
            minWidth:380,
            collapsible: true,
            collapsed: true,
//            heigth:150,
//            minHeight:150,
            
            bind:{
                store: '{storelaphutangangsuran}'    
            }
            ,

            columns: [
            {
                text: 'Tanggal Angs',  
                dataIndex: 'tgl_angsuran',
                align:'center',                
                width: 100
            },
            {
                text: 'Angsuran Ke',  
                dataIndex: 'angsuran_ke',
                align:'center',                
                width: 100
            },
            {
                text: 'Jumlah', 
                dataIndex: 'jumlah_angsuran', 
                align:'right',
                xtype:'numbercolumn',
                format:'0,0',
                width: 150
            }
            ],
            bbar: {
                xtype: 'pagingtoolbar',
                displayInfo: true,
                pageSize: 10,
                bind:{
                store: '{storelaphutangangsuran}'    
            }
            }
        }
        ]
        }
        
        ]
    }
        
    ]
});
