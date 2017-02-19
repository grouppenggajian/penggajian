Ext.define('Penggajian.view.transaksi.approvalkoreksi.ApprovalKoreksiModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.approvalkoreksi',
    stores:{
        strapproval:{
            extend: 'Ext.data.Store',
    
            requires:[
            'Ext.ux.DataFieldTime'
            ],
            proxy: {
                type: 'ajax',        
                url: Penggajian.Global.getApiUrl()+'koreksiabsensi/loadapproval',
                reader: {
                    type: 'json',
            
                    rootProperty    : 'data',
                    totalProperty   : 'record'
                }
            }
            ,
            fields: [               
            {
                name:'tgl'
            },

            {
                name:'thbl'
            },

            {
                name:'koreksi_id'
            },

            {
                name:'x_koreksi'
            },

            {
                name:'nik'
            },

            {
                name:'nama'
            },       

            {
                name:'kode_jabatan'
            },       

            {
                name:'hari'
            },

            {
                name:'is_pantangan',
                type:'bool'
            },

            {
                name:'kode_shift'
            },        

            {
                name:'jmljamkerja'
            },

            {
                name:'jam_kerja_1',
                type: 'time'
            },

            {
                name:'jam_kerja_2',
                type: 'time'
            },

            {
                name:'jam_kerja_3',
                type: 'time'
            },

            {
                name:'jam_kerja_4',
                type: 'time'
            },

            {
                name:'masuk',
                type: 'time'
            },

            {
                name:'keluar',
                type: 'time'
            },

            {
                name:'masuk_kembali',
                type: 'time'
            },

            {
                name:'pulang',
                type: 'time'
            },

            {
                name:'lembur_masuk',
                type: 'time'
            },

            {
                name:'lembur_keluar',
                type: 'time'
            },       

            {
                name:'koreksi_by'
            },

            {
                name:'tglkoreksi'
            },

            {
                name:'keterangan'
            }
        

            ]
        }
    }

});
