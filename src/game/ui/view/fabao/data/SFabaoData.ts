import { FabaoProtocol } from "../protocol/FabaoProtocol";
import { DataManager } from "../../../../../message/manager/DataManager";
import { S15176 } from "../../../../../net/pt/pt_15";
import { ItemData } from "../../../compent/data/ItemData";

export class SFabaoData extends Laya.EventDispatcher {
    private static _instance: SFabaoData;
    public protocol: FabaoProtocol;

    public static get instance(): SFabaoData {
        return SFabaoData._instance || (SFabaoData._instance = new SFabaoData());
    }
    constructor() {
        super();
        this.protocol = new FabaoProtocol;
    }


    public unRegisterEvent() {
        DataManager.cancel(PROTOCOL.E15176, this, this.onS15176);//探宝
    }

    public registerEvent() {
        DataManager.listen(PROTOCOL.E15176, this, this.onS15176);//探宝
    }

    //控制处理相关================================================

    //数据处理=====================================================
    public onS15176(data: S15176): void {
        var itemList: ItemData[] = [];
        for (let i = 0; i < data.item_1.length; i++) {
            const element = data.item_1[i];
            var item = new ItemData(element.GoodsNo);
            item.serverInfo.Quality = element.Quality;
            item.Count = 1;
            itemList.push(item);
        }
        UIManager.instance.openUI(UIID.COM_SHOW_REWARD, [
            itemList,//奖励
            null,//点击确定的方法
            "探宝",//一级标题
            "本次探宝获得奖励",//二级标题
            "确定",//确定按钮名字
        ]);
    }

}

export enum SFabaoEvent {
}

