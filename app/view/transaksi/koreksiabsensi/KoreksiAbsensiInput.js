Ext.define('Penggajian.view.transaksi.koreksiabsensi.KoreksiAbsensiInput', 
    {
        extend          : 'Ext.window.Window',
        title           : 'Input Koreksi Absensi',
        requires        : [
        'Penggajian.view.transaksi.koreksiabsensi.KoreksiAbsensiController',        
        'Penggajian.view.transaksi.koreksiabsensi.KoreksiAbsensiModel',
        'Penggajian.view.transaksi.koreksiabsensi.KoreksiAbsensiShiftEditor'
        ],
        controller:'koreksiabsensi',
        viewModel:'koreksiabsensi',
        //        plugins: {
        //            ptype: 'datatip'
        //        },
        width           : 622,
        height          : 510,
        layout          : 'fit',
        autoShow        : true,
        modal           : true,
        alias           : 'widget.koreksiabsensiinput',
        id              : 'koreksiabsensi_input',
        maximizable     :false,
        closeAction:'destroy',
        items:[
        {
            xtype:'form',
            id:'formkoreksiabsensiinput',
            defaults        : {
                allowBlank: false,
                labelAlign: 'left',
                labelWidth: 100
            },
            monitorValid: true,
            url: null ,
            buttonAlign     : 'center',
            padding         : 5,
            style           : 'background-color: #fff;',
            border          : false,
            items:[
                {
                xtype:'fieldset',                
                collapsible:false,
                layout:'anchor',
                anchor:'100%',
                padding:'15 15 5 15',
                defaults:{
                    hideEmptyLabel: true
                    ,labelWidth:80
                },
                items:[
                {
                        xtype:'textfield',
                        fieldLabel: 'KODE_JABATAN',
                        name: 'kode_jabatan',
                        id: 'koreksiabsensikode_jabatan',
                        flex:1,
                        //                                tooltip: 'Maximal 8 character Field tidak boleh kosong',
                        afterLabelTextTpl: required_css,
                        //                                fieldStyle: 'text-transform:uppercase;',
                        //                fieldLabel: 'Nama',
                        //                        labelWidth : '10',
                        //                        labelStyle: 'width:120px; white-space: nowrap;text-transform:propercase;', 
                        anchor    : '75%',
                        hiddenName:'kode_jabatan',
                        allowBlank: false  ,  
                        readOnly:true,
                        width:210,
                        hidden:true
                                
                    }
                    ,    
                
                {
                
                    xtype: 'fieldcontainer',                
                    defaultType: 'textfield',
                    anchor:'100%',                
                    layout: 'hbox',
                    defaults: {
                        labelWidth: 80,
                        allowBlank: false,
                        labelAlign: 'left'
                    },
                    items: [
                    {
                        xtype:'textfield',
                        fieldLabel: 'NIK',
                        name: 'nik',
                        id: 'koreksiabsensinik',
                        flex:1,
                        //                                tooltip: 'Maximal 8 character Field tidak boleh kosong',
                        afterLabelTextTpl: required_css,
                        //                                fieldStyle: 'text-transform:uppercase;',
                        //                fieldLabel: 'Nama',
                        //                        labelWidth : '10',
                        //                        labelStyle: 'width:120px; white-space: nowrap;text-transform:propercase;', 
                        anchor    : '75%',
                        hiddenName:'nik',
                        allowBlank: false  ,  
                        readOnly:true,
                        width:210                       
                                
                    }
                    ,{
                        xtype:'textfield',
                        name: 'nama',
                        id: 'koreksiabsensinama',
                        flex:1,
                        //                                tooltip: 'Maximal 8 character Field tidak boleh kosong',
                        afterLabelTextTpl: required_css,
                        //                                fieldStyle: 'text-transform:uppercase;',
                        //                fieldLabel: 'Nama',
                        //                        labelWidth : '10',
                        //                        labelStyle: 'width:120px; white-space: nowrap;text-transform:propercase;', 
                        anchor    : '75%',
                        hiddenName:'nama',
                        allowBlank: false  ,  
                        readOnly:true,
                        width:210                       
                                
                    }]
                },{
                
                    xtype: 'fieldcontainer',                
                    defaultType: 'textfield',
                    anchor:'100%',                
                    layout: 'hbox',
                    defaults: {
                        labelWidth: 80,
                        allowBlank: false,
                        labelAlign: 'left'
                    },
                    items: [
                    {
                        xtype:'datefield',
                        name: 'tgl',
                        id: 'koreksiabsensitgl',    
//                        minValue:new Date(),
                        afterLabelTextTpl: required_css,                        
                        fieldLabel: 'Tanggal',
                        hiddenName:'tgl',
                        allowBlank: false,            
                        format:'d-m-Y',
                        readOonly:true,
                        //                                    labelAlign:'right',
                        //                                    labelWidth:120,
                        width:225
//                        ,listeners:{
//                            select:function ( dfield , value , eOpts ){
//                                console.log(datahari[value.getDay()]);
//                                Ext.getCmp('koreksiabsensihari').setValue(datahari[value.getDay()]);
//                                var ctrl=Ext.getCmp('koreksiabsensi_input').conttroller;
//                                             
//                                if(Ext.getCmp('koreksiabsensinik').getValue() && Ext.getCmp('koreksiabsensikode_jabatan').getValue()){
//                                    var mysqtore=Ext.getCmp('koreksiabsensi_input').getViewModel().getData().shiftkoreksiabsensi;
//                                    mysqtore.load({
//                                        params:{
//                                            nik:Ext.getCmp('koreksiabsensinik').getValue(),
//                                            kode_jabatan:Ext.getCmp('koreksiabsensikode_jabatan').getValue(),
//                                            tanggal:value.toMysql()
//                                        }
//                                        ,
//                                        callback:function(records, operation, success) {
//                                            if(success){
//                                                if(records.length>0){
//                                                    Ext.getCmp('koreksiabsensikode_shift').setValue(records[0].get('kode_shift'));
//                                                    Ext.getCmp('koreksiabsensijam_kerja_1').setValue(records[0].get('jam_kerja_1'));
//                                                    Ext.getCmp('koreksiabsensijam_kerja_2').setValue(records[0].get('jam_kerja_2'));
//                                                    Ext.getCmp('koreksiabsensijam_kerja_3').setValue(records[0].get('jam_kerja_3'));
//                                                    Ext.getCmp('koreksiabsensijam_kerja_4').setValue(records[0].get('jam_kerja_4'));
//                                                }
//                                            }
//                                        }
//                                    });
//                                }else{
//                                    var msg=
//                                    Ext.Msg.show({
//                                        title:'Message Warning',
//                                        msg: 'Nik/Jabatan Belum Diisi!',
//                                        alwaysOnTop:true,
//                                        buttons: Ext.Msg.OK,
//                                        icon: Ext.Msg.WARNING
//                                    });
//                                    Ext.defer(function () {
//                                        msg.toFront();
//                                    }, 100);
//                                }
//                                             
//                            }
//
//                        }

                    },{
                        xtype:'textfield',
                        name: 'hari',
                        id: 'koreksiabsensihari',
                        flex:1,
                        //                                tooltip: 'Maximal 8 character Field tidak boleh kosong',
                        afterLabelTextTpl: required_css,
                        //                                fieldStyle: 'text-transform:uppercase;',
                        //                fieldLabel: 'Nama',
                        //                        labelWidth : '10',
                        //                        labelStyle: 'width:120px; white-space: nowrap;text-transform:propercase;', 
                        anchor    : '75%',
                        hiddenName:'hari',
                        allowBlank: false  ,  
                        readOnly:true,
                        width:210                       

                    },
                    {
                        xtype:'checkbox',
                        boxLabel: 'Hari Pantangan',
                        name: 'is_pantangan',
                        id: 'koreksiabsensiis_pantangan',
                        readOnly:true,
                        hiddenName:'is_pantangan',
                        padding:'0 5 3 10' ,
                        width:225
                    },
                    
//                    {
//                xtype:'combo',
//                name: 'kode_shift',
//                id: 'koreksiabsensikode_shift',                        
//                afterLabelTextTpl: required_css,                        
////                fieldLabel: 'Jabatan',
//                anchor    : '75%',
//                hiddenName:'kode_shift',
//                allowBlank: false,   
//                bind:{
//                    store:'{shiftkoreksi}'
//                },
////                store: 'storejabatancombo',
//                valueField: 'kode_shift',
//                displayField: 'kode_shift',
//                typeAhead: true,
//                triggerAction: 'all' ,
//                hideTrigger:false,
//                queryParam:'searchvalue',
//                width:210,
//                readOnly:false
//            }
//                    ,{
//                        xtype:'textfield',
//                        name: 'kode_shift',
//                        id: 'koreksiabsensikode_shift',
//                        flex:1,
//                        //                                tooltip: 'Maximal 8 character Field tidak boleh kosong',
//                        afterLabelTextTpl: required_css,
//                        //                                fieldStyle: 'text-transform:uppercase;',
//                        //                fieldLabel: 'Nama',
//                        //                        labelWidth : '10',
//                        //                        labelStyle: 'width:120px; white-space: nowrap;text-transform:propercase;', 
//                        anchor    : '75%',
//                        hiddenName:'kode_shift',
//                        allowBlank: false  ,  
//                        readOnly:true,
//                        width:210                       
//
//                    }
                                
                                
                    ]
                },{
                        xtype:'twincombo',
                        id:'koreksiabsensikode_shift',        
                        afterLabelTextTpl: required_css,                        
                        fieldLabel: 'Shift',
                        labelAlign: 'right',
                        menu:'koreksiabsensishifteditor',                                    
                        name: 'kode_shift',
                        itemId: 'itemIdkoreksiabsensikode_shift' ,
                        width:225  
                    },
                {
                    xtype: 'fieldcontainer',
                    hideEmptyLabel: false,
//                    labelWidth:55,
                    labelAlign:'left',
//                                    fieldLabel: 'Jam Kerja',
                    //                margin: '0 0 2 0',  
                    //                afterLabelTextTpl: required_css,
                    //                    labelStyle: 'font-weight:bold;padding:0;',
                    layout: 'hbox',
                    defaultType: 'numericfield',

                    fieldDefaults: {
                        labelAlign: 'top'
                                    
                        ,
                        fieldStyle:'text-align:center;'
                        ,
                        labelSeparator:''
                    },
                    anchor:'100%',

                    items: [
                    {
                        xtype: 'timespinner',
                        width: 120,
                        name: 'jam_kerja_1',
                        id: 'koreksiabsensijam_kerja_1',
                        fieldLabel: 'I/Masuk',                          
                        labelStyle:'text-align:center;background-color:#5FA2DD;color:white;',
                        minValue:'06:00' ,
                        maxValue: '23:00',
                        readOnly:true
                    },{
                        xtype: 'timespinner',
                        width: 120,
                        name: 'jam_kerja_2',
                        id: 'koreksiabsensijam_kerja_2',
                        fieldLabel: 'II/Keluar/Pulang',  
                        labelStyle:'text-align:center;background-color:#5FA2DD;color:white;',
                        minValue:'06:00' ,
                        maxValue: '23:00',
                        readOnly:true
                    },{
                        xtype: 'timespinner',
                        width: 120,
                        name: 'jam_kerja_3',
                        id: 'koreksiabsensijam_kerja_3',
                        fieldLabel: 'III/Masuk',  
                        labelStyle:'text-align:center;background-color:#5FA2DD;color:white;',
                        minValue:'06:00' ,
                        maxValue: '23:00',
                        readOnly:true
                    },{
                        xtype: 'timespinner',
                        width: 120,
                        flex:1,
                        name: 'jam_kerja_4',
                        id: 'koreksiabsensijam_kerja_4',
                        fieldLabel: 'IV/Keluar/Pulang',  
                        labelStyle:'text-align:center;background-color:#5FA2DD;color:white;',
                        minValue:'06:00' ,
                        maxValue: '23:00',
                        readOnly:true
                    }
                    
                    ]
                },{
                    xtype: 'fieldcontainer',
                    hideEmptyLabel: false,
//                    labelWidth:55,
                    labelAlign:'left',
                                    fieldLabel: 'Absensi',
                    //                margin: '0 0 2 0',  
                    //                afterLabelTextTpl: required_css,
                    //                    labelStyle: 'font-weight:bold;padding:0;',
                    layout: 'hbox',
                    defaultType: 'numericfield',

                    fieldDefaults: {
                        labelAlign: 'top',
                                    
//                        ,allowBlank: false  ,  
                        fieldStyle:'text-align:center;'
                        ,
                        labelSeparator:''
                    },
                    anchor:'100%',

                    items: [
                    {
                        xtype: 'timespinner',
                        width: 120,
                        name: 'masuk',
                        id: 'koreksiabsensimasuk',
                        fieldLabel: 'Masuk',                          
                        labelStyle:'text-align:center;background-color:#5FA2DD;color:white;',
                        minValue:'06:00' ,
                        maxValue: '23:00',
                        readOnly:false
                    },{
                        xtype: 'timespinner',
                        width: 120,
                        name: 'keluar',
                        id: 'koreksiabsensikeluar',
                        fieldLabel: 'Keluar',  
                        labelStyle:'text-align:center;background-color:#5FA2DD;color:white;',
                        minValue:'06:00' ,
                        maxValue: '23:00',
                        readOnly:false
                    },{
                        xtype: 'timespinner',
                        width: 120,
                        name: 'masuk_kembali',
                        id: 'koreksiabsensimasuk_kembali',
                        fieldLabel: 'Masuk Kembali',  
                        labelStyle:'text-align:center;background-color:#5FA2DD;color:white;',
                        minValue:'06:00' ,
                        maxValue: '23:00',
                        readOnly:false
                    },{
                        xtype: 'timespinner',
                        width: 120,
                        flex:1,
                        name: 'pulang',
                        id: 'koreksiabsensipulang',
                        fieldLabel: 'Pulang',  
                        labelStyle:'text-align:center;background-color:#5FA2DD;color:white;',
                        minValue:'06:00' ,
                        maxValue: '23:00',
                        readOnly:false
                    }
                    
                    ]
                },{
                    xtype: 'fieldcontainer',
                    hideEmptyLabel: false,
//                    labelWidth:55,
                    labelAlign:'left',
                                    fieldLabel: 'Absensi Lembur',
                    //                margin: '0 0 2 0',  
                    //                afterLabelTextTpl: required_css,
                    //                    labelStyle: 'font-weight:bold;padding:0;',
                    layout: 'hbox',
                    defaultType: 'numericfield',

                    fieldDefaults: {
                        labelAlign: 'top'
                                    
                        ,
                        allowBlank: true  ,  
                        fieldStyle:'text-align:center;'
                        ,
                        labelSeparator:''
                    },
                    anchor:'100%',

                    items: [
                    {
                        xtype: 'timespinner',
                        width: 120,
                        name: 'lembur_masuk',
                        id: 'koreksiabsensilembur_masuk',
                        fieldLabel: 'Lembur Masuk',                          
                        labelStyle:'text-align:center;background-color:#5FA2DD;color:white;',
                        minValue:'06:00' ,
                        maxValue: '23:00',
                        readOnly:false
                    },{
                        xtype: 'timespinner',
                        width: 120,
                        name: 'lembur_keluar',
                        id: 'koreksiabsensilembur_keluar',
                        fieldLabel: 'Lembur Keluar',  
                        labelStyle:'text-align:center;background-color:#5FA2DD;color:white;',
                        minValue:'06:00' ,
                        maxValue: '23:00',
                        readOnly:false
                    }
                    
                    ]
                },{
                        xtype:'textfield',
                        name: 'keterangan',
                        id: 'koreksiabsensiketerangan',
//                        flex:1,
                        //                                tooltip: 'Maximal 8 character Field tidak boleh kosong',
                        afterLabelTextTpl: required_css,
                        //                                fieldStyle: 'text-transform:uppercase;',
                                        fieldLabel: 'Keterangan',
                        //                        labelWidth : '10',
                        //                        labelStyle: 'width:120px; white-space: nowrap;text-transform:propercase;', 
                        anchor    : '100%',
                        hiddenName:'keterangan',
                        allowBlank: false  ,  
                        readOnly:false,
                        width:210                       
                                
                    }
                ]
            }
            ]
            ,
            buttons : [
            {
                text: 'Simpan',                    
                itemId: 'btnsave',
                id:'idButtonKoreksiAbsensiInputSave',
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
        ]
    })