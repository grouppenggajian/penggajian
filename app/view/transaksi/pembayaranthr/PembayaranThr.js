
Ext.define('Penggajian.view.transaksi.pembayaranthr.PembayaranThr',{
    extend: 'Ext.container.Container',
    xtype: 'TabPembayaranThr',
    alias: 'widget.PembayaranThr',
    requires: [
        'Penggajian.view.transaksi.pembayaranthr.PembayaranThrController',
        'Penggajian.view.transaksi.pembayaranthr.PembayaranThrModel',
        'Penggajian.view.transaksi.pembayaranthr.PembayaranThrInput'
    ],

    controller: 'pembayaranthr',
    viewModel: {
        type: 'pembayaranthr'
    },

    id: 'tab2h6',
    title: 'Pembayaran THR',
    closable: true,        
    layout: 'border', 
    items:[
        {
        xtype:'grid',
        id:'idpembayaranthrlist',
        region:'center',
        bind:{
            store:'{strpaymentthr}'
        },        
        columns: [
             {
            xtype: 'actioncolumn',
            header: 'Proses Bayar',
            menuDisabled: true,
            sortable: false,   
            align:'center',
            width: 100,
            items: [
            {
                iconCls: 'icon-payment',
                tooltip: 'Payment Thr',
                handler: 'onPayment' 
            }]
                                
        },  {
            xtype: 'actioncolumn',
            header: 'View Bayar',
            menuDisabled: true,
            sortable: false,   
            align:'center',
            width: 100,
            items: [
            {
                iconCls: 'icon-preview_report',
                tooltip: 'History Payment Thr',
                handler: 'onViewBayar' 
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
            text:'NIK',
            dataIndex:'nik',
            sortable:false,
            width:100,
            hidden:false,
            align:'center'
        },

        {
            text:'Nama',
            dataIndex:'nama',
            sortable:false,
            width:150,
            hidden:false,
            align:'left'
        }, {
            text:'Jabatan',
            dataIndex:'jabatan',
            sortable:false,
            width:170,
            hidden:false,
            align:'left'
        },    
         {
            text:'Tgl Masuk',
            dataIndex:'tglmasuk',
            sortable:true,
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
            text:'Masa Kerja',
            dataIndex:'masakerja',
            sortable:false,
            width:170,
            hidden:false,
            align:'left'
        },{
            text:'Nilai Saldo',            
            dataIndex:'saldo',
            sortable:false,
            width:100,
            hidden:false,
            align:'right',
                xtype:'numbercolumn',
                format:'0,0.00'
        }
        ],
        tbar:[
            {
            xtype: 'textfield',
            id:'pembayaranthrsearch',
//            store: 'storejadwal',
            width: 380,
            emptyText: 'Search Nik,Nama,Jabatan...',
//            enableKeyEvents:true,
            listeners:{
                specialkey: function(field, e){
                    if (e.getKey() == e.ENTER) {
                        var ctrl=Ext.getCmp('tab2h6').getController();
                        ctrl.onClickSearch();
//                        var form = field.up('form').getForm();
//                        form.submit();
                    }
                }
            }
            
        },{
                    xtype: 'numberfield',
                    name: 'tahun',
                    id: 'pembayaranthrtahun',
                    fieldLabel: 'Tahun',
                    width:190,
                    labelWidth:50,
                    hiddenName:'tahun',
                    allowBlank: false,
                    value:new Date().getFullYear(),
                    minValue:2000
                   
//                    ,maskRe:/\d/
                },
                {
            text:'Search',
            iconCls:Ext.baseCSSPrefix + 'form-search-trigger',
            handler:'onClickSearch'//Ext.Date.format(valuedate, dateformat);
        },
        
        ],
        bbar: [
            
            {
            xtype: 'pagingtoolbar',
            displayInfo: true,
            pageSize: 10,
            bind:{
                store:'{strpaymentthr}'
            }   
        }]
        }
    ],
    listeners:{
        show:'onShow'
    }
});
