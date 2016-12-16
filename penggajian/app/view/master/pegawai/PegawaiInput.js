Ext.define('Penggajian.view.master.pegawai.PegawaiInput', 
    {
        extend          : 'Ext.window.Window',
        title           : 'Input Pegawai',
        requires        : [
        'Penggajian.view.master.pegawai.PegawaiController',
        'Penggajian.view.master.pegawai.PegawaiPendapatan',
        'Penggajian.view.master.pegawai.PegawaiJadwal',
        'Penggajian.view.master.pegawai.MasterPendapatan',
        'Ext.ux.ImageViewField'
        
        ],
        controller:'pegawai',
        //        plugins: {
        //            ptype: 'datatip'
        //        },
        width           : 900,
        height          : 580,
        layout          : 'fit',
        autoShow        : true,
        scrollable      : true,
        modal           : true,
        alias           : 'widget.inputPegawai',
        id              : 'input_pegawai',
        maximizable     :true,

        
        items:[
        {
            xtype:'tabpanel',
            activeTab: 0,
            plain: true,
            items:[
            {
                title:'Data',
                id:'tabdatapegawai',
                autoScroll:true,
                items:[
                {
                    xtype:'form',
                    reference: 'form',
                    //            region:'west',
                    minWidth           : 700,
                    autoScroll:true,
                    id:'formpegawaiinput',
                    defaults        : {
                        allowBlank: false,
                        labelAlign: 'left',
                        labelWidth: 100
                    },
                    layout:'anchor',
                    monitorValid: true,
                    url: null ,
                    buttonAlign     : 'right',
                    padding         : 5,
                    style           : 'background-color: #fff;',
                    border          : false,
                    items:[
                    {
                        xtype: 'fieldset',
                        anchor: '100%',
                        layout: 'anchor',
                        //                height:'100%',
                        defaults: {
                            hideEmptyLabel: true
                        },
                        items: [
                        {
                
                            xtype: 'fieldcontainer',                
                            defaultType: 'textfield',
                            anchor:'100%',                
                            layout: 'hbox',
                            defaults: {
                                labelWidth: 100,
                                allowBlank: false,
                                labelAlign: 'left'
                            },
                            items: [
                            {
                                xtype:'textfield',
                                name: 'nik',
                                id: 'pegawainik',
                                tooltip: 'Maximal 8 character Field tidak boleh kosong',
                                afterLabelTextTpl: required_css,
                                fieldStyle: 'text-transform:uppercase;',
                                fieldLabel: 'NIK',
                                //                        labelWidth : '10',
                                //                        labelStyle: 'width:120px; white-space: nowrap;text-transform:propercase;', 
                                //                        anchor    : '95%',
                                hiddenName:'nik',
                                allowBlank: false  ,
                                enforceMaxLength:true,
                                maxLength:8,
                                width:210,                        
                                listeners: {
                                    change: function(field, newValue, oldValue) {
                                        field.setValue(newValue.toUpperCase());
                                    }
                                }                    
                            },{
                                xtype:'datefield',
                                name: 'tgl_masuk',
                                id: 'pegawaitgl_masuk',                        
                                afterLabelTextTpl: required_css,                        
                                fieldLabel: 'Tanggal Masuk',
                                hiddenName:'tgl_masuk',
                                allowBlank: false,            
                                format:'Y-m-d',
                                labelAlign:'right',
                                labelWidth:120,
                                width:260  
                        
                            }
                            ]
                        },
                        {
                
                            xtype: 'fieldcontainer',                
                            defaultType: 'textfield',
                            anchor:'100%',                
                            layout: 'hbox',
                            marginTop:'10',
                            defaults: {
                                labelWidth: 100,
                                allowBlank: false,
                                labelAlign: 'left'
                            },
                            items: [
                            {
                                xtype:'textfield',
                                name: 'nama',
                                id: 'pegawainama',
                                //                    tooltip: 'Maximal 7 character Field tidak boleh kosong',
                                afterLabelTextTpl: required_css,
                                fieldStyle: 'text-transform:uppercase;',
                                fieldLabel: 'Nama',
                                //                        labelStyle: 'width:120px; white-space: nowrap;text-transform:propercase;', 
                                //                        anchor    : '95%',
                                hiddenName:'nama',
                                allowBlank: false  
                                ,
                                enforceMaxLength:true
                                ,
                                maxLength:40
                                ,
                                width:450,
                                //                        labelAlign:'right',
                                //                        labelWidth:50,
                                listeners: {
                                    change: function(field, newValue, oldValue) {
                                        field.setValue(newValue.toUpperCase());
                                    }
                                }
                            //                    ,maskRe:/\d/
                            },{
                                xtype:'textfield',
                                name: 'nama_panggilan',
                                id: 'pegawainama_panggilan',
                                tooltip: 'Maximal 20 character Field tidak boleh kosong',
                                afterLabelTextTpl: required_css,
                                fieldStyle: 'text-transform:propercase;',
                                fieldLabel: 'Nama Panggilan',                        
                                hiddenName:'nama_panggilan',
                                allowBlank: false  ,
                                enforceMaxLength:true,
                                maxLength:20,
                                labelAlign:'right',
                                labelWidth:120,
                                listeners: {
                                    change: function(field, newValue, oldValue) {
                                        field.setValue(newValue.toProperCase());
                                    }
                                }
                            //                    ,maskRe:/\d/
                            }
                            ]
                        },
                        {
                
                            xtype: 'fieldcontainer',                
                            defaultType: 'textfield',
                            anchor:'100%',                
                            layout: 'hbox',
                            defaults: {
                                labelWidth: 100,
                                allowBlank: false,
                                labelAlign: 'left'
                            },
                            items: [
                            {
                                xtype:'combo',
                                name: 'jabatan',
                                id: 'pegawaijabatan',                        
                                afterLabelTextTpl: required_css,                        
                                fieldLabel: 'Jabatan',
                                anchor    : '95%',
                                hiddenName:'jabatan',
                                allowBlank: false,                                             
                                store: 'storejabatancombo',
                                valueField: 'kode_jabatan',
                                displayField: 'nama_jabatan',
                                queryParam:'searchvalue',
                                typeAhead: true,
                                triggerAction: 'all' ,
                                width:320
                            }
                            ,
                            {
                                xtype:'combo',
                                name: 'status_kerja',
                                id: 'pegawaistatus_kerja',                        
                                afterLabelTextTpl: required_css,                        
                                fieldLabel: 'Status Kerja',
                                //                        labelStyle: 'width:120px; white-space: nowrap;text-transform:propercase;', 
                                //                        anchor    : '95%',
                                hiddenName:'status_kerja',
                                allowBlank: false,                        
                                store: 'storestatuskerja',
                                valueField: 'name',
                                displayField: 'name',
                                typeAhead: true,
                                triggerAction: 'all' ,
                                labelAlign:'right',
                                width:250
                            },{
                                xtype:'combo',
                                name: 'pendidikan',
                                id: 'pegawaipendidikan',                        
                                afterLabelTextTpl: required_css,                        
                                fieldLabel: 'Pendidikan',                        
                                hiddenName:'pendidikan',
                                allowBlank: false  ,
                                store:'storependidikan' ,
                                valueField: 'kode',
                                displayField: 'name',
                                typeAhead: true,
                                triggerAction: 'all' ,
                                labelAlign:'right',
                                labelWidth:100,
                                width:280  
                            }
                            ]
                        }
                        ]
                    },
                    {
                        xtype: 'fieldset',
                        anchor: '100%',
                        layout: 'anchor',
                        //                height:'100%',
                        defaults: {
                            hideEmptyLabel: true
                        },
                        items: [
                        {
                            xtype:'textfield',
                            name: 'alamat',
                            id: 'pegawaialamat',
                            //                    tooltip: 'Maximal 7 character Field tidak boleh kosong',
                            afterLabelTextTpl: required_css,
                            fieldStyle: 'text-transform:propercase;',
                            fieldLabel: 'Alamat',
                            //                        labelStyle: 'width:120px; white-space: nowrap;text-transform:propercase;', 
                            anchor    : '100%',
                            hiddenName:'alamat',
                            allowBlank: false  ,
                            enforceMaxLength:true,
                            maxLength:50,
                            labelWidth:100,
                            //                        width:500,
                            listeners: {
                                change: function(field, newValue, oldValue) {
                                    field.setValue(newValue.toProperCase());
                                }
                            }
                        //                    ,maskRe:/\d/
                        },
                        {
                
                            xtype: 'fieldcontainer',                
                            defaultType: 'textfield',
                            anchor:'100%',                
                            layout: 'hbox',
                            marginTop:'10',
                            defaults: {
                                labelWidth: 100,
                                allowBlank: false,
                                labelAlign: 'left'
                            },
                            items: [
                    
                            {
                                xtype:'combo',
                                name: 'propinsi',
                                id: 'pegawaipropinsi',                        
                                afterLabelTextTpl: required_css,                        
                                fieldLabel: 'Propinsi',
                                anchor    : '95%',
                                hiddenName:'propinsi',
                                allowBlank: false,                                             
                                store: 'storepropinsi',
                                valueField: 'rpr_kode',
                                displayField: 'rpr_nama',
                                typeAhead: true,
                                triggerAction: 'all' ,
                                queryParam:'searchvalue',
                                width:280,
                                listeners:{
                                    select:function( combo, records, eOpts ){
                                        var gvStore=Ext.getCmp('pegawaikabupaten').store;
//                                        var cmbsearch=Ext.getCmp('pegawaipropinsi');
                                        gvStore.getProxy().setExtraParam('searchvalue',combo.getValue()) ;
                                        gvStore.load();
                                    }
                                }
                        
                            },{
                                xtype:'combo',
                                name: 'kabupaten',
                                id: 'pegawaikabupaten',                        
                                afterLabelTextTpl: required_css,                        
                                fieldLabel: 'Kabupaten',
                                anchor    : '95%',
                                hiddenName:'kabupaten',
                                allowBlank: false,                                             
                                store: 'storekabupaten',
                                valueField: 'rko_kode',
                                displayField: 'rko_nama',
                                typeAhead: true,
                                triggerAction: 'all' ,
                                width:280,
                                labelAlign:'right',
                                labelWidth: 80,
                                queryParam:'searchname',
                                
                                listeners:{
                                    select:function( combo, records, eOpts ){
                                        var gvStore=Ext.getCmp('pegawaikecamatan').store;
//                                        var cmbsearch=Ext.getCmp('pegawaikabupaten');
                                        gvStore.getProxy().setExtraParam('searchvalue',combo.getValue()) ;
                                        gvStore.load();
                                    }
                                }
                            },{
                                xtype:'combo',
                                name: 'kecamatan',
                                id: 'pegawaikecamatan',                        
                                afterLabelTextTpl: required_css,                        
                                fieldLabel: 'Kecamatan',
                                anchor    : '95%',
                                hiddenName:'kecamatan',
                                allowBlank: false,                                             
                                store: 'storekecamatan',
                                valueField: 'rkc_kode',
                                displayField: 'rkc_nama',
                                typeAhead: true,
                                triggerAction: 'all' ,
                                width:275,
                                labelWidth: 80,
                                labelAlign:'right',
                                queryParam:'searchname',
                                listeners:{
                                    select:function( combo, records, eOpts ){
                                        var gvStore=Ext.getCmp('pegawaikelurahan').store;
                                        gvStore.getProxy().setExtraParam('searchvalue',combo.getValue()) ;
                                        gvStore.load();
                                    }
                                }
                            }
                            ]
                        },
                        {
                
                            xtype: 'fieldcontainer',                
                            defaultType: 'textfield',
                            anchor:'100%',                
                            layout: 'hbox',
                            marginTop:'10',
                            defaults: {
                                labelWidth: 100,
                                allowBlank: false,
                                labelAlign: 'left'
                            },
                            items: [
                            {
                                xtype:'combo',
                                name: 'kelurahan',
                                id: 'pegawaikelurahan',                        
                                afterLabelTextTpl: required_css,                        
                                fieldLabel: 'Kelurahan',
                                anchor    : '95%',
                                hiddenName:'kelurahan',
                                allowBlank: false,                                             
                                store: 'storekelurahan',
                                valueField: 'rkl_kode',
                                displayField: 'rkl_nama',
                                typeAhead: true,
                                triggerAction: 'all' ,
                                queryParam:'searchname',
                                width:280
                            //                        ,
                            //                        labelWidth: 80,
                            //                        labelAlign:'right'
                            },{
                                //                        xtype: 'numberfield',
                                id: 'pegawaitelp',
                                name:'telp',
                                hiddenName:'telp',
                                fieldLabel: 'No.Telepon',
                                allowBlank: true,   
                                //                        hideTrigger: true,
                                //                        fieldStyle: 'text-align: center;' ,
                                labelWidth: 80,                        
                                labelAlign: 'right',
                                width:280,
                        
//                                emptyText: 'xxxx-xxxxxx',
                                maskRe: /[\d\-]/,
                                regex: /^\d{4}-\d/,
                                regexText: 'Must be in the format xxxx-'
                            },{
                                //                        xtype: 'numberfield',
                                id: 'pegawaihp',
                                name:'hp',
                                hiddenName:'hp',
                                fieldLabel: 'No.HP',
                                allowBlank: true,   
                                //                        hideTrigger: true,
                                //                        fieldStyle: 'text-align: center;' ,
                                labelWidth: 80,                        
                                labelAlign: 'right',                        
                                width:275,
//                                emptyText: 'nomor hp',
                                maskRe: /[\d]/,
                                regex: /^\d/,
                                regexText: 'Must a number'
                            }
                    
                        
                    
                            ]
                        }
                    
                
                        ]
                    },
              
                    {
                        xtype: 'fieldset',
                        flex: 1,
                        layout: 'column',
                        anchor:'100%',
                        defaults: {
                            hideEmptyLabel: false
                        },
                        items: [
                        {
                            columnWidth:0.7,
                            xtype: 'container',
                            layout: 'anchor',
                            defaults: {
                                hideEmptyLabel: true
                            },
                            items: [ 
                            {
                
                                xtype: 'fieldcontainer',                
                                defaultType: 'textfield',
                                anchor:'100%',                
                                layout: 'hbox',
                                marginTop:'10',
                                defaults: {
                                    labelWidth: 100,
                                    allowBlank: false,
                                    labelAlign: 'left'
                                },
                                items: [{
                                    xtype:'textfield',
                                    name: 'no_ktp',
                                    id: 'pegawaino_ktp',
                                    //                    tooltip: 'Maximal 7 character Field tidak boleh kosong',
                                    afterLabelTextTpl: required_css,
                                    //                        fieldStyle: 'text-transform:propercase;',
                                    fieldLabel: 'No KTP',
                                    //                        labelStyle: 'width:120px; white-space: nowrap;text-transform:propercase;', 
                                    //                        anchor    : '95%',
                                    hiddenName:'no_ktp',
                                    allowBlank: false,
                                    enforceMaxLength:true,
                                    maxLength:20,
                                    maskRe:/\d/,
                                    width:280
                                }
                                ,
                    
                                {
                                    xtype:'datefield',
                                    name: 'tgl_ktp',
                                    id: 'pegawaitgl_ktp',                        
                                    afterLabelTextTpl: required_css,//                      
                                    fieldLabel: 'Tanggal KTP',
                                    hiddenName:'tgl_ktp',
                                    allowBlank: false,     
                                    format:'Y-m-d',
                                    labelWidth: 90,                            
                                    labelAlign: 'right',
                                    width:285
                        
                        

                                }]
                            },
                            {
                
                                xtype: 'fieldcontainer',                
                                defaultType: 'textfield',
                                anchor:'100%',                
                                layout: 'hbox',
                                marginTop:'10',
                                defaults: {
                                    labelWidth: 100,
                                    allowBlank: false,
                                    labelAlign: 'left'
                                },
                                items: [
                                {
                                    xtype:'textfield',
                                    name: 'tempat_lahir',
                                    id: 'pegawaitempat_lahir',
                                    //                    tooltip: 'Maximal 7 character Field tidak boleh kosong',
                                    afterLabelTextTpl: required_css,
                                    fieldStyle: 'text-transform:propercase;',
                                    fieldLabel: 'Tempat Lahir',                        
                                    hiddenName:'tempat_lahir',
                                    allowBlank: false,
                                    enforceMaxLength:true,
                                    maxLength:45,
                                    width:280,
                                    listeners: {
                                        change: function(field, newValue, oldValue) {
                                            field.setValue(newValue.toProperCase());
                                        }
                                    }
                                //                    ,maskRe:/\d/
                                },
                                {
                                    xtype:'datefield',
                                    name: 'tgl_lahir',
                                    id: 'pegawaitgl_lahir',                        
                                    afterLabelTextTpl: required_css,                        
                                    fieldLabel: 'Tanggal Lahir',                                                
                                    hiddenName:'tgl_lahir',
                                    allowBlank: false ,
                                    format:'Y-m-d',
                                    labelWidth: 90,                            
                                    labelAlign: 'right',
                                    width:285
                       
                        
                                }
                                ]
                            },
                            {
                
                                xtype: 'fieldcontainer',                
                                defaultType: 'textfield',
                                anchor:'100%',                
                                layout: 'hbox',
                                marginTop:'10',
                                defaults: {
                                    labelWidth: 100,
                                    allowBlank: false,
                                    labelAlign: 'left'
                                },
                                items: [
                                {
                                    xtype:'combo',
                                    name: 'agama',
                                    id: 'pegawaiagama',                            
                                    afterLabelTextTpl: required_css,                            
                                    fieldLabel: 'Agama',
                                    hiddenName:'agama',
                                    allowBlank: false,                            
                                    store: 'storeagama',
                                    valueField: 'ag_name',
                                    displayField: 'ag_name',
                                    typeAhead: true,
                                    triggerAction: 'all' ,
                                    width:220                            
                                },{
                                    xtype:'combo',
                                    name: 'jns_kelamin',
                                    id: 'pegawaijns_kelamin',                            
                                    afterLabelTextTpl: required_css,                            
                                    fieldLabel: 'Kelamin',
                                    hiddenName:'jns_kelamin',
                                    allowBlank: false,                            
                                    store: createArrayStore(datakelamin),
                                    valueField: 'mid',
                                    displayField: 'mtext',
                                    typeAhead: true,
                                    triggerAction: 'all' ,
                                    labelAlign:'right',
                                    labelWidth:60,
                                    width:190                            
                                },
                                {
                                    xtype:'combo',
                                    name: 'gol_darah',
                                    id: 'pegawaigol_darah',
                                    afterLabelTextTpl: required_css,                        
                                    fieldLabel: 'Gol Darah',
                                    hiddenName:'gol_darah',
                                    allowBlank: false ,                         
                                    store: 'storegolongandarah',
                                    valueField: 'name',
                                    displayField: 'name',
                                    typeAhead: true,
                                    triggerAction: 'all' ,
                                    labelAlign:'right',
                                    labelWidth:75,
                                    width:155   
                                }
                                ]
                            },{
                
                                xtype: 'fieldcontainer',                
                                defaultType: 'textfield',
                                anchor:'100%',                
                                layout: 'hbox',
                                marginTop:'10',
                                defaults: {
                                    labelWidth: 100,
                                    allowBlank: false,
                                    labelAlign: 'left'
                                },
                                items: [
                                {
                                    xtype:'combo',
                                    name: 'status_kawin',
                                    id: 'pegawaistatus_kawin',                        
                                    afterLabelTextTpl: required_css,                        
                                    fieldLabel: 'Status Kawin',                        
                                    hiddenName:'status_kawin',
                                    allowBlank: false  ,
                                    store: createArrayStore(datastatuskawin),
                                    valueField: 'mid',
                                    displayField: 'mtext',
                                    typeAhead: true,
                                    triggerAction: 'all' ,
                                    //                            labelWidth: 90,                            
                                    //                            labelAlign: 'right',
                                    width:240
                                },{
                                    xtype:'combo',
                                    name: 'status_pajak',
                                    id: 'pegawaistatus_pajak',                        
                                    afterLabelTextTpl: required_css,                        
                                    fieldLabel: 'Status Pajak',                        
                                    hiddenName:'status_pajak',
                                    allowBlank: false  ,
                                    store:'storestatuspajak' ,
                                    valueField: 'name',
                                    displayField: 'name',
                                    typeAhead: true,
                                    triggerAction: 'all' ,
                                    labelWidth: 90,                            
                                    labelAlign: 'right',
                                    width:175
                                },
                                {
                                    
                                xtype: 'numberfield',
                                id: 'pegawailibur_perminggu',
                                name:'libur_perminggu',
                                hiddenName:'libur_perminggu',
                                fieldLabel: 'Libur/Minggu',
                                allowBlank: true,   
                                hideTrigger: true,
                                //                        fieldStyle: 'text-align: center;' ,
                                labelWidth: 90,                        
                                labelAlign: 'right',                        
                                width:150
//                                emptyText: 'nomor hp',
                                
                            
                                }
                                ]
                            },{
                
                                xtype: 'fieldcontainer',                
                                defaultType: 'textfield',
                                anchor:'100%',                
                                layout: 'hbox',
                                marginTop:'10',
                                defaults: {
                                    labelWidth: 100,
                                    allowBlank: false,
                                    labelAlign: 'left'
                                },
                                items: [
                                {
                                    xtype:'combo',
                                    name: 'status_pegawai',
                                    id: 'pegawaistatus_pegawai',                        
                                    afterLabelTextTpl: required_css,                        
                                    fieldLabel: 'Status Pegawai',
                                    hiddenName:'status_pegawai',
                                    allowBlank: false,                        
                                    store: createArrayStore(datastatuspegawai),
                                    valueField: 'mid',
                                    displayField: 'mtext',
                                    typeAhead: true,
                                    triggerAction: 'all' ,
                                    //                        labelWidth: 90,                            
                                    //                            labelAlign: 'right',
                                    width:280
                   
                                }, 
                                {
                                    xtype:'datefield',
                                    name: 'tgl_keluar',
                                    id: 'pegawaitgl_keluar',                        
                                    //                        afterLabelTextTpl: required_css,                        
                                    fieldLabel: 'Tanggal Keluar',  
                                    hiddenName:'tgl_keluar',
                                    allowBlank: true ,
                                    format:'Y-m-d',
                                    labelWidth: 90,                            
                                    labelAlign: 'right',
                                    width:285
                        
                        

                                }  
                                ]
                            }
                            ]
                    

                        },{
                            columnWidth:0.3,
                            xtype: 'form',
                            layout: 'fit',
                            bodyPadding: 5,                    
                            items: [
                            {
                                xtype:'form',
                                layout:'anchor',
                                //                        anchor:'30%',
                                //                        title:'Upload Logo',
                                //                        height:50,
                                bodyPadding: '5 5 5 5',
                                defaults: { 
                            
                                    allowBlank: true,
                                    labelWidth: 95,
                                    labelAlign: 'left',
                                    anchor:'100%'
                                },
                                items:[
                                {
                                    xtype: 'hidden',
                                    fieldLabel: 'Name',
                                    id:'pegawaiphoto',
                                    name:'photo'
                                },                                   
                                {
                                    xtype: 'filefield',
                                    emptyText: 'Select an image',
                                    fieldLabel: 'Photo',
                                    labelWidth:50,
                                    name: 'photopath',
                                    buttonText: '',
                                    buttonConfig: {
                                        iconCls: 'icon-summary'
                                    }
                                }
                                ,{
                                    xtype:'imageviewfield',
                                    id:'image_viewf',
                                    name:'imgvf',
                                    store: 'storeimage'
                                }

                                ]
                            //                        ,
                            //                        bbar:['->',
                            //                        '-',
                            //                        {
                            //                            text: 'Simpan Photo',
                            //                            iconCls: 'icon-simpan',
                            //                            handler: function(){
                            //                                var form = this.up('form').getForm();
                            //                                if(form.isValid()){
                            //                                    //                                        var imgfile=Ext.getCmp('form_file'). getValue();
                            //                                    //                                        Ext.Ajax.request({
                            //                                    form.submit({
                            //                                        url: Penggajian.Global.getApiUrl() + 'pegawai/uploadImage',
                            //                                        waitMsg: 'Uploading your photo...',
                            //                                        method:'POST',
                            //                                        params:{
                            //                                            _token:tokendata
                            //                                        },
                            //                                        success: function(fp, o) {
                            //                                               Ext.getCmp('image_viewf').store.load();
                            //                                            Ext.Msg.alert('Success', 'Your photo "' + o.result.file + '" has been uploaded.');
                            //                    
                            //                                        },
                            //                                        failure:function(fp, o) {
                            //                                        //                                                var resp=Ext.JSON.decode(o.response.responseText);
                            //                                        //                                                set_message(1, resp.msg);
                            //                                        }
                            //                                    });
                            //                                }
                            //                            }
                            //                        }
                            //                        ]
                      
                            }
                   
                     
                            ]
                        }
                        ]
                    }
                    ],
                    buttons : [

                    {
                        text: 'Simpan',                    
                        itemId: 'btnsavedatapegawai',
                        id:'btnsavedatapegawai',
                        iconCls: 'icon-simpan',
                        formBind: true,                       
                        handler: 'onSaveDataPegawai'
                    }]
                }
                ]
            },
            {
                xtype:'pegawaipendapatan'
            },
            {
                xtype:'pegawaijadwal'
            }
            ]
        }
        
        ],
        buttons : [        
        {
            text: 'Close',
            action: 'cancel',
            itemId: 'btncancel',
            iconCls: 'icon-cancel',
            handler: function(me){
                me.up('window').close();
            }
        }
        ]
        

    });
