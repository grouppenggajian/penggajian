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
            
            text: 'Tanggal',  
            dataIndex: 'tanggal',
            xtype: 'datecolumn',   
            format:'d-m-Y', 
            align:'center',
            hidden:false,      
            editor:
            {
                xtype:'datefield',
                id:'inputjadwal_tanggal',                    
                format:'d-m-Y',                
                width: 95,
                name: 'inputjadwal_tanggal',
                itemId: 'itemIdinputjadwal_tanggal'  ,
                listeners:{
                    select:function ( me , value , eOpts ){
                        var gridstore=Ext.getCmp('gridinputjadwal').store;
                        var frec= gridstore.findRecord('tanggal',value);
                        if(!frec){
                            var recgrid=      Ext.getCmp('gridinputjadwal').getSelection();
                            recgrid[0].set('hari',datahari[value.getDay()]);//                   
                        }else{
                            me.setValue(null);
                            Ext.getCmp('gridinputjadwal').getPlugin().cancelEdit();
                        }
                    }
                }
            }
        },
        {
            
            text: 'Hari',  
            dataIndex: 'hari',
            align:'left',
            hidden:false
        },
        {
            text: 'Kode Shift',  
            dataIndex: 'kode_shift',
            align:'center',
            hidden:false,            
            editor:{
                xtype:'twincombo',
                id:'inputjadwal_kode_shift',                    
                menu:'jadwalshifteditor',                    
                width: 95,
                name: 'inputjadwal_kode_shift',
                itemId: 'itemIdinputjadwal_kode_shift'
                    
            }
        },{
            text: 'I/Masuk', 
            dataIndex: 'jam_kerja_1', 
            align:'left',
            xtype: 'datecolumn',   
            format:'H:i',
            flex: 1
        },
        {
            text: 'II/Keluar/Pulang', 
            dataIndex: 'jam_kerja_2', 
            align:'left',
            xtype: 'datecolumn',   
            format:'H:i',
            flex: 1
        },
        {
            text: 'III/Masuk', 
            dataIndex: 'jam_kerja_3', 
            align:'left',
            xtype: 'datecolumn',   
            format:'H:i',
            flex: 1
        },
        {
            text: 'IV/Keluar/Pulang', 
            dataIndex: 'jam_kerja_4', 
            align:'left',
            xtype: 'datecolumn',   
            format:'H:i',
            flex: 1
        }
        ],
        tbar:[
        {
            text:'Add',
            iconCls:'icons-add',
            handler:'onClickAdd'
        },
        {
            xtype: 'textfield',
            id:'jadwalsearch',
//            store: 'storejadwal',
            width: 380,
            emptyText: 'Search Nik,Nama,Jabatan...',
//            enableKeyEvents:true,
            listeners:{
                specialkey: function(field, e){
                    if (e.getKey() == e.ENTER) {
                        var ctrl=Ext.getCmp('tab2a1').getController();
                        ctrl.onClickSearchJadwal();
//                        var form = field.up('form').getForm();
//                        form.submit();
                    }
                }
            }
            
        },
{
            xtype: 'datefield',
            id:'jadwal_start',
            format:'d-m-Y',
            width:125
        },
        ' s/d ',
        {
            xtype: 'datefield',
            id:'jadwal_finish',
            format:'d-m-Y',
            width:125
        },
        {
            text:'Search',
            iconCls:Ext.baseCSSPrefix + 'form-search-trigger',
            handler:'onClickSearchJadwal'
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
