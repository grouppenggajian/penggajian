Ext.define('Penggajian.view.transaksi.hitthr.PerhitunganThrInput', 
    {
        extend          : 'Ext.window.Window',
        title           : 'Validate Process',
        requires        : [
        'Penggajian.view.transaksi.hitthr.PerhitunganThrController'
        ],
        controller:'hitthr',
        
        //        plugins: {
        //            ptype: 'datatip'
        //        },
        width           : 350,
        height          : 200,
        layout          : 'fit',
        autoShow        : true,
        modal           : true,
        alias           : 'widget.inputhitthr',
        id              : 'input_hitthr',
        maximizable     :false,
        closeAction:'destroy',
        items:[
            {
            xtype:'form',
            id:'formhitthrinput',
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
                    xtype: 'numberfield',
                    name: 'tahun',
                    id: 'hitthr_tahun',
//                    tooltip: 'Maximal 7 character Field tidak boleh kosong',
                    afterLabelTextTpl: required_css,
                    fieldStyle: 'text-transform:propercase;',
                    fieldLabel: 'Tahun',
                    anchor: '90%',
                    hiddenName:'thbl',
                    allowBlank: false,
                    value:new Date().getFullYear(),
                    minValue:2000,
                    listeners:{
                        spinend:'onSelectHitThrTahun' 
                    }
                    
                   
//                    ,maskRe:/\d/
                },
                {
                    xtype:'datefield',
                    name: 'tglthr',
                    id: 'hitthr_tglthr',
//                    tooltip: 'Maximal 7 character Field tidak boleh kosong',
                    afterLabelTextTpl: required_css,
//                    fieldStyle: 'text-transform:propercase;',
                    fieldLabel: 'Tanggal THR',
                    anchor: '90%',
                    hiddenName:'tglthr',
                    allowBlank: false  
                   ,readOnly:true
//                    ,maskRe:/\d/
                }
            ],
            buttons : [
            {
                text: 'Proses',                    
                itemId: 'btnproses',
                id:'idbtnproseshitunglembur',
                iconCls: 'icon-process',
                formBind: true,                       
                handler: 'onProcess'
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