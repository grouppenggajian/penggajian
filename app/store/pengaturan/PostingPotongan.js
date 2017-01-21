Ext.define('Penggajian.store.pengaturan.PostingPotongan', {
    extend: 'Ext.data.Store',
    storeId:'storepostingpotongan',
//        autoSync:true,
    proxy: {
        type: 'ajax',        
        url: Penggajian.Global.getApiUrl()+'posting/potongan',
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



