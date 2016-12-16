Ext.define('Penggajian.view.transaksi.jadwal.TukarOff', {
    extend: 'Ext.container.Container',
    xtype: 'TabTukarOff',
    alias: 'widget.TukarOff',
    requires: [
    'Penggajian.view.transaksi.jadwal.TukarOffController',
    'Penggajian.view.transaksi.jadwal.TukarOffInput',    
    'Ext.ux.SearchField'
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
                    handler: 'onDeleteJadwal'
                }]
                                
            },
//        {
//            text: 'Kode Jabatan', 
//            dataIndex: 'kode_jabatan', 
//            align:'left',
//            width:100,
//            hidden:true
//        },
//        {
//            text: 'Nama Jabatan', 
//            dataIndex: 'nama_jabatan', 
//            align:'left',
//            width:250,
//            hidden:true
//        },
        {
            text: 'NIK', 
            dataIndex: 'nik', 
            align:'center',
            width:80
        },
        {
            text: 'Nama', 
            dataIndex: 'nama', 
            align:'left',
            width:200
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
            width:120
        },
        ' s/d ',
        {
            xtype: 'datefield',
            id:'tukaroff_finish',
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
