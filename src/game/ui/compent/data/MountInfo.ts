import { Aerocraft_lvVo } from "../../../../db/sheet/vo/Aerocraft_lvVo";
import { Aerocraft_starVo } from "../../../../db/sheet/vo/Aerocraft_starVo";
import { Aerocraft_flyVo } from "../../../../db/sheet/vo/Aerocraft_flyVo";
import { ConstVo } from "../../../../db/sheet/vo/ConstVo";
import { SBagData } from "../../../../net/data/SBagData";
import { SRoleData } from "../../../../net/data/SRoleData";
import { Attribute } from "../../../property/RoleProperty";
import { S60001, S60001_1, S60001_2, S60001_3 } from "../../../../net/pt/pt_60";
import { FormulaVo } from "../../../../db/sheet/vo/FormulaVo";
import { PropertyVo } from "../../../../db/sheet/vo/PropertyVo";
import { Aerocraft_skinVo } from "../../../../db/sheet/vo/Aerocraft_skinVo";

export class MountInfo {
    public oldLv:number = 0;
    public AerocraftNo:number;//星级
    public AerocraftExp:number;//当前经验
    public AerocraftLv:number;//等级
    public AerocraftSoaring:number;//飞升次数
    public TodayAddExp:number;//今日获得经验值
    public ShowNo:number;//当前的幻化坐骑
    public BattlePower:number;//战力
    public item_1 : S60001_1[];
    public item_2 : S60001_2[];
    public item_3 : S60001_3[];
    private lvVo:Aerocraft_lvVo;
    private nextLVo:Aerocraft_lvVo;
    private curStarVo:Aerocraft_starVo;
    private nextStarVo:Aerocraft_starVo;
    private curFlyVo:Aerocraft_flyVo;
    private nextFlyVo:Aerocraft_flyVo;
    private fightVo:FormulaVo;
    public AllAttr: Laya.Dictionary = null;//GoodsAttrType类别区分

    public SpiritLv:number;
    public SpiritExp:number;
    public VariationLv:number;
    public VariationExp:number;
    
    constructor() {
        
    }

    public update66001(data:S60001):void
    {
        this.AerocraftNo = data.AerocraftNo;
        this.AerocraftExp = data.AerocraftExp;
        this.AerocraftLv = data.AerocraftLv;
        this.AerocraftSoaring = data.AerocraftSoaring;
        this.TodayAddExp = data.TodayAddExp;
        this.ShowNo = data.ShowNo;
        this.BattlePower = data.BattlePower;
        this.item_1 = data.item_1;
        this.item_2 = data.item_2;
        this.item_3 = data.item_3;
        this.SpiritLv = data.SpiritLv;
        this.SpiritExp = data.SpiritExp;
        this.VariationLv = data.VariationLv;
        this.VariationExp = data.VariationExp;
        this.lvVo = Aerocraft_lvVo.get(this.AerocraftLv);
        this.nextLVo = Aerocraft_lvVo.get(this.AerocraftLv + 1);
        this.curStarVo = Aerocraft_starVo.get(this.AerocraftNo);
        this.nextStarVo = Aerocraft_starVo.get(this.AerocraftNo + 1);
        this.curFlyVo = Aerocraft_flyVo.get(this.AerocraftSoaring);
        this.nextFlyVo = Aerocraft_flyVo.get(this.AerocraftSoaring + 1);
        this.fightVo = FormulaVo.get(4);
        this.updateAttri();
        this.updateNextAttri();
    }

    private updateAttri():void
    {
        if(this.AllAttr == null)
        {
            this.AllAttr = new Laya.Dictionary();
        }
        var attrs:Laya.Dictionary = this.AllAttr.get(0);
        if(attrs == null)
        {
            attrs = new Laya.Dictionary();
            this.AllAttr.set(0,attrs)
        }
        var attr:Attribute;
        if(this.item_1 && this.item_1.length > 0)
        {
            for (let index = 0; index < this.item_1.length; index++) {
                var element = this.item_1[index];
                attr = attrs.get(element.AttrCode);
                if(attr == null)
                {
                    attr = new Attribute(element.AttrCode , element.AttrValue);
                    attrs.set(element.AttrCode, attr);
                }
                attr.value = element.AttrValue;
            }
        }
    }

