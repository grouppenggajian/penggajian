Ext.define('Penggajian.store.PinjamanAngsuran', {
    extend: 'Ext.data.Store',
    storeId:'storepinjamanangsuran',
    //    autoLoad:true,
    proxy: {
        type: 'ajax',        
        url: Penggajian.Global.getApiUrl()+'pinjaman/loadAngsuran',
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
    
});

//Ext.create('app.store.department');