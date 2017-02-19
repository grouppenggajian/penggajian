
Ext.define('Penggajian.view.transaksi.periodethr.PeriodeThr',{
    extend: 'Ext.container.Container',
    xtype: 'TabPeriodeThr',
    alias: 'widget.PeriodeThr',
    requires: [
    'Penggajian.view.transaksi.periodethr.PeriodeThrController',
    'Penggajian.view.transaksi.periodethr.PeriodeThrModel',
    'Penggajian.view.transaksi.periodethr.PeriodeThrInput'
    ],

    controller: 'periodethr',
    viewModel: {
        type: 'periodethr'
    },

    title: 'Periode THR',
    id: 'tab2h1',
    closable: true,        
    layout: 'border', 
    items:[
    {
        xtype:'grid',
        id:'idperiodethrlist',
        region:'center',
        bind:{
            store:'{strperiodethr}'
        },        
        columns: [
        {
            xtype: 'actioncolumn',
            header: 'Action',
            menuDisabled: true,
            sortable: false,   
            align:'center',
            width: 85,
            items: [
            {
                iconCls: 'icon-edit-record',
                tooltip: 'Edit Row',
                handler: 'onEditClick' 
            },{
                getClass: function(v, meta, rec) {
                    return 'icon-delete';
                },
                getTip: function(v, meta, rec) {
                    return 'Delete Plant';
                },
                handler: function(grid, rowIndex, colIndex) {
                    var rec = grid.getStore().getAt(rowIndex);
                    Ext.Msg.show({
                        title: 'Confirm',
                        msg: 'Are you sure delete selected row ?',
                        buttons: Ext.Msg.YESNO,
                        icon: Ext.Msg.QUESTION,
                        fn: function(btn){
                            if (btn == 'yes') {
                                                                
                                var data = rec.data;
                                var vthbl=rec.get('thbl');
                                var vtgl=rec.get('tglthr');
                                var vaktif=rec.get('aktif');
                                //data = Ext.JSON.encode(rec.data);
                                //                                    console.log(data)                                
                                Ext.Ajax.request({                                                            
                                    url: Penggajian.Global.getApiUrl() + 'periodethr/executeRow',
                                    method: 'POST',
                                    params: {
                                        opt: 'delete',
                                        _token: tokendata,
                                        vthbl:vthbl,
                                        vtgl:vtgl,
                                        aktif:vaktif
                                    //                                              id:data.id
                                    },
                                    success: function(obj) {
                                        var   resp = Ext.decode(obj.responseText);                                                                
                                        if(resp.success==true){
                                            Ext.Msg.show({
                                                title:'Message Info',
                                                msg: resp.message,
                                                buttons: Ext.Msg.OK,
                                                icon: Ext.Msg.INFO
                                            });
                                            Ext.getCmp('tab2h1').getController().onShow();
                                        }else{
                                            Ext.Msg.show({
                                                title: 'Error',
                                                msg: resp.message,
                                                modal: true,
                                                icon: Ext.Msg.ERROR,
                                                buttons: Ext.Msg.OK,
                                                fn: function(btn){
                                                    if (btn == 'ok' && resp.msg == 'Session Expired') {
                                                        window.location = Penggajian.Global.getApiUrl();
                                                    }
                                                }
                                            });
                                        }
                                    },
                                    failure: function(obj) {
                                        //                            var obj=action.response;
                                        try{
                                            var  resp = Ext.decode(obj.responseText);                                        
                                            Ext.getCmp('tab2h1').getController().onShow();   
                    
                                            if (resp.reason == 'Session Expired' || resp.message == 'Session Expired') {
                                                session_expired('Session Expired');
                                            } else{
                                                set_message(2, resp.message);                            
                                            }
                                        
                                        }catch(ex){
                                            var msg=ex.message;
                                            //                                        var divEl = Ext.DomHelper.createDom('<div>'+ex.msg+'</div>');
                                            //                                        var vdiv=divEl.textContent;
                                            var exmsg=null;
                                            if (msg.indexOf('TokenMismatchException') > -1) {
                                                //console.log('TokenMismatchException');
                                                session_expired('Session Expired');
                                            }else{
                                                Ext.Msg.show({
                                                    title:'Message Error',
                                                    msg: ex.message,                                            
                                                    buttons: Ext.Msg.OK,
                                                    icon: Ext.Msg.ERROR,
                                                    maxWidth:'100%',
                                                    listeners:{
                                                        show:function(){
                                                            Ext.Msg.doComponentLayout();
                                                        }
                                                    }
                                                });
                                            }

                                        }
                                    }
                                });                 
                            } 
                        }
                    });
                }
            }]
                                
        },
        //            {
        //                text: 'ID',  
        //                dataIndex: 'id',
        //                align:'center'
        //            },
        {
            text: 'Tahun', 
            dataIndex: 'thbl', 
            align:'center',
            flex: 1
        },
        {
            text: 'Tanggal THR', 
            dataIndex: 'tglthr', 
            align:'center',
            flex: 1
        },            
        {
            text: 'Aktif', 
            xtype:'checkcolumn',
                
            dataIndex: 'aktif', 
            align:'center',
            flex: 1,
            processEvent:function ( type , view , cell , recordIndex , cellIndex , e , record , row ){
                return false;
            }
        }
       
        ],    
        tbar:[
        {
            text:'Add',
            iconCls:'icons-add',
            handler:'onClickAdd'
        }],
        bbar: {
            xtype: 'pagingtoolbar',
            displayInfo: true,
            pageSize: 10,
            bind:{
                store:'{strperiodethr}'
            }   
        }
    }
    ]
    ,
    listeners:{
        show:'onShow'
    }
    
});
