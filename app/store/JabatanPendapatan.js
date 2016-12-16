Ext.define('Penggajian.store.JabatanPendapatan', {
    extend: 'Ext.data.Store',
    storeId:'storejabatanpendapatan',
    //    autoLoad:true,
    proxy: {
        type: 'ajax',        
        url: Penggajian.Global.getApiUrl()+'jabatan/loadkomponen',
        reader: {
            type: 'json',
            
            rootProperty    : 'data',
            totalProperty   : 'record'
        }
    }
    ,
    fields: [
               
    {
        name:	'kode_jabatan'
    },
{
        name:	'kode_pendapatan'
    },
    {
        name:	'keterangan'
    },
{
        name:	'batas',type:'bool'
    },
{
        name:	'batas_min'
    },
{
        name:	'batas_max'
    },
{
        name:	'nilai_default'
    },

        
        
      
    ]
    
});

//Ext.create('app.store.department');