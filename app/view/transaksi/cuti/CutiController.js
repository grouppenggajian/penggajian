Ext.define('Penggajian.view.transaksi.cuti.CutiController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.cuti',
    onShow:function(me,opts){
    Ext.getCmp('idcutilist').store.load();
    },
    onSearchTanggal:function(){
        var awal=Ext.getCmp('cuti_start').getValue();
        var akhir=Ext.getCmp('cuti_finish').getValue();
        
        Ext.getCmp('idcutilist').store.load({params:{awal:awal,akhir:akhir}});
    },
    onClickAdd:function(btn,opts){
        var wincuti=Ext.create({
            xtype:'cutiinput'
        });
//        winjadwal.setTitle('Input Pegawai');
        Ext.getCmp('idButtonCutiInputSave').setText('Simpan');
        Ext.getCmp('idButtonCutiInputSave').setIconCls('icons-add');   
//        Ext.getCmp('jadwalnama').store.load();
//        Ext.getCmp('cutikode_jabatan').store.load();
                                            
        wincuti.show();
    },
    getSisaCuti:function(){
      Ext.Ajax.request({
            method:'GET',
            url: Penggajian.Global.getApiUrl()+'cuti/sisacuti',
            params:{
              nik:Ext.getCmp('cutinik').getValue()  ,
              tgl:Ext.getCmp('cutitgl_mulai').getValue()  
            },
            success: function(response, opts) {
                var obj = Ext.decode(response.responseText);
                var data=obj.data;
                Ext.getCmp('cutisisa_cuti').setValue(data[0].retval);
                var jml=Ext.getCmp('cutijml_cuti').getValue();
                var sisaquota=data[0].retval-jml;
                Ext.getCmp('cutisisakuota_cuti').setValue(sisaquota);
            },

            failure: function(response, opts) {
                console.log('server-side failure with status code ' + response.status);
                return 0;
            }
        });  
    },
    getSisaKuotaCuti:function(){
        var sisa=Ext.getCmp('cutisisa_cuti').getValue();
        var jml=Ext.getCmp('cutijml_cuti').getValue();
        var sisaquota=sisa-jml;
        return sisaquota;
        
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
            var tglmulai=Ext.Date.format(Ext.getCmp('cutitgl_mulai').getValue(),'Y-m-d');
            var tglselesai=Ext.Date.format(Ext.getCmp('cutitgl_selesai').getValue(),'Y-m-d');
//            tgl_ijin=Ext.Date.format(tgl_ijin, 'Y-m-d') ;
            formfield.submit({
                url: Penggajian.Global.getApiUrl() + 'cuti/executeRow',
                methods:'POST',
                params:{
                    opt:opt,                    
                    _token:tokendata,
                    tglmulai:tglmulai,
                    tglselesai:tglselesai
                },
                // If login is successful               
                success:function(form,action) {
                    var res = Ext.decode(action.response.responseText);
                    set_message(0, res.message); 
                    Ext.getCmp('idcutilist').store.load();
                    Ext.getCmp('cuti_input').close();
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
        var winijin=Ext.create({
            xtype:'cutiinput'
        });
        //        winjadwal.setTitle('Input Pegawai');
        Ext.getCmp('idButtonCutiInputSave').setText('Update');
        Ext.getCmp('idButtonCutiInputSave').setIconCls('icon-edit-record');   
        
        var mymodel=Ext.getCmp('cuti_input').getViewModel();
        //                        Ext.getCmp('rmsinsentifhadirinput_kategoriijin').bindStore(mymodel.getData().storekategori_absen_rih);
        mymodel.getData().storekategori_absen.load({
            callback:function(str,records,success){
                if(success){
                    var r= mymodel.getData().storekategori_absen.findRecord('kode',rec.get('kategori_cuti'));//                                 
                    Ext.getCmp('cutikategori_cuti').select(r);//
                    Ext.getCmp('cutitgl_mulai').setValue(rec.get('tgl_mulai'));
                    Ext.getCmp('cutitgl_selesai').setValue(rec.get('tgl_selesai'));                    
                    Ext.getCmp('cutinik').setValue(rec.get('nik'));
                    Ext.getCmp('cutinama').setValue(rec.get('nama'));
                    Ext.getCmp('cutino_cuti').setValue(rec.get('no_cuti'));
                    Ext.getCmp('cutikode_jabatan').setValue(rec.get('jabatan'));
                    Ext.getCmp('cutisisa_cuti').setValue(rec.get('sisa_cuti'));
                    Ext.getCmp('cutijml_cuti').setValue(rec.get('jml_cuti'));
                    Ext.getCmp('cutisisakuota_cuti').setValue(rec.get('sisakuota_cuti'));
                    Ext.getCmp('cutiketerangan').setValue(rec.get('keterangan'));
                    
                    
                }
            }
        });  
        
        
                                            
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
                    var data = rec.data.no_cuti;                                                                 
                    Ext.Ajax.request({                                                            
                        url: Penggajian.Global.getApiUrl() + 'cuti/delete',
                        method: 'POST',
                        params: {
                            opt: 'delete',
                            _token: tokendata,
                            no_cuti:data
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

