import { RedDotBase } from "../RedDotBase";
import { SBagData } from "../../../net/data/SBagData";
import { SFriendData } from "../../../net/data/SFriendData";

export class RDFriendApply extends RedDotBase {
    //获取红点是否激活
    GetIsActive(): boolean {
        var openFuc = UIManager.instance.fuc;
        if (openFuc && !openFuc.hasOpen(UIID.SYS_RELATION)) {
            return false;
        }
        return SFriendData.instance.showRed;
    }
}

export class RDFriendLove extends RedDotBase {
    //获取红点是否激活
    GetIsActive(): boolean {
        var openFuc = UIManager.instance.fuc;
        if (openFuc && !openFuc.hasOpen(UIID.SYS_RELATION)) {
            return false;
        }
        var friend = SFriendData.instance.friendList;
        if(!friend){
            return false;
        }
        for (let i = 0; i < friend.length; i++) {
            const element = friend[i];
            if(element.LoveState == 1){
                return true;
            }
        }
        return false;
    }
}
