Ext.define('Penggajian.view.transaksi.ijin.IjinInput', 
    {
        extend          : 'Ext.window.Window',
        title           : 'Input Ijin',
        requires        : [
        'Penggajian.view.transaksi.ijin.IjinController',
        'Penggajian.view.transaksi.ijin.IjinNikEditor',
        'Penggajian.view.transaksi.ijin.IjinModel'
        ],
        controller:'ijin',
        viewModel:'ijin',
        //        plugins: {
        //            ptype: 'datatip'
        //        },
        width           : 622,
        height          : 480,
        layout          : 'fit',
        autoShow        : true,
        modal           : true,
        alias           : 'widget.ijininput',
        id              : 'ijin_input',
        maximizable     :false,
        closeAction:'destroy',
        items:[
        {
            xtype:'form',
            id:'formijininput',
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
                        name: 'no_ijin',
                        id: 'ijinno_ijin',
                        flex:1,
                        //                                tooltip: 'Maximal 8 character Field tidak boleh kosong',
                        afterLabelTextTpl: required_css,
                        //                                fieldStyle: 'text-transform:uppercase;',
                        //                fieldLabel: 'Nama',
                        //                        labelWidth : '10',
                        //                        labelStyle: 'width:120px; white-space: nowrap;text-transform:propercase;', 
                        anchor    : '75%',
                        hiddenName:'no_ijin',
                        allowBlank: true  ,  
                        readOnly:false,
                        hidden:true,
                        width:210                       
                                
                    },
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
                    items: [{
                        xtype:'twincombo',
                        id:'ijinnik',        
                        afterLabelTextTpl: required_css,                        
                        fieldLabel: 'NIK',
                        menu:'ijin_nik_editor',                                    
                        name: 'nik',
                        itemId: 'itemIdijin_nik' ,
                        width:225  
                    }
            
                    ,{
                        xtype:'textfield',
                        name: 'nama',
                        id: 'ijinnama',
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
                xtype:'combo',
                name: 'kode_jabatan',
                id: 'ijinkode_jabatan',                        
                afterLabelTextTpl: required_css,                        
                fieldLabel: 'Jabatan',
                anchor    : '100%',
                hiddenName:'kode_jabatan',
                allowBlank: false,                                             
                store: 'storejabatancombo',
                valueField: 'kode_jabatan',
                displayField: 'nama_jabatan',
                typeAhead: true,
                triggerAction: 'all' ,
                hideTrigger:false,
                queryParam:'searchvalue',
                width:400,
                readOnly:true
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
                        name: 'tanggal',
                        id: 'ijintangggal',    
                        minValue:new Date(),
                        afterLabelTextTpl: required_css,                        
                        fieldLabel: 'Tanggal',
                        hiddenName:'tanggal',
                        allowBlank: false,            
                        format:'d-m-Y',
                        //                                    labelAlign:'right',
                        //                                    labelWidth:120,
                        width:225,
                        listeners:{
                            select:function ( dfield , value , eOpts ){
                                console.log(datahari[value.getDay()]);
                                Ext.getCmp('ijinhari').setValue(datahari[value.getDay()]);
                                var ctrl=Ext.getCmp('ijin_input').conttroller;
                                             
                                if(Ext.getCmp('ijinnik').getValue() && Ext.getCmp('ijinkode_jabatan').getValue()){
                                    var mysqtore=Ext.getCmp('ijin_input').getViewModel().getData().shiftijin;
                                    mysqtore.load({
                                        params:{
                                            nik:Ext.getCmp('ijinnik').getValue(),
                                            kode_jabatan:Ext.getCmp('ijinkode_jabatan').getValue(),
                                            tanggal:value.toMysql()
                                        }
                                        ,
                                        callback:function(records, operation, success) {
                                            if(success){
                                                if(records.length>0){
                                                    Ext.getCmp('ijinkode_shift').setValue(records[0].get('kode_shift'));
                                                    Ext.getCmp('ijinjam_kerja_1').setValue(records[0].get('jam_kerja_1'));
                                                    Ext.getCmp('ijinjam_kerja_2').setValue(records[0].get('jam_kerja_2'));
                                                    Ext.getCmp('ijinjam_kerja_3').setValue(records[0].get('jam_kerja_3'));
                                                    Ext.getCmp('ijinjam_kerja_4').setValue(records[0].get('jam_kerja_4'));
                                                }
                                            }
                                        }
                                    });
                                }else{
                                    var msg=
                                    Ext.Msg.show({
                                        title:'Message Warning',
                                        msg: 'Nik/Jabatan Belum Diisi!',
                                        alwaysOnTop:true,
                                        buttons: Ext.Msg.OK,
                                        icon: Ext.Msg.WARNING
                                    });
                                    Ext.defer(function () {
                                        msg.toFront();
                                    }, 100);
                                }
                                             
                            }

                        }

                    },{
                        xtype:'textfield',
                        name: 'hari',
                        id: 'ijinhari',
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

                    }
                    ,{
                        xtype:'textfield',
                        name: 'kode_shift',
                        id: 'ijinkode_shift',
                        flex:1,
                        //                                tooltip: 'Maximal 8 character Field tidak boleh kosong',
                        afterLabelTextTpl: required_css,
                        //                                fieldStyle: 'text-transform:uppercase;',
                        //                fieldLabel: 'Nama',
                        //                        labelWidth : '10',
                        //                        labelStyle: 'width:120px; white-space: nowrap;text-transform:propercase;', 
                        anchor    : '75%',
                        hiddenName:'kode_shift',
                        allowBlank: false  ,  
                        readOnly:true,
                        width:210                       

                    }
                                
                                
                    ]
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
                        id: 'ijinjam_kerja_1',
                        fieldLabel: 'I/Masuk',                          
                        labelStyle:'text-align:center;background-color:#5FA2DD;color:white;',
                        minValue:'06:00' ,
                        maxValue: '23:00',
                        readOnly:true
                    },{
                        xtype: 'timespinner',
                        width: 120,
                        name: 'jam_kerja_2',
                        id: 'ijinjam_kerja_2',
                        fieldLabel: 'II/Keluar/Pulang',  
                        labelStyle:'text-align:center;background-color:#5FA2DD;color:white;',
                        minValue:'06:00' ,
                        maxValue: '23:00',
                        readOnly:true
                    },{
                        xtype: 'timespinner',
                        width: 120,
                        name: 'jam_kerja_3',
                        id: 'ijinjam_kerja_3',
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
                        id: 'ijinjam_kerja_4',
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
                                    fieldLabel: 'Jam Ijin',
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
                        name: 'jam_awal',
                        id: 'ijinjam_awal',
                        fieldLabel: 'Awal',      allowBlank: false,                       
                        labelStyle:'text-align:center;background-color:#5FA2DD;color:white;',
                        minValue:'06:00' ,
                        maxValue: '23:00',
                        readOnly:false
                    },{
                        xtype: 'timespinner',
                        width: 120,
                        name: 'jam_akhir',
                        id: 'ijinjam_akhir',
                        fieldLabel: 'Akhir',  allowBlank: false,   
                        labelStyle:'text-align:center;background-color:#5FA2DD;color:white;',
                        minValue:'06:00' ,
                        maxValue: '23:00',
                        readOnly:false
                    },{
                        xtype:'combo',
                        name: 'tipe_ijin',
                        id: 'ijintipe_ijin',                        
//                        afterLabelTextTpl: required_css,                        
                        fieldLabel: 'Tipe Ijin',
                        labelStyle:'text-align:center;background-color:#5FA2DD;color:white;',
                        anchor    : '100%',
                        hiddenName:'tipe_ijin',
                        allowBlank: false,                        
                        store: createArrayStore(datatipeijin),
                        valueField: 'mid',
                        displayField: 'mtext',
                        typeAhead: true,
                        triggerAction: 'all' ,
                        hideTrigger:false,
//                        queryParam:'searchvalue',
                        width:250,
                        readOnly:false
                    }
                    
                    ]
                },{
                xtype:'combo',
                name: 'kategori_ijin',
                id: 'ijinkategori_ijin',                        
                afterLabelTextTpl: required_css,                        
                fieldLabel: 'Kategori Ijin',
                anchor    : '100%',
                hiddenName:'kategori_ijin',
                allowBlank: false,
                bind:{
                    store: '{storekategori_absen}'
                },
//                store: 'storejabatancombo',
                valueField: 'kode',
                displayField: 'keterangan',
                typeAhead: true,
                triggerAction: 'all' ,
                hideTrigger:false,
                queryParam:'searchvalue',
                width:400,
                readOnly:false
            } ,{
                        xtype:'textfield',
                        name: 'keterangan',
                        id: 'ijinketerangan',
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
                id:'idButtonIjinInputSave',
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