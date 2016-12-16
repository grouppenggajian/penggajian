/**
 * This class is the controller for the main view for the application. It is specified as
 * the "controller" of the Main view class.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('Penggajian.view.master.shift.ShiftController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.shift',
    
    onClickAdd: function (btn) {
       
        var winshift=Ext.create({
            xtype:'inputShift'
        });
        winshift.setTitle('Input Shift');
        Ext.getCmp('idButtonShiftSave').setText('Simpan');
        Ext.getCmp('idButtonShiftSave').setIconCls('icons-add');                                            
                                            
        winshift.show();
    },

    onConfirm: function (choice) {
        if (choice === 'yes') {
        //
        }
    },
    onSave:function(btn){
        var me = this, // Controller reference
        win = btn.up('window'), // Window reference
        form=Ext.getCmp('formshiftinput');
        //form = me.lookupReference('form'),
        opt='';
            
        if (form.isValid()) {
            if(btn.getText()=='Simpan'){
                opt='insert';
            }else{
                opt='update';
            }
            form.submit({
                url: Penggajian.Global.getApiUrl() + 'shift/executeRow',
                methods:'POST',
                params:{
                    opt:opt,
                    _token:tokendata
                },
                // If login is successful               
                success:function(form,action) {
                    var res = Ext.decode(action.response.responseText);
                    console.log(res.message);
                    Ext.getCmp('idshiftlist').store.reload();
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
                        var winshift=Ext.create({
                            xtype:'inputShift'
                        });
                        winshift.setTitle('Edit Shift');
                        Ext.getCmp('idButtonShiftSave').setText('Update');
                        Ext.getCmp('idButtonShiftSave').setIconCls('icon-edit-record');                                            

                                        
                                    
                        Ext.getCmp('inputshiftkode').setValue(rec.get('kode'));
                        Ext.getCmp('inputshiftkode').setReadOnly(true);
                        Ext.getCmp('inputshiftkode').setFieldStyle('readonly-input');
                        Ext.getCmp('shiftketerangan').setValue(rec.get('keterangan'));
                        Ext.getCmp('jam_kerja_1_input').setValue(rec.get('jam_kerja_1'));
                        Ext.getCmp('jam_kerja_2_input').setValue(rec.get('jam_kerja_2'));
                        Ext.getCmp('jam_kerja_3_input').setValue(rec.get('jam_kerja_3'));
                        Ext.getCmp('jam_kerja_4_input').setValue(rec.get('jam_kerja_4'));
                        

                        //                                    readLog(rec.get('aktif'));
                                            
                        winshift.show();
                    }
     
    
        
});
