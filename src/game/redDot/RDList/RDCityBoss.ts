import { RedDotBase } from "../RedDotBase";
import { SBagData } from "../../../net/data/SBagData";
import { SFriendData } from "../../../net/data/SFriendData";
import { SWorldBossData } from "../../../net/data/SWorldBossData";
import { SCopyData } from "../../../net/data/SCopyData";

export class RDWorldBoss extends RedDotBase {
    //获取红点是否激活
    GetIsActive(): boolean {
        var openFuc = UIManager.instance.fuc;
        if (openFuc && !openFuc.hasOpen(UIID.SYS_WORLD_BOSS)) {
            return false;
        }
        var worldInfo = SWorldBossData.instance.CheckBossCanFight();
        return worldInfo != null;
    }
}

export class RDPersonBoss extends RedDotBase {
    //获取红点是否激活
    GetIsActive(): boolean {
        var openFuc = UIManager.instance.fuc;
        if (openFuc && !openFuc.hasOpen(UIID.SYS_COPY_BOSS)) {
            return false;
        }
        return SCopyData.instance.showBossRed;
    }
}
