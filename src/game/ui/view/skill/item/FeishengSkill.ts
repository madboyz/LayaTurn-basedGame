import { LABA_BASE } from "../../../../../db/sheet/base/LABA_BASE";
import { SoaringVo } from "../../../../../db/sheet/vo/SoaringVo";
import { SSkillData } from "../../../../skill/SSkillData";
import { Skill } from "../../../../skill/Skill";
import { ToolTipsManager } from "../../../manager/ToolTipsManager";
import { ToolTipsBaseItem } from "../../../compent/ToolTipsBaseItem";
import { ToolTipsFeishengSkill } from "../../../compent/ToolTipsFeishengSkill";

export class FeishengSkill extends Laya.View {
    private bgImg: Laya.Image;
    private iconImg: Laya.Image;

    constructor() {
        super();
        this.width = this.height = 70;
        this.bgImg = new Laya.Image;
        this.bgImg.width = this.bgImg.height = 70;
        this.bgImg.skin = "itemBase/skillBg_default.png";
        this.addChild(this.bgImg);
        this.iconImg = new Laya.Image;
        this.iconImg.width = this.iconImg.height = 60;
        this.iconImg.x = this.iconImg.y = 5;
        this.addChild(this.iconImg);

        this.on(Laya.Event.CLICK, this, this.thisClick);
    }

    private _mdata: any;
    public set dataSource(data: any[]) {
        this._mdata = data;
        this.canLearn = false;
        if (!data) {
            this.visible = false;
            return;
        }
        var bigSkill = data[0] as Skill;
        var bigSkillIsAct = bigSkill.Lv > 0;

        var skillCfg = data[1] as SoaringVo;
        this.visible = true;
        this.iconImg.skin = ResUtils.getSkillIcon(skillCfg.icon);
        var act: boolean = SSkillData.instance.checkFeishengSkillAct(skillCfg.no);
        this.iconImg.gray = !act;
        var hadPoint: boolean = SSkillData.instance.feishengLeftPoint > 0;
        this.canLearn = hadPoint && !act && bigSkillIsAct;
        this.showRed(this.canLearn);
    }

    private canLearn: boolean = false;

    public thisClick(): void {
        ToolTipsManager.instance.directShow(ToolTipsFeishengSkill, [this._mdata[1], this.canLearn]);
    }


    private _redImg: Laya.Image;
    public showRed(show: boolean = false): void {
        if (show) {
            if (!this._redImg) {
                this._redImg = new Laya.Image();
                this._redImg.skin = ResUtils.getItemBase("img_red");
                this._redImg.x = this.width - this._redImg.width;
                this._redImg.y = 0;
                this.addChild(this._redImg);
            }
        } else {
            if (this._redImg) {
                this._redImg.removeSelf();
                this._redImg = null;
            }
        }
    }


    public destroy(): void {
        super.destroy();
    }

}