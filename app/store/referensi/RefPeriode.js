Ext.define('Penggajian.store.referensi.RefPeriode', {
    extend: 'Ext.data.Store',
    storeId:'storerefperiode',
    //    autoLoad:true,
    loadmask:false,
    proxy: {
        type: 'ajax',        
        url: Penggajian.Global.getApiUrl()+'referensi/periode',
        reader: {
            type: 'json',
            
            rootProperty    : 'data',
            totalProperty   : 'record'
        }
    }
    ,
    fields: [
               
    {
        name: 'id'
    },
{
        name: 'tglawal'
    },

    {
        name: 'tglakhir'
    },
    {
        name: 'jmlharikerja'
    },
    {
        name: 'thbl'
    },
    {
        name: 'aktif',type:'bool'
    }
        
      
    ]
    
});

//Ext.create('app.store.department');