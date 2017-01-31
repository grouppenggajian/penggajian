Ext.define('Penggajian.view.transaksi.hitunginsentifhadir.HitungInsentifHadirController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.hitunginsentifhadir',
    renderPercent: function (value) {
        //        var mvalue=value?value*100:0;
        return value + ' %';
    },
    onShow:function(){
        
        var refstore=Ext.getCmp('idhitunginsentifhadirlist').store; 
        var app = Penggajian.getApplication();
        app.getStore('storeperiode').load({
            scope: this,
            callback:function(records, operation, success){
                if(success){
                    if(records.length>0){
                        var thbl = records[0].get('thbl'); 
                        thbl=thbl.substring(0, 4)+'-'+thbl.substring(4, 6)+'-'+'01';                                                   
                        Ext.getCmp('hitunginsentifhadir_thbl').setValue(thbl);
                           
                            
                        //refstore.getProxy().setExtraParam('thbl',records[0].get('thbl'));                        
                        refstore.load({
                            params:{
                                searchvalue:Ext.getCmp('hitunginsentifhadirsearch').getValue()
                            }
                        });
                            
                    }
                }
            }
        });
    },
    
    onSearchPeriode:function(){
        var thbl=Ext.Date.format(Ext.getCmp('hitunginsentifhadir_thbl').getValue(),'Ym');        
        var refstore=Ext.getCmp('idhitunginsentifhadirlist').store;                                       
        refstore.load({
            params:{
                thbl:thbl,
                searchvalue:Ext.getCmp('hitunginsentifhadirsearch').getValue()
            }
        });
    },
    onHitInsentifHadir:function(btn){
        var winhit=Ext.create({
            xtype:'hitunginsentifhadirinput'
        });
                                            
        winhit.show();
    },
    onProcess:function(btn){
        var formfield=btn.up('form').getForm();
        var vthbl=Ext.Date.format(Ext.getCmp('hih_thbl').getValue(),'Ym');
        if (formfield.isValid()) {
            formfield.submit({
                url: Penggajian.Global.getApiUrl() + 'hitinsentifhadir/executeRow',
                methods:'POST',
                params:{                                     
                    _token:tokendata,
                    thbl:vthbl
                },
                // If login is successful               
                success:function(form,action) {
                    var res = Ext.decode(action.response.responseText);
                    var thbl=res.thbl;
                    
                        thbl=thbl.substring(0, 4)+'-'+thbl.substring(4, 6)+'-'+'01';     
                    Ext.getCmp('hitunginsentifhadir_thbl').setValue(thbl);
                    
                    set_message(0, res.message); 
                    Ext.getCmp('hitunginsentifhadirsearch').onClearClick();
                    Ext.getCmp('idhitunginsentifhadirlist').store.load({params:{thbl:thbl}});
                    Ext.getCmp('hitunginsentifhadir_input').close();
                },
                failure:function(form,action){
                    var obj=action.response;
                     try{
                                        var  resp = Ext.decode(obj.responseText);
                                        var thbl=resp.thbl;
                                        thbl=thbl.substring(0, 4)+'-'+thbl.substring(4, 6)+'-'+'01';   
                                        Ext.getCmp('hitunginsentifhadir_thbl').setValue(thbl);                    
                                        Ext.getCmp('idhitunginsentifhadirlist').store.load({params:{thbl:thbl}});
                    
                                        if (resp.reason == 'Session Expired' || resp.message == 'Session Expired') {
                                            session_expired('Session Expired');
                                        }  else{
                                            set_message(2, resp.message);
                                            Ext.getCmp('hitunginsentifhadir_input').close();
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
