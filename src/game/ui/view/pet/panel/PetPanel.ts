import { SPetData } from "../../../../../net/data/SPetData";
import { RedDotType } from "../../../../redDot/RedDotList";
import { RedDotManager } from "../../../../redDot/RedDotManager";
import { PetInfo } from "../../../compent/data/PetInfo";
import { ScrollList } from "../../../compent/ScrollList";
import { TabBar } from "../../../compent/TabBar";
import { MsgManager } from "../../../manager/MsgManager";
import { PetIcon } from "../item/PetIcon";
import { PetInfoPanel } from "./PetInfoPanel";
import { PetLevelPanel } from "./PetLevelPanel";
import { PetRefinePanel } from "./PetRefinePanel";
import { PetSkillPanel } from "./PetSkillPanel";
import { PetTrainPanel } from "./PetTrainPanel";

export class PetPanel extends ui.main.PetPanelUI {
    private mTab: TabBar;
    public curIndex: number = -1;
    public curretSp: Laya.View;
    private selectVo: any;
    private _petIndex: number = -1;
    protected mItemList: ScrollList;
    constructor() {
        super();
        this.isShowMask = true;
        this.mResouce = [

            { url: "res/atlas/pet.atlas", type: Laya.Loader.ATLAS },
        ];
    }

    public initComp() {
        super.initComp();
        this.combat.url = "res/atlas/number/fight.atlas";
        this.initPetList();
        this.btnList.hScrollBarSkin = "";
        if (!this.mTab) {
            this.mTab = new TabBar([this.btn_0, this.btn_1, this.btn_2, this.btn_3, this.btn_4], [0, UIID.PET_UPGRADE, UIID.PET_XIULIAN, UIID.PET_LIANHUA, UIID.PET_SKILL]);
            this.mTab.on(Laya.Event.CHANGE, this, this.onTabChange);
        }
        this.mTab.select = this.curIndex;
    }

    private initPetList(): void {
        if (this.mItemList == null) {
            this.mItemList = new ScrollList(510, 80, 80, 80, PetIcon, 0.6, 1, this.onChange.bind(this));
            this.mItemList._preBtn.on(Laya.Event.MOUSE_DOWN, this, this.onPreBtnDownHandler);
            this.mItemList._nextBtn.on(Laya.Event.MOUSE_DOWN, this, this.onNextBtnDownHandler);
            this.addChild(this.mItemList);
            this.mItemList.x = (this.width - this.mItemList.width) >> 1;
            this.mItemList.y = 637;
        }
        this.initBtnData();
    }

    public initBtnData(): void {
        this.mItemList.dataProvider = SPetData.instance.allData;
        this.initSelect();
    }

    private initSelect(): void {
        if (this.mItemList.selectedIndex == -1) {
            this.mItemList.selectedIndex = 0;
            this._petIndex = 0;
        }
    }

    public updateListData(): void {
        this.mItemList.dataProvider = SPetData.instance.allData;
        this.updateSelect();
    }

    private updateSelect(): void {
        if (this.selectVo) {
            var index: number;
            if (this.selectVo.active) {
                index = SPetData.instance.getPetIndex(this.selectVo.PartnerId);
            } else {
                index = SPetData.instance.getPetIndex(this.selectVo.vo.no, false);
            }
            if (index != this._petIndex) {
                this.mItemList.selectedIndex = index;
            } else {
                this.mItemList.selectedIndex = this._petIndex;
            }
            this.mItemList.scrollToIndex(Math.floor(this.mItemList.selectedIndex / 5));
        }
    }

    public update(): void {
        this.mTab.select = this.tabIndex;
        this.updateListData();
    }

    public open(...args): void {
        this.initWindow(true, true, "宠物", 550, 750, 35);
        super.open();
        this.update();
        this.updateRed();
    }
    public initEvent(): void {
        this.mTab.on(Laya.Event.CHANGE, this, this.onTabChange);
        this.combat.on(Laya.Event.CHANGE, this, this.updateCombatPos);
        this.btn_look.on(Laya.Event.CLICK, this, this.onLook);
        RedDotManager.instance.on(RedDotType.RDPetInfo, this, this.showPetInfo);
        RedDotManager.instance.on(RedDotType.RDPetLevel, this, this.showLevelRed);
        RedDotManager.instance.on(RedDotType.RDPetTrain, this, this.showTrainRed);
        RedDotManager.instance.on(RedDotType.RDPetRefine, this, this.showRefineRed);
        RedDotManager.instance.on(RedDotType.RDPetSkill, this, this.showSkillRed);
    }
    public removeEvent(): void {
        this.mTab.off(Laya.Event.CHANGE, this, this.onTabChange);
        this.combat.off(Laya.Event.CHANGE, this, this.updateCombatPos);
        this.btn_look.off(Laya.Event.CLICK, this, this.onLook);
        RedDotManager.instance.off(RedDotType.RDPetInfo, this, this.showPetInfo);
        RedDotManager.instance.off(RedDotType.RDPetLevel, this, this.showLevelRed);
        RedDotManager.instance.off(RedDotType.RDPetTrain, this, this.showTrainRed);
        RedDotManager.instance.off(RedDotType.RDPetRefine, this, this.showRefineRed);
        RedDotManager.instance.off(RedDotType.RDPetSkill, this, this.showSkillRed);
    }

