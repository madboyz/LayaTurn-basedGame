import { SCopyData, SCopyEvent } from "../../../../../../net/data/SCopyData";
import { FbVo } from "../../../../../../db/sheet/vo/FbVo";
import { S57019_1 } from "../../../../../../net/pt/pt_57";
import { FightMonsterView } from "../../../../../battle/role/fight/FightMonsterView";
import { Delay } from "../../../../../../framework/utils/Delay";
import { UIeffectLayer } from "../../../../../battle/scene/layer/UIeffectLayer";
import { AwardUtil } from "../../../../../award/AwardUtil";

export class TongtiantaItem extends ui.main.TongtiantaItemUI {
    private role: FightMonsterView;
    public no: number;
    constructor() {
        super();
        this.initRole();
    }

    private initRole(): void {
        this.role = Laya.Pool.getItemByClass("FightMonsterView", FightMonsterView);
        this.role.changeScale = 0.7;
        this.role.interval = GameConfig.GAME_NORMAL_ANIMATION_SPEED;
        this.addChild(this.role);
    }

    private mData: FbVo;

    public set dataSource(data: FbVo) {
        if (!data) return;
        this.mData = data;
        this.updateData();
    }

    private updateData() {
        if (this.role) {
            if (this.role.info == null) {
                this.role.info = {};
            }
            this.role.info.ParentObjId = this.mData.mon_show_no;
            this.role.info.LookIdx = 1;
            this.role.updateSkin();
        }
        this.role.x = 60;
        this.role.y = 122;
        this.stageLb.text = this.mData.name;
        this.layOut(this.mData.no % 2 == 0);
        if (this.mData.no == (SCopyData.instance.tttInfo.cur_floor + 4001)) {
            this.showUIEffect();
            this.doorBase.on(Laya.Event.CLICK, this, this.enterBattle);
        } else {
            if (this._uiEffLayer) {
                this._uiEffLayer.destroy();
                this._uiEffLayer = null;
            }
            this.doorBase.off(Laya.Event.CLICK, this, this.enterBattle);
        }

    }

    private layOut(isLeft: boolean = false) {
        if (isLeft) {
            this.windowImg.x = 406;
            this.doorBase.x = this.stageLb.x = 244;
        } else {
            this.windowImg.x = 271;
            this.doorBase.x = this.stageLb.x = 344;
        }
    }

    private enterBattle(): void {
        SCopyData.instance.copyType = CopyType.TOWER;
        UIManager.instance.openUI(UIID.COM_SHOW_REWARD, [
            AwardUtil.GetNormalGoodsList(FbVo.get(SCopyData.instance.tttInfo.cur_floor + 4001).final_reward),//奖励
            Laya.Handler.create(this, () => { this.parent.parent.parent.parent.event(SCopyEvent.COPY_REQUEST_TTTENTERBATTLE) }) ,//点击确定的方法
            "第"+(SCopyData.instance.tttInfo.cur_floor + 1)+"层",//一级标题
            "通关奖励",//二级标题
            "开始挑战",//确定按钮名字
        ]);


    }

    public get dataSource(): FbVo {
        return this.mData;
    }

    public dispose(): void {
        this.removeSelf();
    }

    //特效
    private _uiEffLayer: UIeffectLayer;
    //进入战斗场景的时候播特效
    public showUIEffect(): void {
        if (!this._uiEffLayer) {
            this._uiEffLayer = new UIeffectLayer;
            this.doorBase.addChild(this._uiEffLayer);
        }
        this._uiEffLayer.playEffect("ui_effect_18", 65, 62, true);
    }


    public removeSelf(): any {
        if (this._uiEffLayer) {
            this._uiEffLayer.destroy();
            this._uiEffLayer = null;
        }
        super.removeSelf();
    }
}