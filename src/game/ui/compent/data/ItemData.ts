import { GoodsVo } from './../../../../db/sheet/vo/GoodsVo';
import { Goods_effectVo } from '../../../../db/sheet/vo/Goods_effectVo';
import { Attribute } from '../../../property/RoleProperty';
import { ConstVo } from '../../../../db/sheet/vo/ConstVo';
import { SRoleData } from '../../../../net/data/SRoleData';
import { FactionVo } from '../../../../db/sheet/vo/FactionVo';
import { S15001_1 } from '../../../../net/pt/pt_15';

export class ItemData {
    private _clientInfo: GoodsVo;
    private _severInfo: any;
    private _showNum: number;
    public AllAttr: Laya.Dictionary = null;//GoodsAttrType类别区分
    public askedInfo: boolean = false;//这个item已经向后端请求数据了
    constructor(info: any) {
        if (isNaN(info)) {
            this.data = info;
        }
        else {
            this._severInfo = {};
            this._severInfo.GoodsNo = info;
            this.data = this._severInfo;
        }
    }

    public set data(value: any) {
        // 服务器数据
        this._severInfo = value;
        // 配置数据
        this._clientInfo = GoodsVo.get(value.GoodsNo);
    }

    /**
	 * 服务器数据 
	 */
    public get serverInfo(): any {
        return this._severInfo;
    }

    /**
	 * @private
	 */
    public set serverInfo(value: any) {
        this._severInfo = value;
    }

    /**
     * 配置数据 (客户端数据)
     */
    public get clientInfo(): GoodsVo {
        return this._clientInfo;
    }

    public get GoodsNo(): number {
        return this.clientInfo.no;
    }

    /**
     * 装备唯一id 只有装备有唯一id
     * @readonly
     * @type {Number}
     * @memberof ItemData
     */
    public get GoodsId(): number {
        return this.serverInfo.GoodsId;
    }

    public get Count(): number {
        if (this._severInfo) {
            return this._severInfo.Count;
        }
        else {
            return -1;
        }
    }

    /**
     * 设置数量，服务端的数量
     * @memberof ItemData
     */
    public set Count(amount: number) {
        this._severInfo.Count = amount;
    }

    public get showNum(): number {
        return this._showNum;
    }

    /**
     * 设置显示数量
     * @memberof ItemData
     */
    public set showNum(amount: number) {
        this._showNum = amount;
    }

    /**
     * 是否是武器
     * @readonly
     * @type {boolean}
     * @memberof ItemData
     */
    public get isWeapon(): boolean {
        return this.equipPos == EquipSubType.EQ_POS3 ? true : false;
    }

    /**
     * 是否为装备
     */
    public get IsEquip(): boolean {
        if (this.clientInfo == null)
            return false;
        else
            return (this.IsRoleEquip || this.IsOtherEquip);
    }

    /**
     * 是否为人物装备
     */
    public get IsRoleEquip(): boolean {
        if (this.clientInfo == null)
            return false;
        else
            return this.clientInfo.type == GoodsType.EQUIP;
    }

    /**
     * 是否为其他装备（宠物和伙伴）
     */
    public get IsOtherEquip(): boolean {
        if (this.clientInfo == null)
            return false;
        else
            return this.clientInfo.type == GoodsType.PET_EQUIP || this.clientInfo.type == GoodsType.COMATE_EQUIP
                || this.clientInfo.type == GoodsType.MOUNT_EQUIP;
    }

    /**
     * 是否为宠物装备
     */
    public get IsPetEquip(): boolean {
        if (this.clientInfo == null)
            return false;
        else
            return this.clientInfo.type == GoodsType.PET_EQUIP;
    }

    /**
     * 是否为伙伴装备
     */
    public get IsComateEquip(): boolean {
        if (this.clientInfo == null)
            return false;
        else
            return this.clientInfo.type == GoodsType.COMATE_EQUIP;
    }

    /**
     * 是否为坐骑装备
     */
    public get IsMountEquip(): boolean {
        if (this.clientInfo == null)
            return false;
        else
            return this.clientInfo.type == GoodsType.MOUNT_EQUIP;
    }

