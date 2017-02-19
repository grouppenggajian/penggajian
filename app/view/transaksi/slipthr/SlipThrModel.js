Ext.define('Penggajian.view.transaksi.slipthr.SlipThrModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.transaksi-slipthr-slipthr',
    stores: {
        strslipthr:{
            extend: 'Ext.data.Store',
            //            storeId:'storeperiode',
            //    autoLoad:true,
            loadmask:false,
            proxy: {
                type: 'ajax',        
                url: Penggajian.Global.getApiUrl()+'slipthr/load',
                reader: {
                    type: 'json',
            
                    rootProperty    : 'data',
                    totalProperty   : 'record'
                }
            }
            ,
            fields: [
               
            {
                name:'tahun'
            },

            {
                name:'nik'
            },

            {
                name:'nama'
            },

            {
                name:'jabatan'
            },

            {
                name:'tglmasuk'
            },

            {
                name:'tglthr'
            },

            {
                name:'masakerja'
            },

            {
                name:'nilai'
            },
            {
                name:'create_by'
            },

            {
                name:'create_date'
            }
        
      
            ]
    
        },
        strslipthrperiodeload:{
            extend: 'Ext.data.Store',
//            storeId:'storeperiode',
            //    autoLoad:true,
            loadmask:false,
            proxy: {
                type: 'ajax',        
                url: Penggajian.Global.getApiUrl()+'validasimasakerja/loadperiodethr',
                reader: {
                    type: 'json',
            
                    rootProperty    : 'data',
                    totalProperty   : 'record'
                }
            }
            ,
            fields: [
               
            {
                name: 'thbl'
            },
            {
                name: 'tglthr'
            },
            {
                name: 'aktif',
                type:'bool'
            }
        
      
            ]
    
        }
    }

});
