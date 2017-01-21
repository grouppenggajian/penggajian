Ext.define('Penggajian.store.pengaturan.PostingPendapatan', {
    extend: 'Ext.data.Store',
    storeId:'storepostingpendapatan',
//        autoSync:true,
    proxy: {
        type: 'ajax',        
        url: Penggajian.Global.getApiUrl()+'posting/pendapatan',
        reader: {
            type: 'json',
            
            rootProperty    : 'data',
            totalProperty   : 'record'
        }
    }
    ,
    fields: [
              
    {	name:	'id'	},
{	name:	'jenis'	},
{	name:	'kode'	},
{	name:	'keterangan'	}
        
        
      
    ]
    
});

//Ext.create('app.store.department');



