Ext.define('Penggajian.view.transaksi.approvalthr.ApprovalThrModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.approvalthr',
    stores:{
        strapprovalthr:{
            extend: 'Ext.data.Store',
            //            storeId:'storeperiode',
            //    autoLoad:true,
            loadmask:false,
            proxy: {
                type: 'ajax',        
                url: Penggajian.Global.getApiUrl()+'approvalthr/load',
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
                name:'tglthr'
            },

            {
                name:'totalpegawai'
            },

            {
                name:'totalnilai'
            }
            
        
      
            ]
    
        }
    }

});
