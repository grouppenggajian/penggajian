Ext.define('Penggajian.view.master.periode.Periode', {
    extend: 'Ext.container.Container',
    xtype: 'TabPeriodeGaji',
    alias: 'widget.PeriodeGaji',
    requires: [
    'Penggajian.view.master.periode.PeriodeController',
    'Penggajian.view.master.periode.PeriodeInput'
    ],
    controller:'periode',
    title: 'Master Periode Gaji',
    id: 'tab1f1',
    closable: true,        
    layout: 'border', 
    items:[       
    {
        xtype:'panel',
        region:'center',
        layout: 'fit',
        bodyPadding: '5 5 5 5',
        items:[
        {
            xtype:'grid',
            id:'idperiodelist',
            //        store: 'Department',
            store: 'storeperiode',

            columns: [
//             {
// //                 xtype: 'actioncolumn',
// //                 header: 'Action',
// //                 menuDisabled: true,
// //                 sortable: false,   
// //                 align:'center',
// //                 width: 85,
// //                 items: [
// //                 {
// //                     iconCls: 'icon-edit-record',
// //                     tooltip: 'Edit Row',
// //                     handler: 'onEditClick' 
// //                 },{
// //                     getClass: function(v, meta, rec) {
// //                         return 'icon-delete';
// //                     },
// //                     getTip: function(v, meta, rec) {
// //                         return 'Delete Plant';
// //                     },
// //                     handler: function(grid, rowIndex, colIndex) {
// //                         var rec = grid.getStore().getAt(rowIndex);
// //                         Ext.Msg.show({
// //                             title: 'Confirm',
// //                             msg: 'Are you sure delete selected row ?',
// //                             buttons: Ext.Msg.YESNO,
// //                             icon: Ext.Msg.QUESTION,
// //                             fn: function(btn){
// //                                 if (btn == 'yes') {
                                                                
// //                                     var data = rec.data;
// //                                     //data = Ext.JSON.encode(rec.data);
// // //                                    console.log(data)                                
// //                                     Ext.Ajax.request({                                                            
// //                                         url: Penggajian.Global.getApiUrl() + 'periode/deleteRow',
// //                                         method: 'POST',
// //                                         params: {
// //                                             opt: 'delete',
// //                                             _token: tokendata,
// //                                             id:data.id
// //                                         },
// //                                         success: function(obj) {
// //                                             var   resp = Ext.decode(obj.responseText);                                                                
// //                                             if(resp.success==true){
// //                                                 Ext.Msg.show({
// //                                                     title:'Message Info',
// //                                                     msg: resp.message,
// //                                                     buttons: Ext.Msg.OK,
// //                                                     icon: Ext.Msg.INFO
// //                                                 });
// //                                                 Ext.getCmp('idperiodelist').store.reload();
// //                                             }else{
// //                                                 Ext.Msg.show({
// //                                                     title: 'Error',
// //                                                     msg: resp.message,
// //                                                     modal: true,
// //                                                     icon: Ext.Msg.ERROR,
// //                                                     buttons: Ext.Msg.OK,
// //                                                     fn: function(btn){
// //                                                         if (btn == 'ok' && resp.msg == 'Session Expired') {
// //                                                             window.location = Penggajian.Global.getApiUrl();
// //                                                         }
// //                                                     }
// //                                                 });
// //                                             }
// //                                         },
// //                                         failure: function(obj) {
// //                                             var  resp = Ext.decode(obj.responseText);
// //                                             Ext.Msg.alert('info',resp.reason);
// //                                         }
// //                                     });                 
// //                                 } 
// //                             }
// //                         });
// //                     }
// //                 }]
                                
// //             },
//            {
//                text: 'ID',  
//                dataIndex: 'id',
//                align:'center'
//            },
            {
                text: 'Tanggal Mulai', 
                dataIndex: 'tglawal', 
                align:'left',
                flex: 1
            },
            {
                text: 'Tanggal Selesai', 
                dataIndex: 'tglakhir', 
                align:'left',
                flex: 1
            },
            {
                text: 'TahunBulan', 
                dataIndex: 'thbl', 
                align:'center',
                flex: 1
            },
            {
                text: 'Jumlah Hari Kerja', 
                dataIndex: 'jmlharikerja', 
                align:'right',
                flex: 1
            },
            {
                text: 'status', 
                xtype:'checkcolumn',
                
                dataIndex: 'aktif', 
                align:'center',
                flex: 1,
                processEvent:function ( type , view , cell , recordIndex , cellIndex , e , record , row ){
                    return false;
                }
            }
       
            ],
            // tbar:[
            // {
            //     text:'Add',
            //     iconCls:'icons-add',
            //     handler:'onClickAdd'
            // }],
            bbar: {
                xtype: 'pagingtoolbar',
                displayInfo: true,
                pageSize: 10,
                store: 'storeperiode'
            }
        }
        ]
                
    }
            
    ],
    listeners:{
        show:function(){
            var refstoregrid=Ext.getCmp('idperiodelist').store;   
            ////                        console.log(refjkstoregrid);
            refstoregrid.loadPage(1);
        //            {params:{start:0,limit:10}}
        }
    }
    

        
    
});