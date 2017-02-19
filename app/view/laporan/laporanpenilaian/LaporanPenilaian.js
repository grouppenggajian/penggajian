
Ext.define('Penggajian.view.laporan.laporanpenilaian.LaporanPenilaian',{
    extend: 'Ext.container.Container',
    xtype: 'TabLaporanPenilaian',
    alias: 'widget.TabLaporanPenilaian',
    requires: [
    'Penggajian.view.laporan.laporanpenilaian.LaporanPenilaianController',
    'Penggajian.view.laporan.laporanpenilaian.LaporanPenilaianModel'
    ],

    controller: 'laporan-laporanpenilaian-laporanpenilaian',
    viewModel: {
        type: 'laporan-laporanpenilaian-laporanpenilaian'
    },
    //storeagama
    id: 'tab3b',
    closable: true,        
    layout: 'fit', 
    items:[
    {
        xtype:'gridexporter',
        id:'idlapnilailist',
        title:'refagama',
        //        region:'center',
        border:true,
        preventHeader: true,

        store:'storeagama',
        
        columns: [ 
        {
            text:'agamaid',
            dataIndex:'ag_id',
            sortable:false,
            width:100,
            hidden:false,
            align:'center'
        },

        {
            text:'Nama',
            dataIndex:'ag_name',
            sortable:false,
            width:150,
            hidden:false,
            align:'left'
        }
        ],bbar:{
                                xtype:'toolbar',
                                style: 'background-color: #5FA2DD;',
                                items:[
                            
                            {
                                text:'Report',
                                iconCls:'icon-preview_report',
                                handler:function(){
                                  var storeg= Ext.getCmp('idlapnilailist').store;
//                                  var rec=storeg.re
//                                  storeg.each(function(record, index) {
//                                    console.log(record.getField('ag_id').type);
//                                  });
//                                  return;
//                                  getModel().getFields()
                                    var mdata = Ext.getCmp('idlapnilailist').exportGrid(Ext.getCmp('idlapnilailist'),'excel','RefAgama');
                                                                                       console.log(mdata);
                                            document.location= mdata;
                                }
                            }
                                ]
                            }
    }
    ],
    listeners:{
        show:function(){
            Ext.getCmp('idlapnilailist').store.load();
        }
    }
});
