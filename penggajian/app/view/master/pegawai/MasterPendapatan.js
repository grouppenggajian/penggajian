Ext.define('Penggajian.view.master.pegawai.MasterPendapatan', 
    {
        extend          : 'Ext.window.Window',
        title           : 'Master Pendapatan',
        //        plugins: {
        //            ptype: 'datatip'
        //        },
        width           : 400,
        height          : 300,
        layout          : 'fit',
        autoShow        : true,
        scrollable      : true,
        modal           : true,
        alias           : 'widget.pegawaimasterpendapatan',
        id              : 'pegawaimasterpendapatan',
        maximizable     :false,

        
        items:[
            {
            xtype:'grid',
            id:'gridmasterpendapatan',
            //        store: 'Department',
            store: 'storependapatan',
            selType: 'checkboxmodel',
            columns: [            
               
            {
                text: 'Kode',  
                dataIndex: 'kode',
                align:'center'
            },
            {
                text: 'Keterangan', 
                dataIndex: 'keterangan', 
                align:'left',
                flex: 1
            }
            
       
            ],
            bbar:[
            {
                text:'Add',
                iconCls:'icons-add',
                handler:function(btn){
                    var grid=Ext.getCmp('gridpegawaipendapatan');
                    var gridmaster=Ext.getCmp('gridmasterpendapatan');
                    
                    var gridstore=grid.store;
                    var recselect=new Array();
                    var frec;
                    var pilihdata=gridmaster.getSelectionModel().getSelection();
                    console.log(pilihdata);
                    if(!pilihdata){
                        set_message(2,'No Selected Data');
                        return;
                    }else{
                        if(pilihdata.length==0 || pilihdata.length<0){
                            set_message(2,'No Selected Data');
                            return;
                        }
                    }
                    Ext.each(pilihdata, function(rec) {
                       frec= gridstore.findRecord('kode',rec.get('kode'));
                       if(frec){
                           recselect.push(frec);
                        }
                      });
                    if(recselect.length>0){
                        var msg=recselect[0].get('kode');
                        set_message(1,msg+' Sudah Terdaftar !');
                        return;
                    }
                    
                    if(pilihdata.length>0){
                        var retval={};
                        var nik=Ext.getCmp('pegawainik').getValue();
                        var jbt=Ext.getCmp('pegawaijabatan').getValue();
                        
                        Ext.each(pilihdata, function(rec) {
                            
                            retval['nik']=nik
                            retval['kode_jabatan']=jbt;
                            retval['kode']=rec.get('kode');
                            retval['keterangan']=rec.get('keterangan');
                            retval['batas']=0;
                            retval['batas_min']=null;
                            retval['batas_max']=null;
                            retval['nilai']=0;
                            gridstore.insert(gridstore.getCount(), retval);
                            retval={};
                       
                      });
                       Ext.getCmp('pegawaimasterpendapatan').close();
                    }
                        
                    
//                    
                }
            }]
           
        }
        ],listeners:{
            show:function(){
                Ext.getCmp('gridmasterpendapatan').store.load();
            }
        }
    }
    )