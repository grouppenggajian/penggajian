
Ext.define('Penggajian.view.laporan.hut.LaporanHutKaryawan',{
    extend: 'Ext.container.Container',
    xtype: 'TabLaporanHutKaryawan',
    alias: 'widget.TabLaporanHutKaryawan',
    requires: [
        'Penggajian.view.laporan.hut.LaporanHutKaryawanController',
        'Penggajian.view.laporan.hut.LaporanHutKaryawanModel',
        'Penggajian.view.laporan.WinPrint'
    ],

    controller: 'laporan-hut-laporanhutkaryawan',
    viewModel: {
        type: 'laporan-hut-laporanhutkaryawan'
    },
    title: 'HUT Karyawan',
    id: 'tab3d',
    closable: true,        
    layout: 'border',
    items:[
        {
                    
            region:'center',
            xtype:'grid',
            id:'idhutlist',
            preventHeader:false,
//            title:'Hutang Pegawai',
            bind:{
                store: '{storehut}'
            },

            columns: [                        
            {
                text: 'NIK', 
                dataIndex: 'nik', 
                align:'center'
            },
            {
                text: 'Nama', 
                dataIndex: 'nama', 
                align:'left',
                width:200
            },
            {
                text: 'Tgl Lahir', 
                dataIndex: 'tgl_lahir', 
                align:'center',
                width:100,
                xtype: 'datecolumn',   
                format:'d-M-Y'
            },
            {
                text: 'HUT', 
                dataIndex: 'hut', 
                align:'center',
                width:100,
                xtype: 'datecolumn',   
                format:'d-M-Y'
            },
            {
                text: 'Usia', 
                dataIndex: 'hutke', 
                align:'center',
                width:100
            }
            
       
            ],
            tbar:[
                
                {
                    fieldLabel:'Periode',
                    labelWidth:70,
                    xtype: 'datefield',
                    id:'hut_start',
                    format:'d-m-Y',
                    width:205
                },
                ' s/d ',
                {
                    xtype: 'datefield',
                    id:'hut_finish',
                    format:'d-m-Y',
                    width:125
                },
                {
                    text:'Search',
                    iconCls:Ext.baseCSSPrefix + 'form-search-trigger',
                    handler:'onClickSearch'
                },
                {
                    text:'Report HUT',
                    iconCls:'icon-preview_report',
                    handler:'onClickReport'//Ext.Date.format(valuedate, dateformat);
                }
            ],
            bbar: {
                xtype: 'pagingtoolbar',
                displayInfo: true,
                pageSize: 10,
                bind:{
                    store: '{storehut}'
                }
            }
            
        }
    ]

    
});
