Ext.define('Penggajian.view.transaksi.rekapgaji.RekapGajiController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.rekapgaji'
    ,
    onShow:function(){
        
        var refstore=Ext.getCmp('idrekapgajilist').store; 
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
                        Ext.getCmp('rekapgaji_thbl').setValue(thbl);
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
        
        var vurl=Ext.getCmp('idrekapgajilist').store.getProxy().getUrl();
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
                var gridView = Ext.getCmp('idrekapgajilist');
                var me=Ext.getCmp('tab2g3').controller;
                var str=gridView.store;
                str=me.genStore(data);
                gridView.setStore(str);
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
        var me=Ext.getCmp('tab2g3').controller;
        var keys = (Object.keys(json[0]));
        //        var app = Penggajian.getApplication();
        var gridstore=Ext.getCmp('idrekapgajilist').store;
        gridstore.setFields(keys);
        //        gridstore.setData(json);
        
        return gridstore;
        
    },

    genColumns : function (json) {
        var me=Ext.getCmp('tab2g3').controller;
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
        var thbl=Ext.Date.format(Ext.getCmp('rekapgaji_thbl').getValue(),'Ym');        
        var refstore=Ext.getCmp('idrekapgajilist').store;                                       
        refstore.load({
            params:{
                thbl:thbl,
                searchvalue:Ext.getCmp('rekapgajisearch').getValue()
            }
        });
    },
    exportToXlsx:function(btn){
        var thbl=Ext.Date.format(Ext.getCmp('rekapgaji_thbl').getValue(),'Ym');        
        var refstore=Ext.getCmp('idrekapgajilist').store;       
        var vurl=refstore.getProxy().getUrl();
        var vurelnew=Penggajian.Global.getApiUrl() + 'rekapgaji/loadAll';
        refstore.getProxy().setUrl(vurelnew);
        
        refstore.getProxy().setExtraParam('thbl',thbl);
        refstore.getProxy().setExtraParam('searchvalue',Ext.getCmp('rekapgajisearch').getValue());
                        
        refstore.load({            
            callback:function(records, operation, success){
                if(success){
                    if(records.length>0){
                        var mdata = Ext.getCmp('idrekapgajilist').exportStore(Ext.getCmp('idrekapgajilist'),refstore,Ext.getCmp('idrekapgajilist').getColumns(),'excel','RekapGaji');
                        console.log(mdata);
                        refstore.getProxy().setUrl(vurl);
                        refstore.load();
                        document.location= mdata;
                        
                    }
                }
            }
        });
        
    }
    
});
