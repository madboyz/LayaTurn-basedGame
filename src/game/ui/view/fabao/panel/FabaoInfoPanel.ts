import { DataManager } from "../../../../../message/manager/DataManager";
import { SBagData, SGoodsEvent } from "../../../../../net/data/SBagData";
import { SRoleData } from "../../../../../net/data/SRoleData";
import { S15030, S15031 } from "../../../../../net/pt/pt_15";
import { CommonControl } from "../../../../common/control/CommonControl";
import { DisplayUtils } from "../../../../utils/DisplayUtils";
import { ItemData } from "../../../compent/data/ItemData";
import { ToolTipsEquipment } from "../../../compent/ToolTipsEquipment";
import { MsgManager } from "../../../manager/MsgManager";
import { RolePackCache } from "../../bag/cache/RolePackCache";
import { RoleFabaoItem } from "./RoleFabaoItem";
import { RedDotType } from "../../../../redDot/RedDotList";
import { RedDotManager } from "../../../../redDot/RedDotManager";

export class FabaoInfoPanel extends ui.main.FabaoInfoPanelUI {
    constructor() {
        super();
        this.initComp();
    }

    public initComp() {
        this.initEvent();
        this.initList();
        this.combat.url = "res/atlas/number/fight.atlas";
        this.open();
    }

    private initList(): void {
        this.initEquip();
    }

    public open(): void {
        this.createEquipList();
        this.updateData();
    }

    public initEvent(): void {
        this.btn_look.on(Laya.Event.CLICK, this, this.onLookProp);
        this.btn_changeEquip.on(Laya.Event.CLICK, this, this.onChangeEquip);

        RedDotManager.instance.on(RedDotType.RDFB, this, this.showRed);

        DataManager.listen(PROTOCOL.E15030, this, this.onS15030);
        DataManager.listen(PROTOCOL.E15031, this, this.onS15031);
        SBagData.instance.on(SGoodsEvent.GOODS_UPDATE, this, this.updateData);
        SBagData.instance.on(SGoodsEvent.GOODS_REMOVE, this, this.updateData);
        SBagData.instance.on(SGoodsEvent.GOODS_ADD, this, this.updateData);
    }
    public removeEvent(): void {
        this.btn_look.off(Laya.Event.CLICK, this, this.onLookProp);
        this.btn_changeEquip.off(Laya.Event.CLICK, this, this.onChangeEquip);

        DataManager.cancel(PROTOCOL.E15030, this, this.onS15030);
        DataManager.cancel(PROTOCOL.E15031, this, this.onS15031);
        
        RedDotManager.instance.on(RedDotType.RDFB, this, this.showRed);

        SBagData.instance.off(SGoodsEvent.GOODS_UPDATE, this, this.updateData);
        SBagData.instance.off(SGoodsEvent.GOODS_REMOVE, this, this.updateData);
        SBagData.instance.off(SGoodsEvent.GOODS_ADD, this, this.updateData);
    }

    private onS15030(data: S15030): void {
        if (data.PartnerId > 0) {
            return;
        }
        this.updateData();
    }

    private onS15031(data: S15031): void {
        if (data.PartnerId > 0) {
            return;
        }
        this.updateData();
    }


    public updateData(): void {
        //战力
        this.combat.text = SRoleData.instance.info.BattlePower.toString();
        //更新装备
        this.updateAllEquip();

        this.showRed();
    }
    
    public showRed():void{
        this.btn_changeEquip.refreshRed(RedDotManager.instance.GetRD(RedDotType.RDFabao)._isActiveSave);
    }

    public onLookProp(): void {
        UIManager.instance.openUI(UIID.SYS_LOOKPROP, [SRoleData.instance.info]);
    }