    private updateNextAttri():void
    {
        var attrs:Laya.Dictionary = this.AllAttr.get(1);
        if(attrs == null)
        {
            attrs = new Laya.Dictionary();
            this.AllAttr.set(1,attrs)
        }
        var attr:Attribute;
        var vo:PropertyVo;
        var len:number = this.lvVo.attr.length;
        var point:number;
        if(this.nextStarVo && this.nextStarVo.no)
        {
            point = this.nextStarVo.quality_ratio;
        }
        else
        {
            point = 1;
        }
        for (let index = 0; index < len; index++) {
            var element = this.lvVo.attr[index];
            vo = PropertyVo.getByInfo(element[0]);
            if(vo)
            {
                attr = attrs.get(vo.no);
                if(attr == null)
                {
                    if(element[1] > 0)
                    {
                        attr = new Attribute(vo.no , element[1]*point);
                        attrs.set(vo.no, attr);
                    }
                    else
                    {
                        attr = new Attribute(vo.no , element[2]*point);
                        attrs.set(vo.no, attr);
                    }
                }
                if(element[1] > 0)
                {
                    attr.value = element[1]*point;
                }
                else
                {
                    attr.value = element[2]*point;
                }
            }
        }
    }

    public get lvExpLimit():number
    {
        if(this.nextLVo && this.nextLVo.no)
        {
            return this.nextLVo.exp_lim;
        }
        return this.lvVo.exp_lim;
    }

    public get curStarInfo():Aerocraft_starVo
    {
        var vo:Aerocraft_starVo = Aerocraft_starVo.get(this.AerocraftNo);
        return vo;
    }

    /**
     * 根据属性类型获得属性值
     * @param {number} type
     * @returns {number}
     * @memberof MountInfo
     */
    public getAttrValue(type:number):string
    {
        if(this.item_1 && this.item_1.length > 0)
        {
            for (let index = 0; index < this.item_1.length; index++) {
                var element = this.item_1[index];
                if(element.AttrCode == type)
                {
                    return element.AttrValue + "";
                }
            }
        }
        return 0 + "";
    }

    public get showNoInfo():Aerocraft_skinVo
    {
        var vo:Aerocraft_skinVo = Aerocraft_skinVo.get(this.ShowNo);
        return vo;
    }

    public get combat():number
    {
        var _combat:number = 0;
        var arr:Array<Attribute> = this.AllAttr.get(0).values;
        var len:number = arr.length;
        for (let index = 0; index < len; index++) {
            var element = arr[index];
            _combat += (parseInt(element.FormatValue) *this.fightVo[element.atrrName]);
        }
        return Math.ceil(_combat);
    }

    public get nextCombat():number
    {
        if(this.nextStarVo && this.nextStarVo.no)
        {
            var _combat:number = 0;
            var arr:Array<Attribute> = this.AllAttr.get(1).values;
            var len:number;
            // len = this.curFlyVo.attr_count;
            // for (let index = 0; index < len; index++) {
            //     var element = arr[index];
            //     _combat += (parseInt(element.FormatValue) *this.fightVo[element.atrrName]);
            // }
            // return Math.ceil(_combat);
            return 0;
        }
        return 0;
    }

    public get flyNextCombat():number
    {
        if(this.nextFlyVo && this.nextFlyVo.no)
        {
            var _combat:number = 0;
            var arr:Array<Attribute> = this.AllAttr.get(1).values;
            var len:number;
            // len = this.nextFlyVo.attr_count;
            // for (let index = 0; index < len; index++) {
            //     var element = arr[index];
            //     _combat += (parseInt(element.FormatValue) *this.fightVo[element.atrrName]);
            // }
            // return Math.ceil(_combat);
            return 0 ;
        }
        return 0;
    }

