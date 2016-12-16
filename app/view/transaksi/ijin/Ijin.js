Ext.define('Penggajian.view.transaksi.ijin.Ijin', {
    extend: 'Ext.container.Container',
    xtype: 'TabInputIjin',
    alias: 'widget.InputIjin',
    requires: [
    'Penggajian.view.transaksi.ijin.IjinController',
    'Penggajian.view.transaksi.ijin.IjinInput'
    ],
    controller:'ijin',
    title: 'Ijin',
    id: 'tab2f1',
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

