Ext.define('Penggajian.view.transaksi.koreksiabsensi.KoreksiAbsensiController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.koreksiabsensi',
    onShow:function(me,opts){
        
        var refstore=Ext.getCmp('idkoreksiabsensilist').store; 
        refstore.removeAll();
        Ext.getCmp('koreksiabsensi_minggu').setValue(1);
        Ext.getCmp('koreksiabsensisearch').setValue(null);
        var app = Penggajian.getApplication();
        app.getStore('storerefperiode').load({
            scope: this,
            callback:function(records, operation, success){
                if(success){
                    if(records.length>0){
                        Ext.getCmp('koreksiabsensi_start').setValue(records[0].get('tglawal'));
                        Ext.getCmp('koreksiabsensi_finish').setValue(records[0].get('tglakhir'));
                        //                        var thbl = records[0].get('thbl').toThblExt(); 
                        //                        thbl=thbl.substring(0, 4)+'-'+thbl.substring(4, 6)+'-'+'01';                                                   
                        Ext.getCmp('koreksiabsensi_thbl').setValue(records[0].get('thbl').toThblExt());
                    }
                }
            }
        });
    ////                        console.log(refjkstoregrid);
    //            refstoreterlambat.loadPage(1);
    },
    onSearchKoreksiAbsensi:function(btn){
        var vthbl=Ext.getCmp('koreksiabsensi_thbl').getValue().toThblMysql();  
        var awal=Ext.getCmp('koreksiabsensi_start').getValue().toMysql();
        var akhir=Ext.getCmp('koreksiabsensi_finish').getValue().toMysql();
        var mingguke=Ext.getCmp('koreksiabsensi_minggu').getValue();
        var cari=Ext.getCmp('koreksiabsensisearch').getValue();
        
        var refstore=Ext.getCmp('idkoreksiabsensilist').store;        
        
        var app = Penggajian.getApplication();
        app.getStore('storerefperiode').load({
            scope: this,
            params:{
                thbl:vthbl
            },
            callback:function(records, operation, success){
                if(success){
                    if(records.length>0){
                        Ext.getCmp('koreksiabsensi_start').setValue(records[0].get('tglawal'));
                        Ext.getCmp('koreksiabsensi_finish').setValue(records[0].get('tglakhir'));
                        
                        var datestart=new Date(Ext.getCmp('koreksiabsensi_start').getValue());
                        var dateend=new Date(Ext.getCmp('koreksiabsensi_finish').getValue());
                        var datefinish=new Date(Ext.getCmp('koreksiabsensi_start').getValue());
                        datefinish.setDate(datefinish.getDate() - 1 );
                        datefinish.setDate(datefinish.getDate() + (7*mingguke));
                        datestart.setDate(datestart.getDate() + (7*(mingguke-1)));
                        if(datefinish>dateend){
                            datefinish=dateend;
                        }
                        Ext.getCmp('koreksiabsensi_start').setValue(datestart);
                        Ext.getCmp('koreksiabsensi_finish').setValue(datefinish);
                        awal=Ext.getCmp('koreksiabsensi_start').getValue().toMysql();
                        akhir=Ext.getCmp('koreksiabsensi_finish').getValue().toMysql();
                        
                        refstore.load({
                            params:{
                                thbl:vthbl,
                                awal:awal,
                                akhir:akhir,
                                searchvalue:cari
                            }
                        })
                                            
        
                    }
                } 
            }
        });
    },
    onHistoryKoreksiClick:function(grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex); 
        
        var winkoreksiabsensihisto=Ext.create({
            xtype:'koreksiabsensihisto'
        });
        var histogridstore=Ext.getCmp('idkoreksiabsensihistolist').store;
        histogridstore.getProxy().setExtraParam('nik',rec.get('nik'));
        histogridstore.getProxy().setExtraParam('tgl',rec.get('tgl'));
        histogridstore.load();
        Ext.getCmp('koreksiabsensisearchnik').setValue(rec.get('nik'));
        Ext.getCmp('koreksiabsensisearchtgl').setValue(rec.get('tgl'));
        winkoreksiabsensihisto.show();
        
    },
    onKoreksiClick:function(grid, rowIndex, colIndex) {
      
        var rec = grid.getStore().getAt(rowIndex); 
        var winkoreksiabsensi=Ext.create({
            xtype:'koreksiabsensiinput'
        });
        //        winjadwal.setTitle('Input Pegawai');
        //    Ext.getCmp('idButtonKoreksiAbsensiInputSave').setText('Update');
        //    Ext.getCmp('idButtonKoreksiAbsensiInputSave').setIconCls('icon-edit-record');   
        
          
        console.log(rec)    ;
        Ext.getCmp('koreksiabsensitgl').setValue(rec.get('tgl'));
        Ext.getCmp('koreksiabsensihari').setValue(rec.get('hari'));
        Ext.getCmp('koreksiabsensiis_pantangan').setValue(rec.get('is_pantangan'));
        Ext.getCmp('koreksiabsensinik').setValue(rec.get('nik'));
        Ext.getCmp('koreksiabsensinama').setValue(rec.get('nama'));
        Ext.getCmp('koreksiabsensikode_jabatan').setValue(rec.get('kode_jabatan'));    
        Ext.getCmp('koreksiabsensikode_shift').setValue(rec.get('kode_shift'));
        Ext.getCmp('koreksiabsensijam_kerja_1').setValue(rec.get('jam_kerja_1'));
        Ext.getCmp('koreksiabsensijam_kerja_2').setValue(rec.get('jam_kerja_2'));
        Ext.getCmp('koreksiabsensijam_kerja_3').setValue(rec.get('jam_kerja_3'));
        Ext.getCmp('koreksiabsensijam_kerja_4').setValue(rec.get('jam_kerja_4'));
        Ext.getCmp('koreksiabsensimasuk').setValue(rec.get('masuk'));
        Ext.getCmp('koreksiabsensikeluar').setValue(rec.get('keluar'));
        Ext.getCmp('koreksiabsensimasuk_kembali').setValue(rec.get('masuk_kembali'));
        Ext.getCmp('koreksiabsensipulang').setValue(rec.get('pulang'));
        Ext.getCmp('koreksiabsensilembur_masuk').setValue(rec.get('lembur_masuk'));
        Ext.getCmp('koreksiabsensilembur_keluar').setValue(rec.get('lembur_keluar'));
        Ext.getCmp('koreksiabsensiketerangan').setValue(rec.get('keterangan'));
                                            
        winkoreksiabsensi.show();
    },
    onSave:function(btn){
        var formfield=btn.up('form').getForm();
        //        console.log(frm.getId());
        var opt='';
        if (formfield.isValid()) {
            var vtgl=Ext.getCmp('koreksiabsensitgl').getValue().toMysql();
            formfield.submit({
                url: Penggajian.Global.getApiUrl() + 'koreksiabsensi/executeRow',
                methods:'POST',
                params:{
                    opt:opt,
                    vtgl:vtgl,
                    _token:tokendata
                },
                // If login is successful               
                success:function(form,action) {
                    var res = Ext.decode(action.response.responseText);
                    set_message(0, res.message);                    
                    Ext.getCmp('tab2b2').getController().onSearchKoreksiAbsensi();
                    Ext.getCmp('koreksiabsensi_input').close();
                },
                failure:function(form,action){
                    var obj=action.response;
                    try{
                        var  resp = Ext.decode(obj.responseText);                                        
                        Ext.getCmp('tab2b2').getController().onSearchKoreksiAbsensi();
                    
                        if (resp.reason == 'Session Expired' || resp.message == 'Session Expired') {
                            session_expired('Session Expired');
                        } else{
                            set_message(2, resp.message);
                            Ext.getCmp('koreksiabsensi_input').close();
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