import { BaseItem } from "../../../compent/BaseItem";
import { MsgManager } from "../../../manager/MsgManager";

export class PetEquipItem extends BaseItem{
    public _type:number;
    constructor() {
        super();
        // this.on(Laya.Event.CLICK,this,this.onClickHandler);
    }

    public set type(value:number)
    {
        this._type = value;
        this.bgName = "pet/pet_equip_type_" + value + ".png";
    }
    public get type():number
    {
        return this._type;
    }

    public updateViewSize():void
    {
        super.updateViewSize();
    }

    private onClickHandler():void
    {
    }

    public dispose():void
    {
        this._type = -1;
        //this.off(Laya.Event.CLICK,this,this.onClickHandler);
        super.dispose();
    }

        /**
     * 清除数据
     */
    public clearData() {
        super.clearData();
        //清楚数据的时候，会吧道具重新设置成默认的，所以重新设置一下
        this.bgName = "pet/pet_equip_type_" + this._type + ".png";
    }
}