Ext.define('Penggajian.view.adminpanel.RoleSettingInput', 
    {
        extend          : 'Ext.window.Window',
        title           : 'Input Role',
        requires        : [
        'Penggajian.view.adminpanel.RoleSettingController',
        ],
        controller:'rolesetting',
        //        plugins: {
        //            ptype: 'datatip'
        //        },
        width           : 400,
        height          : 450,
        layout          : 'fit',
        autoShow        : true,
        modal           : true,
        alias           : 'widget.inputRole',
        id              : 'input_role',
        
        maximizable     :false,
        closeAction:'destroy',
        items:[
            {
            xtype:'form',
            id:'forminputrole',
            defaultType     : 'textfield',
            defaults        : {
                allowBlank: false,
                labelAlign: 'left',
                labelWidth: 100
            },
            monitorValid: true,
            url:Penggajian.Global.getApiUrl()+'adminpanel/saverole',
            buttonAlign     : 'center',
            padding         : 5,
            style           : 'background-color: #fff;',
            border          : false,
//            layout          :'anchor',
            items:[
                {
                    xtype: 'fieldcontainer',
                    //                    fieldLabel: 'Department',
                    afterLabelTextTpl: required_css,
                    //                    labelStyle: 'font-weight:bold;padding:0;',
                    layout: 'hbox',
                    defaultType: 'textfield',
                    anchor:'95%',
                    fieldDefaults: {
                        labelAlign: 'top'
                    },

                    items: [{
                            name: 'role_id',
                            fieldLabel:'Role Id',
                            id: 'roleset_role_id',
                            tooltip: 'Field tidak boleh kosong',
                            afterLabelTextTpl: required_css, 
                            allowBlank:false,
                            maxLength:2,
                            maskRe:/\d/,
                            //                            readOnly:true,
                            width: 50
                    
                        },
                        {
                            name: 'role_name',
                            id: 'roleset_role_name',
                            fieldLabel:'Role Name',
                            tooltip: 'Field tidak boleh kosong',
                            afterLabelTextTpl: required_css,   
                            allowBlank:false,
                            //                            flex:2,
                            width: 200,
                            margin: '0 0 0 5'
                            
                        },{
                            xtype:'checkbox',
                            name: 'active',
                            id: 'roleset_role_active',
//                            labelAlign:'center',
                            fieldLabel:'Active',
                            fieldStyle: 'padding-left:10px;text-align: center;'    ,
//                            style: {
//                                textAlign: 'center'
//                            }   ,
                            tooltip: 'Field tidak boleh kosong',
//                            afterLabelTextTpl: required_css,                               //                         
                            width: 150,
                            
                            margin: '0 0 0 10'
                          
                        }
                    ]
                    
                },{                        
                    xtype:'treepanel',
//                    title: 'Menu Detail',
                    height: 260,
                    id:'roleset_menu_id',
                    anchor:'95%',
                    //                        collapsible: true,
                    useArrows: true,
                    rootVisible: false,
//                    store: 'storeroledetailall',
                    store:Ext.create('Ext.data.TreeStore', {
                    root: {
                        expanded: true
                        }
                    ,
                    fields: [
                       {name:'text',type:'string'}
                    ],
                    proxy: {
                        type: 'ajax',
                        url: Penggajian.Global.getApiUrl()+'adminpanel/roledetailall'
                        ,reader: {
                            type: 'json'

                //            ,rootProperty    : 'data',
                //            totalProperty   : 'record'
                        }
                        ,success:function(){
                            
                        }
                        ,exception:function( tstore, response, operation, eOpts ){
                            if(response.status=='500'){
                                tstore.reload();
                            }
                                
                             var err = Ext.decode(response.responseText); 
                            console.log(err);
                            if (err){
                                if (err.errMsg == 'Session Expired' || err.message == 'Session Expired') {
                                    session_expired('Session Expired');
                                }                                            
                                else{
                                    console.log(err);
                                }  
                            }    
                        }
                    }
                }),  
                    multiSelect: true,
                    autoScroll:true,
                    expandAll:true,
                    columns:[
                        {xtype: 'treecolumn', //this is so we know which column will show the tree
                            text: 'Main Menu',
                            flex: 1,
                            sortable: false,
                            dataIndex: 'text'
                        }
                    ]                   
                }       
            ],
            buttons:[
                {
                    text: 'Simpan',                    
                    itemId: 'roleset_simpan',
                    id:'roleset_simpan_btn',
                    iconCls: 'save',
                    handler: 'onSave'
                },
                {
                    text: 'Batal',
                    action: 'cancel',
                    itemId: 'roleset_batal',
                    iconCls: 'icon-cancel',
                    handler: function(){
                        this.up('window').close();
                    }
                }
            ]
        
        }
        ]
    });