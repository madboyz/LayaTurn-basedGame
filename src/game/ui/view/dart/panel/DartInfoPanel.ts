import { RewardList } from "../../../compent/RewardList";
import { SDartData } from "../../../../dart/data/SDartData";
import { ConstVo } from "../../../../../db/sheet/vo/ConstVo";
import { AwardUtil } from "../../../../award/AwardUtil";
import { ItemData } from "../../../compent/data/ItemData";
import { HtmlUtils } from "../../../../utils/HtmlUtils";
import { SRoleData } from "../../../../../net/data/SRoleData";
import { SBagData } from "../../../../../net/data/SBagData";
import { MsgManager } from "../../../manager/MsgManager";
import { SGameData } from "../../../../../net/data/SGameData";

export class DartInfoPanel extends ui.main.DartInfoPanelUI {
    private rewarldList: RewardList;
    private rewardLevel:Laya.Dictionary = new Laya.Dictionary();//常量押镖奖励
    private refreshCost:ItemData;
    private maxCost:ItemData;
    private canOneKey = true;
    private canRefresh = true;
    private starsImg = [];
    public otherRole:any = null;
    constructor() {
        super();
        this.layer = UILEVEL.POP_3;
        this.mResouce = [

        ];
    }

    public initComp() {
        super.initComp();
        this.rewarldList = Laya.Pool.getItemByClass("rewarldList", RewardList);
        this.rewarldList.showNameNum = false;
        this.rewarldList.rowCount = 4;
        this.rewarldList.maxNum = 4;
        this.rewarldList.x = 123;
        this.rewarldList.y = 379;
        this.addChild(this.rewarldList);
        var vos:Array<any> = ConstVo.get("ESCORT_REWARDS").val;
        for (let index = 0; index < vos.length; index++) {
            var element = vos[index];
            this.rewardLevel.set(element[0],element[1]);
        }
        var refreshvo:ConstVo = ConstVo.get("ESCORT_REFRESH_STAR_COSTS").val;
        var goodsId = refreshvo[0][0];
        var num = refreshvo[0][1];
        this.refreshCost = new ItemData(goodsId);
        this.refreshCost.Count = num;
        var maxhvo:ConstVo = ConstVo.get("ESCORT_FULL_STAR_COSTS").val;
        goodsId = maxhvo[0][0];
        num = maxhvo[0][1];
        this.maxCost = new ItemData(goodsId);
        this.maxCost.Count = num;
        HtmlUtils.setHtml(this.oneKeyText.style,6,20,"center","middle");
        HtmlUtils.setHtml(this.refreshText.style,6,20,"center","middle");
        for (let i = 0; i < 5; i++) {
            const img:Laya.Image = this.StarBox._childs[i];
            img.gray = true;
            this.starsImg.push(img);
        }
    }

    public open(...args): void {
        var isHiJack = args[0];
        this.initWindow(true, true, "", 500, 360, 220);
        super.open();
        if(isHiJack)
        {
            this.otherRole = args[1];
            this.OneKeyMaxBtn.visible = false;
            this.RefreshBtn.visible = false;
            this.StartDartBtn.visible = false;
            this.HiJackBtn.visible = true;
            this.DesText.text = "劫镖奖励";
            this.refreshText.innerHTML = "";
            this.oneKeyText.innerHTML = "";
            if(this.otherRole)
            {
                this.Title = `${this.otherRole.role_name}的镖车`;
                this.refreshStar(this.otherRole.truck_lv);
                this.onUpdateDart(this.otherRole.truck_lv,this.otherRole.cur_hijack+1);
            }
            else
            {
                this.Title = "未知镖车";
            }
            
        }
        else
        {
            this.otherRole = null;
            this.Title = "刷新镖车";
            this.OneKeyMaxBtn.visible = true;
            this.RefreshBtn.visible = true;
            this.StartDartBtn.visible = true;
            this.HiJackBtn.visible = false;
            this.DesText.text = "押镖奖励";
            this.refreshMoneyCost();
            this.refreshStar(SDartData.instance.MyDartInfo.cur_trunk);
            this.onUpdateDart(SDartData.instance.MyDartInfo.cur_trunk,0);
        }
    }

    public refreshStar(lv:number)
    {
        for (let i = 0; i < 5; i++) {
            const img:Laya.Image = this.starsImg[i];
            if(i<lv)
            {
                img.gray = false;
            }
            else
            {
                img.gray = true;
            }
        }
    }

