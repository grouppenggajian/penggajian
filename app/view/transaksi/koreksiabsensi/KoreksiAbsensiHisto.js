Ext.define('Penggajian.view.transaksi.koreksiabsensi.KoreksiAbsensiHisto', 
    {
        extend          : 'Ext.window.Window',
        title           : 'History Koreksi Absensi',
        requires        : [
        'Penggajian.view.transaksi.koreksiabsensi.KoreksiAbsensiController'
        ],
        controller:'koreksiabsensi',        
        //        plugins: {
        //            ptype: 'datatip'
        //        },
        width           : 800,
        height          : 510,
        layout          : 'fit',
        autoShow        : true,
        modal           : true,
        alias           : 'widget.koreksiabsensihisto',
        id              : 'koreksiabsensi_histo',
        maximizable     :true,
        closeAction:'destroy',
        items:[
            {
        xtype:'grid',
        id:'idkoreksiabsensihistolist',
        region:'center',            
        store: 'storekoreksiabsensihisto',
        columns: [        
        {
            text:'Koreksi ID',
            dataIndex:'koreksi_id',
            sortable:false,
            width:100,
            hidden:false,
            align:'center'
        },
        {
            text:'Koreksi Ke',
            dataIndex:'x_koreksi',
            sortable:false,
            width:100,
            hidden:false,
            align:'center'
        },
        {
            text:'Approval',            
            dataIndex:'approval',
            sortable:false,
            width:100,
            hidden:false,
            align:'left'
        }
        ,
        
        {
            text:'Tanggal',
            dataIndex:'tgl',
            sortable:true,
            width:100,
            hidden:false,
            align:'center'
        },
        {
            text:'PIN',
            dataIndex:'pin',
            sortable:false,
            width:60,
            hidden:true
        },
        {
            text:'KODE_Jabatan',
            dataIndex:'kode_jabatan',
            sortable:false,
            width:60,
            hidden:true
        },
        {
            text:'Keterangan',
            dataIndex:'keterangan',
            sortable:false,
            width:60,
            hidden:true
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
            text:'Hari',
            dataIndex:'hari',
            sortable:false,
            width:80,
            hidden:false,
            align:'center'
        },
            {
                text: 'Pantangan', 
                dataIndex: 'is_pantangan', 
                xtype:'checkcolumn',
                align:'center',
                processEvent:function(){return false;},
                width:80
            },
        {
            header: 'Jadwal Seharusnya',
            columns:[{
            text:'Shift',
            dataIndex:'kode_shift',
            sortable:false,
            width:80,
            hidden:false,
            align:'center'
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
            }]
        },
        
        {
            header: 'Realisasi',
            columns:[{
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
        }]
        }
        ,
        
        {
            text:'Tanggal Koreksi',            
            dataIndex:'tglkoreksi',
            sortable:false,
            width:100,
            hidden:false,
            align:'left'
        },
        
        {
            text:'Koreksi_By',            
            dataIndex:'koreksi_by',
            sortable:false,
            width:100,
            hidden:false,
            align:'left'
        }
        ,
        
        
        
        {
            text:'Tanggal Approval',            
            dataIndex:'approval_date',
            sortable:false,
            width:100,
            hidden:false,
            align:'left'
        },
        
        {
            text:'Approval_By',            
            dataIndex:'approval_by',
            sortable:false,
            width:100,
            hidden:false,
            align:'left'
        }

        

        
        ],
        tbar:[
        
        {
            xtype: 'textfield',
            id:'koreksiabsensisearchnik',
            width: 280,
            readOnly:true
        },
        '-',
        {
            xtype: 'datefield',
            id:'koreksiabsensisearchtgl',
            format:'Y-m-d',
            width:100,
            hidden:false,
            readOnly:true
            
        }
        
        
        ],
        bbar: [        
            {
                xtype: 'pagingtoolbar',
            displayInfo: true,
            pageSize: 10,
            store: 'storekoreksiabsensihisto'
            }
        ]
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
    });