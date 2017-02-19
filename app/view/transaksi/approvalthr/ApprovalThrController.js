Ext.define('Penggajian.view.transaksi.approvalthr.ApprovalThrController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.approvalthr'
    ,onShow:function(btn){
        var mymodel=Ext.getCmp('tab2h4').getViewModel();
        var refstore=mymodel.getData().strapprovalthr;                
        refstore.load();
    },
    onApproveClick:function(grid, rowIndex, colIndex){
        var rec = grid.getStore().getAt(rowIndex); 
        Ext.Msg.show({
            title: 'Confirm',
            msg: 'Are you sure to APPROVE selected row ?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            fn: function(btn){
                if (btn == 'yes') {                                                                
                    var data = rec.data;
                    var vtglthr=rec.get('tglthr');
                    var vthbl=rec.get('tahun');
                    Ext.Ajax.request({                                                            
                        url: Penggajian.Global.getApiUrl() + 'approvalthr/executeRow',
                        method: 'POST',
                        params: {
                            vtglthr: vtglthr,
                            vtahun: vthbl,
                            _token: tokendata
                            
                        },
                        success: function(obj) {
                            var   res = Ext.decode(obj.responseText);                            
                            set_message(0, res.message);
                            Ext.getCmp('tab2h4').getController().onShow();                              
                        },
                        failure: function(obj) {
//                            var obj=action.response;
                            try{
                                var  resp = Ext.decode(obj.responseText);                                        
                                Ext.getCmp('tab2h4').getController().onShow();   
                    
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
