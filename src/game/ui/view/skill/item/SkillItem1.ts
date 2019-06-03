import { Skill } from "../../../../skill/Skill";
import { CustomizeTexture } from "../../../../battle/scene/comp/CustomizeTexture";
import { SRoleData } from "../../../../../net/data/SRoleData";
import { ConstVo } from "../../../../../db/sheet/vo/ConstVo";
import { UIeffectLayer } from "../../../../battle/scene/layer/UIeffectLayer";
import { GuildSkill } from "../../../../skill/GuildSkill";

export class SkillItem1 extends ui.main.SkillItem1UI {
    private skillType: number = 1;//1是正常类型，2是帮派技能
    private _item: Skill;//具体数据，类型为Skill 或，GuildSkill
    private isCreate: boolean = false;
    private textrue: CustomizeTexture;
    private _uiEffLayer: UIeffectLayer
    public set dataSource(skill: any) {
        if (skill == null)
            return;
        this._item = skill;
        if (skill["__proto__"]["constructor"]["name"] == "Skill") {
            this.skillType = 1;
        } else if (skill["__proto__"]["constructor"]["name"] == "GuildSkill") {
            this.skillType = 2;
        }

        if (this.skillType == 1) {
            this.NameLabel.text = skill.sheetData.name;
            if (SRoleData.instance.info) {
                var str = `${skill.Lv}/${SRoleData.instance.info.Lv * skill.canUpgardeLvG}`;
                this.ItemText = str;
            }
        } else if (this.skillType == 2) {
            this.NameLabel.text = (skill as GuildSkill).sheetDataGS.name;
            this.ItemText = (skill as GuildSkill).Lv + "/" + (skill as GuildSkill).canUpgardeLvG;
            this.EnableUpgrade(true);
        }
        
        this.LoadIcon();
        this.updateBg();
    }

    public get dataSource(): any {
        return this._item;
    }

    constructor() {
        super();
        this._uiEffLayer = new UIeffectLayer;
        this.addChild(this._uiEffLayer);
        this.lockImg.visible = false;
    }

    public PlayerLvUpEffect() {
        this._uiEffLayer.playEffect("ui_effect_4", 45, 45, false);
    }

    /**
     * 如果是技能升级的话就会隐藏对应升级ui
     * @param enable 
     */
    public EnableUpgrade(enable: boolean) {
        var forceHide:boolean = this._item.Lv <= 1 && SRoleData.instance.info.Lv >= 50;//强制隐藏
        this.UpGradeBox.visible = enable && !forceHide;
    }

    public updateLock(showLock: boolean = true) {
        if (this._item.Lv == 0 && showLock) {
            this.EnableUpgrade(false);
            this.lockImg.visible = true;
            this.icon.visible = false;
        }
        else {
            this.EnableUpgrade(showLock);
            this.lockImg.visible = false;
            this.icon.visible = true;
        }
    }

    public EnableGray(enable: boolean) {
        this.gray = enable;
    }

    public set ItemText(str: string) {
        this.Text.text = str;
    }

    public IsSelect(select: boolean) {
        this.selectImg.visible = select;
        //this.Frame.skin = select == true ? "itemBase/skillBg_2.png" : "itemBase/skillBg_default.png";
    }

    public updateBg(): void {
        if (this.skillType == 1) {
            if (this._item.sheetData.quality)
                this.Frame.skin = ResUtils.getItemBase("skillBg_" + this._item.sheetData.quality);
        } else if (this.skillType == 2) {
            this.Frame.skin = ResUtils.getItemBase("skillBg_default");
        }

    }

    private async LoadIcon() {
        if (this.skillType == 1) {
            var url: string = ResUtils.getSkillIcon(this._item.sheetData.icon);
        } else if (this.skillType == 2) {
            var url: string = ResUtils.getSkillIcon((this._item as GuildSkill).sheetDataGS.icon);
        }
        this.textrue = await CustomizeTexture.asyncGetTextureByUrl(url, this._item.Id, this.icon.x, this.icon.y);
        if (!this.textrue || (this.textrue && !this.textrue.texture)) return;
        this.icon.texture = this.textrue.texture;
        if (this._item)
            this.gray = this._item.IsUsable == 0;
        else
            this.gray = false;
    }

    public removeSelf(): any {
        super.removeSelf();
    }

    private _workImg: Laya.Image;
    public set isWorking(value: boolean) {
        if (value) {
            if (!this._workImg) {
                this._workImg = new Laya.Image();
                this._workImg.skin = ResUtils.getCompUIUrl("img_word_qiyongzhong");
                this._workImg.x = this.width - this._workImg.width + 5;
                this._workImg.y = this.height - this._workImg.height - 30;
                this.addChild(this._workImg);
            }
        } else {
            if (this._workImg) {
                this._workImg.removeSelf();
                this._workImg = null;
            }
        }
    }

}