// @ts-check 

let electron = require('electron');
// electron.remote.getCurrentWindow().openDevTools();
let path = require('path');
let fs = require('fs');

class Main{
    constructor(){
        let searchURL = window.location.search;
        searchURL = searchURL.substring(1, searchURL.length);  
        this.langIndex = searchURL.split("&")[0].split("=")[1];
        console.log("lang:" + this.langIndex);

        this.langConfig = require("./../lang/extension.js").Lang.panel;

        document.getElementById("layanativetopbar").innerHTML = this.getPanelLang(230);


        this.appcmd = require('layanative');
        //electron.remote.getCurrentWindow().webContents.openDevTools();

        this.appcmd.listversions().then((jsonobj)=>{
            if( jsonobj){
                localStorage.setItem('_sdkversionlist', JSON.stringify(jsonobj));
                this.onVerListOK(jsonobj);
            }else{
                try{
                    jsonobj = JSON.parse(localStorage.getItem('_sdkversionlist'));
                }catch(e){
                    //
                }
                if(!jsonobj){
                    alert(this.getPanelLang(212));
                }else{
                    this.onVerListOK(jsonobj);
                }
            }
        });

        /**@type  {{versionList:{version:string,url:string}[]}}*/
        this.sdkversioninfo=null;
        this.selSDKUrl='';
        this.selVer='';
        this.sdkenvok=false;
        /**@type {dhtmlXForm} */
        this.myForm=null;
        this.createPanel();
    }

    //面板的语言包
    getPanelLang(index) {
        return this.langConfig[index][this.langIndex];
    }

    lang(text) {
        var res;
        if (arguments.length < 2) {
            res = text;
        } else {
            for (var i = 0, n = arguments.length; i < n; i++) {
                text = text.replace("{" + i + "}", arguments[i + 1]);
            }
            res = text;
        }
        return res;
    }

