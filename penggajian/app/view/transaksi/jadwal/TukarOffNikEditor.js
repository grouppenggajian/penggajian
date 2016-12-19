Ext.define('Penggajian.view.transaksi.jadwal.TukarOffNikEditor', {
    extend          : 'Ext.form.Panel',
    //    title           : 'Editor',
    width           : 500,
    height          : 300,
    layout          : 'fit',        
    alias           : 'widget.tukaroff_nik_editor',
    id              : 'tukaroff_nik_editor_id',
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
        id:'gridinputtukaroff',
        store: 'storepegawaitwinjabatan',
        stripeRows: true,
        autoScroll:true,
        stateful:true,
        stateId:'stateGridtukaroffnikeditor',
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
                id:'searchfieldtukaroffnikeditor',
                store: 'storepegawaitwinjabatan',
                width: 380,
                emptyText: 'Quick Search...'
            },'->',{
                    text: 'Batal',
                    action: 'cancel',
                    itemId: 'btncancel',
                    iconCls: 'icon-cancel',
                    handler: function(me){
                        var mew=Ext.getCmp('tukaroff_nik_editor_id');
                        mew.close();
                    }
                }
        ]
        },
        bbar: {
            xtype: 'pagingtoolbar',
            pageSize: 10,
            store: 'storepegawaitwinjabatan',
            displayInfo: true
        },
        listeners: {
            'itemdblclick': function ( grid , record , item , index , e , eOpts ) {        
                var sm = this.getSelectionModel();
                var sel = sm.getSelection();
                if (sel.length > 0) {				                    
                    var me=Ext.getCmp('tukaroff_nik_editor_id');
                    var tukarnama=Ext.getCmp('tukaroffnama');
                    var twinparent=Ext.getCmp(me.twin);
                        twinparent.setValue(sel[0].get('nik'));
                        Ext.getCmp('tukaroffnama').setValue(sel[0].get('nama'));
                        if(Ext.getCmp('tukaroffhari').getValue()){
                            var mysqtore=Ext.getCmp('tukaroff_input').getViewModel().getData().shiftmaster;
                            mysqtore.load({
                                params:{nik:sel[0].get('nik'),
                                    kode_jabatan:Ext.getCmp('tukaroffkode_jabatan').getValue(),
                                    hari:Ext.getCmp('tukaroffhari').getValue()
                                }
                                ,callback:function(records, operation, success) {
                                if(success){
                                    if(records.length>0){
                                        Ext.getCmp('tukaroffkode_shift').setValue(records[0].get('kode'));
                                        Ext.getCmp('tukaroffjam_kerja_1').setValue(records[0].get('jam_kerja_1'));
                                        Ext.getCmp('tukaroffjam_kerja_2').setValue(records[0].get('jam_kerja_2'));
                                        Ext.getCmp('tukaroffjam_kerja_3').setValue(records[0].get('jam_kerja_3'));
                                        Ext.getCmp('tukaroffjam_kerja_4').setValue(records[0].get('jam_kerja_4'));
                                    }
                                }
                            }
                            });
                        }
                        
//                        Ext.getCmp('tukaroffkode_jabatan').setValue(sel[0].get('jabatan'));
//                        
//                        var storegridtukaroffedit=Ext.getCmp('gridinputtukaroff').store;   
//                        storegridtukaroffedit.removeAll ();
//            
//                        if(Ext.getCmp('tukaroffnik').getValue()){
//                            tukarnama.set.getProxy().setExtraParam('nik',sel[0].get('nik'));
//                            storegridtukaroffedit.getProxy().setExtraParam('kode_jabatan',sel[0].get('jabatan'));
//                            storegridtukaroffedit.load();
//                        }
                   me.close();
            
                }
            }
        }
    }
    ]
    
    ,
    listeners:{
        hide :function( me , eOpts ){
            Ext.getCmp('searchfieldtukaroffnikeditor').onClearClick();
            me.destroy();
            
        }, 
        close:function(){
            Ext.getCmp('searchfieldtukaroffnikeditor').onClearClick();
        },
   
        show:function(){
            Ext.getCmp('searchfieldtukaroffnikeditor').onClearClick();
            
            var grid=Ext.getCmp('gridinputtukaroff');
            grid.store.removeAll();
                          grid.store.getProxy().setExtraParam('kode_jabatan',Ext.getCmp('tukaroffkode_jabatan').getValue());
                          grid.store.load();
//            var app = Penggajian.getApplication();
//            var gridstore=app.getStore('storepegawaitwinjabatan');            
//            gridstore.load();
            
            
        }
    

    },
    initComponent   : function(){
        this.callParent(arguments);
    }

});