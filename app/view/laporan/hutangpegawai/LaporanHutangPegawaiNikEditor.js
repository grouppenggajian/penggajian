Ext.define('Penggajian.view.laporan.keterlambatan.LaporanKeterlambatanNikEditor', {
    extend          : 'Ext.form.Panel',
    //    title           : 'Editor',
    width           : 500,
    height          : 300,
    layout          : 'fit',        
    alias           : 'widget.lapterlambat_nik_editor',
    id              : 'lapterlambat_nik_editor_id',
//    title:'Master Shift',    
//    modal:true,
    floating: true,
    closeable: true,
    constrain :true,    
    border:true,
    buttonAlign     : 'center',    
    closeAction:'destroy',
    result:null,
    twin:null,
    items:[
    {
        xtype:'grid',
        store: 'storepegawaitwin',
        stripeRows: true,
        autoScroll:true,
        stateful:true,
        stateId:'stateGridlapterlambatnikeditor',
        frame: true,
        border:true,        
        columns: [
        {
            text: 'NIK',  
            dataIndex: 'nik',
            align:'center'
        },
        {
            text: 'Nama', 
            dataIndex: 'nama', 
            align:'left',
            flex: 1
        },
        {
            text: 'Kode Jabatan', 
            dataIndex: 'jabatan', 
            align:'left',            
            flex: 1
        },
        {
            text: 'Nama Jabatan', 
            dataIndex: 'nama_jabatan', 
            align:'left',
            flex: 1
        }
        ],
        tbar: {
                    
            //                                regin:'north',
            xtype: 'toolbar',
            items: [{
                xtype: 'searchfield',
                id:'searchfieldlapterlambatnikeditor',
                store: 'storepegawaitwin',
                width: 380,
                emptyText: 'Quick Search...'
            },'->',{
                    text: 'Batal',
                    action: 'cancel',
                    itemId: 'btncancel',
                    iconCls: 'icon-cancel',
                    handler: function(me){
                        var mew=Ext.getCmp('lapterlambat_nik_editor_id');
                        mew.close();
                    }
                }
        ]
        },
        bbar: {
            xtype: 'pagingtoolbar',
            pageSize: 10,
            store: 'storepegawaitwin',
            displayInfo: true
        },
        listeners: {
            'itemdblclick': function ( grid , record , item , index , e , eOpts ) {        
                var sm = this.getSelectionModel();
                var sel = sm.getSelection();
                if (sel.length > 0) {				                    
                    var me=Ext.getCmp('lapterlambat_nik_editor_id');
                    var twinparent=Ext.getCmp(me.twin);
                        twinparent.setValue(sel[0].get('nik'));
                        Ext.getCmp('lapterlambat_nama').setValue(sel[0].get('nama'));
                 
                   me.close();
            
                }
            }
        }
    }
    ]
    
    ,
    listeners:{
        beforedestroy  :function( me , eOpts ){
            Ext.getCmp('searchfieldlapterlambatnikeditor').onClearClick();
//            me.destroy();
            
        }, 
        hide :function( me , eOpts ){
            Ext.getCmp('searchfieldlapterlambatnikeditor').onClearClick();
            me.destroy();
            
        },    
   
        show:function(){
            
            var app = Penggajian.getApplication();
            var gridstore=app.getStore('storepegawaitwin');            
            gridstore.load();
            
            
        }
    

    },
    initComponent   : function(){
        this.callParent(arguments);
    }

});