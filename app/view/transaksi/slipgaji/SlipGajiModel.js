Ext.define('Penggajian.view.transaksi.slipgaji.SlipGajiModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.transaksi-slipgaji-slipgaji',
    stores: {
        storeslipgaji:{
            extend: 'Ext.data.Store',
    
            //    autoLoad:true,
            proxy: {
                type: 'ajax',        
                url: Penggajian.Global.getApiUrl()+'slipgaji/load',
                reader: {
                    type: 'json',
            
                    rootProperty    : 'data',
                    totalProperty   : 'record'
                }
            }
            ,
            fields: [
               
            {
                name: 'nik'
            },
            {
                name: 'nama'
            }
            ,
            {
                name: 'jabatan'
            }   
        
      
            ]
        }
    }

});
