import { RedDotBase } from "../RedDotBase";
import { SForgingData } from "../../../net/data/SForgingData";

export class RDForgingStrength extends RedDotBase {
    GetIsActive(): boolean {
        return SForgingData.instance.showStrengRed;
    }
}

export class RDForgingRefine extends RedDotBase {
    GetIsActive(): boolean {
        return SForgingData.instance.showRefineRed;
    }
}

export class RDForgingKailing extends RedDotBase {
    GetIsActive(): boolean {
        var openFuc = UIManager.instance.fuc;
        if (openFuc && !openFuc.hasOpen(UIID.SYS_EQ_QILING)) {
            return false;
        }
        return SForgingData.instance.showKailingRed;
    }
}

export class RDForgingGem extends RedDotBase {
    GetIsActive(): boolean {
        var openFuc = UIManager.instance.fuc;
        if (openFuc && !openFuc.hasOpen(UIID.SYS_EQ_BAOSHI)) {
            return false;
        }
        return SForgingData.instance.showGemRed;
    }
}