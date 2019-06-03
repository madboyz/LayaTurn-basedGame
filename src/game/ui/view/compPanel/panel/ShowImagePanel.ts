import { ConstVo } from "../../../../../db/sheet/vo/ConstVo";
import { AwardUtil } from "../../../../award/AwardUtil";
import { BaseItem } from "../../../compent/BaseItem";
import { ItemData } from "../../../compent/data/ItemData";

export class ShowImagePanel extends ui.main.BasePanelUI {
    private param;
    private showImage: Laya.Image;
    private clickBox:Laya.Box;

    constructor() {
        super();
        this.isShowMask = true;
        this.sameLevelEliminate = false;
        this.isCloseByNull = false;
        this.mResouce = [
        ];
    }

    public initEvent(): void {
        this.clickBox.on(Laya.Event.CLICK,this,this.boxClick);
    }
    
    public removeEvent(): void {
        this.clickBox.off(Laya.Event.CLICK,this,this.boxClick);
    }

    public initComp() {
        super.initComp();
        this.initList();
    }

    private initList(): void {
        if (!this.showImage) {
            this.showImage = new Laya.Image;
            this.addChild(this.showImage);
            this.showImage.centerX = this.showImage.centerY = 0;
            this.showImage.anchorX = this.showImage.anchorY = 0.5;
        }
        if (!this.clickBox) {
            this.clickBox = new Laya.Box;
            this.addChild(this.clickBox);
            this.clickBox.left = this.clickBox.right = this.clickBox.top = this.clickBox.bottom = 0;
        }
    }

    public open(...args): void {
        this.param = this.arg[0];
        this.initWindow(true, false, "展示", 486, 390, 170);
        super.open();
        this.update();
        this.canClose = false;
        this.timer.once(2000, this, () => {
            this.canClose = true;
        })
    }

    public update(): void {
        this.showImage.skin = this.param;
    }

    private canClose: boolean = false;
    private boxClick():void{
        if(!this.canClose){
            return;
        }
        this.close();
    }


    public close(): void {
        super.close();
    }
}