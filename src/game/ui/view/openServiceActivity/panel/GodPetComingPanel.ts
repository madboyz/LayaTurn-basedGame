import { FbVo } from "../../../../../db/sheet/vo/FbVo";
import { SCopyData, SCopyEvent } from "../../../../../net/data/SCopyData";
import { S57003_2 } from "../../../../../net/pt/pt_57";
import { FightMonsterView } from "../../../../battle/role/fight/FightMonsterView";
import { CommonControl } from "../../../../common/control/CommonControl";
import { RewardList } from "../../../compent/RewardList";
import { SOpenServiceActivityData, SOpenServiceActivityEvent, OSActivityType } from "../data/SOpenServiceActivityData";
import { OpenServiceActivityPanel } from "./OpenServiceActivityPanel";
import { FightComateView } from "../../../../battle/role/fight/FightComateView";
import { MsgManager } from "../../../manager/MsgManager";
import { Comate_cfgVo } from "../../../../../db/sheet/vo/Comate_cfgVo";
import { SRoleData } from "../../../../../net/data/SRoleData";
import { GameUtils } from "../../../../utils/GameUtils";
import { TimerUtil } from "../../../../utils/TimerUtil";
import { HtmlUtils } from "../../../../utils/HtmlUtils";

export class GodPetComingPanel extends ui.main.GodPetComingPanelUI {
    private showComateId: number = 9;
    private _rewarldList: RewardList;
    private FightComateObj: FightComateView;

    public cfgs: Array<FbVo>;
    public selectIndex: number = 0;//选中的index；
    private startIndex:number = 0;
    constructor() {
        super();
        this.initEvent();
        this.initComp();
        this.dataBack();
        this.requestInfo();
    }

    private requestInfo(): void {
        CommonControl.instance.send57003(CopyType.OPEN_ACTIVITY);
    }

    private dataBack(): void {
        this.initSelect();
        this.updateData();
    }

    private initEvent(): void {
        SCopyData.instance.on(SCopyEvent.COPY_INFO_BACK, this, this.dataBack);
        SOpenServiceActivityData.instance.on(SOpenServiceActivityEvent.ACTIVITY_DATA_REFRESH, this, this.dataBack);

        this.fightBtn.on(Laya.Event.CLICK, this, this.fightBtnClick);
        this.lookAttrBtn.on(Laya.Event.CLICK, this, this.lookAttrBtnClick);
        this.LeftBtn.on(Laya.Event.CLICK, this, this.LeftBtnClick);
        this.RightBtn.on(Laya.Event.CLICK, this, this.RightBtnClick);
    }

    private removeEvent(): void {
        SCopyData.instance.off(SCopyEvent.COPY_INFO_BACK, this, this.dataBack);
        SOpenServiceActivityData.instance.off(SOpenServiceActivityEvent.ACTIVITY_DATA_REFRESH, this, this.dataBack);

        this.fightBtn.off(Laya.Event.CLICK, this, this.fightBtnClick);
        this.lookAttrBtn.off(Laya.Event.CLICK, this, this.lookAttrBtnClick);
        this.LeftBtn.off(Laya.Event.CLICK, this, this.LeftBtnClick);
        this.RightBtn.off(Laya.Event.CLICK, this, this.RightBtnClick);
    }

    public initComp() {
        this.combat.url = "res/atlas/number/fight.atlas";
        var cfg = Comate_cfgVo.get(this.showComateId);
        this.combat.text = cfg.battle.toString();
        this.lookAttrBtn.underline = true;
        this.initList();
        this.initComateView();
        //list列表
        this.cfgs = FbVo.getListByType(CopyType.OPEN_ACTIVITY);
        //this.pageTotal = this.cfgs.length -3;
    }


    private initComateView() {
        if (this.FightComateObj) {
            return;
        }
        this.FightComateObj = Laya.Pool.getItemByClass("FightComateView", FightComateView);
        this.FightComateObj.interval = GameConfig.GAME_NORMAL_ANIMATION_SPEED;
        this.FightComateObj.x = 100;
        this.FightComateObj.y = 170;
        this.FightComateObj.info = {};
        this.FightComateObj.info.ParentPartnerNo = this.showComateId;
        this.FightComateObj.updateSkin();
        this.FightComateObj.scaleX = this.FightComateObj.scaleY = 1;
        this.roleBox.addChild(this.FightComateObj);
    }

    private initList(): void {
        this._rewarldList = Laya.Pool.getItemByClass("rewarldList", RewardList);
        this._rewarldList.showNameNum = false;
        this._rewarldList.rowCount = 4;
        this._rewarldList.maxNum = 4;
        this._rewarldList.itemStyle = 80;
        this._rewarldList.hGap = 25;
        this._rewarldList.x = 90;
        this._rewarldList.y = 640;
        this.addChild(this._rewarldList);

        this.pageList.itemRender = GodPetComingItem;
    }

    private initSelect(): void {
        //判断现在挑战到了多少
        for (let i = 0; i < this.cfgs.length; i++) {
            var ele = this.cfgs[i];
            var info: S57003_2 = SCopyData.instance.getCopyInfo(ele.no);
            this.selectIndex = i;
            if (!info || info.pass != 1) {
                break;
            }
        }

        var delatCount = this.cfgs.length -this.selectIndex - 1;
        if(delatCount < 4)
        {
            this.startIndex = this.cfgs.length-4;
        }
        else 
        this.startIndex = this.selectIndex;
    }

