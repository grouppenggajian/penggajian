Ext.define('Penggajian.view.master.pegawai.PegawaiJadwal', {
    extend: 'Ext.container.Container',
    xtype: 'pegawaijadwal',
    alias: 'widget.PegawaiJadwal',   
    title: 'Jadwal',
    id: 'tabjadwalpegawai',
    requires:[
        'Penggajian.view.master.pegawai.PegawaiJadwalEditor',
    ],
    autoScroll:true,
    layout: 'fit', 
    items:[   
    {
        xtype:'grid',
        //                height:300,
//        autoScroll:true,
        //                        region:'center',                           
        id:'gridpegawaijadwal',
        //                title:'Pendapatan',
        //                        width:450,
        store: 'storepegawaijadwal',
        stripeRows: true,
        loadMask: true,
        stateful:true,
        stateId:'stateGridpegawaijadwal',        
        selModel:'cellmodel',
//            {
//            selType: 'rowmodel',
//            mode   : 'SINGLE'
//      
//        } ,
    
        plugins: {
            ptype: 'cellediting',
            clicksToEdit: 2
//            autoCancel: false,
//            listeners: {
//                cancelEdit: function(rowEditing, context) {
//                    // Canceling editing of a locally added, unsaved record: remove it
////                    if (context.record.phantom) {
////                        Ext.getCmp('gridpegawaijadwal').getStore().remove(context.record);
////                    }
//                }
//            }
        },
        columns:[
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
                handler: 'onDeletePegawaiJadwal' 
            }]
                
        },{
            text: 'Senin',  
            dataIndex: 'senin',
            align:'center',
            hidden:false,            
                    editor:{
                        xtype:'twincombo',
                        id:'pegawaijadwal_senin',                    
                        menu:'pegawaijadwaleditor',                    
                        width: 95,
                        name: 'pegawaijadwal_senin',
                        itemId: 'itemIdpegawaijadwal_senin'  ,
                        listeners:{
                            onChange:function(){}
                        }
                    
                    }
        },{
            text: 'Selasa',  
            dataIndex: 'selasa',
            align:'center',
            hidden:false,            
                    editor:{
                        xtype:'twincombo',
                        id:'pegawaijadwal_selasa',                    
                        menu:'pegawaijadwaleditor',                    
                        width: 95,
                        name: 'pegawaijadwal_selasa',
                        itemId: 'itemIdpegawaijadwal_selasa'  ,
                        listeners:{
                            onChange:function(){}
                        }
                    
                    }
        },{
            text: 'Rabu',  
            dataIndex: 'rabu',
            align:'center',
            hidden:false,            
                    editor:{
                        xtype:'twincombo',
                        id:'pegawaijadwal_rabu',                    
                        menu:'pegawaijadwaleditor',                    
                        width: 95,
                        name: 'pegawaijadwal_rabu',
                        itemId: 'itemIdpegawaijadwal_rabu'  ,
                        listeners:{
                            onChange:function(){}
                        }
                    
                    }
        },{
            text: 'Kamis',  
            dataIndex: 'kamis',
            align:'center',
            hidden:false,            
                    editor:{
                        xtype:'twincombo',
                        id:'pegawaijadwal_kamis',                    
                        menu:'pegawaijadwaleditor',                    
                        width: 95,
                        name: 'pegawaijadwal_kamis',
                        itemId: 'itemIdpegawaijadwal_kamis'  ,
                        listeners:{
                            onChange:function(){}
                        }
                    
                    }
        },{
            text: 'Jum\'at',  
            dataIndex: 'jumat',
            align:'center',
            hidden:false,            
                    editor:{
                        xtype:'twincombo',
                        id:'pegawaijadwal_jumat',                    
                        menu:'pegawaijadwaleditor',                    
                        width: 95,
                        name: 'pegawaijadwal_jumat',
                        itemId: 'itemIdpegawaijadwal_jumat'  ,
                        listeners:{
                            onChange:function(){}
                        }
                    
                    }
        },{
            text: 'Sabtu',  
            dataIndex: 'sabtu',
            align:'center',
            hidden:false,            
                    editor:{
                        xtype:'twincombo',
                        id:'pegawaijadwal_sabtu',                    
                        menu:'pegawaijadwaleditor',                    
                        width: 95,
                        name: 'pegawaijadwal_sabtu',
                        itemId: 'itemIdpegawaijadwal_sabtu'  ,
                        listeners:{
                            onChange:function(){}
                        }
                    
                    }
        },{
            text: 'Minggu',  
            dataIndex: 'minggu',
            align:'center',
            hidden:false,            
                    editor:{
                        xtype:'twincombo',
                        id:'pegawaijadwal_minggu',                    
                        menu:'pegawaijadwaleditor',                    
                        width: 95,
                        name: 'pegawaijadwal_minggu',
                        itemId: 'itemIdpegawaijadwal_minggu'  ,
                        listeners:{
                            onChange:function(){}
                        }
                    
                    }
        },
        ],
        tbar:[

        {
            text:'Refresh',
            iconCls:'icon-refresh',
            handler:'onClickRefreshJadwal'
        }],
        bbar:['->',{
            text: 'Simpan',                    
            itemId: 'btnsavepegawaijadwal',
            id:'btnsavepegawaijadwal',
            iconCls: 'icon-simpan',
            formBind: true,                       
            handler: 'onSavePegawaiJadwal'
        }]
    }
    ],
    listeners:{
        show:function(){
            var storegridjadwalpeg=Ext.getCmp('gridpegawaijadwal').store;   
            storegridjadwalpeg.removeAll ();
            if(Ext.getCmp('pegawainik').getValue()){
                storegridjadwalpeg.getProxy().setExtraParam('nik',Ext.getCmp('pegawainik').getValue());
                storegridjadwalpeg.getProxy().setExtraParam('kode_jabatan',Ext.getCmp('pegawaijabatan').getValue());
                storegridjadwalpeg.load();
            }
            
            
            
        }
    }
})