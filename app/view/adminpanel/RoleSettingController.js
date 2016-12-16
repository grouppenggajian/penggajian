Ext.define('Penggajian.view.adminpanel.RoleSettingController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.rolesetting',
    onAddRoleMaster:function(btn){
        var winroleset=Ext.create({xtype:'inputRole'});
        winroleset.setTitle('Add Role Setting');
        Ext.getCmp('roleset_simpan_btn').setText('Simpan');
        Ext.getCmp('roleset_simpan_btn').setIconCls('icons-add');
        var strdetail=Ext.getCmp('roleset_menu_id').store ;
        strdetail.load();                                      
        winroleset.show();
    },
    onEditMaster:function(grid, rowIndex, colIndex) {   
        var rec = grid.getStore().getAt(rowIndex);
        var winroleset=Ext.create({xtype:'inputRole'});
        winroleset.setTitle('Edit Form');
        Ext.getCmp('roleset_simpan_btn').setText('Edit');
        Ext.getCmp('roleset_simpan_btn').setIconCls('icon-edit-record');
        Ext.getCmp('roleset_role_id').setValue(rec.get('role_id'));
        Ext.getCmp('roleset_role_id').setReadOnly(true);
        Ext.getCmp('roleset_role_id').setFieldStyle('readonly-input');
        Ext.getCmp('roleset_role_name').setValue(rec.get('role_name'));
        Ext.getCmp('roleset_role_active').setValue(rec.get('active'));
        var strdetail=Ext.getCmp('roleset_menu_id').store ;
        strdetail.load({params:{roleid:rec.get('role_id'),checked:1}});          
        winroleset.show();
        
    },
    onSave:function(){
                {
                    var parcmd=Ext.getCmp('roleset_simpan_btn').getText();
                    if(parcmd === 'Simpan'){               
                        parcmd='insert';
                    }else if(parcmd === 'Edit'){
                        parcmd='update';
                    }

                    if(!Ext.getCmp('forminputrole').getForm().isValid()){
                        set_message(2,'Masih Ada Field Yang Salah!!!');
                        return;
                    }
                    var parroleid = Ext.getCmp('roleset_role_id').getValue();
                    if(parcmd==='insert'){                                
                        var retval=true;
                        var strmaster=Ext.getCmp('roleset_master').store;
                        strmaster.each(function(node){                    
                            if(node.data.role_id === parroleid){                                               
                                retval=false;                           
        //                        return false;
                            };                    
                        });  
                        if (!retval){
                            set_message(2,'Role ID Sudah Terdaftar!!!');
                            return;
                        }
                    }
                    var arr_menu=new Array();
                    var vtree=Ext.getCmp('roleset_menu_id').getChecked();           
                    if(vtree){
                        Ext.each(vtree,function(node){                        
                            arr_menu.push({role_id:parroleid,idmenu:node.data.id});                
                        });
                    }

                    Ext.getCmp('forminputrole').getForm().submit({
                        url: this.url,
//                        scope: this,
                        params: {
                            _token:tokendata,
                            cmd: parcmd,
                            rolemenu:Ext.JSON.encode(arr_menu)
                        },
                        waitMsg: 'Saving Data...',
                        success: function(form, action) {
                            set_message(0,action.result.message);
                            Ext.getCmp('roleset_master').store.reload();
                            Ext.getCmp('forminputrole').getForm().reset();
                            Ext.getCmp('input_role').close();
                        },
                        failure: function(form, action) {
                            console.log(action.response.responseText);
                            //                    Ext.Msg.alert('Failed', action.result.msg);
                        }
                    });
                } 
            }
});