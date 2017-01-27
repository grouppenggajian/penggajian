Ext.define('Penggajian.view.master.pegawai.PegawaiJadwalEditor', {
    extend          : 'Ext.form.Panel',
    //    title           : 'Editor',
    width           : 500,
    height          : 300,
    layout          : 'fit',        
    alias           : 'widget.pegawaijadwaleditor',
    id              : 'pegawaijadwaleditor_id',
//    title:'Master Shift',    
//    modal:true,
    floating: true,
    closeable: true,
    constrain :true,    
    buttonAlign     : 'center',    
    closeAction:'destroy',
    result:null,
    twin:null,
    items:[
    {
        xtype:'grid',
        store: 'storeshiftpegawaieditor',
        stripeRows: true,
        autoScroll:true,
        stateful:true,
        stateId:'stateGridpegawaijadwaleditor',
        frame: true,
        border:true,        
        columns: [
        {
            text: 'Kode',  
            dataIndex: 'kode',
            align:'center'
        },
        {
            text: 'Keterangan', 
            dataIndex: 'keterangan', 
            align:'left',
            flex: 1
        },
        {
            text: 'I/Masuk', 
            dataIndex: 'jam_kerja_1', 
            align:'left',
            xtype: 'datecolumn',   
            format:'H:i',
            flex: 1
        },
        {
            text: 'II/Keluar/Pulang', 
            dataIndex: 'jam_kerja_2', 
            align:'left',
            xtype: 'datecolumn',   
            format:'H:i',
            flex: 1
        },
        {
            text: 'III/Masuk', 
            dataIndex: 'jam_kerja_3', 
            align:'left',
            xtype: 'datecolumn',   
            format:'H:i',
            flex: 1
        },
        {
            text: 'IV/Keluar/Pulang', 
            dataIndex: 'jam_kerja_4', 
            align:'left',
            xtype: 'datecolumn',   
            format:'H:i',
            flex: 1
        }
        ],
        tbar: {
                    
            //                                regin:'north',
            xtype: 'toolbar',
            items: [{
                xtype: 'searchfield',
                id:'searchfieldshiftpegawaieditor',
                store: 'storeshiftpegawaieditor',
                width: 380,
                emptyText: 'Quick Search...'
            }]
        },
        bbar: {
            xtype: 'pagingtoolbar',
            pageSize: 10,
            store: 'storeshiftpegawaieditor',
            displayInfo: true
        },
        listeners: {
            'itemdblclick': function ( grid , record , item , index , e , eOpts ) {        
                var sm = this.getSelectionModel();
                var sel = sm.getSelection();
                if (sel.length > 0) {				                    
                    var me=Ext.getCmp('pegawaijadwaleditor_id');
                    var twinparent=Ext.getCmp(me.twin);
                        twinparent.setValue(sel[0].get('kode'));
                        var recgrid=      Ext.getCmp('gridpegawaijadwal').getSelection();
                            recgrid[0].set('jam_kerja_1',sel[0].get('jam_kerja_1'));
                            recgrid[0].set('jam_kerja_2',sel[0].get('jam_kerja_2'));
                            recgrid[0].set('jam_kerja_3',sel[0].get('jam_kerja_3'));
                            recgrid[0].set('jam_kerja_4',sel[0].get('jam_kerja_4'));
                   me.close();
                   
            
                }
            }
        }
    }
    ]
    ,
    listeners:{
        hide :function( me , eOpts ){
            Ext.getCmp('searchfieldshiftpegawaieditor').onClearClick();
            me.destroy();
            
        },    
   
        show:function(){
            var app = Penggajian.getApplication();
            var gridstore=app.getStore('storeshiftpegawaieditor');            
            gridstore.load();
            
            
        }
    

    },
    initComponent   : function(){
        this.callParent(arguments);
    }

});