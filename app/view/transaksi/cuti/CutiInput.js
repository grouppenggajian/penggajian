Ext.define('Penggajian.view.transaksi.cuti.CutiInput', 
    {
        extend          : 'Ext.window.Window',
        title           : 'Input Cuti',
        requires        : [
        'Penggajian.view.transaksi.cuti.CutiController',
        'Penggajian.view.transaksi.cuti.CutiNikEditor',
        'Ext.ux.TwinCombo'
        ],
        controller:'cuti',
        //        plugins: {
        //            ptype: 'datatip'
        //        },
        width           : 600,
        height          : 450,
        layout          : 'fit',
        autoShow        : true,
        modal           : true,
        alias           : 'widget.cutiinput',
        id              : 'cuti_input',
        maximizable     :false,
        closeAction:'destroy',
        items:[
        {
            xtype:'form',
            id:'formcutiinput',
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
            items:[]
            ,
            buttons : [
            {
                text: 'Simpan',                    
                itemId: 'btnsave',
                id:'idButtonCutiInputSave',
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