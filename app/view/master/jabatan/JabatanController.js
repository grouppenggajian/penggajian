/**
 * This class is the controller for the main view for the application. It is specified as
 * the "controller" of the Main view class.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('Penggajian.view.master.jabatan.JabatanController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.jabatan',
    onShow:function(me,opts){
//        Ext.getCmp('idjabatanlist').store.load();
        //        console.log('test');
        Ext.override(Ext.data.Store,{
            addField: function(field){
                //                            readLog(this);
                field = new Ext.data.Field(field);
                //		this.recordType.prototype.fields.replace(field);
                if(typeof field.defaultValue != 'undefined'){
                    this.each(function(r){
                        if(typeof r.data[field.name] == 'undefined'){
                            r.data[field.name] = field.defaultValue;
                        }
                    });
                }
            },
            removeField: function(name){
                //		this.recordType.prototype.fields.removeKey(name);
                this.each(function(r){
                    delete r.data[name];
                    if(r.modified){
                        delete r.modified[name];
                    }
                });
            }
        });
        this.getDataSet();
//                var rmspendapatangrid=Ext.getCmp('idpendapatanlist').store;   
            
    },
    
    onClickRefresh:function(btn,opt){
        this.getDataSet();
                                                
    },
    getDataSet:function(){
        
        var vurl=Ext.getCmp('idjabatanlist').store.getProxy().getUrl();
        //        console.log(vurl);
        Ext.Ajax.request({
            url: vurl,
            method:'GET',
//            params:{
//                start:0,
//                limit:25
//            },
            waitMsg:'Load Data...',
            //                params:{},
            success: function(obj, opts) {
                var   resp = Ext.decode(obj.responseText);                 
                var data=resp.data;  
                //                console.log(data);
                var gridView = Ext.getCmp('idjabatanlist');
                var me=Ext.getCmp('tab1b').controller;
                var str=gridView.store;
                me.genStore(data);
                
                gridView.reconfigure(str, me.genColumns(data));
//                str=gridView.store;
//                gridView.store.on('update', function ( store , record , operation , modifiedFieldNames , details , eOpts ) {
//                        console.log(record);
//
//                });
                 gridView.store.load();
            },

            failure: function(response, opts) {
                var  resp = Ext.decode(response.responseText);
                if (resp.reason == 'Session Expired' || resp.message == 'Session Expired') {
                    session_expired('Session Expired');
                } else{
                    set_message(0, resp.reason +' '+resp.message);
                }
            }
        });    
    },
    
    getKeysFromJson : function (obj) {
        var keys = [];
        for (var key in obj) {
            if(key!='id'){
                if (obj.hasOwnProperty(key)) {
                    keys.push(key);
                }
            }
            
        }
        return keys;
    },

    genStore : function (json) {
        //        console.log(json);
        var me=Ext.getCmp('tab1b').controller;
        var keys = (Object.keys(json[0]));
        //        var app = Penggajian.getApplication();
        var gridstore=Ext.getCmp('idjabatanlist').store;
        gridstore.setFields(keys);
//        gridstore.setData(json);
        
        return gridstore;
        
    },

    genColumns : function (json) {
        var me=Ext.getCmp('tab1b').controller;
        var keys = (Object.keys(json[0]));
        //        readLog(json[0]);
        var col=
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
                                var vkodejabatan=data.kode_jabatan;
                                //data = Ext.JSON.encode(rec.data);
                                //                                    console.log(data)                                
                                Ext.Ajax.request({                                                            
                                    url: Penggajian.Global.getApiUrl() + 'jabatan/deleteRow',
                                    method: 'POST',
                                    params: {
                                        opt: 'delete',
                                        _token: tokendata,
                                        kode:vkodejabatan
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
                                            Ext.getCmp('jabatansearch').setValue(vkodejabatan);
                                            Ext.getCmp('jabatansearch').onSearchClick();
                                            Ext.getCmp('idjabatanpendapatan').store.reload({
                                                params:{
                                                    kode_jabatan:vkodejabatan
                                                }
                                            });
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
                                    var  resp = Ext.decode(obj.responseText);
                                    Ext.Msg.alert('info',resp.reason);
                                }
                                });                 
                        } 
                    }
                    });
            }
        }]
                                
    };
    var colmap=new Array();
    colmap.push(col);
    Ext.each(keys,function (mfield) { 
        if(mfield!='id'){       
            if(mfield=='kode_jabatan' || mfield=='nama_jabatan'){       
                col={
                    text: Ext.String.capitalize(mfield),
                    width: mfield=='kode_jabatan'?100:200,
                    dataIndex: mfield,
                    align:'left'                
                }
            }else{
                col={
                    text: Ext.String.capitalize(mfield),
                    width: 150,
                    dataIndex: mfield,
                    xtype:'numbercolumn',
                    format:'0,0',
                    align:'right'   ,
//                    field: {
//                            xtype: 'textfield'
//                        }
                    field:{
                        xtype: 'numberfield',
                        id: 'editjab_'+mfield.toString().toLowerCase(),
                        allowBlank: true,   
                        hideTrigger: true,
                        minValue: 0,                        
                        fieldStyle: 'text-align: right;'   
                    }
                }
            }
            
            colmap.push(col);
        }          
    });
    
    return colmap;
},//-----------------------------------------------------------------------
onClickAdd: function (btn) {
    var winjabatan=Ext.create({
        xtype:'inputJabatan'
    });
    winjabatan.setTitle('Input Jabatan');
    Ext.getCmp('idButtonSaveJabatan').setText('Simpan');
    Ext.getCmp('idButtonSaveJabatan').setIconCls('icons-add'); 
    Ext.getCmp('idpendapatanjabataninput').store.reload({
        params:{
            kode_jabatan:Ext.getCmp('idjabatankode').getValue()
            }
        });
                                            
winjabatan.show();
    },

    onConfirm: function (choice) {
        if (choice === 'yes') {
        //
        }
    },
    onGridRowClick:function( scope, record, item, index, e, eOpts ){
        //                                                                console.log(record.data.role_id);
        var v_kodejab=record.data.kode_jabatan;    
                                
        Ext.getCmp('idjabatanpendapatan').store.load({
            params:{
                kode_jabatan:v_kodejab
            }
        });                                
    }
    ,
    onSave:function(btn){
        var me = this, // Controller reference
        win = btn.up('window'), // Window reference
        form=Ext.getCmp('formjabataninput'),
        gridstore=Ext.getCmp('idpendapatanjabataninput').store,
        vkodejabatan=Ext.getCmp('idjabatankode').getValue();
        ;
        
        
        var opt='';
        if (form.isValid()) {
            if(btn.getText()=='Simpan'){
                opt='insert';
            }else{
                opt='update';
            }
            var data=new Array();   
            gridstore.each(function(node){
                if(node.data.pilih==true) {
                    data.push(node.data);
                }
            });
            form.submit({
                url: Penggajian.Global.getApiUrl() + 'jabatan/setInput',
                methods:'POST',
                params:{
                    opt:opt,
                    _token:tokendata,
                    post_data:Ext.JSON.encode(data)
                },
                // If login is successful               
                success:function(form,action) {
                    var res = Ext.decode(action.response.responseText);
                    console.log(res.message);
                    Ext.getCmp('jabatansearch').setValue(vkodejabatan);
                    Ext.getCmp('jabatansearch').onSearchClick();
                    Ext.getCmp('idjabatanpendapatan').store.reload({
                        params:{
                            kode_jabatan:vkodejabatan
                        }
                    });
                Ext.Msg.show({
                    title:'Message Info',
                    msg: res.message,
                    buttons: Ext.Msg.OK,
                    icon: Ext.Msg.INFO
                });
                            
                me.getView().destroy();
            },
            failure:function(form,action){
                var res = Ext.decode(action.response.responseText);                    
                Ext.Msg.show({
                    title:'Message Error',
                    msg: res.message,
                    buttons: Ext.Msg.OK,
                    icon: Ext.Msg.ERROR
                });
            }
            })
    }else{            
        Ext.Msg.show({
            title:'Message Error',
            msg: 'Data Input Not Valid !',
            buttons: Ext.Msg.OK,
            icon: Ext.Msg.ERROR
        });
    }
}
,
onEditClick:function(grid, rowIndex, colIndex) {   
    var rec = grid.getStore().getAt(rowIndex); 
    var winjabatan=Ext.create({
        xtype:'inputJabatan'
    });
    winjabatan.setTitle('Edit Jabatan');
    Ext.getCmp('idButtonSaveJabatan').setText('Update');
    Ext.getCmp('idButtonSaveJabatan').setIconCls('icon-edit-record');                                            

                                        
                                    
    Ext.getCmp('idjabatankode').setValue(rec.get('kode_jabatan'));
    Ext.getCmp('idjabatankode').setReadOnly(true);
    Ext.getCmp('idjabatankode').setFieldStyle('readonly-input');
    Ext.getCmp('idnamajabatan').setValue(rec.get('nama_jabatan'));                        
    Ext.getCmp('idpendapatanjabataninput').store.reload({
        params:{
            kode_jabatan:rec.get('kode_jabatan')
            }
        });
                        
                                            
winjabatan.show();
}
     
    
        
});
