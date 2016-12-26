Ext.define('Penggajian.view.transaksi.ijin.IjinModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.ijin',

    stores: {
        shiftijin:{
            extend: 'Ext.data.Store',
//            storeId:'storeshift',
//            requires:[
//            'Ext.ux.DataFieldTime'
//            ],
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
            
    
        },
        storekategori_absen:{
            extend: 'Ext.data.Store',
//            storeId:'storeshift',
//            requires:[
//            'Ext.ux.DataFieldTime'
//            ],
            //    autoLoad:true,
            proxy: {
                type: 'ajax',        
                url: Penggajian.Global.getApiUrl()+'ijin/kategoriabsen?jenis=0',
                reader: {
                    type: 'json',
            
                    rootProperty    : 'data',
                    totalProperty   : 'record'
                }
            }
            ,
            fields: [
               
            {	name:	'kode'	},
{	name:	'keterangan'	},
{	name:	'nilai'	},
{	name:	'loadform'	}
          

            
        
      
            ]
            
    
        }
    }

//TODO - add data, formulas and/or methods to support your view
});