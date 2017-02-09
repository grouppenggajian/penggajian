Ext.define('Penggajian.store.hitunggaji.PerhitunganPotongan', {
    extend: 'Ext.data.Store',
    storeId:'storehitpotongan',
    //    autoLoad:true,
    proxy: {
        type: 'ajax',        
        url: Penggajian.Global.getApiUrl()+'hitpotongan/load',
        reader: {
            type: 'json',
            
            rootProperty    : 'data',
            totalProperty   : 'record'
        }
    }
    ,
    fields: [
               
    {
        name: 'nik'
    },
    {
        name: 'nama'
    }
     ,
    {
        name: 'jabatan'
    }   
        
      
    ]
    
});

//Ext.create('app.store.department');