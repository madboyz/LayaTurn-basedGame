import { SCopyData } from "../../../net/data/SCopyData";
import { C49001 } from "../../../net/pt/pt_49";
import { SocketManager } from "../../../net/SocketManager";
import { RedDotBase } from "../RedDotBase";

export class RDPetCopy extends RedDotBase {
    //获取红点是否激活
    GetIsActive(): boolean {
        var openFuc = UIManager.instance.fuc;
        if (openFuc && !openFuc.hasOpen(UIID.SYS_COPY_STUFF)) {
            return false;
        }
        return SCopyData.instance.showPetRed;
    }
}
