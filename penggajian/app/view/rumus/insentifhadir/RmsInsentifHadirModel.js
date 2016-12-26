Ext.define('Penggajian.view.rumus.insentifhadir.RmsInsentifHadirModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.rmsinsentifhadir',

    stores: {        
        storermsinsentifhadir:{
            extend: 'Ext.data.Store',
//            storeId:'storeshift',
//            requires:[
//            'Ext.ux.DataFieldTime'
//            ],
            //    autoLoad:true,
            proxy: {
                type: 'ajax',        
                url: Penggajian.Global.getApiUrl()+'rumusinsentifhadir/load',
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
               
            {
                name:'id'
            },

            {
                name:'kategori_ijin'
            },

            {
                name:'keterangan'
            },

            {
                name:'tipe_ijin'
            },

            {
                name:'keterangan_tipe'
            },
             {
                name:'jenisharikerja'
            },
             {
                name:'harikerja'
            },

            {
                name:'kali_ijin'
            },

            {
                name:'nilai_insentif'
            }

          

            
        
      
            ]
            
    
        },storekategori_absen_rih:{
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
               
            {	name:	'id'	},
{	name:	'name'	}
          

            
        
      
            ]
            
    
        },storejenisharikerja:{
            extend: 'Ext.data.Store',
//            storeId:'storeshift',
//            requires:[
//            'Ext.ux.DataFieldTime'
//            ],
            //    autoLoad:true,
            proxy: {
                type: 'ajax',        
                url: Penggajian.Global.getApiUrl()+'rumusinsentifhadir/jenisharikerja',
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