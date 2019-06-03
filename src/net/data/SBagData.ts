import { CommonControl } from "../../game/common/control/CommonControl";
import { ItemData } from "../../game/ui/compent/data/ItemData";
import { MsgRollTipsType } from "../../game/ui/compent/MsgRollTipsType";
import { FlyManager } from "../../game/ui/manager/FlyManager";
import { MsgManager } from "../../game/ui/manager/MsgManager";
import { EquipPackCache } from "../../game/ui/view/bag/cache/equipPackCache";
import { PetEquipCache } from "../../game/ui/view/bag/cache/PetEquipCache";
import { PropPackCache } from "../../game/ui/view/bag/cache/propPackCache";
import { RolePackCache } from "../../game/ui/view/bag/cache/RolePackCache";
import { DataManager } from "../../message/manager/DataManager";
import { S15000, S15001, S15022, S15030, S15060, S15061, S15073, S15031 } from "../pt/pt_15";
import { SGameData, SGameEvent } from "./SGameData";
import { SPetData, SPetEvent } from "./SPetData";
import { ToolTipsManager } from "../../game/ui/manager/ToolTipsManager";
import { Npc_goods_exchangeVo } from "../../db/sheet/vo/Npc_goods_exchangeVo";
import { SRoleData } from "./SRoleData";
import { SCopyData } from "./SCopyData";
import { SChaosBattleData } from "../../game/activity/data/SChaosBattleData";
import { ComateEquipCache } from "../../game/ui/view/bag/cache/ComateEquipCache";
import { SComateEvent, SComateData } from "../../game/ui/view/comate/data/SComateData";
import { MountEquipCache } from "../../game/ui/view/bag/cache/MountEquipCache";
import { SMountEvent, SMountData } from "./SmountData";
import { FabaoEquipCache } from "../../game/ui/view/bag/cache/FabaoEquipCache";

export class SBagData extends Laya.EventDispatcher {
    private static _instance: SBagData;
    public equip: EquipPackCache = new EquipPackCache();//装备背包缓存
    public prop: PropPackCache = new PropPackCache();//物品背包缓存
    public role: RolePackCache = new RolePackCache();//人物背包缓存
    public petEquip: PetEquipCache = new PetEquipCache();//宠物装备缓存
    public comateEquip: ComateEquipCache = new ComateEquipCache();//伙伴装备缓存
    public mountEquip: MountEquipCache = new MountEquipCache();//坐骑装备缓存
    public fabao: FabaoEquipCache = new FabaoEquipCache();//法宝装备缓存
    private itemList: Array<ItemData> = [];
    constructor() {
        super();
    }

    public static get instance(): SBagData {
        return SBagData._instance || (SBagData._instance = new SBagData());
    }

    public unRegisterEvent(): void {
        this.itemList = [];
        this.equip = null;
        this.prop = null;
        this.role = null;
        this.isSmelling = false;
        DataManager.cancel(PROTOCOL.E15022, this, this.onS15022);
        DataManager.cancel(PROTOCOL.E15060, this, this.onS15060);
        DataManager.cancel(PROTOCOL.E15061, this, this.onS15061);
        DataManager.cancel(PROTOCOL.E15001, this, this.onS15001);
        DataManager.cancel(PROTOCOL.E15000, this, this.onS15000);
        DataManager.cancel(PROTOCOL.E15073, this, this.onS15073);
        DataManager.cancel(PROTOCOL.E13010, this, this.onUpLevel);//玩家升级了
        DataManager.cancel(PROTOCOL.E15030, this, this.onS15030);//宠物装备
        DataManager.cancel(PROTOCOL.E15031, this, this.onS15031);//宠物装备
        SGameData.instance.off(SGameEvent.GAME_FIGHTREPORTSTATE, this, this.onUpdateFightState);
    }

    public registerEvent(): void {
        this.equip = new EquipPackCache();
        this.prop = new PropPackCache();
        this.role = new RolePackCache();
        DataManager.listen(PROTOCOL.E15022, this, this.onS15022);
        DataManager.listen(PROTOCOL.E15060, this, this.onS15060);
        DataManager.listen(PROTOCOL.E15061, this, this.onS15061);
        DataManager.listen(PROTOCOL.E15001, this, this.onS15001);
        DataManager.listen(PROTOCOL.E15000, this, this.onS15000);
        DataManager.listen(PROTOCOL.E15073, this, this.onS15073);
        DataManager.listen(PROTOCOL.E13010, this, this.onUpLevel);//玩家升级了
        DataManager.listen(PROTOCOL.E15030, this, this.onS15030);//宠物装备
        DataManager.listen(PROTOCOL.E15031, this, this.onS15031);//宠物装备
        SGameData.instance.on(SGameEvent.GAME_FIGHTREPORTSTATE, this, this.onUpdateFightState);
    }

    private onS15022(data: S15022): void {
        if (data.RetCode == 0) {
            if (data.Location == BagType.LOC_BAG_EQ) {
                this.equip.capacity = data.NewCapacity;
                this.equip.updateCapacity();
            }
            this.event(SGoodsEvent.GOODS_BUYCOUNT_SUCCEFUL);
            MsgManager.instance.showRollTipsMsg("成功扩展" + data.ExtendNum + "个格子！", MsgRollTipsType.msgRollTips2);
        }
    }

