Ext.define('Penggajian.view.rumus.thr.RmsTHREditor', {
    extend          : 'Ext.form.Panel',
//    title           : 'Editor',
    width           : 200,
    height          : 340,
    layout          : 'vbox',        
    alias           : 'widget.threditor',
    id              : 'rmsthreditor_id',
    floating: true,
    closeable: true,
    constrain :true,    
    buttonAlign     : 'center',    
    closeAction:'destroy',
    result:null,
    twin:null,
    items:[
        {
            // Fieldset in Column 1 - collapsible via toggle button
            xtype:'fieldset',            
            title: 'Pendapatan',
            id:'threditor_pendapatan',
            collapsed: true,
            checkboxToggle: true,
            defaultType: 'combo',
            defaults: {
                anchor: '100%'
            },
            layout: 'anchor',
            items :[
                {
                    id:'cmbthreditor_pendapatan',
                    name:'cmbthreditor_pendapatan',
                    hiddenName:'cmbthreditor_pendapatan',                                                                                        
                    store: 'storependapatancombo',
                    valueField: 'kode',
                    displayField: 'keterangan',
                    typeAhead: true,
                    triggerAction: 'all' 
                }
            ],
            listeners:{
                expand:function(){
                     Ext.getCmp('threditor_operator').setCollapsed ( true );
                     Ext.getCmp('threditor_nilai').setCollapsed ( true );
                     Ext.getCmp('threditor_harimenit').setCollapsed ( true );

                }
            }
        },{
            // Fieldset in Column 1 - collapsible via toggle button
            xtype:'fieldset',            
            title: 'Operator',
            id:'threditor_operator',
            collapsed: true,
            checkboxToggle: true,
            defaultType: 'combo',
            defaults: {
                anchor: '100%'
            },
            layout: 'anchor',
            items :[
                {
                    id:'cmbthreditor_operator',
                    name:'cmbthreditor_operator',
                    hiddenName:'cmbthreditor_operator',                                                                                        
                    store: Ext.create('Ext.data.ArrayStore',{
                            fields: [
                                {name: 'mid'},
                                {name: 'mtext'}
                            ],
                            data:dataoperator
                        }),
                    valueField: 'mid',
                    displayField: 'mtext',
                    typeAhead: true,
                    triggerAction: 'all' 
                }
            ],
            listeners:{
                expand:function(){
                     Ext.getCmp('threditor_pendapatan').setCollapsed ( true );
                     Ext.getCmp('threditor_nilai').setCollapsed ( true );
                     Ext.getCmp('threditor_harimenit').setCollapsed ( true );

                }
            }
        },
        {
            // Fieldset in Column 1 - collapsible via toggle button
            xtype:'fieldset',            
            title: 'Nilai',
            id:'threditor_nilai',
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
                        id: 'cmbthreditor_nilai',
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
                     Ext.getCmp('threditor_pendapatan').setCollapsed ( true );
                     Ext.getCmp('threditor_operator').setCollapsed ( true );
                     Ext.getCmp('threditor_harimenit').setCollapsed ( true );

                }
            }
        },{
            // Fieldset in Column 1 - collapsible via toggle button
            xtype:'fieldset',            
            title: 'Hari/Menit',
            id:'threditor_harimenit',
            collapsed: true,
            checkboxToggle: true,
            defaultType: 'combo',
            defaults: {
                anchor: '100%'
            },
            layout: 'anchor',
            items :[
                {
                    id:'cmbthreditor_harimenit',
                    name:'cmbthreditor_harimenit',
                    hiddenName:'cmbthreditor_harimenit',                                                                                        
                    store: createArrayStore(dataharimenit),
                    valueField: 'mid',
                    displayField: 'mtext',
                    typeAhead: true,
                    triggerAction: 'all' 
                }
            ],
            listeners:{
                expand:function(){
                     Ext.getCmp('threditor_pendapatan').setCollapsed ( true );
                     Ext.getCmp('threditor_nilai').setCollapsed ( true );
                     Ext.getCmp('threditor_operator').setCollapsed ( true );

                }
            }
        }
        ]
    ,
    buttons : [
        {
            text: 'Add',                    
            itemId: 'btnsave',
            id:'idButtonaddthreditor',
            iconCls: 'icons-add',
            formBind: true,                       
            handler: function(btn){
                var me=btn.up('panel');               
                var twinparent=Ext.getCmp(me.twin);
                var fsetoperator=Ext.getCmp('threditor_operator'),
                fsetpendapatan=Ext.getCmp('threditor_pendapatan'),
                fsetnilai=Ext.getCmp('threditor_nilai'),
                fsetharimenit=Ext.getCmp('threditor_harimenit');
                
                if(!fsetpendapatan.collapsed) {
                    twinparent.setValue(Ext.getCmp( 'cmbthreditor_pendapatan').getValue());
                }
                if(!fsetoperator.collapsed) {
                    twinparent.setValue(Ext.getCmp( 'cmbthreditor_operator').getValue());
                }
                if(!fsetnilai.collapsed) {
                    twinparent.setValue(Ext.getCmp( 'cmbthreditor_nilai').getValue());
                }
                if(!fsetharimenit.collapsed) {
                    twinparent.setValue(Ext.getCmp( 'cmbthreditor_harimenit').getValue());
                }
               me.close();
            }
        },
        {
            text: 'Batal',
            action: 'cancel',
            itemId: 'btncancelthreditor',
            iconCls: 'icon-cancel',
            handler: function(me){
                me.up('panel').close();
            }
        }
        ],
        listeners:{
             hide :function( me , eOpts ){
                 me.destroy();
             }

        },
    initComponent   : function(){
        this.callParent(arguments);
    }

});