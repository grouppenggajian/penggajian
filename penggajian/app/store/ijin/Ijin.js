Ext.define('Penggajian.store.ijin.Ijin', {
    extend: 'Ext.data.Store',
    storeId:'storeijin',
    requires:[
        'Ext.ux.DataFieldTime'
    ],
//        autoSync:true,
    proxy: {
        type: 'ajax',        
        url: Penggajian.Global.getApiUrl()+'ijin/load',
        reader: {
            type: 'json',
            
            rootProperty    : 'data',
            totalProperty   : 'record'
        }
    }
    ,
    fields: [
              
    {	name:	'no_ijin'	},
{	name:	'tgl_ijin'	},
{	name:	'hari_ijin'	},
{	name:	'jam_ijin_awal'	,type: 'time'},
{	name:	'jam_ijin_akhir'	,type: 'time'},
{	name:	'nik'	},
{	name:	'nama'	},
{	name:	'jabatan'	},
{	name:	'kategori_ijin'	},
{	name:	'tipe_ijin'	},
{	name:	'keterangan'	},
{	name:	'jadwal'	},
{	name:	'jam_kerja_1'	,type: 'time'},
{	name:	'jam_kerja_2'	,type: 'time'},
{	name:	'jam_kerja_3'	,type: 'time'},
{	name:	'jam_kerja_4'	,type: 'time'},
{	name:	'create_date'	},
{	name:	'create_by'	}

        
        
      
    ]
    
});

//Ext.create('app.store.department');