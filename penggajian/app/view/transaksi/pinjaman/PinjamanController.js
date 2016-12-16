/**
 * This class is the controller for the main view for the application. It is specified as
 * the "controller" of the Main view class.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('Penggajian.view.transaksi.pinjaman.PinjamanController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.pinjaman',
    
    onClickAdd: function (btn) {
        var winpinjaman=Ext.create({
            xtype:'inputPinjaman'
        });
        winpinjaman.setTitle('Input Pinjaman');
        Ext.getCmp('idButtonPinjamanSave').setText('Simpan');
        Ext.getCmp('idButtonPinjamanSave').setIconCls('icons-add');                                            
        
        Ext.Ajax.request({
            url: Penggajian.Global.getApiUrl()+'pinjaman/getnomor',
            method:'GET',
            waitMsg:'Load Data...',
            //                params:{},
            success: function(obj, opts) {
                var   resp = Ext.decode(obj.responseText);                 
                var data=resp.data
                 Ext.getCmp('pinjaman_no_pinjaman').setValue(data.idmaster);  
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
        Ext.getCmp('pinjaman_nama').store.load();
        Ext.getCmp('pinjaman_kode_jabatan').store.load();        
        winpinjaman.show();
    },

    onGridRowClick:function( scope, record, item, index, e, eOpts ){
        //                                                                console.log(record.data.role_id);
        var v_nopinjaman=record.data.no_pinjaman;    
        var angsuranstore=Ext.getCmp('idpinjamanangsuran').store;
        angsuranstore.getProxy().setExtraParam('searchvalue',v_nopinjaman);
        angsuranstore.load();
//        Ext.getCmp('idpinjamanangsuran').store.load({
//            params:{
//                kode_jabatan:v_kodejab
//            }
//        });                                
    },
    onSave:function(btn){
        var me = this, // Controller reference
        win = btn.up('window'), // Window reference
        form=Ext.getCmp('formpinjamaninput');
        //form = me.lookupReference('form'),
        opt='';
            
        if (form.isValid()) {
            if(btn.getText()=='Simpan'){
                opt='insert';
            }else{
                opt='update';
            }
            form.submit({
                url: Penggajian.Global.getApiUrl() + 'pinjaman/executeRow',
                methods:'POST',
                params:{
                    opt:opt,
                    _token:tokendata
                },
                // If login is successful               
                success:function(form,action) {
                    var res = Ext.decode(action.response.responseText);
                    console.log(res.message);
                    Ext.getCmp('idpinjamanlist').store.reload();
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
     
    
        
});
