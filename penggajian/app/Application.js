/**
 * The main application class. An instance of this class is created by app.js when it
 * calls Ext.application(). This is the ideal place to handle application launch and
 * initialization details.
 */
Ext.define('Penggajian.Application', {
    extend: 'Ext.app.Application',
    
    name: 'Penggajian',

    stores: [
        'Jabatan','JabatanNew','Pendapatan','Potongan','Shift','JabatanPendapatan','PendapatanCombo',
        'JabatanPendapatanInput','Periode','rumus.RmsPendapatan','rumus.RmsPotongan',
        'rumus.RmsLemburPengali','rumus.RmsLemburPembagi','rumus.RmsLemburPendapatan',
        'referensi.Agama','referensi.GolonganDarah','referensi.StatusKerja',
        'referensi.Propinsi'
        ,'referensi.Kabupaten'
        ,'referensi.Kecamatan'
        ,'referensi.Kelurahan','referensi.StatusPajak','referensi.Pendidikan','JabatanCombo',
        'referensi.ImageStore','referensi.TipePinjaman'
        ,'pegawai.Pegawai','pegawai.PegawaiPendapatan','pegawai.PegawaiPendapatanEdit'
        ,'pegawai.PegawaiJadwal','pegawai.ShiftPegawaiEditor','pegawai.PegawaiTwin','pegawai.PegawaiCombo'
        ,'pegawai.PegawaiTwinJabatan'
        ,'Pinjaman','PinjamanAngsuran'
        ,'adminpanel.RoleMaster'
//        ,'adminpanel.RoleDetail'
//        ,'adminpanel.RoleDetailAll'
        ,'adminpanel.User'
        ,'jadwal.Jadwal','jadwal.InputJadwal','jadwal.JadwalShiftEditor'
        ,'jadwal.TukarOff','ijin.Ijin','ijin.Cuti'
        ,'pengaturan.HariLibur'
        // TODO: add global / shared stores here
    ],
    views:[
        'Penggajian.view.auth.Login',
    'Penggajian.view.main.Main'],
    requires:[
        'Penggajian.Global',
        'Ext.ux.SearchField',
         'Ext.ux.TwinCombo',
        'Ext.ux.TimeSpinner',
        'Ext.ux.NumericField'
//       'Penggajian.view.main.Main'
    ],
    
    launch: function () {
        // TODO - Launch the application
        // It's important to note that this type of application could use
        // any type of storage, i.e., Cookies, LocalStorage, etc.
        var loggedIn;

        // Check to see the current value of the localStorage key
//        Ext.Ajax.request({
//                url: Penggajian.Global.getApiUrl(),
//                method:'GET',
//                waitMsg:'validate user...',
//                success: function(obj, opts) {
//                    var   resp = Ext.decode(obj.responseText); 
//                    console.log(resp.message);
//                    var appm=Ext.getCmp('app-main-id');
//                    if(appm){
//                        appm.show();
//                    }else{
//                        Ext.create({
//                            xtype: 'app-main'
//                        });
//                    }
//                },
//
//                failure: function(response, opts) {
//                    console.log(response.message);
//                     Ext.create({xtype:  'login'});
//                }
//            });           

//        loggedIn = locaStorage.getItem('userid');        
//        console.log(userstatus);
        
        if(userstatus){
            var appm=Ext.getCmp('app-main-id');
            if(appm){
                appm.show();
            }else{
                Ext.create({
                    xtype: 'app-main'
                });
            }
        }else{
            var applogin=Ext.getCmp('loginid');
            if(applogin){
                applogin.show();
            }else{
                Ext.create({
                    xtype:  'login'
                });
            }
            
        }

    },

    constructor: function(config) {
        config = config || {};
        Ext.apply(this, config);

        var requires = config.requires || [];
        var store=config.stores || [];
        Ext.Loader.setPath(this.name, this.appFolder);

        if (this.paths) {
            Ext.Object.each(this.paths, function(key, value) {
                Ext.Loader.setPath(key, value);
            });
        }

        this.callParent(arguments);

//        this.eventbus = Ext.create('Ext.app.EventBus');

        var controllers = this.controllers,
            ln = controllers.length,
            i, controller;

        this.controllers = Ext.create('Ext.util.MixedCollection');

        if (this.autoCreateViewport) {
            requires.push(this.getModuleClassName('Viewport', 'view'));
        }
        
        if(userstatus){
            var formrequire=localStorage.getItem("formlocation");
                if(formrequire){
                   formrequire= Ext.decode(formrequire);
                   Ext.each(formrequire,function(rec){
                        if ( requires.indexOf(rec.formlocation) < 0 ){
                            requires.push(rec.formlocation);
                        }
                    });
                }
             
            
            
        }
        for (i = 0; i < ln; i++) {
            requires.push(this.getModuleClassName(controllers[i], 'controller'));
        }

        Ext.require(requires);

        Ext.onReady(function() {
            for (i = 0; i < ln; i++) {
                controller = this.getController(controllers[i]);
                controller.init(this);
            }

            this.onBeforeLaunch.call(this);
        }, this);
    },
    onAppUpdate: function () {
        Ext.Msg.confirm('Application Update', 'This application has an update, reload?',
            function (choice) {
                if (choice === 'yes') {
                    window.location.reload();
                }
            }
        );
    }
});
