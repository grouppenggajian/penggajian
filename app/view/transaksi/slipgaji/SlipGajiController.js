Ext.define('Penggajian.view.transaksi.slipgaji.SlipGajiController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.transaksi-slipgaji-slipgaji'
    ,
    onShow:function(){
        
        
        var mymodel = Ext.getCmp('tab2g6').getViewModel();
        var refstore=mymodel.getData().storeslipgaji; 
        
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
                        Ext.getCmp('slipgaji_periode').setValue(thbl);
                        refstore.getProxy().setExtraParam('thbl',records[0].get('thbl'));  
                        this.getDataSet();   
                            
                    //refstore.getProxy().setExtraParam('thbl',records[0].get('thbl'));                        
                    //                        refstore.load({
                    //                            params:{
                    //                                searchvalue:Ext.getCmp('slipgajisearch').getValue()
                    //                            }
                    //                        });
                            
                    }
                }
            }
        });
    },
    getDataSet:function(){
        var mymodel = Ext.getCmp('tab2g6').getViewModel();
        var refstore=mymodel.getData().storeslipgaji; 
        var vurl=Penggajian.Global.getApiUrl() +'slipgaji/loadsetcolumn';//refstore.getProxy().getUrl();
//                console.log(vurl);
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
                var gridView = Ext.getCmp('idslipgajilist');
                var me=Ext.getCmp('tab2g6').controller;
                var mymodel = Ext.getCmp('tab2g6').getViewModel();
                var str=mymodel.getData().storeslipgaji; 
                
                str=me.genStore(data);
                gridView.setStore(str);
                gridView.reconfigure(str, me.genColumns(data));
//                str.load();
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
        var me=Ext.getCmp('tab2g6').controller;
        var keys = (Object.keys(json[0]));
        var mymodel = Ext.getCmp('tab2g6').getViewModel();
        var gridstore=mymodel.getData().storeslipgaji;         
        gridstore.setFields(keys);        //        gridstore.setData(json);        
        return gridstore;
        
    },

    genColumns : function (json) {
        var me=Ext.getCmp('tab2g6').controller;
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
    },
    onClickSearch:function(btn){
        
        var mymodel = Ext.getCmp('tab2g6').getViewModel();
        var refstore=mymodel.getData().storeslipgaji; 
        var vthbl=Ext.getCmp('slipgaji_periode').getValue();
        var vnik=Ext.getCmp('slipgaji_nik').getValue();
        var vjabatan=Ext.getCmp('slipgaji_kodejabatan').getValue();
        if(vthbl){
            vthbl=vthbl.toThblMysql();
        }
        delete refstore.getProxy().setExtraParam('thbl',null); 
        delete refstore.getProxy().setExtraParam('nik',null); 
        delete refstore.getProxy().setExtraParam('jabatan',null); 
        
        if(!Ext.getCmp('slipgaji_periode_check').getValue()){
          set_message(2, 'Periode Gaji Belum Dipilih !');
          return;
        }
        if(Ext.getCmp('slipgaji_nik_check').getValue()){
            refstore.getProxy().setExtraParam('nik',vnik); 
        }
        if(Ext.getCmp('slipgaji_jabatan_check').getValue()){
            refstore.getProxy().setExtraParam('jabatan',vjabatan); 
        }
        refstore.getProxy().setExtraParam('thbl',vthbl);  
        refstore.load(
        {
            callback:function(records, operation, success){
                if(!success){
                    var resp=Ext.decode(operation.getResponse().responseText);
                    var vmsg=resp.message;
                    set_message(2, vmsg);
                    return;
                }
            }
        }
    );
        
    },
    onClickReport:function(btn){
        
        var vthbl=Ext.getCmp('slipgaji_periode').getValue();
        var vnik=Ext.getCmp('slipgaji_nik').getValue();
        var vjabatan=Ext.getCmp('slipgaji_kodejabatan').getValue();
        if(vthbl){
            vthbl=vthbl.toThblMysql();
        }
        if(!Ext.getCmp('slipgaji_periode_check').getValue()){
          set_message(2, 'Periode Gaji Belum Dipilih !');
          return;
        }
        var vparamreport='?thbl='+vthbl;
        
        if(Ext.getCmp('slipgaji_nik_check').getValue()){
         vparamreport=vparamreport+'&nik='+vnik;
        }
        if(Ext.getCmp('slipgaji_jabatan_check').getValue()){
            vparamreport=vparamreport+'&jabatan='+vjabatan;
        }
             
        
        
        var winpreview=Ext.create({
            xtype:'winprint'
        });
        winpreview.maximize();
        //                                readLog('transport/transportreport_pdf?query='+Ext.JSON.encode(query));
        to_print('printoutpdf', 'slipgaji/loadreport'+vparamreport); 
    }
});
