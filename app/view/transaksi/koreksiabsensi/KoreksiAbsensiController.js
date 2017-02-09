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
                        
                        refstore.load({params:{
                thbl:vthbl,
                awal:awal,
                akhir:akhir,
                searchvalue:cari
            }})
                                            
        
                    }
                } 
            }
        });
    }
});
