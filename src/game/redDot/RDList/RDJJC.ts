import { RedDotBase } from "../RedDotBase";
import { SBagData } from "../../../net/data/SBagData";
import { SJJCData } from "../../ui/view/jjc/data/SJJCData";
import { C23001 } from "../../../net/pt/pt_23";
import { SocketManager } from "../../../net/SocketManager";

export class RDJJC extends RedDotBase {
    //获取红点是否激活
    GetIsActive(): boolean {
        var openFuc = UIManager.instance.fuc;
        if (openFuc && !openFuc.hasOpen(UIID.SYS_OFFLINE_ARENA)) {
            return false;
        }
        var info = SJJCData.instance.jjcBaseInfo
        if(!info){
            var msg:C23001 = new C23001();
            SocketManager.instance.send(msg);
        }else{
            return info.left_times > 0 ;
        }
        return false;
    }
}
