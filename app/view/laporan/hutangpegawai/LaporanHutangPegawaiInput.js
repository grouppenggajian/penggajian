Ext.define('Penggajian.view.laporan.hutangpegawai.LaporanHutangPegawaiInput', 
    {
        extend          : 'Ext.window.Window',
        title           : 'Validate Process',
        requires        : [
        'Penggajian.view.laporan.hutangpegawai.LaporanHutangPegawaiController'
        ],
        controller:'laporan-hutangpegawai-laporanhutangpegawai',
        
        //        plugins: {
        //            ptype: 'datatip'
        //        },
        width           : 300,
        height          : 150,
        layout          : 'fit',
        autoShow        : true,
        modal           : true,
        alias           : 'widget.laphutanginput',
        id              : 'laphutang_input',
        maximizable     :false,
        closeAction:'destroy',
        items:[
            {
            xtype:'form',
            id:'formlaphutanginput',
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
                    xtype: 'textfield',
                    name: 'no_pinjaman',                                                            
                    fieldLabel: 'No.Pinjaman',
                    anchor: '90%',
                    enforceMaxLength:true,
                    maxLength:10
                    ,id:'laphutang_no_pinjaman'

                 }
            ],
            buttons : [
            {
                text: 'Preview',                    
                itemId: 'btnproses',
                id:'idbtnproseslaphutang',
                iconCls: 'icon-process',
                formBind: true,                       
                handler: 'onPreview'
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
    });