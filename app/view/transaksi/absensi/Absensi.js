Ext.define('Penggajian.view.transaksi.absensi.Absensi', {
    extend: 'Ext.container.Container',
    xtype: 'TabAbsensi',
    alias: 'widget.Absensi',
    requires: [
    'Penggajian.view.transaksi.absensi.AbsensiController'
    ],
    controller:'absensi',
    title: 'Absensi',
    id: 'tab2b1',
    closable: true,        
    layout: 'border', 
    items:[ 
    {
        xtype:'grid',
        id:'idabsensilist',
        region:'center',            
        store: 'storeabsensi',
        columns: [
//        {
//            xtype: 'actioncolumn',
//            header: 'Action',
//            menuDisabled: true,
//            sortable: false,   
//            align:'center',
//            width: 85,
//            items: [
//            {
//                iconCls: 'icon-delete',
//                tooltip: 'Delete Row',
//                handler: 'onDeleteClick' 
//            }]
//                                
//        },
        {
            text:'ID',
            dataIndex:'id',
            sortable:false,
            width:100,
            hidden:true,
            align:'center'
        },

        {
            text:'PIN',
            dataIndex:'pin',
            sortable:false,
            width:60,
            hidden:false
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
        },
        {
            text:'Jabatan',
            dataIndex:'jabatan',
            sortable:false,
            width:200,
            hidden:false,
            align:'left'
        },

        {
            text:'Hari',
            dataIndex:'hari',
            sortable:false,
            width:80,
            hidden:false,
            align:'center'
        },
        {
            text:'Shift',
            dataIndex:'kode_shift',
            sortable:false,
            width:80,
            hidden:false,
            align:'center'
        },
        {
            text:'Tanggal',
            dataIndex:'tgl',
            sortable:false,
            width:100,
            hidden:false,
            align:'center'
        },
        {
            text:'Masuk',
            xtype:'datecolumn',
            dataIndex:'masuk',
            sortable:false,
            width:100,
            hidden:false,
            align:'center',   
            format:'H:i'
        },
        {
            text:'Keluar',
            xtype:'datecolumn',
            dataIndex:'keluar',
            sortable:false,
            width:100,
            hidden:false,
            align:'center',   
            format:'H:i'
        },
        {
            text:'Masuk Kembali',
            xtype:'datecolumn',
            dataIndex:'masuk_kembali',
            sortable:false,
            width:100,
            hidden:false,
            align:'center',   
            format:'H:i'
        },
        {
            text:'Pulang',
            xtype:'datecolumn',
            dataIndex:'pulang',
            sortable:false,
            width:100,
            hidden:false,
            align:'center',   
            format:'H:i'
        },{
            text:'JamAbsen',            
            dataIndex:'jmljamabsen',
            sortable:false,
            width:100,
            hidden:false,
            align:'right'
        },{
            text:'Lembur Masuk',
            xtype:'datecolumn',
            dataIndex:'lembur_masuk',
            sortable:false,
            width:100,
            hidden:false,
            align:'center',   
            format:'H:i'
        },{
            text:'Lembur Keluar',
            xtype:'datecolumn',
            dataIndex:'lembur_keluar',
            sortable:false,
            width:100,
            hidden:false,
            align:'center',   
            format:'H:i'
        },
        
        {
            text:'JamLembur',            
            dataIndex:'jmljamlembur',
            sortable:false,
            width:100,
            hidden:false,
            align:'right'
        },
            {
                text: 'I/Masuk', 
                dataIndex: 'jam_kerja_1', 
                align:'center',
                xtype: 'datecolumn',   
                format:'H:i',
                width:100
            },
            {
                text: 'II/Keluar/Pulang', 
                dataIndex: 'jam_kerja_2', 
                align:'center',
                xtype: 'datecolumn',   
                format:'H:i',
                width:100
            },
            {
                text: 'III/Masuk', 
                dataIndex: 'jam_kerja_3', 
                align:'center',
                xtype: 'datecolumn',   
                format:'H:i',
                width:100
            },
            {
                text: 'IV/Keluar/Pulang', 
                dataIndex: 'jam_kerja_4', 
                align:'center',
                xtype: 'datecolumn',   
                format:'H:i',
                width:100
            },
        
        {
            text:'JamShift',            
            dataIndex:'jmljamkerja',
            sortable:false,
            width:100,
            hidden:false,
            align:'right'
        }

        

        
        ],
        tbar:[
        
        {
            xtype: 'searchfield',            
            id:'absensisearch',
            store: 'storeabsensi',
            width: 380,
            emptyText: 'Search nik,nama,jabatan...'
        },
        '-',
        {
            xtype: 'datefield',
            id:'absensi_start',
            format:'d-m-Y',
            width:125
        },
        ' s/d ',
        {
            xtype: 'datefield',
            id:'absensi_finish',
            format:'d-m-Y',
            width:125
        },
        {
            text:'Search Tanggal',
            iconCls:Ext.baseCSSPrefix + 'form-search-trigger',
            handler:'onSearchTanggal'//Ext.Date.format(valuedate, dateformat);
        }
        
        
        ],
        bbar: [
                
        {
            text:'Download Log Finger',
            iconCls:'icons-add',
            handler:'onDownloadFinger'
        },
        {
            text:'Clear Log Finger',
            iconCls:'icon-cancel',
            handler:'onClearFinger'
        },
        {
            xtype: 'pagingtoolbar',
            displayInfo: true,
            pageSize: 10,
            store: 'storeabsensi'
        }]
    //        ,
    //        features:[{
    //            ftype: 'grouping',            
    //            groupHeaderTpl: '<b>{name}',
    //            hideGroupedHeader: false,
    //            startCollapsed: false,
    //            id: 'storetukaroff_grouping'
    //        }]
    }
    ]
    ,
    listeners:{
        show:'onShow'
    }
    

        
    
});
