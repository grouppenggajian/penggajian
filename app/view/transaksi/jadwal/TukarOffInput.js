Ext.define('Penggajian.view.transaksi.jadwal.TukarOffInput', 
    {
        extend          : 'Ext.window.Window',
        title           : 'Input Tukar Off',
        requires        : [
        'Penggajian.view.transaksi.jadwal.TukarOffController',
        'Penggajian.view.transaksi.jadwal.TukarOffNikEditor',
        'Penggajian.view.transaksi.jadwal.TukarOffNikEditorTukar',
        'Penggajian.view.transaksi.jadwal.TukarOffModel'
        ],
        controller:'tukaroff',
        viewModel:'tukaroff',
        //        plugins: {
        //            ptype: 'datatip'
        //        },
        width           : 622,
        height          : 525,
        layout          : 'fit',
        autoShow        : true,
        modal           : true,
        alias           : 'widget.tukaroffinput',
        id              : 'tukaroff_input',
        maximizable     :false,
        closeAction:'destroy',
        items:[
        {
            xtype:'form',
            id:'formtukaroffinput',
            defaults        : {
                allowBlank: false,
                labelAlign: 'left',
                labelWidth: 96
                
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
                        xtype:'textfield',
                        name: 'no_tukar',
                        id: 'tukaroffno_tukar',
                        flex:1,
                        //                                tooltip: 'Maximal 8 character Field tidak boleh kosong',
                        afterLabelTextTpl: required_css,
                        //                                fieldStyle: 'text-transform:uppercase;',
                        //                fieldLabel: 'Nama',
                        //                        labelWidth : '10',
                        //                        labelStyle: 'width:120px; white-space: nowrap;text-transform:propercase;', 
                        anchor    : '75%',
                        hiddenName:'no_tukar',
                        allowBlank: true  ,  
                        readOnly:true,
                        width:210   
                        ,hidden:true
                                
                    },
            {
                xtype:'combo',
                name: 'kode_jabatan',
                id: 'tukaroffkode_jabatan',                        
                afterLabelTextTpl: required_css,                        
                fieldLabel: 'Jabatan',
                anchor    : '75%',
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
                listeners:{
                    select:function(){
                        Ext.getCmp('tukaroffnik').setValue(null);
                    }
                }
            },
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
                        id:'tukaroffnik',        
                        afterLabelTextTpl: required_css,                        
                        fieldLabel: 'NIK',
                        menu:'tukaroff_nik_editor',                                    
                        name: 'nik',
                        itemId: 'itemIdtukaroff_nik' ,
                        width:225  
                    }
            
                    ,{
                        xtype:'textfield',
                        name: 'nama',
                        id: 'tukaroffnama',
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
                        name: 'tanggal',
                        id: 'tukarofftanggal',    
                        minValue: new Date(),
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
//                              
                                
//                                if(value.toMysql()==new Date().toMysql()){
//                                    Ext.getCmp('tukarofftanggal').setValue(null);
//                                    Ext.getCmp('tukaroffhari').setValue(null);
//                                    return;
//                                }
                                    
                                if( !Ext.getCmp('tukaroffnik').getValue() || !Ext.getCmp('tukaroffkode_jabatan').getValue()){
//                                    set_message(2, 'Nik/Jabatan Belum Diisi!');
                                    Ext.getCmp('tukarofftanggal').setValue(null);
                                    Ext.getCmp('tukaroffhari').setValue(null);
                                    Ext.getCmp('tukaroffkode_shift').setValue(null);
                                    Ext.getCmp('tukaroffjam_kerja_1').setValue(null);
                                    Ext.getCmp('tukaroffjam_kerja_2').setValue(null);
                                    Ext.getCmp('tukaroffjam_kerja_3').setValue(null);
                                    Ext.getCmp('tukaroffjam_kerja_4').setValue(null);
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
                                    
                                    return;
                                }
                                            
                                Ext.getCmp('tukaroffhari').setValue(datahari[value.getDay()]);
                                var ctrl=Ext.getCmp('tukaroff_input').conttroller;
                                             
                                if(Ext.getCmp('tukaroffnik').getValue()){
                                    var mysqtore=Ext.getCmp('tukaroff_input').getViewModel().getData().shiftmaster;
                                    mysqtore.load({
                                        params:{
                                            nik:Ext.getCmp('tukaroffnik').getValue(),
                                            kode_jabatan:Ext.getCmp('tukaroffkode_jabatan').getValue(),
                                            tanggal:format_date_mysql(value)
                                        }
                                        ,
                                        callback:function(records, operation, success) {
                                            if(success){
                                                if(records.length>0){
                                                    Ext.getCmp('tukaroffkode_shift').setValue(records[0].get('kode_shift'));
                                                    Ext.getCmp('tukaroffjam_kerja_1').setValue(records[0].get('jam_kerja_1'));
                                                    Ext.getCmp('tukaroffjam_kerja_2').setValue(records[0].get('jam_kerja_2'));
                                                    Ext.getCmp('tukaroffjam_kerja_3').setValue(records[0].get('jam_kerja_3'));
                                                    Ext.getCmp('tukaroffjam_kerja_4').setValue(records[0].get('jam_kerja_4'));
                                                }
                                            }
                                        }
                                    });
                                }
                                             
                            }

                        }

                    },{
                        xtype:'textfield',
                        name: 'hari',
                        id: 'tukaroffhari',
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
                        id: 'tukaroffkode_shift',
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
                        id: 'tukaroffjam_kerja_1',
                        fieldLabel: 'I/Masuk',                          
                        labelStyle:'text-align:center;background-color:#5FA2DD;color:white;',
                        minValue:'06:00' ,
                        maxValue: '23:00',
                        readOnly:true
                    },{
                        xtype: 'timespinner',
                        width: 120,
                        name: 'jam_kerja_2',
                        id: 'tukaroffjam_kerja_2',
                        fieldLabel: 'II/Keluar/Pulang',  
                        labelStyle:'text-align:center;background-color:#5FA2DD;color:white;',
                        minValue:'06:00' ,
                        maxValue: '23:00',
                        readOnly:true
                    },{
                        xtype: 'timespinner',
                        width: 120,
                        name: 'jam_kerja_3',
                        id: 'tukaroffjam_kerja_3',
                        fieldLabel: 'III/Masuk',  
                        labelStyle:'text-align:center;background-color:#5FA2DD;color:white;',
                        minValue:'06:00' ,
                        maxValue: '23:00',
                        readOnly:true
                    },{
                        xtype: 'timespinner',
                        width: 120,
                        name: 'jam_kerja_4',
                        id: 'tukaroffjam_kerja_4',
                        fieldLabel: 'IV/Keluar/Pulang',  
                        labelStyle:'text-align:center;background-color:#5FA2DD;color:white;',
                        minValue:'06:00' ,
                        maxValue: '23:00',
                        readOnly:true
                    }
                    
                    ]
                }
                ]
            },
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
                        id:'tukaroffnik_tukar',        
                        afterLabelTextTpl: required_css,                        
                        fieldLabel: 'NIK',
                        menu:'tukaroff_nik_editor_tukar',                                    
                        name: 'nik_tukar',
                        itemId: 'itemIdtukaroff_nik_tukar' ,
                        width:225  
                    }
            
                    ,{
                        xtype:'textfield',
                        name: 'nama_tukar',
                        id: 'tukaroffnama_tukar',
                        flex:1,
                        //                                tooltip: 'Maximal 8 character Field tidak boleh kosong',
                        afterLabelTextTpl: required_css,
                        //                                fieldStyle: 'text-transform:uppercase;',
                        //                fieldLabel: 'Nama',
                        //                        labelWidth : '10',
                        //                        labelStyle: 'width:120px; white-space: nowrap;text-transform:propercase;', 
                        anchor    : '75%',
                        hiddenName:'nama_tukar',
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
                        name: 'tanggal_tukar',
                        id: 'tukarofftanggal_tukar',   
                        minValue:new Date(),
                        afterLabelTextTpl: required_css,                        
                        fieldLabel: 'Tanggal',
                        hiddenName:'tanggal_tukar',
                        allowBlank: false,            
                        format:'d-m-Y',
                        //                                    labelAlign:'right',
                        //                                    labelWidth:120,
                        width:225,
                        listeners:{
                            select:function ( dfield , value , eOpts ){
                                if( !Ext.getCmp('tukaroffnik_tukar').getValue() || !Ext.getCmp('tukaroffkode_jabatan').getValue()){
//                                    set_message(2, 'Nik/Jabatan Belum Diisi!');
                                    Ext.getCmp('tukarofftanggal_tukar').setValue(null);
                                    Ext.getCmp('tukaroffhari_tukar').setValue(null);
                                     Ext.getCmp('tukaroffkode_shift_tukar').setValue(null);
                                    Ext.getCmp('tukaroffjam_kerja_1_tukar').setValue(null);
                                    Ext.getCmp('tukaroffjam_kerja_2_tukar').setValue(null);
                                    Ext.getCmp('tukaroffjam_kerja_3_tukar').setValue(null);
                                    Ext.getCmp('tukaroffjam_kerja_4_tukar').setValue(null);
                                    var msg=Ext.Msg.show({
                                        title:'Message Warning',
                                        msg: 'Nik/Jabatan Belum Diisi!',
                                        alwaysOnTop:true,
                                        buttons: Ext.Msg.OK,
                                        icon: Ext.Msg.WARNING
                                    });
                                    Ext.defer(function () {
                                        msg.toFront();
                                    }, 100);
                                    return;
                                }
                                if(value.withoutTime() <= Ext.getCmp('tukarofftanggal').getValue().withoutTime()){
                                    Ext.getCmp('tukarofftanggal_tukar').setValue(null);
                                    Ext.getCmp('tukaroffhari_tukar').setValue(null);
                                    Ext.getCmp('tukaroffkode_shift_tukar').setValue(null);
                                    Ext.getCmp('tukaroffjam_kerja_1_tukar').setValue(null);
                                    Ext.getCmp('tukaroffjam_kerja_2_tukar').setValue(null);
                                    Ext.getCmp('tukaroffjam_kerja_3_tukar').setValue(null);
                                    Ext.getCmp('tukaroffjam_kerja_4_tukar').setValue(null);
                                    var msg=Ext.Msg.show({
                                        title:'Message Warning',
                                        msg: 'Tanggal Tukar Tidak Boleh Sama/Lebih Kecil!',
                                        alwaysOnTop:true,
                                        buttons: Ext.Msg.OK,
                                        icon: Ext.Msg.WARNING
                                    });
                                    Ext.defer(function () {
                                        msg.toFront();
                                    }, 100);
                                    return;
                                }
//                                console.log(Ext.getCmp('tukarofftanggal').getValue().withoutTime());
//                                console.log(value.withoutTime());
//                                if(value.withoutTime() < Ext.getCmp('tukarofftanggal').getValue().withoutTime()){
//                                    
//                                    Ext.getCmp('tukarofftanggal_tukar').setValue(null);
//                                    Ext.getCmp('tukaroffhari_tukar').setValue(null);
//                                    Ext.Msg.show({
//                                        title:'Message Warning',
//                                        msg: 'Tanggal Lebih Kecil!',
//                                        alwaysOnTop:true,
//                                        buttons: Ext.Msg.OK,
//                                        icon: Ext.Msg.WARNING
//                                    }).defer(100);
//                                    return;
//                                }
                                
                                console.log(datahari[value.getDay()]);
                                Ext.getCmp('tukaroffhari_tukar').setValue(datahari[value.getDay()]);
                                var ctrl=Ext.getCmp('tukaroff_input').conttroller;
                                             
                                if(Ext.getCmp('tukaroffnik_tukar').getValue()){
                                    var mysqtore=Ext.getCmp('tukaroff_input').getViewModel().getData().shiftmaster;
                                    mysqtore.load({
                                        params:{
                                            nik:Ext.getCmp('tukaroffnik_tukar').getValue(),
                                            kode_jabatan:Ext.getCmp('tukaroffkode_jabatan').getValue(),
                                            tanggal:format_date_mysql(value)
                                        }
                                        ,
                                        callback:function(records, operation, success) {
                                            if(success){
                                                if(records.length>0){
                                                    Ext.getCmp('tukaroffkode_shift_tukar').setValue(records[0].get('kode_shift'));
                                                    Ext.getCmp('tukaroffjam_kerja_1_tukar').setValue(records[0].get('jam_kerja_1'));
                                                    Ext.getCmp('tukaroffjam_kerja_2_tukar').setValue(records[0].get('jam_kerja_2'));
                                                    Ext.getCmp('tukaroffjam_kerja_3_tukar').setValue(records[0].get('jam_kerja_3'));
                                                    Ext.getCmp('tukaroffjam_kerja_4_tukar').setValue(records[0].get('jam_kerja_4'));
                                                }
                                            }
                                        }
                                    });
                                }
                                             
                            }

                        }

                    },{
                        xtype:'textfield',
                        name: 'hari_tukar',
                        id: 'tukaroffhari_tukar',
                        flex:1,
                        //                                tooltip: 'Maximal 8 character Field tidak boleh kosong',
                        afterLabelTextTpl: required_css,
                        //                                fieldStyle: 'text-transform:uppercase;',
                        //                fieldLabel: 'Nama',
                        //                        labelWidth : '10',
                        //                        labelStyle: 'width:120px; white-space: nowrap;text-transform:propercase;', 
                        anchor    : '75%',
                        hiddenName:'hari_tukar',
                        allowBlank: false  ,  
                        readOnly:true,
                        width:210                       

                    }
                    ,{
                        xtype:'textfield',
                        name: 'kode_shift_tukar',
                        id: 'tukaroffkode_shift_tukar',
                        flex:1,
                        //                                tooltip: 'Maximal 8 character Field tidak boleh kosong',
                        afterLabelTextTpl: required_css,
                        //                                fieldStyle: 'text-transform:uppercase;',
                        //                fieldLabel: 'Nama',
                        //                        labelWidth : '10',
                        //                        labelStyle: 'width:120px; white-space: nowrap;text-transform:propercase;', 
                        anchor    : '75%',
                        hiddenName:'kode_shift_tukar',
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
                        name: 'jam_kerja_1_tukar',
                        id: 'tukaroffjam_kerja_1_tukar',
                        fieldLabel: 'I/Masuk',                          
                        labelStyle:'text-align:center;background-color:#5FA2DD;color:white;',
                        minValue:'06:00' ,
                        maxValue: '23:00',
                        readOnly:true
                    },{
                        xtype: 'timespinner',
                        width: 120,
                        name: 'jam_kerja_2_tukar',
                        id: 'tukaroffjam_kerja_2_tukar',
                        fieldLabel: 'II/Keluar/Pulang',  
                        labelStyle:'text-align:center;background-color:#5FA2DD;color:white;',
                        minValue:'06:00' ,
                        maxValue: '23:00',
                        readOnly:true
                    },{
                        xtype: 'timespinner',
                        width: 120,
                        name: 'jam_kerja_3_tukar',
                        id: 'tukaroffjam_kerja_3_tukar',
                        fieldLabel: 'III/Masuk',  
                        labelStyle:'text-align:center;background-color:#5FA2DD;color:white;',
                        minValue:'06:00' ,
                        maxValue: '23:00',
                        readOnly:true
                    },{
                        xtype: 'timespinner',
                        width: 120,
                        name: 'jam_kerja_4_tukar',
                        id: 'tukaroffjam_kerja_4_tukar',
                        fieldLabel: 'IV/Keluar/Pulang',  
                        labelStyle:'text-align:center;background-color:#5FA2DD;color:white;',
                        minValue:'06:00' ,
                        maxValue: '23:00',
                        readOnly:true
                    }
                    
                    ]
                }
                ]
            }
            ],
            buttons : [
            {
                text: 'Simpan',                    
                itemId: 'btnsave',
                id:'idButtonTukarOffInputSave',
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
    //            show:function(){
    ////                console.log(this.getViewModel().getData());
    //                var mysqtore=this.getViewModel().getData().shiftmaster;
    //                mysqtore.load();
    //            }
    }
    })