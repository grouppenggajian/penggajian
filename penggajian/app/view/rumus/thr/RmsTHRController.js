Ext.define('Penggajian.view.rumus.thr.RmsTHRController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.rmsthr',
    onShow:function(me,opts){
        Ext.getCmp('rmsthr_pendapatan').store.load();
        Ext.getCmp('rmsthr_masakerja').store.load();
    },
    onRefreshClick:function(btn){
        Ext.getCmp('rmsthr_pendapatan').store.load();
        Ext.getCmp('rmsthr_masakerja').store.load();
    },
    onSimpanClick:function(btn){
        
        
        var thrpendapatan=new Array();
        var recpendapatan = Ext.getCmp('rmsthr_pendapatan').getStore();
        recpendapatan.each(function(node){
            thrpendapatan.push(node.data);
        });
        
        var thrmasakerja=new Array();
        var recmasakerja = Ext.getCmp('rmsthr_masakerja').getStore();
        recmasakerja.each(function(node){
            thrmasakerja.push(node.data);
        });
        execute_confirm('Are you sure to Save this ?', Penggajian.Global.getApiUrl()+'rumusthr/save', {
            
            masakerja:Ext.JSON.encode(thrmasakerja),                                  
            pendapatan:Ext.JSON.encode(thrpendapatan),
            _token:tokendata
        }, function(obj) {                                                            
            var retval=Ext.JSON.decode(obj.responseText);
            var me=Ext.getCmp('tab1g5').controller;
            me.onRefreshClick();
            set_message(0,retval.message);
        } );
    },
    
    onDeletePendapatanThr:function(grid, rowIndex, colIndex) {
                        var rec = grid.getStore().getAt(rowIndex);
                        Ext.Msg.show({
                            title: 'Confirm',
                            msg: 'Are you sure delete selected row ?',
                            buttons: Ext.Msg.YESNO,
                            icon: Ext.Msg.QUESTION,
                            fn: function(btn){
                                if (btn == 'yes') {                                                                
                                    var data = rec.data;                                                                 
                                    Ext.Ajax.request({                                                            
                                        url: Penggajian.Global.getApiUrl() + 'rumusthr/deletePendapatan',
                                        method: 'POST',
                                        params: {
                                            opt: 'delete',
                                            _token: tokendata,                                            
                                            postdata:Ext.JSON.encode(data)
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
                                                Ext.getCmp('rmsthr_pendapatan').store.reload();
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
    
  ,onDeleteMasakerja:function(grid, rowIndex, colIndex) {
                        var rec = grid.getStore().getAt(rowIndex);
                        Ext.Msg.show({
                            title: 'Confirm',
                            msg: 'Are you sure delete selected row ?',
                            buttons: Ext.Msg.YESNO,
                            icon: Ext.Msg.QUESTION,
                            fn: function(btn){
                                if (btn == 'yes') {                                                                
                                    var data = rec.data;                                                                 
                                    Ext.Ajax.request({                                                            
                                        url: Penggajian.Global.getApiUrl() + 'rumusthr/deleteMasaKerja',
                                        method: 'POST',
                                        params: {
                                            opt: 'delete',
                                            _token: tokendata,                                            
                                            postdata:Ext.JSON.encode(data)
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
                                                Ext.getCmp('rmsthr_masakerja').store.reload();
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
});


