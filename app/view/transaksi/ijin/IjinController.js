Ext.define('Penggajian.view.transaksi.ijin.IjinController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.ijin',
    onShow:function(me,opts){
//        var refstorejadwal=Ext.getCmp('idtukarofflist').store;   
//            ////                        console.log(refjkstoregrid);
//            refstorejadwal.loadPage(1);
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
    }
})

