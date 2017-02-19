Ext.define('Penggajian.view.laporan.keterlambatan.LaporanKeterlambatanController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.laporanketerlambatan'
    , onClickSearch:function(){
        if(!Ext.getCmp('lapterlambat_periode').collapsed){
            if(Ext.getCmp('lapterlambat_tglawal').getValue()>Ext.getCmp('lapterlambat_tglakhir').getValue()){
                set_message(2, 'Tanggal Mulai Lebih Besar Dari Tanggal Selesai!!');
                return;
            }
            if(Ext.getCmp('lapterlambat_tglawal').getValue()==null || Ext.getCmp('lapterlambat_tglawal').getValue()=='undefined'){
                set_message(2, 'Tanggal Mulai Masih Kosong!!');
                return;
            }
            if(Ext.getCmp('lapterlambat_tglakhir').getValue()==null || Ext.getCmp('lapterlambat_tglakhir').getValue()=='undefined'){
                set_message(2, 'Tanggal Selsai Masih Kosong!!');
                return;
            }
        }
        
            
        var vfield=new Array();
        if(Ext.getCmp('lapterlambat_nik_check').getValue()){
            vfield.push({field:'nik',value:Ext.getCmp('lapterlambat_nik').getValue()});
        }
        if(Ext.getCmp('lapterlambat_jabatan_check').getValue()){
            vfield.push({field:'kode_jabatan',value:Ext.getCmp('lapterlambat_kodejabatan').getValue()});
        }
        
        
        if(!Ext.getCmp('lapterlambat_periode').collapsed){
            
            var vtglperiode=new Array();
            vtglperiode.push(Ext.getCmp('lapterlambat_tglawal').getValue().toMysql());
            vtglperiode.push(Ext.getCmp('lapterlambat_tglakhir').getValue().toMysql());
            vfield.push({field:'tgl',value:vtglperiode });            
        }
        
        var vquery=Ext.JSON.encode(vfield);
        var mymodel=Ext.getCmp('tab3a').getViewModel();
            var refstore=mymodel.getData().strlapterlambat;
        if (vfield.length>0){
            
            refstore.getProxy().setExtraParam('postdata',vquery);
            refstore.load();      
//            Ext.getCmp('invsales_h_paging').onLoad();
        }else{
            refstore.loadRecords([]);
//            Ext.getCmp('invsales_h_paging').onLoad();  
        }
    },
    onClickReport:function(){
        if(!Ext.getCmp('lapterlambat_periode').collapsed){
            if(Ext.getCmp('lapterlambat_tglawal').getValue()>Ext.getCmp('lapterlambat_tglakhir').getValue()){
                set_message(2, 'Tanggal Mulai Lebih Besar Dari Tanggal Selesai!!');
                return;
            }
            if(Ext.getCmp('lapterlambat_tglawal').getValue()==null || Ext.getCmp('lapterlambat_tglawal').getValue()=='undefined'){
                set_message(2, 'Tanggal Mulai Masih Kosong!!');
                return;
            }
            if(Ext.getCmp('lapterlambat_tglakhir').getValue()==null || Ext.getCmp('lapterlambat_tglakhir').getValue()=='undefined'){
                set_message(2, 'Tanggal Selsai Masih Kosong!!');
                return;
            }
        }
        
            
        var vfield=new Array();
        if(Ext.getCmp('lapterlambat_nik_check').getValue()){
            vfield.push({field:'nik',value:Ext.getCmp('lapterlambat_nik').getValue()});
        }
        if(Ext.getCmp('lapterlambat_jabatan_check').getValue()){
            vfield.push({field:'kode_jabatan',value:Ext.getCmp('lapterlambat_kodejabatan').getValue()});
        }
        
        
        if(!Ext.getCmp('lapterlambat_periode').collapsed){
            
            var vtglperiode=new Array();
            vtglperiode.push(Ext.getCmp('lapterlambat_tglawal').getValue().toMysql());
            vtglperiode.push(Ext.getCmp('lapterlambat_tglakhir').getValue().toMysql());
            vfield.push({field:'tgl',value:vtglperiode });            
        }
        
        var vquery=Ext.JSON.encode(vfield);       
        var vparamreport='';
        if (vfield.length>0){
            vparamreport='?postdata='+vquery;
        
        }else{
            return;
        }
                                var winpreview=Ext.create({
                                    xtype:'winprint'
                                });
                                winpreview.maximize();
                              
                                                             
                                var query=new Array();
//                                query.push({name:'transport_by', value:getComp('transrep_transport_by').getValue()});
//                                query.push({name:'thbl', value:format_date(getComp('transrep_thbl').getValue(), 'Ym')});
//                                readLog('transport/transportreport_pdf?query='+Ext.JSON.encode(query));
                                to_print('printoutpdf', 'lapterlambat/loadreport'+vparamreport); 
                            }
});