    public updateData(): void {
        //刷新列表
        this.LeftBtn.gray = this.startIndex <= 0;
        this.RightBtn.gray = this.startIndex >= (this.cfgs.length-4);
        var useCfg = [];
        for (let i = 0; i < 4; i++) {
            var index = this.startIndex +i;
            var ele = this.cfgs[index];
            if (ele) {
                useCfg.push(ele);
            }
        }
        this.pageList.array = useCfg;
        //刷新下方内容
        var showCfg = this.cfgs[this.selectIndex];
        this._rewarldList.updateRewardsByNum(showCfg.final_reward);
        this.timer.clear(this, this.textLoop);
        this.textLoop();
        this.timer.loop(1000, this, this.textLoop);
    }

    private textLoop(): void {
        var data = SOpenServiceActivityData.instance.getActiveData(OSActivityType.GOD_PET);
        if (!data) {
            this.timeCdLb.text = "";
            return;
        }
        var leftTime = data.end_time - GameUtils.TimeStamp;
        if (leftTime < 0) {
            (this.parent as OpenServiceActivityPanel).close();
            return;
        }
        this.timeCdLb.text = TimerUtil.getLeftTimeStr2(leftTime);

    }

    public clickIndex(index: number): void {
        this.selectIndex = index;
        this.updateData();
    }

    private lookAttrBtnClick(): void {
        UIManager.instance.openUI(UIID.GOD_PET_COMING_DETAIL_PANEL);
    }

    private fightBtnClick(): void {
        var showCfg = this.cfgs[this.selectIndex];
        var info: S57003_2 = SCopyData.instance.getCopyInfo(showCfg.no);
        if (!info) {
            MsgManager.instance.showRollTipsMsg("服务端未返回相关数据");
            return;
        } else if (info.state == 4) {
            MsgManager.instance.showRollTipsMsg("需要通过前置关卡");
            return;
        } else if (info.pass == 1) {
            MsgManager.instance.showRollTipsMsg("该关卡已通关");
            return;
        }
        CommonControl.instance.EnterCopy(showCfg.no);
        SCopyData.instance.copyType = CopyType.OPEN_ACTIVITY;
        (this.parent as OpenServiceActivityPanel).close();
        UIManager.instance.closeUI(UIID.SYS_MAIN);
    }

    private LeftBtnClick(): void {
        this.startIndex -= 1;
        this.updateData();
    }

    private RightBtnClick(): void {
        this.startIndex += 1;
        this.updateData();
    }

    public destroy(): void {
        this.timer.clearAll(this);
        this.FightComateObj && this.FightComateObj.dispose();
        this.FightComateObj = null;
        this._rewarldList && this._rewarldList.dispose();
        this._rewarldList = null;
        this.pageList.array = [];
        this.removeEvent();
        super.destroy();
    }
}


//道具的奖励ITEM
export class GodPetComingItem extends ui.main.GodPetComingItemUI {
    private role: FightMonsterView;
    public no: number;
    private _mData: FbVo;
    private _index: number;

    constructor() {
        super();
        this.initRole();
        this.on(Laya.Event.CLICK, this, this.thisClick);
        HtmlUtils.setHtml(this.stageLb.style, 6, 18, "center", "middle");
    }

    private initRole(): void {
        this.role = Laya.Pool.getItemByClass("FightMonsterView", FightMonsterView);
        this.role.changeScale = 0.5;
        this.role.interval = GameConfig.GAME_NORMAL_ANIMATION_SPEED;
        this.roleBox.addChild(this.role);
        this.role.x = 50;
        this.role.y = 85;
    }


    public set dataSource(data: FbVo) {
        if (!data) return;
        this._mData = data;
        this._index = (this.parent.parent.parent as GodPetComingPanel).cfgs.indexOf(this._mData);
        this.updateData();
    }

    private updateData() {
        if (this.role) {
            if (this.role.info == null) {
                this.role.info = {};
            }
            this.role.info.ParentObjId = this._mData.mon_show_no;
            this.role.info.LookIdx = 1;
            this.role.updateSkin();
        }
        this.selectImg.visible = this._index == (this.parent.parent.parent as GodPetComingPanel).selectIndex;
        var stageStr = this._mData.name;
        var info: S57003_2 = SCopyData.instance.getCopyInfo(this._mData.no);
        this.passImg.visible = info && info.pass == 1;

        if (SRoleData.instance.info.Lv < this._mData.lv_limit) {
            var banStr = HtmlUtils.addColor("(" + this._mData.lv_limit + "级)", "#ff0000", 15);
        } else {
            var banStr = "";
        }
        this.stageLb.innerHTML = HtmlUtils.addColor(stageStr, "#8e5213", 15) + banStr;
    }

    private thisClick(): void {
        (this.parent.parent.parent as GodPetComingPanel).clickIndex(this._index);
    }

    public destroy(): void {
        this.role.dispose();
        this.role = null;
        super.destroy()
    }

}