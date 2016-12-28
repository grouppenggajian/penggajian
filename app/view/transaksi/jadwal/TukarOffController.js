Ext.define('Penggajian.view.transaksi.jadwal.TukarOffController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.tukaroff',
    onShow:function(me,opts){
        var awal=Ext.getCmp('tukaroff_start').getValue();
        var akhir=Ext.getCmp('tukaroff_finish').getValue();
        var searchvalue=Ext.getCmp('tukaroffsearch').getValue();        
        Ext.getCmp('idtukarofflist').store.load({params:{searchvalue:searchvalue,awal:awal,akhir:akhir}});
    },
    onSearchTanggal:function(){
        var awal=Ext.getCmp('tukaroff_start').getValue();
        var akhir=Ext.getCmp('tukaroff_finish').getValue();
        var searchvalue=Ext.getCmp('tukaroffsearch').getValue();        
        Ext.getCmp('idtukarofflist').store.load({params:{searchvalue:searchvalue,awal:awal,akhir:akhir}});
    },
    onClickAdd:function(btn,opts){
        var wintukaroff=Ext.create({
            xtype:'tukaroffinput'
        });
//        winjadwal.setTitle('Input Pegawai');
        Ext.getCmp('idButtonTukarOffInputSave').setText('Simpan');
        Ext.getCmp('idButtonTukarOffInputSave').setIconCls('icons-add');   
//        Ext.getCmp('jadwalnama').store.load();
        Ext.getCmp('tukaroffkode_jabatan').store.load();
                                            
        wintukaroff.show();
    },
    onSave:function(btn){
        
        var formfield=btn.up('form').getForm();
        //        console.log(frm.getId());
        var opt='';
        if (formfield.isValid()) {
            if(btn.getText()=='Simpan'){
                opt='insert';
            }else{
                opt='update';
            }
            var vtanggal=Ext.Date.format(Ext.getCmp('tukarofftanggal').getValue(),'Y-m-d');
            var vtanggal_tukar=Ext.Date.format(Ext.getCmp('tukarofftanggal_tukar').getValue(),'Y-m-d');
//            tgl_ijin=Ext.Date.format(tgl_ijin, 'Y-m-d') ;
            formfield.submit({
                url: Penggajian.Global.getApiUrl() + 'tukaroff/executeRow',
                methods:'POST',
                params:{
                    opt:opt,                    
                    _token:tokendata,
                    vtanggal:vtanggal,
                    vtanggal_tukar:vtanggal_tukar
                },
                // If login is successful               
                success:function(form,action) {
                    var res = Ext.decode(action.response.responseText);
                    set_message(0, res.message); 
                    Ext.getCmp('tukaroff_start').setValue(vtanggal);
                    Ext.getCmp('tukaroff_finish').setValue(vtanggal_tukar);
                    Ext.getCmp('tukaroffsearch').setValue(Ext.getCmp('tukaroffnik').getValue());        
                    Ext.getCmp('tab2a2').getController().onSearchTanggal();
                    Ext.getCmp('tukaroff_input').close();
                },
                failure:function(form,action){
                    var res = Ext.decode(action.response.responseText);  
                    set_message(1, res.message);  
                    
                }
            });
        }else{  
            set_message(1, 'Data Input Not Valid !');            
        }
    },
    onEditClick:function(grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex); 
        var wintukaroff=Ext.create({
            xtype:'tukaroffinput'
        });
        
        Ext.getCmp('idButtonTukarOffInputSave').setText('Update');
        Ext.getCmp('idButtonTukarOffInputSave').setIconCls('icon-edit-record');   
        
        Ext.getCmp('tukaroffkode_jabatan').store.load({
            callback:function(str,records,success){
                if(success){
                   Ext.getCmp('formtukaroffinput').loadRecord(rec);
                }
            }
        });  
        wintukaroff.show();
    },
    onDeleteClick:function(grid, rowIndex, colIndex) {
                        
        var rec = grid.getStore().getAt(rowIndex);
        Ext.Msg.show({
            title: 'Confirm',
            msg: 'Are you sure delete selected row ?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            fn: function(btn){
                if (btn == 'yes') {                                                                
                    var data = rec.data.no_tukar;                                                                 
                    Ext.Ajax.request({                                                            
                        url: Penggajian.Global.getApiUrl() + 'tukaroff/delete',
                        method: 'POST',
                        params: {
                            opt: 'delete',
                            _token: tokendata,
                            no_tukar:data
                        },
                        success: function(obj) {
                            var   resp = Ext.decode(obj.responseText);                                                                
                            if(resp.success==true){
                                Ext.Msg.show({
                                    title:'Message Info',
                                    msg: resp.message,
                                    buttons: Ext.Msg.OK,
                                    icon: Ext.Msg.INFO
                                });
                              Ext.getCmp('tukaroffsearch').setValue(data);
                              Ext.getCmp('tukaroffsearch').onSearchClick();
                            }else{
                                Ext.Msg.show({
                                    title: 'Error',
                                    msg: resp.message,
                                    modal: true,
                                    icon: Ext.Msg.ERROR,
                                    buttons: Ext.Msg.OK,
                                    fn: function(btn){
                                        if (btn == 'ok' && resp.msg == 'Session Expired') {
                                            window.location = Penggajian.Global.getApiUrl();
                                        }
                                    }
                                });
                            }
                        },
                        failure: function(obj) {
                            var  resp = Ext.decode(obj.responseText);
                            Ext.Msg.alert('info',resp.reason);
                        }
                    });                 
                } 
            }
        });
                        
    }
});