    public updateRed(): void {
        this.showPetInfo(RedDotManager.instance.GetRD(RedDotType.RDPetInfo)._isActiveSave);//
        this.showLevelRed(RedDotManager.instance.GetRD(RedDotType.RDPetLevel)._isActiveSave);//
        this.showTrainRed(RedDotManager.instance.GetRD(RedDotType.RDPetTrain)._isActiveSave);//
        this.showRefineRed(RedDotManager.instance.GetRD(RedDotType.RDPetRefine)._isActiveSave);//
        this.showSkillRed(RedDotManager.instance.GetRD(RedDotType.RDPetSkill)._isActiveSave);//
    }

    public showPetInfo(show: boolean = false): void {
        this.btn_0.refreshRed(show);
    }

    public showLevelRed(show: boolean = false): void {
        this.btn_1.refreshRed(show);
    }

    public showTrainRed(show: boolean = false): void {
        this.btn_2.refreshRed(show);
    }

    public showRefineRed(show: boolean = false): void {
        this.btn_3.refreshRed(show);
    }

    public showSkillRed(show: boolean = false): void {
        this.btn_4.refreshRed(show);
    }

    public updateCost(): void {
        this.curretSp && this.curretSp["updateCost"]();
    }

    private onLook(): void {
        UIManager.instance.openUI(UIID.SYS_LOOKPROP, [this.selectVo]);
    }

    public onChange(): void {
        this.selectVo = this.mItemList.selectedItem as PetInfo;
        if (this.selectVo) {
            this.sp_combat.visible = this.selectVo.active;
            if (this.curIndex > 0) {
                if (this.selectVo.active == false) {
                    MsgManager.instance.showRollTipsMsg("宠物尚未激活!");
                    this.mItemList.selectedIndex = this._petIndex;
                    return;
                }
            }
            SPetData.instance.curInfo = this.selectVo;
            this._petIndex = this.mItemList.selectedIndex;
            this.curretSp && this.curretSp["updatePetInfo"](this.selectVo);
            this.checkSelect();
        }
    }

    private checkSelect(): void {
        Laya.timer.once(100, this, function (): void {
            var i: number = 0, cells: Array<any> = this.mItemList.list.cells, len: number = cells.length, cell: any;
            for (i; i < len; i++) {
                cell = cells[i];
                cell && cell.checkSelect(this.selectVo);
            }
        });
    }

    private onTabChange(index: number, btn: Laya.Button) {
        if (this.curIndex != index) {
            this.curIndex = index;
            if (index != 0 && this.selectVo && !this.selectVo.active) {
                this._petIndex = 0;
                this.mItemList.selectedIndex = 0;
            }
            if (this.curretSp) {
                this.curretSp.removeSelf();
                this.curretSp = null;
            }
        }
        if (this.curretSp == null) {
            this.curretSp = this.getPanelByIndex(this.curIndex);
        }
        this.selectVo && this.curretSp["updatePetInfo"](this.selectVo);
        this.mItemList.scrollToIndex(Math.floor(this.mItemList.selectedIndex / 5));
        this.checkSelect();
    }

    //面板已经打开的情况下，设置新的属性，刷新面板
    public onUpdatePanelSelect(selectVo:PetInfo):void{
        if(this.curIndex != 0){
            return;
        }
        this.selectVo = selectVo;
        this.updateSelect();
    }

    /**
     * 前翻 
     * @param e
     * 
     */
    private onPreBtnDownHandler(e: Event = null): void {
        this.checkSelect();
    }

    /**
     * 后翻 
     * @param e
     * 
     */
    private onNextBtnDownHandler(e: Event = null): void {
        this.checkSelect();
    }

    private getPanelByIndex(index: number): Laya.View {
        var title: string = "宠物";
        if (index == 0) {
            this.curretSp = new PetInfoPanel();//人物信息
            title = "宠物总览";
        } else if (index == 1) {
            this.curretSp = new PetLevelPanel();//升级
            title = "宠物升级";
        } else if (index == 2) {
            title = "宠物修炼";
            this.curretSp = new PetTrainPanel();//修炼
        } else if (index == 3) {
            title = "宠物炼化";
            this.curretSp = new PetRefinePanel();//炼化
        } else if (index == 4) {
            title = "宠物技能";
            this.curretSp = new PetSkillPanel();//技能
        }
        this.curretSp && this.addChildAt(this.curretSp, 2);
        this.curretSp && this.curretSp["initComp"]();
        this.Title = title;
        return this.curretSp;
    }

    public updateCombat(value: number): void {
        this.combat.text = value.toString();
    }

    public updateCombatPos(y: number = 124, bl: boolean = true): void {
        var w: number = 406;
        var txtW: number = this.combat.w + this.world.width + 8;
        this.combatSp.x = (w - txtW) * 0.5;
        this.sp_combat.y = y;
        this.sp_combat.visible = bl;
    }

    public updatePetInfo(): void {
        if (this.curIndex != 4) {
            this.curretSp && this.curretSp["updateData"]();
        }
        else {
            this.updateSkillData();
        }
    }

    public updateRefine(): void {
        this.curretSp && this.curretSp["onUpdateRefine"]();
    }

    public updateTrain(): void {
        this.curretSp && this.curretSp["onUpdateRefine"]();
    }

    public updateSkillData(): void {
        if (this.curIndex == 4) {
            this.curretSp && this.curretSp["updateSkillList"]();
        }
    }

    public close(): void {
        this.curIndex = -1;
        this.mTab.select = this.curIndex;
        this.curretSp && this.curretSp.removeSelf();
        this.curretSp = null;
        this.mItemList.selectedIndex = 0;
        super.close();
    }
}