Ext.define('Penggajian.view.transaksi.koreksiabsensi.KoreksiAbsensiModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.koreksiabsensi',
//    data: {
//        name: 'Penggajian'
//    }
stores: {
        shiftkoreksi:{
            extend: 'Ext.data.Store',
//            storeId:'storeshift',
//            requires:[
//            'Ext.ux.DataFieldTime'
//            ],
            //    autoLoad:true,
            proxy: {
                type: 'ajax',        
                url: Penggajian.Global.getApiUrl()+'koreksiabsensi/loadjadwalpegawai',
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
                name: 'jam_kerja_1',type:'time'
 
            },

            {
                name: 'jam_kerja_2',type: 'time'
            },

            {
                name: 'jam_kerja_3',type: 'time'
            },

            {
                name: 'jam_kerja_4',type: 'time'
            }
        
        
      
            ]
            
    
        }
}

});
