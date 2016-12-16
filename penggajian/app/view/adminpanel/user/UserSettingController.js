Ext.define('Penggajian.view.adminpanel.user.UserSettingController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.usersetting',
    
    onAdd:function(){
        var winuserset=Ext.create({
            xtype:'inputUser'
        });
        winuserset.setTitle('Add User');
        Ext.getCmp('userset_simpan_btn').setText('Simpan');
        Ext.getCmp('userset_simpan_btn').setIconCls('icons-add');
        var strdetail=Ext.getCmp('userset_roleid').store ;
        strdetail.load();                                      
        winuserset.show();
    },
    onSave:function(btn){
        var parcmd=Ext.getCmp('userset_simpan_btn').getText();
        if(parcmd === 'Simpan'){               
            parcmd='insert';
        }else if(parcmd === 'Edit'){
            parcmd='update';
        }
        if(!Ext.getCmp('forminputuser').getForm().isValid()){
            set_message(2,'Masih Ada Field Yang Salah!!!');
            return;
        }
        var paruserid=Ext.getCmp('userset_user_id').getValue();
                                           
        var retval=true;
        var userset_store=Ext.getCmp('userset_grid').store;
        if (parcmd==='insert'){
            userset_store.each(function(node){                    
                if(node.data.user_id === paruserid){                                               
                    retval=false;                           
                    return false;
                };                    
            });  
            if (!retval){
                set_message(2,'User ID Sudah Terdaftar!!!');
                return;
            }
        }
            
             
        //            var parroleid=Ext.getCmp('userset_roleid').getValue() ;
           

        Ext.getCmp('forminputuser').getForm().submit({
            url: this.url,                
            params: {
                cmd: parcmd ,
                _token:tokendata
            },
            waitMsg: 'Saving Data...',
            success: function(form, action) {
                set_message(0,action.result.message);
                Ext.getCmp('userset_grid').store.reload();
                Ext.getCmp('forminputuser').getForm().reset();
                Ext.getCmp('input_user').close();
            },
            failure: function(form, action) {
                console.log(action.response.responseText);
            //                    Ext.Msg.alert('Failed', action.result.msg);
            }
        });
        
    },
    onEditUser:function(grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        var winuserset=Ext.create({
            xtype:'inputUser'
        });
       
               
        winuserset.setTitle('Edit Form');
        Ext.getCmp('userset_simpan_btn').setText('Edit');
        Ext.getCmp('userset_simpan_btn').setIconCls('icon-edit-record'); 
                                            
        var strdetail=Ext.getCmp('userset_roleid').store ;
        strdetail.load();                                             
                                            
        Ext.getCmp('userset_user_id').setValue(rec.get('user_id'));
        Ext.getCmp('userset_user_id').setReadOnly(true);                                            
        Ext.getCmp('userset_user_id').setFieldStyle('readonly-input');
        Ext.getCmp('userset_user_password').setValue(rec.get('user_password'));
        Ext.getCmp('userset_user_password').setReadOnly(true);        
        Ext.getCmp('userset_user_password').setFieldStyle('readonly-input');
                                            
        Ext.getCmp('userset_roleid').setValue(rec.get('role_id'));
        Ext.getCmp('userset_regcode').setValue(rec.get('reg_code'));
        Ext.getCmp('userset_user_name').setValue(rec.get('user_name'));
        Ext.getCmp('userset_aktif').setValue(rec.get('aktif'));
                                            
                                                                                    
        winuserset.show();
    },
    onResetPassword:function(){
        var parcmd='resetpassword';            
            
            if(!Ext.getCmp('formresetpassword').getForm().isValid()){
                set_message(2,'Masih Ada Field Yang Salah!!!');
                return;
            }            
                                    
            Ext.getCmp('formresetpassword').getForm().submit({
                url: this.url,                
                params: {
                    _token:tokendata,
                    cmd: parcmd
                },
                waitMsg: 'Saving Data...',
                success: function(form, action) {
                    set_message(0,action.result.message);
                    Ext.getCmp('userset_grid').store.reload();
                    Ext.getCmp('formresetpassword').getForm().reset();
                    Ext.getCmp('userset_reset_password').close();
                },
                failure: function(form, action) {
                    console.log(action.response.responseText);
                    //                    Ext.Msg.alert('Failed', action.result.msg);
                }
            });
    }
});
    