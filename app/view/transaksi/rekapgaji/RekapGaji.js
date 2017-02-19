
Ext.define('Penggajian.view.transaksi.rekapgaji.RekapGaji',{
    extend: 'Ext.container.Container',
    xtype: 'TabRekapGaji',
    alias: 'widget.RekapGaji',
    requires: [
        'Penggajian.view.transaksi.rekapgaji.RekapGajiController'
    ],

    controller: 'rekapgaji',
     id: 'tab2g3',
    title: 'Rekap Gaji',
    closable: true,        
    layout: 'border', 
    items:[
        {
            xtype:'gridexporter',
            id:'idrekapgajilist',
            title:'REKAP GAJI',
            preventHeader:true,
            region:'center',            
            store: 'storerekapgaji',            
            columns: [            
            {
                text: 'NIK',  
                dataIndex: 'nik',
                align:'center',
                width:100
            },
            {
                text: 'Nama', 
                dataIndex: 'nama', 
                align:'left',
               width:200
            },
            {
                text: 'Jabatan', 
                dataIndex: 'jabatan', 
                align:'left',
               width:200
            }
       
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
            id:'rekapgajisearch',
//            store: 'storejadwal',
            width: 380,
            emptyText: 'Search Nik,Nama,Jabatan...',
//            enableKeyEvents:true,
            listeners:{
                specialkey: function(field, e){
                    if (e.getKey() == e.ENTER) {
                        var ctrl=Ext.getCmp('tab2g3').getController();
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
            ,id:'rekapgaji_thbl'
        },
        {
            text:'Search Periode',
            iconCls:Ext.baseCSSPrefix + 'form-search-trigger',
            handler:'onSearchPeriode'//Ext.Date.format(valuedate, dateformat);
        },{
            text: 'Export to ...',
//            iconCls:Ext.baseCSSPrefix + 'form-search-trigger',
            handler:'exportToXlsx'//Ext.Date.format(valuedate, dateformat);
        }
        
        
        ],
            bbar: [
                
                {
                xtype: 'pagingtoolbar',
                displayInfo: true,
                pageSize: 10,
                store: 'storerekapgaji'
            }
            ]
        }
    ],
            listeners:{
                show:'onShow'
                        }
});
