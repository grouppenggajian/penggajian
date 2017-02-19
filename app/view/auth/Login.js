Ext.define('Penggajian.view.auth.Login', {
    extend: 'Ext.window.Window',
    xtype: 'login',
    id:'loginid',
    requires: [
        'Penggajian.view.auth.LoginController',
        'Ext.form.Panel'
    ],

    controller: 'login',
    bodyPadding: 10,
    title: 'Login Window',
    closable: false,
    autoShow: true,

    items: {
        xtype: 'form',
        reference: 'form',        
        items: [{
            xtype: 'textfield',
            name: 'username',
            fieldLabel: 'Username',
            allowBlank: false
//            value:'dev'
        }, {
            xtype: 'textfield',
            name: 'password',
            inputType: 'password',
            fieldLabel: 'Password',
            allowBlank: false,
//            value:'e77989ed21758e78331b20e477fc5582',
            listeners:{
                    blur : function(me){ me.setRawValue(hex_md5(me.getValue())); },
                    specialkey: function(field, e){
                    if (e.getKey() == e.ENTER) {
                        field.blur();
                        var ctrl=Ext.getCmp('loginid').getController();
                        ctrl.onLoginClick(field);
                        
                    }
                }
                }

        }, {
            xtype: 'displayfield',
            hideEmptyLabel: false,
            value: 'Enter any non-blank password'
        }
//        ,{
//            xtype: 'textfield',
//            id:'logintoken',
//            name: 'logintoken',
//            hidden:false,
////            fieldLabel: 'Username',
//            allowBlank: true
//        }
    ],
        buttons: [{
            text: 'Login',
            formBind: true,
            listeners: {
                click: 'onLoginClick'
            }
        }]
    }
});