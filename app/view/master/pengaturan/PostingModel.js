Ext.define('Penggajian.view.master.pengaturan.PostingModel', {
extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.posting',

    stores: {
        refpostingpendapatan:{
            extend: 'Ext.data.Store',
                proxy: {
                type: 'ajax',        
                url: Penggajian.Global.getApiUrl()+'posting/jenis?cat=0',
                reader: {
                    type: 'json',
            
                    rootProperty    : 'data',
                    totalProperty   : 'record'
                }
            }
            ,
            fields: [               
            
            {
                name:	'keterangan'
            }
            ]
        },
        refpostingpotongan:{
            extend: 'Ext.data.Store',
                proxy: {
                type: 'ajax',        
                url: Penggajian.Global.getApiUrl()+'posting/jenis?cat=1',
                reader: {
                    type: 'json',
            
                    rootProperty    : 'data',
                    totalProperty   : 'record'
                }
            }
            ,
            fields: [               
            
            {
                name:	'keterangan'
            }
            ]
        }
    }
});