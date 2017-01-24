Ext.define('Penggajian.view.transaksi.hitungketerlambatan.HitungKeterlambatanController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.hitungketerlambatan',
    onShow:function(me,opts){
        var refstoreabsensi=Ext.getCmp('idhitungketerlambatanlist').store;   
            ////                        console.log(refjkstoregrid);
            refstoreabsensi.loadPage(1);
    },
    onSearchTanggal:function(){
        var awal=Ext.getCmp('hitungketerlambatan_start').getValue();
        var akhir=Ext.getCmp('hitungketerlambatan_finish').getValue();
        
        Ext.getCmp('idhitungketerlambatanlist').store.load({params:{awal:awal,akhir:akhir}});
    },
    onHitKeterlambatan:function(btn){
        var winhit=Ext.create({
            xtype:'hitungketerlambataninput'
        });
                                            
        winhit.show();
    },
    onProcess:function(btn){
        var formfield=btn.up('form').getForm();
        var vthbl=Ext.Date.format(Ext.getCmp('hk_thbl').getValue(),'Ym');
        if (formfield.isValid()) {
            formfield.submit({
                url: Penggajian.Global.getApiUrl() + 'hitungketerlambatan/executeRow',
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
                    Ext.getCmp('hitungketerlambatan_start').setValue(tglawal);
                    Ext.getCmp('hitungketerlambatan_finish').setValue(tglakhir);
                    set_message(0, res.message); 
                    Ext.getCmp('idhitungketerlambatanlist').store.load({params:{awal:tglawal,akhir:tglakhir}});
                    Ext.getCmp('hitungketerlambatan_input').close();
                },
                failure:function(form,action){
                     
                    try{
                        var res = Ext.decode(action.response.responseText);  
                        set_message(1, res.message); 
                    }catch(ex){
//                        Ext.Msg.alert('Status', ex.message);
                       // set_message(1, ex.message); 
                       
                        Ext.Msg.show({
                            title:'Message Error',
                            msg: ex.message,
                            buttons: Ext.Msg.OK,
                            icon: Ext.Msg.ERROR,
                            maximizable :true,
                            resizable :true,
                            maxWidth:'100%',
                            listeners:{
                                show:function(){
                                    Ext.Msg.doComponentLayout();
                                }
                            }
                        });
                    }
                    
                }
            });
        }else{  
            set_message(1, 'Data Input Not Valid !');            
        }
    }
});