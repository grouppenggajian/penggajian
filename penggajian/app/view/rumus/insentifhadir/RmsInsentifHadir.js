Ext.define('Penggajian.view.rumus.insentifhadir.RmsInsentifHadir',
    {
        extend: 'Ext.container.Container',
        xtype:'TabRumusInsentifHadir',
        alias: 'widget.RumusInsentifHadir',
        title: 'Rumus Insentif Hadir',        
        id: 'tab1g4',
        requires:[
        'Penggajian.view.rumus.insentifhadir.RmsInsentifHadirController' ,
        'Penggajian.view.rumus.insentifhadir.RmsInsentifHadirModel' ,
        'Penggajian.view.rumus.insentifhadir.RmsInsentifHadirInput' ,
        ],
        controller:'rmsinsentifhadir',
        viewModel:'rmsinsentifhadir',
        
        height: '100%',
        closable: true,
        layout: 'border',
        
        items:  [ 
           
        {
        xtype:'grid',
        id:'idrmsinsentifhadirlist',
        region:'center',           
        bind:{
            store: '{storermsinsentifhadir}'
        },
        
//        store: 'storermsinsentifhadir',
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
                text:'id',
                dataIndex:'id',
                sortable:false,
                width:110,
                hidden:true
            },

            {
                text:'kategori_ijin',
                dataIndex:'kategori_ijin',
                sortable:false,
                width:110,
                hidden:true
            },

            {
                text:'Kategori Ijin',
                dataIndex:'keterangan',
                sortable:false,
                width:200,
                hidden:false,
                align:'left'
            },

            {
                text:'tipe_ijin',
                dataIndex:'tipe_ijin',
                sortable:false,
                width:110,
                hidden:true
            },

            {
                text:'Tipe Ijin',
                dataIndex:'keterangan_tipe',
                sortable:false,
                width:110,
                hidden:false,
                align:'left'
            },

            {
                text:'jenisharikerja',
                dataIndex:'jenisharikerja',
                sortable:false,
                width:110,
                hidden:true,
                align:'left'
            },

            {
                text:'Hari Kerja',
                dataIndex:'harikerja',
                sortable:false,
                width:110,
                hidden:false,
                align:'left'
            },

            {
                text:'Jumlah Ijin',
                dataIndex:'kali_ijin',
                sortable:false,
                width:110,
                hidden:false
            },

            {
                text:'Nilai %',
                dataIndex:'nilai_insentif',
                sortable:false,
                width:110,
                hidden:false,
                renderer: 'renderPercent'
            }


        
        ],
        tbar:[
        {
            text:'Add',
            iconCls:'icons-add',
            handler:'onClickAdd'
        },{
            text:'Refresh',
            iconCls:'icon-refresh',
            handler:'onClickRefresh'
        }
        
        
        ]

    }
        ],
        listeners:{
        
                    show:'onShow'
    }
    });