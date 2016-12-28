Ext.define('Penggajian.view.transaksi.pinjaman.PinjamanInput', 
    {
        extend          : 'Ext.window.Window',
        title           : 'Input Pinjaman',
        requires        : [
        'Penggajian.view.transaksi.pinjaman.PinjamanController',
        'Penggajian.view.transaksi.pinjaman.PinjamanNikEditor'
        ],
        controller:'pinjaman',
        //        plugins: {
        //            ptype: 'datatip'
        //        },
        width           : 600,
        height          : 450,
        layout          : 'fit',
        autoShow        : true,
        modal           : true,
        alias           : 'widget.inputPinjaman',
        id              : 'input_pinjaman',
        maximizable     :false,
        closeAction:'destroy',
        items:[
        {
            xtype:'form',
            id:'formpinjamaninput',
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
                layout: 'anchor',
                height:'100%',
                defaults: {
                    hideEmptyLabel: false
                },
                items: [
{
                    
                
                    xtype: 'fieldcontainer',     
                    afterLabelTextTpl: required_css,
                    fieldLabel: 'No.Pinjaman',
                    defaultType: 'textfield',
                    anchor:'100%',                
                    layout: 'hbox',
                    marginTop:'10',
                    defaults: {
                        labelWidth: 100,
                        allowBlank: true,
                        labelAlign: 'left'
                    },
                    items: [{
                    xtype:'textfield',
                    name: 'no_pinjaman',
                    id: 'pinjaman_no_pinjaman',
                    tooltip: 'Maximal 7 character Field tidak boleh kosong',
//                    afterLabelTextTpl: required_css,
                    fieldStyle: 'text-transform:uppercase;',
//                    fieldLabel: 'No.Pinjaman',
                    anchor: '90%',
                    hiddenName:'no_pinjaman',
                    allowBlank: false  ,
                    enforceMaxLength:true,
                    maxLength:10,
                    readOnly:true
                },{
                    xtype:'datefield',
                    name: 'tgl_pinjam',
                    id: 'pinjaman_tgl_pinjam',                        
                    afterLabelTextTpl: required_css,                        
                    fieldLabel: 'Tanggal Pinjam',
                    hiddenName:'tgl_pinjam',
                    allowBlank: false,            
                    format:'Y-m-d'
                                                ,labelAlign:'right'
                //                                labelWidth:120,
                //                                width:260  
                        
                }]},
                {
                    xtype:'textfield',
                    name: 'keterangan',
                    id: 'pinjaman_keterangan',
//                    tooltip: 'Maximal 7 character Field tidak boleh kosong',
                    afterLabelTextTpl: required_css,
                    fieldStyle: 'text-transform:propercase;',
                    fieldLabel: 'Keterangan',
                    anchor: '90%',
                    hiddenName:'keterangan',
                    allowBlank: false  ,
//                    enforceMaxLength:true,
//                    maxLength:10,
                    readOnly:false
                    ,listeners: {
                                    change: function(field, newValue, oldValue) {
                                        field.setValue(newValue.toProperCase());
                                    }
                                }
                },
                
                {
                    xtype:'twincombo',
                    id:'pinjaman_nik',        
                    afterLabelTextTpl: required_css,                        
                    fieldLabel: 'NIK',
                    menu:'pinjaman_nik_editor',                    
                    //                        width: 95,
                    name: 'nik',
                    itemId: 'itemIdpinjaman_nik'  
//                    ,listeners:{
//                        validitychange:function ( me , isValid , eOpts ){
//                            if(isValid){
//                                Ext.getCmp('pinjaman_nama').setValue(me.getValue());
//                            }
//                        }
//                    }
                    
                },
                {
                    xtype:'combo',
                    name: 'nama',
                    id: 'pinjaman_nama',                        
                    afterLabelTextTpl: required_css,                        
                    fieldLabel: 'Pegawai',
                    anchor    : '75%',
                    hiddenName:'nama',
                    allowBlank: false,                                             
                    store: 'storepegawai',
                    valueField: 'nik',
                    displayField: 'nama',
                    typeAhead: true,
                    triggerAction: 'all' ,
                    hideTrigger:true,
                    width:320
                },{
                    xtype:'combo',
                    name: 'kode_jabatan',
                    id: 'pinjaman_kode_jabatan',                        
                    afterLabelTextTpl: required_css,                        
                    fieldLabel: 'Jabatan',
                    anchor    : '75%',
                    hiddenName:'nama',
                    allowBlank: false,                                             
                    store: 'storejabatancombo',
                    valueField: 'kode_jabatan',
                    displayField: 'nama_jabatan',
                    typeAhead: true,
                    triggerAction: 'all' ,
                    hideTrigger:true,
                    width:400
                },
                {
                    xtype:'combo',
                    name: 'tipe_pinjaman',
                    id: 'pinjamantipe',                        
                    afterLabelTextTpl: required_css,                        
                    fieldLabel: 'Tipe Pinjaman',
                    anchor    : '60%',
                    hiddenName:'tipe_pinjaman',
                    allowBlank: false,                                             
                    store: 'storetipepinjaman',
                    valueField: 'name',
                    displayField: 'name',
                    typeAhead: true,
                    triggerAction: 'all' ,
                    width:320,
                    listeners:{
                         select :function( me, record , eOpts ){
                             var angskali=Ext.getCmp('pinjaman_kali_angsuran');
                             if(me.getValue()  =='KASBON'){
                               
                               angskali.setValue(1);
                               angskali.setReadOnly(true);
                            }else{
                                
                               // angskali.setValue(1);
                               angskali.setReadOnly(false);
                            }
                         }

                    }
                },
                {   
                    xtype:'numericfield',
                    fieldLabel: 'Nominal',
                    id: 'pinjaman_nominal',
                    name:'nominal',
                    hiddenName:'nominal',
                    currencySymbol: null,
                    useThousandSeparator: true,
                    thousandSeparator: ',',
                    alwaysDisplayDecimals: true,
                    fieldStyle: 'text-align: right;',
                    value:0,
                    minValue:0,
                    hideTrigger: true,
                    readOnly:false,
                    enableKeyEvents:true,
                        listeners:{
//                            focus :function( me , event , eOpts ){
//                                    var valstr=me.getValue().toString();
//                                    me.selectText(0,me.getValue().length);
//                            },
                            keyup:function ( me, e , eOpts ){
                                var valangs=0,
                                angsuran=0;
                                ;
//                                console.log(me.getValue());
                                if(me.getValue()==null){
                                    me.setValue(0);
                                }
                                if(Ext.getCmp('pinjaman_kali_angsuran').getValue()!=null || Ext.getCmp('pinjaman_kali_angsuran').getValue()!='undefined'){
                                    valangs= Ext.getCmp('pinjaman_kali_angsuran').getValue();
//                                    console.log(Ext.getCmp('pinjaman_kali_angsuran').getValue());
                                    if(valangs>0){
//                                        console.log('sini');
                                        angsuran=me.getValue()/valangs;
                                    }
                                    
                                    Ext.getCmp('pinjaman_jumlah_angsuran').setValue(angsuran);
                                }else{
//                                    angsuran=me.getValue()/valangs;
                                    Ext.getCmp('pinjaman_jumlah_angsuran').setValue(angsuran);
                                }
                            }
                        }
                },
                
                {
                    
                
                    xtype: 'fieldcontainer',     
                    fieldLabel: 'Angsuran',
                    defaultType: 'textfield',
                    anchor:'100%',                
                    layout: 'hbox',
                    marginTop:'10',
                    defaults: {
                        labelWidth: 100,
                        allowBlank: true,
                        labelAlign: 'left'
                    },
                    items: [
                    {
                                    
                        xtype: 'numberfield',
                        id: 'pinjaman_kali_angsuran',
                        name:'kali_angsuran',
                        hiddenName:'kali_angsuran',
                        fieldLabel: 'Kali Angsuran',
                        allowBlank: true,   
                        hideTrigger: true
                        ,         
                        fieldStyle: 'text-align: center;' ,
                        labelWidth: 90,                        
                        labelAlign: 'right'
                        ,                        
                        width:150,
                        minValue:0,
                        value:0,enableKeyEvents:true,
                        listeners:{
                            keyup:function ( me, e , eOpts ){
                                var valpinjaman=0,
                                angsuran=0;
                                ;
                                if(me.getValue()==null){
                                    me.setValue(0);
                                }
                                if(Ext.getCmp('pinjaman_nominal').getValue()!=null){
                                    valpinjaman= Ext.getCmp('pinjaman_nominal').getValue();
                                    if(me.getValue()>0){
                                        angsuran=valpinjaman/me.getValue();
                                    }
                                    
                                    Ext.getCmp('pinjaman_jumlah_angsuran').setValue(angsuran);
                                }else{
//                                    angsuran=valpinjaman/me.getValue();
                                    Ext.getCmp('pinjaman_jumlah_angsuran').setValue(angsuran);
                                }
                            }
                        }
                                
                            
                    },
                {   
                    xtype:'numericfield',
                    fieldLabel: 'Jumlah Angsuran',
                    id: 'pinjaman_jumlah_angsuran',
                    name:'jumlah_angsuran',
                    hiddenName:'jumlah_angsuran',
                    currencySymbol: null,
                    useThousandSeparator: true,
                    thousandSeparator: ',',
                    alwaysDisplayDecimals: true,
                    fieldStyle: 'text-align: right;',
                    value:0,
                    minValue:0,
                    hideTrigger: true,
                    readOnly:false,
                    width:250,
                    labelWidth:120,
                    labelAlign: 'right'
                }
                    ]
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
            id:'idButtonPinjamanSave',
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