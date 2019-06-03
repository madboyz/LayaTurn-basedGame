import { SkillVo } from "../../../../../db/sheet/vo/SkillVo";
import { PetSkillItem } from "../../pet/item/PetSkillItem";
import { ComateInfo } from "../data/ComateInfo";
import { Comate_cfgVo } from "../../../../../db/sheet/vo/Comate_cfgVo";
import { Comate_starVo } from "../../../../../db/sheet/vo/Comate_starVo";

export class ComateSkillItem extends PetSkillItem {
    constructor() {
        super();
    }

    public initComp(): void {
        super.initComp();
    }

    private _curComateInfo: ComateInfo;
    public set curComateInfo(value: ComateInfo) {
        this._curComateInfo = value;
    }
    public get curComateInfo() {
        return this._curComateInfo;
    }

    private _skillIndex: number;
    private _lockStar: number = 0;
    public set skillIndex(value: number) {
        this._skillIndex = value;
        var cfg: Comate_starVo;
        var skillId: number;
        if (value == 0) {
            skillId = Comate_cfgVo.get(this._curComateInfo.No).skills[0];
        } else if (value == 1 || value == 2) {
            cfg = Comate_starVo.getComateSkillByIndex(this._curComateInfo.No, value);
            this._lockStar = cfg.lv;
            skillId = cfg.skill;
        }
        var vo = SkillVo.get(skillId);
        this.info = vo;
        this.toolTipData = vo;
    }

    // public set info(value: SkillVo) {
    //     this._info = value;
    //     this.updateSkillIcon();
    // }

    // public get info(): SkillVo {
    //     return this._info;
    // }

    private maskUpImg: Laya.Image;
    private lockText: Laya.Text;

    protected updateSkillIcon(): void {
        super.updateSkillIcon();
        var lock: boolean = this.curComateInfo.StarLv < this._lockStar;
        if (lock) {
            if (!this.maskUpImg) {
                this.maskUpImg = new Laya.Image;
                this.maskUpImg.x = this.maskUpImg.y = 4;
                this.maskUpImg.width = this.width - 8;
                this.maskUpImg.height = this.height - 8;
                this.maskUpImg.skin = "comp/img_mask.png";
                this._topLayer.addChild(this.maskUpImg);
            }
            if (!this.lockText) {
                this.lockText = new Laya.Text;
                this.lockText.font = "黑体";
                this.lockText.fontSize = 20;
                this.lockText.color = "#faf71c";
                this.lockText.align = "center";
                this.lockText.valign = "middle";
                this.lockText.width = this.width;
                this.lockText.y = 18;
                this.lockText.wordWrap = true;
                this.addChild(this.lockText);
            }
            this.lockText.text = this._lockStar + "星\n解锁";
        } else {
            if (this.maskUpImg) {
                this.maskUpImg.destroy();
                this.maskUpImg.removeSelf();
                this.maskUpImg = null;
            }
            if (this.lockText) {
                this.lockText.text = "";
            }
        }
        this.showName(this.info.name, 18, "#76420b");
    }



    public dispose(): void {
        if (this.maskUpImg) {
            this.maskUpImg.destroy();
            this.maskUpImg.removeSelf();
            this.maskUpImg = null;
        }
        if (this.lockText) {
            this.lockText.destroy();
            this.lockText = null;
        }
        this._curComateInfo = null;
        this._lockStar = 0;
        super.dispose();
    }


}