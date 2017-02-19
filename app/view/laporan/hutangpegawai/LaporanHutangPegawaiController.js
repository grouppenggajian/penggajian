Ext.define('Penggajian.view.laporan.hutangpegawai.LaporanHutangPegawaiController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.laporan-hutangpegawai-laporanhutangpegawai'
    ,
    onGridRowClick:function( scope, record, item, index, e, eOpts ){
        //                                                                console.log(record.data.role_id);
        var v_nopinjaman=record.data.no_pinjaman;    
        var mymodel=Ext.getCmp('tab3c').getViewModel();
        //            var refstore=mymodel.getData().strlaphutang;
        var angsuranstore=mymodel.getData().storelaphutangangsuran;
        
        angsuranstore.getProxy().setExtraParam('searchvalue',v_nopinjaman);
        angsuranstore.load();
        Ext.getCmp('idlaphutanggsuran').expand();
    //        Ext.getCmp('idpinjamanangsuran').store.load({
    //            params:{
    //                kode_jabatan:v_kodejab
    //            }
    //        });                                
    },
    getParameterSearch:function(){
        if(!Ext.getCmp('laphutang_periode').collapsed){
            if(Ext.getCmp('laphutang_tglawal').getValue()>Ext.getCmp('laphutang_tglakhir').getValue()){
                set_message(2, 'Tanggal Mulai Lebih Besar Dari Tanggal Selesai!!');
                return;
            }
            if(Ext.getCmp('laphutang_tglawal').getValue()==null || Ext.getCmp('laphutang_tglawal').getValue()=='undefined'){
                set_message(2, 'Tanggal Mulai Masih Kosong!!');
                return;
            }
            if(Ext.getCmp('laphutang_tglakhir').getValue()==null || Ext.getCmp('laphutang_tglakhir').getValue()=='undefined'){
                set_message(2, 'Tanggal Selesai Masih Kosong!!');
                return;
            }
        }
        
            
        var vfield=new Array();
        if(Ext.getCmp('laphutang_nik_check').getValue()){
            vfield.push({
                field:'nik',
                value:Ext.getCmp('laphutang_nik').getValue()
                });
        }
        if(Ext.getCmp('laphutang_jabatan_check').getValue()){
            vfield.push({
                field:'kode_jabatan',
                value:Ext.getCmp('laphutang_kodejabatan').getValue()
                });
        }
        if(Ext.getCmp('laphutang_statuslunas_check').getValue()){
            vfield.push({
                field:'status_lunas',
                value:Ext.getCmp('laphutang_status_lunas').getValue()
                });
                       
        }
        
        
        if(!Ext.getCmp('laphutang_periode').collapsed){
            
            var vtglperiode=new Array();
            vtglperiode.push(Ext.getCmp('laphutang_tglawal').getValue().toMysql());
            vtglperiode.push(Ext.getCmp('laphutang_tglakhir').getValue().toMysql());
            vfield.push({
                field:'periode',
                value:vtglperiode
            });            
        }
        
        
        //        var vquery=Ext.JSON.encode(vfield);
        return vfield;
    },
    onClickSearchHutang:function(){
        
        var mymodel=Ext.getCmp('tab3c').getViewModel();
        var refstore=mymodel.getData().storelaphutang;
        
        var myctl=Ext.getCmp('tab3c').getController();
        var vfield=myctl.getParameterSearch();
        
        
        if (vfield.length>0){
            var vquery=Ext.JSON.encode(vfield);
            refstore.getProxy().setExtraParam('postdata',vquery);
            refstore.load();      
        //            Ext.getCmp('invsales_h_paging').onLoad();
        }else{
            refstore.loadRecords([]);
        //            Ext.getCmp('invsales_h_paging').onLoad();  
        }
    },
    onClickSearchAngsuran:function(btn){
        var winsearchangs=Ext.create({
            xtype:'laphutanginput'
        });
        Ext.getCmp('idbtnproseslaphutang').setText('Search');
        winsearchangs.show();
    },    
    onPreview:function(btn){
        if(!Ext.getCmp('laphutang_no_pinjaman').getValue()){
            set_message(2, 'No.Pinjaman Masih Kosong!!');
            return;
        }
        var vfield=new Array();
        vfield.push({
            field:'no_pinjaman',
            value:Ext.getCmp('laphutang_no_pinjaman').getValue()
            });
        var vquery=Ext.JSON.encode(vfield);
        var mymodel=Ext.getCmp('tab3c').getViewModel();
        var refstore=mymodel.getData().storelaphutang;
        var refstoreans=mymodel.getData().storelaphutangangsuran;
            
        if(Ext.getCmp('idbtnproseslaphutang').getText()=='Search')    {
            if (vfield.length>0){            
                refstore.getProxy().setExtraParam('postdata',vquery);
                refstore.load();      
                refstoreans.getProxy().setExtraParam('searchvalue',Ext.getCmp('laphutang_no_pinjaman').getValue());
                refstoreans.load();
                Ext.getCmp('idlaphutanggsuran').expand();
            }else{
                refstore.loadRecords([]);
                refstoreans.loadRecords([]);
            //            Ext.getCmp('invsales_h_paging').onLoad();  
            }
        }
        else   {
            var vparamreport='';
            vparamreport='?searchvalue='+Ext.getCmp('laphutang_no_pinjaman').getValue();
            var winpreview=Ext.create({
                xtype:'winprint'
            });
            winpreview.maximize();
            //                                readLog('transport/transportreport_pdf?query='+Ext.JSON.encode(query));
            to_print('printoutpdf', 'hutangpegawai/loadreportangsuran'+vparamreport); 
        }
        Ext.getCmp('laphutang_input').close();
        
    },
    onClickReportAngsuran:function(btn){
        var winsearchangs=Ext.create({
            xtype:'laphutanginput'
        });
        Ext.getCmp('idbtnproseslaphutang').setText('Preview');
        winsearchangs.show();
    },
    onClickReport:function(btn){
        var myctl=Ext.getCmp('tab3c').getController();
        var vfield=myctl.getParameterSearch();
        
             
        var vparamreport='';
        if (vfield.length>0){
            var vquery=Ext.JSON.encode(vfield);  
            vparamreport='?postdata='+vquery;
        
        }else{
            return;
        }
        var winpreview=Ext.create({
            xtype:'winprint'
        });
        winpreview.maximize();
        //                                readLog('transport/transportreport_pdf?query='+Ext.JSON.encode(query));
        to_print('printoutpdf', 'hutangpegawai/loadreport'+vparamreport); 
        
    }
});
