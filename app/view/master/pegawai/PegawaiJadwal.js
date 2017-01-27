Ext.define('Penggajian.view.master.pegawai.PegawaiJadwal', {
    extend: 'Ext.container.Container',
    xtype: 'pegawaijadwal',
    alias: 'widget.PegawaiJadwal',   
    title: 'Jadwal',
    id: 'tabjadwalpegawai',
    requires:[
//    'Penggajian.view.master.pegawai.PegawaiModel',
    'Penggajian.view.master.pegawai.PegawaiJadwalEditor',
    ],
//    viewModel:'pegawai',
    autoScroll:true,
    layout: 'fit', 
    items:[   
    {
        xtype:'grid',
        //                height:300,
        //        autoScroll:true,
        //                        region:'center',                           
        id:'gridpegawaijadwal',
        //                title:'Pendapatan',
        //                        width:450,
        store: 'storepegawaijadwal',
        stripeRows: true,
        loadMask: true,
        stateful:true,
        stateId:'stateGridpegawaijadwal',        
        selModel://'cellmodel',
                    {
                    selType: 'rowmodel',
                    mode   : 'SINGLE'
              
                } ,
    
        plugins: {
            ptype: 'rowediting',
            clicksToEdit: 2,
            //            autoCancel: false,
            listeners: {
                cancelEdit: function(rowEditing, context) {
                // Canceling editing of a locally added, unsaved record: remove it
                                    if (context.record.phantom) {
                                        Ext.getCmp('gridpegawaijadwal').getStore().remove(context.record);
                                    }
                }
                ,afteredit: function(roweditor, changes, reco, rowIndex) {
                            var vnik=Ext.getCmp('pegawainik').getValue();
                            var vjab=Ext.getCmp('pegawaijabatan').getValue();
                            var recgrid=changes.record.data;
                            console.log(recgrid);
                            recgrid.tanggal=Ext.Date.format(recgrid.tanggal,'Y-m-d');
//                              recgrid[0].set('tanggal',Ext.Date.format(recgrid[0].get('tanggal'),'Y-m-d'));
                             Ext.Ajax.request({
                                url   :  Penggajian.Global.getApiUrl()+'pegawai/savejadwal',
                                method: 'POST',
                                params: {_token:tokendata,nik:vnik,kode_jabatan:vjab,postdata:Ext.JSON.encode(changes.record.data)},
                                success: function(response) {
                                  var resp= Ext.decode(response.responseText);
                                  if(resp.success){
                                      var recdata=Ext.decode(resp.postdata);
                                      var rec=Ext.getCmp('gridpegawaijadwal').store.findRecord('tanggal',recdata.tanggal);
                                      console.log(recdata.tanggal);
                                      console.log(rec);
                                      rec.set(recdata);
                                  }else{
                                      set_message(1, resp.message);
                                  }
                                  
                                  //post-processing here - this might include reloading the grid if there are calculated fields
                                },
                                failure:function(response) {
                                    console.log(response);
                                }
                              });
                        }

            }
        },
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
                handler: 'onDeletePegawaiJadwal' 
            }]
                
        },
//        {
//            
//            text: 'NIK',  
//            dataIndex: 'nik',
//            align:'left',
//            hidden:true
//        },
//        {
//            
//            text: 'Jabatan',  
//            dataIndex: 'jabatan',
//            align:'left',
//            hidden:false
//        },
        {
            
            text: 'Tanggal',  
            dataIndex: 'tanggal',
            xtype: 'datecolumn',   
            format:'d-m-Y', 
            align:'center',
            hidden:false,      
            editor:
            {
                xtype:'datefield',
                id:'pegawaijadwal_tanggal',                    
                format:'d-m-Y',                
                width: 95,
                name: 'pegawaijadwal_tanggal',
                itemId: 'itemIdpegawaijadwal_tanggal'  ,
                listeners:{
                    select:function ( me , value , eOpts ){
                        var gridstore=Ext.getCmp('gridpegawaijadwal').store;
                        var frec= gridstore.findRecord('tanggal',value);
                        if(!frec){
                            var recgrid=      Ext.getCmp('gridpegawaijadwal').getSelection();
                            recgrid[0].set('hari',datahari[value.getDay()]);//                   
                        }else{
                            me.setValue(null);
                            Ext.getCmp('gridpegawaijadwal').getPlugin().cancelEdit();
                        }
                    }
                }
            }
        },
        {
            
            text: 'Hari',  
            dataIndex: 'hari',
            align:'left',
            hidden:false
        },
        {
            text: 'Kode Shift',  
            dataIndex: 'kode_shift',
            align:'center',
            hidden:false,            
            editor:{
                xtype:'twincombo',
                id:'pegawaijadwal_kode_shift',                    
                menu:'pegawaijadwaleditor',                    
                width: 95,
                name: 'pegawaijadwal_kode_shift',
                itemId: 'itemIdpegawaijadwal_kode_shift'
                    
            }
        },{
            text: 'I/Masuk', 
            dataIndex: 'jam_kerja_1', 
            align:'left',
            xtype: 'datecolumn',   
            format:'H:i',
            flex: 1
        },
        {
            text: 'II/Keluar/Pulang', 
            dataIndex: 'jam_kerja_2', 
            align:'left',
            xtype: 'datecolumn',   
            format:'H:i',
            flex: 1
        },
        {
            text: 'III/Masuk', 
            dataIndex: 'jam_kerja_3', 
            align:'left',
            xtype: 'datecolumn',   
            format:'H:i',
            flex: 1
        },
        {
            text: 'IV/Keluar/Pulang', 
            dataIndex: 'jam_kerja_4', 
            align:'left',
            xtype: 'datecolumn',   
            format:'H:i',
            flex: 1
        }
        ],
        tbar:[
        {
                        
            xtype:'button',
            text:'Add',
            iconCls:'icons-add',
            handler:function(){
                // empty record
                var grid=Ext.getCmp('gridpegawaijadwal');
                var str=grid.getStore();
                var edit=grid.getPlugin();
                var rec = new str.getModel();    
//                var vnik=Ext.getCmp('pegawainik').getValue();
//                var vjab=Ext.getCmp('pegawaijabatan').getValue();
//                rec.set('nik',vnik);
//                rec.set('kode_jabatan',vjab);
                grid.store.insert(0, rec);
                edit.startEdit(0, 0);
                
            }
        } ,
{
            xtype: 'datefield',
            id:'pegawaijadwal_start',
            format:'d-m-Y',
            width:125
        },
        ' s/d ',
        {
            xtype: 'datefield',
            id:'pegawaijadwal_finish',
            format:'d-m-Y',
            width:125
        },
        {
            text:'Refresh/Search Tanggal',
            iconCls:Ext.baseCSSPrefix + 'form-search-trigger',
            handler:'onClickRefreshJadwal'//Ext.Date.format(valuedate, dateformat);
        }]
