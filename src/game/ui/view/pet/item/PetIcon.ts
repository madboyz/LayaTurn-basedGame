import { PetItem } from "./PetItem";
import { PetInfo } from "../../../compent/data/PetInfo";

export class PetIcon extends Laya.View {
    private icon:PetItem;
    public _selectBg:Laya.Image;
    constructor() {
        super();
        this.init();
    }

    init():void
    {
        this.icon = new PetItem();
        this.icon.isShowTag = true;
        this.icon.setItemStyle(80);
        this.addChild(this.icon);
        this.size(80,80);
    }

    private mData:PetInfo;

    public set dataSource(data:PetInfo)
    {
        if(!data) return;
        this.mData = data;
        this.icon.info = data;
        var needRed = false;
        if(this.icon.isShowTag)
        {
            if(data.active)
            {
                this.icon.gray = false;
            }
            else
            {
                this.icon.gray = true;
                needRed = data.canActive;
            }
        }
        this.showRed(needRed);
    }

    public checkSelect(data:any):void
    {
        if(this.mData && data)
        {
            if(this.mData.vo.name == data.vo.name)
            {
                this.isSelect = true;
            }
            else
            {
                this.isSelect = false;
            }
        }
    }

    public set isSelect(value:Boolean)
    {
        this.icon.isSelect = value;
        // if(value)
        // {
        //     if(this._selectBg == null)
        //     {
        //         this._selectBg = new Laya.Image();
        //         this._selectBg.sizeGrid = "35,35,35,35";
        //         this._selectBg.skin = ResUtils.getItemBase("img_select");//选中
        //         this._selectBg.width = this.width + 8;
        //         this._selectBg.height = this.height + 10;
        //         this.addChild(this._selectBg);
        //         this._selectBg.x = -4;
        //         this._selectBg.y = -4;
        //     }
        // }
        // else
        // {
        //     if(this._selectBg)
        //     {
        //         this._selectBg.removeSelf();
        //         this._selectBg = null;
        //     }
        // }
    }

    private _redImg:Laya.Image;
    public showRed(show:boolean = false):void{
        if(show){
            if(!this._redImg) {
                this._redImg = new Laya.Image();
                this._redImg.skin = ResUtils.getCompUIUrl("img_red");
                this._redImg.x = this.width - this._redImg.width + 8;
                this._redImg.y = -8;
                this.addChild(this._redImg);
            }
        }else{
            if(this._redImg){
                this._redImg.removeSelf();
                this._redImg = null;
            }
        }
    }


    /**
     * 置灰 直接用gray会对性能有影响
     * @memberof ScaleButton
     */
    public set gray(value:boolean)
    {
        if(value)
        {
            this.createGrayFilter();
        }
        else
        {
            this.filters = [];
        }
    }

    private createGrayFilter():void{
        var colorMatrix:any = 
            [
                0.3086, 0.6094, 0.0820, 0, 0,  //R
                0.3086, 0.6094, 0.0820, 0, 0, //G
                0.3086, 0.6094, 0.0820, 0, 0,  //B
                0, 0, 0, 1, 0, //A
            ];
        var GrayFilter:Laya.ColorFilter = new Laya.ColorFilter(colorMatrix);
        this.filters = [GrayFilter];
    }

    public get dataSource():PetInfo
    {
        return this.mData;
    }
}