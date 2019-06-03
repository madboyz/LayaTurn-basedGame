import { PetFightSettingItem } from "./PetFightSettingItem";
import { PetInfo } from "../../../../compent/data/PetInfo";
import { SPetData } from "../../../../../../net/data/SPetData";
import { MsgManager } from "../../../../manager/MsgManager";
import { SGameData } from "../../../../../../net/data/SGameData";

export class PetFightSettingPanel extends ui.main.PetFightSettingUI {
    private fightItems:Array<PetFightSettingItem> = [];
    private noti: Notice = new Notice();//用来通知controll的
    private vo:PetInfo;
    constructor() {
        super();
        this.layer = UILEVEL.POP_3;
        this.isShowMask = true;
        this.mResouce = [
            
        ];
    }

    public initComp():void
    {
        super.initComp();
        this.initFightItems();
        this.updateFightList();
    }

    private updateFightList():void
    {
        var arr:Array<PetInfo> = SPetData.instance.fightList;
        this._fightList = SPetData.instance.fightList.concat();
        for (let index = 0; index < this.fightItems.length; index++) {
            var element = this.fightItems[index];
            if(arr[index])
            {
                element.info = arr[index];
                if(element.info && element.info.PartnerId == this.vo.PartnerId)
                {
                    this.oldPos = index; 
                }
            }
            else
            {
                if(element.info)
                {
                    element.info = null;
                }
            }
        }
    }

    private initFightItems():void
    {
        var item:PetFightSettingItem;
        for (let index = 0; index < 5; index++) {
            item = new PetFightSettingItem();
            item.setItemStyle(80);
            this.addChild(item);
            item.x = 118 +  (index%3)*131;
            item.y = 238 +  Math.floor((index/3))*139;
            item.slot = index;
            if(index == 0)
            {
                item.lable = "出战";
            }
            else
            {
                item.lable = "备战";
            }
            this.fightItems.push(item);
            item.on(Laya.Event.CLICK,this,this.onChangePet,[index,item]);
        }
    }

    public update():void
    {
        this.updateFightList();
    }

    public open(...args): void {
        this.vo = args[0];
        this.initWindow(true,true,"出战配置",486,522,165);
        super.open();
    }

    public initEvent():void 
    {
        this.btn_sure.on(Laya.Event.CLICK,this,this.onSure);
    }
    public removeEvent():void
    {
        this.btn_sure.off(Laya.Event.CLICK,this,this.onSure);
    }

    private oldPos:number = -1;
    private changePosData(pos:number,item:PetFightSettingItem):void
    {
        if(this.oldPos == 0 && item.info == null)
        {
            MsgManager.instance.showRollTipsMsg("主宠不能切换到空白位置");
            return;
        }
        if(this.oldPos >= 0)
        {
            if(item.info)
            {
                this.fightItems[this.oldPos].info = item.info;
            }
            else
            {
                this.fightItems[this.oldPos].info = null;
            }
        }
        this.fightItems[pos].info = this.vo;
        item.info = this.vo;
        this.oldPos = pos;
    }

    private onChangePet(pos:number,item:PetFightSettingItem):void
    {
        this.changePosData(pos,item);
        this.pushFightList(pos,this.vo);
    }

    private _fightList:Array<PetInfo>;
    /**
     * 放入战斗列表
     * @param {number} pos
     * @param {PetInfo} info
     * @memberof SPetData
     */
    public pushFightList(pos:number,info:PetInfo):void
    {
        var index:number = this.checkIsInFightList(info.PartnerId);
        if(index > -1)
        {
            this._fightList[index] = this._fightList[pos];
        }
        this._fightList[pos] = info;
    }

    private checkIsInFightList(id:number):number
    {
        for (let index = 0; index < this._fightList.length; index++) {
            const element = this._fightList[index];
            if(element && element.PartnerId == id)
            {
                return index;
            }
        }
        return -1;
    }

    private onSure():void
    {
        // if(SGameData.instance.PLAYFIGHTREPORT)
        // {
        //     MsgManager.instance.showRollTipsMsg("战斗中不能设置出战");
        //     return;
        // }
        this.updateFightState();
        this.noti.send(NotityData.create(NotityEvents.PET_SETTING_FIGHT,true));
        this.close();
    }

    private updateFightState():void
    {
        SPetData.instance.updateFightList(this._fightList);
    }

    private clearData():void
    {
        for (let index = 0; index < this.fightItems.length; index++) {
            var element = this.fightItems[index];
            if(element.info)
            {
                element.info = null;
            }
        }
    }

    public close(): void {
        this.oldPos = -1;
        this.vo = null;
        this.clearData();
        super.close();
    }
}