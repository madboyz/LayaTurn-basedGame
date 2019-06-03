/**
 * 滚动列表
 * @export
 * @class ScrollList
 * @extends {Laya.Sprite}
 */
export class ScrollList extends Laya.Sprite {
    public _list:Laya.List;
    public _preBtn:component.ScaleButton;
    public _nextBtn:component.ScaleButton;
    private _listCell:any;
    private _dataProvider:Array<any>;
    private _listChangeCall:Function;
    public _nextPageCall:Function;
    private _scrollDurTime:number = 0.6;	//滚动一次缓动时间 秒
    public scrollOffset:number=0;				//滚动偏移量
    private _index:number;		//当前项
    private _maxIndex:number;	//最大项
    private _maxPage:number;
    private _cellWidth:number;
    private _cellHeight:number;
    private _direction:number;//水平方向，坚直方向
    private _space:number;
    private _currentPage:number;
    private boundRightIndex:number;
    /**
     * Creates an instance of ScrollList.
     * @param {number} w 宽
     * @param {number} h 高
     * @param {number} cellWidth  cell宽
     * @param {number} cellHeight cell高
     * @param {*} cell 
     * @param {number} [scrollDurTime=0.6] 滚动的时间
     * @param {number} [direction=1] 0是竖向 1是横向
     * @param {Function} [listChangeCall=null] 点击cell的回调
     * @param {number}  间隙
     * @memberof ScrollList
     */
    constructor(w:number, h:number,cellWidth:number,cellHeight:number,cell:any,scrollDurTime:number=0.6, direction:number=1,listChangeCall:Function=null,space:number = 5) {
        super();
        this.width = w;
        this.height = h;
        this._cellWidth=cellWidth;
        this._cellHeight=cellHeight;
        this._listCell = cell;
        this._direction=direction;
        this._scrollDurTime = scrollDurTime;
        this._listChangeCall = listChangeCall;
        this._space = space;
        this.init();
        this.setSize(w,h);
    }

    public init():void
    {
        this.mouseEnabled = true;
        
        this._list = new Laya.List();
        this.addChild(this._list);
        this._list.itemRender = this._listCell;
        this._list.pos(0, 0);
        if(this._direction == 1)
        {
            this._list.spaceX = this._space;
            this._list.repeatX = 5;
            this._list.repeatY = 1;
        }
        else
        {
            this._list.spaceY = this._space;
            this._list.repeatY = 5;
            this._list.repeatX = 1;
        }
        this._list.array = this._dataProvider;
        this._list.selectEnable = true;
        this._list.selectHandler = Laya.Handler.create(this,this.onListChangeHandler,null,false);
        this._list.renderHandler = Laya.Handler.create(this,this.onRenderHandler,null,false);
        
        this._preBtn = new component.ScaleButton();
        this._preBtn.width = 47;
        this._preBtn.height = 57;
        this._preBtn.skin = ResUtils.getCompUIUrl("btn_arrow");
        this.addChild(this._preBtn);
        this._nextBtn = new component.ScaleButton();
        this._nextBtn.width = 47;
        this._nextBtn.height = 57;
        this._nextBtn.skin = ResUtils.getCompUIUrl("btn_arrow");
        this.addChild(this._nextBtn);
        
        
        this._preBtn.on(Laya.Event.MOUSE_DOWN, this,this.onPreBtnDownHandler);
        this._nextBtn.on(Laya.Event.MOUSE_DOWN, this,this.onNextBtnDownHandler);
        
        if(this._direction==1)
        {
            this._preBtn.scaleX = -1;
            this._nextBtn.scaleX = 1;
            this._preBtn.rotation=0;
            this._nextBtn.rotation=0;
            this.setBtnOffset(23.5,-57,0,0);
            this._list.size(this.listWidth, this.height);
        }
        else
        {
            this._preBtn.rotation=-90;
            this._nextBtn.rotation=90;
            this.setBtnOffset(0,0,-24,24);
            this._list.size(this.width, this.listHeight);
        }

        this.scrollToIndex(0);
    }