    /**
     * 
     */
    public get equipTypeName(): string {
        if (this.IsPetEquip) {
            return "兽灵";
        } else if (this.IsComateEquip) {
            return "突破";
        } else if (this.IsMountEquip) {
            return "变异";
        }
    }
    public get equipImageUrl(): string {
        if (this.IsPetEquip) {
            return "img_pet";
        } else if (this.IsComateEquip) {
            return "img_comate";
        } else if (this.IsMountEquip) {
            return "img_mount";
        };
    }


    /**
     * 是否为坐骑激活道具
     */
    public get IsMount(): boolean {
        if (this.clientInfo == null) {
            return false;
        } else {
            return this.clientInfo.type == GoodsType.RIDE_GOODS && (this.clientInfo.effects && this.clientInfo.effects.length > 0);
        }
    }

    /**
     * 是否为宝图
     */
    public get IsBaotu(): boolean {
        if (this.clientInfo == null)
            return false;
        else
            return this.clientInfo.type == GoodsType.ROLE_GOODS && this.clientInfo.subtype == RoleGoodsSubType.ROLE_CONSUME_T_TREASURE
    }

    public get IsPetSkill(): boolean {
        if (this.clientInfo == null)
            return false;
        else
            return this.clientInfo.type == GoodsType.PET_GOODS && this.clientInfo.subtype == PetGoodsSubType.PARTNER_PROP_T_SKILL_BOOK;
    }

    /**
     * 是否本国家本门派装备
     * @readonly
     * @type {boolean}
     * @memberof ItemData
     */
    public get isJobEquip(): boolean {
        if (SRoleData.instance.info) {
            if (this.clientInfo.faction == SRoleData.instance.info.Faction && this.clientInfo.race == SRoleData.instance.info.Race) {
                return true;
            }
            if (this.clientInfo.faction == SRoleData.instance.info.Faction && this.clientInfo.race == 0) {
                return true;
            }
            if (this.clientInfo.race == SRoleData.instance.info.Race && this.clientInfo.faction == 0) {
                return true;
            }
            if (this.clientInfo.race == 0 && this.clientInfo.faction == 0) {
                return true;
            }
        }
        return false;
    }

    /**
     * 是否推荐熔炼
     * @readonly
     * @type {boolean}
     * @memberof ItemData
     */
    public get isPushSmell(): boolean {
        var vo: ConstVo = ConstVo.get("NOT_PROPOSAL_DECOMPOSE_QUALITY");
        if (this.serverInfo.Quality <= vo.val)//是否大于不推荐分解的品质
        {
            return true;
        }
        return false;
    }
    /**
     * 是否为时装
     */
    public get IsFashion(): boolean {
        if (this.clientInfo == null)
            return false;
        if (!this.IsEquip)
            return false;
        return this.clientInfo.subtype >= EquipSubType.EQ_POS7 && this.clientInfo.subtype <= EquipSubType.EQ_POS9;
    }
    /**
     * 是否为法宝
     */
    public get IsMagicKey(): boolean {
        if (this.clientInfo == null)
            return false;
        if (!this.IsEquip)
            return false;
        return this.clientInfo.subtype == EquipSubType.EQ_MAGIC_KEY1;
    }

    /**
     * 是否为配饰
     */
    public get IsJewelry(): boolean {
        if (this.clientInfo == null)
            return false;
        if (!this.IsEquip)
            return false;
        return this.clientInfo.subtype >= EquipSubType.EQ_JEWELRT_RING && this.clientInfo.subtype <= EquipSubType.EQ_JEWELRT_PENDANT;
    }

    public get factionDesc(): string {
        var vo = FactionVo.get(this.clientInfo.faction);
        if (!vo || (vo && !vo.no)) return "通用";
        return vo.introductions;
    }

