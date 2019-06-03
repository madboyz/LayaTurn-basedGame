import { ChargeVo } from "../../../../../db/sheet/vo/ChargeVo";
import { SdkManager } from "../../../../../net/SdkManager";
import { SkillItem1 } from "../../skill/item/SkillItem1";
import { FightComateView } from "../../../../battle/role/fight/FightComateView";
import { Comate_cfgVo } from "../../../../../db/sheet/vo/Comate_cfgVo";
import { Skill } from "../../../../skill/Skill";
import { Comate_starVo } from "../../../../../db/sheet/vo/Comate_starVo";
import { PetSkillItem } from "../../pet/item/PetSkillItem";
import { SkillVo } from "../../../../../db/sheet/vo/SkillVo";

export class GodPetComingDetailPanel extends ui.main.GodPetComingDetailPanelUI {
    private showComateId:number = 9;
    private skillSprites: PetSkillItem[] = [];
    private FightComateObj: FightComateView;

    constructor() {
        super();
        this.layer = UILEVEL.POP_3;
        this.isShowMask = true;
        this.mResouce = [

        ];
    }

    public initEvent(): void {
        this.close_btn.on(Laya.Event.CLICK, this, this.close);
    }

    public removeEvent(): void {
        this.close_btn.off(Laya.Event.CLICK, this, this.close);
    }

    public initComp() {
        super.initComp();
        this.combat.url = "res/atlas/number/fight.atlas";
        for (let i = 0; i < 3; i++) {
            var item: PetSkillItem = new PetSkillItem();
            item.setItemStyle(80);
            this.skillBox.addChild(item);
            var x = i * 110;
            var y = 10;
            item.x = x;
            item.y = y;
            this.skillSprites.push(item);
        }
    }

    private initComateView() {
        if(this.FightComateObj){
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

    public open(...args): void {
        this.initWindow(true, false, "充值", 480, 788, 0);
        super.open();
        this.initComateView();
        this.update();
    }

    public update(): void {
        var cfg = Comate_cfgVo.get(this.showComateId);
        for (let i = 0; i < 3; i++) {
            if (i == 0) {
                var skillId = cfg.skills[0];
            } else if (i == 1 || i == 2) {
                var skillcfg = Comate_starVo.getComateSkillByIndex(this.showComateId, i);
                var skillId = skillcfg.skill;
            }
            // var skill:Skill = new Skill(skillId);
            this.skillSprites[i].info = SkillVo.get(skillId);
            this.skillSprites[i].toolTipData = SkillVo.get(skillId);
        }
        this.combat.text = cfg.battle.toString();
        this.petName.text = cfg.name;
    }

    public close(): void {
        if (this.FightComateObj) {
            this.FightComateObj.dispose();
            this.FightComateObj = null;
        }
        super.close();
    }
}

// //道具的奖励ITEM
// export class RechargeItem extends ui.main.RechargeItemUI {
//     constructor() {
//         super();
//         this.on(Laya.Event.CLICK, this, this.thisClick)
//     }

//     private _mdata: ChargeVo;
//     public set dataSource(data: ChargeVo) {
//         if (!data) {
//             return;
//         }
//         this._mdata = data;
//         var index = (this.parent.parent.parent as RechargePanel).cfgs.indexOf(this._mdata);
//         this.goldLb.text = this._mdata.yuanbao;
//         this.moneyLb.text = this._mdata.money + "元";
//         this.goldImg.skin = "recharge/img_gold_" + (index >= 3 ? 4 : (index + 1)) + ".png";
//         //有无双倍奖励
//         this.doubleBox.visible = !SRechargeData.instance.checkHaveRecharge(this._mdata.no);
//     }

//     public thisClick(): void {
//         SdkManager.instance.Pay(this._mdata.no);
//     }

// }