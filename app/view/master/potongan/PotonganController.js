/**
 * This class is the controller for the main view for the application. It is specified as
 * the "controller" of the Main view class.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('Penggajian.view.master.potongan.PotonganController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.potongan',
    
    onClickAdd: function (btn) {
        var winpotongan=Ext.create({
            xtype:'inputPotongan'
        });
        winpotongan.setTitle('Input Potongan');
        Ext.getCmp('idButtonPotonganSave').setText('Simpan');
        Ext.getCmp('idButtonPotonganSave').setIconCls('icons-add');                                            
                                            
        winpotongan.show();
    },

    onConfirm: function (choice) {
        if (choice === 'yes') {
        //
        }
    },
    onSave:function(btn){
        var me = this, // Controller reference
        win = btn.up('window'), // Window reference
        form=Ext.getCmp('formpotonganinput');
        //form = me.lookupReference('form'),
        opt='';
            
        if (form.isValid()) {
            if(btn.getText()=='Simpan'){
                opt='insert';
            }else{
                opt='update';
            }
            form.submit({
                url: Penggajian.Global.getApiUrl() + 'potongan/executeRow',
                methods:'POST',
                params:{
                    opt:opt,
                    _token:tokendata
                },
                // If login is successful               
                success:function(form,action) {
                    var res = Ext.decode(action.response.responseText);
                    console.log(res.message);
                    Ext.getCmp('idpotonganlist').store.reload();
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
                        var winpotongan=Ext.create({
                            xtype:'inputPotongan'
                        });
                        winpotongan.setTitle('Edit Potongan');
                        Ext.getCmp('idButtonPotonganSave').setText('Update');
                        Ext.getCmp('idButtonPotonganSave').setIconCls('icon-edit-record');                                            

                                        
                                    
                        Ext.getCmp('potongankode').setValue(rec.get('kode'));
                        Ext.getCmp('potongankode').setReadOnly(true);
                        Ext.getCmp('potongankode').setFieldStyle('readonly-input');
                        Ext.getCmp('potonganketerangan').setValue(rec.get('keterangan'));
                        
                        //                                    readLog(rec.get('aktif'));
                                            
                        winpotongan.show();
                    }
     
    
        
});
