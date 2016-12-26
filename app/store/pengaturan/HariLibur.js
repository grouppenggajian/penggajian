Ext.define('Penggajian.store.pengaturan.HariLibur', {
    extend: 'Ext.data.Store',
    storeId:'storeharilibur',
//        autoSync:true,
    proxy: {
        type: 'ajax',        
        url: Penggajian.Global.getApiUrl()+'libur/load',
        reader: {
            type: 'json',
            
            rootProperty    : 'data',
            totalProperty   : 'record'
        }
    }
    ,
    fields: [
              
//    {	name:	'id'	},
{	name:	'tanggal'	},
{	name:	'keterangan'	},
{	name:	'create_date'	},
{	name:	'create_by'	}

        
        
      
    ]
    
});

//Ext.create('app.store.department');



