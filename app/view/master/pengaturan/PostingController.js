Ext.define('Penggajian.view.master.pengaturan.PostingController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.posting',
    onRefreshPendapatan:function(btn){
        var app = Penggajian.getApplication();
        var mymodel=Ext.getCmp('tab1f4').getViewModel();
        Ext.getCmp('posting_pendapatan').store.reload();
        app.getStore('storependapatancombo').load(); 
        mymodel.getData().refpostingpendapatan.load();
    },
    onRefreshPotongan:function(btn){
        var mymodel=Ext.getCmp('tab1f4').getViewModel();
        var app = Penggajian.getApplication();
        Ext.getCmp('posting_potongan').store.load();
        app.getStore('storepotongan').load(); 
        mymodel.getData().refpostingpotongan.load();
    },
    onSavePendapatan:function(btn){
        var postdata=new Array();
        var vdata = Ext.getCmp('posting_pendapatan').getStore();
        vdata.each(function(node){
            postdata.push(node.data);
        });
        
        
        execute_confirm('Are you sure to Save this ?', Penggajian.Global.getApiUrl()+'posting/savependapatan', {
            postdata:Ext.JSON.encode(postdata),            
            _token:tokendata
        }, function(obj) {                                                            
            var retval=Ext.JSON.decode(obj.responseText);
            var me=Ext.getCmp('tab1f4').controller;
            me.onRefreshPendapatan();
            set_message(0,retval.message);
        } );
    },
    onSavePotongan:function(btn){
        var postdata=new Array();
        var vdata = Ext.getCmp('posting_potongan').getStore();
        vdata.each(function(node){
            postdata.push(node.data);
        });
        
        
        execute_confirm('Are you sure to Save this ?', Penggajian.Global.getApiUrl()+'posting/savepotongan', {
            postdata:Ext.JSON.encode(postdata),            
            _token:tokendata
        }, function(obj) {                                                            
            var retval=Ext.JSON.decode(obj.responseText);
            var me=Ext.getCmp('tab1f4').controller;
            me.onRefreshPendapatan();
            set_message(0,retval.message);
        } );
    },
    onDeletePostingPendapatan:function(grid, rowIndex, colIndex){
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
                                        url: Penggajian.Global.getApiUrl() + 'posting/deletependapatan',
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
                                                Ext.getCmp('posting_pendapatan').store.reload();
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
    onDeletePostingPotongan:function(grid, rowIndex, colIndex){
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
                                        url: Penggajian.Global.getApiUrl() + 'posting/deletepotongan',
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
                                                Ext.getCmp('posting_potongan').store.reload();
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


