Ext.define('Penggajian.view.laporan.hut.LaporanHutKaryawanModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.laporan-hut-laporanhutkaryawan',
    stores: {
        storehut:{
            extend: 'Ext.data.Store',
    
    //    autoLoad:true,
    proxy: {
        type: 'ajax',        
        url: Penggajian.Global.getApiUrl()+'laphut/load',
        reader: {
            type: 'json',
            
            rootProperty    : 'data',
            totalProperty   : 'record'
        }
    }
    ,
    fields: [
               
    
    
    {	name:	'nik'	},
    {	name:	'nama'	},
    {	name:	'tgl_lahir'	},
    {	name:	'hut'	},
    {	name:	'hutke'	}
    
    
        
        
      
    ]
        }
    }

});