    private onS15000(data: S15000): void {
        switch (data.Location) {
            case BagType.LOC_TEMP:
                break;
            case BagType.LOC_BAG_EQ:
                this.equip.initBagData(data);
                break;
            case BagType.LOC_ACCESSORY:
                this.fabao.initBagData(data);
                break;
            case BagType.LOC_BAG_USABLE:
            case BagType.LOC_BAG_UNUSABLE:
                this.prop.initBagData(data, true);
                break;
            case BagType.LOC_PLAYER_EQP:
                this.role.initBagData(data);
                break;
            case BagType.LOC_PARTNER_EQP:
                this.petEquip.initData(data);
                SPetData.instance.event(SPetEvent.PET_EQUIP_REFRESH);
                break;
            case BagType.LOC_COMRADE_EQP:
                this.comateEquip.initData(data);
                SComateData.instance.event(SComateEvent.COMATE_EQUIP_REFRESH);
                break;
            case BagType.LOC_MOUNT_EQP:
                this.mountEquip.initData(data);
                SMountData.instance.event(SMountEvent.MOUNT_EQUIP_REFRESH);
                break;
            default:
                break;
        }
    }

    private onS15001(data: S15001): void {
        switch (data.Location) {
            case BagType.LOC_TEMP:
                break;
            case BagType.LOC_BAG_EQ:
                this.equip.updateBagData(data);
                break;
            case BagType.LOC_ACCESSORY:
                this.fabao.updateBagData(data);
                break;
            case BagType.LOC_BAG_USABLE:
            case BagType.LOC_BAG_UNUSABLE:
                this.prop.updateBagData(data);
                break;
            case BagType.LOC_PLAYER_EQP:
                this.role.updateBagData(data);
                break;
            default:
                break;
        }
        this.event(SGoodsEvent.GOODS_UPDATE);
    }


    //需要剔除的道具列表
    public hideItemNoList: number[] = [];
    //存储的数据列表
    public saveDateList: S15060[] = [];
    //存下来的道具，显示出来
    public showSaveItem(): void {
        for (let i = this.saveDateList.length - 1; i >= 0; i--) {
            var data = this.saveDateList[i];
            this.onS15060(data);
        }
        this.saveDateList = [];
    }

    private onS15060(data: S15060): void {
        //去掉隐藏列表里面的道具
        for (let i = this.hideItemNoList.length - 1; i >= 0; i--) {
            var itemNo = this.hideItemNoList[i];
            if (data.GoodsNo == itemNo) {
                this.hideItemNoList.splice(i, 1);
                this.saveDateList.push(data);
                return;
            }
        }
        var item: ItemData = new ItemData(data);
        switch (data.Location) {
            case BagType.LOC_TEMP:
                break;
            case BagType.LOC_BAG_EQ:
                this.equip.addItemData(data);
                if (SGameData.instance.PLAYFIGHTREPORT) {
                    this.itemList.push(item);
                    this.event(SGoodsEvent.GOODS_ADD, item);
                    return;
                }
                FlyManager.flyToBackPackByItem(item);
                break;
            case BagType.LOC_ACCESSORY:
                this.fabao.addItemData(data);
                if (SGameData.instance.PLAYFIGHTREPORT) {
                    this.itemList.push(item);
                    this.event(SGoodsEvent.GOODS_ADD, item);
                    return;
                }
                FlyManager.flyToBackPackByItem(item);
                break;
            case BagType.LOC_BAG_USABLE:
            case BagType.LOC_BAG_UNUSABLE:
                this.prop.addItemData(data);
                if (SGameData.instance.PLAYFIGHTREPORT) {
                    this.itemList.push(item);
                    this.event(SGoodsEvent.GOODS_ADD, item);
                    return;
                }
                FlyManager.flyToBackPackByItem(item);
                break;
            case BagType.LOC_PLAYER_EQP:
                this.role.addItemData(data);
                break;
            default:
                break;
        }
        this.event(SGoodsEvent.GOODS_ADD, item);
    }

    private onS15061(data: S15061): void {
        var item: ItemData;
        switch (data.Location) {
            case BagType.LOC_TEMP:
                break;
            case BagType.LOC_BAG_EQ:
                item = this.equip.getItemDataByGoodId(data.GoodsId);
                this.equip.deleteItem(data);
                break;
            case BagType.LOC_ACCESSORY:
                item = this.fabao.getItemDataByGoodId(data.GoodsId);
                this.fabao.deleteItem(data);
                break;
            case BagType.LOC_BAG_USABLE:
            case BagType.LOC_BAG_UNUSABLE:
                item = this.prop.getItemDataByGoodId(data.GoodsId);
                this.prop.deleteItem(data);
                break;
            case BagType.LOC_PLAYER_EQP:
                item = this.role.getItemDataByGoodId(data.GoodsId);
                this.role.deleteItem(data);
                break;
            case BagType.LOC_ACCESSORY:
                item = this.fabao.getItemDataByGoodId(data.GoodsId);
                this.equip.deleteItem(data);
                break;
            default:
                break;
        }
        this.event(SGoodsEvent.GOODS_REMOVE, item);
    }

