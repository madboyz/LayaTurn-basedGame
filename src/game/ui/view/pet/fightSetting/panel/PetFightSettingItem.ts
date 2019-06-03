import { PetItem } from "../../item/PetItem";

export class PetFightSettingItem extends PetItem {
    private _btn:component.ScaleButton;
    private _slot:number;
    constructor() {
        super();
    }

    public initComp():void
    {
        super.initComp();
        this.addBtn();
        this.isShowToolTip = false;
    }

    private addBtn():void
    {
        this._btn = new component.ScaleButton();
        this._btn.skin = ResUtils.getCompUIUrl("btn_bg2");
        this._btn.stateNum=1;
        this._btn.labelSize=25;
        this._btn.labelColors="#04681c";
        this._btn.sizeGrid="15,39,0,39";
        this.addChild(this._btn);
        this._btn.width = 84;
        this._btn.height = 44;
        this._btn.pivotX=42;
        this._btn.pivotY=22;
        this._btn.y = 101;
        this._btn.x = 42;
    }

    public set lable(value:string)
    {
        this._btn.label = value;
    }

    public set slot(value:number)
    {
        this._slot = value;
    }

    public get slot():number
    {
        return this._slot;
    }

    public dispose():void
    {
        super.dispose();
    }
}