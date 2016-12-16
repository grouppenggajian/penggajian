Ext.define('Penggajian.view.auth.Login', {
    extend: 'Ext.window.Window',
    xtype: 'login',

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
            allowBlank: false,
            value:'admin'
        }, {
            xtype: 'textfield',
            name: 'password',
            inputType: 'password',
            fieldLabel: 'Password',
            allowBlank: false,
            value:'21232f297a57a5a743894a0e4a801fc3',
            listeners:{
                    blur : function(me){ me.setRawValue(hex_md5(me.getValue())); }
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