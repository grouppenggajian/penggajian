Ext.define('Penggajian.store.jadwal.TukarOff', {
    extend: 'Ext.data.Store',
    storeId:'storetukaroff',
      requires:[
        'Ext.ux.DataFieldTime'
    ],
    proxy: {
        type: 'ajax',        
        url: Penggajian.Global.getApiUrl()+'tukaroff/load',
        reader: {
            type: 'json',
            
            rootProperty    : 'data',
            totalProperty   : 'record'
        }
    }
//    ,groupField: 'kode_jabatan_group'
    ,
    fields: [
      {name:'no_tukar'},
{name:'kode_jabatan'},
{name:'nama_jabatan'},
{name:'nik'},
{name:'nama'},
{name:'tanggal'},
{name:'hari'},
{name:'kode_shift'},
{name:'jam_kerja_1',type: 'time'},
{name:'jam_kerja_2',type: 'time'},
{name:'jam_kerja_3',type: 'time'},
{name:'jam_kerja_4',type: 'time'},
{name:'nik_tukar'},
{name:'nama_tukar'},
{name:'tanggal_tukar'},
{name:'hari_tukar'},
{name:'kode_shift_tukar'},
{name:'jam_kerja_1_tukar',type: 'time'},
{name:'jam_kerja_2_tukar',type: 'time'},
{name:'jam_kerja_3_tukar',type: 'time'},
{name:'jam_kerja_4_tukar',type: 'time'},
{name:'create_date'},
{name:'create_by'}
    ]
    
});

//Ext.create('app.store.department');