Ext.define('Penggajian.view.rumus.insentifhadir.RmsInsentifHadirController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.rmsinsentifhadir',
    onShow:function(){
        Ext.getCmp('tab1g4').getViewModel().getData().storermsinsentifhadir.load();
    },
    renderPercent: function (value) {
        //        var mvalue=value?value*100:0;
        return value + ' %';
    },
    
    onClickAdd:function(){
        var winrmsih=Ext.create({
            xtype:'rmsinsentifhadirinput'
        });
        //        winjadwal.setTitle('Input Pegawai');
        Ext.getCmp('idButtonrmsinsentifhadirinputSave').setText('Simpan');
        Ext.getCmp('idButtonrmsinsentifhadirinputSave').setIconCls('icons-add');   
        
        var mymodel=Ext.getCmp('tab1g4').getViewModel();
        mymodel.getData().storekategori_absen_rih.load();
        mymodel.getData().storejenisharikerja.load();
        winrmsih.show();
    },
    onClickRefresh:function(){
        Ext.getCmp('tab1g4').getViewModel().getData().storermsinsentifhadir.load();
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
            formfield.submit({
                url: Penggajian.Global.getApiUrl() + 'rumusinsentifhadir/executeRow',
                methods:'POST',
                params:{
                    opt:opt,
                    _token:tokendata
                },
                // If login is successful               
                success:function(form,action) {
                    var res = Ext.decode(action.response.responseText);
                    set_message(0, res.message); 
                    Ext.getCmp('tab1g4').getViewModel().getData().storermsinsentifhadir.load();
                    Ext.getCmp('rmsinsentifhadir_input').close();
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
        //                        console.log(rec);
        var winrmsih=Ext.create({
            xtype:'rmsinsentifhadirinput'
        });
        //                        winrmsih.setTitle('R');
        Ext.getCmp('idButtonrmsinsentifhadirinputSave').setText('Update');
        Ext.getCmp('idButtonrmsinsentifhadirinputSave').setIconCls('icon-edit-record');                                            
                        
                        
        var mymodel=Ext.getCmp('tab1g4').getViewModel();
        //                        Ext.getCmp('rmsinsentifhadirinput_kategoriijin').bindStore(mymodel.getData().storekategori_absen_rih);
        mymodel.getData().storekategori_absen_rih.load({
            callback:function(str,records,success){
                if(success){
                    var r= mymodel.getData().storekategori_absen_rih.findRecord('kode',rec.get('kategori_ijin'));//                                 
                    Ext.getCmp('rmsinsentifhadirinput_kategoriijin').select(r);//                                 
                }
            }
        });  
        mymodel.getData().storejenisharikerja.load({
            callback:function(str,records,success){
                if(success){
                    var r= mymodel.getData().storejenisharikerja.findRecord('id',rec.get('jenisharikerja'));//                                 
                    Ext.getCmp('rmsinsentifhadirinput_jenisharikerja').select(r);//                                 
                }
            }
        }); 
        //                        
                        
        //                        
        Ext.getCmp('rmsinsentifhadirinput_tipe_ijin').setValue(rec.get('tipe_ijin'));
        Ext.getCmp('rmsinsentifhadirinput_kaliijin').setValue(rec.get('kali_ijin'));
        Ext.getCmp('rmsinsentifhadirinput_nilaiinsentif').setValue(rec.get('nilai_insentif'));
        Ext.getCmp('rmsinsentifhadirinput_id').setValue(rec.get('id'));
                       
                        
        //                                    readLog(rec.get('aktif'));
                                            
        winrmsih.show();
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
                    var data = rec.data.id;                                                                 
                    Ext.Ajax.request({                                                            
                        url: Penggajian.Global.getApiUrl() + 'rumusinsentifhadir/delete',
                        method: 'POST',
                        params: {
                            opt: 'delete',
                            _token: tokendata,
                            id:data
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
                                Ext.getCmp('tab1g4').getViewModel().getData().storermsinsentifhadir.load();
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