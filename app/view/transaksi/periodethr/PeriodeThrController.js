Ext.define('Penggajian.view.transaksi.periodethr.PeriodeThrController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.periodethr',
    onShow:function(){
        var mymodel=Ext.getCmp('tab2h1').getViewModel();
        mymodel.getData().strperiodethr.load();
    },
    onClickAdd:function(btn){
        var winperiodethr=Ext.create({
            xtype:'inputPeriodeThr'
        });
        Ext.getCmp('idButtonPeriodeThrSave').setText('Simpan');
        Ext.getCmp('idButtonPeriodeThrSave').setIconCls('icon-simpan');
        winperiodethr.show();
    },
    onSave:function(btn){
        var formfield=btn.up('form').getForm();
        //        console.log(frm.getId());
        var opt='';
        if (formfield.isValid()) {
            if(Ext.getCmp('idButtonPeriodeThrSave').getText()=='Simpan'){
                opt='insert';
            }else{
                opt='update';
            }
            var vtgl=Ext.getCmp('periodethrtglthr').getValue().toMysql();
            var vthbl=Ext.getCmp('periodethrthbl').getValue();
            formfield.submit({
                url: Penggajian.Global.getApiUrl() + 'periodethr/executeRow',
                methods:'POST',
                params:{
                    opt:opt,
                    vtgl:vtgl,
                    vthbl:vthbl,
                    _token:tokendata
                },
                // If login is successful               
                success:function(form,action) {
                    var res = Ext.decode(action.response.responseText);
                    set_message(0, res.message);                    
                    Ext.getCmp('tab2h1').getController().onShow();
                    Ext.getCmp('input_periodethr').close();
                },
                failure:function(form,action){
                    var obj=action.response;
                    try{
                        var  resp = Ext.decode(obj.responseText);                                        
                        Ext.getCmp('tab2h1').getController().onShow();
                    
                        if (resp.reason == 'Session Expired' || resp.message == 'Session Expired') {
                            session_expired('Session Expired');
                        } else{
                            set_message(2, resp.message);
                            Ext.getCmp('input_periodethr').close();
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
    },
    onEditClick:function(grid, rowIndex, colIndex){
        var rec = grid.getStore().getAt(rowIndex);
        var winperiodethr=Ext.create({
            xtype:'inputPeriodeThr'
        });
        Ext.getCmp('idButtonPeriodeThrSave').setText('Update');
        Ext.getCmp('idButtonPeriodeThrSave').setIconCls('icon-edit-record');
        
        Ext.getCmp('periodethrthbl').setValue(rec.get('thbl'));
        Ext.getCmp('periodethrtglthr').setValue(rec.get('tglthr'));
        Ext.getCmp('periodethraktif').setValue(rec.get('aktif'));
        winperiodethr.show();
    }
    
    
});