    /**
     * 道具类型名称
     */
    public get TypeDesc(): string {
        var name = "物品";
        if (this.clientInfo != null) {
            switch (this.clientInfo.type) {
                case GoodsType.EQUIP:
                    name = "装备";
                    break;
                case GoodsType.ROLE_GOODS:
                    name = "角色消耗品";
                    break;
                case GoodsType.EQUIP_GOODS:
                    name = "装备消耗品";
                    break;
                case GoodsType.PET_GOODS:
                    name = "宠物道具";
                    break;
                case GoodsType.RIDE_GOODS:
                    name = "坐骑道具";
                    break;
                case GoodsType.TASK_GOODS:
                    name = "任务道具";
                    break;
                case GoodsType.METHOD_GOODS:
                    name = "功能道具";
                    break;
                case GoodsType.ACTIVE_GOODS:
                    name = "活动道具";
                    break;
                case GoodsType.VOID_GOODS:
                    name = "虚拟道具";
                    break;
                case GoodsType.PET_EQUIP:
                    name = "宠物装备";
                    break;
                case GoodsType.AUTO_GOODS:
                    name = "自动使用道具";
                    break;
            }
        }
        return name;
    }
    /**
     * 物品子类型名称根据具体道具主类型区分子类型
     */
    public get SubTypeDes(): string {
        var name = "物品";
        if (this.clientInfo != null) {
            if (this.IsRoleEquip) {
                switch (this.equipPos) {
                    case EquipSubType.EQ_POS1:
                        name = "项链";
                        break;
                    case EquipSubType.EQ_POS2:
                        name = "护腕";
                        break;
                    case EquipSubType.EQ_POS3:
                        name = "武器";
                        break;
                    case EquipSubType.EQ_POS4:
                        name = "铠甲";
                        break;
                    case EquipSubType.EQ_POS5:
                        name = "腰带";
                        break;
                    case EquipSubType.EQ_POS6:
                        name = "靴子";
                        break;

                    case EquipSubType.EQ_POS7:
                        name = "时装：头部";
                        break;
                    case EquipSubType.EQ_POS8:
                        name = "时装：身体";
                        break;
                    case EquipSubType.EQ_POS9:
                        name = "时装：背部";
                        break;

                    case EquipSubType.EQ_MAGIC_KEY1:
                        name = "法宝";
                        break;

                    case EquipSubType.EQ_JEWELRT_RING:
                        name = "戒指";
                        break;
                    case EquipSubType.EQ_JEWELRT_BRACERS:
                        name = "护腕";
                        break;
                    case EquipSubType.EQ_JEWELRT_CLOAK:
                        name = "披风";
                        break;
                    case EquipSubType.EQ_JEWELRT_MASK:
                        name = "面具";
                        break;
                    case EquipSubType.EQ_JEWELRT_HEADDRESS:
                        name = "头饰";
                        break;
                    case EquipSubType.EQ_JEWELRT_PENDANT:
                        name = "挂件";
                        break;
                }
            }
            else {
                switch (this.clientInfo.type) {
                    case GoodsType.ROLE_GOODS:
                        {
                            switch (this.clientInfo.subtype) {
                                case RoleGoodsSubType.ROLE_CONSUME_T_DRUG:
                                    name = "药品";
                                    break;
                                case RoleGoodsSubType.ROLE_CONSUME_T_TRUCK:
                                    name = "杂物";
                                    break;
                                case RoleGoodsSubType.ROLE_CONSUME_T_TREASURE:
                                    name = "藏宝图";
                                    break;
                                case RoleGoodsSubType.ROLE_CONSUME_T_CARD:
                                    name = "属性卡";
                                    break;
                            }
                            break;
                        }
                    case GoodsType.EQUIP_GOODS:
                        {
                            switch (this.clientInfo.subtype) {
                                case EquipGoodsSubType.EQ_CONSUME_T_MINERAL:
                                    name = "矿石";
                                    break;
                                case EquipGoodsSubType.EQ_CONSUME_T_GEM:
                                    name = "宝石";
                                    break;
                                case EquipGoodsSubType.EQ_CONSUME_T_STRENGTHEN:
                                    name = "强化石";
                                    break;
                                case EquipGoodsSubType.EQ_CONSUME_T_OTHER:
                                    name = "其他材料";
                                    break;
                            }
                            break;
                        }
                    case GoodsType.PET_GOODS:
                        {
                            switch (this.clientInfo.subtype) {
                                case PetGoodsSubType.PARTNER_PROP_T_CONSUME:
                                    name = "宠物消耗品";
                                    break;
                                case PetGoodsSubType.PARTNER_PROP_T_SKILL_BOOK:
                                    name = "宠物技能书";
                                    break;
                                case PetGoodsSubType.PARTNER_PROP_T_OTHER_BOOK:
                                    name = "其他书籍";
                                    break;
                                case PetGoodsSubType.PARTNER_PROP_T_BOTTLE:
                                    name = "宠物蛋";
                                    break;
                            }
                            break;
                        }
                    case GoodsType.PET_EQUIP:
                        {
                            switch (this.clientInfo.subtype) {
                                case PetEquipSubType.PEQP_T_NECKLACE:
                                    name = "项圈";
                                    break;
                                case PetEquipSubType.PEQP_T_AMULET:
                                    name = "护符";
                                    break;
                                case PetEquipSubType.PEQP_T_ARMOR:
                                    name = "护甲";
                                    break;
                            }
                            break;
                        }
                    case GoodsType.COMATE_EQUIP:
                        {
                            switch (this.clientInfo.subtype) {
                                case ComateEquipSubType.CEQP_T_NECKLACE:
                                    name = "项圈";
                                    break;
                                case ComateEquipSubType.CEQP_T_AMULET:
                                    name = "护符";
                                    break;
                                case ComateEquipSubType.CEQP_T_ARMOR:
                                    name = "护甲";
                                    break;
                            }
                            break;
                        }
                }
            }
        }
        return name;
    }

