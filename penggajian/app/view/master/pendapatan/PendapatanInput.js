Ext.define('Penggajian.view.master.pendapatan.PendapatanInput', 
    {
        extend          : 'Ext.window.Window',
        title           : 'Input Pendapatan',
        requires        : [
            'Penggajian.view.master.pendapatan.PendapatanController',
        ],
        controller:'pendapatan',
//        plugins: {
//            ptype: 'datatip'
//        },
        width           : 600,
        height          : 280,
        layout          : 'fit',
        autoShow        : true,
        modal           : true,
        alias           : 'widget.inputPendapatan',
        id              : 'input_pendapatan',
        maximizable     :false,
        
        items:[
        {
            xtype:'form',
            id:'formpendapataninput',
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
            xtype: 'fieldset',
            flex: 1,
            layout: 'vbox',
            height:'100%',
            defaults: {
                hideEmptyLabel: false
            },
            items: [

                {
                    xtype:'textfield',
                    name: 'kode',
                    id: 'pendapatankode',
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
                    xtype:'textfield',
                    name: 'keterangan',
                    id: 'pendapatanketerangan',
//                    tooltip: 'Maximal 7 character Field tidak boleh kosong',
                    afterLabelTextTpl: required_css,
                    fieldStyle: 'text-transform:propercase;',
                    fieldLabel: 'Keterangan',
                    anchor: '90%',
                    hiddenName:'keterangan',
                    width:'100%',
                    allowBlank: false  
                    ,enforceMaxLength:true
                    ,maxLength:45
                    ,listeners: {
                        change: function(field, newValue, oldValue) {
                            field.setValue(newValue.toProperCase());
                        }
                    }
//                    ,maskRe:/\d/
                },{
            xtype      : 'fieldcontainer',
            fieldLabel : 'Posting',
            defaultType: 'radiofield',
            defaults: {
                flex: 1
            },
            layout: 'hbox',
            items: [
                {
                    boxLabel  : 'Auto',
                    name      : 'posting',
                    inputValue: 'auto',
                    id        : 'radiopendapatan1',
                    flex: 0,
                    padding:'0 10 0 0'
                }, {
                    boxLabel  : 'Manual',
                    name      : 'posting',
                    inputValue: 'manual',
                    id        : 'radiopendapatan2'
                }
            ]
        },
        {
                    xtype:'checkbox',
                    name: 'showjabatan',
                    id: 'pendapatanshowjabatan',                    
                    fieldLabel: 'Show Jabatan',
                    anchor: '90%',
                    hiddenName:'showjabatan',
                    width:'100%',
                    boxLabel:'<span style="color:gray;  ">check to show</span>',
                    allowBlank: true  
                    

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
                    id:'idButtonSave',
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