    /**
     * 设置按钮样式
     * @param {component.ScaleButton} preBtn 
     * @param {component.ScaleButton} nextBtn 
     * @memberof ScrollList
     */
    public resetBtnStyle(preBtn:component.ScaleButton,nextBtn:component.ScaleButton):void
    {
        if(this._preBtn)
        {
            this._preBtn.removeSelf();
        }
        if(this._nextBtn)
        {
            this._nextBtn.removeSelf();
        }
        this._preBtn=preBtn;
        this._nextBtn=nextBtn;
        this._preBtn.scaleX = -1;
        this._nextBtn.scaleX = 1;

        if(this._direction==1)
        {
            this._preBtn.rotation=0;
            this._nextBtn.rotation=0;
            this.setBtnOffset(19,-56,0,0);
            this._list.size(this.listWidth, this.height);
        }
        else
        {
            this._preBtn.rotation=90;
            this._nextBtn.rotation=90;
            this.setBtnOffset(0,0,-24,24);
            this._list.size(this.width, this.listHeight);
        }
        
        this._preBtn.on(Laya.Event.MOUSE_DOWN, this,this.onPreBtnDownHandler);
        this._nextBtn.on(Laya.Event.MOUSE_DOWN, this,this.onNextBtnDownHandler);
        this.setBtnPose();
        this.updateBtnState();
    }

    /**
     * 按钮y
     * @param {number} y 
     * @memberof ScrollList
     */
    public moveBtnY(y:number):void
    {
        this._preBtn.y = y;
        this._nextBtn.y = y;
    }
    
    /**
     * 按钮x
     * @param {number} x 
     * @memberof ScrollList
     */
    public moveBtnX(x:number):void
    {
        this._preBtn.x = x;
        this._nextBtn.x = x;
    }

    /**
     * 选中list某一项
     * @memberof ScrollList
     */
    public set selectedIndex($value:number)
    {
        if(this._list)
        {
            this._list.selectedIndex = $value;
            this.onListChangeHandler(null);
        }
    }
    
    /**
     * 更新list数据
     * @param {Array<any>} arr 
     * @memberof ScrollList
     */
    public updateListData(arr:Array<any>):void
    {
        if(this._list)
        {
            this._list.array = arr;
        }
    }

    public  get selectedIndex():number
    {
        if(this._list)
            return this._list.selectedIndex;
        return -1;
    }
    
    public  get selectedItem():Object
    {
        if(this._list)
        {
            return this._list.selectedItem;
        }
        return null;
    }
    
    /**
     * 设置list的数据 
     * @param value
     * 
     */
    public set dataProvider(value:Array<any>)
    {
        this._dataProvider = value;
        
        this._list && (this._list.array = value);
        
        if(!this._dataProvider)
        {
            return;
        }

        if(this._direction == 1)
        {
            this._list.spaceX = this._space;
            this._list.repeatX = 5;
        }
        else
        {
            this._list.spaceY = this._space;
            this._list.repeatY = 5;
        }
        
        this._list.tweenTo(0,0);
        this._index=0;
        this._currentPage = 0;
        this.checkBtnVisible();
        
    }
    
    /**
     * 获得当前页 
     * 
     */		
    public get currentPage():number
    {
        return this._currentPage;
    }
    
    public get startIndex():number
    {
        return this._index;
    }
    
    public set nextPageCall($call:Function)
    {
        this._nextPageCall = $call;
    }
    
    public get nextPageCall():Function
    {
        return this._nextPageCall;
    }
    
    /**
     * 获得list  dataProvider
     * @return 
     * 
     */		
    public get dataProvider():Array<any>
    {
        if(this._list.array)
            return this._list.array
        return null;
    }

    /**
     * 删除所有数据 
     * 
     */		
    public removeAll():void
    {
        if(this._list && this._list.array)
        this._list.removeChildren(0,this._list.array.length);
    }

    private checkBtnVisible():void
    {
        if(!this._dataProvider)
        {
            return;
        }
        if(this._direction==1)
        {
            this.boundRightIndex=Math.floor(this.listWidth/this._cellWidth);
            this.list.repeatX = this.boundRightIndex;
        }
        else
        {
            this.boundRightIndex=Math.floor(this.listHeight/this._cellHeight);
            this.list.repeatY = this.boundRightIndex;
        }
        
        this._maxPage =  Math.ceil(this._dataProvider.length/this.boundRightIndex);
        this._maxIndex = this._maxPage;
        this.updateBtnState();
    }

    public get list():Laya.List
    {
        return this._list;
    }
    
    public get maxPage():number
    {
        return this._maxPage;
    }

    /**
     * 翻到某项 
     * @param value
     * 
     */
    public scrollToIndex(value:number):void
    {
        if(value<0)
        {
            value=0;
        }
        this._index = value;
        this._currentPage = value;
        this._list.tweenTo(this._index*this.boundRightIndex,this._scrollDurTime);
        this.updateBtnState();
    }

    /**
     * 前翻 
     * @param e
     * 
     */
    public  onPreBtnDownHandler(e:Event=null):void
    {
        if(this._preBtn.gray)
        {
            return;
        }
        this.scrollToIndex(--this._index);
    }

