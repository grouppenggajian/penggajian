/**
 * This class is the controller for the main view for the application. It is specified as
 * the "controller" of the Main view class.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('Penggajian.view.master.periode.PeriodeController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.periode',
    
    onClickAdd: function (btn) {
        var winperiode=Ext.create({
            xtype:'inputPeriode'
        });
        winperiode.setTitle('Input Periode');
        Ext.getCmp('idButtonPeriodeSave').setText('Simpan');
        Ext.getCmp('idButtonPeriodeSave').setIconCls('icons-add');                                            
                                            
        winperiode.show();
    },

    onConfirm: function (choice) {
        if (choice === 'yes') {
        //
        }
    },
    onSave:function(btn){
        var me = this, // Controller reference
        win = btn.up('window'), // Window reference
        form=Ext.getCmp('formperiodeinput');
        //form = me.lookupReference('form'),
        opt='';
            
        if (form.isValid()) {
            if(btn.getText()=='Simpan'){
                opt='insert';
            }else{
                opt='update';
            }
            form.submit({
                url: Penggajian.Global.getApiUrl() + 'periode/executeRow',
                methods:'POST',
                params:{
                    opt:opt,
                    _token:tokendata
                },
                // If login is successful               
                success:function(form,action) {
                    var res = Ext.decode(action.response.responseText);
                    console.log(res.message);
                    Ext.getCmp('idperiodelist').store.reload();
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
                        var winperiode=Ext.create({
                            xtype:'inputPeriode'
                        });
                        winperiode.setTitle('Edit Periode');
                        Ext.getCmp('idButtonPeriodeSave').setText('Update');
                        Ext.getCmp('idButtonPeriodeSave').setIconCls('icon-edit-record');                                            

                                        
                                    
                        Ext.getCmp('periodeid').setValue(rec.get('id'));
                        Ext.getCmp('periodeid').setReadOnly(true);
                        Ext.getCmp('periodeid').setFieldStyle('readonly-input');
                        Ext.getCmp('periodetglawal').setValue(rec.get('tglawal'));
                        Ext.getCmp('periodetglakhir').setValue(rec.get('tglakhir'));
                        Ext.getCmp('periodethnbln').setValue(rec.get('thnbln'));
                        Ext.getCmp('periodeaktif').setValue(rec.get('aktif'));
                        
                        //                                    readLog(rec.get('aktif'));
                                            
                        winperiode.show();
                    }
     
    
        
});