    public get lvCombat():number
    {
        return this.nextCombat - this.combat;
    }

    public get lvPercent():string
    {
        var value;
        var num:number;
        if(this.curStarVo && this.curStarVo.no)
        {
            value = this.curStarVo.quality_ratio;
        }
        else
        {
            value = 0;
        }
        var nextValue:number = this.nextStarVo?this.nextStarVo.quality_ratio:value;
        if(nextValue != 0 && value!= 0)
        {
            num = ((nextValue - value))*100;
        }
        else
        {
            num = 0;
        }
        return Math.floor(num) + "%"
    }

    public get flyPecent():string
    {
        var value:number = this.combat;
        var nextValue:number = this.flyNextCombat;
        var num:number;
        if(nextValue != 0 && value!= 0)
        {
            num = ((nextValue/value))*100;
        }
        else
        {
            num = 0;
        }
        return Math.floor(num) + "%";
    }

    public get name():string
    {
        if(this.curStarVo && this.curStarVo.no)
        {
            return this.curStarVo.name;
        }
        return "";
    }

    public get curStarNum():number
    {
        if(this.curStarVo && this.curStarVo.quality_ratio)
        {
            return this.curStarVo.quality_ratio;
        }
        return 0;
    }

    public get curAttr():Array<string>{
        if(this.curStarVo && this.curStarVo.attr)
        {
            return this.curStarVo.attr;
        }
        return [];
    }

    public get nextStarNum():number
    {
        if(this.nextStarVo && this.nextStarVo.no)
        {
            return this.nextStarVo.quality_ratio;
        }
        return -1;
    }

    public get nextFlyLimtLv():number
    {
        if(this.nextFlyVo && this.nextFlyVo.no)
        {
            return this.nextFlyVo.lv_lim;
        }
        return -1;
    }

    public get curFlyLimtLv():number
    {
        if(this.curFlyVo && this.curFlyVo.no !=null)
        {
            return this.curFlyVo.lv_lim;
        }
        return -1;
    }

    public get curFlyAttr():Array<string>
    {
        if(this.curFlyVo && this.curFlyVo.attr)
        {
            return this.curFlyVo.attr;
        }
        return [];
    }

    public get leftFeedNum():number
    {
        var left:number = this.curFlyVo.today_feed_lim - this.TodayAddExp;
        return left > 0?left:0;
    }

    public get lvFeedNum():number
    {
        var topLv:number = this.curFlyVo.lv_lim;
        var curLv:number = this.AerocraftLv;
        var value:number = this.AerocraftExp;
        var allExp:number = Aerocraft_lvVo.getAllExp(topLv);
        var curExp:number;
        if(value > 0)
        {
            curExp = Aerocraft_lvVo.getAllExp(curLv) + value;
        }
        else
        {
            curExp = Aerocraft_lvVo.getAllExp(curLv -1);
        }
        var num:number = allExp - curExp;
        var canNum:number = num > this.leftFeedNum?this.leftFeedNum:num;
        return canNum > this.feedNum?this.feedNum:canNum;
    }

    private costVo:ConstVo;
    public get feedNum():number
    {
        var num:number;
        if(!this.costVo)
        {
            this.costVo = ConstVo.get("AEROCAFT_FEED_GOODS_NO");
        }
        num = SBagData.instance.prop.getItemCountByGoodsNo(this.costVo.val[0]);
        return num;
    }

    /**
     * 是否超过等级限制
     * @readonly
     * @type {boolean}
     * @memberof MountInfo
     */
    public get isLimtLV():boolean
    {
        if(this.AerocraftLv >= this.curFlyVo.lv_lim)
        {
            return true;
        }
        return false;
    }

    /**
     * 是否超过经验限制
     * @readonly
     * @type {boolean}
     * @memberof MountInfo
     */
    public get isLimitExp():boolean
    {
        if(this.TodayAddExp >= this.limitExp)
        {
            return true;
        }
        return false;
    }

