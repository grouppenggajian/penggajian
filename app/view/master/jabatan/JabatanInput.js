Ext.define('Penggajian.view.master.jabatan.JabatanInput', 
    {
        extend          : 'Ext.window.Window',
        title           : 'Input Jabatan',
        requires        : [
        'Penggajian.view.master.jabatan.JabatanController',
        ],
        controller:'jabatan',
        //        plugins: {
        //            ptype: 'datatip'
        //        },
        width           : 800,
        height          : 550,
        layout          : 'fit',
        autoShow        : true,
        modal           : true,
        alias           : 'widget.inputJabatan',
        id              : 'input_jabatan',
        maximizable     :false,
        
        items:[
        {
            xtype:'form',
            id:'formjabataninput',
            defaultType     : 'textfield',
            defaults        : {
                allowBlank: false,
                labelAlign: 'left',
                labelWidth: 100
            },
            monitorValid: true,
            url: null ,
            buttonAlign     : 'center',
            padding         : 5,
            style           : 'background-color: #fff;',
            border          : false,
            items:[
            {
                xtype: 'fieldset',
                title: 'Jabatan',
                defaultType: 'textfield',
                //                                width:500,
                layout: 'anchor',
                anchor: '100%',
                defaults: {
                    anchor: '100%',
                    labelAlign: 'right',
                    allowBlank: false,
                    labelWidth: 120
                },
                items: [
                {
                    name: 'kode_jabatan',
                    id: 'idjabatankode',
                    tooltip: 'Maximal 7 character Field tidak boleh kosong',
                    afterLabelTextTpl: required_css,
                    fieldStyle: 'text-transform:uppercase;',
                    fieldLabel: 'Kode',
                    anchor: '90%',
                    hiddenName:'kode_jabatan',
                    allowBlank: false  
                    ,
                    enforceMaxLength:true
                    ,
                    maxLength:7
                    ,
                    listeners: {
                        change: function(field, newValue, oldValue) {
                            field.setValue(newValue.toUpperCase());
                        }
                    }
                //                    ,maskRe:/\d/
                },
                {
                    name: 'nama_jabatan',
                    id: 'idnamajabatan',
                    //                    tooltip: 'Maximal 7 character Field tidak boleh kosong',
                    afterLabelTextTpl: required_css,
                    fieldStyle: 'text-transform:uppercase;',
                    fieldLabel: 'Jabatan',
                    anchor: '90%',
                    hiddenName:'nama_jabatan',
                    allowBlank: false  
                    ,
                    enforceMaxLength:true
                    ,
                    maxLength:45
                    ,
                    listeners: {
                        change: function(field, newValue, oldValue) {
                            field.setValue(newValue.toUpperCase());
                        }
                    }
                //                    ,maskRe:/\d/
                }
                
                ]
            },{
                xtype:'grid',
                height:300,
                //                        region:'center',                           
                id:'idpendapatanjabataninput',
                //                title:'Pendapatan',
                //                        width:450,
                store: 'storejabatanpendapataninput',
                stripeRows: true,
                loadMask: true,
                stateful:true,
                stateId:'stateGridpji'     
                ,
                //                selType: 'checkboxmodel',
                selModel: 'cellmodel',
                plugins: {
                    ptype: 'cellediting',
                    clicksToEdit: 1
                },
               
                autoScroll:true
                ,
                columns:[
                {
                
                    text: 'Pilih', 
                    dataIndex: 'pilih', 
                    align:'center',
                    xtype: 'checkcolumn',
                    width:50,
                    listeners:{
                        checkchange:function( me, rowIndex, checked, eOpts ){
                            var grid=Ext.getCmp('idpendapatanjabataninput');
                            var rec = grid.getStore().getAt(rowIndex);                          
                            if(!checked){
                                var store=grid.getStore();
                                var recedit=store.findRecord( 'kode_pendapatan', rec.get('kode_pendapatan'));
                                recedit.set('batas',false);
                                recedit.set('batas_min',null);
                                recedit.set('batas_max',null);
                                recedit.set('nilai_default',null);

                                
                            }
                            
                        }
                    }
                    
                },
                {
                    text: 'Kode',  
                    dataIndex: 'kode_pendapatan',
                    align:'center',
                    hidden:false
                },
                {
                    text: 'Pendapatan', 
                    dataIndex: 'keterangan', 
                    align:'left'
                    ,
                    flex:1
                }
                ,
                {
                
                    text: 'Batas', 
                    dataIndex: 'batas', 
                    align:'center',
                    xtype: 'checkcolumn',
                    width:60,
                    listeners:{
                        checkchange:function( me, rowIndex, checked, eOpts ){
                            var grid=Ext.getCmp('idpendapatanjabataninput');
                            var rec = grid.getStore().getAt(rowIndex);  
                            var store=grid.getStore();
                            var recedit=store.findRecord( 'kode_pendapatan', rec.get('kode_pendapatan'));
                            if(checked){
                                
                                
                                if(!rec.get('pilih')){
                                    recedit.set('batas',false);
                                    recedit.set('batas_min',null);
                                    recedit.set('batas_max',null);
                                    recedit.set('nilai_default',null);
                                }else{
                                    if(!rec.get('batas_min')){
                                        recedit.set('batas_min',0);
                                    }
                                    if(!rec.get('batas_max')){
                                        recedit.set('batas_max',0);
                                    }
                                }
                                
                                

                                
                            }else{
                                recedit.set('batas_min',null);
                                recedit.set('batas_max',null);
                            }
                            
                        }
                    }                   
                },
                {
                    text: 'Min', 
                    dataIndex: 'batas_min', 
                    align:'right',
                    xtype:'numbercolumn',
                    format:'0,0',
                    width:100
                    ,
                    editor:{
                        xtype: 'numberfield',
                        id: 'edit_batas_min',
                        allowBlank: false,   
                        hideTrigger: true,
                        minValue: 0,
                        fieldStyle: 'text-align: right;'  
                         ,enableKeyEvents:true
                        ,listeners:{
                                    keyup:function( me, e, eOpts ){
                                        console.log('jajal');
                                        //                                        readLog(me.getValue());
                                        if (me.getValue()===''|| me.getValue()===null){
                                            me.setValue('0');
                                        }
                                        var gridmodel=Ext.getCmp('idpendapatanjabataninput').getSelectionModel();
                                        var rec=gridmodel.getSelection();
                                        var recedit=rec[0];
                                        console.log(rec[0].get('batas'));//                                       
                                        if(!recedit.get('batas')){
                                            me.setValue(null);
                                        }else{
                                            if(me.getValue() > (recedit.get('batas_max')?recedit.get('batas_max'):0)){
                                                me.setValue('0');
                                                
                                            }
                                        }
                                    }
                                }
                    }
                },
                {
                    text: 'Max', 
                    dataIndex: 'batas_max', 
                    align:'right',
                    xtype:'numbercolumn',
                    format:'0,0',
                    width:100,
//                    flex: 1,
                    editor:{
                        xtype: 'numberfield',
                        id: 'edit_batas_max',
                        allowBlank: false,   
                        hideTrigger: true,
                        minValue: 0,
                        fieldStyle: 'text-align: right;' ,
                        enableKeyEvents:true
                        ,listeners:{
                                    keyup:function( me, e, eOpts ){
                                        console.log('jajal2');
                                        //                                        readLog(me.getValue());
                                        if (me.getValue()===''|| me.getValue()===null){
                                            me.setValue('0');
                                        }
                                        var gridmodel=Ext.getCmp('idpendapatanjabataninput').getSelectionModel();
                                        var rec=gridmodel.getSelection();
                                        var recedit=rec[0];
                                        console.log(rec[0].get('batas'));//                                       
                                        if(!recedit.get('batas')){
                                            me.setValue(null);
                                        }else{
                                            if(me.getValue() < (recedit.get('batas_min')?recedit.get('batas_min'):0)){
                                                me.setValue('0');
                                                
                                            }
                                        }
                                    }
                                }
                    }
                },
                {
                    text: 'Nilai', 
                    dataIndex: 'nilai_default', 
                    align:'right',
                    xtype:'numbercolumn',
                    format:'0,0',
                     width:100,
//                    flex: 1,
                    
                    editor:{
                        xtype: 'numberfield',
                        id: 'edit_nilai_default',
                        allowBlank: true,   
                        hideTrigger: true,
                        minValue: 0,
                        fieldStyle: 'text-align: right;'     
                        ,enableKeyEvents:true
                        ,listeners:{
                                    keyup:function( me, e, eOpts ){
                                        console.log('jajal2');
                                        //                                        readLog(me.getValue());
                                        if (me.getValue()===''|| me.getValue()===null){
                                            me.setValue('0');
                                        }
                                        var gridmodel=Ext.getCmp('idpendapatanjabataninput').getSelectionModel();
                                        var rec=gridmodel.getSelection();
                                        var recedit=rec[0];
                                        console.log(rec[0].get('batas'));//                                       
                                        if(recedit.get('batas')){                                           
//                                            if(me.getValue() < (recedit.get('batas_min')?recedit.get('batas_min'):0)){
//                                                me.setValue('0');                                                
//                                            }else{
                                                if(me.getValue() > (recedit.get('batas_max')?recedit.get('batas_max'):0)){
                                                    me.setValue('0');
                                                }
//                                            }
                                        }
                                        if(!recedit.get('pilih')){
                                            me.setValue(null);
                                        }
                                    }
                                }
                    }
                }
       
                ]
                    
            }
            ]
        }
        ],
        
        buttons : [
        {
            text: 'Simpan',                    
            itemId: 'btnsave',
            id:'idButtonSaveJabatan',
            iconCls: 'icon-simpan',
            formBind: true,                       
            handler: 'onSave'
        },
        {
            text: 'Batal',
            action: 'cancel',
            itemId: 'btncancel',
            iconCls: 'icon-cancel',
            handler: function(me){
                me.up('window').destroy();
            }
        }
        ]
    });