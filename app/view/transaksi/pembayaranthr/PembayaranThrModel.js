Ext.define('Penggajian.view.transaksi.pembayaranthr.PembayaranThrModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.pembayaranthr',
    stores: {
        strpaymentthr:{
            extend: 'Ext.data.Store',
            //            storeId:'storeperiode',
            //    autoLoad:true,
            loadmask:false,
            proxy: {
                type: 'ajax',        
                url: Penggajian.Global.getApiUrl()+'paymentthr/load',
                reader: {
                    type: 'json',
            
                    rootProperty    : 'data',
                    totalProperty   : 'record'
                }
            }
            ,
            fields: [
               
            {
                name:'tahun'
            },

            {
                name:'nik'
            },

            {
                name:'nama'
            },

            {
                name:'jabatan'
            },

            {
                name:'tglmasuk'
            },

            {
                name:'tglthr'
            },

            {
                name:'masakerja'
            },

            {
                name:'saldo'
            }
        
      
            ]
    
        }
    }

});
