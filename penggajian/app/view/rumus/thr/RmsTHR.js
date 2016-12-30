Ext.define('Penggajian.view.rumus.thr.RmsTHR',
    {
        extend: 'Ext.container.Container',
        xtype:'TabRumusThr',
        alias: 'widget.RumusThr',
        title: 'Rumus THR',        
        id: 'tab1g5',
        requires:[
        'Penggajian.view.rumus.thr.RmsTHRController',
        'Penggajian.view.rumus.thr.RmsTHREditor'
        ],
        controller:'rmsthr',
        
        height: '100%',
        closable: true,
        layout: 'border',
        items:  [
        {
            xtype:'grid',
            region:'center',   
            id:'rmsthr_grid',    
//            hideHeaders:true,
            autoScroll:true,           
            store: 'storerumusthr',
            stripeRows: true,
            loadMask: true,
            stateful:true,
            stateId:'stateGridRmsThr',
            columns:[]
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