Ext.define('Penggajian.view.rumus.keterlambatan.RmsKeterlambatanController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.rmsketerlambatan',
    onRefreshClick:function(btn){
        
        var app = Penggajian.getApplication();
        var mymodel=Ext.getCmp('tab1g6').getViewModel();
//        Ext.getCmp('rmsketerlambatan_pembagi').setValue(0);        
        Ext.getCmp('rmsketerlambatan_pendapatan').store.reload();
        Ext.getCmp('rmsketerlambatan_pengali').store.load();
        var postpot=null;
//        mymodel.getData().storepostpotongan.load({scope: this,
//            callback:function(records, operation, success){
//                    if(success){
//                        if(records.length>0){
//                            postpot=records[0].get('kode');
//                            mymodel.getData().storepotongan.load({scope: this,
//                                callback:function(rec, oper, succ){
//                                        if(succ){
//                                            if(rec.length>0){
//                                                Ext.getCmp('rmsketerlambatan_postpotongan').setValue(postpot);       
//
//                                            }
//                                        }
//                                }}); 
//                        }
//                    }
//            }});      
        app.getStore('storependapatancombo').load(); 
        mymodel.getData().strjenisharikerja.load();
        
    },
    onShow:function(me,opts){
        Ext.getCmp('tab1g6').getController().onRefreshClick();     
        
    },
    onSimpanClick:function(btn){
//        var postpot=Ext.getCmp('rmsketerlambatan_postpotongan').getValue();
       
        var keterlambatanpendapatan=new Array();
        var recpendapatan = Ext.getCmp('rmsketerlambatan_pendapatan').getStore();
        recpendapatan.each(function(node){
            keterlambatanpendapatan.push(node.data);
        });
        
        var keterlambatanpengali=new Array();
        var recpengali = Ext.getCmp('rmsketerlambatan_pengali').getStore();
        recpengali.each(function(node){
            keterlambatanpengali.push(node.data);
        });
        execute_confirm('Are you sure to Save this ?', Penggajian.Global.getApiUrl()+'rumusketerlambatan/save', {
//            postpotongan:postpot,
            pendapatan:Ext.JSON.encode(keterlambatanpendapatan),                                  
            pengali:Ext.JSON.encode(keterlambatanpengali),
            _token:tokendata
        }, function(obj) {                                                            
            var retval=Ext.JSON.decode(obj.responseText);
            var me=Ext.getCmp('tab1g6').controller;
            me.onRefreshClick();
            set_message(0,retval.message);
        } );
    },
    onDeletePendapatanKeterlambatan:function(grid, rowIndex, colIndex) {
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
                                        url: Penggajian.Global.getApiUrl() + 'rumusketerlambatan/deletePendapatan',
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
                                                Ext.getCmp('rmsketerlambatan_pendapatan').store.reload();
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
                    },
onDeletePengali:function(grid, rowIndex, colIndex) {
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
                                        url: Penggajian.Global.getApiUrl() + 'rumusketerlambatan/deletePengali',
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
                                                Ext.getCmp('rmsketerlambatan_pengali').store.reload();
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
})