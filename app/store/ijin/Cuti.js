Ext.define('Penggajian.store.ijin.Cuti', {
    extend: 'Ext.data.Store',
    storeId:'storecuti',
//        autoSync:true,
    proxy: {
        type: 'ajax',        
        url: Penggajian.Global.getApiUrl()+'cuti/load',
        reader: {
            type: 'json',
            
            rootProperty    : 'data',
            totalProperty   : 'record'
        }
    }
    ,
    fields: [
              
    {	name:	'no_cuti'	},
{	name:	'nik'	},
{	name:	'nama'	},
{	name:	'jabatan'	},
{	name:	'kategori_cuti'	},
{	name:	'keterangan'	},
{	name:	'tgl_mulai'	},
{	name:	'tgl_selesai'	},
{	name:	'sisa_cuti'	},
{	name:	'jumlah_cuti'	},
{	name:	'sisakuota_cuti'	},
{	name:	'create_date'	},
{	name:	'create_by'	}

        
        
      
    ]
    
});

//Ext.create('app.store.department');



