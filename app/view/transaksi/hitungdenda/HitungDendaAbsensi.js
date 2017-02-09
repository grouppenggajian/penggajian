
Ext.define('Penggajian.view.transaksi.hitungdenda.HitungDendaAbsensi',{
    extend: 'Ext.container.Container',
    xtype: 'TabHitungDendaAbsensi',
    alias: 'widget.HitungDendaAbsensi',
    requires: [
    'Penggajian.view.transaksi.hitungdenda.HitungDendaAbsensiController',
    'Penggajian.view.transaksi.hitungdenda.HitungDendaAbsensiInput'
    ],

    controller: 'hitungdenda',
    //    viewModel: {
    //        type: 'transaksi-hitungdenda-hitungdendaabsensi'
    //    },
    id: 'tab2c4',
    title: 'Hitung Denda Absensi',
    closable: true,        
    layout: 'border', 
    items:[
        
    {
        text:'Periode',
        dataIndex:'thbl',
        sortable:false,
        width:100,
        hidden:false,
        align:'center'
    }, {
        text:'Tanggal',
        dataIndex:'tgl_ijin',
        sortable:false,
        width:100,
        hidden:false,
        align:'center'
    },
    {
        xtype:'grid',
        id:'idhitungdendalist',
        region:'center',    
        store: 'storehitungdenda',
        columns: [
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
            text:'Cat',
            dataIndex:'kategori_ijin',
            sortable:false,
            width:50,
            hidden:false,
            align:'left'
        },
        {
            text:'Ijin',
            dataIndex:'keterangan_ijin',
            sortable:false,
            width:200,
            hidden:false,
            align:'left'
        },
        {
            text:'Lama Ijin',
            dataIndex:'lama_ijin',
            sortable:false,
            width:120,
            hidden:false,
            align:'left'
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
            text:'Denda',
            dataIndex:'nilai_denda',
            sortable:false,
            width:100,
            hidden:false,
            align:'right',
            xtype:'numbercolumn',
            format:'0,0.00'
        },
        {
            text:'Kode Post',
            dataIndex:'kode_potongan',
            sortable:false,
            width:100,
            hidden:false,
            align:'left'
        },
        {
            text:'Posting',
            dataIndex:'posting',
            sortable:false,
            width:200,
            hidden:false,
            align:'left'
        }
        ],
        tbar:[
        
        {
            xtype: 'searchfield',            
            id:'hitungdendasearch',
            store: 'storehitungdenda',
            width: 380,
            emptyText: 'Search nik,nama,jabatan...'
        },
        '-',
        {
            xtype: 'datefield',
            id:'hitungdenda_start',
            format:'d-m-Y',
            width:125
        },
        ' s/d ',
        {
            xtype: 'datefield',
            id:'hitungdenda_finish',
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
            text:'Hitung Denda',
            iconCls:'icon-process',
            handler:'onHitDenda'
        },        
        {
            xtype: 'pagingtoolbar',
            displayInfo: true,
            pageSize: 10,
            store: 'storehitungdenda'
        }]
    }
    ],
    listeners:{
        show:'onShow'
}
});
