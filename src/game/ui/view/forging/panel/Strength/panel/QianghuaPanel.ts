import { StrengthPanel } from "./StrengthPanel";

export class QianghuaPanel extends StrengthPanel {
    constructor() {
        super();
    }

    public initComp(): void {
        super.initComp();
        this.tejiqianghuaBtn.visible = true;

    }


    public initEvent(): void {
        super.initEvent();
        this.tejiqianghuaBtn.on(Laya.Event.CLICK, this, this.tejiqianghuaBtnClick);
    }
    
    public removeEvent(): void {
        super.removeEvent();
        this.tejiqianghuaBtn.off(Laya.Event.CLICK, this, this.tejiqianghuaBtnClick);
    }

    public tejiqianghuaBtnClick():void{
        UIManager.instance.openUI(UIID.TEJI_QIANGHUA_PANEL);
    }

}