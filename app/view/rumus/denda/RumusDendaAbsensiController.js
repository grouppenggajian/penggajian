Ext.define('Penggajian.view.rumus.denda.RumusDendaAbsensiController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.rumusdendaabsensi',
    onShow:function(){
        var mytab=Ext.getCmp('tab1g7');
        
        mytab.getViewModel().getData().strkategori_ijin.load();
        mytab.getViewModel().getData().strpotongan.load();
        Ext.getCmp('rmsdendaabsensi_kategori_ijin').setValue(null);
        Ext.getCmp('rmsdendaabsensi_tipe_ijin').setValue(null);
        Ext.getCmp('rmsdendaabsensi_postpotongan').setValue(null);
        Ext.getCmp('rmsdendaabsensi_pembagi').setValue(null);
    },
    onRefreshClick:function(){
        var mytab=Ext.getCmp('tab1g7');
        mytab.getController().onSelectDenda();
    },
    onSelectDenda:function(){
        var vkategori=Ext.getCmp('rmsdendaabsensi_kategori_ijin').getValue();
        var vtipe=Ext.getCmp('rmsdendaabsensi_tipe_ijin').getValue();
        var mytab=Ext.getCmp('tab1g7');
        Ext.getCmp('rmsdendaabsensi_postpotongan').setValue(null);
        Ext.getCmp('rmsdendaabsensi_pembagi').setValue(null);
        mytab.getViewModel().getData().strdenda.load({
            params:{
                kode:vkategori,
                tipe:vtipe
            },
            callback:function(records, operation, success){
                if(success){
                    if(records.length>0){
                        Ext.getCmp('rmsdendaabsensi_postpotongan').setValue(records[0].get('kode_potongan'));
                        Ext.getCmp('rmsdendaabsensi_pembagi').setValue(records[0].get('pembagi'));
                        
                    }
                }
            }
        });
        mytab.getViewModel().getData().strdendapendapatan.load({
            params:{
                kode:vkategori,
                tipe:vtipe
            }
        });
        mytab.getViewModel().getData().strdendapengali.load({
            params:{
                kode:vkategori,
                tipe:vtipe
            }
        });
       
                                
                                
    },
    onSimpanClick:function(btn){
        var formfield=btn.up('form').getForm();
        //        console.log(frm.getId());
        var opt='';
        var formvalue=Ext.getCmp('rmsdendaabsensi_formnorth').getForm().getValues();
        console.log(formvalue);
        var dendapendapatan=new Array();
        var recpendapatan = Ext.getCmp('rmsdendaabsensi_pendapatan').getStore();
        recpendapatan.each(function(node){
            dendapendapatan.push(node.data);
        });
        
        var dendapengali=new Array();
        var recpengali = Ext.getCmp('rmsdendaabsensi_pengali').getStore();
        recpengali.each(function(node){
            dendapengali.push(node.data);
        });
        if (formfield.isValid()) {
            formfield.submit({
                url: Penggajian.Global.getApiUrl() + 'rumusdendaabsensi/executeRow',
                methods:'POST',
                params:{
                    opt:opt,
                    formvalue:Ext.JSON.encode(formvalue),     
                    pendapatan:Ext.JSON.encode(dendapendapatan),                                  
                    pengali:Ext.JSON.encode(dendapengali),
                    _token:tokendata
                },
                // If login is successful               
                success:function(form,action) {
                    var res = Ext.decode(action.response.responseText);
                    var mytab=Ext.getCmp('tab1g7');
                    mytab.getController().onSelectDenda();
                    Ext.Msg.show({
                        title:'Message Info',
                        msg: res.message,                                            
                        buttons: Ext.Msg.OK,
                        icon: Ext.Msg.INFO,
                        maxWidth:'100%',
                        listeners:{
                            show:function(){
                                Ext.Msg.doComponentLayout();
                            }
                        }
                    });
                //                    set_message(0, res.message); 
                //                    Ext.getCmp('tab1g7').getController().onGetkategori_ijin();
                    
                },
                failure:function(form,action){
                    var obj=action.response;
                    try{
                        var  resp = Ext.decode(obj.responseText);
                        //                                        var tglawal=resp.tglawal;
                        //                                        var tglakhir=resp.tglakhir;
                        //                                        Ext.getCmp('hitunglembur_start').setValue(tglawal);
                        //                                        Ext.getCmp('hitunglembur_finish').setValue(tglakhir);                    
                        //                                        Ext.getCmp('idhitunglemburlist').store.load({params:{awal:tglawal,akhir:tglakhir}});
                    
                        if (resp.reason == 'Session Expired' || resp.message == 'Session Expired') {
                            session_expired('Session Expired');
                        } else{
                            set_message(2, resp.message);
                        //                                            Ext.getCmp('hitunglembur_input').close();
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
    },
    onDeletePendapatan:function(grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        Ext.Msg.show({
            title: 'Confirm',
            msg: 'Are you sure delete selected row ?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            fn: function(btn){
                if (btn == 'yes') {                                                                
                    var data = rec.data;   
                    var vkategori=Ext.getCmp('rmsdendaabsensi_kategori_ijin').getValue();
                    var vtipe=Ext.getCmp('rmsdendaabsensi_tipe_ijin').getValue();
                    Ext.Ajax.request({                                                            
                        url: Penggajian.Global.getApiUrl() + 'rumusdendaabsensi/deletependapatan',
                        method: 'POST',
                        params: {
                            kode:vkategori,
                            tipe:vtipe,
                            opt: 'delete',
                            _token: tokendata,                                            
                            postdata:Ext.JSON.encode(data)
                        },
                        success: function(obj) {
                            var mytab=Ext.getCmp('tab1g7');
                            var   resp = Ext.decode(obj.responseText);                                                                
                            if(resp.success==true){
                                //                                                var mytab=Ext.getCmp('tab1g7');
                                mytab.getController().onSelectDenda();
                                Ext.Msg.show({
                                    title:'Message Info',
                                    msg: resp.message,
                                    buttons: Ext.Msg.OK,
                                    icon: Ext.Msg.INFO
                                });
                                                
                            }else{
                                                
                                mytab.getController().onSelectDenda();
                                Ext.Msg.show({
                                    title: 'Error',
                                    msg: resp.message,
                                    modal: true,
                                    icon: Ext.Msg.ERROR,
                                    buttons: Ext.Msg.OK,
                                    fn: function(btn){
                                        if (btn == 'ok' && resp.msg == 'Session Expired') {
                                            window.location = Penggajian.Global.getApiUrl();
                                        }
                                    }
                                });
                            }
                        },
                        failure: function(obj) {
                            var  resp = Ext.decode(obj.responseText);
                            Ext.Msg.alert('info',resp.reason);
                        }
                    });                 
                } 
            }
        });
    },
    onDeletePengali:function(grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        Ext.Msg.show({
            title: 'Confirm',
            msg: 'Are you sure delete selected row ?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            fn: function(btn){
                if (btn == 'yes') {                                                                
                    var data = rec.data;      
                    var vkategori=Ext.getCmp('rmsdendaabsensi_kategori_ijin').getValue();
                    var vtipe=Ext.getCmp('rmsdendaabsensi_tipe_ijin').getValue();
                    Ext.Ajax.request({                                                            
                        url: Penggajian.Global.getApiUrl() + 'rumusdendaabsensi/deletepengali',
                        method: 'POST',
                        params: {
                            kode:vkategori,
                            tipe:vtipe,
                            opt: 'delete',
                            _token: tokendata,
                            postdata:Ext.JSON.encode(data)
                        },
                        success: function(obj) {
                            var   resp = Ext.decode(obj.responseText);  
                            var mytab=Ext.getCmp('tab1g7');
                                            
                            if(resp.success==true){
                                //                                                var mytab=Ext.getCmp('tab1g7');
                                mytab.getController().onSelectDenda();
                                Ext.Msg.show({
                                    title:'Message Info',
                                    msg: resp.message,
                                    buttons: Ext.Msg.OK,
                                    icon: Ext.Msg.INFO
                                });
                            //                                                Ext.getCmp('rmsketerlambatan_pengali').store.reload();
                            }else{
                                                
                                mytab.getController().onSelectDenda();
                                Ext.Msg.show({
                                    title: 'Error',
                                    msg: resp.message,
                                    modal: true,
                                    icon: Ext.Msg.ERROR,
                                    buttons: Ext.Msg.OK,
                                    fn: function(btn){
                                        if (btn == 'ok' && resp.msg == 'Session Expired') {
                                            window.location = Penggajian.Global.getApiUrl();
                                        }
                                    }
                                });
                            }
                        },
                        failure: function(obj) {
                            var  resp = Ext.decode(obj.responseText);
                            Ext.Msg.alert('info',resp.reason);
                        }
                    });                 
                } 
            }
        });
    } ,
    onDeleteRumus:function(btn){
        Ext.Msg.show({
            title: 'Confirm',
            msg: 'Are you sure delete this ?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            fn: function(btn){
                if (btn == 'yes') {  
                    var myformnorth=Ext.getCmp('rmsdendaabsensi_formnorth').getForm();
                    var formvalue=myformnorth.getValues();
                    var dendapendapatan=new Array();
                    var recpendapatan = Ext.getCmp('rmsdendaabsensi_pendapatan').getStore();
                    recpendapatan.each(function(node){
                        dendapendapatan.push(node.data);
                    });

                    var dendapengali=new Array();
                    var recpengali = Ext.getCmp('rmsdendaabsensi_pengali').getStore();
                    recpengali.each(function(node){
                        dendapengali.push(node.data);
                    });
                    if (myformnorth.isValid()) {
                        myformnorth.submit({
                                
                            url: Penggajian.Global.getApiUrl() + 'rumusdendaabsensi/deletedenda',
                            methods:'POST',
                            params:{
                                opt:'delete',
                                formvalue:Ext.JSON.encode(formvalue),     
                                pendapatan:Ext.JSON.encode(dendapendapatan),                                  
                                pengali:Ext.JSON.encode(dendapengali),
                                _token:tokendata
                            },
                            // If login is successful               
                            success:function(form,action) {
                                var res = Ext.decode(action.response.responseText);
                                var mytab=Ext.getCmp('tab1g7');
                                mytab.getController().onSelectDenda();
                                Ext.Msg.show({
                                    title:'Message Info',
                                    msg: res.message,                                            
                                    buttons: Ext.Msg.OK,
                                    icon: Ext.Msg.INFO,
                                    maxWidth:'100%',
                                    listeners:{
                                        show:function(){
                                            Ext.Msg.doComponentLayout();
                                        }
                                    }
                                });
                            //                    set_message(0, res.message); 
                            //                    Ext.getCmp('tab1g7').getController().onGetkategori_ijin();
                    
                            },
                            failure:function(form,action){
                                var obj=action.response;
                                try{
                                    var  resp = Ext.decode(obj.responseText);
                                    //                                        var tglawal=resp.tglawal;
                                    //                                        var tglakhir=resp.tglakhir;
                                    //                                        Ext.getCmp('hitunglembur_start').setValue(tglawal);
                                    //                                        Ext.getCmp('hitunglembur_finish').setValue(tglakhir);                    
                                    //                                        Ext.getCmp('idhitunglemburlist').store.load({params:{awal:tglawal,akhir:tglakhir}});
                    
                                    if (resp.reason == 'Session Expired' || resp.message == 'Session Expired') {
                                        session_expired('Session Expired');
                                    } else{
                                        set_message(2, resp.message);
                                    //                                            Ext.getCmp('hitunglembur_input').close();
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
                        })
                    }else{  
                        set_message(1, 'Data Input Not Valid !');            
                    }
                }
            }
        });
        
                        
    }
});
