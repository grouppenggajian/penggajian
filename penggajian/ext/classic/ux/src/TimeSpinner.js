Ext.define('Ext.ux.TimeSpinner', {
    extend: 'Ext.form.field.Spinner',
    alias: 'widget.timespinner',
    requires: ['Ext.picker.Time', 'Ext.Date'],
    minText : "The time in this field must be equal to or after {0}",
    //</locale>

    //<locale>
    /**
     * @cfg {String} maxText
     * The error text to display when the entered time is after {@link #maxValue}.
     */
    maxText : "The time in this field must be equal to or before {0}",
    //</locale>

    //<locale>
    /**
     * @cfg {String} invalidText
     * The error text to display when the time in the field is invalid.
     */
    invalidText : "{0} is not a valid time",
    //</locale>

    //<locale>
    /**
     * @cfg {String} [format=undefined]
     * The default time format string which can be overridden for localization support. 
     * The format must be valid according to {@link Ext.Date#parse}.
     *
     * Defaults to `'g:i A'`, e.g., `'3:15 PM'`. For 24-hour time format try `'H:i'` instead.
     */
    format : "H:i",
    //</locale>

    //<locale>
    /**
     * @cfg {String} [submitFormat=undefined]
     * The date format string which will be submitted to the server. The format must be valid according to
     * {@link Ext.Date#parse}.
     *
     * Defaults to {@link #format}.
     */
    //</locale>

    //<locale>
    /**
     * @cfg {String} altFormats
     * Multiple date formats separated by "|" to try when parsing a user input value and it doesn't match the defined
     * format.
     */
    altFormats : "g:ia|g:iA|g:i a|g:i A|h:i|g:i|H:i|ga|ha|gA|h a|g a|g A|gi|hi|gia|hia|g|H|gi a|hi a|giA|hiA|gi A|hi A",
    //</locale>
    
    //<locale>
    // The default format for the time field is 'g:i A', which is hardly informative
    /**
     * @cfg {String} formatText
     * The format text to be announced by screen readers when the field is focused.
     */
    /** @ignore */
    formatText: 'Expected time format HH:MM space AM or PM',
    //</locale>

    /**
     * @cfg {Number} [increment=15]
     * The number of minutes between each time value in the list.
     *
     * Note that this only affects the *list of suggested times.*
     *
     * To enforce that only times on the list are valid, use {@link #snapToIncrement}. That will coerce
     * any typed values to the nearest increment point upon blur.
     */
    increment: 15,

    /**
     * @cfg {Number} pickerMaxHeight
     * The maximum height of the {@link Ext.picker.Time} dropdown.
     */
    pickerMaxHeight: 300,

    /**
     * @cfg {Boolean} selectOnTab
     * Whether the Tab key should select the currently highlighted item.
     */
    selectOnTab: true,

    /**
     * @cfg {Boolean} [snapToIncrement=false]
     * Specify as `true` to enforce that only values on the {@link #increment} boundary are accepted.
     *
     * Typed values will be coerced to the nearest {@link #increment} point on blur.
     */
    snapToIncrement: false,

    /**
     * @cfg
     * @inheritdoc
     */
    valuePublishEvent: ['select', 'blur'],

    /**
     * @private
     * This is the date to use when generating time values in the absence of either minValue
     * or maxValue.  Using the current date causes DST issues on DST boundary dates, so this is an
     * arbitrary "safe" date that can be any date aside from DST boundary dates.
     */
//    initDate: '1/1/2008',
//    initDateParts: [2008, 0, 1],
//    initDateFormat: 'j/n/Y',
    // override onSpinUp (using step isn't neccessary)
    valueToRaw: function(value) {
        return this.formatDate(this.parseDate(value));
    },
    formatDate: function(items) {
        var formatted = [],
            i, len;

        items = Ext.Array.from(items);

        for (i = 0, len = items.length; i < len; i++) {
            formatted.push(Ext.form.field.Date.prototype.formatDate.call(this, items[i]));
        }

        return formatted.join(this.delimiter);
    },
    parseDate: function(value) {
        var me = this,
            val = value,
            altFormats = me.altFormats,
            altFormatsArray = me.altFormatsArray,
            i = 0,
            len;

        if (value && !Ext.isDate(value)) {
            val = me.safeParse(value, me.format);

            if (!val && altFormats) {
                altFormatsArray = altFormatsArray || altFormats.split('|');
                len = altFormatsArray.length;
                for (; i < len && !val; ++i) {
                    val = me.safeParse(value, altFormatsArray[i]);
                }
            }
        }

        // If configured to snap, snap resulting parsed Date to the closest increment.
        if (val && me.snapToIncrement) {
            val = new Date(Ext.Number.snap(val.getTime(), me.increment * 60 * 1000));
        }
        return val;
    },
    
    safeParse: function(value, format){
        var me = this,
            utilDate = Ext.Date,
            parsedDate,
            result = null;

        if (utilDate.formatContainsDateInfo(format)) {
            // assume we've been given a full date
            result = utilDate.parse(value, format);
        } else {
            // Use our initial safe date
            parsedDate = utilDate.parse(me.initDate + ' ' + value, me.initDateFormat + ' ' + format);
            if (parsedDate) {
                result = parsedDate;
            }
        }
        return result;
    },
    getSubmitValue: function() {
        var me = this,
            format = me.format,
            value = me.getValue();
            if(value && !Ext.isDate(value)){
                var d1 = new Date();
                var newDate = Ext.Date.format(d1, 'd-M-Y');             
                value = Ext.Date.parse(newDate+' '+value, 'd-M-Y '+me.format);
            }
        return value ? Ext.Date.format(value, format) : null;
    },
    onSpinUp: function() {
        var me = this,utilDate = Ext.Date,parsedDate,result = null;
        var val=me.getValue();
        if (!me.readOnly) {
            if(val && !Ext.isDate(val)){
                var d1 = new Date();
                var newDate = Ext.Date.format(d1, 'd-M-Y');             
                var max = Ext.Date.parse(newDate+' '+me.maxValue, 'd-M-Y '+me.format);
                val=Ext.Date.parse(newDate+' '+val, 'd-M-Y '+me.format);
                if(val<max){
                    result=utilDate.add(val, 'mi', me.increment);
                }else{
                    result=utilDate.add(val, 'mi', 0);
                }
            }else{
                result=utilDate.parse(me.minValue, me.format);
            }
            //var val = parseInt(me.getValue().split(' '), 10)||0; // gets rid of " Pack", defaults to zero on parse failure
            
            me.setValue(result);
        }
    },

    // override onSpinDown
    onSpinDown: function() {
        var me = this,utilDate = Ext.Date,parsedDate,result = null;
        var val=me.getValue();
        if (!me.readOnly) {
            if(val && !Ext.isDate(val)){
                var d1 = new Date();
                var newDate = Ext.Date.format(d1, 'd-M-Y');             
                var min = Ext.Date.parse(newDate+' '+me.minValue, 'd-M-Y '+me.format);
                val=Ext.Date.parse(newDate+' '+val, 'd-M-Y '+me.format);
                if(val>min){
                    result=utilDate.add(val, 'mi', me.increment*(-1));
                }else{
                    result=utilDate.add(val, 'mi', 0);
                }
            }else{
                result=utilDate.parse(me.minValue, me.format);
            }
            //var val = parseInt(me.getValue().split(' '), 10)||0; // gets rid of " Pack", defaults to zero on parse failure
            
            me.setValue(result);
        }
    }
});