    public get limitExp():number
    {
        return this.curFlyVo.today_feed_lim;
    }

    /**
     * 是否需要喂养
     * @readonly
     * @type {boolean}
     * @memberof MountInfo
     */
    public get needFeed():boolean
    {
        if(!this.nextLVo)
        {
            return false;
        }
        return true;
    }

    public get canFeedNum():number
    {
        var num:number;
        if(this.feedNum > this.leftFeedNum)
        {
            return this.leftFeedNum;
        }
        return this.feedNum;
    }

    /**
     * 是否可以喂养
     * @readonly
     * @type {boolean}
     * @memberof MountInfo
     */
    public get canFeed():boolean
    {
        if(this.isLimtLV)
        {
            return false;
        }
        if(this.feedNum <= 0)
        {
            return false;
        }
        if(this.isLimitExp)
        {
            return false;
        }
        if(!this.needFeed)
        {
            return false;
        }
        return true;
    }

    public get needLvStar():boolean
    {
        if(!this.nextStarVo)
        {
            return false;
        }
        return true;
    }

    public get lvStarCode():number
    {
        if(this.nextStarVo && this.nextStarVo.no)
        {
            return this.nextStarVo.goods_list[0][0];
        }
        return -1;
    }

    public get lvStarNum():number
    {
        var num:number;
        if(this.nextStarVo && this.nextStarVo.no)
        {
            num = SBagData.instance.prop.getItemCountByGoodsNo(this.lvStarCode);
            return num;
        }
        return -1;
    }

    public get needLvStarNum():number
    {
        var num:number;
        if(this.nextStarVo && this.nextStarVo.no)
        {
            num = this.nextStarVo.goods_list[0][1];
            return num;
        }
        return -1;
    }

    /**
     * 是否可以升星
     * @readonly
     * @type {boolean}
     * @memberof MountInfo
     */
    public get canLvStar():boolean
    {
        if(!this.needLvStar)
        {
            return false;
        }
        if(this.lvStarNum < this.needLvStarNum)
        {
            return false;
        }
        return true;
    }

    /**
     * 是否还需要飞升
     * @readonly
     * @type {boolean}
     * @memberof MountInfo
     */
    public get needFly():boolean
    {
        if(this.nextFlyVo && this.nextFlyVo.no)
        {
            return true;
        }
        return false;
    }

    public get flyCode():number
    {
        if(this.nextFlyVo && this.nextFlyVo.no)
        {
            return this.nextFlyVo.goods_list[0][0];
        }
        return -1;
    }

    public get flyNum():number
    {
        var num:number;
        if(this.nextFlyVo && this.nextFlyVo.no)
        {
            num = SBagData.instance.prop.getItemCountByGoodsNo(this.flyCode);
            return num;
        }
        return -1;
    }

    public get needFlyNum():number
    {
        var num:number;
        if(this.nextFlyVo && this.nextFlyVo.no)
        {
            num = this.nextFlyVo.goods_list[0][1];
            return num;
        }
        return -1;
    }


    private flyGoodList:Array<any> = [];
    public get flyGoods():Array<any>
    {
        this.flyGoodList = [];
        var obj:object;
        if(this.nextFlyVo)
        {
            var arr:Array<any> = this.nextFlyVo.goods_list;
            var len:number = arr.length;
            for (let index = 0; index < len; index++) {
                var element = arr[index];
                obj = {};
                obj["num"] = SBagData.instance.prop.getItemCountByGoodsNo(element[0]);
                obj["needNum"] = element[1];
                this.flyGoodList.push(obj);
            }
        }
        return this.flyGoodList;
    }

    /**
     * 是否可以飞升
     * @readonly
     * @type {boolean}
     * @memberof MountInfo
     */
    public get canFly():boolean
    {
        if(!this.needFly)
        {
            return false;
        }
        if(this.flyNum < this.needFlyNum)
        {
            return false;
        }
        return true;
    }
}