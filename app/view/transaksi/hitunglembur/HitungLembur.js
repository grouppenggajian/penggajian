
Ext.define('Penggajian.view.transaksi.hitunglembur.HitungLembur',{
    extend: 'Ext.container.Container',
    xtype: 'TabHitungLembur',
    alias: 'widget.HitungLembur',
    requires: [
        'Penggajian.view.transaksi.hitunglembur.HitungLemburController',
       'Penggajian.view.transaksi.hitunglembur.HitungLemburInput'
    ],

    controller: 'hitunglembur',
//    viewModel: {
//        type: 'transaksi-hitunglembur-hitunglembur'
//    },
    id: 'tab2c2',
    title: 'Hitung Lembur',
    closable: true,        
    layout: 'border', 
    items:[ 
        {
        xtype:'grid',
        id:'idhitunglemburlist',
        region:'center',            
        store: 'storehitunglembur',
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
            text:'Lembur Masuk',
            dataIndex:'lembur_masuk',
            sortable:false,
            width:100,
            hidden:false,
            align:'center',
            xtype: 'datecolumn',   
            format:'H:i'
        },
        {
            text:'Lembur Keluar',                    
            dataIndex:'lembur_keluar',
            sortable:false,
            width:100,
            hidden:false,
            align:'center',
            xtype: 'datecolumn',   
            format:'H:i'
        }  
         ,{
            text:'Jumlah Lembur',            
            dataIndex:'jmljamlembur',
            sortable:false,
            width:100,
            hidden:false,
            align:'right'
        }
        ,{
            text:'Tarif',            
            dataIndex:'tarif_lembur',
            sortable:false,
            width:100,
            hidden:false,
            align:'right',
                xtype:'numbercolumn',
                format:'0,0.00'
        }
        ,{
            text:'Nilai Lembur',
            dataIndex:'nilai_lembur',
            sortable:false,
            width:100,
            hidden:false,
            align:'right',
            xtype:'numbercolumn',
            format:'0,0.00'
            
        }

        

        
        ],
        tbar:[
        
        {
            xtype: 'searchfield',            
            id:'hitunglembursearch',
            store: 'storehitunglembur',
            width: 380,
            emptyText: 'Search nik,nama,jabatan...'
        },
        '-',
        {
            xtype: 'datefield',
            id:'hitunglembur_start',
            format:'d-m-Y',
            width:125
        },
        ' s/d ',
        {
            xtype: 'datefield',
            id:'hitunglembur_finish',
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
            text:'Hitung Lembur',
            iconCls:'icon-process',
            handler:'onHitLembur'
        },        
        {
            xtype: 'pagingtoolbar',
            displayInfo: true,
            pageSize: 10,
            store: 'storehitunglembur'
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
    ],
    listeners:{
        show:'onShow'
    }
});
