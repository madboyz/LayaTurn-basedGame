import { SCopyData } from "../../../net/data/SCopyData";
import { C49001 } from "../../../net/pt/pt_49";
import { SocketManager } from "../../../net/SocketManager";
import { RedDotBase } from "../RedDotBase";
import { SActiveData } from "../../ui/view/active/data/SActiveData";
import { CommonControl } from "../../common/control/CommonControl";
import { ActiveInfo, ActiveState } from "../../ui/view/active/data/ActiveInfo";
import { SRoleData } from "../../../net/data/SRoleData";

export class RDCityActive extends RedDotBase {
    //获取红点是否激活
    GetIsActive(): boolean {
        var openFuc = UIManager.instance.fuc;
        if (openFuc && !openFuc.hasOpen(UIID.SYS_ACTIVITY)) {
            return false;
        }
        var activeList = SActiveData.instance.ActiveDic.values;
        if (activeList.length <= 0) {
            CommonControl.instance.send58001();
            return false;
        }
        //活动列表
        for (let i = 0; i < activeList.length; i++) {
            var mData = activeList[i] as ActiveInfo;
            if (mData.state == ActiveState.Continue) {
                //进行中
                var lvEnough: boolean = SRoleData.instance.info.Lv >= mData.Sheet.level;
                if (lvEnough) {
                    //等级够
                    var count = mData.maxNum - mData.useNum;
                    if (count > 0) {
                        //有次数
                        return true;
                    }
                }
            }
        }
        return false;
    }
}
