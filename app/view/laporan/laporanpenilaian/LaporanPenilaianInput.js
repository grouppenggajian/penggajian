Ext.define('Penggajian.view.laporan.laporanpenilaian.LaporanPenilaianInput', 
    {
        extend          : 'Ext.window.Window',
        title           : 'Input LaporanPenilaian',
        requires        : [
        'Penggajian.view.laporan.laporanpenilaian.LaporanPenilaianController',
        'Penggajian.view.laporan.laporanpenilaian.LaporanPenilaianModel'
        ],
        controller:'laporan-laporanpenilaian-laporanpenilaian',
        viewModel: {
            type: 'laporan-laporanpenilaian-laporanpenilaian'
        },
        //        plugins: {
        //            ptype: 'datatip'
        //        },
        width           : 850,
        height          : 600,
        layout          : 'fit',
        autoShow        : true,
        modal           : true,
        alias           : 'widget.laporanpenilaianinput',
        id              : 'laporanpenilaian_input',
        maximizable     :true,
        closeAction:'destroy',
        items:[
        {
            xtype:'form',
            id:'formlaporanpenilaianinput',
            defaults        : {
                allowBlank: false,
                labelAlign: 'left',
                labelWidth: 100
            },
            layout:'border',
            bodyPadding:5,
            monitorValid: true,
            url: null ,
            buttonAlign     : 'center',
            padding         : 5,
            style           : 'background-color: #fff;',
            border          : false,
            items:[
            {
                xtype:'fieldset',
                layout:'anchor',
                region:'north',
                defaults        : {
                    allowBlank: false,
                    labelAlign: 'left',
                    labelWidth: 100
                },
                items:[
                {
                    xtype:'combo',
                    name: 'kode_jabatan',
                    id: 'laporanpenilaiankode_jabatan',                        
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
                    hideTrigger:false,
                    queryParam:'searchvalue',
                    width:400
                } ,
{
                    xtype:'datefield',
                    name: 'tanggal',
                    id: 'laporanpenilaiantanggal',
                    //                    tooltip: 'Maximal 7 character Field tidak boleh kosong',
                    afterLabelTextTpl: required_css,
                    //                    fieldStyle: 'text-transform:propercase;',
                    fieldLabel: 'Tanggal',
                    anchor: '50%',
                    hiddenName:'tanggal',
                    allowBlank: false,
                    format:'d/m/Y'
                   
                //                    ,maskRe:/\d/
                }
                ]
            }
            ,
            {
                xtype:'grid',
                minHeight:'300',
                        
                //        autoScroll:true,
                region:'center',                           
                id:'gridinputlaporanpenilaian',        
                bind:{
                    store: '{storeentrynilai}'            
                },
                selModel: 'cellmodel',
                stripeRows: true,
                loadMask: true,
                stateful:true,
                stateId:'stateGridinputlaporanpenilaian',        
                selModel:'cellmodel',                    
                plugins: {
                    ptype: 'cellediting',
                    clicksToEdit: 1,
                    listeners:{
                        edit:function(me, context,opts){
                            //                                console.log('disini');
                            context.record.commit();                            
                        }
                    }
                },
                columns:[
                //        {
                //            xtype: 'actioncolumn',
                //            header: 'Action',
                //            menuDisabled: true,
                //            sortable: false,   
                //            align:'center',
                //            width: 85,
                //            items: [
                //            {
                //                iconCls: 'icon-delete',
                //                tooltip: 'Delete Row',
                //                handler: 'onDeleteInputLaporanPenilaian' 
                //            }]
                //                
                //        },
                {
                    text:'NIK',
                    dataIndex:'nik',
                    sortable:true,
                    width:100,
                    hidden:false,
                    align:'center'
                },

                {
                    text:'Nama',
                    dataIndex:'nama',
                    sortable:false,
                    width:200,
                    hidden:false,
                    align:'left'
                },
        
        
                {
                    text:'Kode Jabatan',
                    dataIndex:'kode_jabatan',
                    sortable:false,
                    width:200,
                    hidden:true,
                    align:'left'
                },
                {
                    text:'Jabatan',
                    dataIndex:'jabatan',
                    sortable:true,
                    width:150,
                    hidden:false,
                    align:'left'
                },
                {
                    text: 'Nilai', 
                    dataIndex: 'nilai', 
                    align:'right',
                    xtype:'numbercolumn',
                    format:'0,0',
                    width:100,
                    editor:{
                        xtype: 'numberfield',
                        id: 'laporanpenilaian_nilai',
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
                tbar:[
                {
                    text:'Load/Refresh',
                    id:'idButtonLaporanPenilaianInputRefresh',
                    iconCls:'icon-refresh',
                    formBind: true,    
                    handler:'onClickRefresh'
                }
                ]
            }
               
            ]
            ,
            buttons : [
            {
                text: 'Simpan',                    
                itemId: 'btnsave',
                id:'idButtonLaporanPenilaianInputSave',
                iconCls: 'icon-simpan',
                formBind: true,                       
                handler: 'onSave'
            },
            {
                text: 'Close',
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