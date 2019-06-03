import { BaseItem } from "../../../compent/BaseItem";
import { PetInfo } from "../../../compent/data/PetInfo";

export class PetItem extends BaseItem {
    private _info: PetInfo;
    public isShowTag: boolean;
    private _fightTag: Laya.Image;
    private _tagCombat: Laya.Image;
    private _cornBg: Laya.Image;
    private _cornTxt: Laya.Text;
    private _preFight: Laya.Image;
    constructor() {
        super();
    }

    public initComp(): void {
        super.initComp();
        this.isShowToolTip = false;
    }

    private initCorn(): void {
        if (!this._cornBg) {
            this._cornBg = new Laya.Image();
            this._topLayer.addChild(this._cornBg);

            this._cornTxt = new Laya.Text();
            this._topLayer.addChild(this._cornTxt);
            this._cornTxt.rotation = -45;
            this._cornTxt.x = -3;
            this._cornTxt.y = 23;
            this._cornTxt.text = "宝宝";
            this._cornTxt.fontSize = 18;
            this._cornTxt.stroke = 1;
            this._cornTxt.strokeColor = "#870000"
            this._cornTxt.color = "#ffffff";
            this._cornTxt.width = 40;
            this._cornTxt.height = 18;
            this._cornTxt.valign = "middle";
            this._cornTxt.align = "center";
        }
    }

    public set info(value: PetInfo) {
        this._info = value;
        if (value) {
            this.setSource(this._info.vo.icon);
        }
        else {
            if (this._bitmap) {
                this._bitmap.skin = "";
            }
        }
        this.updateFight();
        this.updateCorn();
        this.updateBg();
    }

    protected updateBg(): void {
        if (this.info && this.info.vo && this.info.vo.quality) {
            this.bgName = ResUtils.getItemBg(this.info.vo.quality);
        } else {
            this.bgName = ResUtils.getItemBg("default");
        }
    }

    protected updateCorn(): void {
        if (this.isShowTag) {
            if (this.info) {
                this.initCorn();
                var showImg = "";
                if (PetGradeType.TYPE_1 == this.info.vo.grade) {
                    this._cornTxt.text = "";//"宝宝";
                    showImg = "";
                }
                else if (PetGradeType.TYPE_2 == this.info.vo.grade) {
                    this._cornTxt.text = "高级";
                    showImg = "img_corner_" + (this.info.vo.grade + 1);
                }
                else if (PetGradeType.TYPE_3 == this.info.vo.grade) {
                    this._cornTxt.text = "珍品";
                    showImg = "img_corner_" + (this.info.vo.grade + 1);
                }
                else if (PetGradeType.TYPE_4 == this.info.vo.grade) {
                    this._cornTxt.text = "神兽";
                    showImg = "img_corner_" + (this.info.vo.grade + 1);
                }
                this._cornBg.skin = showImg != "" ? ResUtils.getItemBase(showImg) : "";
            }
            else {
                this.clearCorn();
            }
        }
    }

    protected updateFight(): void {
        if (this.isShowTag) {
            if (this.info && this.info.Position == 1) {
                if (!this._fightTag) {
                    this._fightTag = new Laya.Image();
                    this._fightTag.skin = ResUtils.getItemBase("img_yellowTag");
                    this._topLayer.addChild(this._fightTag);
                    this._fightTag.x = this.width - this._fightTag.width;

                    this._tagCombat = new Laya.Image();
                    this._topLayer.addChild(this._tagCombat);
                    this._tagCombat.skin = ResUtils.getItemBase("img_tag_combat");
                    this._tagCombat.x = this._fightTag.x + ((this._fightTag.width - this._tagCombat.width) * 0.5);
                    this._tagCombat.y = this._fightTag.y + 5;
                }
            }
            else if (this.info && this.info.Order >= 1) {
                if (!this._fightTag) {
                    this._fightTag = new Laya.Image();
                    this._fightTag.skin = ResUtils.getItemBase("img_yellowTag");
                    this._topLayer.addChild(this._fightTag);
                    this._fightTag.x = this.width - this._fightTag.width;

                    this._preFight = new Laya.Image();
                    this._topLayer.addChild(this._preFight);
                    this._preFight.skin = ResUtils.getItemBase("img_tag_preFight");
                    this._preFight.x = this._fightTag.x + ((this._fightTag.width - this._preFight.width) * 0.5);
                    this._preFight.y = this._fightTag.y + 5;
                }
            }
            else {
                this.clearTag();
            }
        }
    }

    private clearTag(): void {
        if (this._fightTag) {
            this._fightTag.removeSelf();
            this._fightTag = null;
        }

        if (this._tagCombat) {
            this._tagCombat.removeSelf();
            this._tagCombat = null;
        }

        if (this._preFight) {
            this._preFight.removeSelf();
            this._preFight = null;
        }
    }

    private clearCorn(): void {
        if (this._cornBg) {
            this._cornBg.removeSelf();
            this._cornBg = null;
        }

        if (this._cornTxt) {
            this._cornTxt.removeSelf();
            this._cornTxt = null;
        }
    }


    /**
     * 设置资源
     * @param value 资源icon或者image
     *
     */
    public setSource(value: any): void {
        if (!value) return;
        //移除之前加载的
        if (value instanceof Laya.Image) {
            this._bitmap = value;
            this.updateViewSize();
            return;
        }
        else {
            this._bitmap && (this._bitmap.skin = ResUtils.petHead + value);
            this.updateViewSize();
            return;
        }
    }

    public get info(): PetInfo {
        return this._info;
    }

    public dispose(): void {
        this._bitmap.offAll();
        this._bottomLayer.offAll();
        this._middleLayer.offAll();
        this._topLayer.offAll();
        this.isShowTag = false;
        this.clearTag();
        this.clearCorn();
        if (this._bitmap) {
            this._bitmap.destroy();
            this._bitmap = null;
        }
        if (this._bg) {
            this._bg.destroy();
            this._bg = null;
        }

        if (this._amountLabel) {
            this._amountLabel.destroy();
            this._amountLabel = null;
        }

        if (this._amountBg) {
            this._amountBg.destroy();
            this._amountBg = null;
        }

        if (this._bottomLayer) {
            this._bottomLayer.destroy();
            this._bottomLayer = null;
        }

        if (this._topLayer) {
            this._topLayer.destroy();
            this._topLayer = null;
        }

        if (this._middleLayer) {
            this._middleLayer.destroy();
            this._middleLayer = null;
        }
        if (this._job) {
            this._job.destroy();
            this._job = null;
        }
        if (this._txt) {
            this._txt.destroy();
            this._txt = null;
        }
        this.setSource(null);
        this._bgName = null;
        this._itemData = null;
        this._paddingTop = 6;
        this._paddingLeft = 6;
        this._amount = 0;
        this._isShowToolTip = false;
        this._tooltipData = null;
        this.offAll();
        this.removeSelf();
    }
}