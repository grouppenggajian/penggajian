Ext.define('Penggajian.view.laporan.hutangpegawai.LaporanHutangPegawaiModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.laporan-hutangpegawai-laporanhutangpegawai',
    stores: {
        storelaphutang:{
            extend: 'Ext.data.Store',
    
    //    autoLoad:true,
    proxy: {
        type: 'ajax',        
        url: Penggajian.Global.getApiUrl()+'hutangpegawai/load',
        reader: {
            type: 'json',
            
            rootProperty    : 'data',
            totalProperty   : 'record'
        }
    }
    ,
    fields: [
               
    {	name:	'no_pinjaman'	},
    {	name:	'tgl_pinjam'	},
    {	name:	'nik'	},
    {	name:	'nama'	},
    {	name:	'nama_jabatan'	},
    {	name:	'keterangan'	},
    {	name:	'nominal'	},
    {	name:	'kali_angsuran'	},
    {	name:	'jumlah_angsuran'	},
    {	name:	'saldo_pinjaman'	},
    {	name:	'status_lunas'	}

        
        
      
    ]
        },
        storelaphutangangsuran:{
            extend: 'Ext.data.Store',
    
    //    autoLoad:true,
    proxy: {
        type: 'ajax',        
        url: Penggajian.Global.getApiUrl()+'hutangpegawai/loadAngsuran',
        reader: {
            type: 'json',
            
            rootProperty    : 'data',
            totalProperty   : 'record'
        }
    }
    ,
    fields: [
               
    {	name:	'id'	},
    {	name:	'no_pinjaman'	},
    {	name:	'tgl_angsuran'	},
    {	name:	'angsuran_ke'	},
    {	name:	'jumlah_angsuran'	}


        
        
      
    ]
        }
    }

});
