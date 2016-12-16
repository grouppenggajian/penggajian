Ext.define('Penggajian.view.master.potongan.PotonganInput', 
    {
        extend          : 'Ext.window.Window',
        title           : 'Input Potongan',
        requires        : [
            'Penggajian.view.master.potongan.PotonganController',
        ],
        controller:'potongan',
//        plugins: {
//            ptype: 'datatip'
//        },
        width           : 600,
        height          : 240,
        layout          : 'fit',
        autoShow        : true,
        modal           : true,
        alias           : 'widget.inputPotongan',
        id              : 'input_potongan',
        maximizable     :false,
        
        items:[
        {
            xtype:'form',
            id:'formpotonganinput',
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
                    id: 'potongankode',
                    tooltip: 'Maximal 7 character Field tidak boleh kosong',
                    afterLabelTextTpl: required_css,
                    fieldStyle: 'text-transform:uppercase;',
                    fieldLabel: 'Kode',
                    anchor: '90%',
                    hiddenName:'kode',
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
                    name: 'keterangan',
                    id: 'potonganketerangan',
//                    tooltip: 'Maximal 7 character Field tidak boleh kosong',
                    afterLabelTextTpl: required_css,
                    fieldStyle: 'text-transform:propercase;',
                    fieldLabel: 'Keterangan',
                    anchor: '90%',
                    hiddenName:'keterangan',
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
        buttons : [
                {
                    text: 'Simpan',                    
                    itemId: 'btnsave',
                    id:'idButtonPotonganSave',
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