    createPanel(){
        function selectPath(cb){
            let dialogLaya = electron.remote.dialog;
            dialogLaya.showOpenDialog({
                properties: ['openDirectory', 'createDirectory']
            }, function(path1){
                if (path1[0]){
                    cb(path1[0]);
                }
            });
        }    

        /**
         * 
         * @param {number} id 
         * @return {boolean}
         */
        function isPlatformSel(id){
            return localStorage.getItem('platform')==''+id;
        }
		function isDemensionSel(id){
            return localStorage.getItem('demension')==''+id;
        }
        let formData = [
            {type: 'settings', position: 'label-left', offsetLeft:20, labelWidth: 80, inputWidth: 300},
            {type: 'block', width:'auto', offsetLeft:0, blockOffset: 0, list:[
                {type:'select', label:this.getPanelLang(213), name:'verlist', width:120, options:[
                ]},
                {type:'newcolumn'},
                {type:'button',name:'downloadsdk',value:'download'},
                {type: 'input',name:'sdkstatus', label:'',width:60 },
                {type:'newcolumn'},
                {type:'button',name:'chksdkfolder',value:'...'}
            ]},
            {type: 'block', name:'id_block1', width: 'auto', offsetLeft:0, blockOffset: 0, list:[
                
				{type:'combo', label:this.getPanelLang(214), name:'platformselect',width:120, options:[
                    {text:'Android studio', value:1,selected:isPlatformSel(1)},
                    {text:'XCode iOS', value:2,selected:isPlatformSel(2)},
                    {text:'Eclispse', value:0,selected:isPlatformSel(0)},
					{text:'wkwebview', value:3,selected:isPlatformSel(3)}
                ]},
				{type:'newcolumn'},
				{type:'combo', name:'demension',width:50, options:[
                    {text:'2D', value:0,selected:isDemensionSel(0)},
                    {text:'3D', value:1,selected:isDemensionSel(1)},
                ]},
				{type:'newcolumn'},
                {type: 'checkbox',  label: this.getPanelLang(60), name:'danji', position:'label-right', value:0}
            ]},
            {type: 'input', label: this.getPanelLang(215), name:'id_projname', value: localStorage.getItem('projname') || 'layabox', note:{text:''}, validate:'NotEmpty'},
            {type: 'input', label: this.getPanelLang(216), name:'id_appname', value: localStorage.getItem('appname')||this.getPanelLang(217), note:{text:''}},
            {type: 'input', label: this.getPanelLang(229),  name:'packname', value:localStorage.getItem('packname')||'com.layabox.game', validate:(v)=>{return (v.length>3 && v.split('.').length>2);},note:{text:''}},
            {type: 'input', label: 'URL:',name:'url',  value: localStorage.getItem('url') || 'http://runtime.layabox.com/layaplayer/index.html', validate:'NotEmpty'},
            {type: 'block', name:'id_block2', width: 'auto', offsetLeft:0, blockOffset: 0, list:[
                {type: 'input', label: this.getPanelLang(197), name:'outpathinput', validate:'NotEmpty', value: localStorage.getItem('outpath')||electron.remote.app.getPath('documents')},
                {type: 'newcolumn'},
                {type: 'button', name:'outpath', width:40, value: '...'}]
            },
            {type: 'block', name:'id_block3', width: 'auto', offsetLeft:0, blockOffset: 0, list:[
                {type: 'input', label: this.getPanelLang(65), name:'respathinput', value: localStorage.getItem('respath')||'', note:{text:''}},
                {type: 'newcolumn'},
                {type: 'button', name:'respath', width:40, value: '...'}]
            },
            {type: 'button', name:'createapp', value: this.getPanelLang(218), width:160, offsetLeft:150 }
        ];
        
        /** @type {dhtmlXForm} */
        let myForm = this.myForm = new dhtmlXForm('hihere', formData);  
        this.disableall();
        myForm.attachEvent('onButtonClick', (id)=>{
            if( id === 'respath'){
                selectPath((v)=>{
                    myForm.getInput('respathinput').value=v;
                });
            }
            else if( id==='outpath'){
                selectPath((v)=>{
                    myForm.getInput('outpathinput').value=v;
                });
            }
            else if (id == 'createapp'){
                if(myForm.validate()){
                    this.createApp();
                }else{
                    alert(this.getPanelLang(219));
                }
            }
            else if( id == 'downloadsdk'){
                myForm.disableItem('verlist');
				let me = this;
                this.downloadSDK().then((b)=>{
					if(!b){
						me.myForm.enableItem('verlist');
						me.myForm.showItem('downloadsdk');
					}
				});
            }
            else if( id==='chksdkfolder'){
                electron.remote.shell.showItemInFolder(this.appcmd.getSDKRootPath());
            }
        });            
        myForm.attachEvent('onChange', (name, value)=>{
            //alert('sel changed:'+name+','+value);
            if( name === 'danji'){
                let c_url = myForm.getInput('url');
                if( myForm.isItemChecked('danji')){
                    myForm.lastUrl = c_url.value;
                    //c_url.value='http://stand.alone.version/index.html'; 用这个容易出错。
                    myForm.disableItem('url');
                }else{
                    myForm.enableItem('url');
                    c_url.value = myForm.lastUrl;
                }
            }else if(name==='verlist'){
                this.onVersionChanged(value);
            }
        });
        myForm.attachEvent('onFocus', (name)=>{
        });

        myForm.hideItem('downloadsdk');
    }

    disableall(){
        this.myForm.disableItem('id_block1');
        this.myForm.disableItem('id_projname');
        this.myForm.disableItem('id_appname');
        this.myForm.disableItem('packname');
        this.myForm.disableItem('url');
        this.myForm.disableItem('id_block2');
        this.myForm.disableItem('id_block3');
        this.myForm.disableItem('createapp');
    }

    enableall(){
        this.myForm.enableItem('id_block1');
        this.myForm.enableItem('id_projname');
        this.myForm.enableItem('id_appname');
        this.myForm.enableItem('packname');
        this.myForm.enableItem('url');
        this.myForm.enableItem('id_block2');
        this.myForm.enableItem('id_block3');
        this.myForm.enableItem('createapp');
    }

