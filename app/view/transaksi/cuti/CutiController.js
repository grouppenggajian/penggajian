Ext.define('Penggajian.view.transaksi.cuti.CutiController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.cuti',
    onShow:function(me,opts){
//        var refstorejadwal=Ext.getCmp('idtukarofflist').store;   
//            ////                        console.log(refjkstoregrid);
//            refstorejadwal.loadPage(1);
    },
    onClickAdd:function(btn,opts){
        var wincuti=Ext.create({
            xtype:'cutiinput'
        });
//        winjadwal.setTitle('Input Pegawai');
        Ext.getCmp('idButtonCutiInputSave').setText('Simpan');
        Ext.getCmp('idButtonCutiInputSave').setIconCls('icons-add');   
//        Ext.getCmp('jadwalnama').store.load();
        Ext.getCmp('cutikode_jabatan').store.load();
                                            
        wincuti.show();
    }
})

