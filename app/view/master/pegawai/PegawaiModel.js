Ext.define('Penggajian.view.master.pegawai.PegawaiModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.pegawai',

    stores: {
        
        strmastershift:{
            requires:[
            'Ext.ux.DataFieldTime'
            ],
            extend: 'Ext.data.Store',
            proxy: {
                type: 'ajax',        
                url: Penggajian.Global.getApiUrl()+'shift/loadcombo',
                reader: {
                    type: 'json',
            
                    rootProperty    : 'data',
                    totalProperty   : 'record'
                }
            }
            ,
            
            fields: [
               
            {
                name: 'kode'
            },
            {
                name: 'keterangan'
            },

            {
                name: 'jam_kerja_1',
                type: 'time'
 
            },

            {
                name: 'jam_kerja_2', 
                type:'time'
            },

            {
                name: 'jam_kerja_3', 
                type:'time'
            },

            {
                name: 'jam_kerja_4', 
                type:'time'
            }
           
          

            
        
      
            ]
            
    
        }
    }
});