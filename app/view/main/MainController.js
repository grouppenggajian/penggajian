/**
 * This class is the controller for the main view for the application. It is specified as
 * the "controller" of the Main view class.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('Penggajian.view.main.MainController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.main',
    
    onItemSelected: function (sender, record) {
        Ext.Msg.confirm('Confirm', 'Are you sure?', 'onConfirm', this);
    },

    onConfirm: function (choice) {
        if (choice === 'yes') {
        //
        }
    },
    doLogout: function () {
        var me=this;
        if(!getusersession()){
            Ext.getCmp('app-main-id').destroy();            
            window.location.href = Penggajian.Global.getApiUrl();
        }else{
            tokendata=gettokendata();
            execute_confirm('Are you sure to Logout?', Penggajian.Global.getApiUrl()+'auth/logout', 
            {
                _token:tokendata
            }, function(obj) {                     
                localStorage.removeItem('userid');
                localStorage.removeItem('username');
                localStorage.removeItem('roleid');
                localStorage.removeItem('rolename');
                localStorage.removeItem('regcode');
                // Remove Main View
                Ext.getCmp('app-main-id').destroy();            
                window.location.href = Penggajian.Global.getApiUrl();
       
            } );
        }
        
    },
    do_update_pwd:function(btn){        
        var winuppwd=Ext.create({
            xtype:'updatepassword'
        });
        var param_user_id= localStorage.getItem('userid');
        Ext.getCmp('update_user_id').setValue(param_user_id);  
                                        
        winuppwd.show();
    },
    OnSaveUpdatePassword:function(btn){
        var parcmd='updatepassword';            
        var frm=Ext.getCmp('formupdatepassword').getForm();     
        if(!frm.isValid()){
            set_message(2,'Masih Ada Field Yang Salah!!!');
            return;
        }            
                                    
        frm.submit({
            url: this.url,
            scope: this,
            params: {
                _token:tokendata,
                cmd: parcmd
            },
            waitMsg: 'Saving Data...',
            success: function(form, action) {
                var vmsg=action.result.message;
                //                    set_message(0,action.result.msg);
                Ext.Msg.show({
                    title:'Message Info',
                    msg: vmsg,
                    buttons: Ext.Msg.OK,
                    icon: Ext.Msg.INFO,
                    fn:function(btn){
                        if (btn == 'ok'){
                            Ext.Ajax.request({
                                url: Penggajian.Global.getApiUrl()+'auth/logout',
                                method:'POST',
                                waitMsg:'Session Expired...',
                                params:{
                                    _token:tokendata
                                },
                                success: function(obj, opts) {                                                        
                                    localStorage.removeItem('userid');
                                    localStorage.removeItem('username');
                                    localStorage.removeItem('roleid');
                                    localStorage.removeItem('rolename');
                                    localStorage.removeItem('regcode');
                                    // Remove Main View
                                    Ext.getCmp('app-main-id').destroy();
                                    window.location.href = Penggajian.Global.getApiUrl();
                                },

                                failure: function(response, opts) {
                                    console.log(response)
                                }
                            });
                        }
                    }
                });
                    
            },
            failure: function(form, action) {
                var resp=action.response.responseText;
                set_message(2,action.result.message);

            }
        });  
    }
     
    
        
});
