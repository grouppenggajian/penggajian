<!DOCTYPE HTML>
<html manifest="">
    <head>
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=10, user-scalable=yes">
        <link rel="stylesheet" type="text/css" href="{!! asset('public/style/mainstyle.css')!!}"> 
        <title>Penggajian</title>

        <!--
        <script type="text/javascript">
            var Ext = Ext || {}; // Ext namespace won't be defined yet...
    
            // This function is called by the Microloader after it has performed basic
            // device detection. The results are provided in the "tags" object. You can
            // use these tags here or even add custom tags. These can be used by platform
            // filters in your manifest or by platformConfig expressions in your app.
            //
            Ext.beforeLoad = function (tags) {
                var s = location.search,  // the query string (ex "?foo=1&bar")
                    profile;
    
                // For testing look for "?classic" or "?modern" in the URL to override
                // device detection default.
                //
                if (s.match(/\bclassic\b/)) {
                    profile = 'classic';
                }
                else if (s.match(/\bmodern\b/)) {
                    profile = 'modern';
                }
                else {
                    profile = tags.desktop ? 'classic' : 'modern';
                    //profile = tags.phone ? 'modern' : 'classic';
                }
    
                Ext.manifest = profile; // this name must match a build profile name
    
                // This function is called once the manifest is available but before
                // any data is pulled from it.
                //
                //return function (manifest) {
                    // peek at / modify the manifest object
                //};
            };
        </script>
        -->
        <script type="text/javascript" src="{!! asset('public/js/md5.js')!!}"></script>
        <script type="text/javascript">
            var required_css = '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>';
            Date.prototype.withoutTime = function () {
                var d = new Date(this);
                d.setHours(0, 0, 0, 0);
                return d;
            }
            Date.prototype.toMysql = function () {
                var dthis = new Date(this);    
                var d = dthis.getDate();
                var m = dthis.getMonth() + 1;
                var y = dthis.getFullYear();
                return '' + y + '-' + (m<=9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
                
            }
            Date.prototype.toThblMysql = function () {
                var dthis = new Date(this);    
                var d = dthis.getDate();
                var m = dthis.getMonth() + 1;
                var y = dthis.getFullYear();
                return '' + y + (m<=9 ? '0' + m : m);
                
            }
            String.prototype.toThblExt = function() {
                var dthis = this;  
                var thbl=dthis.substring(0, 4)+'-'+dthis.substring(4, 6)+'-'+'01'; 
                return thbl;
            };
            
            String.prototype.toProperCase = function() {
                return this.replace(/\w\S*/g, function(txt) {
                    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
                });
            };
            
            function to_print(domid,url){      
                Ext.getDom(domid).src ="{{ url('/').'/'}}" + url;
            }
            function dateDiff(mulai,selesai){
                var date1 = new Date(mulai.getFullYear(),mulai.getMonth(),mulai.getDate()); 
                var date2 = new Date(selesai.getFullYear(),selesai.getMonth(),selesai.getDate()); 
                var timeDiff = Math.abs(date2.getTime() - date1.getTime());
                var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
                return diffDays;
            }
            function clearSession(){
                localStorage.removeItem('userid');
                localStorage.removeItem('username');
                localStorage.removeItem('roleid');
                localStorage.removeItem('rolename');
                localStorage.removeItem('regcode');
                // Remove Main View
                Ext.getCmp('app-main-id').destroy();
                window.location.href = Penggajian.Global.getApiUrl();
             
            }
            function createArrayStore(vdata){
                return Ext.create('Ext.data.ArrayStore',{
                    fields: [
                        {name: 'mid'},
                        {name: 'mtext'}
                    ],
                    data:vdata
                });
            } 
            function set_message(opt,vmsg){
                if (opt==0){
                    Ext.Msg.show({
                        title:'Message Info',
                        msg: vmsg,
                        buttons: Ext.Msg.OK,
                        icon: Ext.Msg.INFO
                    });
                }else if (opt==1){
                    Ext.Msg.show({
                        title:'Message Error',
                        msg: vmsg,
                        buttons: Ext.Msg.OK,
                        icon: Ext.Msg.ERROR
                    });
                }else if (opt==2){
                    Ext.Msg.show({
                        title:'Message Warning',
                        msg: vmsg,
                        alwaysOnTop:true,
                        buttons: Ext.Msg.OK,
                        icon: Ext.Msg.WARNING
                    });
                }
                    
            };
            function execute_confirm_yesno(vmsg,ajax_url,ajax_params,successfunct,funcno){
                var myAjax=Ext.Ajax;
                Ext.Msg.show({
                    title: 'Confirm',
                    msg: vmsg,
                    buttons: Ext.Msg.YESNO,
                    icon: Ext.Msg.QUESTION,
                    fn: function(btn){
                        if (btn == 'yes') {
                            //                                    var mask = new Ext.LoadMask(Ext.getBody(), {msg:'Please wait this Execute Process...'});
                                    
                            //                        mask.setLoading(ajax_waitmsg);
                            myAjax.on('beforerequest', function(){

                                Ext.getBody().mask('Please wait this Execute Process...');
                            });
                            myAjax.on('requestcomplete', function(){
                                Ext.getBody().unmask();
                            });
                            myAjax.on('requestexception', function(){
                                Ext.getBody().unmask();
                            });
                            myAjax.on('exception', function(){
                                Ext.getBody().unmask();
                            });
                            myAjax.request({                                                            
                                url: ajax_url,
                                method: 'POST',
                                params: ajax_params,
                                success: successfunct,
                                failure: function(obj) {
                                    var  resp = Ext.decode(obj.responseText);
                                    if (resp.reason == 'Session Expired' || resp.message == 'Session Expired') {
                                        session_expired('Session Expired');
                                    }  else{
                                        set_message(0, resp.reason +' '+resp.message);
                                    }
                                    //                                                                Ext.Msg.alert('info',resp.reason);
                                }                                                            
                            });                 
                        }else {
                            funcno;
                        }
                    }
                });
            }
            function session_expired(err){
                        Ext.Msg.show({
                            title: 'Error',
                            msg: err,
                            modal: true,
                            closable: false,
                            icon: Ext.Msg.ERROR,
                            buttons: Ext.Msg.OK,
                            fn: function(btn){
                                if (btn == 'ok') {
                                    window.location.href = Penggajian.Global.getApiUrl();
                                }
                            }
                        });
                    }
            function responseFailure(obj){
                try{
                                        var  resp = Ext.decode(obj.responseText);
                                        if (resp.reason == 'Session Expired' || resp.message == 'Session Expired') {
                                            session_expired('Session Expired');
                                        }  else{
                                            set_message(0, resp.reason +' '+resp.message);
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
            function execute_confirm(vmsg,ajax_url,ajax_params,successfunct){
                var myAjax=Ext.Ajax;
                Ext.Msg.show({
                    title: 'Confirm',
                    msg: vmsg,
                    buttons: Ext.Msg.YESNO,
                    icon: Ext.Msg.QUESTION,
                    fn: function(btn){
                        if (btn == 'yes') {
                            //                                    var mask = new Ext.LoadMask(Ext.getBody(), {msg:'Please wait this Execute Process...'});
                                    
                            //                        mask.setLoading(ajax_waitmsg);
                            myAjax.on('beforerequest', function(){

                                Ext.getBody().mask('Please wait this Execute Process...');
                            });
                            myAjax.on('requestcomplete', function(){
                                Ext.getBody().unmask();
                            });
                            myAjax.on('requestexception', function(){
                                Ext.getBody().unmask();
                            });
                            myAjax.on('exception', function(){
                                Ext.getBody().unmask();
                            });
                            myAjax.request({                                                            
                                url: ajax_url,
                                method: 'POST',
                                params: ajax_params,
                                success: successfunct,
                                failure: function(obj) {
                                    try{
                                        var  resp = Ext.decode(obj.responseText);
                                        if (resp.reason == 'Session Expired' || resp.message == 'Session Expired') {
                                            session_expired('Session Expired');
                                        }  else{
                                            set_message(0, resp.reason +' '+resp.message);
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
                        } 
                    }
                });
            }
            function addTab(vid,vtitle,vhtml){
                var tabs=Ext.getCmp('id_tabmain');
                var tm=null;
                  
                var widgetname="Tab" + vtitle.toString().replace( /\s/g, '' );
                try{
                    console.log(widgetname);
                    tm=Ext.createWidget(widgetname);     
                    tabs.add(tm); 
                    tm.show();                 
                
                }catch(ex){                
                    tabs.add({
                        id: vid,
                        title: vtitle,                
                        //                                iconCls: 'tabs',
                        html: vhtml ,
                        //                items:[tabchilds],
                        closable: true
                    }).show();
                }             
            
            }
            function createTreeMenuMain(vtitle,vhead,vrole){
                var tree = Ext.create('Ext.tree.Panel',{
                    id: 'id_treepanel_'+vhead,
                    title: vtitle,
                    //                layout:'hbox',
                    bodyStyle: 'align:left;',
                    split: true,
                    border:true,
                    //        height: 360,
                    height:'auto',
                    minSize: 150,
                    rootVisible: false,
                    autoScroll: true,
                    viewConfig:{
                        cls:'customCSS'
                    },

                    store: Ext.create('Ext.data.TreeStore', {
                        root: {
                            expanded: true
                        },
                        proxy: {
                            type: 'ajax',
                            url: Penggajian.Global.getApiUrl() + 'main/getAccordionMenu?headid='+vhead+'&roleid=' + vrole
                            ,success:function(){
                            
                            }
                            ,exception:function( tstore, response, operation, eOpts ){
                                if(response.status=='500'){
                                    tstore.reload();
                                }
                                
                                var err = Ext.decode(response.responseText); 
                                console.log(err);
                                if (err){
                                    if (err.errMsg == 'Session Expired' || err.message == 'Session Expired') {
                                        session_expired('Session Expired');
                                    }                                            
                                    else{
                                        console.log(err);
                                    }  
                                }    
                            }
                        }
                    }),
                    //                tools: [           
                    //                        { iconCls: 'icon-grid-refresh',tooltip:'Refresh' }
                    //                   ],
                    listeners: {
                        itemclick:function(view,rec,item,index,eventObj){        
                            if(rec.get('leaf')){
                                var tabid='tab' + rec.getId();
                                var tabs=Ext.getCmp('id_tabmain');
                                console.log(tabid);
                                if (tabs.getComponent(tabid)==null){
                                    //                            this.addTab(rec.getId(),true);
                                    var vhtml='Tab Body ' + rec.get('text');
                                    addTab(tabid,rec.get('text'),vhtml );
                                }else{
                                    var tabget=tabs.getComponent(tabid);
                                    tabget.show();
                                    //                tabs.setActiveTab(tabid)
                                }
                            }
                        }
                    }
                });
                return tree;
            };
    
            function set_accordion(){
                //        console.log('tekan kene');
                //             Ext.Ajax.setTimeout(120000000);
                Ext.Ajax.request({
                    url: Penggajian.Global.getApiUrl()+'main/getMenuHeadJson',
                    method:'GET',
                    waitMsg:'Load Menu...',                
                    params:{roleid:localStorage.getItem('roleid')},
                    success: function(obj, opts) {
                        var   resp = null;
                        resp=  Ext.decode(obj.responseText);                
                        //                    try{
                        //                        resp=  Ext.decode(obj.responseText);                
                        //                    }catch(ex){ 
                        //                        console.log(ex);
                        //                        window.location.href = Penggajian.Global.getApiUrl();
                        //                    }  
                     

                        if(resp.data){
                            var data=resp.data;
                            for(var i=0;i<resp.record;i++){
                                //                console.log(data[i].idmenu);
                                var tree=createTreeMenuMain(data[i].namemenu,data[i].idmenu,localStorage.getItem('roleid'));
                                Ext.getCmp('main-west').add(tree);

                            }
                    
                        } 
                    },

                    failure: function(response, opts) {
                        if(response.status=='500'){
                            window.location.href = Penggajian.Global.getApiUrl();
                            //                        console.log(opts);
                        }else{
                            console.log('server-side failure with status code ' + response.status);
                        }
                    
                    }
                });           

            }
        function format_date_mysql(valuedate){
                        return Ext.Date.format(valuedate, 'Y-m-d');
                    }
        </script>
        <script type="text/javascript" language="javascript">
            function getusersession(){
                return "{{ $data['success'] }}";
            }
            
            function gettokendata(){
                return "{{ csrf_token() }}";
            }
            var userstatus="{{ $data['success'] }}";
        
            var tokendata="{{ csrf_token() }}";
            var dataoperator=[['+','+'],['-','-'],['*','x'],['/','/'],['(','('],[')',')']];
            var datastatuskawin=[['KAWIN','KAWIN'],['TIDAK KAWIN','TIDAK KAWIN']];
            var datastatuspegawai=[['AKTIF','AKTIF'],['KELUAR','KELUAR']];
            var datathr=[['<1 TAHUN','<1 TAHUN'],['>1 TAHUN','>1 TAHUN']];
            var datakelamin=[['L','Laki-laki'],['P','Perempuan']];
            var datastatuslembur=[['BIASA','BIASA'],['OFF','OFF']];
            var dataharimenit=[['HARI','HARI'],['MENIT','MENIT'],['TAHUN','TAHUN'],['BULAN','BULAN'],['MASA KERJA','MASA KERJA'],['HARI KERJA','HARI KERJA']];
            var datahari=['MINGGU','SENIN','SELASA','RABU','KAMIS','JUM\'AT','SABTU'];
            var dataharicombo=[[0,'MINGGU'],[1,'SENIN'],[2,'SELASA'],[3,'RABU'],
                [4,'KAMIS'],[5,'JUM\'AT'],[6,'SABTU']];
            var datatipeijin=[['1','1 Hari'],['0.5','1/2 Hari']];
            //        var base_url="{{url('/').'/'}}";
            //        console.log(base_url);
        </script>
        <!-- The line below must be kept intact for Sencha Cmd to build your application -->
        <script id="microloader" data-app="891d821a-13e8-4ab0-b9b8-fa1fea70420b" type="text/javascript" src="bootstrap.js"></script>
        <script type="text/javascript">
         
        </script>
    </head>
    <body></body>
</html>
