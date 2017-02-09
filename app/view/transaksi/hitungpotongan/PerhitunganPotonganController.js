Ext.define('Penggajian.view.transaksi.hitungpotongan.PerhitunganPotonganController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.hitungpotongan'
    ,
    onShow:function(){
        
        var refstore=Ext.getCmp('idhitungpotonganlist').store; 
        var app = Penggajian.getApplication();
        Ext.override(Ext.data.Store,{
            addField: function(field){
                //                            readLog(this);
                field = new Ext.data.Field(field);
                //		this.recordType.prototype.fields.replace(field);
                if(typeof field.defaultValue != 'undefined'){
                    this.each(function(r){
                        if(typeof r.data[field.name] == 'undefined'){
                            r.data[field.name] = field.defaultValue;
                        }
                    });
                }
            },
            removeField: function(name){
                //		this.recordType.prototype.fields.removeKey(name);
                this.each(function(r){
                    delete r.data[name];
                    if(r.modified){
                        delete r.modified[name];
                    }
                });
            }
        });
        
        app.getStore('storeperiode').load({
            scope: this,
            callback:function(records, operation, success){
                if(success){
                    if(records.length>0){
                        var thbl = records[0].get('thbl'); 
                        thbl=thbl.substring(0, 4)+'-'+thbl.substring(4, 6)+'-'+'01';                                                   
                        Ext.getCmp('hitungpotongan_thbl').setValue(thbl);
                        refstore.getProxy().setExtraParam('thbl',records[0].get('thbl'));  
                        this.getDataSet();   
                            
                    //refstore.getProxy().setExtraParam('thbl',records[0].get('thbl'));                        
                    //                        refstore.load({
                    //                            params:{
                    //                                searchvalue:Ext.getCmp('hitungpotongansearch').getValue()
                    //                            }
                    //                        });
                            
                    }
                }
            }
        });
    },
    getDataSet:function(){
        
        var vurl=Ext.getCmp('idhitungpotonganlist').store.getProxy().getUrl();
        //        console.log(vurl);
        Ext.Ajax.request({
            url: vurl,
            method:'GET',
            //            params:{
            //                start:0,
            //                limit:25
            //            },
            waitMsg:'Load Data...',
            //                params:{},
            success: function(obj, opts) {
                var   resp = Ext.decode(obj.responseText);                 
                var data=resp.data;  
                //                console.log(data);
                var gridView = Ext.getCmp('idhitungpotonganlist');
                var me=Ext.getCmp('tab2g2').controller;
                var str=gridView.store;
                me.genStore(data);
                
                gridView.reconfigure(str, me.genColumns(data));
                gridView.store.load();
            },

            failure: function(response, opts) {
                var  resp = Ext.decode(response.responseText);
                if (resp.reason == 'Session Expired' || resp.message == 'Session Expired') {
                    session_expired('Session Expired');
                } else{
                    set_message(0, resp.reason +' '+resp.message);
                }
            }
        });    
    },
    

    genStore : function (json) {
        //        console.log(json);
        var me=Ext.getCmp('tab2g2').controller;
        var keys = (Object.keys(json[0]));
        //        var app = Penggajian.getApplication();
        var gridstore=Ext.getCmp('idhitungpotonganlist').store;
        gridstore.setFields(keys);
        //        gridstore.setData(json);
        
        return gridstore;
        
    },

    genColumns : function (json) {
        var me=Ext.getCmp('tab2g2').controller;
        var keys = (Object.keys(json[0]));
        //        readLog(json[0]);
        
        
        var colmap=new Array();
        var col=null;
        //colmap.push(col);
        Ext.each(keys,function (mfield) { 
            if(mfield!='id' ){       
                if(mfield=='nik'|| mfield=='thbl'){
                    col={
                        text: Ext.String.capitalize(mfield),                     
                        dataIndex: mfield,
                        align:'center',
                        width:100
                    }
                }else{
                    if(mfield=='jabatan' || mfield=='nama'){
                        col={
                            text: Ext.String.capitalize(mfield),                     
                            dataIndex: mfield,
                            align:'left',
                            width:200
                        }
                    }else{
                        col={
                            text: Ext.String.capitalize(mfield),
                            width: 150,
                            dataIndex: mfield,
                            xtype:'numbercolumn',
                            format:'0,0',
                            align:'right'
                        }
                    }
                }
                colmap.push(col);
            }          
        });
    
        return colmap;
    }
    ,
    onSearchPeriode:function(){
        var thbl=Ext.Date.format(Ext.getCmp('hitungpotongan_thbl').getValue(),'Ym');        
        var refstore=Ext.getCmp('idhitungpotonganlist').store;                                       
        refstore.load({
            params:{
                thbl:thbl,
                searchvalue:Ext.getCmp('hitungpotongansearch').getValue()
            }
        });
    }
    ,
    onHitPotongan:function(btn){
        var winhit=Ext.create({
            xtype:'hitungpotonganinput'
        });
                                            
        winhit.show();
    },
    onProcess:function(btn){
        var formfield=btn.up('form').getForm();
        var vthbl=Ext.Date.format(Ext.getCmp('hpot_thbl').getValue(),'Ym');
        if (formfield.isValid()) {
            formfield.submit({
                url: Penggajian.Global.getApiUrl() + 'hitpotongan/executeRow',
                methods:'POST',
                params:{                                     
                    _token:tokendata,
                    thbl:vthbl
                },
                // If login is successful               
                success:function(form,action) {
                    var res = Ext.decode(action.response.responseText);
                    var thbl=res.thbl;
                    
                        thbl=thbl.substring(0, 4)+'-'+thbl.substring(4, 6)+'-'+'01';     
                    Ext.getCmp('hitungpotongan_thbl').setValue(thbl);
                    
                    set_message(0, res.message); 
                    Ext.getCmp('hitungpotongansearch').setValue(null);
                    Ext.getCmp('idhitungpotonganlist').store.load({params:{thbl:thbl}});
                    Ext.getCmp('hitungpotongan_input').close();
                },
                failure:function(form,action){
                    var obj=action.response;
                     try{
                                        var  resp = Ext.decode(obj.responseText);
                                        var thbl=resp.thbl;
                                        thbl=thbl.substring(0, 4)+'-'+thbl.substring(4, 6)+'-'+'01';   
                                        Ext.getCmp('hitungpotongansearch').setValue(null);
                                        Ext.getCmp('hitungpotongan_thbl').setValue(thbl);                    
                                        Ext.getCmp('idhitungpotonganlist').store.load({params:{thbl:thbl}});
                    
                                        if (resp.reason == 'Session Expired' || resp.message == 'Session Expired') {
                                            session_expired('Session Expired');
                                        }  else{
                                            set_message(2, resp.message);
                                            Ext.getCmp('hitungpotongan_input').close();
                                        }
                                        
                                    }catch(ex){
                                        var msg=ex.message;
//                                        var divEl = Ext.DomHelper.createDom('<div>'+ex.msg+'</div>');
//                                        var vdiv=divEl.textContent;
                                        var exmsg=null;
                                        if (msg.indexOf('TokenMismatchException') > -1) {
                                            //console.log('TokenMismatchException');
                                            session_expired('Session Expired');
                                        }else{
                                            Ext.Msg.show({
                                                title:'Message Error',
                                                msg: ex.message,                                            
                                                buttons: Ext.Msg.OK,
                                                icon: Ext.Msg.ERROR,
                                                maxWidth:'100%',
                                                listeners:{
                                                    show:function(){
                                                        Ext.Msg.doComponentLayout();
                                                    }
                                                }
                                            });
                                        }

                                    }
                    
                }
            });
        }else{  
            set_message(1, 'Data Input Not Valid !');            
        }
    }
});
