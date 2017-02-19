Ext.define('Penggajian.view.transaksi.approvalgaji.ApprovalGajiController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.approvalgaji'
    ,onShow:function(btn){
        var mymodel=Ext.getCmp('tab2g5').getViewModel();
        var refstore=mymodel.getData().strapprovalgaji;                
        refstore.load({
        callback:function(records, operation, success){
            if(success){
                    if(records.length>0){
                        if(records[0].get('totalpendapatan')==0){
                            refstore.removeAll();
                        }
                        
                        
                    }
                }
        }
    }
    );
    }
    ,
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
                    var vthbl=rec.get('thbl');
                    Ext.Ajax.request({                                                            
                        url: Penggajian.Global.getApiUrl() + 'approvalgaji/executeRow',
                        method: 'POST',
                        params: {
                            
                            thbl: vthbl,
                            _token: tokendata
                            
                        },
                        success: function(obj) {
                            var   res = Ext.decode(obj.responseText);                            
                            set_message(0, res.message);
                            Ext.getCmp('tab2g5').getController().onShow();                              
                        },
                        failure: function(obj) {
//                            var obj=action.response;
                            try{
                                var  resp = Ext.decode(obj.responseText);                                        
                                Ext.getCmp('tab2g5').getController().onShow();   
                    
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
