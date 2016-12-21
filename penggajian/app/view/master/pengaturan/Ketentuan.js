Ext.define('Penggajian.view.master.pengaturan.Ketentuan', {
    extend: 'Ext.container.Container',
    xtype: 'TabKetentuan',
    alias: 'widget.Ketentuan',
    requires: [
//    'Penggajian.view.master.periode.PeriodeController',
//    'Penggajian.view.master.periode.PeriodeInput'
    ],
//    controller:'periode',
    title: 'Ketentuan',
    id: 'tab1f3',
    closable: true,        
    layout: 'border', 
    items:[       
    {
        xtype:'form',
        region:'center',
        layout: 'anchor',
        bodyPadding: '5 5 5 5',
        items:[
            {
                xtype:'fieldset',
                anchor:'50%',
                layout:'anchor',
                defaults:{
                  labelWidth:150  
                },
                items:[
                    {
                        xtype: 'fieldcontainer',
                        anchor:'100%',
                        fieldLabel:'Toleransi Keterlambatan',
                        combineErrors: false,
                        layout:'hbox',
                        defaults: {
                            hideLabel: true
                        },
                        items: [
                           {
                               name : 'absentoleransi',
                               xtype: 'numberfield',
                               width: 70,
                               minValue:0,
                               step: 5,
                               allowBlank: false,
                               margin:'3 10 5 5'
                               
                           },
                           {
                               xtype: 'displayfield',
                               value: 'menit',
                               width: 50
                           }
                        ]
                    },
                    {
                        xtype: 'fieldcontainer',
                        fieldLabel:'Kuota Cuti Tahunan',
                        anchor:'100%',
                        combineErrors: false,
                        layout:'hbox',
                        defaults: {
                            hideLabel: true
                            
                        },
                        items: [
                           {
                               name : 'kuotacuti',
                               xtype: 'numberfield',
                               width: 70,
                               minValue:0,
                               allowBlank: false,
                               margin:'3 10 5 5'
                           },
                           {
                               xtype: 'displayfield',
                               value: 'hari',
                               width: 50
                           }
                        ]
                    }
                ]
            }
        ]
    }
    ]
}
);
        