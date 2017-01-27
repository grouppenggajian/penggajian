Ext.define('Penggajian.store.jadwal.InputJadwal', {
    extend: 'Ext.data.Store',
    storeId:'storeinputjadwal',
    requires:[
        'Ext.ux.DataFieldTime'
    ],
    proxy: {
        type: 'ajax',        
        url: Penggajian.Global.getApiUrl()+'jadwal/loadinputjadwal',
        reader: {
            type: 'json',
            
            rootProperty    : 'data',
            totalProperty   : 'record'
        }
    }
    ,
    fields: [
        {name:'nik'},
        {name:'nama'},
        {name:'kode_jabatan'},        
        {name:'nama_jabatan'},
        {name:'tanggal'},
        {name:'hari'},
        {name:'kode_shift'},
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
})