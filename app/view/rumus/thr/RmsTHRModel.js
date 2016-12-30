Ext.define('Penggajian.view.rumus.thr.RmsTHRModel', {
extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.rmsthr',

    stores: {
        thrpembagi:{
            extend: 'Ext.data.Store',
            proxy: {
                type: 'ajax',        
                url: Penggajian.Global.getApiUrl()+'referensi/thrpembagi',
                reader: {
                    type: 'json',
            
                    rootProperty    : 'data',
                    totalProperty   : 'record'
                },
                writer: {
                    type: 'json',
                    writeAllFields  : true,
                    rootProperty            : 'data'
                }
            }
            ,
            fields: [
               
             { name: 'id'  },
        { name: 'name'}

          

            
        
      
            ]
            
    
        }
    }
});