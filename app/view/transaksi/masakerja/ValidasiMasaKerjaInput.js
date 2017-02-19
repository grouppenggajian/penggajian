Ext.define('Penggajian.view.transaksi.masakerja.ValidasiMasaKerjaInput', 
    {
        extend          : 'Ext.window.Window',
        title           : 'Parameter Generate',
        requires        : [
            'Penggajian.view.transaksi.masakerja.ValidasiMasaKerjaController',
        ],
        controller:'validasimasakerja',
//        plugins: {
//            ptype: 'datatip'
//        },
        width           : 350,
        height          : 200,
        layout          : 'fit',
        autoShow        : true,
        modal           : true,
        alias           : 'widget.inputvalidasimasakerja',
        id              : 'input_validasimasakerja',
        maximizable     :false,
        buttonAlign:'center',
        closeAction:'destroy',
        items:[
        {
            xtype:'form',
            id:'formvalidasimasakerjainput',
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
                    xtype: 'numberfield',
                    name: 'tahun',
                    id: 'vms_tahun',
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
                        spinend:'onSelectVmsTahun' 
                    }
                    
                   
//                    ,maskRe:/\d/
                }
                ,
                {
                    xtype:'datefield',
                    name: 'tglthr',
                    id: 'vms_tglthr',
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
                     text: 'Process',                    
                     itemId: 'btnprocess',
                     id:'idButtonVmsGenerate',
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