    private _preOffsetx:number=15;
    private _nextOffsetx:number=15;
    private _preOffsety:number=15;
    private _nextOffsety:number=15;
    
    public setBtnOffset(preOffstx:number,nextOffsetx:number,preOffsty:number=0,nextOffsety:number=0):void
    {
        this._preOffsetx=preOffstx;
        this._nextOffsetx=nextOffsetx;
        this._preOffsety=preOffsty;
        this._nextOffsety=nextOffsety
        this.setBtnPose();
    }

    /**
     * 后翻 
     * @param e
     * 
     */
    public onNextBtnDownHandler(e:Event=null):void
    {
        if(this._nextBtn.gray)
        {
            return;
        }
        this.scrollToIndex(++this._index);
        
    }

    /**
     * list切换选择事件 
     * @param e
     * 
     */
    private onListChangeHandler(e:Event):void
    {
        if(this._listChangeCall != null)
        {
            this._listChangeCall(e);
        }
    }

    /**
     * 设置cell的大小
     * @private
     * @param {*} item 
     * @memberof ScrollList
     */
    private onRenderHandler(item:any):void
    {
        item.size(this._cellWidth,this._cellHeight);
    }

    public setSize(width:number, height:number):void
    {
        super.size(width, height);
        
        if(this._list)
        {
            this._list.size(width, height);
        }
        this.checkBtnVisible();
        this.setBtnPose();
    }
    
    private setBtnPose():void
    {
        if(!this._nextBtn||!this._preBtn)
        {
            return;
        }
        if(this._direction==1)
        {
            this._preBtn.y = Math.ceil((this.height - this._preBtn.height)*0.5)+this._preOffsety;
            this._nextBtn.y = this._preBtn.y;
            this._preBtn.x= this._preBtn.width;
            this._nextBtn.x = this.width - this._nextBtn.width; 
            this.list.x = this._preBtn.x - 1.5;
        }
        else
        {
            this._preBtn.x = (this._cellWidth - (this._preBtn.width + this._preBtn.width/2))*0.5;
            this._nextBtn.x = this._preBtn.x + this._nextBtn.height;
            this._preBtn.y= this._preOffsety;
            this.list.x = 0;
            this.list.y = this._preBtn.y + 5;
            this._nextBtn.y = this.list.y + this.listHeight - (this._nextBtn.height/2) + 10;
        }
    }
    public get listWidth():number
    {
        var num:number;
        if(this._direction==1)
        {
            num = this.width - this._preBtn.width;
        }
        else
        {
            num = this.width;
        }
        return num;
    }
    public get listHeight():number
    {
        var num:number;
        if(this._direction==1)
        {
            num = this.height;
        }
        else
        {
            num = this.height - this._nextBtn.height;
        }
        return num;
    }

    /**
     * 更新按钮状态 
     * 
     */		
    private updateBtnState():void
    {
        var curIndex:number=0;
        curIndex=this._index;
        
        if(curIndex <= 0)
        {
            this._preBtn.gray = true;
            this._preBtn.mouseEnabled = false;
        }
        else
        {
            this._preBtn.gray = false;
            this._preBtn.mouseEnabled = true;
        }
        
        if(curIndex < this._maxPage - 1)
        {
            this._nextBtn.gray = false;
            this._nextBtn.mouseEnabled = true;
        }
        else
        {
            this._nextBtn.gray = true;
            this._nextBtn.mouseEnabled = false;
        }
        
        if(!this._nextBtn.mouseEnabled && !this._preBtn.mouseEnabled)
        {
            this._nextBtn.visible=this._preBtn.visible=false;
        }
        else
        {
            this._nextBtn.visible=this._preBtn.visible=true;
        }
    }

    public dispose():void
    {
        this._preOffsetx=0;
        this._nextOffsetx=0;
        this._dataProvider = null;
        this._listCell = null;
        this._space = 0;
        this._cellWidth=0;
        this._maxIndex = 0;
        this._maxPage = 0;
        this._index = 0;
        this.scrollOffset=0;
        this._currentPage = 0;
        this.boundRightIndex = 0;
        this._scrollDurTime=0.6;
        this._direction=1;
        this._listChangeCall=null
        this._nextPageCall = null;
        if(this._preBtn)
        {
            this._preBtn.removeSelf();
            this._preBtn=null;
        }
        if(this._nextBtn)
        {
            this._nextBtn.removeSelf();
            this._nextBtn=null;
        }
        super.removeSelf();
    }
}