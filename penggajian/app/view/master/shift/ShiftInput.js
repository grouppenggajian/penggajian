Ext.define('Penggajian.view.master.shift.ShiftInput', 
    {
        extend          : 'Ext.window.Window',
        title           : 'Input Shift',
        requires        : [
        'Penggajian.view.master.shift.ShiftController',
        'Ext.ux.TimeSpinner'
        ],
        controller:'shift',
        //        plugins: {
        //            ptype: 'datatip'
        //        },
        width           : 600,
        height          : 280,
        layout          : 'fit',
        autoShow        : true,
        modal           : true,
        alias           : 'widget.inputShift',
        id              : 'input_shift',
        maximizable     :false,
        
        items:[
        {
            xtype:'form',
            id:'formshiftinput',
            defaultType     : 'textfield',
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
                name: 'kode',
                id: 'inputshiftkode',
                tooltip: 'Maximal 7 character Field tidak boleh kosong',
                afterLabelTextTpl: required_css,
                fieldStyle: 'text-transform:uppercase;',
                fieldLabel: 'Kode',
                anchor: '90%',
                hiddenName:'kode',
                allowBlank: false  
                ,
                enforceMaxLength:true
                ,
                maxLength:7
                ,
                listeners: {
                    change: function(field, newValue, oldValue) {
                        field.setValue(newValue.toUpperCase());
                    }
                }
            //                    ,maskRe:/\d/
            },
            {
                name: 'keterangan',
                id: 'shiftketerangan',
                //                    tooltip: 'Maximal 7 character Field tidak boleh kosong',
                afterLabelTextTpl: required_css,
                fieldStyle: 'text-transform:propercase;',
                fieldLabel: 'Keterangan',
                anchor: '90%',
                hiddenName:'keterangan',
                allowBlank: false  
                ,
                enforceMaxLength:true
                ,
                maxLength:45
                ,
                listeners: {
                    change: function(field, newValue, oldValue) {
                        field.setValue(newValue.toProperCase());
                    }
                }
            //                    ,maskRe:/\d/
            },
            {
                xtype: 'fieldcontainer',
                fieldLabel: 'Jam Kerja',
                //                margin: '0 0 2 0',  
//                afterLabelTextTpl: required_css,
                //                    labelStyle: 'font-weight:bold;padding:0;',
                layout: 'hbox',
                defaultType: 'numericfield',

                fieldDefaults: {
                    labelAlign: 'top'
                                    
                    ,fieldStyle:'text-align:center;'
                    ,labelSeparator:''
                },
                anchor:'100%',

                items: [
                    {
                        xtype: 'timespinner',
                        width: 100,
                        name: 'jam_kerja_1',
                        id: 'jam_kerja_1_input',
                        fieldLabel: 'I/Masuk',                          
                        labelStyle:'text-align:center;background-color:#5FA2DD;color:white;',
                        minValue:'06:00' ,
                        maxValue: '23:00'
                    },{
                        xtype: 'timespinner',
                        width: 110,
                        name: 'jam_kerja_2',
                        id: 'jam_kerja_2_input',
                        fieldLabel: 'II/Keluar/Pulang',  
                        labelStyle:'text-align:center;background-color:#5FA2DD;color:white;',
                        minValue:'06:00' ,
                        maxValue: '23:00'
                    },{
                        xtype: 'timespinner',
                        width: 100,
                        name: 'jam_kerja_3',
                        id: 'jam_kerja_3_input',
                        fieldLabel: 'III/Masuk',  
                        labelStyle:'text-align:center;background-color:#5FA2DD;color:white;',
                        minValue:'06:00' ,
                        maxValue: '23:00'
                    },{
                        xtype: 'timespinner',
                        width: 110,
                        name: 'jam_kerja_4',
                        id: 'jam_kerja_4_input',
                        fieldLabel: 'IV/Keluar/Pulang',  
                        labelStyle:'text-align:center;background-color:#5FA2DD;color:white;',
                        minValue:'06:00' ,
                        maxValue: '23:00'
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
            id:'idButtonShiftSave',
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
        

    });