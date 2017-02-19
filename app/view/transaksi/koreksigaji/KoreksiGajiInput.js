Ext.define('Penggajian.view.transaksi.koreksigaji.KoreksiGajiInput', 
    {
        extend          : 'Ext.window.Window',
        title           : 'Input Koreksi Gaji',
        requires        : [
        'Penggajian.view.transaksi.koreksigaji.KoreksiGajiController',        
        'Penggajian.view.transaksi.koreksigaji.KoreksiGajiModel'
        
        ],
        controller:'koreksigaji',
        viewModel:'koreksigaji',
        //        plugins: {
        //            ptype: 'datatip'
        //        },
        width           : 622,
        height          : 510,
        layout          : 'fit',
        autoShow        : true,
        modal           : true,
        alias           : 'widget.koreksigajiinput',
        id              : 'koreksigaji_input',
        maximizable     :true,
        maximized     :true,
        closeAction:'destroy',
        items:[
        {
            xtype:'form',
            id:'formkoreksigajiinput',
            defaults        : {
                allowBlank: false,
                labelAlign: 'left',
                labelWidth: 100
            },
            layout          : 'border',
            monitorValid: true,
            url: null ,
            buttonAlign     : 'center',
            padding         : 5,
            style           : 'background-color: #fff;',
            border          : false,
            items:[
            {
                region:'north',
                xtype:'fieldset',                
                collapsible:false,
                hight:'100',
                layout:'anchor',
                anchor:'100%',
                padding:'15 15 5 15',
                defaults:{
                    hideEmptyLabel: true
                    ,
                    labelWidth:100
                },
                items:[
                 
                {
                    xtype: 'monthfield',
                    name: 'thbl',                                        
                    //                                        vtype:'daterange',
                    //                                        startDateField:  'gl_tgl_awal',
                    afterLabelTextTpl: required_css,
                    fieldLabel: 'Tahun Bulan',
                    anchor: '30%',
                    format:'Y-F'
                    ,
                    id:'koreksigaji_thbl',
                    readOnly:true

                }, 
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
                        id: 'koreksigaji_nik',
                        //                        flex:1,
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
                        width:220                       
                                
                    }
                    ,{
                        xtype:'textfield',
                        name: 'nama',
                        id: 'koreksigaji_nama',
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
                        id: 'koreksigaji_jabatan',
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
                }
                ]
            },
            {
                region:'center',
                xtype:'panel',
                layout:'border',
                items:[
                {
                    region:'center',
                    title:'Pendapatan',
                    xtype:'grid',
                    height:'100%',
                    minHeight:200,
                    id:'koreksigaji_pendapatan',                     
                    bind:{
                        store: '{strkoreksigajipendapatan}'            
                    },
                    selModel: 'cellmodel',
                    plugins: {
                        ptype: 'cellediting',
                        clicksToEdit: 1,
                        listeners:{
                            edit:function(me, context,opts){
//                                console.log('disini');
                                context.record.commit();
                                var mymodel=Ext.getCmp('koreksigaji_input').getViewModel();
//                                var str=mymodel.getData().strkoreksigajipendapatan;
                                
                                var total=0;
                                var totalpot=0;
                                var totalgj=0;
                                mymodel.getData().strkoreksigajipendapatan.each(function(v){                                    
                                    total=total+parseFloat(v.data.nilai);
                                });
                                totalpot=parseFloat(Ext.getCmp('koreksigaji_totalpotongan').getValue());
                                totalgj=total-totalpot;
                                Ext.getCmp('koreksigaji_totalpendapatan').setValue(total);
                                Ext.getCmp('koreksigaji_totalgaji').setValue(totalgj);
                            }
                        }
                    },
                    columns: [   
        
        
                    {
                        text: 'Kode', 
                        dataIndex: 'kode', 
                        align:'left',
                        width:80
                    },
                    {
                        text: 'Keterangan', 
                        dataIndex: 'keterangan', 
                        align:'left',
                        width:200
                    },
                    {
                        text: 'Nilai', 
                        dataIndex: 'nilai', 
                        xtype:'numbercolumn',
                        format:'0,0.00',
                        align:'right',
                        width:100,
                        editor:{
                            xtype: 'numberfield',
                            id: 'koreksigaji_nilaipendapatan',
                            allowBlank: true,   
                            hideTrigger: true,
                            minValue: 0,
                            fieldStyle: 'text-align: right;'     
                            ,
                            enableKeyEvents:true
                            ,
                            listeners:{
                                keyup:function( me, e, eOpts ){
                        
                                    //                                        readLog(me.getValue());
                                    if (me.getValue()===''|| me.getValue()===null){
                                        me.setValue('0');
                                    }
                                                                
                                }
                            }
                        }
                    }
                    ],
                    bbar:[
                    '->',
                    {   
                        xtype:'numericfield',
                        fieldLabel: 'Total Pendapatan',
                        id: 'koreksigaji_totalpendapatan',
                        name:'totalpendapatan',
                        hiddenName:'totalpendapatan',
                        currencySymbol: null,
                        useThousandSeparator: true,
                        thousandSeparator: ',',
                        alwaysDisplayDecimals: true,
                        fieldStyle: 'text-align: right;',
                        value:0,
                        minValue:0,
                        hideTrigger: true,
                        readOnly:true,
                        width:250,
                        labelWidth:120,
                        labelAlign: 'right'
                    }
                    ]
                },
                {
                    region:'east',
                    split: true,
                    width:'50%',
                    minWidth:'500',  
                    height:'100%',
                    minHeight:200,
                    xtype:'grid',
                    title:'Potongan',
                    id:'koreksigaji_potongan',                     
                    bind:{
                        store: '{strkoreksigajipotongan}'            
                    },
                    selModel: 'cellmodel',
                    plugins: {
                        ptype: 'cellediting',
                        clicksToEdit: 1,
                        listeners:{
                            edit:function(me, context,opts){
//                                console.log('disini');
                                context.record.commit();
                                var mymodel=Ext.getCmp('koreksigaji_input').getViewModel();
//                                var str=mymodel.getData().strkoreksigajipendapatan;
                                
                                var total=0;
                                var totalpot=0;
                                var totalgj=0;
                                mymodel.getData().strkoreksigajipotongan.each(function(v){                                    
                                    totalpot=totalpot+parseFloat(v.data.nilai);
                                });
                                total=parseFloat(Ext.getCmp('koreksigaji_totalpendapatan').getValue());
                                totalgj=total-totalpot;
                                Ext.getCmp('koreksigaji_totalpotongan').setValue(totalpot);
                                Ext.getCmp('koreksigaji_totalgaji').setValue(totalgj);
                            }
                        }
                        
                    },
                    
                    columns: [   
        
        
                    {
                        text: 'Kode', 
                        dataIndex: 'kode', 
                        align:'left',
                        width:80
                    },
                    {
                        text: 'Keterangan', 
                        dataIndex: 'keterangan', 
                        align:'left',
                        width:200
                    },
                    {
                        text: 'Nilai', 
                        dataIndex: 'nilai', 
                        xtype:'numbercolumn',
                        format:'0,0.00',
                        align:'right',
                        width:100,
                        editor:{
                            xtype: 'numberfield',
                            id: 'koreksigaji_nilaipotongan',
                            allowBlank: true,   
                            hideTrigger: true,
                            minValue: 0,
                            fieldStyle: 'text-align: right;'     
                            ,
                            enableKeyEvents:true
                            ,
                            listeners:{
                                keyup:function( me, e, eOpts ){
                        
                                    //                                        readLog(me.getValue());
                                    if (me.getValue()===''|| me.getValue()===null){
                                        me.setValue('0');
                                    }
                                                                
                                }
                            }
                        }
                    }
                    ],
                    bbar:[
                    '->',
                    {   
                        xtype:'numericfield',
                        fieldLabel: 'Total Potongan',
                        id: 'koreksigaji_totalpotongan',
                        name:'totalpotongan',
                        hiddenName:'totalpotongan',
                        currencySymbol: null,
                        useThousandSeparator: true,
                        thousandSeparator: ',',
                        alwaysDisplayDecimals: true,
                        fieldStyle: 'text-align: right;',
                        value:0,
                        minValue:0,
                        hideTrigger: true,
                        readOnly:true,
                        width:250,
                        labelWidth:120,
                        labelAlign: 'right'
                    },{   
                        xtype:'numericfield',
                        fieldLabel: 'Total Gaji',
                        id: 'koreksigaji_totalgaji',
                        name:'totalgaji',
                        hiddenName:'totalgaji',
                        currencySymbol: null,
                        useThousandSeparator: true,
                        thousandSeparator: ',',
                        alwaysDisplayDecimals: true,
                        fieldStyle: 'text-align: right;',
                        value:0,
                        minValue:0,
                        hideTrigger: true,
                        readOnly:true,
                        width:250,
                        labelWidth:120,
                        labelAlign: 'right'
                    }
                    ]
                }
                ]
            }
            ]
            ,
            buttons : [
            {
                text: 'Simpan',                    
                itemId: 'btnsave',
                id:'idButtonKoreksiGajiInputSave',
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