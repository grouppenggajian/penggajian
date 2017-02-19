Ext.define('Penggajian.view.transaksi.pembayaranthr.PembayaranThrInput', 
    {
        extend          : 'Ext.window.Window',
        title           : 'Parameter Generate',
        requires        : [
            'Penggajian.view.transaksi.pembayaranthr.PembayaranThrController',
        ],
        controller:'pembayaranthr',
//        plugins: {
//            ptype: 'datatip'
//        },
        width           : 600,
        height          : 350,
        layout          : 'fit',
        autoShow        : true,
        modal           : true,
        alias           : 'widget.inputpembayaranthr',
        id              : 'input_pembayaranthr',
        maximizable     :false,
        buttonAlign:'center',
        closeAction:'destroy',
        items:[
        {
            xtype:'form',
            id:'formpembayaranthrinput',
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
                    id: 'pembayaranthr_tahun',                  
                    fieldLabel: 'Tahun',
                    anchor: '90%',
                    hiddenName:'tahun',
                    allowBlank: false,                    
                    minValue:2000,
                    readOnly:true
                    
                   
//                    ,maskRe:/\d/
                }
                ,{
                
                    xtype: 'fieldcontainer',                
                    defaultType: 'textfield',
                    anchor:'100%',                
                    layout: 'hbox',
                    defaults: {
                        labelWidth: 100,
                        allowBlank: false,
                        labelAlign: 'left'
                    },
                    items: [
                    {
                        xtype:'textfield',
                        fieldLabel: 'NIK',
                        name: 'nik',
                        id: 'pembayaranthr_nik',
                        flex:1,
                        //                                tooltip: 'Maximal 8 character Field tidak boleh kosong',
                        afterLabelTextTpl: required_css,
                        //                                fieldStyle: 'text-transform:uppercase;',
                        //                fieldLabel: 'Nama',
                        //                        labelWidth : '10',
                        //                        labelStyle: 'width:120px; white-space: nowrap;text-transform:propercase;', 
                        anchor    : '75%',
                        hiddenName:'nik',
                        allowBlank: false  ,  
                        readOnly:true,
                        width:210                       
                                
                    }
                    ,{
                        xtype:'textfield',
                        name: 'nama',
                        id: 'pembayaranthr_nama',
                        flex:1,
                        //                                tooltip: 'Maximal 8 character Field tidak boleh kosong',
                        afterLabelTextTpl: required_css,
                        //                                fieldStyle: 'text-transform:uppercase;',
                        //                fieldLabel: 'Nama',
                        //                        labelWidth : '10',
                        //                        labelStyle: 'width:120px; white-space: nowrap;text-transform:propercase;', 
                        anchor    : '75%',
                        hiddenName:'nama',
                        allowBlank: false  ,  
                        readOnly:true,
                        width:210                       
                                
                    },{
                        xtype:'textfield',
                        name: 'jabatan',
                        id: 'pembayaranthr_jabatan',
                        flex:1,
                        //                                tooltip: 'Maximal 8 character Field tidak boleh kosong',
                        afterLabelTextTpl: required_css,
                        //                                fieldStyle: 'text-transform:uppercase;',
                        //                fieldLabel: 'Nama',
                        //                        labelWidth : '10',
                        //                        labelStyle: 'width:120px; white-space: nowrap;text-transform:propercase;', 
                        anchor    : '75%',
                        hiddenName:'jabatan',
                        allowBlank: false  ,  
                        readOnly:true,
                        width:210                       
                                
                    }]
                },
                {
                    xtype:'datefield',
                    name: 'tglpay',
                    id: 'pembayaranthr_tglpay',
                    allowBlank: false,
//                    tooltip: 'Maximal 7 character Field tidak boleh kosong',
                    afterLabelTextTpl: required_css,
//                    fieldStyle: 'text-transform:propercase;',
                    fieldLabel: 'Tanggal Bayar',
                    anchor: '90%',
                    hiddenName:'tglpay',
                    allowBlank: false,
                    value:new Date()
                   ,readOnly:false
//                    ,maskRe:/\d/
                },{
                    xtype: 'numericfield',
                    name: 'saldo',
                    id: 'pembayaranthr_saldo',
//                    tooltip: 'Maximal 7 character Field tidak boleh kosong',
                    afterLabelTextTpl: required_css,
                    fieldStyle: 'text-align: right;',
                    fieldLabel: 'Nilai Saldo',
                    anchor: '60%',
                    hiddenName:'saldo',
                    allowBlank: false,                                        
                    readOnly:true,
                    allowDecimals:true,
                    hideTrigger:true,
                    currencySymbol: null,
                    useThousandSeparator: true,
                    thousandSeparator: ',',
                    alwaysDisplayDecimals: true
                    
                   
//                    ,maskRe:/\d/
                },{
                    xtype: 'numericfield',
                    name: 'payment',
                    id: 'pembayaranthr_payment',
//                    tooltip: 'Maximal 7 character Field tidak boleh kosong',
                    afterLabelTextTpl: required_css,
                    fieldStyle: 'text-align: right;',
                    fieldLabel: 'Nilai Bayar',
                    anchor: '60%',
                    hiddenName:'payment',
                    allowBlank: false,                                        
                    readOnly:false,
                    allowDecimals:true,
                    hideTrigger:true,
                    currencySymbol: null,
                    useThousandSeparator: true,
                    thousandSeparator: ',',
                    alwaysDisplayDecimals: true,
                    enableKeyEvents:true,
                    value:0,
                    listeners:{
                            keyup:function ( me, e , eOpts ){
                                var valsaldo=0,
                                angsuran=0;
                                ;
                                if(me.getValue()==null){
                                    me.setValue(0);
                                }
                                if(Ext.getCmp('pembayaranthr_saldo').getValue()!=null){
                                    valsaldo= Ext.getCmp('pembayaranthr_saldo').getValue();
                                    if(me.getValue()>valsaldo){
                                        set_message(2, 'Nilai Bayar Lebih Besar Ddari Nilai Saldo!!');
                                        me.setValue(0);
                                    }
                                }else{
//                                    angsuran=valpinjaman/me.getValue();
                                    me.setValue(0);
                                }
                            }
                        }
                   
//                    ,maskRe:/\d/
                }
                
                
                
                
            ],
         buttons : [
                 {
                     text: 'Bayar',                    
                     itemId: 'btnprocess',
                     id:'idButtonPembayaranThrProcess',
                     iconCls: 'icon-payment',
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