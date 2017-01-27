/**
 * This class is the controller for the main view for the application. It is specified as
 * the "controller" of the Main view class.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('Penggajian.view.master.pegawai.PegawaiController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.pegawai',
    
    onClickAdd: function (btn) {
        //        var app = Penggajian.getApplication();
        //        var teststore2=app.getStore('storepropinsi');
        //        var teststore=app.getStore('storekabupaten');
        //        teststore2.load();
        //        teststore.load();
        //        teststore.each(function(node){
        //            console.log(node.data.propinsi);
        //            
        //        })
        //        
        //        return;
        var winpegawai=Ext.create({
            xtype:'inputPegawai'
        });
        winpegawai.setTitle('Input Pegawai');
        Ext.getCmp('btnsavedatapegawai').setText('Simpan');
        Ext.getCmp('btnsavedatapegawai').setIconCls('icons-add');                                            
                                            
        winpegawai.show();
    },

    onConfirm: function (choice) {
        if (choice === 'yes') {
        //
        }
    },
    onSaveDataPegawai:function(btn){
        var me = this, // Controller reference
        //        win = btn.up('window'), // Window reference
        form=me.lookupReference('form'),
        formfield=form.getForm(),
        values=formfield.getValues(true)
        ;
        //        console.log(values);
        //        return;
        
        if (formfield.isValid()) {
            if(btn.getText()=='Simpan'){
                opt='insert';
            }else{
                opt='update';
            }
            formfield.submit({
                url: Penggajian.Global.getApiUrl() + 'pegawai/executeRow',
                methods:'POST',
                params:{
                    opt:opt,
                    _token:tokendata
                },
                // If login is successful               
                success:function(form,action) {
                    var res = Ext.decode(action.response.responseText);
                    set_message(0, res.message); 
                    var img=Ext.getCmp('image_viewf').store,
                    vnik=Ext.getCmp('pegawainik').getValue()
                    ;
                    
                    img.getProxy().setExtraParam('nik',vnik);
                    img.load();
                    
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
    onSave:function(btn){
        var me = this, // Controller reference
        win = btn.up('window'), // Window reference
        form=Ext.getCmp('formpegawaiinput');
        //form = me.lookupReference('form'),
        opt='';
            
        if (form.isValid()) {
            if(btn.getText()=='Simpan'){
                opt='insert';
            }else{
                opt='update';
            }
            form.submit({
                url: Penggajian.Global.getApiUrl() + 'pegawai/executeRow',
                methods:'POST',
                params:{
                    opt:opt,
                    _token:tokendata
                },
                // If login is successful               
                success:function(form,action) {
                    var res = Ext.decode(action.response.responseText);
                    console.log(res.message);
                    Ext.getCmp('idpegawailist').store.reload();
                    Ext.Msg.show({
                        title:'Message Info',
                        msg: res.message,
                        buttons: Ext.Msg.OK,
                        icon: Ext.Msg.INFO
                    });
                            
                    me.getView().destroy();
                },
                failure:function(form,action){
                    var res = Ext.decode(action.response.responseText);                    
                    Ext.Msg.show({
                        title:'Message Error',
                        msg: res.message,
                        buttons: Ext.Msg.OK,
                        icon: Ext.Msg.ERROR
                    });
                }
            })
        }else{            
            Ext.Msg.show({
                title:'Message Error',
                msg: 'Data Input Not Valid !',
                buttons: Ext.Msg.OK,
                icon: Ext.Msg.ERROR
            });
        }
    },
    onEditClick:function(grid, rowIndex, colIndex) {   
        var rec = grid.getStore().getAt(rowIndex); 
        var winpegawai=Ext.create({
            xtype:'inputPegawai'
        });
        winpegawai.setTitle('Edit Pegawai');
        Ext.getCmp('btnsavedatapegawai').setText('Update');
        Ext.getCmp('btnsavedatapegawai').setIconCls('icon-edit-record'); 
        
        
        Ext.getCmp('pegawaipropinsi').store.load();
        Ext.getCmp('pegawaikabupaten').store.load({params:{searchvalue:rec.get('propinsi')}});
        Ext.getCmp('pegawaikecamatan').store.load({params:{searchvalue:rec.get('kabupaten')}});
        Ext.getCmp('pegawaikelurahan').store.load({params:{searchvalue:rec.get('kecamatan')}});
        Ext.getCmp('pegawaijabatan').store.load();
        Ext.getCmp('pegawaipendidikan').store.load();


        var form=Ext.getCmp('formpegawaiinput');
        form.loadRecord(rec);
        
        
        Ext.getCmp('image_viewf').store.load({params:{nik:rec.get('nik')}})
        
                                            
        winpegawai.show();
    },
    onClickAddPendapatan:function(btn){
        var nik=Ext.getCmp('pegawainik').getValue(),
        jab=Ext.getCmp('pegawaijabatan').getValue();
        if(nik==null || nik=='undefined'||nik==''){            
            set_message(2, 'NIK Masih Kosong !');
            return;            
        }
        if(jab==null || jab=='undefined'||jab==''){            
            set_message(2, 'Jabatan Masih Kosong !');
            return;            
        }
        
            var winm=Ext.createWidget('pegawaimasterpendapatan');
            winm.show();
        
        
    },
    onClickRefreshPendapatan:function(){
        Ext.getCmp('gridpegawaipendapatan').store.reload();
    },
    onDeletePegawaiPendapatan:function(grid, rowIndex, colIndex){
        var datasave=new Array();
        var vnik=Ext.getCmp('pegawainik').getValue();
        var vjab=Ext.getCmp('pegawaijabatan').getValue();
        var rec = grid.getStore().getAt(rowIndex);
        var vkode=rec.data.kode;
        
        
        execute_confirm('Are you sure to delete this ?', Penggajian.Global.getApiUrl()+'pegawai/deletePendapatan', {
            nik:vnik,
            kode_jabatan:vjab,
            kode:vkode,
            opt:'deleterow',            
            _token:tokendata
            }, function(obj) {                                                            
            var retval=Ext.JSON.decode(obj.responseText);
            var me=Ext.getCmp('gridpegawaipendapatan').store;
            me.reload();
            set_message(0,retval.message)
            } );
    },
    onSavePegawaiPendapatan:function(){
        var grid=Ext.getCmp('gridpegawaipendapatan');
        var datasave=new Array();
        var vnik=Ext.getCmp('pegawainik').getValue();
        var vjab=Ext.getCmp('pegawaijabatan').getValue();
        var rec = grid.getStore();
        rec.each(function(node){
            datasave.push(node.data);
        });
        execute_confirm('Are you sure to Save this ?', Penggajian.Global.getApiUrl()+'pegawai/savePendapatan', {
            nik:vnik,
            kode_jabatan:vjab,                                  
            postdata:Ext.JSON.encode(datasave),
            _token:tokendata
            }, function(obj) {                                                            
            var retval=Ext.JSON.decode(obj.responseText);
            var me=Ext.getCmp('gridpegawaipendapatan').store;
            me.reload();
            set_message(0,retval.message)
            } );
    },
    onClickRefreshJadwal:function(){
        if(Ext.getCmp('pegawainik').getValue()){
            Ext.getCmp('gridpegawaijadwal').store.reload({params:{
                        awal:Ext.getCmp('pegawaijadwal_start').getValue(),
                        akhir:Ext.getCmp('pegawaijadwal_finish').getValue()
                    }
                });
        }
        
    },
    onSavePegawaiJadwal:function(){
        var grid=Ext.getCmp('gridpegawaijadwal');
        var datasave=new Array();
        var vnik=Ext.getCmp('pegawainik').getValue();
        var vjab=Ext.getCmp('pegawaijabatan').getValue();
        var rec = grid.getStore();
        rec.each(function(node){
            datasave.push(node.data);
        });
        execute_confirm('Are you sure to Save this ?', Penggajian.Global.getApiUrl()+'pegawai/savejadwal', {
            nik:vnik,
            kode_jabatan:vjab,                                  
            postdata:Ext.JSON.encode(datasave),
            _token:tokendata
            }, function(obj) {                                                            
            var retval=Ext.JSON.decode(obj.responseText);
            var me=Ext.getCmp('gridpegawaijadwal').store;
            me.reload();
            set_message(0,retval.message)
            } );
    },
    onDeletePegawaiJadwal:function(grid, rowIndex, colIndex){
        var datasave=new Array();
        var vnik=Ext.getCmp('pegawainik').getValue();
        var vjab=Ext.getCmp('pegawaijabatan').getValue();
        var rec = grid.getStore().getAt(rowIndex);
        var vpostdata=Ext.JSON.encode(rec.data);
        
        
        execute_confirm('Are you sure to delete this ?', Penggajian.Global.getApiUrl()+'pegawai/deletejadwal', {
            nik:vnik,
            kode_jabatan:vjab,
            postdata:vpostdata,
            opt:'deletesave',            
            _token:tokendata
            }, function(obj) {                                                            
            var retval=Ext.JSON.decode(obj.responseText);
            var me=Ext.getCmp('gridpegawaijadwal').store;
            me.reload();
            set_message(0,retval.message)
            } );
    }
     
    
        
});
