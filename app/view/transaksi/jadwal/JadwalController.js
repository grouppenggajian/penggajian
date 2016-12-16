Ext.define('Penggajian.view.transaksi.jadwal.JadwalController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.jadwal',
    onShow:function(me,opts){
        var refstorejadwal=Ext.getCmp('idjadwallist').store;   
            ////                        console.log(refjkstoregrid);
            refstorejadwal.loadPage(1);
    },
    onClickAdd: function (btn) {       
        var winjadwal=Ext.create({
            xtype:'jadwalinput'
        });
//        winjadwal.setTitle('Input Pegawai');
        Ext.getCmp('idButtonJadwalInputSave').setText('Simpan');
        Ext.getCmp('idButtonJadwalInputSave').setIconCls('icons-add');   
        Ext.getCmp('jadwalnama').store.load();
        Ext.getCmp('jadwalkode_jabatan').store.load();
                                            
        winjadwal.show();
    },
    onClickRefreshJadwal:function(){
        if(Ext.getCmp('jadwalnik').getValue()){
            Ext.getCmp('gridinputjadwal').store.reload();
        }
        
    },
    onSave:function(btn){
        var opt='';
        if(btn.getText()=='Simpan'){
            opt='insert';
        }else{
           opt='deletesave'; 
        }
        
        
        var grid=Ext.getCmp('gridinputjadwal');
        var datasave=new Array();
        var vnik=Ext.getCmp('jadwalnik').getValue();
        var vjab=Ext.getCmp('jadwalkode_jabatan').getValue();
        var rec = grid.getStore();
        rec.each(function(node){
            datasave.push(node.data);
        });
        execute_confirm('Are you sure to Save this ?', Penggajian.Global.getApiUrl()+'jadwal/savejadwal', {
            opt:opt,
            nik:vnik,
            kode_jabatan:vjab,                                  
            postdata:Ext.JSON.encode(datasave),
            _token:tokendata
            }, function(obj) {                                                            
            var retval=Ext.JSON.decode(obj.responseText);
            set_message(0,retval.message);
            Ext.getCmp('jadwalsearch').setValue(Ext.getCmp('jadwalnik').getValue());
            Ext.getCmp('jadwalsearch').onSearchClick();
            var me=Ext.getCmp('jadwal_input');
            me.close();
            
            } );
    },
    onDeleteInputJadwal:function(grid, rowIndex, colIndex){
        var datasave=new Array();
        var vnik=Ext.getCmp('jadwalnik').getValue();
        var vjab=Ext.getCmp('jadwalkode_jabatan').getValue();
        var rec = grid.getStore().getAt(rowIndex);
       
        
        
        execute_confirm('Are you sure to delete this ?', Penggajian.Global.getApiUrl()+'jadwal/deletejadwal', {
            nik:vnik,
            kode_jabatan:vjab,           
            opt:'deletesave',            
            _token:tokendata
            }, function(obj) {                                                            
            var retval=Ext.JSON.decode(obj.responseText);
            var me=Ext.getCmp('idjadwallist').store;
            me.reload();
            set_message(0,retval.message)
            } );
    },
    onDeleteJadwal:function(grid, rowIndex, colIndex){        
        var rec = grid.getStore().getAt(rowIndex);
        var vnik=rec.get('nik');
        var vjab=rec.get('kode_jabatan');
        
       
        
        
        execute_confirm('Are you sure to delete this ?', Penggajian.Global.getApiUrl()+'jadwal/deletejadwal', {
            nik:vnik,
            kode_jabatan:vjab,           
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
        var winjadwal=Ext.create({
            xtype:'jadwalinput'
        });
//        winjadwal.setTitle('Input Pegawai');
        Ext.getCmp('idButtonJadwalInputSave').setText('Update');
        Ext.getCmp('idButtonJadwalInputSave').setIconCls('icon-edit-record');   
        Ext.getCmp('jadwalnama').store.load();
        Ext.getCmp('jadwalkode_jabatan').store.load();
        Ext.getCmp('jadwalnik').setValue(rec.get('nik'));
        Ext.getCmp('jadwalnama').setValue(rec.get('nik'));
        Ext.getCmp('jadwalkode_jabatan').setValue(rec.get('kode_jabatan'));
        
        var storegridjadwal=Ext.getCmp('gridinputjadwal').store;
        storegridjadwal.removeAll ();
           
                storegridjadwal.getProxy().setExtraParam('nik',rec.get('nik'));
                storegridjadwal.getProxy().setExtraParam('kode_jabatan',rec.get('kode_jabatan'));
                storegridjadwal.load();
           
        winjadwal.show();
              
    }
})

