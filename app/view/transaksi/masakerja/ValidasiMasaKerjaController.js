Ext.define('Penggajian.view.transaksi.masakerja.ValidasiMasaKerjaController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.validasimasakerja',
    onSelectTahun:function( nfield , eOpts ){
        var mymodel=Ext.getCmp('tab2h2').getViewModel();
        var vthbl=nfield.getValue();
        Ext.getCmp('validasimasakerjatglthr').setValue(null);
//        console.log(nfield.getValue());
        mymodel.getData().strperiodethrload.load({params:{thbl:vthbl},
        scope: this,
            callback:function(records, operation, success){
                if(success){
                    if(records.length>0){
                        Ext.getCmp('validasimasakerjatglthr').setValue(records[0].get('tglthr'));
                    }
                }
            }
        }
    );
    },
    onShow:function(){
        var mymodel=Ext.getCmp('tab2h2').getViewModel();
        mymodel.getData().strperiodethrload.load({params:{aktif:'on'},
        scope: this,
            callback:function(records, operation, success){
                if(success){
                    if(records.length>0){
                        Ext.getCmp('validasimasakerjatahun').setValue(records[0].get('thbl'));
                        Ext.getCmp('validasimasakerjatglthr').setValue(records[0].get('tglthr'));
                    }
                }
            }
        });
        
    },
    onSearchValidasiMasaKerja:function(btn){
        var mymodel=Ext.getCmp('tab2h2').getViewModel();
        var refstore=mymodel.getData().strvalidasimasakerja;
        var vthbl=Ext.getCmp('validasimasakerjatahun').getValue();
        var vtglthr=Ext.getCmp('validasimasakerjatglthr').getValue().toMysql();
        var vsearchvalue=Ext.getCmp('validasimasakerjasearch').getValue();
        refstore.getProxy().setExtraParam('tahun',vthbl); 
        refstore.getProxy().setExtraParam('tglthr',vtglthr); 
        refstore.getProxy().setExtraParam('searchvalue',vsearchvalue); 
        refstore.load();
        
    },
    onGenerate:function(btn){
        
      var winvms=Ext.create({
            xtype:'inputvalidasimasakerja'
        });
        
        var vthbl=Ext.getCmp('validasimasakerjatahun').getValue();
        var vtglthr=Ext.getCmp('validasimasakerjatglthr').getValue();
        Ext.getCmp('vms_tahun').setValue(vthbl);
        Ext.getCmp('vms_tglthr').setValue(vtglthr);
        winvms.show();
        
    },
    onSelectVmsTahun:function( nfield , eOpts ){
        var mymodel=Ext.getCmp('tab2h2').getViewModel();
        var vthbl=nfield.getValue();
        Ext.getCmp('vms_tglthr').setValue(null);
//        console.log(nfield.getValue());
        mymodel.getData().strperiodethrload.load({params:{thbl:vthbl},
        scope: this,
            callback:function(records, operation, success){
                if(success){
                    if(records.length>0){
                        Ext.getCmp('vms_tglthr').setValue(records[0].get('tglthr'));
                    }
                }
            }
        }
    );
    },
    onProcess:function(btn){
        var formfield=btn.up('form').getForm();
        //        console.log(frm.getId());
        var opt='';
        if (formfield.isValid()) {            
            var vtgl=Ext.getCmp('vms_tglthr').getValue().toMysql();
            var vthbl=Ext.getCmp('vms_tahun').getValue();
            Ext.getCmp('validasimasakerjatahun').setValue(vthbl);
        Ext.getCmp('validasimasakerjatglthr').setValue(vtgl);
            formfield.submit({
                url: Penggajian.Global.getApiUrl() + 'validasimasakerja/executeRow',
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
                    Ext.getCmp('tab2h2').getController().onSearchValidasiMasaKerja();
                    Ext.getCmp('input_validasimasakerja').close();
                },
                failure:function(form,action){
                    var obj=action.response;
                    try{
                        var  resp = Ext.decode(obj.responseText);                                        
                        Ext.getCmp('tab2h2').getController().onSearchValidasiMasaKerja();
                    
                        if (resp.reason == 'Session Expired' || resp.message == 'Session Expired') {
                            session_expired('Session Expired');
                        } else{
                            set_message(2, resp.message);
                            Ext.getCmp('input_validasimasakerja').close();
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
        var wineditvms=Ext.create({
            xtype:'editvalidasimasakerja'
        });
        Ext.getCmp('idButtonVmsEdit').setText('Update');
        Ext.getCmp('idButtonVmsEdit').setIconCls('icon-edit-record');
        
        Ext.getCmp('formvalidasimasakerjaedit').loadRecord(rec);
        wineditvms.show();
    }
    ,onEditSave:function(btn){
        var formfield=btn.up('form').getForm();
        //        console.log(frm.getId());
        var opt='';
        if (formfield.isValid()) {            
            var vtgl=Ext.getCmp('evms_tglthr').getValue().toMysql();
            var vthbl=Ext.getCmp('evms_tahun').getValue();
            Ext.getCmp('validasimasakerjatahun').setValue(vthbl);
            Ext.getCmp('validasimasakerjatglthr').setValue(vtgl);  
//            var vdata=formfield.getData();
//            consle.log(vdata);
            formfield.submit({
                url: Penggajian.Global.getApiUrl() + 'validasimasakerja/updateRow',
                methods:'POST',
                params:{                    
                    vtglthr:vtgl,                    
                    _token:tokendata
                },
                // If login is successful               
                success:function(form,action) {
                    var res = Ext.decode(action.response.responseText);
                    set_message(0, res.message);                    
                    Ext.getCmp('tab2h2').getController().onSearchValidasiMasaKerja();
                    Ext.getCmp('edit_validasimasakerja').close();
                },
                failure:function(form,action){
                    var obj=action.response;
                    try{
                        var  resp = Ext.decode(obj.responseText);                                        
                        Ext.getCmp('tab2h2').getController().onSearchValidasiMasaKerja();
                    
                        if (resp.reason == 'Session Expired' || resp.message == 'Session Expired') {
                            session_expired('Session Expired');
                        } else{
                            set_message(2, resp.message);
                            Ext.getCmp('edit_validasimasakerja').close();
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
