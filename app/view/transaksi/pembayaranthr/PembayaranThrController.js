Ext.define('Penggajian.view.transaksi.pembayaranthr.PembayaranThrController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.pembayaranthr'
    ,onShow:function(btn){
        var mymodel=Ext.getCmp('tab2h6').getViewModel();
        var refstore=mymodel.getData().strpaymentthr;
        var vtahun=Ext.getCmp('pembayaranthrtahun').getValue();
        
        var vsearchvalue=Ext.getCmp('pembayaranthrsearch').getValue();
        refstore.getProxy().setExtraParam('tahun',vtahun);         
        refstore.getProxy().setExtraParam('searchvalue',vsearchvalue); 
        refstore.load();
        
    }
    ,onClickSearch:function(btn){
        var mymodel=Ext.getCmp('tab2h6').getViewModel();
        var refstore=mymodel.getData().strpaymentthr;
        var vtahun=Ext.getCmp('pembayaranthrtahun').getValue();
        
        var vsearchvalue=Ext.getCmp('pembayaranthrsearch').getValue();
        refstore.getProxy().setExtraParam('tahun',vtahun);         
        refstore.getProxy().setExtraParam('searchvalue',vsearchvalue); 
        refstore.load();
        
    },
    onPayment:function(grid, rowIndex, colIndex){
        var rec = grid.getStore().getAt(rowIndex);
        var winpay=Ext.create({
            xtype:'inputpembayaranthr'
        });
//        Ext.getCmp('idButtonVmsEdit').setText('Update');
//        Ext.getCmp('idButtonVmsEdit').setIconCls('icon-edit-record');
        
        Ext.getCmp('formpembayaranthrinput').loadRecord(rec);
        winpay.show();
    }
    ,onProcess:function(btn){
        var formfield=btn.up('form').getForm();
        //        console.log(frm.getId());
        var opt='';
        var vpayment=Ext.getCmp('pembayaranthr_payment').getValue();
        if(!vpayment){
            vpayment=0;
        }
        if (formfield.isValid() && vpayment>0) {            
            var vtgl=Ext.getCmp('pembayaranthr_tglpay').getValue().toMysql();
            var vthbl=Ext.getCmp('pembayaranthr_tahun').getValue();
            Ext.getCmp('pembayaranthrtahun').setValue(vthbl);
            
//            var vdata=formfield.getData();
//            consle.log(vdata);
            formfield.submit({
                url: Penggajian.Global.getApiUrl() + 'paymentthr/executeRow',
                methods:'POST',
                params:{                    
                    vtglpay:vtgl,                    
                    _token:tokendata
                },
                // If login is successful               
                success:function(form,action) {
                    var res = Ext.decode(action.response.responseText);
                    set_message(0, res.message);                    
                    Ext.getCmp('tab2h6').getController().onClickSearch();
                    var vnik=Ext.getCmp('pembayaranthr_nik').getValue();
                    var vtahun=Ext.getCmp('pembayaranthr_tahun').getValue();
                    var vparamreport='?tahun='+vtahun+'&nik='+vnik;
                    var winpreview=Ext.create({
                        xtype:'winprint'
                    });
                    winpreview.maximize();
                    //                                readLog('transport/transportreport_pdf?query='+Ext.JSON.encode(query));
                    to_print('printoutpdf', 'paymentthr/loadreport'+vparamreport);
                    Ext.getCmp('input_pembayaranthr').close();
                },
                failure:function(form,action){
                    var obj=action.response;
                    try{
                        var  resp = Ext.decode(obj.responseText);                                        
                        Ext.getCmp('tab2h6').getController().onClickSearch();
                    
                        if (resp.reason == 'Session Expired' || resp.message == 'Session Expired') {
                            session_expired('Session Expired');
                        } else{
                            set_message(2, resp.message);
                            Ext.getCmp('input_pembayaranthr').close();
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
    },
    onViewBayar:function(grid, rowIndex, colIndex){
        var rec = grid.getStore().getAt(rowIndex);
        var vparamreport='?tahun='+rec.get('tahun')+'&nik='+rec.get('nik');
        var winpreview=Ext.create({
                        xtype:'winprint'
                    });
                    winpreview.maximize();
                    //                                readLog('transport/transportreport_pdf?query='+Ext.JSON.encode(query));
                    to_print('printoutpdf', 'paymentthr/loadreport'+vparamreport);
    }
});