//    ,
//        bbar:['->',{
//            text: 'Simpan',                    
//            itemId: 'btnsavepegawaijadwal',
//            id:'btnsavepegawaijadwal',
//            iconCls: 'icon-simpan',
//            formBind: true,                       
//            handler: 'onSavePegawaiJadwal'
//        }]
    }
    ],
    listeners:{
        show:function(){
            var storegridjadwalpeg=Ext.getCmp('gridpegawaijadwal').store;   
            storegridjadwalpeg.removeAll ();
            var app = Penggajian.getApplication();
            app.getStore('storeperiode').load({
                scope: this,
                callback:function(records, operation, success){
                    if(success){
                        if(records.length>0){
                            Ext.getCmp('pegawaijadwal_start').setValue(records[0].get('tglawal'));
                            Ext.getCmp('pegawaijadwal_finish').setValue(records[0].get('tglakhir'));
                            if(Ext.getCmp('pegawainik').getValue()){
                                storegridjadwalpeg.getProxy().setExtraParam('nik',Ext.getCmp('pegawainik').getValue());
                                storegridjadwalpeg.getProxy().setExtraParam('kode_jabatan',Ext.getCmp('pegawaijabatan').getValue());
                                storegridjadwalpeg.load({
                                    params:{
                                        awal:Ext.getCmp('pegawaijadwal_start').getValue(),
                                        akhir:Ext.getCmp('pegawaijadwal_finish').getValue()
                                    }
                                });
                            }
                        }
                    }
                }
            }
            ); 
            
            
            
            
        }
    }
})