Ext.define('Penggajian.view.transaksi.cuti.Cuti', {
    extend: 'Ext.container.Container',
    xtype: 'TabInputCuti',
    alias: 'widget.InputCuti',
    requires: [
    'Penggajian.view.transaksi.cuti.CutiController',
    'Penggajian.view.transaksi.cuti.CutiInput'
    ],
    controller:'cuti',
    title: 'Cuti',
    id: 'tab2f2',
    closable: true,        
    layout: 'border', 
    items:[ ]
    ,
    listeners:{
//        show:function(){
//            var refstoregrid=Ext.getCmp('idpinjamanlist').store;               
//            refstoregrid.loadPage(1);
//        
//        }
    }
    

        
    
});

