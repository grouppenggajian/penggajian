
Ext.define('Penggajian.view.transaksi.approvalkoreksi.ApprovalKoreksi',{
    extend: 'Ext.container.Container',
    xtype: 'TabApprovalKoreksi',
    alias: 'widget.ApprovalKoreksi',
    requires: [
        'Penggajian.view.transaksi.approvalkoreksi.ApprovalKoreksiController',
        'Penggajian.view.transaksi.approvalkoreksi.ApprovalKoreksiModel'
    ],

    controller: 'approvalkoreksi',
    viewModel: {
        type: 'approvalkoreksi'
    },
//    html: 'Hello, World!!',
    id: 'tab2b3',
    title: 'Approval Koreksi Absensi',
    closable: true,        
    layout: 'border', 
    items:[
        
    ],
    listeners:{
//        show:'onShow'
    }
    
});
