Ext.define('Penggajian.view.rumus.pendapatan.RmsPendapatan',
    {
        extend: 'Ext.container.Container',
        xtype:'TabRumusPendapatan',
        alias: 'widget.RumusPendapatan',
        title: 'Rumus Pendapatan',        
        id: 'tab1g1',
        requires:[
        'Penggajian.view.rumus.pendapatan.RmsPendapatanController',
        'Penggajian.view.rumus.pendapatan.RmsPendapatanEditor',
        'Ext.ux.TwinCombo'
        ],
        controller:'rmspendapatan',
        
        height: '100%',
        closable: true,
        layout: 'border',
        items:  [
        {
            xtype:'grid',
            region:'center',   
            id:'rmspendapatan_grid',    
//            hideHeaders:true,
            autoScroll:true,           
            store: 'storerumuspendapatan',
            stripeRows: true,
            loadMask: true,
            stateful:true,
            stateId:'stateGridRmsPendapatan',
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