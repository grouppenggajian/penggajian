Ext.define('Penggajian.view.transaksi.absensi.Absensi', {
    extend: 'Ext.container.Container',
    xtype: 'TabAbsensi',
    alias: 'widget.Absensi',
    requires: [
    'Penggajian.view.transaksi.absensi.AbsensiController'
    ],
    controller:'absensi',
    title: 'Absensi',
    id: 'tab2b',
    closable: true,        
    layout: 'border', 
    items:[ 
    {
        xtype:'grid',
        id:'idabsensilist',
        region:'center',            
        store: 'storeabsensi',
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
                iconCls: 'icon-delete',
                tooltip: 'Delete Row',
                handler: 'onDeleteClick' 
            }]
                                
        },
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
            width:100,
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
            text:'Nama Jabatan',
            dataIndex:'nama_jabatan',
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
            text:'Tanggal',
            dataIndex:'tanggal',
            sortable:false,
            width:100,
            hidden:false,
            align:'center'
        },

        

        {
            text:'Jam',
            xtype:'datecolumn',
            dataIndex:'jam',
            sortable:false,
            width:100,
            hidden:false,
            align:'center',   
            format:'H:i:s'
        },

        {
            text:'Absen',            
            dataIndex:'status_absen',
            sortable:false,
            width:120,
            hidden:false,
            align:'left'
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
