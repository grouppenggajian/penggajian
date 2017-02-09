
Ext.define('Penggajian.view.transaksi.koreksiabsensi.KoreksiAbsensi',{
    extend: 'Ext.container.Container',
    xtype: 'TabKoreksiAbsensi',
    alias: 'widget.KoreksiAbsensi',
    requires: [
        'Penggajian.view.transaksi.koreksiabsensi.KoreksiAbsensiController',
        'Penggajian.view.transaksi.koreksiabsensi.KoreksiAbsensiModel'
    ],

    controller: 'koreksiabsensi',
    viewModel: {
        type: 'koreksiabsensi'
    },
    html: 'Hello, World!!',
    id: 'tab2b2',
    title: 'Koreksi Absensi',
    closable: true,        
    layout: 'border', 
    items:[
     {
        xtype:'grid',
        id:'idkoreksiabsensilist',
        region:'center',            
        store: 'storekoreksiabsensi',
        columns: [
        {
            xtype: 'actioncolumn',
            header: 'Koreksi',
            menuDisabled: true,
            sortable: false,   
            align:'center',
            width: 85,
            items: [
            {
                iconCls: 'icon-processedit',
                tooltip: 'Koreksi Row',
                handler: 'onKoreksiClick' 
            }]
                                
        },    
        {
            text:'Koreksi ID',
            dataIndex:'koreksi_id',
            sortable:false,
            width:100,
            hidden:false,
            align:'center'
        },
        {
            text:'Tanggal',
            dataIndex:'tgl',
            sortable:true,
            width:100,
            hidden:false,
            align:'center'
        },
        {
            text:'PIN',
            dataIndex:'pin',
            sortable:false,
            width:60,
            hidden:true
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
            text:'Hari',
            dataIndex:'hari',
            sortable:false,
            width:80,
            hidden:false,
            align:'center'
        },
            {
                text: 'Pantangan', 
                dataIndex: 'is_pantangan', 
                xtype:'checkcolumn',
                align:'center',
                processEvent:function(){return false;},
                width:80
            },
        {
            header: 'Jadwal Seharusnya',
            columns:[{
            text:'Shift',
            dataIndex:'kode_shift',
            sortable:false,
            width:80,
            hidden:false,
            align:'center'
        },
            {
                text: 'I/Masuk', 
                dataIndex: 'jam_kerja_1', 
                align:'center',
                xtype: 'datecolumn',   
                format:'H:i',
                width:100
            },
            {
                text: 'II/Keluar/Pulang', 
                dataIndex: 'jam_kerja_2', 
                align:'center',
                xtype: 'datecolumn',   
                format:'H:i',
                width:100
            },
            {
                text: 'III/Masuk', 
                dataIndex: 'jam_kerja_3', 
                align:'center',
                xtype: 'datecolumn',   
                format:'H:i',
                width:100
            },
            {
                text: 'IV/Keluar/Pulang', 
                dataIndex: 'jam_kerja_4', 
                align:'center',
                xtype: 'datecolumn',   
                format:'H:i',
                width:100
            }]
        },
        
        {
            header: 'Realisasi',
            columns:[{
            text:'Masuk',
            xtype:'datecolumn',
            dataIndex:'masuk',
            sortable:false,
            width:100,
            hidden:false,
            align:'center',   
            format:'H:i'
        },
        {
            text:'Keluar',
            xtype:'datecolumn',
            dataIndex:'keluar',
            sortable:false,
            width:100,
            hidden:false,
            align:'center',   
            format:'H:i'
        },
        {
            text:'Masuk Kembali',
            xtype:'datecolumn',
            dataIndex:'masuk_kembali',
            sortable:false,
            width:100,
            hidden:false,
            align:'center',   
            format:'H:i'
        },
        {
            text:'Pulang',
            xtype:'datecolumn',
            dataIndex:'pulang',
            sortable:false,
            width:100,
            hidden:false,
            align:'center',   
            format:'H:i'
        },{
            text:'JamAbsen',            
            dataIndex:'jmljamabsen',
            sortable:false,
            width:100,
            hidden:false,
            align:'right'
        },{
            text:'Lembur Masuk',
            xtype:'datecolumn',
            dataIndex:'lembur_masuk',
            sortable:false,
            width:100,
            hidden:false,
            align:'center',   
            format:'H:i'
        },{
            text:'Lembur Keluar',
            xtype:'datecolumn',
            dataIndex:'lembur_keluar',
            sortable:false,
            width:100,
            hidden:false,
            align:'center',   
            format:'H:i'
        }]
        }
        ,
        
        {
            text:'Tanggal Koreksi',            
            dataIndex:'tglkoreksi',
            sortable:false,
            width:100,
            hidden:false,
            align:'left'
        },
        
        {
            text:'Koreksi_By',            
            dataIndex:'koreksi_by',
            sortable:false,
            width:100,
            hidden:false,
            align:'left'
        }

        

        
        ],
        tbar:[
        
        {
            xtype: 'textfield',
            id:'koreksiabsensisearch',
//            store: 'storejadwal',
            width: 280,
            emptyText: 'Search Nik,Nama,Jabatan...',
//            enableKeyEvents:true,
            listeners:{
                specialkey: function(field, e){
                    if (e.getKey() == e.ENTER) {
                        var ctrl=Ext.getCmp('2b2').getController();
                        ctrl.onSearchKoreksiAbsensi();
//                        var form = field.up('form').getForm();
//                        form.submit();
                    }
                }
            }
            
        },
        '-',
        {
            fieldLabel:'Periode',
            xtype: 'monthfield',                                                                                                                       
            width:190,
            labelWidth:50,
            format:'Y-F'
            ,id:'koreksiabsensi_thbl'
        },
        {
            fieldLabel:'Minggu Ke',
            labelWidth:70,
            xtype: 'numberfield',                                                                                                                       
            width:140,
            minValue:1,
            maxValue:5,
            id:'koreksiabsensi_minggu'
        },
        {
            text:'Search',
            iconCls:Ext.baseCSSPrefix + 'form-search-trigger',
            handler:'onSearchKoreksiAbsensi'//Ext.Date.format(valuedate, dateformat);
        },
        {
            xtype: 'datefield',
            id:'koreksiabsensi_start',
            format:'Y-m-d',
            width:100,
            hidden:false,
            readOnly:true
            
        },
        
        {
            xtype: 'datefield',
            id:'koreksiabsensi_finish',
            format:'Y-m-d',
            width:100,
            hidden:false,
            readOnly:true
            
            
        }
        
        
        ],
        bbar: [                
        
        {
            xtype: 'pagingtoolbar',
            displayInfo: true,
            pageSize: 10,
            store: 'storekoreksiabsensi'
        }]
    //        ,
    //        features:[{
    //            ftype: 'grouping',            
    //            groupHeaderTpl: '<b>{name}',
    //            hideGroupedHeader: false,
    //            startCollapsed: false,
    //            id: 'storetukaroff_grouping'
    //        }]
    }],
    listeners:{
        show:'onShow'
    }
});
