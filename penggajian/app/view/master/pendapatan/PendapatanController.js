/**
 * This class is the controller for the main view for the application. It is specified as
 * the "controller" of the Main view class.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('Penggajian.view.master.pendapatan.PendapatanController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.pendapatan',
    
    onClickAdd: function (btn) {
        var winpendapatan=Ext.create({
            xtype:'inputPendapatan'
        });
        winpendapatan.setTitle('Input Pendapatan');
        Ext.getCmp('idButtonSave').setText('Simpan');
        Ext.getCmp('idButtonSave').setIconCls('icons-add');                                            
                                            
        winpendapatan.show();
    },

    onConfirm: function (choice) {
        if (choice === 'yes') {
        //
        }
    },
    onSave:function(btn){
        var me = this, // Controller reference
        win = btn.up('window'), // Window reference
        form=Ext.getCmp('formpendapataninput');
        //form = me.lookupReference('form'),
        opt='';
            
        if (form.isValid()) {
            if(btn.getText()=='Simpan'){
                opt='insert';
            }else{
                opt='update';
            }
            var parshowjabatan=Ext.getCmp('pendapatanshowjabatan').getValue();
            form.submit({
                url: Penggajian.Global.getApiUrl() + 'pendapatan/executeRow',
                methods:'POST',
                params:{
                    opt:opt,
                    parshowjabatan:parshowjabatan,
                    _token:tokendata
                },
                // If login is successful               
                success:function(form,action) {
                    var res = Ext.decode(action.response.responseText);
                    console.log(res.message);
                    Ext.getCmp('idpendapatanlist').store.reload();
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
    },
    onEditClick:function(grid, rowIndex, colIndex) {   
                        var rec = grid.getStore().getAt(rowIndex); 
                        var winpendapatan=Ext.create({
                            xtype:'inputPendapatan'
                        });
                        winpendapatan.setTitle('Edit Pendapatan');
                        Ext.getCmp('idButtonSave').setText('Update');
                        Ext.getCmp('idButtonSave').setIconCls('icon-edit-record');                                            

                                        
                                    
                        Ext.getCmp('pendapatankode').setValue(rec.get('kode'));
                        Ext.getCmp('pendapatankode').setReadOnly(true);
                        Ext.getCmp('pendapatankode').setFieldStyle('readonly-input');
                        Ext.getCmp('pendapatanketerangan').setValue(rec.get('keterangan'));
                        if(rec.get('posting')=='auto'){
                            Ext.getCmp('radiopendapatan1').setValue(true);
                        }else{
                            Ext.getCmp('radiopendapatan2').setValue(true);
                        }
                        Ext.getCmp('pendapatanshowjabatan').setValue(rec.get('showjabatan'));
                        //                                    readLog(rec.get('aktif'));
                                            
                        winpendapatan.show();
                    }
     
    
        
});
