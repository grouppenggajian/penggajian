Ext.define('Ext.ux.form.ComboValueField', {
    extend: 'Ext.form.FieldContainer',
    alias: ['widget.combovalue', 'widget.combovaluefield'],
    requires: [
    'Ext.form.field.ComboBox',
    'Ext.form.field.Text'
    ],
    layout: {
        type: 'hbox',
        align: 'stretch'
    },
    initComponent: function(){
        var me = this;        
        me.items=[
        
        {
            xtype:'textfield',
            width: 80,
            id:me.textid,
            hiddenName: me.textname,                                        
            name: me.textname,
            readOnly:true,
            value:me.textValue
        },{
//            width: 80,            
            flex: 1,
            xtype:'combo',
            id:me.comboid,
            name:me.comboname,
            hiddenName: me.comboname,                                    
            store: me.store,
            valueField: me.valueField,
            displayField: me.displayField,
            typeAhead: true,
            triggerAction: 'all',                                     
            allowBlank: me.allowblank,
            readOnly:me.readOnly,
            listeners:{
                change:function( combo, newValue, oldValue, eOpts ){                                        
                    me.onChangeCombo(combo, newValue, oldValue, eOpts);   
                    me.setValue(newValue);
                },
                select:function( combo, records, eOpts ){
                    me.onSelectCombo(combo, records, eOpts);                                               
                                                
                }
            }
        },
        ]
        me.callParent(arguments);     
    },
    onChangeCombo:function(combo, newValue, oldValue, eOpts){
        var me=this;
        var vrec=combo.findRecordByValue( newValue ) ;
        if (vrec){
            me.textValue=vrec.get(me.valueField); 
            var txt=Ext.getCmp(me.textid);
            txt.setValue(me.textValue);
        }
    },
    onSelectCombo:function(combo, records, eOpts){
        var me=this;
        if(records){            
            me.textValue=records[0].get(me.valueField);
        }
    },
    setValue:function(newValue){
      var me=this;
      me.value=newValue;
    },
    getValue:function(){
        return this.value;
    }
});


