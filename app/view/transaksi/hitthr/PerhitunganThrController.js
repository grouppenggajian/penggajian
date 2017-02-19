Ext.define('Penggajian.view.transaksi.hitthr.PerhitunganThrController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.hitthr'
    ,onShow:function(){
        var mymodel=Ext.getCmp('tab2h3').getViewModel();
        mymodel.getData().strhitperiodethrload.load({params:{aktif:'on'},
        scope: this,
            callback:function(records, operation, success){
                if(success){
                    if(records.length>0){
                        Ext.getCmp('hitthrtahun').setValue(records[0].get('thbl'));
                        Ext.getCmp('hitthrtglthr').setValue(records[0].get('tglthr'));
                    }
                }
            }
        });
        
    },
    onSelectTahun:function( nfield , eOpts ){
        var mymodel=Ext.getCmp('tab2h3').getViewModel();
        var vthbl=nfield.getValue();
        Ext.getCmp('hitthrtglthr').setValue(null);
//        console.log(nfield.getValue());
        mymodel.getData().strhitperiodethrload.load({params:{thbl:vthbl},
        scope: this,
            callback:function(records, operation, success){
                if(success){
                    if(records.length>0){
                        Ext.getCmp('hitthrtglthr').setValue(records[0].get('tglthr'));
                    }
                }
            }
        }
    );
    },
    onSelectHitThrTahun:function( nfield , eOpts ){
        var mymodel=Ext.getCmp('tab2h3').getViewModel();
        var vthbl=nfield.getValue();
        Ext.getCmp('hitthr_tglthr').setValue(null);
//        console.log(nfield.getValue());
        mymodel.getData().strhitperiodethrload.load({params:{thbl:vthbl},
        scope: this,
            callback:function(records, operation, success){
                if(success){
                    if(records.length>0){
                        Ext.getCmp('hitthr_tglthr').setValue(records[0].get('tglthr'));
                    }
                }
            }
        }
    );
    },
    onClickSearchHitTHR:function(btn){
        var mymodel=Ext.getCmp('tab2h3').getViewModel();
        var refstore=mymodel.getData().strthr;
        var vthbl=Ext.getCmp('hitthrtahun').getValue();
        var vtglthr=Ext.getCmp('hitthrtglthr').getValue().toMysql();
        var vsearchvalue=Ext.getCmp('hitthrsearch').getValue();
        refstore.getProxy().setExtraParam('tahun',vthbl); 
        refstore.getProxy().setExtraParam('tglthr',vtglthr); 
        refstore.getProxy().setExtraParam('searchvalue',vsearchvalue); 
        refstore.load();
        
    },
    onHitungTHR:function(btn){
        
      var winhitthr=Ext.create({
            xtype:'inputhitthr'
        });
        
        var vthbl=Ext.getCmp('hitthrtahun').getValue();
        var vtglthr=Ext.getCmp('hitthrtglthr').getValue();
        Ext.getCmp('hitthr_tahun').setValue(vthbl);
        Ext.getCmp('hitthr_tglthr').setValue(vtglthr);
        winhitthr.show();
        
    }
    ,
    onProcess:function(btn){
        var formfield=btn.up('form').getForm();
        //        console.log(frm.getId());
        var opt='';
        if (formfield.isValid()) {            
            var vtgl=Ext.getCmp('hitthr_tglthr').getValue().toMysql();
            var vthbl=Ext.getCmp('hitthr_tahun').getValue();
            Ext.getCmp('hitthrtahun').setValue(vthbl);
        Ext.getCmp('hitthrtglthr').setValue(vtgl);
            formfield.submit({
                url: Penggajian.Global.getApiUrl() + 'hitungthr/executeRow',
                methods:'POST',
                params:{                    
                    vtglthr:vtgl,
                    vtahun:vthbl,
                    _token:tokendata
                },
                // If login is successful               
                success:function(form,action) {
                    var res = Ext.decode(action.response.responseText);
                    set_message(0, res.message);                    
                    Ext.getCmp('tab2h3').getController().onClickSearchHitTHR();
                    Ext.getCmp('input_hitthr').close();
                },
                failure:function(form,action){
                    var obj=action.response;
                    try{
                        var  resp = Ext.decode(obj.responseText);                                        
                        Ext.getCmp('tab2h3').getController().onClickSearchHitTHR();
                    
                        if (resp.reason == 'Session Expired' || resp.message == 'Session Expired') {
                            session_expired('Session Expired');
                        } else{
                            set_message(2, resp.message);
                            Ext.getCmp('input_hitthr').close();
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
                                    
                //                                                                Ext.Msg.alert('info',resp.reason);
                                
                    
                }
            });
        }else{  
            set_message(1, 'Data Input Not Valid !');            
        }
    }
});
