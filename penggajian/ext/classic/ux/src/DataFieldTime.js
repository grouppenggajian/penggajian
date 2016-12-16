Ext.define('Ext.ux.DataFieldTime', {
     extend: 'Ext.data.field.Field',

     alias: 'data.field.time',

     timeFormat: 'd-M-Y H:i:s',

     convert: function (value) {
         if (value && Ext.isString(value)) {
             var d1 = new Date();
            var newDate = Ext.Date.format(d1, 'd-M-Y');
             var date = Ext.Date.parse(newDate+' '+value, this.timeFormat);
             if (!date) {
                 return null;
             }
             return date;
         }
         return value;
     }
 });