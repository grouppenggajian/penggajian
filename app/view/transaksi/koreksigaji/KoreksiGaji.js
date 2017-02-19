
Ext.define('Penggajian.view.transaksi.koreksigaji.KoreksiGaji',{
    extend: 'Ext.container.Container',
    xtype: 'TabKoreksiGaji',
    alias: 'widget.KoreksiGaji',
    requires: [
    'Penggajian.view.transaksi.koreksigaji.KoreksiGajiController',
    'Penggajian.view.transaksi.koreksigaji.KoreksiGajiModel',
    'Penggajian.view.transaksi.koreksigaji.KoreksiGajiInput'
    ],

    controller: 'koreksigaji',
    viewModel: {
        type: 'koreksigaji'
    },
    id: 'tab2g4',
    title: 'Koreksi Gaji',
    closable: true,        
    layout: 'border', 
    items:[
    {
        xtype:'grid',
        id:'idkoreksigajilist',
        region:'center',    
        bind:{
            store: '{strkoreksigaji}'            
        },
            
        columns: [   
//        {
//            xtype: 'actioncolumn',
//            header: 'Koreksi',
//            menuDisabled: true,
//            sortable: false,   
//            align:'center',
//            width: 85,
//            items: [
//            {
//                iconCls: 'icon-processedit',
//                tooltip: 'Koreksi Row',
//                handler: 'onKoreksiClick' 
//            }]
//                                
//        },  
//        {
//            text: 'NIK',  
//            dataIndex: 'nik',
//            align:'center',
//            width:100
//        },
//        {
//            text: 'Nama', 
//            dataIndex: 'nama', 
//            align:'left',
//            width:200
//        },
//        {
//            text: 'Jabatan', 
//            dataIndex: 'jabatan', 
//            align:'left',
//            width:200
//        }
       
        ],
        tbar:[
        
        //        {
        //            xtype: 'searchfield',            
        //            id:'rekapgajisearch',
        //            store: 'storerekapgaji',
        //            width: 380,
        //            emptyText: 'Search nik,nama,jabatan...'
        //        },
        {
            xtype: 'textfield',
            id:'koreksigajisearch',
            //            store: 'storejadwal',
            width: 380,
            emptyText: 'Search Nik,Nama,Jabatan...',
            //            enableKeyEvents:true,
            listeners:{
                specialkey: function(field, e){
                    if (e.getKey() == e.ENTER) {
                        var ctrl=Ext.getCmp('tab2g4').getController();
                        ctrl.onSearchPeriode();
                    //                        var form = field.up('form').getForm();
                    //                        form.submit();
                    }
                }
            }
            
        },
        '-',
        {
            xtype: 'monthfield',                                                                                                                       
            width:125,
            format:'Y-F'
            ,
            id:'koreksigajithbl'
        },
        {
            text:'Search Periode',
            iconCls:Ext.baseCSSPrefix + 'form-search-trigger',
            handler:'onSearchPeriode'//Ext.Date.format(valuedate, dateformat);
        }
        
        
        ],
        bbar: [
                
        {
            xtype: 'pagingtoolbar',
            displayInfo: true,
            pageSize: 10,
            bind:{
                store: '{strkoreksigaji}'            
            }
        }
        ]
    }
    ],
    listeners:{
        show:'onShow'
    }
});
