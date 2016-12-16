Ext.define('Penggajian.view.auth.LoginController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.login',

    onLoginClick: function(btn) {

        var me = this, // Controller reference
            win = btn.up('window'), // Window reference
            form = me.lookupReference('form'), // Form reference
            password; // Empty var
       if (form.isValid()) {
           Ext.MessageBox.show({
                title : 'Login',
                msg : 'Attempting login, please wait...',
                width : 200,
                closable : false
            });
            form.submit({
                
                url: Penggajian.Global.getApiUrl() + 'auth/login',
                params:{
                    _token:tokendata
                },
                // If login is successful               
                success:function(form,action) {
                    var res = Ext.decode(action.response.responseText);
//                    console.log(res.data);
                    localStorage.setItem('userid',res.data.userid);
                    localStorage.setItem('username',res.data.username);
                    localStorage.setItem('roleid',res.data.roleid);
                    localStorage.setItem('rolename',res.data.rolename);
                    localStorage.setItem('regcode',res.data.regcode);
                    localStorage.setItem('formlocation',Ext.JSON.encode(res.formrequires));
                    Ext.MessageBox.hide();
                    me.getView().destroy();

                  window.location.href = Penggajian.Global.getApiUrl();

                },
                failure:function(form,action){
                    var res = Ext.decode(action.response.responseText);
                    Ext.MessageBox.hide();
                    Ext.Msg.alert('Error', res.message);
                }
                
                // If login
            })
       }
    }
});