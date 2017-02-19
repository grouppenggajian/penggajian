
Ext.define('Penggajian.view.transaksi.approvalgaji.ApprovalGaji',{
    extend: 'Ext.container.Container',
    xtype: 'TabApprovalGaji',
    alias: 'widget.ApprovalGaji',
    requires: [
        'Penggajian.view.transaksi.approvalgaji.ApprovalGajiController',
        'Penggajian.view.transaksi.approvalgaji.ApprovalGajiModel'
    ],

    controller: 'approvalgaji',
    viewModel: {
        type: 'approvalgaji'
    },

    id: 'tab2g5',
    title: 'Approval Gaji',
    closable: true,        
    layout: 'border', 
    items:[
        {
        xtype:'grid',
        id:'idapprovalgajilist',
        region:'center',
        bind:{
            store:'{strapprovalgaji}'
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
            text:'Periode',
            dataIndex:'thbl',
            sortable:false,
            width:100,
            hidden:false,
            align:'center'
        },
            
         {
            text:'Tanggal Mulai',
            dataIndex:'tglawal',
            sortable:true,
            width:100,
            hidden:false,
            align:'center'
        }, {
            text:'Tanggal Selesai',
            dataIndex:'tglakhir',
            sortable:true,
            width:100,
            hidden:false,
            align:'center'
        },{
                text: 'Jumlah Hari Kerja', 
                dataIndex: 'jmlharikerja', 
                align:'right',
                width:200
            },{
            text:'Total Pendapatan',            
            dataIndex:'totalpendapatan',
            sortable:false,
            width:100,
            hidden:false,
            align:'right',
                xtype:'numbercolumn',
                format:'0,0.00'
        },{
            text:'Total Potongan',            
            dataIndex:'totalpotongan',
            sortable:false,
            width:100,
            hidden:false,
            align:'right',
                xtype:'numbercolumn',
                format:'0,0.00'
        },{
            text:'Total Gaji',            
            dataIndex:'totalgaji',
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
                store:'{strapprovalgaji}'
            }   
        }]
        }
    ],
    listeners:{
        show:'onShow'
    }
});
