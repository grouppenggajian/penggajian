Ext.define('Penggajian.view.transaksi.pinjaman.Pinjaman', {
    extend: 'Ext.container.Container',
    xtype: 'TabPinjaman',
    alias: 'widget.Pinjaman',
    requires: [
    'Penggajian.view.transaksi.pinjaman.PinjamanController',
    'Penggajian.view.transaksi.pinjaman.PinjamanInput'
    ],
    controller:'pinjaman',
    title: 'Transaksi Peminjaman',
    id: 'tab2e',
    closable: true,        
    layout: 'border', 
    items:[       
    {
        xtype:'panel',
        region:'center',
        layout: 'fit',
        bodyPadding: '5 5 5 5',
        items:[
        {
            xtype:'grid',
            id:'idpinjamanlist',
            //        store: 'Department',
            store: 'storepinjaman',

            columns: [            
            {
                text: 'No Pinjaman',  
                dataIndex: 'no_pinjaman',
                align:'center'
            },
            {
                text: 'Tanggal', 
                dataIndex: 'tgl_pinjam', 
                align:'left'
            },
            {
                text: 'Keterangan', 
                dataIndex: 'keterangan', 
                align:'left',
                width:150
            },
            {
                text: 'NIK', 
                dataIndex: 'nik', 
                align:'left'
            },
            {
                text: 'Nama', 
                dataIndex: 'nama', 
                align:'left',
                width:150
            },
            {
                text: 'Jabatan', 
                dataIndex: 'nama_jabatan', 
                align:'left',
                width:150
            },
            
            {
                text: 'Nominal', 
                dataIndex: 'nominal', 
                align:'right',
                xtype:'numbercolumn',
                format:'0,0',
                width:150
            },
            {
                text: 'Kali', 
                dataIndex: 'kali_angsuran', 
                align:'center',
                width:60
            },
            {
                text: 'Jumlah Angsuran', 
                dataIndex: 'jumlah_angsuran', 
                align:'right',
                xtype:'numbercolumn',
                format:'0,0',
                width:150
                
            },
            {
                text: 'Saldo Angsuran', 
                dataIndex: 'saldo_pinjaman', 
                align:'right',
                xtype:'numbercolumn',
                format:'0,0',
                width:150
            },
            {
                text: 'Status Lunas', 
                dataIndex: 'status_lunas', 
                align:'center',
                xtype: 'checkcolumn',
//                flex: 1,
                processEvent:function(){
                    return false;
                }
            }
       
            ],
            tbar:[
            {
                text:'Add',
                iconCls:'icons-add',
                handler:'onClickAdd'
            }],
            bbar: {
                xtype: 'pagingtoolbar',
                displayInfo: true,
                pageSize: 10,
                store: 'storepinjaman'
            },
            listeners:{
                itemclick:'onGridRowClick'
            }
        }
        ]
                
    },
    {
            split:true,
            xtype:'grid',
            title:'Angsuran',
            id:'idpinjamanangsuran',
            region:'south',
            heigth:150,
            minHeight:150,
            
            //        store: 'Department',
            store: 'storepinjamanangsuran',

            columns: [
            {
                text: 'Tanggal Angs',  
                dataIndex: 'tgl_angsuran',
                align:'center',                
                width: 100
            },
            {
                text: 'Angsuran Ke',  
                dataIndex: 'angsuran_ke',
                align:'center',                
                width: 100
            },
            {
                text: 'Jumlah', 
                dataIndex: 'jumlah_angsuran', 
                align:'right',
                xtype:'numbercolumn',
                format:'0,0',
                width: 150
            }
            ],bbar: {
                xtype: 'pagingtoolbar',
                displayInfo: true,
                pageSize: 10,
                store: 'storepinjamanangsuran'
            }
        }
            
    ],
    listeners:{
        show:function(){
            var refstoregrid=Ext.getCmp('idpinjamanlist').store;   
            ////                        console.log(refjkstoregrid);
            refstoregrid.loadPage(1);
        //            {params:{start:0,limit:10}}
        }
    }
    

        
    
});