
(function(window,document,Laya){
	var __un=Laya.un,__uns=Laya.uns,__static=Laya.static,__class=Laya.class,__getset=Laya.getset,__newvec=Laya.__newvec;

	var Box=laya.ui.Box,Button=laya.ui.Button,Event=laya.events.Event,FileManager=laya.ide.managers.FileManager;
	var Label=laya.ui.Label,Notice=ide.managers.Notice,PluginDialog=laya.ide.plugin.PluginDialog;
	/**
	*弹出框式插件Demo
	*本demo演示如何创建一个自己的对话框
	*/
	//class laya.ide.plugin.TextFilePackage.TextFilePackage extends laya.ide.plugin.PluginDialog
	var TextFilePackage=(function(_super){
		function TextFilePackage(){
			this.text=null;
			TextFilePackage.__super.call(this);
			this.creatUI();
			this.init();
		}

		__class(TextFilePackage,'laya.ide.plugin.TextFilePackage.TextFilePackage',_super);
		var __proto=TextFilePackage.prototype;
		/**
		*创建UI
		*/
		__proto.creatUI=function(){
			var box;
			box=new Box();
			this.text=new Label();
			this.text.color="#ff0000";
			box.addChild(this.text);
			box.size(300,300);
			this.text.top=this.text.bottom=this.text.left=this.text.right=0;
			this.text.text="合并脚本文件";
			var btn;
			btn=new Button();
			btn.skin="comp/button.png";
			box.addChild(btn);
			btn.right=20;
			btn.bottom=5;
			btn.width=120;
			btn.height=50;
			btn.label="选择配置文件";
			btn.on(/*laya.events.Event.MOUSE_DOWN*/"mousedown",this,this.btnClick);
			this.setContent(box);
		}

		/**
		*点击关闭
		*/
		__proto.btnClick=function(){
			var _$this=this;
			function getFile (value){
				var all=FileManager.readJSONFile(value[0]);
				var path=all.path;
				var outPath=all.outPath || path;
				var packages=all['package'];
				var one;
				debugger;
				for (one in packages){
					var types={};
					var pk=packages[one];
					var name;
					for (name in pk){
						var fname=path+"/"+name;
						var file=pk[name];
						var txt=FileManager.readTxtFile(fname);
						if (!types[file.type])
							types[file.type]={};
						switch(file.type){
							case "json":
								types[file.type][name]=FileManager.readJSONFile(fname);
								break ;
							default :
								types[file.type][name]=FileManager.readTxtFile(fname);
							}
					}
					FileManager.createJSONFile(outPath+"/"+one,types);
				}
				_$this.text.text="打包完成";
			}
			/*__JS__ */const {dialog}=require('electron').remote;
			/*__JS__ */dialog.showOpenDialog(null,null,getFile);
		}

		/**
		*初始化时创建消息监听
		*/
		__proto.init=function(){
			Notice.listen("textFilePackage",this,this.popup);
		}

		return TextFilePackage;
	})(PluginDialog)



})(window,document,Laya);
