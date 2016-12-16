Ext.define('Penggajian.view.master.periode.PeriodeInput', 
    {
        extend          : 'Ext.window.Window',
        title           : 'Input Periode',
        requires        : [
            'Penggajian.view.master.periode.PeriodeController',
        ],
        controller:'periode',
//        plugins: {
//            ptype: 'datatip'
//        },
        width           : 600,
        height          : 340,
        layout          : 'fit',
        autoShow        : true,
        modal           : true,
        alias           : 'widget.inputPeriode',
        id              : 'input_periode',
        maximizable     :false,
        
        items:[
        {
            xtype:'form',
            id:'formperiodeinput',
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
                    name: 'id',
                    id: 'periodeid',
                    tooltip: 'Maximal 7 character Field tidak boleh kosong',
                    afterLabelTextTpl: required_css,
                    fieldStyle: 'text-transform:uppercase;',
                    fieldLabel: 'id',
                    anchor: '90%',
                    hiddenName:'id',
                    allowBlank: false  
                    ,enforceMaxLength:true
                    ,maxLength:7
                    ,listeners: {
                        change: function(field, newValue, oldValue) {
                            field.setValue(newValue.toUpperCase());
                        }
                    }
//                    ,maskRe:/\d/
                },
                {
                    xtype:'datefield',
                    name: 'tglawal',
                    id: 'periodetglawal',
//                    tooltip: 'Maximal 7 character Field tidak boleh kosong',
                    afterLabelTextTpl: required_css,
                    fieldStyle: 'text-transform:propercase;',
                    fieldLabel: 'tanggal awal',
                    anchor: '90%',
                    hiddenName:'tglawal',
                    allowBlank: false  
                    ,enforceMaxLength:true
                    ,maxLength:45
//                    ,maskRe:/\d/
                }
                ,
                {
                    xtype:'datefield',
                    name: 'tglakhir',
                    id: 'periodetglakhir',
//                    tooltip: 'Maximal 7 character Field tidak boleh kosong',
                    afterLabelTextTpl: required_css,
                    fieldStyle: 'text-transform:propercase;',
                    fieldLabel: 'Tanggal Akhir',
                    anchor: '90%',
                    hiddenName:'tglakhir',
                    allowBlank: false  
                    ,enforceMaxLength:true
                    ,maxLength:45
                    
                }
                ,
                {
                    name: 'thnbln',
                    id: 'periodethnbln',
//                    tooltip: 'Maximal 7 character Field tidak boleh kosong',
                    afterLabelTextTpl: required_css,
                    fieldStyle: 'text-transform:propercase;',
                    fieldLabel: 'Tahun Bulan',
                    anchor: '90%',
                    hiddenName:'thnbln',
                    allowBlank: false  
                    ,enforceMaxLength:true
                    ,maxLength:45
                    ,listeners: {
                        change: function(field, newValue, oldValue) {
                            field.setValue(newValue.toProperCase());
                        }
                    }
//                    ,maskRe:/\d/
                }
                ,
                {
                    name: 'aktif',
                    id: 'periodeaktif',
//                    tooltip: 'Maximal 7 character Field tidak boleh kosong',
                    afterLabelTextTpl: required_css,
                    fieldStyle: 'text-transform:propercase;',
                    fieldLabel: 'Aktif',
                    anchor: '90%',
                    hiddenName:'aktif',
                    allowBlank: false  
                    ,enforceMaxLength:true
                    ,maxLength:45
                    ,listeners: {
                        change: function(field, newValue, oldValue) {
                            field.setValue(newValue.toProperCase());
                        }
                    }
//                    ,maskRe:/\d/
                }
            ]
        }
        ],
        // buttons : [
        //         {
        //             text: 'Simpan',                    
        //             itemId: 'btnsave',
        //             id:'idButtonPeriodeSave',
        //             iconCls: 'icon-simpan',
        //             formBind: true,                       
        //             handler: 'onSave'
        //         },
        //         {
        //             text: 'Batal',
        //             action: 'cancel',
        //             itemId: 'btncancel',
        //             iconCls: 'icon-cancel',
        //             handler: function(me){
        //                 me.up('window').close();
        //             }
        //         }
        //     ]
        

    });