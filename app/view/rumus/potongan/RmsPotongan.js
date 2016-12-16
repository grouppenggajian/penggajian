Ext.define('Penggajian.view.rumus.potongan.RmsPotongan',
    {
        extend: 'Ext.container.Container',
        xtype:'TabRumusPotongan',
        alias: 'widget.RumusPotongan',
        title: 'Rumus Potongan',        
        id: 'tab1g2',
        requires:[
        'Penggajian.view.rumus.potongan.RmsPotonganController',
        'Penggajian.view.rumus.potongan.RmsPotonganEditor',
        'Ext.ux.TwinCombo'
        ],
        controller:'rmspotongan',
        
        height: '100%',
        closable: true,
        layout: 'border',
        items:  [
        {
            xtype:'grid',
            region:'center',   
            id:'rmspotongan_grid',    
//            hideHeaders:true,
            autoScroll:true,           
            store: 'storerumuspotongan',
            stripeRows: true,
            loadMask: true,
            stateful:true,
            stateId:'stateGridRmsPotongan',
            columns:[
           
            ]
            ,
            tbar:{
                xtype:'toolbar',
                items:[
                {
                    xtype:'button',
                    text:'Add Column',
                    iconCls:'icon-summary',
                    handler:'addColumnClick'
                },{
                    xtype:'button',
                    text:'Add Row',
                    iconCls:'icon-grid',
                    handler:'addRowClick'
                } ,{
                    xtype:'button',
                    text:'Refresh',
                    iconCls:'icon-refresh',
                    handler:'onClickRefresh'
                },{
                    xtype:'button',
                    text:'save',
                    iconCls:'icon-simpan',
                    handler:'onSaveClick'
                                                
                }
                ]
            },
            selModel: {
                selType: 'cellmodel'
            },
            plugins: {
                ptype: 'cellediting',
                clicksToEdit: 2
            }
            
          
        }
        ],
        listeners:{
        
            beforeshow:'onShow'
        }
    });