    /**
     * 
     */
    downloadSDK(){
        let zipfile = path.join( this.appcmd.getSDKRootPath(), this.selVer+'.zip');
        this.myForm.showItem('sdkstatus');
        this.myForm.hideItem('downloadsdk');
        this.myForm.getInput('sdkstatus').value=this.getPanelLang(220) + '...';
        return new Promise((res, rej)=>{
            let stream = fs.createWriteStream(zipfile);
            let layaresponse;
            let cursz=0;
            let len=0;
            let url = this.selSDKUrl;
            //DEBUG
            //url = 'http://10.10.20.19:7777/dd.zip';
            console.log('download sdk:'+url);
            let request = require('request');
            request(url).on('response', (response)=>{
                layaresponse = response;
                len = parseInt(layaresponse.headers['content-length'], 10);
            }).on('error', function(err) {
				alert(this.lang(this.getPanelLang(221), err));
				res(false);
			}).on('data', (chunk)=>{
                cursz+=chunk.length;
                this.myForm.getInput('sdkstatus').value=''+Math.floor(cursz*100/len)+'%';
                this.onDownloadSDKProg(cursz,len);
            }).pipe(stream).on('close', ()=>{
                if (layaresponse.statusCode === 200) {
                    //解开
                    this.myForm.getInput('sdkstatus').value=this.getPanelLang(210) + '...';
                    this.appcmd.unzipAsync(zipfile, path.dirname(zipfile), (error, stdout, stderr)=>{
                        if(error || stderr.length>0){
                            alert('unzip error!'+error.name+'\n'+error.message+'\n'+stderr?stderr:'');
                            res(false);
                        }else if(stdout.indexOf('error')>0){
                            alert('unzip error! '+stdout);
                            res(false);
                        }else{
                            this.onSDKEnvOK();
                            res(true);
                        }
                    });                    
                }
                else {
                    console.log(this.lang(this.getPanelLang(222), url));
                    res(false);
                }
            }).on('end', function () {
                console.log('download end');
            });        
        });
    }

    onSDKEnvOK(){
        this.sdkenvok=true;
        this.myForm.hideItem('sdkstatus');
        this.myForm.hideItem('downloadsdk');
        this.myForm.enableItem('verlist');
        this.enableall();
    }

    /**
     * 
     * @param {number} cur 
     * @param {number} total 
     */
    onDownloadSDKProg(cur,total){
    }

    /**
     * 
     * @param {{versionList:{version:string,url:string}[]}} jsonobj 
     */
    onVerListOK(jsonobj){
        //TEST
        /*
        jsonobj={
            versionList: [
                {version: 'v0.9.6',url: 'http://layabox.com/layaplayer/layanativeRes/v0.9.5.zip'},
                {version: 'v0.9.5',url: 'http://layabox.com/layaplayer/layanativeRes/v0.9.5.zip'},
                {version: 'v0.9.4',url: 'http://layabox.com/layaplayer/layanativeRes/v0.9.5.zip'},
            ]
        };
        */   
        //TEST END

        if(!jsonobj.versionList.length){
            alert(this.getPanelLang(223));
            return;
        }
        this.sdkversioninfo = jsonobj;

        /**@type {HTMLOptionsCollection} */
        let options = this.myForm.getOptions('verlist');
        options.length=0;
        let localNewestSDK='';//本地存在的最新版本
        let selectedVer = jsonobj.versionList[0].version;
        let lastVer = localStorage.getItem('sdkver');//上次使用的版本。优先选择本地存在的上次使用的版本。
        let useLastVer=lastVer && lastVer.length>0 && fs.existsSync( path.join(this.appcmd.getSDKRootPath(),lastVer));
        jsonobj.versionList.forEach((v,i)=>{
            let sel = false;
            if(useLastVer){
                sel = v.version==lastVer;
                selectedVer = lastVer;
            }else if( localNewestSDK.length<=0 || fs.existsSync( path.join(this.appcmd.getSDKRootPath(),v.version))){
                localNewestSDK = v.version;
                selectedVer = v.version;
                sel=true;
            }
            options.add( new Option(v.version,v.version,sel,sel));
        });

        this.onVersionChanged(selectedVer);
    }
	