    public isSmelling: boolean = false;
    private onS15073(data: S15073): void {
        this.isSmelling = false;
        this.equip.clearSmellList();
        this.event(SGoodsEvent.GOOD_SMELL_SUCCEFUL);
    }

    private onUpLevel(): void {
        this.equip && this.equip.updateGroupData();
    }

    private onUpdateFightState(): void {
        if (SGameData.instance.PLAYFIGHTREPORT == false) {
            for (let index = 0; index < this.itemList.length; index++) {
                var element = this.itemList[index];
                FlyManager.flyToBackPackByItem(element);
            }
            this.itemList.length = 0;
        }
    }

    private onS15030(data: S15030): void {
        if (data.Type == 1 && data.PartnerId > 0) {
            CommonControl.instance.onGoodsCheckStroage(BagType.LOC_PARTNER_EQP, data.PartnerId, data.Type);//请求宠物装备
        } else if (data.Type == 2) {
            CommonControl.instance.onGoodsCheckStroage(BagType.LOC_COMRADE_EQP, data.PartnerId, 2);//请求伙伴装备
        } else if (data.Type == 3) {
            CommonControl.instance.onGoodsCheckStroage(BagType.LOC_MOUNT_EQP, 0, 3);//请求坐骑装备
        }
    }

    private onS15031(data: S15031): void {
        if (data.Type == 1 && data.PartnerId > 0) {
            CommonControl.instance.onGoodsCheckStroage(BagType.LOC_PARTNER_EQP, data.PartnerId);//请求宠物装备
        } else if (data.Type == 2) {
            CommonControl.instance.onGoodsCheckStroage(BagType.LOC_COMRADE_EQP, data.PartnerId, 2);//请求伙伴装备
        } else if (data.Type == 3) {
            CommonControl.instance.onGoodsCheckStroage(BagType.LOC_MOUNT_EQP, 0, 3);//请求坐骑装备
        }
    }

    /**
     * 使用物品
     * @private
     */
    public useItemCheck(itemData: ItemData, Count: number): void {
        if (itemData.IsBaotu) {
            //是藏宝图类型
            if (SGameData.instance.PLAYFIGHTREPORT) {
                MsgManager.instance.showRollTipsMsg("战斗中无法使用该道具");
            } else if (SCopyData.instance.isInCopy) {
                MsgManager.instance.showRollTipsMsg("副本中无法进行该操作");
            }
            else if (SChaosBattleData.instance.isChaoScene()) {
                MsgManager.instance.showRollTipsMsg("欢乐大乱斗中无法进行该操作");
            }
            else if (SRoleData.instance.info.TeamId != 0) {
                MsgManager.instance.showRollTipsMsg("队伍状态无法进行该操作");
            } else {
                SRoleData.instance.isWabaoing = true;
                UIManager.instance.openUI(UIID.WABAO_ACTION_PANEL, [itemData]);
                UIManager.instance.closeUI(UIID.SYS_BAG);
                ToolTipsManager.instance.hide();
            }
        } else if (itemData.clientInfo.actionType == 8) {
            //NPC兑换
            var goodEnough: boolean = true;
            var changeCfg = Npc_goods_exchangeVo.get(itemData.clientInfo.action);
            var useItems = changeCfg.need_goods_list;
            for (let i = 0; i < useItems.length; i++) {
                var useItem = useItems[i];
                goodEnough = goodEnough && (this.prop.getItemCountByGoodsNo(useItem[0]) >= useItem[1]);
            }
            if (goodEnough) {
                CommonControl.instance.send32010(itemData.clientInfo.action);
            } else {
                MsgManager.instance.showRollTipsMsg(changeCfg.tips);
            }

        } else {
            //正常使用道具
            CommonControl.instance.send15049(itemData.serverInfo.GoodsId, Count);
        }
    }

}

export enum SGoodsEvent {
    GOODS_CHECK_STROAGE = "goods_check_stroage",//查询容易物品列表
    GOODS_ADD = "goods_add",//新增物品
    GOODS_UPDATE = "goods_update",//已有物品刷新
    GOODS_REMOVE = "goods_remove",//物品移除
    EQUIP_INSTALL = "equip_install",//穿装备
    EQUIP_UNINSTALL = "equip_uninstall",//脱装备
    GOODS_USE = "goods_use",//使用物品
    G00D_SMELL = "goods_smell",//熔炼装备
    GOODS_BUY = "goods_buy",//购买物品
    GOOD_SMELL_SUCCEFUL = "goods_smell_succeful",//熔炼成功
    GOODS_REQUEST_BUYCOUNT = "goods_request_buyCount",//申请购买背包格子
    GOODS_BUYCOUNT_SUCCEFUL = "goods_buyCount_succeful",//购买背包格子成功
    GOODS_BUY_SUCCEFUL = "goods_buy_succeful",//购买成功
}