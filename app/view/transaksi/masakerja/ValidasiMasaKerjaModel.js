Ext.define('Penggajian.view.transaksi.masakerja.ValidasiMasaKerjaModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.validasimasakerja',
    stores:{
        strvalidasimasakerja:{
            extend: 'Ext.data.Store',
            //            storeId:'storeperiode',
            //    autoLoad:true,
            loadmask:false,
            proxy: {
                type: 'ajax',        
                url: Penggajian.Global.getApiUrl()+'validasimasakerja/load',
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
                name:'gajipokok'
            },

            {
                name:'pengali'
            },

            {
                name:'pembagi'
            },

            {
                name:'create_by'
            },

            {
                name:'create_date'
            },

            {
                name:'update_by'
            },

            {
                name:'update_date'
            }
        
      
            ]
    
        },
        strperiodethrload:{
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
