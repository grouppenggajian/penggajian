Ext.define('Penggajian.view.master.pengaturan.KetentuanController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.ketentuan',
    onRefreshClick:function(btn){
       Ext.getCmp('tab1f3').getViewModel().getData().storepantangan.load();
       var storeket=Ext.getCmp('tab1f3').getViewModel().getData().storeketentuan;
       storeket.load({
           callback:function(records, operation, success){
                    if(success){
                        if(records.length>0){
                            Ext.getCmp('ketentuan_toleransi').setValue(records[0].get('toleransi'));
                            Ext.getCmp('ketentuan_kuotacuti').setValue(records[0].get('kuotacuti'));
                            Ext.getCmp('ketentuan_periodemulai').setValue(records[0].get('periodemulai'));
                            Ext.getCmp('ketentuan_periodeselesai').setValue(records[0].get('periodeselesai'));
                        }
                    }
            }
       })
    },
    onShow:function(){
        Ext.getCmp('tab1f3').getController().onRefreshClick();
    },
    onSimpanClick:function(){
        var toleransi=Ext.getCmp('ketentuan_toleransi').getValue()
       ,kuotacuti= Ext.getCmp('ketentuan_kuotacuti').getValue()
       ,periodemulai= Ext.getCmp('ketentuan_periodemulai').getValue()
       ,periodeselesai= Ext.getCmp('ketentuan_periodeselesai').getValue();
       
       var pantangan=new Array();
        var recpantangan = Ext.getCmp('ketentuanpantangan').getStore();
        recpantangan.each(function(node){
            pantangan.push(node.data);
        });
        
        execute_confirm('Are you sure to Save this ?', Penggajian.Global.getApiUrl()+'ketentuan/save', {
            toleransi:toleransi,
            kuotacuti:kuotacuti,
            periodemulai:periodemulai,
            periodeselesai:periodeselesai,
            pantangan:Ext.JSON.encode(pantangan),                                              
            _token:tokendata
        }, function(obj) {                                                            
            var retval=Ext.JSON.decode(obj.responseText);
            var me=Ext.getCmp('tab1f3').controller;
            me.onRefreshClick();
            set_message(0,retval.message);
        } );
    }
});