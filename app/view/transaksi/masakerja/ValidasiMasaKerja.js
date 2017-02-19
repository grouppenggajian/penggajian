
Ext.define('Penggajian.view.transaksi.masakerja.ValidasiMasaKerja',{
    extend: 'Ext.container.Container',
xtype: 'TabValidasiMasaKerja',
    alias: 'widget.ValidasiMasaKerja',
    requires: [
        'Penggajian.view.transaksi.masakerja.ValidasiMasaKerjaController',
        'Penggajian.view.transaksi.masakerja.ValidasiMasaKerjaModel',
        'Penggajian.view.transaksi.masakerja.ValidasiMasaKerjaInput',
        'Penggajian.view.transaksi.masakerja.ValidasiMasaKerjaEdit'
    ],

    controller: 'validasimasakerja',
    viewModel: {
        type: 'validasimasakerja'
    },

    title: 'Validasi MasaKerja',
    id: 'tab2h2',
    closable: true,        
    layout: 'border', 
    items:[
        {
        xtype:'grid',
        id:'idvalidasimasakerjalist',
        region:'center',
        bind:{
            store:'{strvalidasimasakerja}'
        },        
        columns: [
            {
            xtype: 'actioncolumn',
            header: 'Action',
            menuDisabled: true,
            sortable: false,   
            align:'center',
            width: 85,
            items: [
            {
                iconCls: 'icon-edit-record',
                tooltip: 'Edit Row',
                handler: 'onEditClick' 
            },{
                getClass: function(v, meta, rec) {
                    return 'icon-delete';
                },
                getTip: function(v, meta, rec) {
                    return 'Delete Plant';
                },
                handler: function(grid, rowIndex, colIndex) {
                    var rec = grid.getStore().getAt(rowIndex);
                    Ext.Msg.show({
                        title: 'Confirm',
                        msg: 'Are you sure delete selected row ?',
                        buttons: Ext.Msg.YESNO,
                        icon: Ext.Msg.QUESTION,
                        fn: function(btn){
                            if (btn == 'yes') {
                                                                
                                var data = rec.data;
                                var vtahun=rec.get('tahun');
                                var vnik=rec.get('nik');
                                
                                //data = Ext.JSON.encode(rec.data);
                                //                                    console.log(data)                                
                                Ext.Ajax.request({                                                            
                                    url: Penggajian.Global.getApiUrl() + 'validasimasakerja/deleteRow',
                                    method: 'POST',
                                    params: {
                                        opt: 'delete',
                                        _token: tokendata,
                                        nik:vnik,
                                        tahun:vtahun
                                    //                                              id:data.id
                                    },
                                    success: function(obj) {
                                        var   resp = Ext.decode(obj.responseText);                                                                
                                        if(resp.success==true){
                                            Ext.Msg.show({
                                                title:'Message Info',
                                                msg: resp.message,
                                                buttons: Ext.Msg.OK,
                                                icon: Ext.Msg.INFO
                                            });
                                            Ext.getCmp('tab2h2').getController().onSearchValidasiMasaKerja();
                                        }else{
                                            Ext.Msg.show({
                                                title: 'Error',
                                                msg: resp.message,
                                                modal: true,
                                                icon: Ext.Msg.ERROR,
                                                buttons: Ext.Msg.OK,
                                                fn: function(btn){
                                                    if (btn == 'ok' && resp.msg == 'Session Expired') {
                                                        window.location = Penggajian.Global.getApiUrl();
                                                    }
                                                }
                                            });
                                        }
                                    },
                                    failure: function(obj) {
                                        //                            var obj=action.response;
                                        try{
                                            var  resp = Ext.decode(obj.responseText);                                        
                                            Ext.getCmp('tab2h2').getController().onSearchValidasiMasaKerja();   
                    
                                            if (resp.reason == 'Session Expired' || resp.message == 'Session Expired') {
                                                session_expired('Session Expired');
                                            } else{
                                                set_message(2, resp.message);                            
                                            }
                                        
                                        }catch(ex){
                                            var msg=ex.message;
                                            //                                        var divEl = Ext.DomHelper.createDom('<div>'+ex.msg+'</div>');
                                            //                                        var vdiv=divEl.textContent;
                                            var exmsg=null;
                                            if (msg.indexOf('TokenMismatchException') > -1) {
                                                //console.log('TokenMismatchException');
                                                session_expired('Session Expired');
                                            }else{
                                                Ext.Msg.show({
                                                    title:'Message Error',
                                                    msg: ex.message,                                            
                                                    buttons: Ext.Msg.OK,
                                                    icon: Ext.Msg.ERROR,
                                                    maxWidth:'100%',
                                                    listeners:{
                                                        show:function(){
                                                            Ext.Msg.doComponentLayout();
                                                        }
                                                    }
                                                });
                                            }

                                        }
                                    }
                                });                 
                            } 
                        }
                    });
                }
            }]
                                
        },
            {
            text:'Tahun',
            dataIndex:'tahun',
            sortable:false,
            width:100,
            hidden:false,
            align:'center'
        },
            {
            text:'NIK',
            dataIndex:'nik',
            sortable:false,
            width:100,
            hidden:false,
            align:'center'
        },

        {
            text:'Nama',
            dataIndex:'nama',
            sortable:false,
            width:150,
            hidden:false,
            align:'left'
        }, {
            text:'Jabatan',
            dataIndex:'jabatan',
            sortable:false,
            width:170,
            hidden:false,
            align:'left'
        },    
         {
            text:'Tgl Masuk',
            dataIndex:'tglmasuk',
            sortable:true,
            width:100,
            hidden:false,
            align:'center'
        },    
         {
            text:'Tgl THR',
            dataIndex:'tglthr',
            sortable:true,
            width:100,
            hidden:false,
            align:'center'
        },{
            text:'Masa Kerja',
            dataIndex:'masakerja',
            sortable:false,
            width:170,
            hidden:false,
            align:'left'
        },{
            text:'Gaji Tetap',            
            dataIndex:'gajipokok',
            sortable:false,
            width:100,
            hidden:false,
            align:'right',
                xtype:'numbercolumn',
                format:'0,0.00'
        },{
            text:'Pengali',            
            dataIndex:'pengali',
            sortable:false,
            width:100,
            hidden:false,
            align:'right',
                xtype:'numbercolumn',
                format:'0,0.00'
        },{
            text:'Pembagi',            
            dataIndex:'pembagi',
            sortable:false,
            width:100,
            hidden:false,
            align:'right',
                xtype:'numbercolumn',
                format:'0,0.00'
        },    
         {
            text:'Create By',
            dataIndex:'create_by',
            sortable:true,
            width:100,
            hidden:false,
            align:'left'
        },    
         {
            text:'Create Date',
            dataIndex:'create_date',
            sortable:true,
            width:100,
            hidden:false,
            align:'center'
        },    
         {
            text:'Update By',
            dataIndex:'update_by',
            sortable:true,
            width:100,
            hidden:false,
            align:'left'
        },    
         {
            text:'Update Date',
            dataIndex:'update_date',
            sortable:true,
            width:100,
            hidden:false,
            align:'center'
        }   
        ],
        tbar:[
            {
            text:'Generate MasaKerja',
            iconCls:'icon-process',
            handler:'onGenerate'
        },{
            xtype: 'textfield',
            id:'validasimasakerjasearch',
//            store: 'storejadwal',
            width: 380,
            emptyText: 'Search Nik,Nama,Jabatan...',
//            enableKeyEvents:true,
            listeners:{
                specialkey: function(field, e){
                    if (e.getKey() == e.ENTER) {
                        var ctrl=Ext.getCmp('tab2h2').getController();
                        ctrl.onSearchValidasiMasaKerja();
//                        var form = field.up('form').getForm();
//                        form.submit();
                    }
                }
            }
            
        },{
                    xtype: 'numberfield',
                    name: 'tahun',
                    id: 'validasimasakerjatahun',
                    fieldLabel: 'Tahun',
                    width:190,
                    labelWidth:50,
                    hiddenName:'thbl',
                    allowBlank: false,
                    value:new Date().getFullYear(),
                    minValue:2000,
                    listeners:{
                         spinend:'onSelectTahun' 

                    }
                   
//                    ,maskRe:/\d/
                },{
            xtype: 'datefield',
            id:'validasimasakerjatglthr',
            format:'Y-m-d',
            width:100,
            hidden:false,
            readOnly:true
            
            
        },{
            text:'Search',
            iconCls:Ext.baseCSSPrefix + 'form-search-trigger',
            handler:'onSearchValidasiMasaKerja'//Ext.Date.format(valuedate, dateformat);
        },
        
        ],
        bbar: [
            
            {
            xtype: 'pagingtoolbar',
            displayInfo: true,
            pageSize: 10,
            bind:{
                store:'{strvalidasimasakerja}'
            }   
        }]
        }
    ],
    listeners:{
        show:'onShow'
    }
    
});
