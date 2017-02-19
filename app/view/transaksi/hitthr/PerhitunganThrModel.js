Ext.define('Penggajian.view.transaksi.hitthr.PerhitunganThrModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.hitthr',
    stores:{
        strthr:{
            extend: 'Ext.data.Store',
            //            storeId:'storeperiode',
            //    autoLoad:true,
            loadmask:false,
            proxy: {
                type: 'ajax',        
                url: Penggajian.Global.getApiUrl()+'hitungthr/load',
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
        strhitperiodethrload:{
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

    //Ext.create('app.store.department');
    }

});
