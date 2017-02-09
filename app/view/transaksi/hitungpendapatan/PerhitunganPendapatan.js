
Ext.define('Penggajian.view.transaksi.hitungpendapatan.PerhitunganPendapatan',{
    extend: 'Ext.container.Container',
    xtype: 'TabPerhitunganPendapatan',
    alias: 'widget.PerhitunganPendapatan',
    requires: [
        'Penggajian.view.transaksi.hitungpendapatan.PerhitunganPendapatanController',
        'Penggajian.view.transaksi.hitungpendapatan.PerhitunganPendapatanInput'
    ],

    controller: 'hitungpendapatan',
     id: 'tab2g1',
    title: 'Perhitungan Pendapatan',
    closable: true,        
    layout: 'border', 
    items:[
        {
            xtype:'grid',
            id:'idhitungpendapatanlist',
            region:'center',            
            store: 'storehitpendapatan',            
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
//            id:'hitungpendapatansearch',
//            store: 'storehitpendapatan',
//            width: 380,
//            emptyText: 'Search nik,nama,jabatan...'
//        },
        {
            xtype: 'textfield',
            id:'hitungpendapatansearch',
//            store: 'storejadwal',
            width: 380,
            emptyText: 'Search Nik,Nama,Jabatan...',
//            enableKeyEvents:true,
            listeners:{
                specialkey: function(field, e){
                    if (e.getKey() == e.ENTER) {
                        var ctrl=Ext.getCmp('tab2g1').getController();
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
            ,id:'hitungpendapatan_thbl'
        },
        {
            text:'Search Periode',
            iconCls:Ext.baseCSSPrefix + 'form-search-trigger',
            handler:'onSearchPeriode'//Ext.Date.format(valuedate, dateformat);
        }
        
        
        ],
            bbar: [
                {
            text:'Hitung Potongan',
            iconCls:'icon-process',
            handler:'onHitPotongan'
        },    
                {
                xtype: 'pagingtoolbar',
                displayInfo: true,
                pageSize: 10,
                store: 'storehitpendapatan'
            }
            ]
        }
    ],
            listeners:{
                show:'onShow'
                        }
});
