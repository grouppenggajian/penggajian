Ext.define('Penggajian.view.transaksi.koreksigaji.KoreksiGajiController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.koreksigaji'
    ,onShow:function(){
        var mymodel=Ext.getCmp('tab2g4').getViewModel();
        var refstore=mymodel.getData().strkoreksigaji; 
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
//                        thbl=thbl.substring(0, 4)+'-'+thbl.substring(4, 6)+'-'+'01';                                                   
                        Ext.getCmp('koreksigajithbl').setValue(thbl.toThblExt());
                        refstore.getProxy().setExtraParam('thbl',records[0].get('thbl'));  
                        this.getDataSet();   
                            
                    //refstore.getProxy().setExtraParam('thbl',records[0].get('thbl'));                        
                    //                        refstore.load({
                    //                            params:{
                    //                                searchvalue:Ext.getCmp('rekapgajisearch').getValue()
                    //                            }
                    //                        });
                            
                    }
                }
            }
        });
    },
    getDataSet:function(){
        var mymodel=Ext.getCmp('tab2g4').getViewModel();
        var refstore=mymodel.getData().strkoreksigaji; 
        var vurl=refstore.getProxy().getUrl();
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
                var gridView = Ext.getCmp('idkoreksigajilist');
                var me=Ext.getCmp('tab2g4').controller;
                var str=Ext.getCmp('tab2g4').getViewModel().getData().strkoreksigaji;
                me.genStore(data);
                
                gridView.reconfigure(str, me.genColumns(data));
                str.load();
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
        var me=Ext.getCmp('tab2g4').controller;
        var keys = (Object.keys(json[0]));
        //        var app = Penggajian.getApplication();
        var gridstore=Ext.getCmp('tab2g4').getViewModel().getData().strkoreksigaji;
        gridstore.setFields(keys);
        //        gridstore.setData(json);
        
        return gridstore;
        
    },

    genColumns : function (json) {
        var me=Ext.getCmp('tab2g4').controller;
        var keys = (Object.keys(json[0]));
        //        readLog(json[0]);
        
        
        var colmap=new Array();
        var col=null;
        colmap.push({
            xtype: 'actioncolumn',
            header: 'Koreksi',
            menuDisabled: true,
            sortable: false,   
            align:'center',
            width: 85,
            items: [
            {
                iconCls: 'icon-processedit',
                tooltip: 'Koreksi Row',
                handler: 'onKoreksiClick' 
            }]
                                
        });
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
    ,onSearchPeriode:function(btn){
        var mymodel=Ext.getCmp('tab2g4').getViewModel();
        var refstore=mymodel.getData().strkoreksigaji; 
        var searchvalue=Ext.getCmp('koreksigajisearch').getValue();
        var vthbl=Ext.getCmp('koreksigajithbl').getValue();
        if(vthbl){
            vthbl=vthbl.toThblMysql();
        }
        refstore.getProxy().setExtraParam('thbl',vthbl); 
        refstore.getProxy().setExtraParam('searchvalue',searchvalue); 
        refstore.load();
        
        
    }
    ,onKoreksiClick:function(grid, rowIndex, colIndex) {
      
        var rec = grid.getStore().getAt(rowIndex); 
        var winkoreksigaji=Ext.create({
            xtype:'koreksigajiinput'
        });
        Ext.getCmp('koreksigaji_thbl').setValue(rec.get('thbl').toThblExt());
        Ext.getCmp('koreksigaji_nik').setValue(rec.get('nik'));
        Ext.getCmp('koreksigaji_nama').setValue(rec.get('nama'));
        Ext.getCmp('koreksigaji_jabatan').setValue(rec.get('jabatan'));
        Ext.getCmp('koreksigaji_totalgaji').setValue(rec.get('total'));
        winkoreksigaji.show();
        var mymodel=Ext.getCmp('koreksigaji_input').getViewModel();
        mymodel.getData().strkoreksigajipendapatan.load(
        {
            params:{thbl:rec.get('thbl'),nik:rec.get('nik')},
            callback:function(records, operation, success){
                if(success){
                    if(records.length>0){
                        var totalpendapatan=0;
                        Ext.each(records,function(data){
//                            console.log(data.get('nilai'));
                            totalpendapatan = totalpendapatan+ parseFloat(data.get('nilai'));
                        });
                        Ext.getCmp('koreksigaji_totalpendapatan').setValue(totalpendapatan);
                    }
                }
            }
        });
        mymodel.getData().strkoreksigajipotongan.load(
        {
            params:{thbl:rec.get('thbl'),nik:rec.get('nik')},
            callback:function(records, operation, success){
                if(success){
                    if(records.length>0){
                        var totalpotongan=0;
                        Ext.each(records,function(data){
//                            console.log(data.get('nilai'));
                            totalpotongan = totalpotongan+ parseFloat(data.get('nilai'));
                        });
                        Ext.getCmp('koreksigaji_totalpotongan').setValue(totalpotongan);
                        
                    }
                }
            }
        });
        
        
    },
    onSave:function(btn){
        var formfield=btn.up('form').getForm();
        //        console.log(frm.getId());
        var opt='';
        if (formfield.isValid()) {
            var mymodel=Ext.getCmp('koreksigaji_input').getViewModel();
            var vthbl=Ext.getCmp('koreksigaji_thbl').getValue().toThblMysql();
            var vpendapatan=new Array();
            var vpotongan=new Array();
            Ext.getCmp('koreksigajithbl').setValue(Ext.getCmp('koreksigaji_thbl').getValue());
            var recpendapatan = mymodel.getData().strkoreksigajipendapatan;
            recpendapatan.each(function(node){
                vpendapatan.push(node.data);
            });
            var recpotongan = mymodel.getData().strkoreksigajipotongan;
            recpotongan.each(function(node){
                vpotongan.push(node.data);
            });
            
            formfield.submit({
                url: Penggajian.Global.getApiUrl() + 'koreksigaji/executeRow',
                methods:'POST',
                params:{
                    pendapatan:Ext.JSON.encode(vpendapatan),                                  
                    potongan:Ext.JSON.encode(vpotongan),
                    vthbl:vthbl,
                    _token:tokendata
                },
                // If login is successful               
                success:function(form,action) {
                    var res = Ext.decode(action.response.responseText);
                    set_message(0, res.message);                    
                    Ext.getCmp('tab2g4').getController().onSearchPeriode();
                    Ext.getCmp('koreksigaji_input').close();
                },
                failure:function(form,action){
                    var obj=action.response;
                    try{
                        var  resp = Ext.decode(obj.responseText);                                        
                        Ext.getCmp('tab2g4').getController().onSearchPeriode();
                    
                        if (resp.reason == 'Session Expired' || resp.message == 'Session Expired') {
                            session_expired('Session Expired');
                        } else{
                            set_message(2, resp.message);
                            Ext.getCmp('koreksigaji_input').close();
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
                                    
                //                                                                Ext.Msg.alert('info',resp.reason);
                                
                    
                }
            });
        }else{  
            set_message(1, 'Data Input Not Valid !');            
        }
    }
});
