Ext.define('Penggajian.view.transaksi.hitungketerlambatan.HitungKeterlambatan', {
    extend: 'Ext.container.Container',
    xtype: 'TabHitungKeterlambatan',
    alias: 'widget.HitungKeterlambatan',
    requires: [
    'Penggajian.view.transaksi.hitungketerlambatan.HitungKeterlambatanController',
    'Penggajian.view.transaksi.hitungketerlambatan.HitungKeterlambatanInput'
    ],
    controller:'hitungketerlambatan',
    title: 'Hitung Keterlambatan',
    id: 'tab2c1',
    closable: true,        
    layout: 'border', 
    items:[ 
    {
        xtype:'grid',
        id:'idhitungketerlambatanlist',
        region:'center',            
        store: 'storehitungketerlambatan',
        columns: [       

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
            text:'Tanggal',
            dataIndex:'tgl',
            sortable:false,
            width:100,
            hidden:false,
            align:'center'
        },
        {
            text:'Hari',
            dataIndex:'hari',
            sortable:false,
            width:100,
            hidden:false,
            align:'center'
        },
        {
            xtype:'checkcolumn',
            text:'Pantangan',
            dataIndex:'is_pantangan',
            sortable:false,
            width:100,
            hidden:false,
            align:'center',
            processEvent:function(){return false;}
        },
        {
            header: 'Terlambat(menit)',
            columns:[
                {
                    text:'Masuk',
                    dataIndex:'terlambat_masuk',
                    sortable:false,
                    width:100,
                    hidden:false,
                    align:'center'
                },
                {
                    text:'Keluar',                    
                    dataIndex:'keluar_awal',
                    sortable:false,
                    width:100,
                    hidden:false,
                    align:'center'
                },
                {
                    text:'Masuk Kembali',                    
                    dataIndex:'terlambat_masukkembali',
                    sortable:false,
                    width:100,
                    hidden:false,
                    align:'center'
                },
                {
                    text:'Pulang',                    
                    dataIndex:'pulang_awal',
                    sortable:false,
                    width:100,
                    hidden:false,
                    align:'center'
                }
            ]
        }
        ,{
            text:'Tarif',            
            dataIndex:'potongan',
            sortable:false,
            width:100,
            hidden:false,
            align:'right',
                xtype:'numbercolumn',
                format:'0,0.00'
        }
        ,{
            header:'Nilai Keterlambatan',
            columns:[
                {
                    text:'Masuk',
                    dataIndex:'nilai_masuk',
                    sortable:false,
                    width:100,
                    hidden:false,
                    align:'right',
                xtype:'numbercolumn',
                format:'0,0.00'
                },
                {
                    text:'Keluar',                    
                    dataIndex:'nilai_keluar',
                    sortable:false,
                    width:100,
                    hidden:false,
                    align:'right',
                xtype:'numbercolumn',
                format:'0,0.00'
                },
                {
                    text:'Masuk Kembali',                    
                    dataIndex:'nilai_masukkembali',
                    sortable:false,
                    width:100,
                    hidden:false,
                    align:'right',
                xtype:'numbercolumn',
                format:'0,0.00'
                },
                {
                    text:'Pulang',                    
                    dataIndex:'nilai_pulang',
                    sortable:false,
                    width:100,
                    hidden:false,
                    align:'right',
                xtype:'numbercolumn',
                format:'0,0.00'
                },
                {
                    text:'Total',                    
                    dataIndex:'total',
                    sortable:false,
                    width:100,
                    hidden:false,
                    align:'right',
                xtype:'numbercolumn',
                format:'0,0.00'
                }
                
            ]
        }

        

        
        ],
        tbar:[
        
        {
            xtype: 'searchfield',            
            id:'hitungketerlambatansearch',
            store: 'storehitungketerlambatan',
            width: 380,
            emptyText: 'Search nik,nama,jabatan...'
        },
        '-',
        {
            xtype: 'datefield',
            id:'hitungketerlambatan_start',
            format:'d-m-Y',
            width:125
        },
        ' s/d ',
        {
            xtype: 'datefield',
            id:'hitungketerlambatan_finish',
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
            text:'Hitung Keterlambatan',
            iconCls:'icon-process',
            handler:'onHitKeterlambatan'
        },        
        {
            xtype: 'pagingtoolbar',
            displayInfo: true,
            pageSize: 10,
            store: 'storehitungketerlambatan'
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