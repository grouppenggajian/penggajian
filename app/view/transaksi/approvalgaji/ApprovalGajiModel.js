Ext.define('Penggajian.view.transaksi.approvalgaji.ApprovalGajiModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.approvalgaji',
    stores: {
        strapprovalgaji:{
            extend: 'Ext.data.Store',
            //            storeId:'storeperiode',
            //    autoLoad:true,
            loadmask:false,
            proxy: {
                type: 'ajax',        
                url: Penggajian.Global.getApiUrl()+'approvalgaji/load',
                reader: {
                    type: 'json',
            
                    rootProperty    : 'data',
                    totalProperty   : 'record'
                }
            }
            ,
            fields: [
               
            {
                name:'thbl'
            },

            

            {
                name:'tglawal'
            },{
                name:'tglakhir'
            },

            {
                name:'totalpendapatan'
            },

            {
                name:'totalpotongan'
            },

            {
                name:'totalgaji'
            }
            
        
      
            ]
    
        }
    }

});
