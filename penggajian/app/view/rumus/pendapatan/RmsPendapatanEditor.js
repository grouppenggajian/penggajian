Ext.define('Penggajian.view.rumus.pendapatan.RmsPendapatanEditor', {
    extend          : 'Ext.form.Panel',
//    title           : 'Editor',
    width           : 200,
    height          : 340,
    layout          : 'vbox',        
    alias           : 'widget.pendapataneditor',
    id              : 'rmspendapataneditor_id',
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
            id:'pendapataneditor_pendapatan',
            collapsed: true,
            checkboxToggle: true,
            defaultType: 'combo',
            defaults: {
                anchor: '100%'
            },
            layout: 'anchor',
            items :[
                {
                    id:'cmbpendapataneditor_pendapatan',
                    name:'cmbpendapataneditor_pendapatan',
                    hiddenName:'cmbpendapataneditor_pendapatan',                                                                                        
                    store: 'storependapatan',
                    valueField: 'kode',
                    displayField: 'keterangan',
                    typeAhead: true,
                    triggerAction: 'all' 
                }
            ],
            listeners:{
                expand:function(){
                     Ext.getCmp('pendapataneditor_operator').setCollapsed ( true );
                     Ext.getCmp('pendapataneditor_nilai').setCollapsed ( true );

                }
            }
        },{
            // Fieldset in Column 1 - collapsible via toggle button
            xtype:'fieldset',            
            title: 'Operator',
            id:'pendapataneditor_operator',
            collapsed: true,
            checkboxToggle: true,
            defaultType: 'combo',
            defaults: {
                anchor: '100%'
            },
            layout: 'anchor',
            items :[
                {
                    id:'cmbpendapataneditor_operator',
                    name:'cmbpendapataneditor_operator',
                    hiddenName:'cmbpendapataneditor_operator',                                                                                        
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
                     Ext.getCmp('pendapataneditor_pendapatan').setCollapsed ( true );
                     Ext.getCmp('pendapataneditor_nilai').setCollapsed ( true );

                }
            }
        },
        {
            // Fieldset in Column 1 - collapsible via toggle button
            xtype:'fieldset',            
            title: 'Nilai',
            id:'pendapataneditor_nilai',
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
                        id: 'cmbpendapataneditor_nilai',
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
                     Ext.getCmp('pendapataneditor_pendapatan').setCollapsed ( true );
                     Ext.getCmp('pendapataneditor_operator').setCollapsed ( true );

                }
            }
        }
        ]
    ,
    buttons : [
        {
            text: 'Add',                    
            itemId: 'btnsave',
            id:'idButtonaddpendapataneditor',
            iconCls: 'icons-add',
            formBind: true,                       
            handler: function(btn){
                var me=btn.up('panel');               
                var twinparent=Ext.getCmp(me.twin);
                var fsetoperator=Ext.getCmp('pendapataneditor_operator'),
                fsetpendapatan=Ext.getCmp('pendapataneditor_pendapatan'),
                fsetnilai=Ext.getCmp('pendapataneditor_nilai');
                
                if(!fsetpendapatan.collapsed) {
                    twinparent.setValue(Ext.getCmp( 'cmbpendapataneditor_pendapatan').getValue());
                }
                if(!fsetoperator.collapsed) {
                    twinparent.setValue(Ext.getCmp( 'cmbpendapataneditor_operator').getValue());
                }
                if(!fsetnilai.collapsed) {
                    twinparent.setValue(Ext.getCmp( 'cmbpendapataneditor_nilai').getValue());
                }
               me.close();
            }
        },
        {
            text: 'Batal',
            action: 'cancel',
            itemId: 'btncancelpendapataneditor',
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