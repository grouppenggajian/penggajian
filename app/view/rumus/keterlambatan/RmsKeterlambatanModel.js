Ext.define('Penggajian.view.rumus.keterlambatan.RmsKeterlambatanModel', {
extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.rmsketerlambatan',

    stores: {
        
        strjenisharikerja:{
            extend: 'Ext.data.Store',
            proxy: {
                type: 'ajax',        
                url: Penggajian.Global.getApiUrl()+'rumusketerlambatan/jenisharikerja',
                reader: {
                    type: 'json',
            
                    rootProperty    : 'data',
                    totalProperty   : 'record'
                }
            }
            ,
            fields: [
               {	name:	'id'	},
{	name:	'name'	}
           
          

            
        
      
            ]
            
    
        }
    }
});