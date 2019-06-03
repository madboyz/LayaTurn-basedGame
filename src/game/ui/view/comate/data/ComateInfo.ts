import { Comate_cfgVo } from "../../../../../db/sheet/vo/Comate_cfgVo";
import { ConstVo } from "../../../../../db/sheet/vo/ConstVo";
import { SBagData } from "../../../../../net/data/SBagData";
import { SRoleData } from "../../../../../net/data/SRoleData";
import { S37001_3, S37001_4, S37019, S37034_5, S37034 } from "../../../../../net/pt/pt_37";
import { PropertyEnumCode } from "../../../../property/RoleProperty";
import { MinggeInfo } from "./MinggeInfo";

export class ComateInfo {
    public BaseAttribute: Laya.Dictionary = new Laya.Dictionary();
    public AddPoint: Laya.Dictionary = new Laya.Dictionary();//已分配点数在Talent_XXX中
    public TalentPoint: number = 0;
    public No: number = 0;
    public Id: number = 0;;
    public StarLv: number = 0;
    public StarSoul: number = 0;
    public BreakLv: number = 0;//突破等级
    public BreakExp: number = 0;//突破经验
    public SpiritLv: number = 0;//元神等级
    public SpiritExp: number = 0;//元神经验
    public item_3: S37001_3[] = [];//元神技能
    public _item_4: S37001_4[] = [];//妖丹列表
    public Pos: number = 0;
    public Sheet: Comate_cfgVo;
    public otherEquip:S37034_5[] = [];//别人的信息时候，存放的装备列表(因为自己的请求时，装备是放在专门的数据存起来的，所以别人的另外处理);

    // public SpiritLv:any = 0;
    // public SpiritExp:any = 0;
    // public Exp:any = 0;
    // public PartnerId:any = 0;

    /**
     * 是否获得
     */
    public get IsHave(): boolean {
        return this.Id > 0;
    }
    /**
     * 是否上阵
     */
    public get IsSet(): boolean {
        return this.Pos > 0;
    }

    public getBaseAttributeValue(key): number {
        return this.BaseAttribute.get(key);
    }
    /**
     * 已经分配的所有点数
     */
    public get UsePoint(): number {
        var Totalpoint = 0;
        for (let i = 0; i < this.AddPoint.values.length; i++) {
            const point = this.AddPoint.values[i];
            Totalpoint += point;
        }
        return Totalpoint;
    }

    public get canActive(): boolean {
        var costData = this.Sheet.unlock_condition[0];
        if (costData[1] == null) {
            return false;
        }
        var goodsId = costData[0];
        var goodsNum = costData[1];
        var num = SBagData.instance.prop.getItemCountByGoodsNo(goodsId);
        if (num >= goodsNum) {
            return true;
        }
        return false;
    }


    /**
     * 是否可以升级
     * @readonly
     * @type {boolean}
     * @memberof PetInfo
     */
    public get canLevel(): boolean {
        if (this.IsHave && this.IsSet) {
            var nowLv = this.getBaseAttributeValue(PropertyEnumCode.OI_CODE_lv) || 1;
            if (nowLv < SRoleData.instance.info.Lv) {
                var goodsId = ConstVo.get("GAME_COMRADE_GOODS_TO_EXP").val[0];
                var num = SBagData.instance.prop.getItemCountByGoodsNo(goodsId);
                return num > 0;
            }
        }
        return false;
    }

    public get BattlePower(): number {
        return this.BaseAttribute.get(PropertyEnumCode.OI_CODE_BATTLE_POWER);
    }

    public get Lv(): number {
        return this.BaseAttribute.get(PropertyEnumCode.OI_CODE_lv);
    }

    //命格相关-----------
    public minggeTypeList: MinggeInfo[];//命格根据类型信息
    public minggeHoleList: MinggeInfo[];//命格根据位置信息
    public set item_4(value: S37001_4[]) {
        this._item_4 = value;
        this.minggeTypeList = [];
        this.minggeHoleList = [];
        for (let i = 0; i < value.length; i++) {
            var info = new MinggeInfo(value[i], value[i].HoleNo);
            this.minggeTypeList[info.cfg.type] = info;
            this.minggeHoleList[info.HoleNo] = info;
        }
    }
    public get item_4() {
        return this._item_4;
    }
    public getMingeIndexRed(HoleNo: number): void {

    }


    /**
     * 初始化 S37019
     * @param {S37019} data
     * @memberof PetInfo
     */
    public init37034(data: S37034): void {
        this.Sheet = Comate_cfgVo.get(data.No);
        this.No = data.No;
        this.Id = data.Id;
        this.StarLv = data.StarLv;
        this.StarSoul = data.StarSoul;
        this.BreakLv = data.BreakLv;
        this.BreakExp = data.BreakExp;
        this.SpiritLv = data.SpiritLv;
        this.SpiritExp = data.SpiritExp;
        this.item_3 = data.item_3;
        this.item_4 = data.item_4;
        this.TalentPoint = data.TalentPoint;
        this.AddPoint.clear();
        for (let j = 0; j < data.item_1.length; j++) {
            const element1 = data.item_1[j];
            this.AddPoint.set(element1.No, element1.Point);
        }
        this.BaseAttribute.clear()
        for (let j = 0; j < data.item_2.length; j++) {
            const element1 = data.item_2[j];
            this.BaseAttribute.set(element1.Key, element1.NewValue);
        }
        this.otherEquip = data.item_5;
    }




}