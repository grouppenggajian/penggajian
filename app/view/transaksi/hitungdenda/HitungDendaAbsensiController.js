Ext.define('Penggajian.view.transaksi.hitungdenda.HitungDendaAbsensiController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.hitungdenda',
    onShow:function(me,opts){
        
        var refstore=Ext.getCmp('idhitungdendalist').store; 
        var app = Penggajian.getApplication();
        app.getStore('storeperiode').load({
            scope: this,
            callback:function(records, operation, success){
                if(success){
                    if(records.length>0){
                        Ext.getCmp('hitungdenda_start').setValue(records[0].get('tglawal'));
                        Ext.getCmp('hitungdenda_finish').setValue(records[0].get('tglakhir'));
                            
                            
                        refstore.getProxy().setExtraParam('awal',records[0].get('tglawal'));
                        refstore.getProxy().setExtraParam('akhir',records[0].get('tglakhir'));                                
                        refstore.load({
                            params:{
                                searchvalue:Ext.getCmp('hitungdendasearch').getValue()
                            }
                        });
                            
                    }
                }
            }
        });
            ////                        console.log(refjkstoregrid);
//            refstoreterlambat.loadPage(1);
    },
    onSearchTanggal:function(){
        var awal=Ext.getCmp('hitungdenda_start').getValue();
        var akhir=Ext.getCmp('hitungdenda_finish').getValue();
        var refstore=Ext.getCmp('idhitungdendalist').store; 
        refstore.getProxy().setExtraParam('awal',awal);
        refstore.getProxy().setExtraParam('akhir',akhir);                                
        refstore.load({
            params:{
                searchvalue:Ext.getCmp('hitungdendasearch').getValue()
            }
        });
//        Ext.getCmp('idhitungdendalist').store.load({params:{awal:awal,akhir:akhir}});
    },
    onHitDenda:function(btn){
        var winhit=Ext.create({
            xtype:'hitungdendainput'
        });
                                            
        winhit.show();
    },
    onProcess:function(btn){
        var formfield=btn.up('form').getForm();
        var vthbl=Ext.Date.format(Ext.getCmp('hd_thbl').getValue(),'Ym');
        if (formfield.isValid()) {
            formfield.submit({
                url: Penggajian.Global.getApiUrl() + 'hitdenda/executeRow',
                methods:'POST',
                params:{                                     
                    _token:tokendata,
                    thbl:vthbl
                },
                // If login is successful               
                success:function(form,action) {
                    var res = Ext.decode(action.response.responseText);
                    var tglawal=res.tglawal;
                    var tglakhir=res.tglakhir;
                    Ext.getCmp('hitungdenda_start').setValue(tglawal);
                    Ext.getCmp('hitungdenda_finish').setValue(tglakhir);
                    set_message(0, res.message); 
                    Ext.getCmp('idhitungdendalist').store.load({params:{awal:tglawal,akhir:tglakhir}});
                    Ext.getCmp('hitungdenda_input').close();
                },
                failure:function(form,action){
                    var obj=action.response;
                     try{
                                        var  resp = Ext.decode(obj.responseText);
                                        var tglawal=resp.tglawal;
                                        var tglakhir=resp.tglakhir;
                                        Ext.getCmp('hitungdenda_start').setValue(tglawal);
                                        Ext.getCmp('hitungdenda_finish').setValue(tglakhir);                    
                                        Ext.getCmp('idhitungdendalist').store.load({params:{awal:tglawal,akhir:tglakhir}});
                    
                                        if (resp.reason == 'Session Expired' || resp.message == 'Session Expired') {
                                            session_expired('Session Expired');
                                        }  else{
                                            set_message(2, resp.message);
                                            Ext.getCmp('hitungdenda_input').close();
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
        }else{  
            set_message(1, 'Data Input Not Valid !');            
        }
    }
    
});
