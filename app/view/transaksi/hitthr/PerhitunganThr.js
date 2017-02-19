
Ext.define('Penggajian.view.transaksi.hitthr.PerhitunganThr',{
    extend: 'Ext.container.Container',
    xtype: 'TabPerhitunganThr',
    alias: 'widget.PerhitunganThr',
    requires: [
        'Penggajian.view.transaksi.hitthr.PerhitunganThrController',
        'Penggajian.view.transaksi.hitthr.PerhitunganThrModel',
        'Penggajian.view.transaksi.hitthr.PerhitunganThrInput'
    ],

    controller: 'hitthr',
    viewModel: {
        type: 'hitthr'
    },
    id: 'tab2h3',
    title: 'Hitung THR',
    closable: true,        
    layout: 'border', 
    items:[
        {
        xtype:'grid',
        id:'idhitthrlist',
        region:'center',
        bind:{
            store:'{strthr}'
        },        
        columns: [
                        
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
            text:'Nilai',            
            dataIndex:'nilai',
            sortable:false,
            width:100,
            hidden:false,
            align:'right',
                xtype:'numbercolumn',
                format:'0,0.00'
        },    
         {
            text:'Create By',
            dataIndex:'create_by',
            sortable:true,
            width:100,
            hidden:false,
            align:'left'
        },    
         {
            text:'Create Date',
            dataIndex:'create_date',
            sortable:true,
            width:100,
            hidden:false,
            align:'center'
        } 
        ],
        tbar:[
            {
            text:'Hitung THR',
            iconCls:'icon-process',
            handler:'onHitungTHR'
        },{
            xtype: 'textfield',
            id:'hitthrsearch',
//            store: 'storejadwal',
            width: 380,
            emptyText: 'Search Nik,Nama,Jabatan...',
//            enableKeyEvents:true,
            listeners:{
                specialkey: function(field, e){
                    if (e.getKey() == e.ENTER) {
                        var ctrl=Ext.getCmp('tab2h3').getController();
                        ctrl.onClickSearchHitTHR();
//                        var form = field.up('form').getForm();
//                        form.submit();
                    }
                }
            }
            
        },{
                    xtype: 'numberfield',
                    name: 'tahun',
                    id: 'hitthrtahun',
                    fieldLabel: 'Tahun',
                    width:190,
                    labelWidth:50,
                    hiddenName:'thbl',
                    allowBlank: false,
                    value:new Date().getFullYear(),
                    minValue:2000,
                    listeners:{
                         spinend:'onSelectTahun' 

                    }
                   
//                    ,maskRe:/\d/
                },{
            xtype: 'datefield',
            id:'hitthrtglthr',
            format:'Y-m-d',
            width:100,
            hidden:false,
            readOnly:true
            
            
        },{
            text:'Search',
            iconCls:Ext.baseCSSPrefix + 'form-search-trigger',
            handler:'onClickSearchHitTHR'//Ext.Date.format(valuedate, dateformat);
        },
        
        ],
        bbar: [
            
            {
            xtype: 'pagingtoolbar',
            displayInfo: true,
            pageSize: 10,
            bind:{
                store:'{strthr}'
            }   
        }]
        }
    ],
    listeners:{
        show:'onShow'
    }
});
