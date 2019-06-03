import { BaseProtocol } from './../../../../../net/protocol/BaseProtocol';
import { C15073, C15073_1 } from '../../../../../net/pt/pt_15';
import { SBagData } from '../../../../../net/data/SBagData';
export class SmellProtocol extends BaseProtocol {
    constructor() {
        super();
    }

    /**
     * 批量分解装备
     * @param {Array<number>} arr
     * @memberof SmellProtocol
     */
    public send15073(arr: Array<any>): void {
        if (SBagData.instance.isSmelling) {//分解中的话，不让点
            return;
        }
        var msg: C15073;
        var newList: Array<any> = [];
        arr.forEach((value, index, arr) => {
            if (value > 0) {
                var ids: C15073_1 = new C15073_1();
                ids.GoodsId = value;
                newList.push(ids);
            }
        })
        msg = new C15073();
        msg.item_1 = newList;
        if (newList && newList.length > 0) {
            SBagData.instance.isSmelling = true;
        }
        this.send(msg);
    }
}