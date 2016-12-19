Ext.define('Penggajian.view.transaksi.jadwal.TukarOffModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.tukaroff',

    stores: {
        shiftmaster:{
            extend: 'Ext.data.Store',
//            storeId:'storeshift',
            requires:[
            'Ext.ux.DataFieldTime'
            ],
            //    autoLoad:true,
            proxy: {
                type: 'ajax',        
                url: Penggajian.Global.getApiUrl()+'tukaroff/loadjadwalpegawai',
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

//TODO - add data, formulas and/or methods to support your view
});