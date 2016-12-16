Ext.define('Penggajian.view.transaksi.jadwal.JadwalInput', 
    {
        extend          : 'Ext.window.Window',
        title           : 'Input Jadwal',
        requires        : [
        'Penggajian.view.transaksi.jadwal.JadwalController',
        'Penggajian.view.transaksi.jadwal.JadwalNikEditor',
        'Penggajian.view.transaksi.jadwal.JadwalShiftEditor',
        'Ext.ux.TwinCombo'
        ],
        controller:'jadwal',
        //        plugins: {
        //            ptype: 'datatip'
        //        },
        width           : 850,
        height          : 420,
        layout          : 'fit',
        autoShow        : true,
        modal           : true,
        alias           : 'widget.jadwalinput',
        id              : 'jadwal_input',
        maximizable     :false,
        closeAction:'destroy',
        items:[
        {
            xtype:'form',
            id:'formjadwalinput',
            defaults        : {
                allowBlank: false,
                labelAlign: 'left',
                labelWidth: 100
            },
            bodyPadding:5,
            monitorValid: true,
            url: null ,
            buttonAlign     : 'center',
            padding         : 5,
            style           : 'background-color: #fff;',
            border          : false,
            items:[
                {
                    xtype:'twincombo',
                    id:'jadwalnik',        
                    afterLabelTextTpl: required_css,                        
                    fieldLabel: 'NIK',
                    menu:'jadwal_nik_editor',                    
                    //                        width: 95,
                    name: 'nik',
                    itemId: 'itemIdjadwal_nik'  
//                    ,listeners:{
//                        validitychange:function ( me , isValid , eOpts ){
//                            if(isValid){
//                                Ext.getCmp('pinjaman_nama').setValue(me.getValue());
//                            }
//                        }
//                    }
                    
                },
                {
                    xtype:'combo',
                    name: 'nama',
                    id: 'jadwalnama',                        
                    afterLabelTextTpl: required_css,                        
                    fieldLabel: 'Pegawai',
                    anchor    : '75%',
                    hiddenName:'nama',
                    allowBlank: false,                                             
                    store: 'storepegawaicombo',
                    valueField: 'nik',
                    displayField: 'nama',
                    typeAhead: true,
                    triggerAction: 'all' ,
                    hideTrigger:true,
                    width:320
                },{
                    xtype:'combo',
                    name: 'kode_jabatan',
                    id: 'jadwalkode_jabatan',                        
                    afterLabelTextTpl: required_css,                        
                    fieldLabel: 'Jabatan',
                    anchor    : '75%',
                    hiddenName:'nama',
                    allowBlank: false,                                             
                    store: 'storejabatancombo',
                    valueField: 'kode_jabatan',
                    displayField: 'nama_jabatan',
                    typeAhead: true,
                    triggerAction: 'all' ,
                    hideTrigger:true,
                    width:400
                },
                {
        xtype:'grid',
        //                height:300,
//        autoScroll:true,
        //                        region:'center',                           
        id:'gridinputjadwal',
        //                title:'Pendapatan',
        //                        width:450,
        store: 'storeinputjadwal',
        stripeRows: true,
        loadMask: true,
        stateful:true,
        stateId:'stateGridinputjadwal',        
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
////                        Ext.getCmp('gridinputjadwal').getStore().remove(context.record);
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
                handler: 'onDeleteInputJadwal' 
            }]
                
        },{
            text: 'Senin',  
            dataIndex: 'senin',
            align:'center',
            hidden:false,            
                    editor:{
                        xtype:'twincombo',
                        id:'inputjadwal_senin',                    
                        menu:'jadwalshifteditor',                    
                        width: 95,
                        name: 'inputjadwal_senin',
                        itemId: 'itemIdinputjadwal_senin'  ,
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
                        id:'inputjadwal_selasa',                    
                        menu:'jadwalshifteditor',                    
                        width: 95,
                        name: 'inputjadwal_selasa',
                        itemId: 'itemIdinputjadwal_selasa'  ,
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
                        id:'inputjadwal_rabu',                    
                        menu:'jadwalshifteditor',                    
                        width: 95,
                        name: 'inputjadwal_rabu',
                        itemId: 'itemIdinputjadwal_rabu'  ,
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
                        id:'inputjadwal_kamis',                    
                        menu:'jadwalshifteditor',                    
                        width: 95,
                        name: 'inputjadwal_kamis',
                        itemId: 'itemIdinputjadwal_kamis'  ,
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
                        id:'inputjadwal_jumat',                    
                        menu:'jadwalshifteditor',                    
                        width: 95,
                        name: 'inputjadwal_jumat',
                        itemId: 'itemIdinputjadwal_jumat'  ,
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
                        id:'inputjadwal_sabtu',                    
                        menu:'jadwalshifteditor',                    
                        width: 95,
                        name: 'inputjadwal_sabtu',
                        itemId: 'itemIdinputjadwal_sabtu'  ,
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
                        id:'inputjadwal_minggu',                    
                        menu:'jadwalshifteditor',                    
                        width: 95,
                        name: 'inputjadwal_minggu',
                        itemId: 'itemIdinputjadwal_minggu'  ,
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
        }]}
               
            ]
            ,
            buttons : [
            {
                text: 'Simpan',                    
                itemId: 'btnsave',
                id:'idButtonJadwalInputSave',
                iconCls: 'icon-simpan',
                formBind: true,                       
                handler: 'onSave'
            },
            {
                text: 'Batal',
                action: 'cancel',
                itemId: 'btncancel',
                iconCls: 'icon-cancel',
                handler: function(me){
                    me.up('window').close();
                }
            }
            ]
        }
        ],
        listeners:{
        show:function(){
            var storegridjadwaledit=Ext.getCmp('gridinputjadwal').store;   
            storegridjadwaledit.removeAll ();
            if(Ext.getCmp('jadwalnik').getValue()){
                storegridjadwaledit.getProxy().setExtraParam('nik',Ext.getCmp('jadwalnik').getValue());
                storegridjadwaledit.getProxy().setExtraParam('kode_jabatan',Ext.getCmp('jadwaljabatan').getValue());
                storegridjadwaledit.load();
            }
            
            
            
        }
    }
    })