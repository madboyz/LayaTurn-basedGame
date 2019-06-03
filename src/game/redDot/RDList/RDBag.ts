import { ConstVo } from "../../../db/sheet/vo/ConstVo";
import { SBagData } from "../../../net/data/SBagData";
import { RedDotBase } from "../RedDotBase";

export class RDBag extends RedDotBase {
    GetIsActive(): boolean {
        var checkNum = Number(ConstVo.get("BAG_TIPS").val);
        return SBagData.instance.equip.itemLength >= checkNum;
    }
}

export class RDBagFull extends RedDotBase {
    GetIsActive(): boolean {
        var checkNum = Number(ConstVo.get("BAG_TIPS").val);
        return SBagData.instance.equip.itemLength >= SBagData.instance.equip.capacity && SBagData.instance.equip.capacity > checkNum;
    }
}
