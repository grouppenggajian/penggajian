Ext.define('Penggajian.view.transaksi.ijin.IjinController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.ijin',
    onShow:function(me,opts){
        var strijin=Ext.getCmp('idijinlist').store;
        var app = Penggajian.getApplication();
        app.getStore('storeperiode').load({
            scope: this,
            callback:function(records, operation, success){
                if(success){
                    if(records.length>0){
                        Ext.getCmp('ijin_start').setValue(records[0].get('tglawal'));
                        Ext.getCmp('ijin_finish').setValue(records[0].get('tglakhir'));                            
                            
                        strijin.getProxy().setExtraParam('awal',records[0].get('tglawal'));
                        strijin.getProxy().setExtraParam('akhir',records[0].get('tglakhir'));                                
                        strijin.load({
                            params:{
                                searchvalue:Ext.getCmp('ijinsearch').getValue()
                            }
                        });
                            
                    }
                }
            }
        });
    
    
    },
    onClickAdd:function(btn,opts){
        var winijin=Ext.create({
            xtype:'ijininput'
        });
        //        winjadwal.setTitle('Input Pegawai');
        Ext.getCmp('idButtonIjinInputSave').setText('Simpan');
        Ext.getCmp('idButtonIjinInputSave').setIconCls('icons-add');   
        //        Ext.getCmp('jadwalnama').store.load();
        Ext.getCmp('ijinkode_jabatan').store.load();
                                            
        winijin.show();
    },
    onSearchTanggal:function(){
        var awal=Ext.getCmp('ijin_start').getValue();
        var akhir=Ext.getCmp('ijin_finish').getValue();
        var cari=Ext.getCmp('ijinsearch').getValue();
        var strijin=Ext.getCmp('idijinlist').store;
        strijin.getProxy().setExtraParam('awal',awal);
        strijin.getProxy().setExtraParam('akhir',akhir);
        strijin.load({params:{searchvalue:cari}});
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
            var tgl_ijin=Ext.getCmp('ijintangggal').getValue();
            tgl_ijin=tgl_ijin.toMysql() ;
            formfield.submit({
                url: Penggajian.Global.getApiUrl() + 'ijin/executeRow',
                methods:'POST',
                params:{
                    opt:opt,
                    tgl_ijin:tgl_ijin,
                    _token:tokendata
                },
                // If login is successful               
                success:function(form,action) {
                    var res = Ext.decode(action.response.responseText);
                    set_message(0, res.message); 
                    Ext.getCmp('ijin_start').setValue(tgl_ijin);
                    Ext.getCmp('ijin_finish').setValue(tgl_ijin);
                    Ext.getCmp('ijinsearch').setValue(Ext.getCmp('ijinnik').getValue());
                    Ext.getCmp('tab2f1').getController().onSearchTanggal();
                    Ext.getCmp('ijin_input').close();
                },
                failure:function(form,action){
                    responseFailure(action.response);
                                    
                                    //                                                                Ext.Msg.alert('info',resp.reason);
                                
                    
                }
            });
        }else{  
            set_message(1, 'Data Input Not Valid !');            
        }
    },
    onEditClick:function(grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex); 
        var winijin=Ext.create({
            xtype:'ijininput'
        });
        //        winjadwal.setTitle('Input Pegawai');
        Ext.getCmp('idButtonIjinInputSave').setText('Update');
        Ext.getCmp('idButtonIjinInputSave').setIconCls('icon-edit-record');   
        
        var mymodel=Ext.getCmp('ijin_input').getViewModel();
        //                        Ext.getCmp('rmsinsentifhadirinput_kategoriijin').bindStore(mymodel.getData().storekategori_absen_rih);
        mymodel.getData().storekategori_absen.load({
            callback:function(str,records,success){
                if(success){
                    var r= mymodel.getData().storekategori_absen.findRecord('kode',rec.get('kategori_ijin'));//                                 
                    Ext.getCmp('ijinkategori_ijin').select(r);//
                    Ext.getCmp('ijintangggal').setValue(rec.get('tgl_ijin'));
                    Ext.getCmp('ijinhari').setValue(rec.get('hari_ijin'));
                    Ext.getCmp('ijinnik').setValue(rec.get('nik'));
                    Ext.getCmp('ijinnama').setValue(rec.get('nama'));
                    Ext.getCmp('ijinno_ijin').setValue(rec.get('no_ijin'));
                    
                    
                }
            }
        });  
        
        Ext.getCmp('ijinkode_jabatan').store.load({
            callback:function(str,records,success){
                if(success){
                    var rj=Ext.getCmp('ijinkode_jabatan').store.findRecord('nama_jabatan',rec.get('jabatan'))   ;
                    Ext.getCmp('ijinkode_jabatan').select(rj);
                }
                
            }
        });
        
//        mymodel.getData().shiftijin.load({
//            params:{
//                nik:rec.get('nik'),
//                kode_jabatan:Ext.getCmp('ijinkode_jabatan').getValue(),
//                hari:rec.get('hari_ijin').toString().toLowerCase()
//            },
//            callback:function(str,records,success){
//                if(success){
//                    
//                }
//            }
//        }); 
        Ext.getCmp('ijinkode_shift').setValue(rec.get('jadwal'));
        Ext.getCmp('ijinjam_kerja_1').setValue(rec.get('jam_kerja_1'));
        Ext.getCmp('ijinjam_kerja_2').setValue(rec.get('jam_kerja_2'));
        Ext.getCmp('ijinjam_kerja_3').setValue(rec.get('jam_kerja_3'));
        Ext.getCmp('ijinjam_kerja_4').setValue(rec.get('jam_kerja_4'));
        Ext.getCmp('ijintipe_ijin').setValue(rec.get('tipe_ijin'));            
        Ext.getCmp('ijinjam_awal').setValue(rec.get('jam_ijin_awal'));
        Ext.getCmp('ijinjam_akhir').setValue(rec.get('jam_ijin_akhir'));
        Ext.getCmp('ijinketerangan').setValue(rec.get('keterangan'));
                                            
        winijin.show();
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
                    var data = rec.data.no_ijin;                                                                 
                    Ext.Ajax.request({                                                            
                        url: Penggajian.Global.getApiUrl() + 'ijin/delete',
                        method: 'POST',
                        params: {
                            opt: 'delete',
                            _token: tokendata,
                            no_ijin:data
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
                              Ext.getCmp('ijinsearch').setValue(data);
                              Ext.getCmp('ijinsearch').onSearchClick();
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
})

