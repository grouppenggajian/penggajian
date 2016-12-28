Ext.define('Penggajian.view.transaksi.cuti.CutiInput', 
    {
        extend          : 'Ext.window.Window',
        title           : 'Input Cuti',
        requires        : [
        'Penggajian.view.transaksi.cuti.CutiController',
        'Penggajian.view.transaksi.cuti.CutiNikEditor',
        'Penggajian.view.transaksi.cuti.CutiModel'
        ],
        controller:'cuti',
        viewModel:'cuti',
        //        plugins: {
        //            ptype: 'datatip'
        //        },
        width           : 622,
        height          : 370,
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
            items:[
                {
                xtype:'fieldset',                
                collapsible:false,
                layout:'anchor',
                anchor:'100%',
                padding:'15 15 5 15',
                defaults:{
                    hideEmptyLabel: true
                    ,labelWidth:100
                },
                items:[
                    {
                xtype:'textfield',
                name: 'no_cuti',
                id: 'cutino_cuti',                        
                afterLabelTextTpl: required_css,                        
                fieldLabel: 'no_cuti',
                anchor    : '100%',
                hiddenName:'no_cuti',
                allowBlank: true,                                                             
                width:400,
                readOnly:true,hidden:true
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
                    items: [{
                        xtype:'twincombo',
                        id:'cutinik',        
                        afterLabelTextTpl: required_css,                        
                        fieldLabel: 'NIK',
                        menu:'cuti_nik_editor',                                    
                        name: 'nik',
                        itemId: 'itemIdcuti_nik' ,
                        width:225  
                    }
            
                    ,{
                        xtype:'textfield',
                        name: 'nama',
                        id: 'cutinama',
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
                                
                    }]
                },{
                xtype:'textfield',
                name: 'kode_jabatan',
                id: 'cutikode_jabatan',                        
                afterLabelTextTpl: required_css,                        
                fieldLabel: 'Jabatan',
                anchor    : '100%',
                hiddenName:'nama_jabatan',
                allowBlank: false,                                                             
                width:400,
                readOnly:true
            },{
                
                    xtype: 'fieldcontainer',   
                    fieldLabel:'Tanggal Cuti',
                    defaultType: 'textfield',
                    anchor:'100%',                
                    layout: 'hbox',
                    defaults: {
                        labelWidth: 80,
                        allowBlank: false,
                        labelAlign: 'top'
                    },
                    items: [
                    {
                        xtype:'datefield',
                        fieldLabel:'Mulai Cuti',
                        labelStyle:'text-align:center;background-color:#5FA2DD;color:white;',
                        name: 'tgl_mulai',
                        id: 'cutitgl_mulai',    
                        minValue:new Date(),
                        afterLabelTextTpl: required_css,                                                
                        hiddenName:'tgl_mulai',
                        allowBlank: false,            
                        format:'d-m-Y',
                        width:120,
                        listeners:{
                             select :function( dtfield , value , eOpts ){
                                var frm= Ext.getCmp('cuti_input');
                                var selesai=Ext.getCmp('cutitgl_selesai').getValue();
                                if(!selesai){
                                    selesai=value;
                                }                       
                                var diffDays = dateDiff(value,selesai); 
                                    Ext.getCmp('cutijml_cuti').setValue(diffDays);
                                frm.getController().getSisaCuti();
                                
                                
                             }

                        }
                    },{
                        xtype:'datefield',
                        fieldLabel:'Mulai Masuk',
                        labelStyle:'text-align:center;background-color:#5FA2DD;color:white;',
                        name: 'tgl_selesai',
                        id: 'cutitgl_selesai',    
                        minValue:new Date(),
                        afterLabelTextTpl: required_css,                                                
                        hiddenName:'tgl_selesai',
                        allowBlank: false,            
                        format:'d-m-Y',
                        width:120,
                        listeners:{
                            select :function(dtfield , value , eOpts){
                                var mulai=Ext.getCmp('cutitgl_mulai').getValue();
                                var frm= Ext.getCmp('cuti_input');
                                var sisakuota=0;
                                if(value<=mulai ){
                                    dtfield.setValue(null);
                                    Ext.getCmp('cutijml_cuti').setValue(0);
                                    sisakuota=frm.getController().getSisaKuotaCuti();
                                    Ext.getCmp('cutisisakuota_cuti').setValue(sisakuota);
                                }else{
                                    
                                    var diffDays = dateDiff(mulai,value); 
                                    Ext.getCmp('cutijml_cuti').setValue(diffDays);
                                    sisakuota=frm.getController().getSisaKuotaCuti();
                                    if(sisakuota<0){
                                        dtfield.setValue(null);
                                        Ext.getCmp('cutijml_cuti').setValue(0);
                                        sisakuota=frm.getController().getSisaKuotaCuti();
                                        Ext.getCmp('cutisisakuota_cuti').setValue(sisakuota);
                                    }else{
                                        Ext.getCmp('cutisisakuota_cuti').setValue(sisakuota);
                                    }
                                    
                                }
                            }
                        }
                    },{
                               id:'cutijml_cuti',
                               name : 'jml_cuti',
                               xtype: 'numberfield',
                               fieldLabel:'Jml',
                               fieldStyle: 'text-align: center;' ,
                                labelStyle:'text-align:center;background-color:#5FA2DD;color:white;',
                               width: 70,
                               minValue:0,
                               value:0,
                               allowBlank: false,
                               readOnly:true
                               
                           },   {
                               id:'cutisisa_cuti',
                               name : 'sisa_cuti',
                               xtype: 'numberfield',
                               fieldLabel:'Sisa',
                               fieldStyle: 'text-align: center;' ,
                                labelStyle:'text-align:center;background-color:#5FA2DD;color:white;',
                               width: 70,
                               minValue:0,
                               value:0,
                               allowBlank: false,
                               readOnly:true
                               
                           }    ,   {
                               id:'cutisisakuota_cuti',
                               name : 'sisakuota_cuti',
                               xtype: 'numberfield',
                               fieldLabel:'Sisa Kuota',
                               fieldStyle: 'text-align: center;' ,
                                labelStyle:'text-align:center;background-color:#5FA2DD;color:white;',
                               width: 70,
                               minValue:0,
                               value:0,
                               allowBlank: false,
                               readOnly:true
                               
                           }     
                    ]
                }
                ,{
                xtype:'combo',
                name: 'kategori_cuti',
                id: 'cutikategori_cuti',                        
                afterLabelTextTpl: required_css,                        
                fieldLabel: 'Kategori Cuti',
                anchor    : '100%',
                hiddenName:'kategori_cuti',
                allowBlank: false,
                bind:{
                    store: '{storekategori_absen}'
                },
//                store: 'storejabatancombo',
                valueField: 'kode',
                displayField: 'keterangan',
                typeAhead: true,
                triggerAction: 'all' ,
                hideTrigger:false,
                queryParam:'searchvalue',
                width:400,
                readOnly:false
            } ,{
                        xtype:'textfield',
                        name: 'keterangan',
                        id: 'cutiketerangan',
//                        flex:1,
                        //                                tooltip: 'Maximal 8 character Field tidak boleh kosong',
                        afterLabelTextTpl: required_css,
                        //                                fieldStyle: 'text-transform:uppercase;',
                                        fieldLabel: 'Keterangan',
                        //                        labelWidth : '10',
                        //                        labelStyle: 'width:120px; white-space: nowrap;text-transform:propercase;', 
                        anchor    : '100%',
                        hiddenName:'keterangan',
                        allowBlank: false  ,  
                        readOnly:false,
                        width:210                       
                                
                    }
                ]
            }
            ]
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