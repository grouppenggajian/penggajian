Ext.define('Penggajian.view.transaksi.periodethr.PeriodeThrModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.periodethr',
    stores:{
        strperiodethr:{
            extend: 'Ext.data.Store',
//            storeId:'storeperiode',
            //    autoLoad:true,
            loadmask:false,
            proxy: {
                type: 'ajax',        
                url: Penggajian.Global.getApiUrl()+'periodethr/load',
                reader: {
                    type: 'json',
            
                    rootProperty    : 'data',
                    totalProperty   : 'record'
                }
            }
            ,
            fields: [
               
            {
                name: 'thbl'
            },
            {
                name: 'tglthr'
            },
            {
                name: 'aktif',
                type:'bool'
            }
        
      
            ]
    
        }

    //Ext.create('app.store.department');
    }

});
