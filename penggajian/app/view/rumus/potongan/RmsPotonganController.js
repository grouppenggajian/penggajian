Ext.define('Penggajian.view.rumus.potongan.RmsPotonganController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.rmspotongan',
    onShow:function(me,opts){
        //        console.log('test');
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
        this.getDataSet();
    //            var rmspotongangrid=Ext.getCmp('idpotonganlist').store;   
            
    },
    
    onClickRefresh:function(btn,opt){
        this.getDataSet();
                                                
    },
    getDataSet:function(){
        
        
        
        Ext.Ajax.request({
            url: Penggajian.Global.getApiUrl()+'rumuspotongan/load',
            method:'GET',
            waitMsg:'Load Data...',
            //                params:{},
            success: function(obj, opts) {
                var   resp = Ext.decode(obj.responseText);                 
                var data=resp.data;  
                //                console.log(data);
                var gridView = Ext.getCmp('rmspotongan_grid');
                var me=Ext.getCmp('tab1g2').controller;
                gridView.reconfigure(me.genStore(data), me.genColumns(data));
                 
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
    
    getKeysFromJson : function (obj) {
        var keys = [];
        for (var key in obj) {
            if(key!='id'){
                if (obj.hasOwnProperty(key)) {
                    keys.push(key);
                }
            }
            
        }
        return keys;
    },

    genStore : function (json) {
        //        console.log(json);
        var me=Ext.getCmp('tab1g2').controller;
        var keys = me.getKeysFromJson(json[0]);
        var app = Penggajian.getApplication();
        var gridstore=app.getStore('storerumuspotongan');
        gridstore.setFields(keys);
        gridstore.setData(json);
        
        return gridstore;
        
    },

    genColumns : function (json) {
        var me=Ext.getCmp('tab1g2').controller;
        var keys = me.getKeysFromJson(json[0]);
        //        readLog(json[0]);
        return keys.map(function (field) {
            var col=null;
            if(field=='col0'){
                col={
                    text: Ext.String.capitalize(field),
                    width: 200,
                    dataIndex: field,
                    align:'center'
                    ,
                    editor:{
                    
                        xtype:'combo',
                        id:'rumuspotongan_'+field,
                        name:'rumuspotongan_'+field,
                        hiddenName:'rumuspotongan_'+field,                                                                                        
                        store: 'storepotongan',
                        valueField: 'kode',
                        displayField: 'keterangan',
                        typeAhead: true,
                        triggerAction: 'all'                    
                        ,
                        listeners:{
                            //                            change:function( me, newValue, oldValue, eOpts ){
                            //                                 var gvStore=Ext.getCmp('rmspotongan_grid').store;
                            //                                var frec=gvStore.findRecord('col0',newValue);
                            //                                if(frec){
                            //                                    me.setValue(null);
                            //                                    set_message(2,'Record Is Exists On Entry Grid, Try Another Data !!! ');
                            //                                    
                            //                                }
                            //                            }
                            ////                            ,
                            select:function( combo, records, eOpts ){
                                var gvStore=Ext.getCmp('rmspotongan_grid').store;
                                var frec=gvStore.findRecord('col0',combo.getValue());
                                if(frec){
                                    combo.setValue(null);
                                    set_message(2,'Record Is Exists On Entry Grid, Try Another Data !!! ');
                                    Ext.getCmp('rmspotongan_grid').getView().refresh();
                                }
                            //                                getDataSeat(combo.getValue());

                            }
                        }
                                        
                    
                    
                    }
                };
            }else{
                col={
                    text: Ext.String.capitalize(field),
                    width: 100,
                    dataIndex: field,
                    align:'center'
                    ,
                    editor:{
                        xtype:'twincombo',
                        id:'rumuspotongan_'+field,                    
                        menu:'potonganeditor',                    
                        width: 95,
                        name: 'rumuspotongan_'+field,
                        itemId: 'itemIdrumuspotongan_'+field  ,
                        listeners:{
                            onChange:function(){}
                        }
                    
                    }
                };
            }
            return col;
        });
    },
    
    genColumns0 :function (json) {
        var me=Ext.getCmp('tab1g2').controller;
        var keys =me.getKeysFromJson(json);
        
        return keys.map(function (field) {
            var col=null;
            if(field=='col0'){
                col={
                    text: Ext.String.capitalize(field),
                    width: 200,
                    dataIndex: field,
                    align:'center'
                    ,
                    editor:{
                    
                        xtype:'combo',
                        id:'rumuspotongan_'+field,
                        name:'rumuspotongan_'+field,
                        hiddenName:'rumuspotongan_'+field,                                                                                        
                        store: 'storepotongan',
                        valueField: 'kode',
                        displayField: 'keterangan',
                        typeAhead: true,
                        triggerAction: 'all'                    
                    //                                            ,listeners:{
                    //                                                change:function( me, newValue, oldValue, eOpts ){
                    //                                                    getDataSeat(newValue);
                    //                                                }
                    //                                                ,select:function( combo, records, eOpts ){
                    //                                                    getDataSeat(combo.getValue());
                    //                                                    
                    //                                                }
                    //                                            }
                                        
                    
                    
                    }
                };
            }else{
                col={
                    text: Ext.String.capitalize(field),
                    width: 100,
                    dataIndex: field,
                    align:'center'
                    ,
                    editor:{
                        xtype:'twincombo',
                        id:'rumuspotongan_'+field,                    
                        menu:'potonganeditor',                    
                        width: 95,
                        name: 'rumuspotongan_'+field,
                        itemId: 'itemIdrumuspotongan_'+field  ,
                        listeners:{
                            onChange:function(){}
                        }
                    
                    }
                };
            }
            return col;
        });
    },
    addColumnClick:function(btn,opt){
        var me=Ext.getCmp('tab1g2').controller;
        var gridView = Ext.getCmp('rmspotongan_grid');     
        var gridColumn=gridView.getColumns();
        var newcolumn='col'+gridColumn.length
        var column = Ext.create('Ext.grid.column.Column', {
            text: newcolumn
        });
                        
        gridView.headerCt.insert(gridColumn.length, column);
        var sstore=gridView.store;
        var djson=new Array();
        var storefields=sstore.getModel().getFields();
console.log(storefields.length); 
        if(storefields.length>0){
            
                var field={
                    name: newcolumn, 
                    defaultValue: ''
                }
                sstore.addField(field);
            
                sstore.each(function(node){
                    djson.push(node.data);
                });
            if(djson.length==0){
                var field={}
                field[newcolumn]='';
                djson.push(field);
            }
        }else{
            var field={}
            field[newcolumn]='';
            console.log(field);  
            djson.push(field);
        }
                                        
                                                
        gridView.getView().refresh();
        if(storefields.length==0){
            gridView.reconfigure(me.genStore(djson), me.genColumns(djson));
                                                    
        }else{
            gridView.reconfigure(me.genStore(djson), me.genColumns0(gridView.store.data.items[0].data));
        }
    },
    addRowClick:function(btn,opt){
        var me=Ext.getCmp('tab1g2').controller;
        var gridView = Ext.getCmp('rmspotongan_grid');
        var sstore=gridView.store;
        var storefield=sstore.getModel().getFields();
        //        console.log(storefield);
        if(storefield.length==0){
            return;
        }
        
        //                                                readLog(sstore.data);
        //                                                readLog(sstore.data.items[0].fields.keys);
        //        var keysfield=storefield;
        var retval={};
        var rdata=storefield.map(function(field){
            if(field!=='id'){
                retval[field]='';
            }
                                                    
        });
        //        readLog(Ext.JSON.encode(retval));
        sstore.insert(sstore.getCount(), retval);
    //                                                json1.push(retval);
    //                                                readLog(json1);
    },
    onSaveClick:function(btn,opt){
        var datasave=new Array();
        var gridView = Ext.getCmp('rmspotongan_grid');
        var sstore=gridView.store;        
        var storefield=sstore.getModel().getFields();
        var i=-1;
        sstore.each(function(node){
            i++;
            var ndata=node.data;
            //                                                    readLog(ndata);
//            var keysfield=node.fields.keys;
            //    
            if(ndata.col0!==null || ndata.col0!=='undefined'){
                Ext.each(storefield, function(keys) {
                if(keys.name!=='id'){
                    if(keys.name==storefield[0].name){
                        datasave.push({
                            kode:ndata[keys.name],
                            komponen:null,
                            rowset:i,
                            column_name:keys.name
                        });
                    }else{
                        datasave.push({
                            kode:ndata[storefield[0].name],
                            komponen:ndata[keys.name],
                            rowset:i,
                            column_name:keys.name
                        });
                    }
                    
                }
                                                       
            });
            }
            
                                                    
        });
//         console.log(datasave);    
//         return;
        execute_confirm('Are you sure to save this ?', Penggajian.Global.getApiUrl()+'rumuspotongan/save', {
            postdata:Ext.JSON.encode(datasave),_token:tokendata
            }, function(obj) {                                                            
            var retval=Ext.JSON.decode(obj.responseText);
            var me=Ext.getCmp('tab1g2').controller;
            me.onClickRefresh();
            set_message(0,retval.message)
            } );
                                                
    }
    
    
    
});


