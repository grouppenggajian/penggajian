Ext.define('Penggajian.view.rumus.lembur.RmsLemburController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.rmslembur',
    onRefreshClick:function(btn){
        
        var app = Penggajian.getApplication();
        
        Ext.getCmp('rmslembur_pembagi').setValue(0);        
        Ext.getCmp('rmslembur_pendapatan').store.reload();
        Ext.getCmp('rmslembur_pengali').store.load();
        app.getStore('storerumuslemburpembagi').load({scope: this,
            callback:function(records, operation, success){
                    if(success){
                        if(records.length>0){
                            Ext.getCmp('rmslembur_pembagi').setValue(records[0].get('nilai'));
                        }
                    }
            }});      
        app.getStore('storependapatancombo').load(); 
        
    },
    onShow:function(me,opts){
        var app = Penggajian.getApplication();
        
        Ext.getCmp('rmslembur_pembagi').setValue(0);
        Ext.getCmp('rmslembur_pendapatan').store.load();
        Ext.getCmp('rmslembur_pengali').store.load();
        app.getStore('storerumuslemburpembagi').load({scope: this,
            callback:function(records, operation, success){
                    if(success){
                        if(records.length>0){
                            Ext.getCmp('rmslembur_pembagi').setValue(records[0].get('nilai'));
                        }
                    }
            }}); 
        app.getStore('storependapatancombo').load();         
        
    },
    onSimpanClick:function(btn){
        var pembagi=Ext.getCmp('rmslembur_pembagi').getValue();
        if(!pembagi){
            pembagi=0;
        }
        var lemburpendapatan=new Array();
        var recpendapatan = Ext.getCmp('rmslembur_pendapatan').getStore();
        recpendapatan.each(function(node){
            lemburpendapatan.push(node.data);
        });
        
        var lemburpengali=new Array();
        var recpengali = Ext.getCmp('rmslembur_pengali').getStore();
        recpengali.each(function(node){
            lemburpengali.push(node.data);
        });
        execute_confirm('Are you sure to Save this ?', Penggajian.Global.getApiUrl()+'rumuslembur/save', {
            pembagi:pembagi,
            pendapatan:Ext.JSON.encode(lemburpendapatan),                                  
            pengali:Ext.JSON.encode(lemburpengali),
            _token:tokendata
        }, function(obj) {                                                            
            var retval=Ext.JSON.decode(obj.responseText);
            var me=Ext.getCmp('tab1g3').controller;
            me.onRefreshClick();
            set_message(0,retval.message);
        } );
    },
    onDeletePendapatanLembur:function(grid, rowIndex, colIndex) {
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
                                        url: Penggajian.Global.getApiUrl() + 'rumuslembur/deletePendapatan',
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
                                                Ext.getCmp('rmslembur_pendapatan').store.reload();
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
                                        url: Penggajian.Global.getApiUrl() + 'rumuslembur/deletePengali',
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
                                                Ext.getCmp('rmslembur_pengali').store.reload();
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