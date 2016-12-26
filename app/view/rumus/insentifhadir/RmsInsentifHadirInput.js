Ext.define('Penggajian.view.rumus.insentifhadir.RmsInsentifHadirInput', 
    {
        extend          : 'Ext.window.Window',
        title           : 'Rumus Insentif Hadir',
        requires        : [
        'Penggajian.view.rumus.insentifhadir.RmsInsentifHadirController' ,
        'Penggajian.view.rumus.insentifhadir.RmsInsentifHadirModel' ,
        ],
        controller:'rmsinsentifhadir',
        viewModel:'rmsinsentifhadir',
        //        plugins: {
        //            ptype: 'datatip'
        //        },
        width           : 450,
        height          : 355,
        layout          : 'fit',
        autoShow        : true,
        modal           : true,
        alias           : 'widget.rmsinsentifhadirinput',
        id              : 'rmsinsentifhadir_input',
        maximizable     :false,
        closeAction:'destroy',
        items:[
        {
            xtype:'form',
            id:'formrmsinsentifhadirinput',
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
                    ,labelWidth:80
                },
                items:[
                {
                               id:'rmsinsentifhadirinput_id',
                               name : 'id',
                               hiddenName : 'id',
                               xtype: 'numberfield',
                               width: 100,                                                              
                               minValue:0,
                               allowBlank: true,
                               hidden:true
                           },    
                
                {
                xtype:'combo',
                name: 'kategori_ijin',
                id: 'rmsinsentifhadirinput_kategoriijin',                        
                afterLabelTextTpl: required_css,                        
                fieldLabel: 'Kategori Ijin',
                anchor    : '100%',
                hiddenName:'kategori_ijin',
                allowBlank: false,
                bind:{
                    store: '{storekategori_absen_rih}'
                },
//                store: 'storejabatancombo',
                valueField: 'kode',
                displayField: 'keterangan',
                typeAhead: true,
                triggerAction: 'all' ,
                hideTrigger:false,
//                queryMode:'local',
                width:400,
                readOnly:false
            } ,{
                xtype:'combo',
                name: 'tipe_ijin',
                id: 'rmsinsentifhadirinput_tipe_ijin',                        
                afterLabelTextTpl: required_css,                        
                fieldLabel: 'Tipe Ijin',
                anchor    : '100%',
                hiddenName:'tipe_ijin',
                allowBlank: false,                
                store: createArrayStore(datatipeijin),
                valueField: 'mid',
                displayField: 'mtext',
                typeAhead: true,
                triggerAction: 'all' ,
                hideTrigger:false,                
                width:400,
                readOnly:false
            },{
                xtype:'combo',
                name: 'jenisharikerja',
                id: 'rmsinsentifhadirinput_jenisharikerja',                        
                afterLabelTextTpl: required_css,                        
                fieldLabel: 'Hari Kerja',
                anchor    : '100%',
                hiddenName:'jenisharikerja',
                allowBlank: false,
                bind:{
                    store: '{storejenisharikerja}'
                },
//                store: 'storejabatancombo',
                valueField: 'id',
                displayField: 'name',
                typeAhead: true,
                triggerAction: 'all' ,
                hideTrigger:false,
//                queryParam:'searchvalue',
                width:400,
                readOnly:false
            }
            ,{
                        xtype: 'fieldcontainer',
//                        margin:'0 10 0 5',
                        fieldLabel:'Jumlah Ijin',
                        anchor:'100%',
                        combineErrors: false,
                        width:400,
                        layout:'hbox',
                        defaults: {
                            hideLabel: true
                            
                        },
                        items: [
                           {
                               id:'rmsinsentifhadirinput_kaliijin',
                               name : 'kali_ijin',
                               xtype: 'numberfield',
                               width: 100,
                               minValue:0,
                               allowBlank: false,
                               margin:'0 5 0 0'
                           },
                           {
                               xtype: 'displayfield',
                               value: 'Kali',
                               width: 50
                           }
                        ]
                    },{
                        xtype: 'fieldcontainer',
//                        margin:'0 10 0 5',
                        fieldLabel:'Nilai Insentif',
                        anchor:'100%',
                        combineErrors: false,
                        width:400,
                        layout:'hbox',
                        defaults: {
                            hideLabel: true
                            
                        },
                        items: [
                           {
                               id:'rmsinsentifhadirinput_nilaiinsentif',
                               name : 'nilai_insentif',
                               xtype: 'numberfield',
                               width: 100,
                               step:25,
//                               allowDecimals:true,
                               
                               minValue:0,
                               allowBlank: false,
                               margin:'0 5 0 0'
                           },
                           {
                               xtype: 'displayfield',
                               value: '%',
                               width: 50
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
                id:'idButtonrmsinsentifhadirinputSave',
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