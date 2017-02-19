
Ext.define('Penggajian.view.transaksi.approvalthr.ApprovalThr',{
    extend: 'Ext.container.Container',
    xtype: 'TabApprovalThr',
    alias: 'widget.ApprovalThr',
    requires: [
        'Penggajian.view.transaksi.approvalthr.ApprovalThrController',
        'Penggajian.view.transaksi.approvalthr.ApprovalThrModel'
    ],

    controller: 'approvalthr',
    viewModel: {
        type: 'approvalthr'
    },
id: 'tab2h4',
    title: 'Approval THR',
    closable: true,        
    layout: 'border', 
    items:[
        {
        xtype:'grid',
        id:'idapprovalthrlist',
        region:'center',
        bind:{
            store:'{strapprovalthr}'
        },        
        columns: [
           {
            xtype: 'actioncolumn',
            header: 'approve',
            menuDisabled: true,
            sortable: false,   
            align:'center',
            width: 85,
            items: [
            {
                iconCls: 'icon-approval',
                tooltip: 'Approval',
                handler: 'onApproveClick' 
            }]
                                
        },               
            {
            text:'Tahun',
            dataIndex:'tahun',
            sortable:false,
            width:100,
            hidden:false,
            align:'center'
        },
            
         {
            text:'Tgl THR',
            dataIndex:'tglthr',
            sortable:true,
            width:100,
            hidden:false,
            align:'center'
        },{
            text:'Total Pegawai',            
            dataIndex:'totalpegawai',
            sortable:false,
            width:100,
            hidden:false,
            align:'right',
                xtype:'numbercolumn',
                format:'0,0.00'
        },{
            text:'Total Nilai',            
            dataIndex:'totalnilai',
            sortable:false,
            width:100,
            hidden:false,
            align:'right',
                xtype:'numbercolumn',
                format:'0,0.00'
        }
        ],
        
        bbar: [
            
            {
            xtype: 'pagingtoolbar',
            displayInfo: true,
            pageSize: 10,
            bind:{
                store:'{strapprovalthr}'
            }   
        }]
        }
    ],
    listeners:{
        show:'onShow'
    }
});
