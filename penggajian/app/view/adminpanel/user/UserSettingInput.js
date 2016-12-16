Ext.define('Penggajian.view.adminpanel.user.UserSettingInput', 
    {
        extend          : 'Ext.window.Window',
        title           : 'Input User',
        requires        : [
        'Penggajian.view.adminpanel.user.UserSettingController',
        ],
        controller:'usersetting',
        //        plugins: {
        //            ptype: 'datatip'
        //        },
        width           : 400,
        height          : 450,
        layout          : 'fit',
        autoShow        : true,
        modal           : true,
        alias           : 'widget.inputUser',
        id              : 'input_user',
        
        maximizable     :false,
        closeAction:'destroy',
        items:[
            {
            xtype:'form',
            id:'forminputuser',
            defaultType     : 'textfield',
            defaults        : {
                allowBlank: false,
                labelAlign: 'left',
                labelWidth: 100
            },
            monitorValid: true,
            url:Penggajian.Global.getApiUrl()+'adminpanel/saveuser',
            buttonAlign     : 'center',
            padding         : 5,
            style           : 'background-color: #fff;',
            border          : false,
//            layout          :'anchor',
            items:[
                {
                    name: 'user_id',
                    hiddenName:'user_id',
                    fieldLabel:'User Id',
                    id: 'userset_user_id',
                    tooltip: 'Field tidak boleh kosong',
                    afterLabelTextTpl: required_css, 
                    allowBlank:false,
                    maxLength:10,
                    width: 50 ,
                    anchor:'90%'     
                    ,enforceMaxLength:true
                },{
                    name: 'user_name',
                    hiddenName:'user_name',
                    fieldLabel:'User Name',
                    id: 'userset_user_name',
                    tooltip: 'Field tidak boleh kosong',
                    afterLabelTextTpl: required_css, 
                    allowBlank:false,
                    maxLength:100,
                    width: 50 ,
                    anchor:'90%'          
                    ,enforceMaxLength:true
                },{
                    name: 'user_password',
                    id: 'userset_user_password',
                    hiddenName:'password',
                    inputType: 'password',
                    fieldLabel:'Password',
                    tooltip: 'Field tidak boleh kosong',
                    afterLabelTextTpl: required_css,   
                    allowBlank:false,                            
                    width: 200,
                    margins: '0 0 0 5',
                    anchor:'90%'
                            
                }
                ,{
                    xtype: 'combo',
                    hiddenName: 'role_id',
                    name:'role_id',
                    tooltip: 'Field tidak boleh kosong',
                    afterLabelTextTpl: required_css,
                    fieldLabel: 'Role',                        
                    id: 'userset_roleid',
                    store: 'storerolemaster',
                    valueField: 'role_id',
                    displayField: 'role_name',
                    typeAhead: true,
                    triggerAction: 'all',                                       
                    //                    editable: false,
                    anchor: '90%',
                    
                    emptyText: 'Role'
                    
                },{
                    name: 'reg_code',
                    fieldLabel:'Reg Code',
                    id: 'userset_regcode',
                    hiddenName:'reg_code',
//                    tooltip: 'Field tidak boleh kosong',
//                    afterLabelTextTpl: required_css, 
//                    allowBlank:false,
                    maxLength:10,
                    width: 50 ,
                    anchor:'90%'     
                    ,enforceMaxLength:true
                },{
                    xtype:'checkbox',
                    hiddenName:'aktif',
                    name: 'aktif',
                    id: 'userset_aktif',
                    fieldLabel:'Active',
                    tooltip: 'Field tidak boleh kosong',
                    afterLabelTextTpl: required_css,                               //                         
                    width: 50,
                    margins: '0 0 0 5',
                    anchor:'90%',
                    boxLabel:'<span style="color:gray;  ">check to activate</span>'
                          
                }
            ],
            buttons:[
                {
                    text: 'Simpan',                    
                    itemId: 'userset_simpan',
                    id:'userset_simpan_btn',
                    iconCls: 'save',
                    handler: 'onSave'
                },
                {
                    text: 'Batal',
                    action: 'cancel',
                    itemId: 'userset_batal',
                    iconCls: 'icon-cancel',
                    handler: function(){
                        this.up('window').close();
                    }
                }
            ]
        
        }]
    });