import { BuyGoodsProtocol } from "../protocol/BuyGoodsProtocol";
import { BuyGoodsPanel } from "../panel/BuyGoodsPanel";

export class BuyGoodsControl extends BaseControl {
    private protocol:BuyGoodsProtocol;
    constructor() {
        super();
        this.panel = new BuyGoodsPanel();
        this.protocol = new BuyGoodsProtocol();
    }

    public set panel(value: BuyGoodsPanel) {
        this.mPanel = value;
    }

    public get panel(): BuyGoodsPanel {
        return this.mPanel as BuyGoodsPanel;
    }

    openView(...args) {
        this.initEvent();
    }

    closeView() {
        this.removeEvent();
        super.closeView();
    }

    private initEvent() {

    }
    private removeEvent() {

    }
}