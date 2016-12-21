Ext.define('Penggajian.view.transaksi.cuti.CutiModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.cuti',

    stores: {        
        storekategori_absen:{
            extend: 'Ext.data.Store',
//            storeId:'storeshift',
//            requires:[
//            'Ext.ux.DataFieldTime'
//            ],
            //    autoLoad:true,
            proxy: {
                type: 'ajax',        
                url: Penggajian.Global.getApiUrl()+'cuti/kategoriabsen?jenis=1',
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