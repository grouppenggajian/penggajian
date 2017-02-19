Ext.define('Penggajian.view.transaksi.periodethr.PeriodeThrInput', 
    {
        extend          : 'Ext.window.Window',
        title           : 'Input Periode THR',
        requires        : [
            'Penggajian.view.transaksi.periodethr.PeriodeThrController',
        ],
        controller:'periodethr',
//        plugins: {
//            ptype: 'datatip'
//        },
        width           : 350,
        height          : 250,
        layout          : 'fit',
        autoShow        : true,
        modal           : true,
        alias           : 'widget.inputPeriodeThr',
        id              : 'input_periodethr',
        maximizable     :false,
        buttonAlign:'center',
        closeAction:'destroy',
        items:[
        {
            xtype:'form',
            id:'formperiodethrinput',
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
                    name: 'thbl',
                    id: 'periodethrthbl',
//                    tooltip: 'Maximal 7 character Field tidak boleh kosong',
                    afterLabelTextTpl: required_css,
                    fieldStyle: 'text-transform:propercase;',
                    fieldLabel: 'Tahun',
                    anchor: '90%',
                    hiddenName:'thbl',
                    allowBlank: false,
                    value:new Date().getFullYear(),
                    minValue:2000
                   
//                    ,maskRe:/\d/
                }
                ,
                {
                    xtype:'datefield',
                    name: 'tglthr',
                    id: 'periodethrtglthr',
//                    tooltip: 'Maximal 7 character Field tidak boleh kosong',
                    afterLabelTextTpl: required_css,
//                    fieldStyle: 'text-transform:propercase;',
                    fieldLabel: 'Tanggal THR',
                    anchor: '90%',
                    hiddenName:'tglthr',
                    allowBlank: false  
                   
//                    ,maskRe:/\d/
                }
                ,
                
                
                {
                    xtype:'checkbox',
                    boxLabel: 'Aktif',
                    name: 'aktif',
                    id: 'periodethraktif',
//                    tooltip: 'Maximal 7 character Field tidak boleh kosong',
//                    afterLabelTextTpl: required_css,
//                    fieldStyle: 'text-transform:propercase;',
                    fieldLabel: 'Status',
                    anchor: '90%',
                    hiddenName:'aktif',
                    allowBlank: true
                    
//                    ,maskRe:/\d/
                }
            ],
         buttons : [
                 {
                     text: 'Simpan',                    
                     itemId: 'btnsave',
                     id:'idButtonPeriodeThrSave',
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
        

    });