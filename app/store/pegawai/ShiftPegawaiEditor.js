Ext.define('Penggajian.store.pegawai.ShiftPegawaiEditor', {
    extend: 'Ext.data.Store',
    storeId:'storeshiftpegawaieditor',
    requires:[
        'Ext.ux.DataFieldTime'
    ],
    //    autoLoad:true,
    proxy: {
        type: 'ajax',        
        url: Penggajian.Global.getApiUrl()+'shift/loadpegawai',
        reader: {
            type: 'json',
            
            rootProperty    : 'data',
            totalProperty   : 'record'
        }
    }
    ,
    fields: [
               
    {
        name: 'kode'
    },
{
        name: 'keterangan'
    },

    {
        name: 'jam_kerja_1',type: 'time'
 
    },

    {
        name: 'jam_kerja_2', type:'time'
    },

    {
        name: 'jam_kerja_3', type:'time'
    },

    {
        name: 'jam_kerja_4', type:'time'
    }
        
        
      
    ]
    
});

//Ext.create('app.store.department');