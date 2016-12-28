Ext.define('Penggajian.view.transaksi.jadwal.TukarOff', {
    extend: 'Ext.container.Container',
    xtype: 'TabTukarOff',
    alias: 'widget.TukarOff',
    requires: [
    'Penggajian.view.transaksi.jadwal.TukarOffController',
    'Penggajian.view.transaksi.jadwal.TukarOffInput'
    ],
    controller:'tukaroff',
    title: 'Tukar Off',
    id: 'tab2a2',
    closable: true,        
    layout: 'border', 
    items:[ 
    {
        xtype:'grid',
        id:'idtukarofflist',
        region:'center',            
        store: 'storetukaroff',
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
            text:'No Tukar',
            dataIndex:'no_tukar',
            sortable:false,
            width:100,
            hidden:false,
            align:'center'
        },

        {
            text:'Kode Jabatan',
            dataIndex:'kode_jabatan',
            sortable:false,
            width:110,
            hidden:true
        },

        {
            text:'Nama Jabatan',
            dataIndex:'nama_jabatan',
            sortable:false,
            width:200,
            hidden:false,
            align:'left'
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
            text:'Tanggal',
            dataIndex:'tanggal',
            sortable:false,
            width:100,
            hidden:false,
            align:'center'
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
            text:'Kode Shift',
            dataIndex:'kode_shift',
            sortable:false,
            width:100,
            hidden:false,
            align:'center'
        },

        {
            text:'Jam Kerja 1',
            dataIndex:'jam_kerja_1',
            sortable:false,
            width:110,
            hidden:false,
            align:'center',
            xtype: 'datecolumn',   
            format:'H:i'
        },

        {
            text:'Jam Kerja 2',
            dataIndex:'jam_kerja_2',
            sortable:false,
            width:110,
            hidden:false,
            align:'center',
            xtype: 'datecolumn',   
            format:'H:i'
        },

        {
            text:'Jam Kerja 3',
            dataIndex:'jam_kerja_3',
            sortable:false,
            width:110,
            hidden:false,
            align:'center',
            xtype: 'datecolumn',   
            format:'H:i'
        },

        {
            text:'Jam Kerja 4',
            dataIndex:'jam_kerja_4',
            sortable:false,
            width:110,
            hidden:false,
            align:'center',
            xtype: 'datecolumn',   
            format:'H:i'
        },

        {
            text:'NIK Tukar',
            dataIndex:'nik_tukar',
            sortable:false,
            width:110,
            hidden:false,
            align:'center'
        },

        {
            text:'Nama Tukar',
            dataIndex:'nama_tukar',
            sortable:false,
            width:150,
            hidden:false,
            align:'left'
        },

        {
            text:'Tanggal Tukar',
            dataIndex:'tanggal_tukar',
            sortable:false,
            width:110,
            hidden:false,
            align:'center'
        },

        {
            text:'Hari Tukar',
            dataIndex:'hari_tukar',
            sortable:false,
            width:110,
            hidden:false,
            align:'center'
        },

        {
            text:'Kode Shift Tukar',
            dataIndex:'kode_shift_tukar',
            sortable:false,
            width:110,
            hidden:false,
            align:'center'
        },

        {
            text:'Jam Kerja 1 Tukar',
            dataIndex:'jam_kerja_1_tukar',
            sortable:false,
            width:110,
            hidden:false,
            align:'center',
            xtype: 'datecolumn',   
            format:'H:i'
        },

        {
            text:'Jam Kerja 2 Tukar',
            dataIndex:'jam_kerja_2_tukar',
            sortable:false,
            width:110,
            hidden:false,
            align:'center',
            xtype: 'datecolumn',   
            format:'H:i'
        },

        {
            text:'Jam Kerja 3 Tukar',
            dataIndex:'jam_kerja_3_tukar',
            sortable:false,
            width:110,
            hidden:false,
            align:'center',
            xtype: 'datecolumn',   
            format:'H:i'
        },

        {
            text:'Jam Kerja 4 Tukar',
            dataIndex:'jam_kerja_4_tukar',
            sortable:false,
            width:110,
            hidden:false,
            align:'center',
            xtype: 'datecolumn',   
            format:'H:i'
        },

        {
            text:'Create Date',
            dataIndex:'create_date',
            sortable:false,
            width:110,
            hidden:false,
            align:'center'
        },

        {
            text:'Create By',
            dataIndex:'create_by',
            sortable:false,
            width:110,
            hidden:false,
            align:'left'
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
            id:'tukaroffsearch',
            store: 'storetukaroff',
            width: 380,
            emptyText: 'Search nik,nama,jabatan...'
        },
        '-',
        {
            xtype: 'datefield',
            id:'tukaroff_start',
            format:'d-m-Y',
            width:125
        },
        ' s/d ',
        {
            xtype: 'datefield',
            id:'tukaroff_finish',
            format:'d-m-Y',
            width:125
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
            store: 'storetukaroff'
        }
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
