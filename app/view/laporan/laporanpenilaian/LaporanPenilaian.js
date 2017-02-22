
Ext.define('Penggajian.view.laporan.laporanpenilaian.LaporanPenilaian',{
    extend: 'Ext.container.Container',
    xtype: 'TabLaporanPenilaian',
    alias: 'widget.TabLaporanPenilaian',
    requires: [
    'Penggajian.view.laporan.laporanpenilaian.LaporanPenilaianController',
    'Penggajian.view.laporan.laporanpenilaian.LaporanPenilaianModel',
    'Penggajian.view.laporan.laporanpenilaian.LaporanPenilaianInput',
        'Penggajian.view.laporan.WinPrint'
    ],

    controller: 'laporan-laporanpenilaian-laporanpenilaian',
    viewModel: {
        type: 'laporan-laporanpenilaian-laporanpenilaian'
    },
    //storeagama
    title:'Laporan Penialaian',
    id: 'tab3b',
    closable: true,        
    layout: 'fit', 
    items:[
    {
        xtype:'grid',
        id:'idlapnilailist',
        //        title:'refagama',
        //        region:'center',
        border:true,
        //        preventHeader: true,
        bind:{
            store:'{storepenilaian}'
        },
        //        store:'storeagama',
        
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
            }
            ]},
        {
            text:'Tanggal',
            dataIndex:'tanggal',
            sortable:true,
            width:100,
            hidden:false,
            align:'center'
        },
        {
            text:'NIK',
            dataIndex:'nik',
            sortable:true,
            width:100,
            hidden:false,
            align:'center'
        },

        {
            text:'Nama',
            dataIndex:'nama',
            sortable:false,
            width:200,
            hidden:false,
            align:'left'
        },
        
        
        {
            text:'Kode Jabatan',
            dataIndex:'kode_jabatan',
            sortable:false,
            width:150,
            hidden:true,
            align:'left'
        },
        {
            text:'Jabatan',
            dataIndex:'jabatan',
            sortable:true,
            width:250,
            hidden:false,
            align:'left'
        },
        {
            text: 'Nilai', 
            dataIndex: 'nilai', 
            align:'right',
            xtype:'numbercolumn',
            format:'0,0',
            width:150
        }
        
        ],
        tbar:[
            {
            text:'Add/Edit',
            iconCls:'icons-add',
            handler:'onClickAdd'
        },
            {
                    fieldLabel:'Periode',
                    labelWidth:50,
                    xtype: 'datefield',
                    id:'laporanpenilaian_start',
                    format:'d-m-Y',
                    width:180
                },
                ' s/d ',
                {
                    xtype: 'datefield',
                    id:'laporanpenilaian_finish',
                    format:'d-m-Y',
                    width:120
                },
                {
                    xtype:'combo',
                    name: 'kode_jabatan',
                    id: 'laporanpenilaian_kode_jabatan',                        
//                    afterLabelTextTpl: required_css,                        
                    fieldLabel: 'Jabatan',
                    labelWidth:50,
//                    anchor    : '75%',
                    hiddenName:'nama',
                    allowBlank: false,                                             
                    store: 'storejabatancombo',
                    valueField: 'kode_jabatan',
                    displayField: 'nama_jabatan',
                    typeAhead: true,
                    triggerAction: 'all' ,
                    hideTrigger:false,
                    queryParam:'searchvalue',
                    width:350
                } ,
                {
                    text:'Search',
                    iconCls:Ext.baseCSSPrefix + 'form-search-trigger',
                    handler:'onClickSearch'
                },
            {
                                
            text:'Report',
            iconCls:'icon-preview_report',
            handler:'onClickReport'
                                
        }],
            bbar: {
                xtype: 'pagingtoolbar',
                displayInfo: true,
                pageSize: 10,
                bind:{
                store: '{storepenilaian}'    
            }
            }
    }
    ],
    listeners:{
        show:function(){
            Ext.getCmp('idlapnilailist').store.load();
        }
    }
});
