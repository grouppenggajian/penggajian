Ext.define('Penggajian.view.rumus.potongan.RmsPotonganEditor', {
    extend          : 'Ext.form.Panel',
//    title           : 'Editor',
    width           : 200,
    height          : 340,
    layout          : 'vbox',        
    alias           : 'widget.potonganeditor',
    id              : 'rmspotonganeditor_id',
    floating: true,
    closeable: true,
    constrain :true,
    closeAction:'destroy',
    buttonAlign     : 'center',    
    result:null,
    twin:null,
    items:[
        {
            // Fieldset in Column 1 - collapsible via toggle button
            xtype:'fieldset',            
            title: 'Pendapatan',
            id:'potonganeditor_pendapatan',
            collapsed: true,
            checkboxToggle: true,
            defaultType: 'combo',
            defaults: {
                anchor: '100%'
            },
            layout: 'anchor',
            items :[
                {
                    id:'cmbpotonganeditor_pendapatan',
                    name:'cmbpotonganeditor_pendapatan',
                    hiddenName:'cmbpotonganeditor_pendapatan',                                                                                        
                    store: 'storependapatancombo',
                    valueField: 'kode',
                    displayField: 'keterangan',
                    typeAhead: true,
                    triggerAction: 'all' 
                }
            ],
            listeners:{
                expand:function(){
                     Ext.getCmp('potonganeditor_operator').setCollapsed ( true );
                     Ext.getCmp('potonganeditor_nilai').setCollapsed ( true );
                     Ext.getCmp('potonganeditor_harimenit').setCollapsed ( true );

                }
            }
        },{
            // Fieldset in Column 1 - collapsible via toggle button
            xtype:'fieldset',            
            title: 'Operator',
            id:'potonganeditor_operator',
            collapsed: true,
            checkboxToggle: true,
            defaultType: 'combo',
            defaults: {
                anchor: '100%'
            },
            layout: 'anchor',
            items :[
                {
                    id:'cmbpotonganeditor_operator',
                    name:'cmbpotonganeditor_operator',
                    hiddenName:'cmbpotonganeditor_operator',                                                                                        
                    store: Ext.create('Ext.data.ArrayStore',{
                            fields: [
                                {name: 'mid'},
                                {name: 'mtext'}
                            ],
                            data:dataoperator
                        }),
                   queryParam:'searchvalue',
                    valueField: 'mid',
                    displayField: 'mtext',
                    typeAhead: true,
                    triggerAction: 'all' 
                }
            ],
            listeners:{
                expand:function(){
                     Ext.getCmp('potonganeditor_pendapatan').setCollapsed ( true );
                     Ext.getCmp('potonganeditor_nilai').setCollapsed ( true );
                     Ext.getCmp('potonganeditor_harimenit').setCollapsed ( true );

                }
            }
        },
        {
            // Fieldset in Column 1 - collapsible via toggle button
            xtype:'fieldset',            
            title: 'Nilai',
            id:'potonganeditor_nilai',
            collapsed: true,
            checkboxToggle: true,
            defaultType: 'combo',
            defaults: {
                anchor: '100%'
            },
            layout: 'anchor',
            items :[
               {
                        xtype: 'numberfield',
                        id: 'cmbpotonganeditor_nilai',
                        allowBlank: true,   
                        hideTrigger: true,
                        minValue: 0,
                        fieldStyle: 'text-align: right;'     
                        ,enableKeyEvents:true
                        ,listeners:{
                                    keyup:function( me, e, eOpts ){
//                                        console.log('jajal2');
                                        //                                        readLog(me.getValue());
                                        if (me.getValue()===''|| me.getValue()===null){
                                            me.setValue('0');
                                        }
                                        
                                    }
                                }
                    }
            ],
            listeners:{
                expand:function(){
                     Ext.getCmp('potonganeditor_pendapatan').setCollapsed ( true );
                     Ext.getCmp('potonganeditor_operator').setCollapsed ( true );
                     Ext.getCmp('potonganeditor_harimenit').setCollapsed ( true );

                }
            }
        },{
            // Fieldset in Column 1 - collapsible via toggle button
            xtype:'fieldset',            
            title: 'Hari/Menit',
            id:'potonganeditor_harimenit',
            collapsed: true,
            checkboxToggle: true,
            defaultType: 'combo',
            defaults: {
                anchor: '100%'
            },
            layout: 'anchor',
            items :[
                {
                    id:'cmbpotonganeditor_harimenit',
                    name:'cmbpotonganeditor_harimenit',
                    hiddenName:'cmbpotonganeditor_harimenit',                                                                                        
                    store: createArrayStore(dataharimenit),
                    valueField: 'mid',
                    displayField: 'mtext',
                    typeAhead: true,
                    triggerAction: 'all' 
                }
            ],
            listeners:{
                expand:function(){
                     Ext.getCmp('potonganeditor_pendapatan').setCollapsed ( true );
                     Ext.getCmp('potonganeditor_nilai').setCollapsed ( true );
                     Ext.getCmp('potonganeditor_operator').setCollapsed ( true );

                }
            }
        }
        ]
    ,
    buttons : [
        {
            text: 'Add',                    
            itemId: 'btnsave',
            id:'idButtonaddpotonganeditor',
            iconCls: 'icons-add',
            formBind: true,                       
            handler: function(btn){
                var me=btn.up('panel');               
                var twinparent=Ext.getCmp(me.twin);
                var fsetoperator=Ext.getCmp('potonganeditor_operator'),
                fsetpotongan=Ext.getCmp('potonganeditor_pendapatan'),
                fsetnilai=Ext.getCmp('potonganeditor_nilai'),
                fsetharimenit=Ext.getCmp('potonganeditor_harimenit');
                
                if(!fsetpotongan.collapsed) {
                    twinparent.setValue(Ext.getCmp( 'cmbpotonganeditor_pendapatan').getValue());
                }
                if(!fsetoperator.collapsed) {
                    twinparent.setValue(Ext.getCmp( 'cmbpotonganeditor_operator').getValue());
                }
                if(!fsetnilai.collapsed) {
                    twinparent.setValue(Ext.getCmp( 'cmbpotonganeditor_nilai').getValue());
                }
                if(!fsetharimenit.collapsed) {
                    twinparent.setValue(Ext.getCmp( 'cmbpotonganeditor_harimenit').getValue());
                }                
               me.close();
            }
        },
        {
            text: 'Batal',
            action: 'cancel',
            itemId: 'btncancelpotonganeditor',
            iconCls: 'icon-cancel',
            handler: function(me){
                me.up('panel').close();
            }
        }
        ],listeners:{
             hide :function( me , eOpts ){
                 me.destroy();
             }

        },
    initComponent   : function(){
        this.callParent(arguments);
    }

});