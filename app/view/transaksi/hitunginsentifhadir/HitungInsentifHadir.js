
Ext.define('Penggajian.view.transaksi.hitunginsentifhadir.HitungInsentifHadir',{
    extend: 'Ext.container.Container',
    xtype: 'TabHitungInsentifHadir',
    alias: 'widget.HitungInsentifHadir',
    requires: [
        'Penggajian.view.transaksi.hitunginsentifhadir.HitungInsentifHadirController',
        'Penggajian.view.transaksi.hitunginsentifhadir.HitungInsentifHadirInput'
    ],

    controller: 'hitunginsentifhadir',
    
    id: 'tab2c3',
    title: 'Hitung Insentif Hadir',
    closable: true,        
    layout: 'border', 
    items:[
        {
        xtype:'grid',
        id:'idhitunginsentifhadirlist',
        region:'center',    
        
            store: 'storehitunginsentifhadir',
        
        
        columns: [       

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
        },
        {
            text:'Jabatan',
            dataIndex:'jabatan',
            sortable:false,
            width:200,
            hidden:false,
            align:'left'
        },
        {
            text:'Periode',
            dataIndex:'thbl',
            sortable:false,
            width:100,
            hidden:false,
            align:'center'
        }        
        ,{
            text:'Masuk',            
            dataIndex:'jadwal_masuk',
            sortable:false,
            width:80,
            hidden:false,
            align:'right',
                xtype:'numbercolumn',
                format:'0,0'
        }
        ,{
            text:'OFF',
            dataIndex:'jadwal_off',
            sortable:false,
            width:80,
            hidden:false,
            align:'right',
            xtype:'numbercolumn',
            format:'0,0'
            
        }
        ,{
            text:'Absen',
            dataIndex:'jumlah_absen',
            sortable:false,
            width:80,
            hidden:false,
            align:'right',
            xtype:'numbercolumn',
            format:'0,0.00'
            
        },{
            text:'Ijin',
            dataIndex:'jumlah_ijin',
            sortable:false,
            width:80,
            hidden:false,
            align:'right',
            xtype:'numbercolumn',
            format:'0,0.00'
            
        },{
            text:'Persen',
            dataIndex:'prosentase',
            sortable:false,
            width:90,
            hidden:false,
            align:'right',
            renderer: 'renderPercent'            
        },{
            text:'Nilai Insentif',
            dataIndex:'nilai_insentif',
            sortable:false,
            width:120,
            hidden:false,
            align:'right',
            xtype:'numbercolumn',
            format:'0,0.00'
            
        },{
            text:'Insentif',
            dataIndex:'insentif',
            sortable:false,
            width:100,
            hidden:false,
            align:'right',
            xtype:'numbercolumn',
            format:'0,0.00'
            
        },{
            text:'Validasi Ijin',
            dataIndex:'kategori_ijin',
            sortable:false,
            width:200,
            hidden:false,
            align:'left'
            
        }

        

        
        ],
        tbar:[
        
        {
            xtype: 'searchfield',            
            id:'hitunginsentifhadirsearch',
            store: 'storehitunginsentifhadir',         
            width: 380,
            emptyText: 'Search nik,nama,jabatan...'
        },
        '-',
        {
            xtype: 'monthfield',                                                                                                                       
            width:125,
            format:'Y-F'
            ,id:'hitunginsentifhadir_thbl'
        },
               
        {
            text:'Search Periode',
            iconCls:Ext.baseCSSPrefix + 'form-search-trigger',
            handler:'onSearchPeriode'//Ext.Date.format(valuedate, dateformat);
        }
        
        
        ],
        bbar: [
                
        {
            text:'Hitung Insentif Hadir',
            iconCls:'icon-process',
            handler:'onHitInsentifHadir'
        },        
        {
            xtype: 'pagingtoolbar',
            displayInfo: true,
            pageSize: 10,
           store: 'storehitunginsentifhadir'         
        }]    
    }
    ],
    listeners:{
        show:'onShow'
    }

    
});
