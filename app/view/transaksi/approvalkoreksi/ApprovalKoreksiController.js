Ext.define('Penggajian.view.transaksi.approvalkoreksi.ApprovalKoreksiController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.approvalkoreksi'
    ,
    onShow:function(){
        Ext.getCmp('tab2b3').getViewModel().getData().strapproval.load();
    }
    ,
    onApproveClick:function(grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex); 
        Ext.Msg.show({
            title: 'Confirm',
            msg: 'Are you sure to APPROVE selected row ?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            fn: function(btn){
                if (btn == 'yes') {                                                                
                    var data = Ext.JSON.encode(rec.data);
                    Ext.Ajax.request({                                                            
                        url: Penggajian.Global.getApiUrl() + 'koreksiabsensi/executeApproval',
                        method: 'POST',
                        params: {
                            opt: 'approve',
                            _token: tokendata,
                            postdata: data
                        },
                        success: function(obj) {
                            var   res = Ext.decode(obj.responseText);                            
                            set_message(0, res.message);
                            Ext.getCmp('tab2b3').getController().onShow();                              
                        },
                        failure: function(obj) {
//                            var obj=action.response;
                            try{
                                var  resp = Ext.decode(obj.responseText);                                        
                                Ext.getCmp('tab2b3').getController().onShow();   
                    
                                if (resp.reason == 'Session Expired' || resp.message == 'Session Expired') {
                                    session_expired('Session Expired');
                                } else{
                                    set_message(2, resp.message);                            
                                }
                                        
                            }catch(ex){
                                var msg=ex.message;
                                //                                        var divEl = Ext.DomHelper.createDom('<div>'+ex.msg+'</div>');
                                //                                        var vdiv=divEl.textContent;
                                var exmsg=null;
                                if (msg.indexOf('TokenMismatchException') > -1) {
                                    //console.log('TokenMismatchException');
                                    session_expired('Session Expired');
                                }else{
                                    Ext.Msg.show({
                                        title:'Message Error',
                                        msg: ex.message,                                            
                                        buttons: Ext.Msg.OK,
                                        icon: Ext.Msg.ERROR,
                                        maxWidth:'100%',
                                        listeners:{
                                            show:function(){
                                                Ext.Msg.doComponentLayout();
                                            }
                                        }
                                    });
                                }

                            }
                        }
                    });                 
                } 
            }
        });
    },
    onRejectClick:function(grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex); 
        Ext.Msg.show({
            title: 'Confirm',
            msg: 'Are you sure to REJECT selected row ?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            fn: function(btn){
                if (btn == 'yes') {                                                                
                    var data = Ext.JSON.encode(rec.data);
                    Ext.Ajax.request({                                                            
                        url: Penggajian.Global.getApiUrl() + 'koreksiabsensi/executeApproval',
                        method: 'POST',
                        params: {
                            opt: 'reject',
                            _token: tokendata,
                            postdata: data
                        },
                        success: function(obj) {
                            var   res = Ext.decode(obj.responseText);                            
                            set_message(0, res.message);
                            Ext.getCmp('tab2b3').getController().onShow();                              
                        },
                        failure: function(obj) {
//                            var obj=action.response;
                            try{
                                var  resp = Ext.decode(obj.responseText);                                        
                                Ext.getCmp('tab2b3').getController().onShow();   
                    
                                if (resp.reason == 'Session Expired' || resp.message == 'Session Expired') {
                                    session_expired('Session Expired');
                                } else{
                                    set_message(2, resp.message);                            
                                }
                                        
                            }catch(ex){
                                var msg=ex.message;
                                //                                        var divEl = Ext.DomHelper.createDom('<div>'+ex.msg+'</div>');
                                //                                        var vdiv=divEl.textContent;
                                var exmsg=null;
                                if (msg.indexOf('TokenMismatchException') > -1) {
                                    //console.log('TokenMismatchException');
                                    session_expired('Session Expired');
                                }else{
                                    Ext.Msg.show({
                                        title:'Message Error',
                                        msg: ex.message,                                            
                                        buttons: Ext.Msg.OK,
                                        icon: Ext.Msg.ERROR,
                                        maxWidth:'100%',
                                        listeners:{
                                            show:function(){
                                                Ext.Msg.doComponentLayout();
                                            }
                                        }
                                    });
                                }

                            }
                        }
                    });                 
                } 
            }
        });
    }
});
