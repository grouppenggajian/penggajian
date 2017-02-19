Ext.define('Penggajian.view.transaksi.slipthr.SlipThrController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.transaksi-slipthr-slipthr'
    ,onShow:function(){
        var mymodel=Ext.getCmp('tab2h5').getViewModel();
        mymodel.getData().strslipthrperiodeload.load({params:{aktif:'on'},
        scope: this,
            callback:function(records, operation, success){
                if(success){
                    if(records.length>0){
                        Ext.getCmp('slipthr_tahun').setValue(records[0].get('thbl'));
//                        Ext.getCmp('slipthr_tahun_check').setValue(true);
                        
                    }
                }
            }
        });
    },
    onClickSearch:function(btn){
        var mymodel=Ext.getCmp('tab2h5').getViewModel();
        var refstore=mymodel.getData().strslipthr;
        var vthbl=Ext.getCmp('slipthr_tahun').getValue();
        var vnik=Ext.getCmp('slipthr_nik').getValue();
        var vjabatan=Ext.getCmp('slipthr_kodejabatan').getValue();
        
        
        delete refstore.getProxy().setExtraParam('tahun',vthbl); 
        delete refstore.getProxy().setExtraParam('nik',vnik); 
        delete refstore.getProxy().setExtraParam('jabatan',vjabatan); 
        
        if(!Ext.getCmp('slipthr_tahun_check').getValue()){
          set_message(2, 'Tahun THR Belum Dipilih !');
          return;
        }else{
            refstore.getProxy().setExtraParam('tahun',vthbl); 
        }
        if(Ext.getCmp('slipthr_nik_check').getValue()){
            refstore.getProxy().setExtraParam('nik',vnik); 
        }
        if(Ext.getCmp('slipthr_jabatan_check').getValue()){
            refstore.getProxy().setExtraParam('jabatan',vjabatan); 
        }
        
        
        
        refstore.load({
            callback:function(records, operation, success){
                if(!success){
                    var resp=Ext.decode(operation.getResponse().responseText);
                    var vmsg=resp.message;
                    set_message(2, vmsg);
                    return;
                }
            }
        });
        
        
    },
    onClickReport:function(btn){
        
        var vthbl=Ext.getCmp('slipthr_tahun').getValue();
        var vnik=Ext.getCmp('slipthr_nik').getValue();
        var vjabatan=Ext.getCmp('slipthr_kodejabatan').getValue();
        
        
        
        
        if(!Ext.getCmp('slipthr_tahun_check').getValue()){
          set_message(2, 'Tahun THR Belum Dipilih !');
          return;
        }else{
            var vparamreport='?tahun='+vthbl;
            
        }
        if(Ext.getCmp('slipthr_nik_check').getValue()){
            vparamreport=vparamreport+'&nik='+vnik;
        }
        if(Ext.getCmp('slipthr_jabatan_check').getValue()){
            vparamreport=vparamreport+'&jabatan='+vjabatan;
        }
        
        
        
        var winpreview=Ext.create({
            xtype:'winprint'
        });
        winpreview.maximize();
        //                                readLog('transport/transportreport_pdf?query='+Ext.JSON.encode(query));
        to_print('printoutpdf', 'slipthr/loadreport'+vparamreport); 
    },
    onViewBayar:function(grid, rowIndex, colIndex){
        var rec = grid.getStore().getAt(rowIndex);
        var vparamreport='?tahun='+rec.get('tahun')+'&nik='+rec.get('nik');
        var winpreview=Ext.create({
                        xtype:'winprint'
                    });
                    winpreview.maximize();
                    //                                readLog('transport/transportreport_pdf?query='+Ext.JSON.encode(query));
                    to_print('printoutpdf', 'paymentthr/loadreport'+vparamreport);
    }
});
