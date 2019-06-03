import { ConstVo } from "../../../../../../db/sheet/vo/ConstVo";
import { DataManager } from "../../../../../../message/manager/DataManager";
import { SGameData } from "../../../../../../net/data/SGameData";
import { C37017, C37018, S37018 } from "../../../../../../net/pt/pt_37";
import { SocketManager } from "../../../../../../net/SocketManager";
import { HtmlUtils } from "../../../../../utils/HtmlUtils";
import { ItemData } from "../../../../compent/data/ItemData";
import { RewardList } from "../../../../compent/RewardList";
import { MsgManager } from "../../../../manager/MsgManager";
import { ComateInfo } from "../../../comate/data/ComateInfo";

export class ComateRelivePanel extends ui.main.PetRelivePanelUI {
    private _rewarldList:RewardList;
    private comateInfo:ComateInfo;
    private parterId:number;
    constructor() {
        super();
        this.layer = UILEVEL.POP_3;
        this.isShowMask = true;
        this.mResouce = [
            
        ];
    }

    public initComp() {
        super.initComp();
        this.initList();
        this.updateData();

        var cfgCost = ConstVo.get("GAME_COMRADE_REBIRTH_COST").val;
        var newData: ItemData = new ItemData(cfgCost[0]);
        this.tipsLb.innerHTML = HtmlUtils.addColor("伙伴重生需消耗","#00b007",24) + 
            HtmlUtils.addImage("art/item/" + newData.clientInfo.icon.replace(".png", ""), 30, 30) +
            HtmlUtils.addColor(cfgCost[1] + "，伙伴将重置为", "#00b007", 24) +
            HtmlUtils.addColor("1级","#ff0000",24) + 
            HtmlUtils.addColor("并返还以下资源（保留已学会的技能）","#00b007",24);
    }

    private initList():void
    {
        this._rewarldList = Laya.Pool.getItemByClass("rewarldList",RewardList);
        this._rewarldList.showNameNum = false;
        this._rewarldList.rowCount = 4;
        this._rewarldList.hGap = 20;
        this._rewarldList.vGap = 15;
        this._rewarldList.itemStyle = 80;
        this._rewarldList.x = 96;
        this._rewarldList.y = 308;
        this.addChild(this._rewarldList);
    }

    public update():void
    {
        this.updateData();
    }

    public updateData():void
    {
        this.onrequest();
    }

    private onS37018(data:S37018):void
    {
        var itemdata:ItemData;
        var arr:Array<ItemData> = [];
        for (let index = 0; index < data.item_1.length; index++) {
            var element = data.item_1[index];
            itemdata = new ItemData(element);
            itemdata.Count = element.Count;
            arr.push(itemdata);
        }
        this._rewarldList.updateRewards(arr);
    }

    public open(...args): void {
        this.initWindow(true,true,"伙伴重生",484,522,180);
        this.comateInfo = args[0]
        this.parterId = this.comateInfo.Id;
        super.open();
    }

    public initEvent():void 
    {
        this.btn_sure.on(Laya.Event.CLICK,this,this.onRelive);
        this.btn_cancel.on(Laya.Event.CLICK,this,this.close);
        DataManager.listen(PROTOCOL.E37018, this, this.onS37018);//宠物重生预览
    }
    public removeEvent():void
    {
        this.btn_sure.off(Laya.Event.CLICK,this,this.onRelive);
        this.btn_cancel.off(Laya.Event.CLICK,this,this.close);
        DataManager.cancel(PROTOCOL.E37018, this, this.onS37018);//宠物重生预览
    }

    private onRelive():void
    {
        var isInFight = this.comateInfo && (this.comateInfo.Pos == 1);
        if(SGameData.instance.PLAYFIGHTREPORT == false || !isInFight)
        {
            var msg:C37017 = new C37017();
            msg.Id = this.parterId;
            SocketManager.instance.send(msg);
            this.close();
        }
        else
        {
            MsgManager.instance.showRollTipsMsg("该伙伴正在出战中，不允许重生！");
        }
    }

    private onrequest():void
    {
        var msg:C37018 = new C37018();
        msg.Id = this.parterId;
        SocketManager.instance.send(msg);
    }

    public close(): void {
        this._rewarldList.dispose();
        super.close();
    }
}