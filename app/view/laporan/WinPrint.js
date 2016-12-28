Ext.define('Penggajian.view.laporan.WinPrint', {
                            extend          : 'Ext.window.Window',
                            title           : 'Preview PDF',
                            width           : 900,
                            height          : 450,
                            layout          : 'fit',
                            autoShow        : true,
                            modal           : true,
                            xtype:'winprint',
                            alias           : 'widget.printout',
                            id              : 'winprint_id',
                            maximizable     :true,
                            closeAction:'destroy',
                            html:'<iframe style="width:100%;height:100%;" id="printoutpdf" src=""></iframe>'

                        });