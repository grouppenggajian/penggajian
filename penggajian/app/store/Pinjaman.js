Ext.define('Penggajian.store.Pinjaman', {
    extend: 'Ext.data.Store',
    storeId:'storepinjaman',
    //    autoLoad:true,
    proxy: {
        type: 'ajax',        
        url: Penggajian.Global.getApiUrl()+'pinjaman/load',
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
    
});

//Ext.create('app.store.department');