import { DataManager } from "../../../../../message/manager/DataManager";
import { S17028 } from "../../../../../net/pt/pt_17";
import { PetInfo } from "../../../compent/data/PetInfo";
import { OtherPlayerProtocol } from "../protocol/OtherPlayerProtocol";
import { ComateInfo } from "../../comate/data/ComateInfo";
import { S37019, S37034 } from "../../../../../net/pt/pt_37";
import { Comate_cfgVo } from "../../../../../db/sheet/vo/Comate_cfgVo";
import { S15001 } from "../../../../../net/pt/pt_15";
import { ToolTipsOtherEquipment } from "../comp/ToolTipsOtherEquipment";
import { ItemData } from "../../../compent/data/ItemData";
import { ToolTipsManager } from "../../../manager/ToolTipsManager";

export class SOtherPlayerData extends Laya.EventDispatcher {
    private static _instance: SOtherPlayerData;
    public protocol: OtherPlayerProtocol;

    public static get instance(): SOtherPlayerData {
        return SOtherPlayerData._instance || (SOtherPlayerData._instance = new SOtherPlayerData());
    }
    constructor() {
        super();
        this.protocol = new OtherPlayerProtocol;
    }


    public unRegisterEvent() {
        DataManager.cancel(PROTOCOL.E17028, this, this.onS17028);//查询别人宠物
        DataManager.cancel(PROTOCOL.E37034, this, this.onS37034);//查询别人伙伴
        DataManager.cancel(PROTOCOL.E15001, this, this.onS15001);//查询别人装备
    }

    public registerEvent() {
        DataManager.listen(PROTOCOL.E17028, this, this.onS17028);//查询别人宠物
        DataManager.listen(PROTOCOL.E37034, this, this.onS37034);//查询别人伙伴
        DataManager.listen(PROTOCOL.E15001, this, this.onS15001);//查询别人装备
    }

    //控制处理相关================================================

    //查询别人宠物相关内容=====================================================
    public showOtherPet: boolean = false;
    public otherPetInfo: PetInfo;
    public onS17028(data: S17028): void {
        if (this.showOtherPet) {
            this.showOtherPet = false;
            var info = new PetInfo;
            info.init17028(data);
            this.otherPetInfo = info;
            UIManager.instance.openUI(UIID.OTHER_PETINFO_PANEL, [info]);
        }
    }

    //查询别人伙伴相关内容=====================================================
    public showOtherComate: boolean = false;
    public otherComateInfo: ComateInfo;
    public onS37034(data: S37034): void {
        if (this.showOtherComate) {
            this.showOtherComate = false;
            var info: ComateInfo = new ComateInfo();
            info.init37034(data);
            this.otherComateInfo = info;
            UIManager.instance.openUI(UIID.OTHER_COMATE_PANEL, [info]);
        }
    }

    //查询别人装备相关内容=====================================================
    public showOtherEquip: boolean = false;
    public otherEquipInfo: ItemData;
    public onS15001(data: S15001): void {
        if (this.showOtherEquip) {
            this.showOtherEquip = false;
            var itemdata = new ItemData(data);
            this.otherEquipInfo = itemdata;
            ToolTipsManager.instance.directShow(ToolTipsOtherEquipment, itemdata)
        }
    }


}

export enum SOtherPlayerEvent {
}

