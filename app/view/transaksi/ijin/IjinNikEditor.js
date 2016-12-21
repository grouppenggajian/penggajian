Ext.define('Penggajian.view.transaksi.ijin.IjinNikEditor', {
    extend          : 'Ext.form.Panel',
    //    title           : 'Editor',
    width           : 500,
    height          : 300,
    layout          : 'fit',        
    alias           : 'widget.ijin_nik_editor',
    id              : 'ijin_nik_editor_id',
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
        stateId:'stateGridijinnikeditor',
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
                id:'searchfieldijinnikeditor',
                store: 'storepegawaitwin',
                width: 380,
                emptyText: 'Quick Search...'
            },'->',{
                    text: 'Batal',
                    action: 'cancel',
                    itemId: 'btncancel',
                    iconCls: 'icon-cancel',
                    handler: function(me){
                        var mew=Ext.getCmp('ijin_nik_editor_id');
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
                    var me=Ext.getCmp('ijin_nik_editor_id');
                    var twinparent=Ext.getCmp(me.twin);
                        twinparent.setValue(sel[0].get('nik'));
                        Ext.getCmp('ijinnama').setValue(sel[0].get('nama'));
                        Ext.getCmp('ijinkode_jabatan').setValue(sel[0].get('jabatan'));
                   if(Ext.getCmp('ijinhari').getValue()){
                            var mysqtore=Ext.getCmp('ijin_input').getViewModel().getData().shiftijin;
                            mysqtore.load({
                                params:{nik:sel[0].get('nik'),
                                    kode_jabatan:Ext.getCmp('ijinkode_jabatan').getValue(),
                                    hari:Ext.getCmp('ijinhari').getValue()
                                }
                                ,callback:function(records, operation, success) {
                                if(success){
                                    if(records.length>0){
                                        Ext.getCmp('ijinkode_shift').setValue(records[0].get('kode'));
                                        Ext.getCmp('ijinjam_kerja_1').setValue(records[0].get('jam_kerja_1'));
                                        Ext.getCmp('ijinjam_kerja_2').setValue(records[0].get('jam_kerja_2'));
                                        Ext.getCmp('ijinjam_kerja_3').setValue(records[0].get('jam_kerja_3'));
                                        Ext.getCmp('ijinjam_kerja_4').setValue(records[0].get('jam_kerja_4'));
                                    }
                                }
                            }
                            });
                        }
                   me.close();
            
                }
            }
        }
    }
    ]
    
    ,
    listeners:{
        hide :function( me , eOpts ){
            Ext.getCmp('searchfieldijinnikeditor').onClearClick();
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