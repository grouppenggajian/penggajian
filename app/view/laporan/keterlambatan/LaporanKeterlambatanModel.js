Ext.define('Penggajian.view.laporan.keterlambatan.LaporanKeterlambatanModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.laporanketerlambatan',
    stores: {
        strlapterlambat:{
            extend: 'Ext.data.Store',
            //            storeId:'storeperiode',
            //    autoLoad:true,
            loadmask:false,
            proxy: {
                type: 'ajax',        
                url: Penggajian.Global.getApiUrl()+'lapterlambat/load',
                reader: {
                    type: 'json',
            
                    rootProperty    : 'data',
                    totalProperty   : 'record'
                }
            }
            ,
            fields: [
//          tgl,nik,nama,kode_jabatan,nama_jabatan,jabatan,
//          terlambat,tidakmasukijin,tidakmasuktanpaijin,sakit,cuti
            {
                name:'tgl'
            },

            {
                name:'nik'
            },

            {
                name:'nama'
            },
            {
                name:'kode_jabatan'
            },
            {
                name:'nama_jabatan'
            },
            {
                name:'jabatan'
            },

            {
                name:'terlambat'
            },

            {
                name:'tidakmasukijin',type:'bool'
            },

            {
                name:'tidakmasuktanpaijin',type:'bool'
            },

            {
                name:'sakit',type:'bool'
            },

            {
                name:'cuti',type:'bool'
            }
        
      
            ]
        }
    }

});
