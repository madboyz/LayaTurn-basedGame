import { SkillVo } from "../../../../../db/sheet/vo/SkillVo";
import { Pet_cultivateVo } from "../../../../../db/sheet/vo/Pet_cultivateVo";
import { SPetData } from "../../../../../net/data/SPetData";
import { PetSkillItem } from "./PetSkillItem";

export class PetSkillSlotItem extends ui.main.PetSkillItemUI {
    private slot: number;
    public vo: SkillVo;
    private need: Pet_cultivateVo;
    private item: PetSkillItem;
    private _isActive: boolean = false;
    private _isNeedLearn: boolean = false;
    private showLable: boolean;
    private _isSelect: boolean = false;
    constructor() {
        super();
        this.img_gray.visible = false;
        this.txt_tips.text = "";
        this.img_select.visible = false;
    }

    private showItem(): void {
        if (!this.item) {
            this.item = new PetSkillItem();
            this.item.setItemStyle(80);
            this.addChildAt(this.item, 4);
            this.item.x = 11;
            this.item.y = 9;
        }
        this.item.info = this.vo;
        this.item.toolTipData = this.vo;
    }

    private showTips(type: number): void {
        if (type == 0) {
            this.txt_tips.text = "";
            this.lock.visible = false;
        }
        else if (type == 1) {
            this.txt_tips.text = "点击学习新技能";
            this.txt_tips.color = "#11a501";
            this.txt_tips.visible = true;
            this.lock.visible = false;
        }
        else {
            this.txt_tips.text = this.need.title + "\n解锁";
            this.txt_tips.color = "#ff0000";
            this.txt_tips.visible = this.showLable;
            this.lock.visible = true;
        }
    }

    private mData: any;

    public set dataSource(data: any) {
        if (!data) return;
        this.img_gray.visible = false;
        this.mData = data;
        this.slot = data.slot;
        this.vo = data.vo;
        this.need = data.need;
        this.showLable = data.showNeed;
        this.updateData();
    }

    private updateData(): void {
        if (this.need) {
            if (SPetData.instance.curInfo.CultivateLv > this.need.lv ||
                (SPetData.instance.curInfo.CultivateLv == this.need.lv && SPetData.instance.curInfo.Layer >= this.need.layer)) {
                if (this.vo) {
                    this.txt_name.text = this.vo.name;
                    this.txt_desc.text = this.vo.desc;
                    if (this.txt_desc.lines.length > 2) {
                        this.txt_desc.text = this.vo.desc.substring(0, 32) + "...";
                    }
                    this.showTips(0);
                    this.showItem()
                    this._isNeedLearn = false;
                }
                else {
                    this.txt_name.text = "";
                    this.txt_desc.text = "";
                    this.showTips(1);
                    this.showItem()
                    this._isNeedLearn = true;
                }
                this._isActive = true;
            }
            else {
                this.txt_name.text = "";
                this.txt_desc.text = "";
                this.showItem()
                this.showTips(2);
                this.img_gray.visible = true;
                this._isActive = false;
                this._isNeedLearn = false;
            }
        }
        else {
            if (this.vo) {
                this.txt_name.text = this.vo.name;
                this.txt_desc.text = this.vo.desc;
                if (this.txt_desc.lines.length > 2) {
                    this.txt_desc.text = this.vo.desc.substring(0, 32) + "...";
                }
                this.showTips(0);
                this.showItem()
                this._isNeedLearn = false;
            }
            else {
                this.txt_name.text = "";
                this.txt_desc.text = "";
                this.showTips(1);
                this.showItem()
                this._isNeedLearn = true;
            }
            this._isActive = true;
        }
        this.img_select.visible = this._isSelect;
    }

    public checkSelect(data: any): void {
        if (this.mData && data) {
            if (this.slot == data.slot) {
                this._isSelect = true;
            }
            else {
                this._isSelect = false;
            }
        }
        else {
            this._isSelect = false;
        }
        this.isSelect = this._isSelect;
    }

    public set isSelect(value: boolean) {
        this.img_select.visible = value
    }

    public get active(): boolean {
        return this._isActive;
    }

    public get needLearn(): boolean {
        return this._isNeedLearn;
    }

    public get skillId(): number {
        return this.vo.no;
    }

    /**
     * 置灰 直接用gray会对性能有影响
     * @memberof ScaleButton
     */
    public set gray(value: boolean) {
        this.img_gray.visible = true;
    }

    public get dataSource(): any {
        return this.mData;
    }
}