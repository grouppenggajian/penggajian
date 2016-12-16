Ext.define('Penggajian.view.transaksi.ijin.IjinInput', 
    {
        extend          : 'Ext.window.Window',
        title           : 'Input Ijin',
        requires        : [
        'Penggajian.view.transaksi.ijin.IjinController',
        'Penggajian.view.transaksi.ijin.IjinNikEditor',
        'Ext.ux.TwinCombo'
        ],
        controller:'ijin',
        //        plugins: {
        //            ptype: 'datatip'
        //        },
        width           : 600,
        height          : 450,
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
            items:[]
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