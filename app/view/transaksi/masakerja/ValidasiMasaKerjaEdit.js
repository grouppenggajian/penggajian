Ext.define('Penggajian.view.transaksi.masakerja.ValidasiMasaKerjaEdit', 
    {
        extend          : 'Ext.window.Window',
        title           : 'Edit Masa Kerja',
        requires        : [
            'Penggajian.view.transaksi.masakerja.ValidasiMasaKerjaController',
        ],
        controller:'validasimasakerja',
//        plugins: {
//            ptype: 'datatip'
//        },
        width           : 600,
        height          : 450,
        layout          : 'fit',
        autoShow        : true,
        modal           : true,
        alias           : 'widget.editvalidasimasakerja',
        id              : 'edit_validasimasakerja',
        maximizable     :false,
        buttonAlign:'center',
        closeAction:'destroy',
        items:[
        {
            xtype:'form',
            id:'formvalidasimasakerjaedit',
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
                    id: 'evms_tahun',
//                    tooltip: 'Maximal 7 character Field tidak boleh kosong',
                    afterLabelTextTpl: required_css,
                    fieldStyle: 'text-align: right;',
                    fieldLabel: 'Tahun',
                    anchor: '60%',
                    hiddenName:'tahun',
                    allowBlank: false,
                    value:new Date().getFullYear(),
                    minValue:2000,
                    readOnly:true
                    
                   
//                    ,maskRe:/\d/
                }
                ,
//                {
//                    xtype:'datefield',
//                    name: 'tglthr',
//                    id: 'evms_tglthr',
////                    tooltip: 'Maximal 7 character Field tidak boleh kosong',
//                    afterLabelTextTpl: required_css,
////                    fieldStyle: 'text-transform:propercase;',
//                    fieldLabel: 'Tanggal THR',
//                    anchor: '90%',
//                    hiddenName:'tglthr',
//                    allowBlank: false  
//                   ,readOnly:true
////                    ,maskRe:/\d/
//                },
                {
                
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
                        id: 'evms_nik',
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
                        id: 'evms_nama',
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
                        id: 'evms_jabatan',
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
                },{
                    xtype:'datefield',
                    name: 'tglthr',
                    id: 'evms_tglthr',
//                    tooltip: 'Maximal 7 character Field tidak boleh kosong',
                    afterLabelTextTpl: required_css,
//                    fieldStyle: 'text-transform:propercase;',
                    fieldLabel: 'Tanggal THR',
                    anchor: '60%',
                    hiddenName:'tglthr',
                    allowBlank: false  
                   ,readOnly:true
//                    ,maskRe:/\d/
                },
                {
                    xtype:'datefield',
                    name: 'tglmasuk',
                    id: 'evms_tglmasuk',
//                    tooltip: 'Maximal 7 character Field tidak boleh kosong',
                    afterLabelTextTpl: required_css,
//                    fieldStyle: 'text-transform:propercase;',
                    fieldLabel: 'Tanggal Masuk',
                    anchor: '60%',
                    hiddenName:'tglmasuk',
                    allowBlank: false  
                   ,readOnly:true
//                    ,maskRe:/\d/
                },{
                        xtype:'textfield',
                        fieldLabel: 'Masa Kerja',
                        name: 'masakerja',
                        id: 'evms_masakerja',
                        flex:1,
                        //                                tooltip: 'Maximal 8 character Field tidak boleh kosong',
                        afterLabelTextTpl: required_css,
                        //                                fieldStyle: 'text-transform:uppercase;',
                        //                fieldLabel: 'Nama',
                        //                        labelWidth : '10',
                        //                        labelStyle: 'width:120px; white-space: nowrap;text-transform:propercase;', 
                        anchor    : '60%',
                        hiddenName:'masakerja',
                        allowBlank: false  ,  
                        readOnly:true,
                        width:210                       
                                
                    },
                {
                    xtype: 'numericfield',
                    name: 'gajipokok',
                    id: 'evms_gajipokok',
//                    tooltip: 'Maximal 7 character Field tidak boleh kosong',
                    afterLabelTextTpl: required_css,
                    fieldStyle: 'text-align: right;',
                    fieldLabel: 'Gaji Tetap',
                    anchor: '60%',
                    hiddenName:'gajipokok',
                    allowBlank: false,                                        
                    readOnly:false,
                    allowDecimals:true,
                    hideTrigger:true,
                    currencySymbol: null,
                    useThousandSeparator: true,
                    thousandSeparator: ',',
                    alwaysDisplayDecimals: true
                    
                   
//                    ,maskRe:/\d/
                }
                ,{
                    xtype: 'numberfield',
                    name: 'pengali',
                    id: 'evms_pengali',
//                    tooltip: 'Maximal 7 character Field tidak boleh kosong',
                    afterLabelTextTpl: required_css,
                    fieldStyle: 'text-align: right;',
                    fieldLabel: 'Pengali',
                    anchor: '60%',
                    hiddenName:'pengali',
                    allowBlank: false,                                        
                    readOnly:false,
                    allowDecimals:true,
                    hideTrigger:true
                    
                   
//                    ,maskRe:/\d/
                }
                ,{
                    xtype: 'numberfield',
                    name: 'pembagi',
                    id: 'evms_pembagi',
//                    tooltip: 'Maximal 7 character Field tidak boleh kosong',
                    afterLabelTextTpl: required_css,
                    fieldStyle: 'text-align: right;',
                    fieldLabel: 'Pembagi',
                    anchor: '60%',
                    hiddenName:'pembagi',
                    allowBlank: false,                                        
                    readOnly:false,
                    allowDecimals:true,
                    hideTrigger:true
                     
                    
                   
//                    ,maskRe:/\d/
                }
                
                
                
            ],
         buttons : [
                 {
                     text: 'Update',                    
                     itemId: 'btnupdate',
                     id:'idButtonVmsEdit',
                     iconCls: 'icon-edit-record',
                     formBind: true,                       
                     handler: 'onEditSave'
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