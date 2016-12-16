Ext.define('Penggajian.store.JabatanPendapatanInput', {
    extend: 'Ext.data.Store',
    storeId:'storejabatanpendapataninput',
    //    autoLoad:true,
    proxy: {
        type: 'ajax',        
        url: Penggajian.Global.getApiUrl()+'jabatan/loadkomponenInput',
        reader: {
            type: 'json',
            
            rootProperty    : 'data',
            totalProperty   : 'record'
        }
    }
    ,
    fields: [
    {
        name:	'pilih',type:'bool'
    },           
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