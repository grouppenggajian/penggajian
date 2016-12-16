Ext.define('Penggajian.view.main.UpdatePassword', 
    {
        extend          : 'Ext.window.Window',
        title           : 'Update Password',
        requires        : [
        'Penggajian.view.main.MainController',
        ],
        controller:'main',
        //        plugins: {
        //            ptype: 'datatip'
        //        },
        width           : 400,
        height          : 250,
        layout          : 'fit',
        autoShow        : true,
        modal           : true,
        alias           : 'widget.updatepassword',
        id              : 'update_password',
        
        maximizable     :false,
        closeAction:'destroy',
        items:[
        {
            xtype:'form',
            id:'formupdatepassword',
            defaultType     : 'textfield',
            defaults        : {
                allowBlank: false,
                labelAlign: 'left',
                labelWidth: 100
            },
            monitorValid: true,
            url:Penggajian.Global.getApiUrl()+'adminpanel/updatepassword',
            buttonAlign     : 'center',
            padding         : 5,
            style           : 'background-color: #fff;',
            border          : false,
            //            layout          :'anchor',
            items:[
                {
                                    name: 'user_id',
                                    fieldLabel:'User Id',
                                    id: 'update_user_id',
                                    tooltip: 'Field tidak boleh kosong',
                                    afterLabelTextTpl: required_css, 
                                    allowBlank:false,
                                    maxLength:10,
                                    width: 50,
                                    readOnly:true,
                                    anchor:'90%'
                                },{
                                    name: 'user_password',
                                    id: 'update_user_password',
                                    fieldLabel:'Old Password',
                                    inputType:'password',
                                    tooltip: 'Field tidak boleh kosong',
                                    afterLabelTextTpl: required_css,   
                                    allowBlank:false,                            
                                    width: 200,
                                    anchor:'90%'
                                    //                            margins: '0 0 0 5'
                            
                                },{
                                    name: 'new_password',
                                    id: 'update_new_password',
                                    fieldLabel:'New Password',
                                    inputType:'password',
                                    tooltip: 'Field tidak boleh kosong',
                                    afterLabelTextTpl: required_css,   
                                    allowBlank:false,                            
                                    width: 200,
                                    anchor:'90%'
                                    //                            margins: '0 0 0 5'
                            
                                }
                
            ],
            buttons : [
            {
                text: 'Simpan',                    
                itemId: 'update_simpan',
                id:'update_simpan_respwd_btn',
                iconCls: 'icon-list-accept',
                handler: 'OnSaveUpdatePassword'
            },
            {
                text: 'Batal',
                action: 'cancel',
                itemId: 'update_respwd_batal',
                iconCls: 'icon-cancel',
                handler: function(){
                    this.up('window').close();
                }
            }
            ]
        }
        ]
    });