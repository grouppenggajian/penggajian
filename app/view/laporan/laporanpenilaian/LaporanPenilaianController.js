Ext.define('Penggajian.view.laporan.laporanpenilaian.LaporanPenilaianController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.laporan-laporanpenilaian-laporanpenilaian'
    ,
    onClickAdd:function(btn,opts){
        var winnilai=Ext.create({
            xtype:'laporanpenilaianinput'
        });
        //        winjadwal.setTitle('Input Pegawai');
        Ext.getCmp('idButtonLaporanPenilaianInputSave').setText('Simpan');
        Ext.getCmp('idButtonLaporanPenilaianInputSave').setIconCls('icons-add');  
        Ext.getCmp('idButtonLaporanPenilaianInputRefresh').setDisabled(false);
        
        //        Ext.getCmp('jadwalnama').store.load();
        Ext.getCmp('laporanpenilaiankode_jabatan').store.load();
        var d=new Date();
        //        d.setDate(d.getDate() + 1);
        Ext.getCmp('laporanpenilaiantanggal').setMaxValue(d);
        Ext.getCmp('laporanpenilaiantanggal').setReadOnly(false);
        Ext.getCmp('laporanpenilaiankode_jabatan').setReadOnly(false);
        
                                            
        winnilai.show();
    },
    onEditClick:function(grid, rowIndex, colIndex){
        var rec = grid.getStore().getAt(rowIndex); 
        var winnilai=Ext.create({
            xtype:'laporanpenilaianinput'
        });
        //        winjadwal.setTitle('Input Pegawai');
        Ext.getCmp('idButtonLaporanPenilaianInputSave').setText('Update');
        Ext.getCmp('idButtonLaporanPenilaianInputSave').setIconCls('icon-edit-record');  
        Ext.getCmp('idButtonLaporanPenilaianInputRefresh').setDisabled(true);
        
        //        Ext.getCmp('jadwalnama').store.load();
        Ext.getCmp('laporanpenilaiankode_jabatan').store.load({
            callback:function(records, operation, success){
                if(success){
                    Ext.getCmp('laporanpenilaiankode_jabatan').setValue(rec.get('kode_jabatan'));
                }
                
            }
        });
        Ext.getCmp('laporanpenilaiantanggal').setValue(rec.get('tanggal'));
        Ext.getCmp('laporanpenilaiantanggal').setReadOnly(true);
        Ext.getCmp('laporanpenilaiankode_jabatan').setReadOnly(true);
        
        var mymodel=Ext.getCmp('laporanpenilaian_input').getViewModel();
        var refstore=mymodel.getData().storeentrynilai;
        refstore.getProxy().setExtraParam('opt','edit');
        refstore.getProxy().setExtraParam('tanggal',rec.get('tanggal'));
        refstore.getProxy().setExtraParam('kode_jabatan',rec.get('kode_jabatan'));
        refstore.getProxy().setExtraParam('nik',rec.get('nik'));
        refstore.load();
        
        
                                            
        winnilai.show();
    },
    onClickSearch:function(btn){
        
        var mymodel=Ext.getCmp('tab3b').getViewModel();
        var refstoreview=mymodel.getData().storepenilaian;
         
        if(Ext.getCmp('laporanpenilaian_start').getValue()>Ext.getCmp('laporanpenilaian_finish').getValue()){
            set_message(2, 'Tanggal Mulai Lebih Besar Dari Tanggal Selesai!!');
            return;
        }
        if(Ext.getCmp('laporanpenilaian_start').getValue()==null || Ext.getCmp('laporanpenilaian_start').getValue()=='undefined'){
            set_message(2, 'Tanggal Mulai Masih Kosong!!');
            return;
        }
        if(Ext.getCmp('laporanpenilaian_finish').getValue()==null || Ext.getCmp('laporanpenilaian_finish').getValue()=='undefined'){
            set_message(2, 'Tanggal Selesai Masih Kosong!!');
            return;
        } 
        refstoreview.getProxy().setExtraParam('tglawal',Ext.getCmp('laporanpenilaian_start').getValue());
        refstoreview.getProxy().setExtraParam('tglakhir',Ext.getCmp('laporanpenilaian_finish').getValue());
        refstoreview.getProxy().setExtraParam('jabatan',Ext.getCmp('laporanpenilaian_kode_jabatan').getValue());
        refstoreview.load();
    },
    onClickRefresh:function(btn){
        var vtgl=Ext.getCmp('laporanpenilaiantanggal').getValue().toMysql();
        var vjab=Ext.getCmp('laporanpenilaiankode_jabatan').getValue();
        //        if(vtgl==null || vtgl=='undefined'){
        //            set_message(2, 'Tanggal Masih Kosong')
        //        }
        var mymodel=Ext.getCmp('laporanpenilaian_input').getViewModel();
        var refstore=mymodel.getData().storeentrynilai;
        refstore.getProxy().setExtraParam('opt','add');
        refstore.getProxy().setExtraParam('tanggal',vtgl);
        refstore.getProxy().setExtraParam('kode_jabatan',vjab);
        refstore.load();
        
    },
    onSave:function(btn){
        var formfield=btn.up('form').getForm();
        //        console.log(frm.getId());
            
        var opt='update';
        if(Ext.getCmp('idButtonLaporanPenilaianInputSave').getText=='Simpan'){
            opt='insert';
        }
        if (formfield.isValid()) {
            
            var vtgl=Ext.getCmp('laporanpenilaiantanggal').getValue().toMysql();
            var vjab=Ext.getCmp('laporanpenilaiankode_jabatan').getValue();
            
            Ext.getCmp('laporanpenilaian_start').setValue(Ext.getCmp('laporanpenilaiantanggal').getValue());
            Ext.getCmp('laporanpenilaian_finish').setValue(Ext.getCmp('laporanpenilaiantanggal').getValue());
            Ext.getCmp('laporanpenilaian_kode_jabatan').setValue(vjab);
            
            var mymodel=Ext.getCmp('laporanpenilaian_input').getViewModel();
            var ventry=new Array();
            var refstoreentry = mymodel.getData().storeentrynilai;
            refstoreentry.each(function(node){
                ventry.push(node.data);
            });
            
            formfield.submit({
                url: Penggajian.Global.getApiUrl() + 'lapnilai/executeRow',
                methods:'POST',
                params:{
                    opt:opt,
                    postdata:Ext.JSON.encode(ventry),
                    _token:tokendata
                },
                // If login is successful               
                success:function(form,action) {
                    var res = Ext.decode(action.response.responseText);
                    set_message(0, res.message);                    
                    Ext.getCmp('tab3b').getController().onClickSearch();
                    Ext.getCmp('laporanpenilaian_input').close();
                },
                failure:function(form,action){
                    var obj=action.response;
                    try{
                        var  resp = Ext.decode(obj.responseText);                                        
                        Ext.getCmp('tab3b').getController().onClickSearch();
                    
                        if (resp.reason == 'Session Expired' || resp.message == 'Session Expired') {
                            session_expired('Session Expired');
                        } else{
                            set_message(2, resp.message);
                            Ext.getCmp('laporanpenilaian_input').close();
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
    onClickReport:function(btn){
        if(Ext.getCmp('laporanpenilaian_start').getValue()==null || Ext.getCmp('laporanpenilaian_start').getValue()=='undefined'){
            set_message(2, 'Tanggal Mulai Masih Kosong!!');
            return;
        }
        if(Ext.getCmp('laporanpenilaian_finish').getValue()==null || Ext.getCmp('laporanpenilaian_finish').getValue()=='undefined'){
            set_message(2, 'Tanggal Selesai Masih Kosong!!');
            return;
        }
        
        if(Ext.getCmp('laporanpenilaian_start').getValue()>Ext.getCmp('laporanpenilaian_finish').getValue()){
            set_message(2, 'Tanggal Mulai Lebih Besar Dari Tanggal Selesai!!');
            return;
        }
        
        var df=Date.dateDiff('d', Ext.getCmp('laporanpenilaian_start').getValue(), Ext.getCmp('laporanpenilaian_finish').getValue());
        if(df>7){
            set_message(2, 'Tampilan Laporan Maksimal Per 7 Hari!');
            return;
        }
        var vtglawal=Ext.getCmp('laporanpenilaian_start').getValue().toMysql();
      var vtglakhir=Ext.getCmp('laporanpenilaian_finish').getValue().toMysql();  
      var vparamreport='?tglawal='+vtglawal+'&tglakhir='+vtglakhir;
      
      if(Ext.getCmp('laporanpenilaian_kode_jabatan').getValue()){
          vparamreport=vparamreport+'&kode_jabatan='+Ext.getCmp('laporanpenilaian_kode_jabatan').getValue();
          vparamreport=vparamreport+'&nama_jabatan='+Ext.getCmp('laporanpenilaian_kode_jabatan').getDisplayValue();
      }
      var winpreview=Ext.create({
            xtype:'winprint'
        });
        winpreview.maximize();
        console.log('lapnilai/loadreport'+vparamreport);
        to_print('printoutpdf', 'lapnilai/loadreport'+vparamreport); 
            
//        refstoreview.getProxy().setExtraParam('tglawal',Ext.getCmp('laporanpenilaian_start').getValue());
//        refstoreview.getProxy().setExtraParam('tglakhir',Ext.getCmp('laporanpenilaian_finish').getValue());
//        refstoreview.getProxy().setExtraParam('jabatan',Ext.getCmp('laporanpenilaian_kode_jabatan').getValue());
//        refstoreview.load();
    }
});
