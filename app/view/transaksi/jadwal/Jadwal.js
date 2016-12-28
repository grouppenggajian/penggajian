Ext.define('Penggajian.view.transaksi.jadwal.Jadwal', {
    extend: 'Ext.container.Container',
    xtype: 'TabJadwal',
    alias: 'widget.Jadwal',
    requires: [
    'Penggajian.view.transaksi.jadwal.JadwalController',
    'Penggajian.view.transaksi.jadwal.JadwalInput'
    ],
    controller:'jadwal',
    title: 'Jadwal',
    id: 'tab2a1',
    closable: true,        
    layout: 'border', 
    items:[ 
    {
        xtype:'grid',
        id:'idjadwallist',
        region:'center',            
        store: 'storejadwal',
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
            text: 'Kode Jabatan', 
            dataIndex: 'kode_jabatan', 
            align:'left',
            width:100,
            hidden:true
        },
        {
            text: 'Nama Jabatan', 
            dataIndex: 'nama_jabatan', 
            align:'left',
            width:250,
            hidden:true
        },
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
        },        
        {
            text: 'Senin',  
            dataIndex: 'senin',
            align:'center',
            hidden:false
        },{
            text: 'Selasa',  
            dataIndex: 'selasa',
            align:'center',
            hidden:false
        },{
            text: 'Rabu',  
            dataIndex: 'rabu',
            align:'center',
            hidden:false
        },{
            text: 'Kamis',  
            dataIndex: 'kamis',
            align:'center',
            hidden:false
        },{
            text: 'Jum\'at',  
            dataIndex: 'jumat',
            align:'center',
            hidden:false
        },{
            text: 'Sabtu',  
            dataIndex: 'sabtu',
            align:'center',
            hidden:false
        },{
            text: 'Minggu',  
            dataIndex: 'minggu',
            align:'center',
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
            id:'jadwalsearch',
            store: 'storejadwal',
            width: 380,
            emptyText: 'Quick Search...'
        }],
        bbar: {
            xtype: 'pagingtoolbar',
            displayInfo: true,
            pageSize: 10,
            store: 'storejadwal'
        }
        ,
        features:[{
            ftype: 'grouping',            
            groupHeaderTpl: '<b>{name}',
            hideGroupedHeader: false,
            startCollapsed: false,
            id: 'jadwal_grouping'
        }]
    }
    ]
    ,
    listeners:{
        show:'onShow'
    }
    

        
    
});
