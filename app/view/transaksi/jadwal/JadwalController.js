Ext.define('Penggajian.view.transaksi.jadwal.JadwalController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.jadwal',
    onShow:function(me,opts){
        var refstorejadwal=Ext.getCmp('idjadwallist').store;   
        var app = Penggajian.getApplication();
        app.getStore('storeperiode').load({
            scope: this,
            callback:function(records, operation, success){
                if(success){
                    if(records.length>0){
                        Ext.getCmp('jadwal_start').setValue(records[0].get('tglawal'));
                        Ext.getCmp('jadwal_finish').setValue(records[0].get('tglakhir'));
                            
                            
                        refstorejadwal.getProxy().setExtraParam('awal',records[0].get('tglawal'));
                        refstorejadwal.getProxy().setExtraParam('akhir',records[0].get('tglakhir'));                                
                        refstorejadwal.load({
                            params:{
                                searchvalue:Ext.getCmp('jadwalsearch').getValue()
                            }
                        });
                            
                    }
                }
            }
        });
        
    ////                        console.log(refjkstoregrid);
    //        refstorejadwal.loadPage(1);
    },
    onClickSearchJadwal:function (btn) {       
        if(!Ext.getCmp('jadwal_start').getValue() || !Ext.getCmp('jadwal_finish').getValue()){
            return set_message(2,'Tanggal Pencarian Belum Sesuai!');
            
        }
        if(Ext.getCmp('jadwal_start').getValue() > Ext.getCmp('jadwal_finish').getValue()){
            return set_message(2,'Tanggal Pencarian Belum Sesuai!');    
        }
        var refstorejadwal=Ext.getCmp('idjadwallist').store;                              
                            
        refstorejadwal.getProxy().setExtraParam('awal',format_date_mysql(Ext.getCmp('jadwal_start').getValue()));
        refstorejadwal.getProxy().setExtraParam('akhir',format_date_mysql(Ext.getCmp('jadwal_finish').getValue()));                                
        refstorejadwal.load({
            params:{
                searchvalue:Ext.getCmp('jadwalsearch').getValue()
            }
        });
                            
              
            
    },
    onClickAdd: function (btn) {       
        var winjadwal=Ext.create({
            xtype:'jadwalinput'
        });
        //        winjadwal.setTitle('Input Pegawai');
        //        Ext.getCmp('idButtonJadwalInputSave').setText('Simpan');
        //        Ext.getCmp('idButtonJadwalInputSave').setIconCls('icons-add');   
        //        Ext.getCmp('jadwalnama').store.load();
        Ext.getCmp('jadwalkode_jabatan').store.load();
        var storegridjadwaledit=Ext.getCmp('gridinputjadwal').store;   
        storegridjadwaledit.removeAll ();
        var app = Penggajian.getApplication();
        app.getStore('storeperiode').load({
            scope: this,
            callback:function(records, operation, success){
                if(success){
                    if(records.length>0){
                        Ext.getCmp('inputjadwal_start').setValue(records[0].get('tglawal'));
                        Ext.getCmp('inputjadwal_finish').setValue(records[0].get('tglakhir'));
                    }
                }
            }
        });
                            
                            
                                                                
        winjadwal.show();
    },
    onClickRefreshJadwal:function(){
        if(Ext.getCmp('jadwalnik').getValue()){
            Ext.getCmp('gridinputjadwal').store.reload(
            {
                params:{
                    awal:Ext.getCmp('inputjadwal_start').getValue(),
                    akhir:Ext.getCmp('inputjadwal_finish').getValue()
                }
            }
            );
        }
        
    },
//    onSave:function(btn){
//        var opt='';
//        if(btn.getText()=='Simpan'){
//            opt='insert';
//        }else{
//            opt='deletesave'; 
//        }
//        
//        
//        var grid=Ext.getCmp('gridinputjadwal');
//        var datasave=new Array();
//        var vnik=Ext.getCmp('jadwalnik').getValue();
//        var vjab=Ext.getCmp('jadwalkode_jabatan').getValue();
//        var rec = grid.getStore();
//        rec.each(function(node){
//            datasave.push(node.data);
//        });
//        execute_confirm('Are you sure to Save this ?', Penggajian.Global.getApiUrl()+'jadwal/savejadwal', {
//            opt:opt,
//            nik:vnik,
//            kode_jabatan:vjab,                                  
//            postdata:Ext.JSON.encode(datasave),
//            _token:tokendata
//        }, function(obj) {                                                            
//            var retval=Ext.JSON.decode(obj.responseText);
//            set_message(0,retval.message);
//            Ext.getCmp('jadwalsearch').setValue(Ext.getCmp('jadwalnik').getValue());
//            Ext.getCmp('jadwalsearch').onSearchClick();
//            var me=Ext.getCmp('jadwal_input');
//            me.close();
//            
//        } );
//    },
    onDeleteInputJadwal:function(grid, rowIndex, colIndex){
        var datasave=new Array();
        var vnik=Ext.getCmp('jadwalnik').getValue();
        var vjab=Ext.getCmp('jadwalkode_jabatan').getValue();
        var rec = grid.getStore().getAt(rowIndex);
       var vpostdata=Ext.JSON.encode(rec.data);
        
        
        execute_confirm('Are you sure to delete this ?', Penggajian.Global.getApiUrl()+'jadwal/deletejadwal', {
            nik:vnik,
            kode_jabatan:vjab,  
            postdata:vpostdata,
            opt:'deletesave',            
            _token:tokendata
        }, function(obj) {                                                            
            var retval=Ext.JSON.decode(obj.responseText);
            var me=Ext.getCmp('idjadwallist').store;
            me.reload();
            Ext.getCmp('gridinputjadwal').store.reload();
            set_message(0,retval.message)
        } );
    },
    onDeleteJadwal:function(grid, rowIndex, colIndex){        
        var rec = grid.getStore().getAt(rowIndex);
        var vnik=rec.get('nik');
        var vjab=rec.get('kode_jabatan');
        
       
       var vpostdata=Ext.JSON.encode(rec.data);
        
        
        execute_confirm('Are you sure to delete this ?', Penggajian.Global.getApiUrl()+'jadwal/deletejadwal', {
            nik:vnik,
            kode_jabatan:vjab,    
            postdata:vpostdata,
            opt:'deletesave',            
            _token:tokendata
        }, function(obj) {                                                            
            var retval=Ext.JSON.decode(obj.responseText);
            var me=Ext.getCmp('idjadwallist').store;
            me.reload();
            set_message(0,retval.message)
        } );
    },
    onEditClick:function(grid, rowIndex, colIndex) {   
        
        var rec = grid.getStore().getAt(rowIndex); 
        if(rec.get('nik')){
            var winjadwal=Ext.create({
                xtype:'jadwalinput'
            });
            //        winjadwal.setTitle('Input Pegawai');
            //        Ext.getCmp('idButtonJadwalInputSave').setText('Update');
            //        Ext.getCmp('idButtonJadwalInputSave').setIconCls('icon-edit-record');   
            //        Ext.getCmp('jadwalnama').store.load();
    
            Ext.getCmp('jadwalkode_jabatan').store.load();
            Ext.getCmp('jadwalnik').setValue(rec.get('nik'));
            Ext.getCmp('jadwalnama').setValue(rec.get('nama'));
            Ext.getCmp('jadwalkode_jabatan').setValue(rec.get('kode_jabatan'));
    
        
        
            var storegridjadwal=Ext.getCmp('gridinputjadwal').store;
            storegridjadwal.removeAll ();
                       
            storegridjadwal.getProxy().setExtraParam('nik',rec.get('nik'));
            storegridjadwal.getProxy().setExtraParam('kode_jabatan',rec.get('kode_jabatan'));
            Ext.getCmp('inputjadwal_start').setValue(rec.get('tanggal'));
            Ext.getCmp('inputjadwal_finish').setValue(rec.get('tanggal'));
            storegridjadwal.load({
                params:{
                    awal:rec.get('tanggal'),
                    akhir:rec.get('tanggal')
                    }
                });
           
        winjadwal.show();
    }
}
})

