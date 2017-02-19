Ext.define('Penggajian.view.laporan.hutangpegawai.LaporanHutangPegawai', {
    extend: 'Ext.container.Container',
    xtype: 'TabLaporanHutangPegawai',
    alias: 'widget.TabLaporanHutangPegawai',
    requires: [
        'Penggajian.view.laporan.WinPrint'
//    'Penggajian.view.transaksi.ijin.IjinController',
//    'Penggajian.view.transaksi.ijin.IjinInput'
    ],
//    controller:'ijin',
    title: 'Hutang Pegawai',
    id: 'tab3c',
    closable: true,        
    layout: 'border', 
    items:[
        {
                
                xtype: 'panel',
                autoShow: true,
                autoScroll: true,
                enableToggle: true,
//                title:'Print Preview',
                id: 'panel_transrep',
                region: 'center',
                margins: '5 5 5 5',
                layout: 'fit',
                tbar:{
                    xtype: 'toolbar',
                    items: [
                        
                        {
                            xtype: 'button',
                            text: 'Transport Report',
                            id:'btn_transrep',
                            iconCls: 'icon-refresh',
//                            enableToggle: true,
                            onClick: function(){
                                var winpreview=Ext.create({
                                    xtype:'winprint'
                                });
                                winpreview.maximize();
                              
                                                             
//                                var query=new Array();
//                                query.push({name:'transport_by', value:getComp('transrep_transport_by').getValue()});
//                                query.push({name:'thbl', value:format_date(getComp('transrep_thbl').getValue(), 'Ym')});
//                                readLog('transport/transportreport_pdf?query='+Ext.JSON.encode(query));
                                to_print('printoutpdf', 'hutangpegawai/load'); 
                            }
                        }
                    ]
                }
                
                
            }
    ]
    ,
    listeners:{
//        show:function(){
//            var refstoregrid=Ext.getCmp('idpinjamanlist').store;               
//            refstoregrid.loadPage(1);
//        
//        }
    }
    

        
    
});