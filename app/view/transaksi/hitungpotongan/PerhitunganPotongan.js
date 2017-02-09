
Ext.define('Penggajian.view.transaksi.hitungpotongan.PerhitunganPotongan',{
    extend: 'Ext.container.Container',
    xtype: 'TabPerhitunganPotongan',
    alias: 'widget.PerhitunganPotongan',

    requires: [
        'Penggajian.view.transaksi.hitungpotongan.PerhitunganPotonganController'
//        'Penggajian.view.transaksi.hitungpotongan.PerhitunganPotonganModel',
       ,'Penggajian.view.transaksi.hitungpotongan.PerhitunganPotonganInput'
        
    ],

    controller: 'hitungpotongan',
//    viewModel: {
//        type: 'hitungpotongan'
//    },

    id: 'tab2g2',
    title: 'Perhitungan Potongan',
    closable: true,        
    layout: 'border', 
    items:[
        {
            xtype:'grid',
            id:'idhitungpotonganlist',
            region:'center',            
            store: 'storehitpotongan',            
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
//            id:'hitungpotongansearch',
//            store: 'storehitpotongan',
//            width: 380,
//            emptyText: 'Search nik,nama,jabatan...'
//        },
        {
            xtype: 'textfield',
            id:'hitungpotongansearch',
//            store: 'storejadwal',
            width: 380,
            emptyText: 'Search Nik,Nama,Jabatan...',
//            enableKeyEvents:true,
            listeners:{
                specialkey: function(field, e){
                    if (e.getKey() == e.ENTER) {
                        var ctrl=Ext.getCmp('tab2g2').getController();
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
            ,id:'hitungpotongan_thbl'
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
                store: 'storehitpotongan'
            }
            ]
        }
    ],
            listeners:{
                show:'onShow'
                        }
});
