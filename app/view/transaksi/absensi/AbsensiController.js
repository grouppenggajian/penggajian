Ext.define('Penggajian.view.transaksi.absensi.AbsensiController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.absensi',
    onShow:function(me,opts){
        var refstoreabsensi=Ext.getCmp('idabsensilist').store;   
            ////                        console.log(refjkstoregrid);
            refstoreabsensi.loadPage(1);
    },
    onDownloadFinger:function(btn){
        Ext.Ajax.request({
            method:'POST',
            url: Penggajian.Global.getApiUrl()+'absensi/getlogmesin',
            params:{
              _token:tokendata 
            },
            success: function(response, opts) {
                var   resp = Ext.decode(obj.responseText);                                                                
                if(resp.success==true){
                    Ext.Msg.show({
                        title:'Message Info',
                        msg: resp.message,
                        buttons: Ext.Msg.OK,
                        icon: Ext.Msg.INFO
                    });
                    Ext.getCmp('idabsensilist').store.reload();
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
                    Ext.getCmp('idabsensilist').store.reload();
                }
            },

            failure: function(response, opts) {
                var  resp = Ext.decode(obj.responseText);
                Ext.Msg.alert('info',resp.reason);
            }
        });
    },
    onClearFinger:function(btn){
        Ext.Ajax.request({
            method:'POST',
            url: Penggajian.Global.getApiUrl()+'absensi/clearlogmesin',
            params:{
              _token:tokendata 
            },
            success: function(response, opts) {
                var   resp = Ext.decode(obj.responseText);                                                                
                if(resp.success==true){
                    Ext.Msg.show({
                        title:'Message Info',
                        msg: resp.message,
                        buttons: Ext.Msg.OK,
                        icon: Ext.Msg.INFO
                    });
//                    Ext.getCmp('idabsensilist').store.reload();
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
//                    Ext.getCmp('idabsensilist').store.reload();
                }
            },

            failure: function(response, opts) {
                var  resp = Ext.decode(obj.responseText);
                Ext.Msg.alert('info',resp.reason);
            }
        });
    }
});