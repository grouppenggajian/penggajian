Ext.define('Ext.ux.TwinCombo', {
    extend: 'Ext.form.field.Text',
    alias: 'widget.twincombo',
    triggers: {     
        search: {
            weight: 1,
            cls: Ext.baseCSSPrefix + 'form-arrow-trigger',
            handler: 'onTriggerClick',
            scope: 'this'
        }
    },    
    requires:['Ext.form.Panel'],
    hasSearch : false,
    paramName : 'searchvalue',
    menuSearch: null,    
    menu :null,
    //        {
    //        
    //        xtype:'panel',
    //        width: 500,
    //        height: 400,
    //        title: 'Foo',
    //        floating: true,
    //        closable : true,
    //        constrain :true,
    ////        constrainTo :this,
    //        scope:this,
    //        listeners:{
    //            onShow:function(pnl){
    //                console.log(pnl.getPosition());
    //            }
    //        }
    //    },
    initComponent: function() {
        var me = this;        
        me.callParent(arguments);       
    },
    afterRender: function(){
        this.callParent();
        this.triggerCell.item(0).setDisplayed(true);        
    },
    onChange:function(){
        
    },
    onTriggerClick : function(){
        var me = this;
       
           var  winmenu=Ext.createWidget(me.menu);
             winmenu.ownerCt = me.up('[floating]');
            winmenu.registerWithOwnerCt();
            winmenu.twin=me.id;
         
        
        
        
        winmenu.showAt([me.getPosition()[0], me.getPosition()[1] + me.getHeight()]);


    }
});