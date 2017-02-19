Ext.define('Penggajian.view.transaksi.koreksigaji.KoreksiGajiModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.koreksigaji',
    stores:{
        strkoreksigaji:{
            extend: 'Ext.data.Store',
            //            storeId:'storeperiode',
            //    autoLoad:true,
            loadmask:false,
            proxy: {
                type: 'ajax',        
                url: Penggajian.Global.getApiUrl()+'koreksigaji/load',
                reader: {
                    type: 'json',
            
                    rootProperty    : 'data',
                    totalProperty   : 'record'
                }
            }
            ,
            fields: [
               
            
            {
                name:'nik'
            },

            {
                name:'nama'
            },

            {
                name:'jabatan'
            }

            
        
      
            ]
        }
        ,strkoreksigajipendapatan:{
            extend: 'Ext.data.Store',
            //            storeId:'storeperiode',
            //    autoLoad:true,
            loadmask:false,
            proxy: {
                type: 'ajax',        
                url: Penggajian.Global.getApiUrl()+'koreksigaji/pendapatanLoad',
                reader: {
                    type: 'json',
            
                    rootProperty    : 'data',
                    totalProperty   : 'record'
                }
            }
            ,
            fields: [
               
             {
                name:'thbl'
            },
            {
                name:'nik'
            },
            {
                name:'kode'
            }
,
            {
                name:'keterangan'
            },
            {
                name:'nilai'
            }
            
        
      
            ]
        },strkoreksigajipotongan:{
            extend: 'Ext.data.Store',
            //            storeId:'storeperiode',
            //    autoLoad:true,
            loadmask:false,
            proxy: {
                type: 'ajax',        
                url: Penggajian.Global.getApiUrl()+'koreksigaji/potonganLoad',
                reader: {
                    type: 'json',
            
                    rootProperty    : 'data',
                    totalProperty   : 'record'
                }
            }
            ,
            fields: [
               
             {
                name:'thbl'
            },
            {
                name:'nik'
            },
            {
                name:'kode'
            }
,
            {
                name:'keterangan'
            },
            {
                name:'nilai'
            }
            
        
      
            ]
        }
    }

});
