Ext.define('Penggajian.view.master.pengaturan.KetentuanModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.ketentuan',

    stores: {        
        storepantangan:{
            extend: 'Ext.data.Store',
            //            storeId:'storeshift',
            //            requires:[
            //            'Ext.ux.DataFieldTime'
            //            ],
            //    autoLoad:true,
            proxy: {
                type: 'ajax',        
                url: Penggajian.Global.getApiUrl()+'ketentuan/pantangan',
                reader: {
                    type: 'json',
            
                    rootProperty    : 'data',
                    totalProperty   : 'record'
                }
            }
            ,
            fields: [               
            
            {
                name:	'hari'
            }
            ]
        },
        storeketentuan:{
            extend: 'Ext.data.Store',
            //            storeId:'storeshift',
            //            requires:[
            //            'Ext.ux.DataFieldTime'
            //            ],
            //    autoLoad:true,
            proxy: {
                type: 'ajax',        
                url: Penggajian.Global.getApiUrl()+'ketentuan/load',
                reader: {
                    type: 'json',
            
                    rootProperty    : 'data',
                    totalProperty   : 'record'
                }
            }
            ,
            fields: [               
            
            {
                name:	'toleransi'
            },{
                name:	'kuotacuti'
            },{
                name:	'periodemulai'
            },{
                name:	'periodeselesai'
            }
            ]
        }
    }

//TODO - add data, formulas and/or methods to support your view
});