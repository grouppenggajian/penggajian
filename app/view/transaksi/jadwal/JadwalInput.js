Ext.define('Penggajian.view.transaksi.jadwal.JadwalInput', 
    {
        extend          : 'Ext.window.Window',
        title           : 'Input Jadwal',
        requires        : [
        'Penggajian.view.transaksi.jadwal.JadwalController',
        'Penggajian.view.transaksi.jadwal.JadwalNikEditor',
        'Penggajian.view.transaksi.jadwal.JadwalShiftEditor'
        ],
        controller:'jadwal',
        //        plugins: {
        //            ptype: 'datatip'
        //        },
        width           : 850,
        height          : 420,
        layout          : 'fit',
        autoShow        : true,
        modal           : true,
        alias           : 'widget.jadwalinput',
        id              : 'jadwal_input',
        maximizable     :true,
        closeAction:'destroy',
        items:[
        {
            xtype:'form',
            id:'formjadwalinput',
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
                    xtype:'twincombo',
                    id:'jadwalnik',        
                    afterLabelTextTpl: required_css,                        
                    fieldLabel: 'NIK',
                    menu:'jadwal_nik_editor',                    
                    //                        width: 95,
                    name: 'nik',
                    itemId: 'itemIdjadwal_nik'  
//                    ,listeners:{
//                        validitychange:function ( me , isValid , eOpts ){
//                            if(isValid){
//                                Ext.getCmp('pinjaman_nama').setValue(me.getValue());
//                            }
//                        }
//                    }
                    
                },
                {
                    xtype:'textfield',
                    name: 'nama',
                    id: 'jadwalnama',                                                                    
                    fieldLabel: 'Pegawai',
                    anchor    : '75%',
                    hiddenName:'nama',
                    allowBlank: false,                                             
                    readOnly:true,
                    width:320
                },{
                    xtype:'combo',
                    name: 'kode_jabatan',
                    id: 'jadwalkode_jabatan',                        
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
                }
                    ]
                }
                ,
                {
        xtype:'grid',
                        minHeight:'300',
                        
//        autoScroll:true,
                                region:'center',                           
        id:'gridinputjadwal',
        //                title:'Pendapatan',
        //                        width:450,
        store: 'storeinputjadwal',
        stripeRows: true,
        loadMask: true,
        stateful:true,
        stateId:'stateGridinputjadwal',        
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
                                        Ext.getCmp('gridinputjadwal').getStore().remove(context.record);
                                    }
                }
                ,afteredit: function(roweditor, changes, reco, rowIndex) {
                            var vnik=Ext.getCmp('jadwalnik').getValue();
                            var vjab=Ext.getCmp('jadwalkode_jabatan').getValue();
                            var recgrid=changes.record.data;
                            console.log(recgrid);
                            recgrid.tanggal=Ext.Date.format(recgrid.tanggal,'Y-m-d');
//                              recgrid[0].set('tanggal',Ext.Date.format(recgrid[0].get('tanggal'),'Y-m-d'));
                             Ext.Ajax.request({
                                url   :  Penggajian.Global.getApiUrl()+'jadwal/savejadwal',
                                method: 'POST',
                                params: {_token:tokendata,nik:vnik,kode_jabatan:vjab,postdata:Ext.JSON.encode(changes.record.data)},
                                success: function(response) {
                                  var resp= Ext.decode(response.responseText);
                                  if(resp.success){
                                      var recdata=Ext.decode(resp.postdata);
                                      var rec=Ext.getCmp('gridinputjadwal').store.findRecord('tanggal',recdata.tanggal);
                                      console.log(recdata.tanggal);
                                      console.log(rec);
                                      
                                      rec.set(recdata);
                                      rec.commit();
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
                handler: 'onDeleteInputJadwal' 
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
                id:'inputjadwal_tanggal',                    
                format:'d-m-Y',                
                width: 95,
                name: 'inputjadwal_tanggal',
                itemId: 'itemIdinputjadwal_tanggal'  ,
                listeners:{
                    select:function ( me , value , eOpts ){
                        var gridstore=Ext.getCmp('gridinputjadwal').store;
                        var frec= gridstore.findRecord('tanggal',value);
                        if(!frec){
                            var recgrid=      Ext.getCmp('gridinputjadwal').getSelection();
                            recgrid[0].set('hari',datahari[value.getDay()]);//                   
                        }else{
                            me.setValue(null);
                            Ext.getCmp('gridinputjadwal').getPlugin().cancelEdit();
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
                id:'inputjadwal_kode_shift',                    
                menu:'jadwalshifteditor',                    
                width: 95,
                name: 'inputjadwal_kode_shift',
                itemId: 'itemIdinputjadwal_kode_shift'
                    
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
            formBind: true,  
            handler:function(){
                // empty record
//                var vnik=Ext.getCmp('jadwalnik').getValue();
                var grid=Ext.getCmp('gridinputjadwal');
                var str=grid.getStore();
                var edit=grid.getPlugin();
                var rec = new str.getModel();    
                
//                var vjab=Ext.getCmp('jadwalkode_jabatan').getValue();
//                rec.set('nik',vnik);
//                rec.set('kode_jabatan',vjab);
                grid.store.insert(0, rec);
                edit.startEdit(0, 0);
                
            }
        } ,
{
            xtype: 'datefield',
            id:'inputjadwal_start',
            format:'d-m-Y',
            width:125
        },
        ' s/d ',
        {
            xtype: 'datefield',
            id:'inputjadwal_finish',
            format:'d-m-Y',
            width:125
        },
        {
            text:'Refresh/Search Tanggal',
            iconCls:'icon-refresh',
            handler:'onClickRefreshJadwal'
        }]}
               
            ]
            ,
            buttons : [
//            {
//                text: 'Simpan',                    
//                itemId: 'btnsave',
//                id:'idButtonJadwalInputSave',
//                iconCls: 'icon-simpan',
//                formBind: true,                       
//                handler: 'onSave'
//            },
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
        ],
        listeners:{
//        show:function(){
//            var storegridjadwaledit=Ext.getCmp('gridinputjadwal').store;   
//            storegridjadwaledit.removeAll ();
//            var app = Penggajian.getApplication();
//            app.getStore('storeperiode').load({
//                scope: this,
//                callback:function(records, operation, success){
//                    if(success){
//                        if(records.length>0){
//                            Ext.getCmp('inputjadwal_start').setValue(records[0].get('tglawal'));
//                            Ext.getCmp('inputjadwal_finish').setValue(records[0].get('tglakhir'));
//                            
//                            if(Ext.getCmp('jadwalnik').getValue()){
//                                storegridjadwaledit.getProxy().setExtraParam('nik',Ext.getCmp('jadwalnik').getValue());
//                                storegridjadwaledit.getProxy().setExtraParam('kode_jabatan',Ext.getCmp('jadwalkode_jabatan').getValue());
//                                storegridjadwaledit.load({
//                                    params:{
//                                        awal:Ext.getCmp('inputjadwal_start').getValue(),
//                                        akhir:Ext.getCmp('inputjadwal_finish').getValue()
//                                    }
//                                });
//                            }
//                        }
//                    }
//                }
//            });
//            
//            
//            if(Ext.getCmp('jadwalnik').getValue()){
//                storegridjadwaledit.getProxy().setExtraParam('nik',Ext.getCmp('jadwalnik').getValue());
//                storegridjadwaledit.getProxy().setExtraParam('kode_jabatan',Ext.getCmp('jadwaljabatan').getValue());
//                storegridjadwaledit.load();
//            }
//            
//            
//            
//        }
    }
    })