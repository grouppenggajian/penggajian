Ext.define('Ext.ux.MasterPanel', {
    extend: 'Ext.panel.Panel',    
    alias: 'widget.masterpanel',
    autoShow: true,    
    region: 'center',
    margins: '5 5 5 5',
    layout: 'fit',
    idgrid:'grid_id',
    stateIdgrid:'formmastergrid_id',
    columnsgrid:[],
    storegrid:null,
    initComponent : function(){
        this.items=[            
        {                        
            xtype:'grid',
            id:this.idgrid,
            stateful:true,
            stateId:this.stateIdgrid,
            store: this.storegrid,//Ext.data.StoreManager.lookup('mst_account_kel_store'),
            stripeRows: true,
            loadMask: true
            ,
            columns:this.columnsgrid
            ,
            tbar:{
                xtype: 'toolbar',
//                padding:'2 0 2 5',
                items: [{
                    xtype: 'button',
                    text: 'Add',
                    iconCls: 'icons-add',
                    onClick: this.onClickAdd
                },'-',{
                    width: 300,
                    xtype: 'searchfield',
                    store: this.storegrid,
                    emptyText: 'Quick Search...'
                }
                ]
            }
            ,
            bbar:{                        
                xtype: 'pagingtoolbar',
                store: this.storegrid,
                pageSize: ENDPAGE,
                displayInfo: true
            }
        }
                
        ]
        this.callParent();        
    },
    onClickAdd:function(){
        console.log('testklik');
    }
});