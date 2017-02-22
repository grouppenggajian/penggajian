Ext.define('Penggajian.view.laporan.hut.LaporanHutKaryawanController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.laporan-hut-laporanhutkaryawan'
    ,onClickSearch:function(btn){
        if(Ext.getCmp('hut_start').getValue()>Ext.getCmp('hut_finish').getValue()){
                set_message(2, 'Tanggal Mulai Lebih Besar Dari Tanggal Selesai!!');
                return;
            }
            if(Ext.getCmp('hut_start').getValue()==null || Ext.getCmp('hut_start').getValue()=='undefined'){
                set_message(2, 'Tanggal Mulai Masih Kosong!!');
                return;
            }
            if(Ext.getCmp('hut_finish').getValue()==null || Ext.getCmp('hut_finish').getValue()=='undefined'){
                set_message(2, 'Tanggal Selesai Masih Kosong!!');
                return;
            }
            
        var vtglawal=Ext.getCmp('hut_start').getValue().toMysql();
        var vtglakhir=Ext.getCmp('hut_finish').getValue().toMysql();
        var mymodel=Ext.getCmp('tab3d').getViewModel();
        var refstore=mymodel.getData().storehut;
        refstore.getProxy().setExtraParam('tglawal',vtglawal);
        refstore.getProxy().setExtraParam('tglakhir',vtglakhir);
        refstore.load();
    },onClickReport:function(btn){
        if(Ext.getCmp('hut_start').getValue()>Ext.getCmp('hut_finish').getValue()){
                set_message(2, 'Tanggal Mulai Lebih Besar Dari Tanggal Selesai!!');
                return;
            }
            if(Ext.getCmp('hut_start').getValue()==null || Ext.getCmp('hut_start').getValue()=='undefined'){
                set_message(2, 'Tanggal Mulai Masih Kosong!!');
                return;
            }
            if(Ext.getCmp('hut_finish').getValue()==null || Ext.getCmp('hut_finish').getValue()=='undefined'){
                set_message(2, 'Tanggal Selesai Masih Kosong!!');
                return;
            }
      var vtglawal=Ext.getCmp('hut_start').getValue().toMysql();
      var vtglakhir=Ext.getCmp('hut_finish').getValue().toMysql();  
      var vparamreport='?tglawal='+vtglawal+'&tglakhir='+vtglakhir;
      var winpreview=Ext.create({
            xtype:'winprint'
        });
        winpreview.maximize();
        //                                readLog('transport/transportreport_pdf?query='+Ext.JSON.encode(query));
        to_print('printoutpdf', 'laphut/loadreport'+vparamreport); 
    }
});
