Ext.define('Penggajian.view.transaksi.hitunglembur.HitungLemburController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.hitunglembur',
    onShow:function(me,opts){
        
        var refstoreterlambat=Ext.getCmp('idhitunglemburlist').store; 
        var app = Penggajian.getApplication();
        app.getStore('storeperiode').load({
            scope: this,
            callback:function(records, operation, success){
                if(success){
                    if(records.length>0){
                        Ext.getCmp('hitunglembur_start').setValue(records[0].get('tglawal'));
                        Ext.getCmp('hitunglembur_finish').setValue(records[0].get('tglakhir'));
                            
                            
                        refstoreterlambat.getProxy().setExtraParam('awal',records[0].get('tglawal'));
                        refstoreterlambat.getProxy().setExtraParam('akhir',records[0].get('tglakhir'));                                
                        refstoreterlambat.load({
                            params:{
                                searchvalue:Ext.getCmp('hitunglembursearch').getValue()
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
        var awal=Ext.getCmp('hitunglembur_start').getValue();
        var akhir=Ext.getCmp('hitunglembur_finish').getValue();
        var refstoreterlambat=Ext.getCmp('idhitunglemburlist').store; 
        refstoreterlambat.getProxy().setExtraParam('awal',awal);
        refstoreterlambat.getProxy().setExtraParam('akhir',akhir);                                
        refstoreterlambat.load({
            params:{
                searchvalue:Ext.getCmp('hitunglembursearch').getValue()
            }
        });
//        Ext.getCmp('idhitunglemburlist').store.load({params:{awal:awal,akhir:akhir}});
    },
    onHitLembur:function(btn){
        var winhit=Ext.create({
            xtype:'hitunglemburinput'
        });
                                            
        winhit.show();
    },
    onProcess:function(btn){
        var formfield=btn.up('form').getForm();
        var vthbl=Ext.Date.format(Ext.getCmp('hl_thbl').getValue(),'Ym');
        if (formfield.isValid()) {
            formfield.submit({
                url: Penggajian.Global.getApiUrl() + 'hitunglembur/executeRow',
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
                    Ext.getCmp('hitunglembur_start').setValue(tglawal);
                    Ext.getCmp('hitunglembur_finish').setValue(tglakhir);
                    set_message(0, res.message); 
                    Ext.getCmp('idhitunglemburlist').store.load({params:{awal:tglawal,akhir:tglakhir}});
                    Ext.getCmp('hitunglembur_input').close();
                },
                failure:function(form,action){
                    var obj=action.response;
                     try{
                                        var  resp = Ext.decode(obj.responseText);
                                        var tglawal=resp.tglawal;
                                        var tglakhir=resp.tglakhir;
                                        Ext.getCmp('hitunglembur_start').setValue(tglawal);
                                        Ext.getCmp('hitunglembur_finish').setValue(tglakhir);                    
                                        Ext.getCmp('idhitunglemburlist').store.load({params:{awal:tglawal,akhir:tglakhir}});
                    
                                        if (resp.reason == 'Session Expired' || resp.message == 'Session Expired') {
                                            session_expired('Session Expired');
                                        }  else{
                                            set_message(2, resp.message);
                                            Ext.getCmp('hitunglembur_input').close();
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
