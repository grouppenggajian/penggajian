Ext.define('Penggajian.view.transaksi.koreksiabsensi.KoreksiAbsensiShiftEditor', {
    extend          : 'Ext.form.Panel',
    //    title           : 'Editor',
    width           : 500,
    height          : 300,
    layout          : 'fit',        
    alias           : 'widget.koreksiabsensishifteditor',
    id              : 'koreksiabsensishifteditor_id',
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
        store: 'storekoreksiabsensishifteditor',
        stripeRows: true,
        autoScroll:true,
        stateful:true,
        stateId:'stateGridkoreksiabsensishifteditor',
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
                id:'searchfieldkoreksiabsensishifteditor',
                store: 'storekoreksiabsensishifteditor',
                width: 380,
                emptyText: 'Quick Search...'
            },'->',{
                    text: 'Batal',
                    action: 'cancel',
                    itemId: 'btncancel',
                    iconCls: 'icon-cancel',
                    handler: function(me){
                        var mew=Ext.getCmp('koreksiabsensishifteditor_id');
                        mew.close();
                    }
                }]
        },
        bbar: {
            xtype: 'pagingtoolbar',
            pageSize: 10,
            store: 'storekoreksiabsensishifteditor',
            displayInfo: true
        },
        listeners: {
            'itemdblclick': function ( grid , record , item , index , e , eOpts ) {        
                var sm = this.getSelectionModel();
                var sel = sm.getSelection();
                if (sel.length > 0) {				                    
                    var me=Ext.getCmp('koreksiabsensishifteditor_id');
                    var twinparent=Ext.getCmp(me.twin);
                        twinparent.setValue(sel[0].get('kode'));
//                        var recgrid=      Ext.getCmp('gridinputkoreksiabsensi').getSelection();
                            Ext.getCmp('koreksiabsensijam_kerja_1').setValue(sel[0].get('jam_kerja_1'));
                            Ext.getCmp('koreksiabsensijam_kerja_2').setValue(sel[0].get('jam_kerja_2'));
                            Ext.getCmp('koreksiabsensijam_kerja_3').setValue(sel[0].get('jam_kerja_3'));
                            Ext.getCmp('koreksiabsensijam_kerja_4').setValue(sel[0].get('jam_kerja_4'));
                   
                   me.close();
                   
            
                }
            }
        }
    }
    ]
    ,
    listeners:{
        hide :function( me , eOpts ){
            Ext.getCmp('searchfieldkoreksiabsensishifteditor').onClearClick();
            me.destroy();
            
        },    
   
        show:function(){
            var app = Penggajian.getApplication();
            var gridstore=app.getStore('storekoreksiabsensishifteditor');            
            gridstore.load();
            
            
        }
    

    },
    initComponent   : function(){
        this.callParent(arguments);
    }

});