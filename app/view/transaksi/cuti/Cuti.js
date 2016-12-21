Ext.define('Penggajian.view.transaksi.cuti.Cuti', {
    extend: 'Ext.container.Container',
    xtype: 'TabInputCuti',
    alias: 'widget.InputCuti',
    requires: [
    'Penggajian.view.transaksi.cuti.CutiController',
    'Penggajian.view.transaksi.cuti.CutiInput'
    ],
    controller:'cuti',
    title: 'Cuti',
    id: 'tab2f2',
    closable: true,        
    layout: 'border', 
    items:[ 
        {
        xtype:'grid',
        id:'idcutilist',
        region:'center',            
        store: 'storecuti',
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

        {
            text:'No.Cuti',
            dataIndex:'no_cuti',
            sortable:false,
            width:80,
            hidden:false
        },
        {
            text:'NIK',
            dataIndex:'nik',
            sortable:false,
            width:100,
            hidden:false
        },

        {
            text:'Nama',
            dataIndex:'nama',
            sortable:false,
            width:150,
            hidden:false
        },

        {
            text:'Jabatan',
            dataIndex:'jabatan',
            sortable:false,
            width:150,
            hidden:false
        },

        {
            text:'Kategori Cuti',
            dataIndex:'kategori_cuti',
            sortable:false,
            width:110,
            hidden:false
        },

        {
            text:'Keterangan',
            dataIndex:'keterangan',
            sortable:false,
            width:200,
            hidden:false
        },

        {
            text:'Mulai',
            dataIndex:'tgl_mulai',
            sortable:false,
            width:80,
            hidden:false
        },

        {
            text:'Selesai',
            dataIndex:'tgl_selesai',
            sortable:false,
            width:80,
            hidden:false
        },
        {
            text:'Sisa Cuti',
            dataIndex:'sisa_cuti',
            sortable:false,
            width:80,
            hidden:false
        },

        {
            text:'Jumlah Cuti',
            dataIndex:'jml_cuti',
            sortable:false,
            width:80,
            hidden:false
        },

        {
            text:'create_date',
            dataIndex:'create_date',
            sortable:false,
            width:80,
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
            id:'cutisearch',
            store: 'storecuti',
            width: 380,
            emptyText: 'Search nik,nama,jabatan...'
        },
        '-',
        {
            xtype: 'datefield',
            id:'cuti_start',
            format:'d-m-Y',
            width:120
        },
        ' s/d ',
        {
            xtype: 'datefield',
            id:'cuti_finish',
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
            store: 'storecuti'
        }

    }
    ]
    ,
    listeners:{
//        show:function(){
//            var refstoregrid=Ext.getCmp('idpinjamanlist').store;               
//            refstoregrid.loadPage(1);
//        
//        }
    }
    

        
    
});

