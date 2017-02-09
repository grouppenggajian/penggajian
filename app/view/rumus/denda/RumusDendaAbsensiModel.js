Ext.define('Penggajian.view.rumus.denda.RumusDendaAbsensiModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.rumusdendaabsensi',
    //    data: {
    //        name: 'Penggajian'
    //    }
    stores:{
//        storekategori_absen:{
//            extend: 'Ext.data.Store',
//            //            storeId:'storeshift',
//            //            requires:[
//            //            'Ext.ux.DataFieldTime'
//            //            ],
//            //    autoLoad:true,
//            proxy: {
//                type: 'ajax',        
//                url: Penggajian.Global.getApiUrl()+'ijin/kategoriabsen?jenis=0',
//                reader: {
//                    type: 'json',
//            
//                    rootProperty    : 'data',
//                    totalProperty   : 'record'
//                }
//            }
//            ,
//            fields: [
//               
//            
//            {
//                name:	'kode'
//            },
//{
//                name:	'keterangan'
//            },
//{
//                name:	'nilai'
//            },
//{
//                name:	'loadform'
//            }
//
//            
//        
//      
//            ]
//            
//    
//        },
        strpotongan:{
            extend: 'Ext.data.Store',
            //            storeId:'storeshift',
            //            requires:[
            //            'Ext.ux.DataFieldTime'
            //            ],
            //    autoLoad:true,
            proxy: {
                type: 'ajax',        
                url: Penggajian.Global.getApiUrl()+'rumusdendaabsensi/combopotongan',
                reader: {
                    type: 'json',
            
                    rootProperty    : 'data',
                    totalProperty   : 'record'
                }
            }
            ,
            fields: [
               
            
            {
                name:	'kode'
            },
{
                name:	'keterangan'
            }

            
        
      
            ]
            
    
        },
        strrefrumus:{
            extend: 'Ext.data.Store',
            //            storeId:'storeshift',
            //            requires:[
            //            'Ext.ux.DataFieldTime'
            //            ],
            //    autoLoad:true,
            proxy: {
                type: 'ajax',        
                url: Penggajian.Global.getApiUrl()+'referensi/refrumus?isdenda=1',
                reader: {
                    type: 'json',
            
                    rootProperty    : 'data',
                    totalProperty   : 'record'
                }
            }
            ,
            fields: [
               
            
            {
                name:	'id'
            },
{
                name:	'kode'
            }

            
        
      
            ]
            
    
        },
        strkategori_ijin:{
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
               
            
            {
                name:	'kode'
            },
{
                name:	'keterangan'
            },
{
                name:	'nilai'
            },
{
                name:	'loadform'
            }

            
        
      
            ]
            
    
        },
        strjenisharikerja:{
            extend: 'Ext.data.Store',
            //            storeId:'storeshift',
            //            requires:[
            //            'Ext.ux.DataFieldTime'
            //            ],
            //    autoLoad:true,
            proxy: {
                type: 'ajax',        
                url: Penggajian.Global.getApiUrl()+'rumusdendaabsensi/jenisharikerja',
                reader: {
                    type: 'json',
            
                    rootProperty    : 'data',
                    totalProperty   : 'record'
                }
            }
            ,
            fields: [
            {
                name:	'id'
            },
{
                name:	'name'
            }
           
          

            
        
      
            ]
            
    
        },
        strdendapendapatan:{
            extend: 'Ext.data.Store',
            //            storeId:'storeshift',
            //            requires:[
            //            'Ext.ux.DataFieldTime'
            //            ],
            //    autoLoad:true,
            proxy: {
                type: 'ajax',        
                url: Penggajian.Global.getApiUrl()+'rumusdendaabsensi/loadpendapatan',
                reader: {
                    type: 'json',
            
                    rootProperty    : 'data',
                    totalProperty   : 'record'
                }
            }
            ,
            fields: [
                {
                name:	'kategori_ijin'
            },
            {
                name:	'kode'
            },
{
                name:	'keterangan'
            }
           
          

            
        
      
            ]
            
    
        },
        strdendapengali:{
            extend: 'Ext.data.Store',
            //            storeId:'storeshift',
            //            requires:[
            //            'Ext.ux.DataFieldTime'
            //            ],
            //    autoLoad:true,
            proxy: {
                type: 'ajax',        
                url: Penggajian.Global.getApiUrl()+'rumusdendaabsensi/loadpengali',
                reader: {
                    type: 'json',
            
                    rootProperty    : 'data',
                    totalProperty   : 'record'
                }
            }
            ,
            fields: [
            {
                name:	'kategori_ijin'
            },
{
                name:	'status'
            },
{
                name:	'nilaikali'
            }
           
          

            
        
      
            ]
            
    
        },
        strdenda:{
            extend: 'Ext.data.Store',
            //            storeId:'storeshift',
            //            requires:[
            //            'Ext.ux.DataFieldTime'
            //            ],
            //    autoLoad:true,
            proxy: {
                type: 'ajax',        
                url: Penggajian.Global.getApiUrl()+'rumusdendaabsensi/loaddenda',
                reader: {
                    type: 'json',
            
                    rootProperty    : 'data',
                    totalProperty   : 'record'
                }
            }
            ,
            fields: [
            {
                name:	'kode'
            },{
                name:	'tipe_ijin'
            },
{
                name:	'kode_potongan'
            },
{
                name:	'pembagi'
            }
           
          

            
        
      
            ]
            
    
        }
        
    }

});
