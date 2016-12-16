Ext.define('Penggajian.view.master.pegawai.PegawaiPendapatan', {
    extend: 'Ext.container.Container',
    xtype: 'pegawaipendapatan',
    alias: 'widget.PegawaiPendapatan',   
    title: 'Pendapatan',
    id: 'tabpendapatanpegawai',
    layout: 'fit', 
    //    autoScroll:true,
    items:[  
    {
        xtype:'grid',
        //                height:300,
        autoScroll:true,
        //                        region:'center',                           
        id:'gridpegawaipendapatan',
        //                title:'Pendapatan',
        //                        width:450,
        store: 'storepegawaipendapatanedit',
        stripeRows: true,
        loadMask: true,
        stateful:true,
        stateId:'stateGridpegawaipendapatan'     
        ,
        //                selType: 'checkboxmodel',
        selModel: 'cellmodel',
        plugins: {
            ptype: 'cellediting',
            clicksToEdit: 1
        },
               
        //                autoScroll:true
        //                ,
        columns:[
           {
                xtype: 'actioncolumn',
                header: 'Action',
                menuDisabled: true,
                sortable: false,   
                align:'center',
                width: 85,
                items: [
                {
                    iconCls: 'icon-delete',
                    tooltip: 'Delete Row',
                    handler: 'onDeletePegawaiPendapatan' 
                }]
                
            },
                
        {
            text: 'Kode',  
            dataIndex: 'kode',
            align:'center',
            hidden:false
        },
        {
            text: 'Pendapatan', 
            dataIndex: 'keterangan', 
            align:'left'
            ,
            flex:1
        }
        ,
        {
                
            text: 'Batas', 
            dataIndex: 'batas', 
            align:'center',
            xtype: 'checkcolumn',
            width:60,
            processEvent:function(){
                return false;
            }
                                       
        },
        {
            text: 'Min', 
            dataIndex: 'batas_min', 
            align:'right',
            xtype:'numbercolumn',
            format:'0,0',
            width:100
        },
        {
            text: 'Max', 
            dataIndex: 'batas_max', 
            align:'right',
            xtype:'numbercolumn',
            format:'0,0',
            width:100
        },
        {
            text: 'Nilai', 
            dataIndex: 'nilai', 
            align:'right',
            xtype:'numbercolumn',
            format:'0,0',
            width:100,
            //                    flex: 1,
                    
            editor:{
                xtype: 'numberfield',
                id: 'edit_pegawaipendapatan_nilai',
                allowBlank: true,   
                hideTrigger: true,
                minValue: 0,
                fieldStyle: 'text-align: right;'     
                ,
                enableKeyEvents:true
                ,
                listeners:{
                    keyup:function( me, e, eOpts ){
                        console.log('jajal2');
                        //                                        readLog(me.getValue());
                        if (me.getValue()===''|| me.getValue()===null){
                            me.setValue('0');
                        }
                        var gridmodel=Ext.getCmp('gridpegawaipendapatan').getSelectionModel();
                        var rec=gridmodel.getSelection();
                        var recedit=rec[0];
                        //                                        console.log(rec[0].get('batas'));//                                       
                        if(recedit.get('batas')){                                           //                                          
                            if(me.getValue() > (recedit.get('batas_max')?recedit.get('batas_max'):0)){
                                me.setValue('0');
                            }
                        //                                            }
                        }                                        
                    }
                }
            }
        }
       
        ],
        tbar:[
        {
            text:'Add From Pendapatan',
            iconCls:'icons-add',
            handler:'onClickAddPendapatan'
        },{
            text:'Refresh',
            iconCls:'icon-refresh',
            handler:'onClickRefreshPendapatan'
        }],
        bbar:['->',{
            text: 'Simpan',                    
            itemId: 'btnsavepegawaipendapatan',
            id:'btnsavepegawaipendapatan',
            iconCls: 'icon-simpan',
            formBind: true,                       
            handler: 'onSavePegawaiPendapatan'
        }]
                    
    }
    ],
    listeners:{
        show:function(){
            var storegridpenpeg=Ext.getCmp('gridpegawaipendapatan').store;   
            storegridpenpeg.getProxy().setExtraParam('nik',Ext.getCmp('pegawainik').getValue());
            storegridpenpeg.getProxy().setExtraParam('kode_jabatan',Ext.getCmp('pegawaijabatan').getValue());
            
            storegridpenpeg.load();
        }
    }
                    

                    
})