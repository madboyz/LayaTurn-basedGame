import { Pet_cultivateVo } from "../../../../../db/sheet/vo/Pet_cultivateVo";
import { SkillVo } from "../../../../../db/sheet/vo/SkillVo";
import { PetSkillItem } from "../../pet/item/PetSkillItem";
import { SOtherPlayerData } from "../data/SOtherPlayerData";

export class OtherPetSkillIcon extends ui.main.PetSkillIconUI {
    private vo: SkillVo;
    private item: PetSkillItem;
    private need: Pet_cultivateVo;
    private _isActive: boolean = false;
    private _isNeedLearn: boolean = false;
    private slot: number;
    private showLable: boolean;
    constructor() {
        super();
    }

    private showItem(): void {
        if (!this.item) {
            this.item = new PetSkillItem();
            this.item.setItemStyle(80);
            this.addChildAt(this.item, 0);
        }
        this.item.info = this.vo;
        this.item.toolTipData = this.vo;
    }

    private showTips(type: number): void {
        if (type == 0) {
            this.txt_tips.text = "";
            this.img_canlearn.visible = false;
            this.lock.visible = false;
        }
        else if (type == 1) {
            this.txt_tips.text = "";
            this.img_canlearn.visible = false;//true;
            this.lock.visible = false;
        }
        else {
            this.txt_tips.text = "";//this.need.title + "\n解锁";
            this.txt_tips.visible = this.showLable;
            this.img_canlearn.visible = false;
            this.lock.visible = true;
        }
    }

    private mData: any;

    public set dataSource(data: any) {
        if (!data) return;
        // this.img_gray.visible = false;
        this.mData = data;
        this.vo = data.vo;
        this.need = data.need;
        this.slot = data.slot;
        this.showLable = data.showNeed;
        this.updateData();
    }

    private updateData(): void {
        if (this.need) {
            if (SOtherPlayerData.instance.otherPetInfo.CultivateLv > this.need.lv ||
                (SOtherPlayerData.instance.otherPetInfo.CultivateLv == this.need.lv && SOtherPlayerData.instance.otherPetInfo.Layer >= this.need.layer)) {
                if (this.vo) {
                    this.showTips(0);
                    this.showItem()
                    this._isNeedLearn = false;
                }
                else {
                    this.showTips(1);
                    this.showItem()
                    this._isNeedLearn = true;
                }
                this._isActive = true;
            }
            else {
                this.showItem()
                this.showTips(2);
                // this.img_gray.visible = true;
                this._isActive = false;
                this._isNeedLearn = false;
            }
        }
        else {
            if (this.vo) {
                this.showTips(0);
                this.showItem()
                this._isNeedLearn = false;
            }
            else {
                this.showTips(1);
                this.showItem()
                this._isNeedLearn = true;
            }
            this._isActive = true;
        }
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
        // this.img_gray.visible = true;
    }

    public get dataSource(): any {
        return this.mData;
    }
}