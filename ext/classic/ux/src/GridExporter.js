/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

//Ext.Loader.setPath('Ext.ux', 'assets/extjs/ux');
//Ext.Loader.setPath('Ext.ux.exporter', 'extjs/ux/exporter/excelFormatter');
Ext.define('Ext.ux.GridExporter', {
    extend:'Ext.grid.Panel',
    alias: 'widget.gridexporter',
    width: 1000,
    autoHeight: true,
    downloadName: "dataexport",
    //    uses:[
    //        "Ext.ux.exporter.Base64",
    ////        "Ext.excel.Cell",
    ////        "Ext.excel.Style",
    ////        "Ext.excel.Worksheet",
    ////        "Ext.excel.Workbook",
    ////        'Ext.excel.ExcelFormatter'
    //    ],
    constructor : function (config) {
        var me = this;
        
        config = config || {};
        Ext.apply(me, config);
        me.callParent(arguments);
    }
    ,
    getFormatterByName: function(formatter) {
        formatter = formatter ? formatter : "excel";
        formatter = !Ext.isString(formatter) ? formatter : Ext.create("Ext.ux.exporter." + formatter + "Formatter." + Ext.String.capitalize(formatter) + "Formatter");
        return formatter;
    },
    utf8Encode:function(string){
        var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
        string = string.replace(/\r\n/g,"\n");
            var utftext = "";
            for (var n = 0; n < string.length; n++) {
                var c = string.charCodeAt(n);
                if (c < 128) {
                    utftext += String.fromCharCode(c);
                }
                else if((c > 127) && (c < 2048)) {
                    utftext += String.fromCharCode((c >> 6) | 192);
                    utftext += String.fromCharCode((c & 63) | 128);
                }
                else {
                    utftext += String.fromCharCode((c >> 12) | 224);
                    utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                    utftext += String.fromCharCode((c & 63) | 128);
                }
            }
            return utftext;
    },
    encode : function (input) {
        var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
                    var output = "";
                    var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
                    var i = 0;
                    input = this.utf8Encode(input);
                    while (i < input.length) {
                        chr1 = input.charCodeAt(i++);
                        chr2 = input.charCodeAt(i++);
                        chr3 = input.charCodeAt(i++);
                        enc1 = chr1 >> 2;
                        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                        enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                        enc4 = chr3 & 63;
                        if (isNaN(chr2)) {
                            enc3 = enc4 = 64;
                        } else if (isNaN(chr3)) {
                            enc4 = 64;
                        }
                        output = output +
                        keyStr.charAt(enc1) + keyStr.charAt(enc2) +
                        keyStr.charAt(enc3) + keyStr.charAt(enc4);
                    }
                    return output;
                },
exportStore:function(grid,store,gcolumns, formatter,filename, config) {
    if(filename){
        this.downloadName=filename;
    }
    config = config || {};
    formatter = this.getFormatterByName('excel');

    var columns = Ext.Array.filter(gcolumns, function(col) {
        return !col.hidden; // && (!col.xtype || col.xtype != "actioncolumn");
    });

    Ext.applyIf(config, {
        title  : grid.title,
        columns: columns
    });
      
    //        Ext.ux.exporter.Base64
    return 'data:application/vnd.ms-excel;base64,' + this.encode(formatter.format(store, config));

},   
exportGrid:function(grid, formatter,filename, config) {
    if(filename){
        this.downloadName=filename;
    }
    config = config || {};
    formatter = this.getFormatterByName('excel');

    var columns = Ext.Array.filter(grid.columns, function(col) {
        return !col.hidden; // && (!col.xtype || col.xtype != "actioncolumn");
    });

    Ext.applyIf(config, {
        title  : grid.title,
        columns: columns
    });
      
    //        Ext.ux.exporter.Base64
    return 'data:application/vnd.ms-excel;base64,' + this.encode(formatter.format(grid.store, config));

}
//        ,
//    setDownload:function(){
//        Downloadify.create(this.el.down('p').id,{
//            filename: function() {
//              return this.getDownloadName() + "." + this.getFormatterByName('excel').extension;
//            },
//            data: function() {
//              return this.exportGrid(this, 'excel',this.config);
//            }
//            ,
//            transparent: false,
//            swf: this.getSwfPath(),
//            downloadImage: this.getDownloadImage(),
//            width: this.getWidth(),
//            height: this.getHeight(),
//            transparent: true,
//            append: false
//        });
//    }
    
});

