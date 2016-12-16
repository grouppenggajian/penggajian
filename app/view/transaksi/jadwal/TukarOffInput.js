Ext.define('Penggajian.view.transaksi.jadwal.TukarOffInput', 
    {
        extend          : 'Ext.window.Window',
        title           : 'Input Tukar Off',
        requires        : [
        'Penggajian.view.transaksi.jadwal.TukarOffController',
//        'Penggajian.view.transaksi.jadwal.JadwalNikEditor',
//        'Penggajian.view.transaksi.jadwal.JadwalShiftEditor',
        'Ext.ux.TwinCombo'
        ],
        controller:'tukaroff',
        //        plugins: {
        //            ptype: 'datatip'
        //        },
        width           : 850,
        height          : 420,
        layout          : 'fit',
        autoShow        : true,
        modal           : true,
        alias           : 'widget.tukaroffinput',
        id              : 'tukaroff_input',
        maximizable     :false,
        closeAction:'destroy',
        items:[]
    })