    /**
     * 装备部位
     * @readonly
     * @type {number}
     * @memberof ItemData
     */
    public get equipPos(): number {
        var pos: number;
        switch (this.clientInfo.subtype) {
            case GOODS_T_EQUIP.EQP_T_LONGSWORD:
            case GOODS_T_EQUIP.EQP_T_WHIP:
            case GOODS_T_EQUIP.EQP_T_BLADE:
            case GOODS_T_EQUIP.EQP_T_HOOP:
            case GOODS_T_EQUIP.EQP_T_FAN:
            case GOODS_T_EQUIP.EQP_T_WAND:
                pos = EquipSubType.EQ_POS3;//武器
                break;
            case GOODS_T_EQUIP.EQP_T_BRACER:
                pos = EquipSubType.EQ_POS2;//护腕
                break;
            case GOODS_T_EQUIP.EQP_T_BARDE:
                pos = EquipSubType.EQ_POS4;//衣服
                break;
            case GOODS_T_EQUIP.EQP_T_SHOES:
                pos = EquipSubType.EQ_POS6;//鞋子
                break;
            case GOODS_T_EQUIP.EQP_T_NECKLACE:
                pos = EquipSubType.EQ_POS1;//项链
                break;
            case GOODS_T_EQUIP.EQP_T_WAISTBAND:
                pos = EquipSubType.EQ_POS5;//腰带
                break;
            case GOODS_T_EQUIP.EQP_T_HEADWEAR:
                pos = EquipSubType.EQ_POS7;//头部
                break;
            case GOODS_T_EQUIP.EQP_T_CLOTHES:
                pos = EquipSubType.EQ_POS8;//身体
                break;
            case GOODS_T_EQUIP.EQP_T_BACKWEAR:
                pos = EquipSubType.EQ_POS9;//背部
                break;
            case GOODS_T_EQUIP.EQP_T_MAGIC_KEY:
                pos = EquipSubType.EQ_MAGIC_KEY1;//法宝
                break;
            case GOODS_T_EQUIP.EQP_T_RING:
                pos = EquipSubType.EQ_JEWELRT_RING;//戒指
                break;
            case GOODS_T_EQUIP.EQP_T_BRACERS:
                pos = EquipSubType.EQ_JEWELRT_BRACERS;//护腕
                break;
            case GOODS_T_EQUIP.EQP_T_CLOAK:
                pos = EquipSubType.EQ_JEWELRT_CLOAK;//披风
                break;
            case GOODS_T_EQUIP.EQP_T_MASK:
                pos = EquipSubType.EQ_JEWELRT_MASK;//面具
                break;
            case GOODS_T_EQUIP.EQP_T_HEADDRESS:
                pos = EquipSubType.EQ_JEWELRT_HEADDRESS;//头饰
                break;
            case GOODS_T_EQUIP.EQP_T_PENDANT:
                pos = EquipSubType.EQ_JEWELRT_PENDANT;//挂件
                break;
            default:
                break;
        }
        return pos;
    }

