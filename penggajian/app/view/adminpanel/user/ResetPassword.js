Ext.define('Penggajian.view.adminpanel.user.ResetPassword', 
    {
        extend          : 'Ext.window.Window',
        title           : 'Reset Password',
        requires        : [
        'Penggajian.view.adminpanel.user.UserSettingController',
        ],
        controller:'usersetting',
        //        plugins: {
        //            ptype: 'datatip'
        //        },
        width           : 400,
        height          : 250,
        layout          : 'fit',
        autoShow        : true,
        modal           : true,
        alias           : 'widget.resetpassword',
        id              : 'userset_reset_password',
        
        maximizable     :false,
        closeAction:'destroy',
        items:[
            {
            xtype:'form',
            id:'formresetpassword',
            defaultType     : 'textfield',
            defaults        : {
                allowBlank: false,
                labelAlign: 'left',
                labelWidth: 100
            },
            monitorValid: true,
            url:Penggajian.Global.getApiUrl()+'adminpanel/resetpassword',
            buttonAlign     : 'center',
            padding         : 5,
            style           : 'background-color: #fff;',
            border          : false,
//            layout          :'anchor',
            items:[
                {
                            name: 'user_id',
                            fieldLabel:'User Id',
                            id: 'userset_user_respwd_id',
                            tooltip: 'Field tidak boleh kosong',
                            afterLabelTextTpl: required_css, 
                            allowBlank:false,
                            maxLength:10,
                            width: 50,
                            readOnly:true,
                            anchor:'90%'
                        },{
                            name: 'user_password',
                            id: 'userset_user_password_reset',
                            fieldLabel:'New Password',
                            inputType:'password',
                            tooltip: 'Field tidak boleh kosong',
                            afterLabelTextTpl: required_css,   
                            allowBlank:false,                            
                            width: 200,
                            anchor:'90%'
//                            margins: '0 0 0 5'
                            
                        }
            ],buttons : [
                {
                    text: 'Simpan',                    
                    itemId: 'userset_respwd_simpan',
                    id:'userset_simpan_respwd_btn',
                    iconCls: 'icon-list-accept',
                    handler: 'onResetPassword'
                },
                {
                    text: 'Batal',
                    action: 'cancel',
                    itemId: 'userset_respwd_batal',
                    iconCls: 'icon-cancel',
                    handler: function(){
                        this.up('window').close();
                    }
                }
            ]
            }
        ]
    });