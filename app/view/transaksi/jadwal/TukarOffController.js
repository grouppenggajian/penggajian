Ext.define('Penggajian.view.transaksi.jadwal.TukarOffController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.tukaroff',
    onShow:function(me,opts){
//        var refstorejadwal=Ext.getCmp('idtukarofflist').store;   
//            ////                        console.log(refjkstoregrid);
//            refstorejadwal.loadPage(1);
    },
    onClickAdd:function(btn,opts){
        var wintukaroff=Ext.create({
            xtype:'tukaroffinput'
        });
//        winjadwal.setTitle('Input Pegawai');
        Ext.getCmp('idButtonTukarOffInputSave').setText('Simpan');
        Ext.getCmp('idButtonTukarOffInputSave').setIconCls('icons-add');   
//        Ext.getCmp('jadwalnama').store.load();
        Ext.getCmp('tukaroffkode_jabatan').store.load();
                                            
        wintukaroff.show();
    }
});