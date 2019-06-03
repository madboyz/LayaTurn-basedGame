import { SCopyData } from "../../../net/data/SCopyData";
import { C49001 } from "../../../net/pt/pt_49";
import { SocketManager } from "../../../net/SocketManager";
import { RedDotBase } from "../RedDotBase";

export class RDTTT extends RedDotBase {
    //获取红点是否激活
    GetIsActive(): boolean {
        var openFuc = UIManager.instance.fuc;
        if (openFuc && !openFuc.hasOpen(UIID.SYS_TOWER)) {
            return false;
        }
        var info = SCopyData.instance.tttInfo
        if(info.cur_floor == undefined){
            var msg:C49001 = new C49001();
            SocketManager.instance.send(msg);
        }else{
            return info.left_times > 0 ;
        }
        return false;
    }
}
