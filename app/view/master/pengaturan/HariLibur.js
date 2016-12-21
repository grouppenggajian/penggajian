Ext.define('Penggajian.view.master.pengaturan.HariLibur', {
    extend: 'Ext.container.Container',
    xtype: 'TabHariLibur',
    alias: 'widget.HariLibur',
    requires: [
//    'Penggajian.view.master.periode.PeriodeController',
//    'Penggajian.view.master.periode.PeriodeInput'
    ],
//    controller:'periode',
    title: 'Hari Libur',
    id: 'tab1f2',
    closable: true,        
    layout: 'border', 
    items:[       
    {
        xtype:'grid',
        id:'idhariliburlist',
        region:'center',            
        store: 'storeharilibur',
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
            text:'Tanggal',
            dataIndex:'tanggal',
            sortable:false,
            width:80,
            hidden:false
        },
        {
            text:'Keterangan',
            dataIndex:'keterangan',
            sortable:false,
            flex:1,
            width:200,
            hidden:false
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
//        {
//            xtype: 'searchfield',            
//            id:'harilibursearch',
//            store: 'storeharilibur',
//            width: 380,
//            emptyText: 'Search nik,nama,jabatan...'
//        },
//        '-',
        {
            xtype: 'datefield',
            id:'harilibur_start',
            format:'d-m-Y',
            width:120
        },
        ' s/d ',
        {
            xtype: 'datefield',
            id:'harilibur_finish',
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
            store: 'storeharilibur'
        }

    }
    ]
}
);
        