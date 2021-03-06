Ext.define('Penggajian.view.transaksi.ijin.Ijin', {
    extend: 'Ext.container.Container',
    xtype: 'TabInputIjin',
    alias: 'widget.InputIjin',
    requires: [
    'Penggajian.view.transaksi.ijin.IjinController',
    'Penggajian.view.transaksi.ijin.IjinInput'
    ],
    controller:'ijin',
    title: 'Ijin',
    id: 'tab2f1',
    closable: true,        
    layout: 'border', 
    items:[ 
    {
        xtype:'grid',
        id:'idijinlist',
        region:'center',            
        store: 'storeijin',
        columns: [
        {
            xtype: 'actioncolumn',
            header: 'Action',
            menuDisabled: true,
            sortable: false,   
            align:'center',
            width: 85,
            items: [
            {
                iconCls: 'icon-edit-record',
                tooltip: 'Edit Row',
                handler: 'onEditClick' 
            },{
                getClass: function(v, meta, rec) {
                    return 'icon-delete';
                },
                getTip: function(v, meta, rec) {
                    return 'Delete Plant';
                },
                handler: 'onDeleteClick'
            }]
                                
        },

        {
            text:'No.Ijin',
            dataIndex:'no_ijin',
            sortable:false,
            width:80,
            hidden:false
        },

        {
            text:'Tanggal',
            dataIndex:'tgl_ijin',
            sortable:false,
            width:100,
            hidden:false
        },

        {
            text:'Hari',
            dataIndex:'hari_ijin',
            sortable:false,
            width:80,
            hidden:false,
            align:'center'
        },

        {
            text:'Jam Awal',
            dataIndex:'jam_ijin_awal',
            sortable:false,
            width:80,
            hidden:false,
            xtype: 'datecolumn',   format:'H:i'
        },
        
        {
            text:'Jam Akhir',
            dataIndex:'jam_ijin_akhir',
            sortable:false,
            width:80,
            hidden:false,
            xtype: 'datecolumn',   format:'H:i'
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
            width:150,
            hidden:false,
            align:'left'
        },

        {
            text:'Kat Ijin',
            dataIndex:'kategori_ijin',
            sortable:false,
            width:80,
            hidden:false,
            align:'center'
        },
        {
            text:'Tipe Ijin',
            dataIndex:'tipe_ijin',
            sortable:false,
            width:100,
            hidden:false,
            align:'center'
        },

        {
            text:'Keterangan',
            dataIndex:'keterangan',
            sortable:false,
            width:200,
            hidden:false,
            align:'left'
        },

        {
            text:'Jadwal',
            dataIndex:'jadwal',
            sortable:false,
            width:80,
            hidden:false
        },

        {
            text:'I Masuk',
            dataIndex:'jam_kerja_1',
            sortable:false,
            width:100,
            hidden:false,
            xtype: 'datecolumn',   format:'H:i'
        },

        {
            text:'II Keluar/Pulang',
            dataIndex:'jam_kerja_2',
            sortable:false,
            width:100,
            hidden:false,
            xtype: 'datecolumn',   format:'H:i'
        },

        {
            text:'III Masuk',
            dataIndex:'jam_kerja_3',
            sortable:false,
            width:100,
            hidden:false,
            xtype: 'datecolumn',   format:'H:i'
        },

        {
            text:'IV  Keluar/Pulang',
            dataIndex:'jam_kerja_4',
            sortable:false,
            width:100,
            hidden:false,
            xtype: 'datecolumn',   format:'H:i'
        },

        {
            text:'create_date',
            dataIndex:'create_date',
            sortable:false,
            width:100,
            hidden:false
        },

        {
            text:'create_by',
            dataIndex:'create_by',
            sortable:false,
            width:80,
            hidden:false
        }

        
        ],
        tbar:[
        {
            text:'Add',
            iconCls:'icons-add',
            handler:'onClickAdd'
        },
        {
            xtype: 'searchfield',            
            id:'ijinsearch',
            store: 'storeijin',
            width: 380,
            emptyText: 'Search nik,nama,jabatan...'
        },
        '-',
        {
            xtype: 'datefield',
            id:'ijin_start',
            format:'d-m-Y',
            width:120
        },
        ' s/d ',
        {
            xtype: 'datefield',
            id:'ijin_finish',
            format:'d-m-Y',
            width:120
        },
        {
            text:'Search Tanggal',
            iconCls:Ext.baseCSSPrefix + 'form-search-trigger',
            handler:'onSearchTanggal'//Ext.Date.format(valuedate, dateformat);
        }
        
        
        ],
        bbar: {
            xtype: 'pagingtoolbar',
            displayInfo: true,
            pageSize: 10,
            store: 'storeijin'
        }

    }
    ]
    ,
    listeners:{
        show:'onShow'
}
    

        
    
});

