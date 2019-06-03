import { RewardList } from "../../../../compent/RewardList";
import { Chapter_dunVo } from "../../../../../../db/sheet/vo/Chapter_dunVo";
import { C17046, C17047, S17047 } from "../../../../../../net/pt/pt_17";
import { SocketManager } from "../../../../../../net/SocketManager";
import { DataManager } from "../../../../../../message/manager/DataManager";
import { ItemData } from "../../../../compent/data/ItemData";
import { SGameData } from "../../../../../../net/data/SGameData";
import { MsgManager } from "../../../../manager/MsgManager";
import { PetInfo } from "../../../../compent/data/PetInfo";
import { HtmlUtils } from "../../../../../utils/HtmlUtils";
import { ConstVo } from "../../../../../../db/sheet/vo/ConstVo";

export class PetRelivePanel extends ui.main.PetRelivePanelUI {
    private _rewarldList:RewardList;
    private petInfo:PetInfo;
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

        var cfgCost = ConstVo.get("GAME_PAR_REBIRTH_COST").val;
        var newData: ItemData = new ItemData(cfgCost[0]);
        this.tipsLb.innerHTML = HtmlUtils.addColor("宠物重生需消耗","#00b007",24) + 
            HtmlUtils.addImage("art/item/" + newData.clientInfo.icon.replace(".png", ""), 30, 30) +
            HtmlUtils.addColor(cfgCost[1] + "，宠物将重置为", "#00b007", 24) +
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

    private onS17047(data:S17047):void
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
        this.initWindow(true,true,"宠物重生",484,522,180);
        this.petInfo = args[0]
        this.parterId = this.petInfo.PartnerId;
        super.open();
    }

    public initEvent():void 
    {
        this.btn_sure.on(Laya.Event.CLICK,this,this.onRelive);
        this.btn_cancel.on(Laya.Event.CLICK,this,this.close);
        DataManager.listen(PROTOCOL.E17047, this, this.onS17047);//宠物重生预览
    }
    public removeEvent():void
    {
        this.btn_sure.off(Laya.Event.CLICK,this,this.onRelive);
        this.btn_cancel.off(Laya.Event.CLICK,this,this.close);
        DataManager.cancel(PROTOCOL.E17047, this, this.onS17047);//宠物重生预览
    }

    private onRelive():void
    {
        var isInFight = this.petInfo && (this.petInfo.Position == 1 ||this.petInfo.Order >= 1);
        if(SGameData.instance.PLAYFIGHTREPORT == false || !isInFight)
        {
            var msg:C17046 = new C17046();
            msg.PartnerId = this.parterId;
            SocketManager.instance.send(msg);
            this.close();
        }
        else
        {
            MsgManager.instance.showRollTipsMsg("该宠物正在战斗中，不允许重生！");
        }
    }

    private onrequest():void
    {
        var msg:C17047 = new C17047();
        msg.PartnerId = this.parterId;
        SocketManager.instance.send(msg);
    }

    public close(): void {
        this._rewarldList.dispose();
        super.close();
    }
}