    private onChangeEquip(): void {
        var noEquioType = [];
        for (let i = EquipSubType.EQ_JEWELRT_RING; i <= EquipSubType.EQ_JEWELRT_PENDANT; i++) {
            noEquioType.push(i);
        }
        var equipList: ItemData[] = SBagData.instance.role.allItems;
        for (let i = 0; i < equipList.length; i++) {
            const element = equipList[i];
            var typeIndex = noEquioType.indexOf(element.equipPos);
            if (typeIndex >= 0) {
                noEquioType.splice(typeIndex, 1);
            }

        }
        var arr: Array<ItemData> = SBagData.instance.fabao.equipList;
        if (arr.length > 0) {
            for (let index = 0; index < arr.length; index++) {
                const element = arr[index];
                if (noEquioType.indexOf(element.equipPos) >= 0) {
                    CommonControl.instance.onEquipInstall(element.GoodsId);
                }
            }
        }


        // var arr: Array<ItemData> = SBagData.instance.fabao.equipList;
        // if (arr.length > 0) {
        //     for (let index = 0; index < arr.length; index++) {
        //         const element = arr[index];
        //         CommonControl.instance.onEquipInstall(element.GoodsId);
        //     }
        // }
        // else {
        //     MsgManager.instance.showRollTipsMsg("没有装备可穿戴");
        // }
    }

    public destroy(): void {
        this.removeEvent();
        super.destroy();
    }

    //处理装备部分====================================================================
    protected _equipmentList: Array<any>;
    protected _equipTypeList: Array<any>;

    public initEquip(): void {
        var leftX: number = 0;
        var rightX: number = 355;
        this._equipTypeList = [];
        this._equipTypeList[EquipSubType.EQ_POS1] = { x: 342, y: 222, type: EquipSubType.EQ_JEWELRT_RING }; //戒指
        this._equipTypeList[EquipSubType.EQ_POS3] = { x: 430, y: 350, type: EquipSubType.EQ_JEWELRT_BRACERS }; //护腕
        this._equipTypeList[EquipSubType.EQ_POS5] = { x: 386, y: 502, type: EquipSubType.EQ_JEWELRT_CLOAK }; //披风

        this._equipTypeList[EquipSubType.EQ_POS2] = { x: 120, y: 502, type: EquipSubType.EQ_JEWELRT_MASK }; //面具
        this._equipTypeList[EquipSubType.EQ_POS4] = { x: 76, y: 349, type: EquipSubType.EQ_JEWELRT_HEADDRESS }; //头饰
        this._equipTypeList[EquipSubType.EQ_POS6] = { x: 165, y: 222, type: EquipSubType.EQ_JEWELRT_PENDANT }; //挂件

    }

    public createEquipList(): void {
        this._equipmentList = [];

        var len: number = this._equipTypeList.length;
        var equipItem: RoleFabaoItem;
        for (var i: number = 1; i < len; i++) {
            equipItem = new RoleFabaoItem();
            equipItem.setItemStyle(70);
            equipItem.x = this._equipTypeList[i].x;
            equipItem.y = this._equipTypeList[i].y;
            equipItem.type = this._equipTypeList[i].type;
            equipItem.isShowJob = false;
            this.addChild(equipItem);
            this._equipmentList.push(equipItem);
        }
    }

    //更新装备数据
    public updateAllEquip(): void {
        var len: number = this._equipmentList.length;
        var item: RoleFabaoItem;
        var goods: ItemData;
        var roleEquipdata: RolePackCache;
        roleEquipdata = SBagData.instance.role;
        for (var i: number = 0; i < len; i++)  //i代表类型
        {
            item = this._equipmentList[i];
            if (item) {
                if (roleEquipdata) {
                    goods = roleEquipdata.getItemBySubType(item.type);
                    if (goods) {
                        if (goods.clientInfo) {
                            item.itemData = goods;
                            // item.showName("Lv." + goods.clientInfo.lv , 18, "#76420b");
                            item.renderClass = ToolTipsEquipment;
                            item.toolTipData = goods;
                            //强化，精炼等级不要了
                            // this.updateStrength(item);
                            // this.updateRefine(item);
                            item.updateRed();
                        }
                        else {
                            item.itemData = null;
                            item.clearData();
                        }
                    }
                    else {
                        item.itemData = null;
                        item.clearData();
                        item.updateRed();
                    }
                }
                else {
                    // item.itemData = null;
                    item.clearData();
                }
            }
        }
    }

    public dispose(): void {
        DisplayUtils.removeArray(this._equipmentList);
        DisplayUtils.removeArray(this._equipTypeList);
        this.removeSelf();
    }

}