    public get slot(): number {
        var pos: number;
        switch (this.equipPos) {
            case EquipSubType.EQ_POS3:
                pos = EquipSubType.EQ_POS3;//武器
                break;
            case EquipSubType.EQ_POS4:
                pos = EquipSubType.EQ_POS4;//衣服
                break;
            case EquipSubType.EQ_POS6:
                pos = EquipSubType.EQ_POS6;//鞋子
                break;
            case EquipSubType.EQ_POS1:
                pos = EquipSubType.EQ_POS1;//项链
                break;
            case EquipSubType.EQ_POS5:
                pos = EquipSubType.EQ_POS5;//腰带
                break;
            case EquipSubType.EQ_POS2:
                pos = EquipSubType.EQ_POS2;//头部
                break;
            default:
                break;
        }
        return pos;
    }

    /**
     * 物品效果描述（装备=属性描述 宝石= 属性描述或者技能效果描述）
     */
    public get EffectDesc(): string {
        var str = "";
        if (this.clientInfo.effects != null && this.clientInfo.effects instanceof Array && this.clientInfo.effects.length > 0) {
            var effects: Array<number> = this.clientInfo.effects as Array<number>;
            var vo = Goods_effectVo.get(effects[0])
            str = vo.desc;
        }
        return str;
    }

    public get effectValue(): number {
        var value = 0;
        if (this.clientInfo.effects != null && this.clientInfo.effects instanceof Array && this.clientInfo.effects.length > 0) {
            var effects: Array<number> = this.clientInfo.effects as Array<number>;
            var vo = Goods_effectVo.get(effects[0])
            value = vo.para;
        }
        return value;
    }

    public UpdateAttr(datas: any[]) {
        if (datas.length == 0)
            return;
        // if (this.AllAttr == null) {
        this.AllAttr = new Laya.Dictionary();
        // }
        //先把基础属性放进去
        for (let i = 0; i < datas.length; i++) {
            var data = datas[i] as S15001_1;
            if (data.InfoType == GoodsAttrType.BASIC) {
                var attrs: Laya.Dictionary = this.AllAttr.get(data.InfoType);
                if (attrs == null) {
                    attrs = new Laya.Dictionary();
                    this.AllAttr.set(data.InfoType, attrs)
                }
                var attr: Attribute = attrs.get(data.ObjInfoCode);
                if (attr == null) {
                    attr = new Attribute(data.ObjInfoCode, data.Value);
                    attrs.set(data.ObjInfoCode, attr);
                }
            }
            if (data.InfoType == GoodsAttrType.BAOTU) {//其他属性设置
                var ObjInfoCodeList: Laya.Dictionary = this.AllAttr.get(data.InfoType);
                if (ObjInfoCodeList == null) {
                    ObjInfoCodeList = new Laya.Dictionary();
                    this.AllAttr.set(data.InfoType, ObjInfoCodeList)
                }
                var ObjInfoCodeValue: number = ObjInfoCodeList.get(data.ObjInfoCode);
                if (ObjInfoCodeValue == null) {
                    ObjInfoCodeValue = data.Value;
                    ObjInfoCodeList.set(data.ObjInfoCode, ObjInfoCodeValue);
                }
            }

        }
        //把相关属性放进去，因为要显示单纯强化的属性，但是服务端发过来是基础+强化，这边减掉存进去(服务端又改了)
        for (let i = 0; i < datas.length; i++) {
            var data = datas[i] as S15001_1;
            if ((data.InfoType == GoodsAttrType.STR) || (data.InfoType == GoodsAttrType.KA) || (data.InfoType == GoodsAttrType.RE)) {
                var attrs: Laya.Dictionary = this.AllAttr.get(data.InfoType);
                if (attrs == null) {
                    attrs = new Laya.Dictionary();
                    this.AllAttr.set(data.InfoType, attrs)
                }
                var attr: Attribute = attrs.get(data.ObjInfoCode);
                if (attr == null) {
                    // var baseAttrNum = (this.AllAttr.get(GoodsAttrType.BASIC).get(data.ObjInfoCode) as Attribute).value;
                    attr = new Attribute(data.ObjInfoCode, (data.Value /**- baseAttrNum*/));
                    attrs.set(data.ObjInfoCode, attr);
                }
            }
        }
    }

    /**
     * 获得某个类型的属性
     * @param {number} type
     * @returns {Array<Attribute>}
     * @memberof ItemData
     */
    public getTypeAtrrList(type: number): Array<Attribute> {
        if (this.AllAttr && this.AllAttr.get(type)) {
            return this.AllAttr.get(type).values;
        }
        return null;
    }
}