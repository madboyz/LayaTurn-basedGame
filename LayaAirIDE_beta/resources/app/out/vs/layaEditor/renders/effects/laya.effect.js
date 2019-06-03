
(function(window,document,Laya){
	var __un=Laya.un,__uns=Laya.uns,__static=Laya.static,__class=Laya.class,__getset=Laya.getset,__newvec=Laya.__newvec;

	var Browser=laya.utils.Browser,Dialog=laya.ui.Dialog,Ease=laya.utils.Ease,Event=laya.events.Event;
	var Handler=laya.utils.Handler,Matrix=laya.maths.Matrix,Node=laya.display.Node,Point=laya.maths.Point,Sprite=laya.display.Sprite;
	var Texture=laya.resource.Texture,TimeLine=laya.utils.TimeLine,Tween=laya.utils.Tween;
	/**
	*...
	*@author ww
	*/
	//class laya.effect.BreakBurstEffect
	var BreakBurstEffect=(function(){
		function BreakBurstEffect(){
			this._tar=null;
			this._piece=null;
			this.randomR=300;
			this.minR=10;
			this.effectTime=1000;
			this._piece=new DisplayPieces();
		}

		__class(BreakBurstEffect,'laya.effect.BreakBurstEffect');
		var __proto=BreakBurstEffect.prototype;
		__proto.play=function(){
			if (!this._tar)return;
			this._piece.target=this._tar;
			this._piece.makePieces();
			var sps;
			sps=this._piece.sprites;
			var i=0,len=0;
			len=sps.length;
			var tParent;
			tParent=this._tar.parent;
			var tSp;
			var cx=NaN;
			var cy=NaN;
			var rec;
			rec=this._tar.getBounds();
			cx=rec.width *0.5+rec.x;
			cy=rec.height *0.5+rec.y;
			var dR=NaN;
			dR=Math.PI *2 / len;
			var r=this.randomR;
			var tX=NaN;
			var tY=NaN;
			this._tar.visible=false;
			for (i=0;i < len;i++){
				tSp=sps[i];
				tParent.addChild(tSp);
				r=this.minR+this.randomR *Math.random();
				tSp.rotation=0;
				tX=cx+r *Math.cos(dR *i);
				tY=cy+r *Math.sin(dR *i);
				Tween.to(tSp,{x:tX,y:tY,rotation:720*Math.random()-360},this.effectTime,Ease.elasticIn);
			}
			Laya.timer.once(this.effectTime+100,this,this.end);
		}

		__proto.end=function(){
			this._piece.clearPre();
		}

		/**
		*设置控制对象
		*@param tar
		*/
		__getset(0,__proto,'target',function(){
			return this._tar;
			},function(tar){
			this._tar=tar;
		});

		return BreakBurstEffect;
	})()


	/**
	*...
	*@author ww
	*/
	//class laya.effect.BreakEffect
	var BreakEffect=(function(){
		function BreakEffect(){
			this._tar=null;
			this.textures=[];
			this.sprites=[];
			this.preTexture=null;
			this.xCount=4;
			this.yCount=7;
			this.xRandomLen=20;
			this.yRandomLen=100;
			this.yDropLen=100;
			this.yDropTime=1000;
		}

		__class(BreakEffect,'laya.effect.BreakEffect');
		var __proto=BreakEffect.prototype;
		__proto.clearPre=function(){
			var i=0,len=0;
			len=this.sprites.length;
			var tSp;
			for (i=0;i < len;i++){
				tSp=this.sprites[i];
				tSp.removeSelf();
				tSp.graphics.clear();
				Tween.clearAll(tSp);
			}
			this.textures.length=0;
			if (this.preTexture){
				this.preTexture.destroy(true);
				this.preTexture=null;
			}
		}

		__proto.play=function(){
			this.clearPre();
			if (!this._tar)return;
			this._tar.visible=true;
			var rec;
			rec=this._tar.getSelfBounds();
			var htmlCanvas;
			htmlCanvas=this._tar.drawToCanvas(rec.width,rec.height,-rec.x,-rec.y);
			var texture;
			this.preTexture=texture=new Texture(htmlCanvas);;
			this.textures.length=0;
			var xD=NaN;
			var yD=NaN;
			xD=texture.width / this.xCount;
			yD=texture.height / this.yCount;
			var i=0,iLen=0;
			var j=0,jLen=0;
			var tTexture;
			this.sprites=this.sprites||[];
			var tSprite;
			var stX=NaN;
			var stY=NaN;
			stX=rec.x+this._tar.x;
			stY=rec.y+this._tar.y;
			this._tar.visible=false;
			var tI=0;
			tI=0;
			for (i=0;i < this.xCount;i++){
				for (j=0;j < this.yCount;j++){
					tTexture=Texture.createFromTexture(texture,i *xD,j *yD,xD,yD);
					this.textures.push(tTexture);
					if(!this.sprites[tI])this.sprites[tI]=new Sprite();
					tSprite=this.sprites[tI];
					tSprite.graphics.clear();
					tSprite.graphics.drawTexture(tTexture,0,0);
					tSprite.pos(i *xD+stX,j *yD+stY);
					this._tar.parent.addChild(tSprite);
					tI++;
					Tween.to(tSprite,{x:tSprite.x+Math.random()*this.xRandomLen*(i-this.xCount*0.5+0.25)},100,Ease.cubicInOut);
					Tween.to(tSprite,{y:tSprite.y+Math.random()*this.yRandomLen+this.yDropLen },this.yDropTime,Ease.elasticIn,Handler.create(this,this.removeSprites,[tSprite]),Math.random()*200);
				}
			}
			Laya.timer.once(this.yDropTime+100,this,this.clearPre);
		}

		__proto.removeSprites=function(sp){
			sp.removeSelf();
		}

		/**
		*设置控制对象
		*@param tar
		*/
		__getset(0,__proto,'target',function(){
			return this._tar;
			},function(tar){
			this._tar=tar;
		});

		return BreakEffect;
	})()


	/**
	*...
	*@author ww
	*/
	//class laya.effect.BreakSwitchEffect
	var BreakSwitchEffect=(function(){
		function BreakSwitchEffect(){
			this._piece=null;
			this.tar1=null;
			this.tar2=null;
			this.randomR=500;
			this.minR=10;
			this.effectTime=1000;
			this.xCount=15;
			this.yCount=15;
			this._piece=new DisplayPieces();
		}

		__class(BreakSwitchEffect,'laya.effect.BreakSwitchEffect');
		var __proto=BreakSwitchEffect.prototype;
		__proto.play=function(){
			this._piece.xCount=this.xCount;
			this._piece.yCount=this.yCount;
			this._piece.target=this.tar1;
			this.tar2.visible=false;
			this._piece.makePieces();
			var sps;
			sps=this._piece.sprites;
			var i=0,len=0;
			len=sps.length;
			var tParent;
			tParent=this.tar1.parent;
			var tSp;
			var cx=NaN;
			var cy=NaN;
			var rec;
			rec=this.tar1.getBounds();
			cx=rec.width *0.5+rec.x;
			cy=rec.height *0.5+rec.y;
			var dR=NaN;
			dR=Math.PI *2 / len;
			var r=this.randomR;
			var tX=NaN;
			var tY=NaN;
			this.tar1.visible=false;
			for (i=0;i < len;i++){
				tSp=sps[i];
				tParent.addChild(tSp);
				r=this.minR+this.randomR *Math.random();
				tSp.rotation=0;
				tX=cx+r *Math.cos(dR *i);
				tY=cy+r *Math.sin(dR *i);
				Tween.to(tSp,{x:tX,y:tY,rotation:(720*Math.random()-360)*1},this.effectTime,Ease.elasticIn);
			}
			Laya.timer.once(this.effectTime+10,this,this.disappearEnd);
		}

		__proto.switchPic=function(){
			this._piece.target=this.tar2;
			this._piece.makePieces(false);
		}

		__proto.disappearEnd=function(){
			this.startShowNew();
		}

		__proto.startShowNew=function(){
			this.switchPic();
			this.tar1.visible=false;
			var sps;
			sps=this._piece.sprites;
			var i=0,len=0;
			len=sps.length;
			var tParent;
			tParent=this.tar2.parent;
			var tSp;
			this.tar1.visible=false;
			var posList;
			posList=this._piece.posList;
			for (i=0;i < len;i++){
				tSp=sps[i];
				tParent.addChild(tSp);
				Tween.to(tSp,{x:posList[i*2],y:posList[i*2+1],rotation:0},this.effectTime,Ease.elasticOut);
			}
			Laya.timer.once(this.effectTime+100,this,this.showNewEnd);
		}

		__proto.showNewEnd=function(){
			this._piece.clearPre();
			this.tar2.visible=true;
		}

		return BreakSwitchEffect;
	})()


	/**
	*按钮点击效果类,点击之后会有一个缩放的效果
	*/
	//class laya.effect.ButtonClickEffect
	var ButtonClickEffect=(function(){
		function ButtonClickEffect(){
			this._tar=null;
		}

		__class(ButtonClickEffect,'laya.effect.ButtonClickEffect');
		var __proto=ButtonClickEffect.prototype;
		__proto.onClick=function(){
			EffectUtils.scaleEffect(this._tar);
		}

		/**
		*设置控制对象
		*@param tar
		*/
		__getset(0,__proto,'target',null,function(tar){
			this._tar=tar;
			tar.on(/*laya.events.Event.CLICK*/"click",this,this.onClick);
		});

		return ButtonClickEffect;
	})()


	/**
	*...
	*@author ww
	*/
	//class laya.effect.ButtonEffect
	var ButtonEffect=(function(){
		function ButtonEffect(){
			this._tar=null;
			this._curState=0;
			this._curTween=null;
			this.effectScale=1.5;
			this.tweenTime=300;
			this.effectEase=null;
			this.backEase=null;
		}

		__class(ButtonEffect,'laya.effect.ButtonEffect');
		var __proto=ButtonEffect.prototype;
		__proto.toChangedState=function(){
			this._curState=1;
			if (this._curTween)Tween.clear(this._curTween);
			this._curTween=Tween.to(this._tar,{scaleX:this.effectScale,scaleY:this.effectScale },this.tweenTime,Ease[this.effectEase],Handler.create(this,this.tweenComplete));
		}

		__proto.toInitState=function(){
			if (this._curState==2)return;
			if (this._curTween)Tween.clear(this._curTween);
			this._curState=2;
			this._curTween=Tween.to(this._tar,{scaleX:1,scaleY:1 },this.tweenTime,Ease[this.backEase],Handler.create(this,this.tweenComplete));
		}

		__proto.tweenComplete=function(){
			this._curState=0;
			this._curTween=null;
		}

		/**
		*设置控制对象
		*@param tar
		*/
		__getset(0,__proto,'target',null,function(tar){
			this._tar=tar;
			tar.on(/*laya.events.Event.MOUSE_DOWN*/"mousedown",this,this.toChangedState);
			tar.on(/*laya.events.Event.MOUSE_UP*/"mouseup",this,this.toInitState);
			tar.on(/*laya.events.Event.MOUSE_OUT*/"mouseout",this,this.toInitState);
		});

		return ButtonEffect;
	})()


	/**
	*...
	*@author ww
	*/
	//class laya.effect.DisplayPieces
	var DisplayPieces=(function(){
		function DisplayPieces(){
			this.xCount=4;
			this.yCount=7;
			this.target=null;
			this.posList=[];
			this.textures=[];
			this.sprites=[];
			this.preTexture=null;
		}

		__class(DisplayPieces,'laya.effect.DisplayPieces');
		var __proto=DisplayPieces.prototype;
		__proto.makePieces=function(setPos){
			(setPos===void 0)&& (setPos=true);
			this.clearPre();
			var rec;
			var preVisible=false;
			preVisible=this.target.visible;
			this.target.visible=true;
			rec=this.target.getSelfBounds();
			var htmlCanvas;
			htmlCanvas=this.target.drawToCanvas(rec.width,rec.height,-rec.x,-rec.y);
			this.target.visible=preVisible;
			var texture;
			this.preTexture=texture=new Texture(htmlCanvas);;
			this.textures.length=0;
			var xD=NaN;
			var yD=NaN;
			xD=texture.width / this.xCount;
			yD=texture.height / this.yCount;
			var i=0,iLen=0;
			var j=0,jLen=0;
			var tTexture;
			var tSprite;
			var stX=NaN;
			var stY=NaN;
			stX=rec.x+this.target.x;
			stY=rec.y+this.target.y;
			var tI=0;
			tI=0;
			for (i=0;i < this.xCount;i++){
				for (j=0;j < this.yCount;j++){
					tTexture=Texture.createFromTexture(texture,i *xD,j *yD,xD,yD);
					this.textures.push(tTexture);
					if(!this.sprites[tI])this.sprites[tI]=new Sprite();
					tSprite=this.sprites[tI];
					tSprite.graphics.clear();
					tSprite.graphics.drawTexture(tTexture,0,0);
					if (setPos){
						tSprite.pos(i *xD+stX,j *yD+stY);
					}
					this.posList[tI *2]=i *xD+stX;
					this.posList[tI *2+1]=j *yD+stY;
					tI++;
				}
			}
		}

		__proto.movePieces=function(dX,dY){
			var i=0,len=0;
			len=this.sprites.length;
			var tSp;
			for (i=0;i < len;i++){
				tSp=this.sprites[i];
				tSp.x+=dX;
				tSp.y+=dY;
			}
		}

		__proto.clearPre=function(){
			var i=0,len=0;
			len=this.sprites.length;
			var tSp;
			for (i=0;i < len;i++){
				tSp=this.sprites[i];
				tSp.removeSelf();
				tSp.graphics.clear();
				Tween.clearAll(tSp);
			}
			this.textures.length=0;
			if (this.preTexture){
				this.preTexture.destroy(true);
				this.preTexture=null;
			}
		}

		__proto.destroy=function(){
			this.clearPre();
			this.sprites.length=0;
		}

		return DisplayPieces;
	})()


	/**
	*面板开合特效
	*/
	//class laya.effect.DoorEffect
	var DoorEffect=(function(){
		function DoorEffect(){
			this._target=null;
			this.left=null;
			this.top=null;
			this.bottom=null;
			this.complete=null;
			this.caches=[false,false,false];
			this.delay=0;
			this.leftPoint=new Point();
			this.topPoint=new Point();
			this.bottomPoint=new Point();
		}

		__class(DoorEffect,'laya.effect.DoorEffect');
		var __proto=DoorEffect.prototype;
		/**
		*实现DialogManager.popupEffect
		*/
		__proto.popupEffect=function(){
			this.open(Handler.create(Dialog.manager,Dialog.manager.doOpen,[this._target]));
		}

		/**
		*实现DialogManager.closeEffect
		*/
		__proto.closeEffect=function(dialog,type){
			this.close(Handler.create(Dialog.manager,Dialog.manager.doClose,[this._target,type]));
		}

		/**
		*打开
		*@param complete
		*/
		__proto.open=function(complete){
			this.complete=complete;
			if (this.left){
				this.left.x=-300;
				this.caches[0]=this.left.cacheAs;
				this.left.cacheAs="normal";
			}
			if (this.top){
				this.top.y=-200;
				this.caches[1]=this.top.cacheAs;
				this.top.cacheAs="normal";
			}
			if (this.bottom){
				this.bottom.y=Laya.stage.height+100;
				this.caches[2]=this.bottom.cacheAs;
				this.bottom.cacheAs="normal";
				this.bottom.staticCache=true;
			}
			if (this.delay)
				Laya.timer.once(this.delay,this,this.show);
			else
			this.show();
		}

		/**
		*打开特效
		*/
		__proto.show=function(){
			this._target && (this._target.mouseEnabled=false);
			if (this.left)
				Tween.to(this.left,{x:this.leftPoint.x},500,Ease.backOut);
			if (this.top)
				Tween.to(this.top,{y:this.topPoint.y},500,Ease.backOut);
			if (this.bottom)
				Tween.to(this.bottom,{y:this.bottomPoint.y},500,Ease.backOut,Handler.create(this,this.onComplete));
		}

		/**
		*打开完成
		*/
		__proto.onComplete=function(){
			if (this.left)
				this.left.cacheAs=this.caches[0];
			if (this.top)
				this.top.cacheAs=this.caches[1];
			if (this.bottom){
				this.bottom.cacheAs=this.caches[2];
				this.bottom.staticCache=false;
			}
			this._target && (this._target.mouseEnabled=true);
			this.complete && this.complete.run();
		}

		/**
		*关闭
		*@param handler
		*/
		__proto.close=function(handler){
			var _$this=this;
			this._target && (this._target.mouseEnabled=false);
			if (this.left)
				Tween.to(this.left,{x:-300},400,Ease.backIn);
			if (this.top)
				Tween.to(this.top,{y:-200},400,Ease.backIn,Handler.create(this,function(){
				handler && handler.run();
				_$this._target && (_$this._target.mouseEnabled=true);
			}));
			if (this.bottom)
				Tween.to(this.bottom,{y:Laya.stage.height},400,Ease.backIn);
		}

		/**
		*设置控制对象
		*@param tar
		*/
		__getset(0,__proto,'target',null,function(tar){
			if (!this._target){
				this._target=tar;
				this.left=this._target.getChildByName("leftPanel");
				this.top=this._target.getChildByName("topPanel");
				this.bottom=this._target.getChildByName("bottomPanel");
				if (this.left)
					this.leftPoint.setTo(this.left.x,this.left.y);
				if (this.top)
					this.topPoint.setTo(this.top.x,this.top.y);
				if (this.bottom)
					this.bottomPoint.setTo(this.bottom.x,this.bottom.y);
				var dlg=tar;
				dlg.popupEffect=new Handler(this,this.popupEffect);
				dlg.closeEffect=new Handler(this,this.closeEffect);
			}
		});

		return DoorEffect;
	})()


	/**
	*...
	*@author ww
	*/
	//class laya.effect.DragEffect
	var DragEffect=(function(){
		function DragEffect(){
			this._target=null;
			this.scaleBig=1.5;
			this._pos=new Point();
		}

		__class(DragEffect,'laya.effect.DragEffect');
		var __proto=DragEffect.prototype;
		__proto.recordPos=function(){
			this._pos.setTo(this._target.x,this._target.y);
		}

		__proto.onMouseDown=function(){
			if (!this._target)return;
			Tween.clearAll(this._target);
			Tween.to(this._target,{scaleX:this.scaleBig,scaleY:this.scaleBig },100);
			this._target.startDrag(null,false,50,500);
		}

		__proto.onDragEnd=function(){
			Tween.clearAll(this._target);
			Tween.to(this._target,{scaleX:1,scaleY:1,x:this._pos.x,y:this._pos.y },1000,Ease.bounceOut);
		}

		__getset(0,__proto,'target',null,function(v){
			this._target=v;
			this._target.on(/*laya.events.Event.MOUSE_DOWN*/"mousedown",this,this.onMouseDown);
			this._target.on(/*laya.events.Event.DRAG_END*/"dragend",this,this.onDragEnd);
			this.recordPos();
		});

		return DragEffect;
	})()


	/**
	*...
	*@author ww
	*/
	//class laya.effect.effectcontainer.DrawBase
	var DrawBase=(function(){
		function DrawBase(){
			this.dead=false;
		}

		__class(DrawBase,'laya.effect.effectcontainer.DrawBase');
		var __proto=DrawBase.prototype;
		__proto.drawToGraphic=function(g){}
		__proto.update=function(dt){}
		return DrawBase;
	})()


	/**
	*时间线管理类
	*/
	//class laya.effect.EffectUtils
	var EffectUtils=(function(){
		function EffectUtils(){};
		__class(EffectUtils,'laya.effect.EffectUtils');
		EffectUtils.scaleEffect=function(target,complete,time){
			(time===void 0)&& (time=150);
			if (EffectUtils._isMove)
				return;
			EffectUtils._isMove=true;
			EffectUtils._timeLine.addLabel("first0.9",0).to(target,{scaleX:1.1,scaleY:1.1},time,null,0).addLabel("three0.9",0).to(target,{scaleX:0.9,scaleY:0.9},time,null,0).addLabel("four1",0).to(target,{scaleX:1,scaleY:1},time,null,0);
			EffectUtils._timeLine.play(0,false);
			EffectUtils._timeLine.on(/*laya.events.Event.COMPLETE*/"complete",EffectUtils,EffectUtils.onTimeLineComplete,[complete]);
		}

		EffectUtils.onTimeLineComplete=function(complete,evt){
			EffectUtils._isMove=false;
			EffectUtils._timeLine.reset();
			complete !=null && complete.run();
		}

		EffectUtils.shrinkEffect=function(target,targetObj,time,ease,direction){
			(time===void 0)&& (time=300);
			(direction===void 0)&& (direction=true);
			var targetX=NaN,targetY=NaN;
			if (targetObj.hasOwnProperty("x"))
				targetX=targetObj.x;
			if (targetObj.hasOwnProperty("y"))
				targetY=targetObj.y;
			if (direction)
				Tween.to(target,{x:targetX},time,ease);
			else
			Tween.to(target,{y:targetY},time,ease);
		}

		EffectUtils._isMove=false;
		__static(EffectUtils,
		['_timeLine',function(){return this._timeLine=new TimeLine();}
		]);
		return EffectUtils;
	})()


	/**
	*...
	*@author ww
	*/
	//class laya.effect.EraseLineShowEffect
	var EraseLineShowEffect=(function(){
		function EraseLineShowEffect(){
			this._tar=null;
			this.blendSp=null;
			this._rec=null;
			this.blendSp=new Sprite();
			this.blendSp.graphics.drawCircle(0,0,100,"#ff0000");
		}

		__class(EraseLineShowEffect,'laya.effect.EraseLineShowEffect');
		var __proto=EraseLineShowEffect.prototype;
		__proto.play=function(){
			if (!this._tar)return;
			var rec;
			this._rec=rec=this._tar.getSelfBounds();
			this.blendSp.pos(0,0);
			this._tar.mask=this.blendSp;
			this.blendSp.graphics.clear();
			Laya.timer.frameLoop(3,this,this.loop);
			Laya.timer.once(1000,this,this.tweenComplete);
		}

		__proto.loop=function(){
			this.blendSp.graphics.drawLine(this._rec.x-10,Math.random()*this._rec.height+this._rec.y,this._rec.x+this._rec.width+10,Math.random()*this._rec.height+this._rec.y,"#ff0000",2+Math.random()*5);
			this.blendSp.graphics.drawLine(this._rec.x-10,Math.random()*this._rec.height+this._rec.y,this._rec.x+this._rec.width+10,Math.random()*this._rec.height+this._rec.y,"#ff0000",2+Math.random()*5);
			this._tar.mask=null;
			this._tar.mask=this.blendSp;
		}

		__proto.tweenComplete=function(){
			Laya.timer.clear(this,this.loop);
			this._tar.mask=null;
			this.blendSp.removeSelf();
		}

		/**
		*设置控制对象
		*@param tar
		*/
		__getset(0,__proto,'target',function(){
			return this._tar;
			},function(tar){
			this._tar=tar;
		});

		return EraseLineShowEffect;
	})()


	/**
	*...
	*@author ww
	*/
	//class laya.effect.EraseShowEffect
	var EraseShowEffect=(function(){
		function EraseShowEffect(){
			this._tar=null;
			this.blendSp=null;
			this.blendSp=new Sprite();
			this.blendSp.graphics.drawCircle(0,0,100,"#ff0000");
		}

		__class(EraseShowEffect,'laya.effect.EraseShowEffect');
		var __proto=EraseShowEffect.prototype;
		__proto.play=function(){
			if (!this._tar)return;
			var rec;
			rec=this._tar.getSelfBounds();
			this.blendSp.pos(rec.x+rec.width*0.5,rec.y+rec.height*0.5);
			this.blendSp.scale(0.01,0.01);
			this._tar.mask=this.blendSp;
			var tarScale=NaN;
			tarScale=1.1 *Math.max(rec.width,rec.height)/ 100;
			Tween.clearAll(this.blendSp);
			Laya.timer.frameLoop(1,this,this.loop);
			Tween.to(this.blendSp,{scaleX:tarScale,scaleY:tarScale },1000,Ease.strongIn,Handler.create(this,this.tweenComplete));
		}

		__proto.loop=function(){
			this._tar.mask=null;
			this._tar.mask=this.blendSp;
		}

		__proto.tweenComplete=function(){
			Laya.timer.clear(this,this.loop);
			this._tar.mask=null;
			this.blendSp.removeSelf();
		}

		/**
		*设置控制对象
		*@param tar
		*/
		__getset(0,__proto,'target',function(){
			return this._tar;
			},function(tar){
			this._tar=tar;
		});

		return EraseShowEffect;
	})()


	/**
	*...
	*@author ww
	*/
	//class laya.effect.Fris
	var Fris=(function(){
		function Fris(){
			this.tar=null;
			this.mainSP=new Sprite();
			this.showArea=new Sprite();
			this.mainSP.cacheAs="bitmap";
			this.showArea.blendMode="destination-out";
			this.mainSP.addChild(this.showArea);
		}

		__class(Fris,'laya.effect.Fris');
		var __proto=Fris.prototype;
		__proto.play=function(){
			if (!this.tar)return;
			var tP;
			tP=this.tar.parent;
			this.mainSP.graphics.clear();
			this.mainSP.graphics.drawRect(0,0,tP.width,tP.height,"#000000");
			tP.addChild(this.mainSP);
			this.showArea.graphics.clear();
			this.showArea.graphics.drawCircle(0,0,100,"#ff0000");
			this.showArea.x=this.tar.x+this.tar.width*0.5;
			this.showArea.y=this.tar.y+this.tar.height*0.5;
			this.showArea.scale(0.01,0.01);
			var tarScale=NaN;
			tarScale=1.1 *Math.max(tP.width,tP.height)/ 100;
			Tween.clearAll(this.showArea);
			Tween.to(this.showArea,{scaleX:tarScale,scaleY:tarScale },1000,Ease.strongIn,Handler.create(this,this.tweenComplete));
		}

		__proto.tweenComplete=function(){
			this.mainSP.removeSelf();
		}

		__getset(0,__proto,'target',null,function(tar){
			this.tar=tar;
		});

		return Fris;
	})()


	/**
	*...
	*@author ww
	*/
	//class laya.effect.GatherEffect
	var GatherEffect=(function(){
		function GatherEffect(){
			this._tar=null;
			this._piece=null;
			this.randomR=300;
			this.minR=10;
			this.effectTime=1000;
			this._piece=new DisplayPieces();
		}

		__class(GatherEffect,'laya.effect.GatherEffect');
		var __proto=GatherEffect.prototype;
		__proto.play=function(){
			if (!this._tar)return;
			this._piece.target=this._tar;
			this._piece.makePieces();
			var sps;
			sps=this._piece.sprites;
			var i=0,len=0;
			len=sps.length;
			var tParent;
			tParent=this._tar.parent;
			var tSp;
			var cx=NaN;
			var cy=NaN;
			var rec;
			rec=this._tar.getBounds();
			cx=rec.width *0.5+rec.x;
			cy=rec.height *0.5+rec.y;
			var dR=NaN;
			dR=Math.PI *2 / len;
			var r=this.randomR;
			var tX=NaN;
			var tY=NaN;
			this._tar.visible=false;
			for (i=0;i < len;i++){
				tSp=sps[i];
				tParent.addChild(tSp);
				r=this.minR+this.randomR *Math.random();
				tSp.rotation=0;
				tX=cx+r *Math.cos(dR *i);
				tY=cy+r *Math.sin(dR *i);
				Tween.from(tSp,{x:tX,y:tY,rotation:720*Math.random()-360},this.effectTime,Ease.cubicInOut);
			}
			Laya.timer.once(this.effectTime+100,this,this.end);
		}

		__proto.end=function(){
			this._piece.clearPre();
			this.target.visible=true;
		}

		/**
		*设置控制对象
		*@param tar
		*/
		__getset(0,__proto,'target',function(){
			return this._tar;
			},function(tar){
			this._tar=tar;
		});

		return GatherEffect;
	})()


	/**
	*...
	*@author ww
	*/
	//class laya.effect.ListEffect
	var ListEffect=(function(){
		function ListEffect(){
			this._tar=null;
			this.tweenTime=300;
			this.dTime=100;
		}

		__class(ListEffect,'laya.effect.ListEffect');
		var __proto=ListEffect.prototype;
		__proto.play=function(){
			if (!this._tar)return;
			var cells;
			cells=this._tar.cells;
			if (!cells || cells.length < 1)return;
			var i=0,len=0;
			len=cells.length;
			var tCell;
			var preX=NaN;
			preX=cells[0].x;
			for (i=0;i < len;i++){
				tCell=cells[i];
				tCell.x=preX+tCell.width+10;
				Tween.clearAll(tCell);
				Tween.to(tCell,{x:preX},this.tweenTime,Ease.cubicInOut,null,i*this.dTime);
			}
		}

		/**
		*设置控制对象
		*@param tar
		*/
		__getset(0,__proto,'target',null,function(tar){
			this._tar=tar;
		});

		return ListEffect;
	})()


	/**
	*...
	*@author ww
	*/
	//class laya.effect.SideShowEffect
	var SideShowEffect=(function(){
		function SideShowEffect(){
			this._tar=null;
			this.blendSp=null;
			this.type="top";
			this.blendSp=new Sprite();
		}

		__class(SideShowEffect,'laya.effect.SideShowEffect');
		var __proto=SideShowEffect.prototype;
		__proto.play=function(){
			if (!this._tar)return;
			var rec;
			rec=this._tar.getSelfBounds();
			this.blendSp.pos(rec.x ,rec.y);
			this.blendSp.graphics.drawRect(0,0,rec.width,rec.height,"#ff0000");
			var tarKey;
			var tarValue=NaN;
			switch(this.type){
				case "top":
					this.blendSp.y-=rec.height;
					tarKey="y";
					tarValue=rec.y;
					break ;
				case "bottom":
					this.blendSp.y+=rec.height;
					tarKey="y";
					tarValue=rec.y;
					break ;
				case "left":
					this.blendSp.x-=rec.width;
					tarKey="x";
					tarValue=rec.x;
					break ;
				case "right":
					this.blendSp.x+=rec.width;
					tarKey="x";
					tarValue=rec.x;
					break ;
				}
			this._tar.mask=this.blendSp;
			Tween.clearAll(this.blendSp);
			Laya.timer.frameLoop(1,this,this.loop);
			var dataO;
			dataO={};
			dataO[tarKey]=tarValue;
			Tween.to(this.blendSp,dataO,1000,Ease.cubicOut,Handler.create(this,this.tweenComplete));
		}

		__proto.loop=function(){
			this._tar.mask=null;
			this._tar.mask=this.blendSp;
		}

		__proto.tweenComplete=function(){
			Laya.timer.clear(this,this.loop);
			this._tar.mask=null;
			this.blendSp.removeSelf();
		}

		/**
		*设置控制对象
		*@param tar
		*/
		__getset(0,__proto,'target',function(){
			return this._tar;
			},function(tar){
			this._tar=tar;
		});

		return SideShowEffect;
	})()


	/**
	*...
	*@author ww
	*/
	//class laya.effect.SnowEffect
	var SnowEffect=(function(){
		var Snow;
		function SnowEffect(){
			this.texture=null;
			this.maxCount=20;
		}

		__class(SnowEffect,'laya.effect.SnowEffect');
		SnowEffect.__init$=function(){
			//class Snow
			Snow=(function(){
				function Snow(){
					this.x=NaN;
					this.y=NaN;
					this.scale=NaN;
					this.speedX=NaN;
					this.speedY=NaN;
				}
				__class(Snow,'');
				return Snow;
			})()
		}

		return SnowEffect;
	})()


	/**
	*...
	*@author ww
	*/
	//class laya.effect.effectcontainer.TextureDraw extends laya.effect.effectcontainer.DrawBase
	var TextureDraw=(function(_super){
		function TextureDraw(){
			this.texture=null;
			this.x=0;
			this.y=0;
			this.alpha=1;
			this.rotation=0;
			this.scale=1;
			this.px=0;
			this.py=0;
			this.enableMt=false;
			TextureDraw.__super.call(this);
			this._mt=new Matrix();
		}

		__class(TextureDraw,'laya.effect.effectcontainer.TextureDraw',_super);
		var __proto=TextureDraw.prototype;
		__proto.drawToGraphic=function(g){
			if (!this.texture)return;
			if (this.alpha <=0.01)return;
			if (!this.enableMt){
				g.drawTexture(this.texture,this.x-this.px,this.y-this.px,0,0,null,this.alpha);
				return;
			}
			this._mt.identity();
			this._mt.scale(this.scale,this.scale);
			this._mt.rotate(Math.PI*this.rotation/180);
			this._mt.setTranslate(this.x,this.y);
			g.drawTexture(this.texture,-this.px,-this.py,0,0,this._mt,this.alpha);
		}

		return TextureDraw;
	})(DrawBase)


	/**
	*...
	*@author ww
	*/
	//class laya.effect.EraseCircleShowEffect extends laya.effect.EraseLineShowEffect
	var EraseCircleShowEffect=(function(_super){
		function EraseCircleShowEffect(){
			EraseCircleShowEffect.__super.call(this);
		}

		__class(EraseCircleShowEffect,'laya.effect.EraseCircleShowEffect',_super);
		var __proto=EraseCircleShowEffect.prototype;
		__proto.loop=function(){
			this.blendSp.graphics.drawCircle(this._rec.x+Math.random()*this._rec.width,this._rec.y+this._rec.height *Math.random(),5+20 *Math.random(),"#ff0000");
			this.blendSp.graphics.drawCircle(this._rec.x+Math.random()*this._rec.width,this._rec.y+this._rec.height *Math.random(),5+20 *Math.random(),"#ff0000");
			this._tar.mask=null;
			this._tar.mask=this.blendSp;
		}

		return EraseCircleShowEffect;
	})(EraseLineShowEffect)


	/**
	*...
	*@author ww
	*/
	//class laya.effect.effectcontainer.ParticleDraw extends laya.effect.effectcontainer.TextureDraw
	var ParticleDraw=(function(_super){
		function ParticleDraw(){
			this.vX=1;
			this.vY=1;
			this.life=3;
			ParticleDraw.__super.call(this);
			this.enableMt=true;
		}

		__class(ParticleDraw,'laya.effect.effectcontainer.ParticleDraw',_super);
		var __proto=ParticleDraw.prototype;
		__proto.update=function(dt){
			if (this.life <=0){
				this.dead=true;
				return;
			}
			this.x+=this.vX;
			this.y+=this.vY;
			this.life-=dt;
		}

		return ParticleDraw;
	})(TextureDraw)


	/**
	*...
	*@author ww
	*/
	//class laya.effect.AniTrailEffect extends laya.display.Sprite
	var AniTrailEffect=(function(_super){
		function AniTrailEffect(){
			this.textures=null;
			this.posList=[];
			this.disappearTime=2000;
			AniTrailEffect.__super.call(this);
		}

		__class(AniTrailEffect,'laya.effect.AniTrailEffect',_super);
		var __proto=AniTrailEffect.prototype;
		__proto.addTrail=function(x,y){
			this.posList.push(x,y,Browser.now());
		}

		__proto.render=function(context,x,y){
			if (!this.textures)return;
			var g=this.graphics;
			g.clear();
			if (!this.posList || this.posList.length < 1)return;
			var i=0,len=0;
			len=this.posList.length;
			var tTime=Browser.now();
			var tIndex=0;
			var maxIndex=this.textures.length;
			var timeRate=NaN;
			timeRate=maxIndex / this.disappearTime;
			var removeI=0;
			for (i=len-1-2;i >=0;i-=3){
				tIndex=Math.floor((tTime-this.posList[i+2])*timeRate);
				if (tIndex >=maxIndex){
					this.posList.splice(0,i+3);
					break ;
					}else{
					g.drawTexture(this.textures[tIndex],this.posList[i],this.posList[i+1]);
				}
			}
			_super.prototype.render.call(this,context,x,y);
		}

		return AniTrailEffect;
	})(Sprite)


	/**
	*...
	*@author ww
	*/
	//class laya.effect.effectcontainer.EffectContainer extends laya.display.Sprite
	var EffectContainer=(function(_super){
		function EffectContainer(){
			this.drawList=[];
			EffectContainer.__super.call(this);
		}

		__class(EffectContainer,'laya.effect.effectcontainer.EffectContainer',_super);
		var __proto=EffectContainer.prototype;
		__proto.addDraw=function(draw){
			this.drawList.push(draw);
		}

		__proto.removeDraw=function(draw){
			var i=0,len=0;
			len=this.drawList.length;
			for (i=0;i < len;i++){
				if (this.drawList==draw){
					this.drawList.splice(i,1);
					return;
				}
			}
		}

		__proto.render=function(context,x,y){
			if (!this.drawList)return;
			var i=0,len=0;
			len=this.drawList.length;
			var tDraw;
			var g;
			g=this.graphics;
			g.clear();
			var time=NaN;
			time=1 / 60;
			for (i=len-1;i >=0;i--){
				tDraw=this.drawList[i];
				tDraw.update(time);
				if (tDraw.dead){
					this.drawList.splice(i,1);
				}
			}
			len=this.drawList.length;
			for (i=0;i < len;i++){
				tDraw=this.drawList[i];
				tDraw.drawToGraphic(g);
			}
			_super.prototype.render.call(this,context,x,y);
		}

		return EffectContainer;
	})(Sprite)


	/**
	*...
	*@author ww
	*/
	//class laya.effect.MoveShadowEffect extends laya.display.Sprite
	var MoveShadowEffect=(function(_super){
		function MoveShadowEffect(){
			this.tex=null;
			this.effectContainer=null;
			this.times=[100,200,300,400];
			this.posList=[];
			this.tPropDic={};
			MoveShadowEffect.__super.call(this);
		}

		__class(MoveShadowEffect,'laya.effect.MoveShadowEffect',_super);
		var __proto=MoveShadowEffect.prototype;
		__proto.move=function(startX,startY,tarX,tarY,time){
			(time===void 0)&& (time=400);
			this.effectContainer.addChild(this);
			Tween.clearAll(this.posList);
			var i=0,len=0;
			len=this.times.length;
			var tX=0,tY=0;
			var complete;
			var rate=NaN;
			rate=time / this.times[this.times.length-1];
			for (i=0;i < len;i++){
				tX=i*2;
				tY=tX+1;
				this.posList[tX]=startX;
				this.posList[tY]=startY;
				if (i==len-1){
					complete=Handler.create(this,this.moveEnd);
				};
				var tPropO;
				if (!this.tPropDic[i])this.tPropDic[i]={};
				tPropO=this.tPropDic[i];
				tPropO[tX]=tarX;
				tPropO[tY]=tarY;
				Tween.to(this.posList,tPropO,this.times[i]*rate,null,complete);
			}
		}

		__proto.moveEnd=function(){
			this.removeSelf();
		}

		__proto.render=function(context,x,y){
			this.graphics.clear();
			var i=0,len=0;
			len=this.times.length;
			var tX=0,tY=0;
			for (i=0;i < len;i++){
				tX=i*2;
				tY=tX+1;
				this.graphics.drawTexture(this.tex,this.posList[tX],this.posList[tY]);
			}
			_super.prototype.render.call(this,context,x,y);
		}

		return MoveShadowEffect;
	})(Sprite)


	/**
	*...
	*@author ww
	*/
	//class laya.effect.TrailEffect extends laya.display.Sprite
	var TrailEffect=(function(_super){
		function TrailEffect(){
			this.texture=null;
			this.posList=[];
			this.loopTime=500;
			this.isLooping=false;
			TrailEffect.__super.call(this);
		}

		__class(TrailEffect,'laya.effect.TrailEffect',_super);
		var __proto=TrailEffect.prototype;
		__proto.addTrail=function(x,y){
			this.posList.push(x,y);
			this.startLoop();
		}

		__proto.startLoop=function(){
			if (this.isLooping)return;
			this.isLooping=true;
			Laya.timer.loop(this.loopTime,this,this.loop);
		}

		__proto.loop=function(){
			if (this.posList.length > 0){
				this.posList.splice(0,2);
				}else{
				this.stopLoop();
			}
		}

		__proto.stopLoop=function(){
			this.isLooping=false;
			Laya.timer.clear(this,this.loop);
		}

		__proto.render=function(context,x,y){
			if (!this.texture)return;
			this.graphics.clear();
			if (!this.posList || this.posList.length < 1)return;
			this.graphics.drawTextures(this.texture,this.posList);
			_super.prototype.render.call(this,context,x,y);
		}

		return TrailEffect;
	})(Sprite)


	Laya.__init([SnowEffect]);
})(window,document,Laya);
