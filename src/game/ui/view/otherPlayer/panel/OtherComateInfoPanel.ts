import { FightComateView } from "../../../../battle/role/fight/FightComateView";
import { PropertyEnumCode } from "../../../../property/RoleProperty";
import { ComateInfo } from "../../comate/data/ComateInfo";
import { ComateSkillItem } from "../../comate/panel/ComateSkillItem";
import { OtherComateEquipPart } from "../comp/OtherComateEquipPart";

export class OtherComateInfoPanel extends ui.main.OtherComateInfoPanelUI {
    private selectVo: ComateInfo;
    constructor() {
        super();
        this.layer = UILEVEL.POP_3;
        this.mResouce = [
            { url: "res/atlas/pet.atlas", type: Laya.Loader.ATLAS },
        ];
    }
    private FightComateObj: FightComateView;
    private equipPart: OtherComateEquipPart;//宠物装备
    private starSImage = [];
    private skillSprites = [];
    private readonly MaxLineRoleCount = 3;

    public initComp() {
        super.initComp();
        this.BattleText.url = "res/atlas/number/fight.atlas";
        for (let i = 0; i < this.Stars._childs.length; i++) {
            const element = this.Stars.getChildByName(`star${i}`);
            this.starSImage.push(element);
        }
        for (let i = 0; i < 3; i++) {
            var item: ComateSkillItem = new ComateSkillItem();
            item.setItemStyle(80);
            this.SkillsBox.addChild(item);
            var x = i * 116 + 1;
            var y = 1;
            item.x = x;
            item.y = y;
            this.skillSprites.push(item);
        }
    }

    private initPart(): void {
        if (!this.equipPart) {
            this.equipPart = new OtherComateEquipPart();
            this.equipBox.addChild(this.equipPart);
            this.equipPart.y = 55;
        }
    }

    private CreateComateView() {
        if (!this.FightComateObj) {
            this.FightComateObj = Laya.Pool.getItemByClass("FightComateView", FightComateView);
            this.FightComateObj.interval = GameConfig.GAME_NORMAL_ANIMATION_SPEED;
            this.FightComateObj.x = 287;
            this.FightComateObj.y = 480;
            this.addChild(this.FightComateObj);
        }
    }

    public open(...args): void {
        this.initWindow(true, true, "伙伴详情", 550, 590, 140);
        super.open();
        this.selectVo = this.arg[0];
        this.initPart();
        this.CreateComateView();
        this.updateData();
    }

    public updateData() {
        this.updateBattle();
        this.updateStar();
        this.updateFightComate();
        this.updateName();
        this.updateSkill();
        this.updateEquip();
    }

    public updateEquip(): void {
        this.equipPart.updateAllEquip(this.selectVo);
    }

    public updateSkill() {
        if (this.selectVo == null || this.skillSprites.length == 0)
            return;
        for (let i = 0; i < 3; i++) {
            var item: ComateSkillItem = this.skillSprites[i];
            item.curComateInfo = this.selectVo;
            item.skillIndex = i;
        }
    }

    public updateName() {
        var nowLv = this.selectVo.getBaseAttributeValue(PropertyEnumCode.OI_CODE_lv) || 0;
        this.NameText.text = this.selectVo.Sheet.name + (nowLv > 0 ? (" Lv." + nowLv) : "");
    }

    public updateFightComate() {
        if (this.selectVo == null || this.FightComateObj == null)
            return;
        if (this.FightComateObj.info == null) {
            this.FightComateObj.info = {};
        }
        this.FightComateObj.info.ParentPartnerNo = this.selectVo.No;
        this.FightComateObj.updateSkin();
        this.FightComateObj.scaleX = this.FightComateObj.scaleY = 1;
    }

    public updateStar() {
        this.Stars.width = this.selectVo.StarLv * 21;
        for (let i = 0; i < this.starSImage.length; i++) {
            const star = this.starSImage[i];
            if (this.selectVo == null) {
                star.visible = false;
            }
            else {
                if (this.selectVo.StarLv > i)
                    star.visible = true;
                else
                    star.visible = false;
            }
        }
        this.Stars.refresh();
    }

    public updateBattle() {
        this.addChild(this.pingfenLb);
        this.pingfenLb.text = "评分:" + this.selectVo.Sheet.battle.toString();
        var bat = this.selectVo.BaseAttribute.get(PropertyEnumCode.OI_CODE_BATTLE_POWER);
        if (bat != null && bat != 0)
            this.BattleText.text = bat.toString();
        else
            this.BattleText.text = this.selectVo.Sheet.battle.toString();
    }

    public update(): void {

    }

    public initEvent(): void {
        this.AttrBtn.on(Laya.Event.CLICK, this, this.OpenComateAttr);
    }

    public removeEvent(): void {
        this.AttrBtn.off(Laya.Event.CLICK, this, this.OpenComateAttr);
    }

    private OpenComateAttr(): void {
        UIManager.instance.openUI(UIID.SYS_LOOKPROP, [this.selectVo]);
    }

    public close(): void {
        if (this.FightComateObj) {
            this.FightComateObj.dispose();
            this.FightComateObj = null;
        }
        this.equipPart && this.equipPart.dispose();
        this.equipPart = null;
        super.close();
    }

}