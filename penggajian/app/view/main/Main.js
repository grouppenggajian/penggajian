/**
 * This class is the main view for the application. It is specified in app.js as the
 * "mainView" property. That setting automatically applies the "viewport"
 * plugin causing this view to become the body element (i.e., the viewport).
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('Penggajian.view.main.Main', {
    extend: 'Ext.container.Viewport',
    xtype: 'app-main',
    title: 'Penggajian',
    requires: [
    'Ext.ux.TabCloseMenu',
    //        'Ext.window.MessageBox',

    'Penggajian.view.main.MainController'
    ,'Penggajian.view.main.UpdatePassword'
    //    'Penggajian.view.main.List'
    ],
    id:'app-main-id',
    layout: 'border',
    controller: 'main',
    //    viewModel: 'main',    
    items: [
    { 
        //        title:'center',
        region:'north',
        height: 48,
        bodyStyle:'background-color:white;',
        bodyPadding:'2',
        xtype:'panel',
        layout:'hbox',
        //        align: 'middle',
        items : [
            
        //        {
        //            xtype: 'component',
        //            height:44,
        //            id: 'app-header-logo',
        //            style:'background-color:#5FA2DD;',
        //            margin:'0 0 0 5',
        //            html:'<img src="'+'public/images/logo.png'+'" height="65" " width="75" />'
        //        }
        ,{
            xtype: 'component',
            height:44,
            //            id: 'app-header-title',   
            style:'background-color:#5FA2DD;',
            html: '<div style="padding-top:12px;padding-left:10px; color:white; font-size:20px; font-weight:normal;">SISTEM INFORMASI PENGGAJIAN</div>',
            flex: 1
        },
        {
            xtype:'toolbar',
            height:44,
            style:'background-color:#5FA2DD;',
            items:[
            {
                                        
                xtype:'label',  
                cls:'label-color',
                //                                                                        cls:'label-color',
                html: '<div style="color:white;">Welcome <b>'+ localStorage.getItem('username')+'</b>, you are login as '+ localStorage.getItem('rolename')+' <b><?= ucwords(strtolower($rolename)) ?></b>&nbsp;&nbsp;</div>'
            },'-'
            ,{
                text:'Change Password',
                //                                    scope:this,
                cls:'log_out',
                iconCls: 'icon-key'
                ,
                handler: 'do_update_pwd'
            },'-'
            ,{
                text:'Logout',
                //                                    scope:this,
                cls:'log_out',
                iconCls: 'icon-delete'
                ,
                handler: 'doLogout'
            }
            ]
        }
        ]
    //        ,
    //        buttons:[
    //            {
    //                text:'logout'
    //            }
    //        ]
    //            title: 'North'
            
    },
    {
        region: 'west',
        collapsible: true,
        title: 'Main Menu',
        layout:'accordion',
        //        align:'left',
        split: true,
        width: '20%',
        minWidth: 100,
        minHeight: 140,
        margins: '2 0 5 5',
        id:'main-west'                  
    }
    ,{
        //        title:'center',              
        region: 'center',
        border: false,
        layout: 'border',
        minHeight: 140,      
        margins: '2 5 5 0',
        items: [

        {
            xtype   : 'container',
            region  : 'center',
            layout  : 'fit',
            items   : [{
                xtype:'tabpanel',
                id: 'id_tabmain',
                width: '100%',
                //            border:false,
                enableTabScroll: true,
                defaults: {
                    autoScroll:true,
                    bodyPadding: 2
                }
                ,
                items: [
                {
                    title: 'Dashboard',
                    //            iconCls: 'tabs',
                    html:  '<div id="start-div">'+
                    '<div style="float:left; padding-left:10px;" ><img src="public/images/logo.png" height="65" width="75" /></div>'+
                    '<div style="margin-left:100px; padding-left:10px;">'+
                    '    <h2>Welcome!</h2>'+
                    '    <p>There are many sample layouts to choose from that should give you a good head start in building your own'+
                    '    application layout.  Just like the combination examples, you can mix and match most layouts as'+
                    '    needed, so dont be afraid to experiment!</p>'+
                    '    <p>Select a layout from the tree to the left to begin.</p>'+
                    '</div>'+
                    '</div>' ,
                    closable: false
                }
                ]
                ,
                plugins: 'tabclosemenu'
            }]
        }
        ]
    //            bbar: []
    },
    {
        id      : 'appFooter',
        xtype   : 'panel',
        region  : 'south',
        height  : 25,
        split: false,
        bodyStyle:'background-color:#5FA2DD',                    
        html    : '<center padding-top:15; style="color:white; ">CV.Balarang&copy</center>'
    }
        
    ],
    listeners:{        
        beforeadd:function(me,  component, index, eOpts){
//            this.callParent(arguments);
            if(component.region=='north'){
                set_accordion();
            }                            
        }
    }
});