    public refreshMoneyCost()
    {
        var moneyCount = SRoleData.instance.getMoneyByType(this.refreshCost.GoodsNo);
        var iconStr =  HtmlUtils.addImage("art/item/" + this.refreshCost.clientInfo.icon.replace(".png", ""));
        if(moneyCount >= this.refreshCost.Count)
        {
            this.canRefresh = true;
            this.refreshText.innerHTML = iconStr + HtmlUtils.addColor(`x${this.refreshCost.Count}`, "#8e5213", 20);
        }
        else
        {
            this.canRefresh = false;
            this.refreshText.innerHTML = iconStr + HtmlUtils.addColor(`x${this.refreshCost.Count}`, "#ff0000", 20);
        }

        moneyCount = SRoleData.instance.getMoneyByType(this.maxCost.GoodsNo);
        iconStr =  HtmlUtils.addImage("art/item/" + this.maxCost.clientInfo.icon.replace(".png", ""));
        if(moneyCount >= this.maxCost.Count)
        {
            this.canOneKey = true;
            this.oneKeyText.innerHTML = iconStr + HtmlUtils.addColor(`x${this.maxCost.Count}`, "#8e5213", 20);
        }
        else
        {
            this.canOneKey = false;
            this.oneKeyText.innerHTML = iconStr + HtmlUtils.addColor(`x${this.maxCost.Count}`, "#ff0000", 20);
        }

    }

    public initEvent(): void {
        this.OneKeyMaxBtn.on(Laya.Event.CLICK,this,this.onClickOneKeyMaxBtn);
        this.RefreshBtn.on(Laya.Event.CLICK,this,this.onClickRefreshBtn);
        this.StartDartBtn.on(Laya.Event.CLICK,this,this.onClickStartDartBtn);
        this.HiJackBtn.on(Laya.Event.CLICK,this,this.onClickHiJackBtn);
    }

    public removeEvent(): void {
        
        this.OneKeyMaxBtn.off(Laya.Event.CLICK,this,this.onClickOneKeyMaxBtn);
        this.RefreshBtn.off(Laya.Event.CLICK,this,this.onClickRefreshBtn);
        this.StartDartBtn.off(Laya.Event.CLICK,this,this.onClickStartDartBtn);
        this.HiJackBtn.off(Laya.Event.CLICK,this,this.onClickHiJackBtn);
    }

    private onClickOneKeyMaxBtn() {
        if(!this.canOneKey)
        {
            var nameStr = SRoleData.instance.getMoneyStrByType(this.maxCost.GoodsNo);
            MsgManager.instance.showRollTipsMsg(`${nameStr}不足！`);
        }
        SDartData.instance.protocol.send42009();
    }

    private onClickRefreshBtn() {
        if(!this.canRefresh)
        {
            var nameStr = SRoleData.instance.getMoneyStrByType(this.refreshCost.GoodsNo);
            MsgManager.instance.showRollTipsMsg(`${nameStr}不足！`);
        }
        SDartData.instance.protocol.send42008();
    }

    private onClickStartDartBtn() {
        SDartData.instance.protocol.send42006();
        UIManager.instance.closeUI(this.index);
    }

    private onClickHiJackBtn() {
        if(SGameData.instance.PLAYFIGHTREPORT)
        {
            MsgManager.instance.showRollTipsMsg("战斗中无法进行该操作!");
            return;
        }
        if(this.otherRole.cur_hijack >= this.otherRole.max_hijack)
        {
            MsgManager.instance.showRollTipsMsg("大侠请放过他吧，都快弹尽粮绝了!");
            return;
        }
        if(!this.otherRole)return;
        SDartData.instance.protocol.send42010(this.otherRole.role_id);
        UIManager.instance.closeUI(this.index);
    }

    public onUpdateDart(lv:number,beHiJack:number)
    {
        var rewardId = this.rewardLevel.get(lv);
        if(!rewardId)return;
        var goodsList = AwardUtil.GetNormalGoodsList(rewardId);
            var finalList = [];
            for (let i = 0; i < goodsList.length; i++) {
                const item = goodsList[i];
                /**
                 * 2019/02/23 孝鹏要求如果获得数量小于=0就不显示
                 */
                var num = SDartData.instance.GetReawardNum(item.Count,beHiJack);
                if(num > 0)
                {
                    item.Count = num;
                    finalList.push(item);
                }
            }
            this.rewarldList.updateRewards(finalList);
    }

    public close(): void {
        super.close();
    }
}