	versionCompare(a, b) {
		a = a.replace(/^[v]/, '');
		b = b.replace(/^[v]/, '');
		var pa = a.split('.');
		var pa = a.split('.');
		var pb = b.split('.');
		for (var i = 0; i < 3; i++) {
			var na = Number(pa[i]);
			var nb = Number(pb[i]);
			if (na > nb) return 1;
			if (nb > na) return -1;
			if (!isNaN(na) && isNaN(nb)) return 1;
			if (isNaN(na) && !isNaN(nb)) return -1;
		}
		return 0;
	}
    /**
     * 
     * @param {string} ver 
     */
    onVersionChanged(ver){
        this.selVer=ver;
		let myComboPlatform = this.myForm.getCombo('platformselect');
		let myComboDemension = this.myForm.getCombo('demension');
		if (this.versionCompare(this.selVer, 'v1.0') == -1)
		{
			if (myComboPlatform.getSelectedValue() == '3')
			{
				myComboPlatform.selectOption(0);
			}
			myComboPlatform.deleteOption(3);
			myComboDemension.selectOption(0);//2D
			this.myForm.disableItem('demension');
		}
		else
		{
			if (myComboPlatform.getSelectedValue() != '3')
			{
				myComboPlatform.deleteOption(3);
				myComboPlatform.addOption("3", "wkwebview");
			}
			this.myForm.enableItem('demension');
		}
		
        this.sdkversioninfo.versionList.forEach((v)=>{
            if(v.version==ver){
                this.selSDKUrl = v.url;
            }
        });
        if( !this.appcmd.isSDKExist(ver)){
            this.myForm.showItem('downloadsdk');
            this.myForm.hideItem('sdkstatus');
            this.disableall();
        }else{
            this.myForm.hideItem('downloadsdk');
            this.myForm.hideItem('sdkstatus');
            this.enableall();
        }
    }

    createApp(){
        let url = this.myForm.getInput('url').value;
        let myForm = this.myForm;
        let respath = myForm.getInput('respathinput').value;
        let outpath = myForm.getInput('outpathinput').value;
        let projname = myForm.getInput('id_projname').value;
        let appname = myForm.getInput('id_appname').value;
        let packname = myForm.getInput('packname').value;
        let sdkver = myForm.getSelect('verlist').value;
        let platform = myForm.getCombo('platformselect').getSelectedValue();
		let demension = myForm.getCombo('demension').getSelectedValue();
        localStorage.setItem('url',url);
        localStorage.setItem('respath',respath);
        localStorage.setItem('outpath',outpath);
        localStorage.setItem('projname',projname);
        localStorage.setItem('appname', appname);
        localStorage.setItem('packname',packname);
        localStorage.setItem('sdkver',sdkver);
        localStorage.setItem('platform',platform);
		localStorage.setItem('demension',demension);
        let platformname = ['android_eclipse','android_studio','ios','wkwebview'][platform];
		let demensionmname = ['2D','3D'][demension];
        function getLayaNativePackType(){
            if(myForm.isItemChecked('danji')) return 2;
            if(!url ||url.length<=0) return 2; //单机版
            if(respath && respath.length>0){
                return 1;
            }
            return 0;
        }

		if(getLayaNativePackType()==2 && (!respath||respath.length<=0)){
			alert(this.getPanelLang(224));
			return;
		}
        let projpath = path.join( outpath,projname||appname,platformname);
        if( fs.existsSync( projpath )){
            alert(this.getPanelLang(225));
        }else{
            this.appcmd.createapp(
				demensionmname,
                respath,
                path.join(this.appcmd.getSDKRootPath(),sdkver),//sdk
                null,//sdkver
                platformname,
                getLayaNativePackType(),
                url,
                projname||appname,
                appname||projname,
                packname,
                outpath
            ).then(()=>{
                clearTimeout(tmer);
                myForm.setItemLabel('createapp',this.getPanelLang(218));
                myForm.enableItem('createapp');
                setTimeout(()=>{
                    if(confirm(this.getPanelLang(226))){
                        electron.remote.shell.showItemInFolder(projpath);
                    }
                },100);
            });
            myForm.setItemLabel('createapp',this.getPanelLang(227) + '...');
            let pos=0;
            const progstr=['o--','-o-','--o'];
            let tmer = setInterval(()=>{
                console.log(lang(this.getPanelLang(228), progstr[pos]));
                myForm.setItemLabel('createapp', lang(this.getPanelLang(228), progstr[pos]));
                pos=(++pos)%3;
            },300);
            myForm.disableItem('createapp');
        }
    }
}
new Main();