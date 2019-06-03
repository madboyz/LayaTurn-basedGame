import { ConstVo } from "../../../../db/sheet/vo/ConstVo";
import { From_sourceVo } from "../../../../db/sheet/vo/From_sourceVo";
import { GoodsVo } from "../../../../db/sheet/vo/GoodsVo";
import { NatureVo } from "../../../../db/sheet/vo/NatureVo";
import { Npc_goods_exchangeVo } from "../../../../db/sheet/vo/Npc_goods_exchangeVo";
import { PetVo } from "../../../../db/sheet/vo/PetVo";
import { Pet_cultivateVo } from "../../../../db/sheet/vo/Pet_cultivateVo";
import { Pet_exp_limitVo } from "../../../../db/sheet/vo/Pet_exp_limitVo";
import { Pet_refineVo } from "../../../../db/sheet/vo/Pet_refineVo";
import { PropertyVo } from "../../../../db/sheet/vo/PropertyVo";
import { SkillVo } from "../../../../db/sheet/vo/SkillVo";
import { SBagData } from "../../../../net/data/SBagData";
import { SRoleData } from "../../../../net/data/SRoleData";
import { S17000, S17008_1, S17009, S17009_1, S17009_2, S17009_3, S17009_4, S17011_1, S17028, S17028_5 } from "../../../../net/pt/pt_17";
import { PropertyEnumCode } from "../../../property/RoleProperty";
import { ItemData } from "./ItemData";

export class PetInfo {
    public PartnerId: number = 0;//武将唯一id
    public PartnerNo: number = 0;//宠物编号
    public Name: string = "";//武将名字
    public Quality: number = 0;//武将品质
    public State: number = 0;//休息or参战状态锁定or非锁定状态100//>休息非锁定101//>休息锁定110//>参战非锁定111//>参战锁定
    public Position: number = 0;//是否主宠：1表示主宠
    public Hp: number = 0;//气血
    public Mp: number = 0;//魔法（法力）
    public Exp: number = 0;//经验
    public HpLim: number = 0;//气血上限
    public MpLim: number = 0;//魔法（法力）上限
    public ExpLim: number = 0;//经验上限
    public Lv: number = 1;//武将等级
    public Follow: number = 0;//1表示跟随0表示不跟随
    public EvolveLv: number = 0;//当前进化等级
    public CultivateLv: number = 0;//修炼等级
    public Layer: number = 0;//修炼层数
    public DianhuaLv = 0;//点化等级
    public DianhuaExp = 0;//点化经验
    public SpiritLv = 0;//兽灵等级
    public SpiritExp = 0;//兽灵经验
    public IllustrateLv: number = 0;//图鉴等级
    public IllustrateExp: number = 0;//图鉴层数
    public ActSpeedState: number = 0;//宠物精炼属性（速度）在属性计算时的正负状态:0表示正，1表示负
    public LoyaltyLim: number = 0;//忠诚度上限
    public PhyAtt: number = 0;//物理攻击
    public PhyDef: number = 0;//物理防御
    public MagAtt: number = 0;//法术攻击
    public MagDef: number = 0;//法术防御
    public ActSpeed: number = 0;//出手速度
    public PhyComboAttProba: number = 0;//物理连击率
    public StrikebackProba: number = 0;//反击率
    public MagComboAttProba: number = 0;//法术连击率
    public ResisHit: number = 0;//封印抗性
    public ResisSeal: number = 0;//封印抗性
    public AbsorbHpCoef: number = 0;//吸血系数
    public item_1: S17009_1[] = [];
    public NatureNo: number = 0;//性格
    public Intimacy: number = 0;//亲密度
    public IntimacyLv: number = 0;//亲密度等级
    public Cultivate: number = 0;//修炼值
    public BaseGrow: number = 0;//成长基础值
    public BaseHpAptitude: number = 0;//生命资质基础值
    public BaseMagAptitude: number = 0;//法力资质基础值
    public BasePhyAttAptitude: number = 0;//物攻资质基础值
    public BaseMagAttAptitude: number = 0;//法功资质基础值
    public BasePhyDefAptitude: number = 0;//物防资质基础值
    public BaseMagDefAptitude: number = 0;//法防资质基础值
    public BaseSpeedAptitude: number = 0;//速度资质基础值
    public MaxPostnatalSkillSlot: number = 0;//最大后天技能格数
    public Life: number = 0;//当前寿命
    public BattlePower: number = 0;//当前战斗力
    public MoodNo: number = 0;//当前心情编号
    public Evolve: number = 0;//进化值
    public Clothes: number = 0;//画皮编号即衣服
    public Crit: number = 0;//物理(法术)暴击几率(合并了)
    public Ten: number = 0;//物理（法术）暴击抗性(合并了)
    public HealValue: number = 0;//治疗强度
    public Str: number = 0;//力量
    public Con: number = 0;//体力
    public Sta: number = 0;//耐力
    public Spi: number = 0;//智力
    public Agi: number;//敏捷
    public FeerPoint: number = 0;//分配点
    public SoaringLv: number = 0;//飞升次数
    public item_2: S17009_2[] = [];
    public Do_phy_dam_scaling: number = 0;//物理伤害
    public Do_mag_dam_scaling: number = 0;//法术伤害
    public Crit_coef: number = 0;//物理(法术)暴击程度(合并了)
    public Neglect_seal_resis: number = 0;//忽视抗封
    public Neglect_phy_def: number = 0;//忽视物理防御
    public Neglect_mag_def: number = 0;//忽视法术防御
    public Revive_heal_coef: number = 0;//复活治疗
    public Order: number = 0;//支援排序值
    public item_3: S17009_3[] = [];
    public item_4: S17009_4[] = [];
    public vo: PetVo = null;//配置信息
    public natureVo: NatureVo;
    public nextExp: Pet_exp_limitVo;
    public _active: boolean = false;//是否激活
    public isInitAll: boolean = false;//是否获得完整信息
    public otherEquip:S17028_5[] = [];//别人的信息时候，存放的装备列表(因为自己的请求时，装备是放在专门的数据存起来的，所以别人的另外处理);
    // public AllAttr: Laya.Dictionary = new Laya.Dictionary();//GoodsAttrType类别区分
    constructor() {
        this._active = false;
        this.isInitAll = false;
    }

    /**
     * 初始化s17000数据
     * @param {S17000} data
     * @memberof PetInfo
     */
    public init17000(data: S17000): void {
        this.active = true;
        this.PartnerId = data.PartnerId;
        this.PartnerNo = data.PartnerNo;
        this.Name = data.Name;
        this.Quality = data.Quality;
        this.State = data.State;
        this.Position = data.Position;
        this.Hp = data.Hp;
        this.Mp = data.Mp;
        this.Exp = data.Exp;
        this.HpLim = data.HpLim;
        this.MpLim = data.MpLim;
        this.Lv = data.Lv;
        this.ExpLim = data.ExpLim;
        this.Follow = data.Follow;
        this.EvolveLv = data.EvolveLv;
        this.CultivateLv = data.CultivateLv;
        this.Layer = data.Layer;
        this.DianhuaLv = data.DianhuaLv;
        this.DianhuaExp = data.DianhuaExp;
        this.SpiritLv = data.SpiritLv;
        this.SpiritExp = data.SpiritExp;
        this.IllustrateLv = data.IllustrateLv;
        this.IllustrateExp = data.IllustrateExp;
        // this.initAttr(PropertyEnumCode.OI_CODE_HP,this.Hp);
        // this.initAttr(PropertyEnumCode.OI_CODE_MP,this.Mp);
        // this.initAttr(PropertyEnumCode.OI_CODE_HP_LIM,this.Mp);
    }

    /**
     * 初始化17008
     * @param {S17008_1} data
     * @memberof PetInfo
     */
    public init17008(data: S17008_1): void {
        this.active = true;
        this.PartnerId = data.PartnerId;
        this.PartnerNo = data.PartnerNo;
        this.Name = data.Name;
        this.Quality = data.Quality;
        this.State = data.State;
        this.Position = data.Position;
        this.Hp = data.Hp;
        this.Mp = data.Mp;
        this.ActSpeedState = data.ActSpeedState;
        this.HpLim = data.HpLim;
        this.MpLim = data.MpLim;
        this.LoyaltyLim = data.LoyaltyLim;
        this.Lv = data.Lv;
        this.Follow = data.Follow;
        this.EvolveLv = data.EvolveLv;
        this.CultivateLv = data.CultivateLv;
        this.Layer = data.Layer;
        this.DianhuaLv = data.DianhuaLv;
        this.DianhuaExp = data.DianhuaExp;
        this.SpiritLv = data.SpiritLv;
        this.SpiritExp = data.SpiritExp;
        this.IllustrateLv = data.IllustrateLv;
        this.IllustrateExp = data.IllustrateExp;
    }

    /**
     * 初始化 17009
     * @param {S17009} data
     * @memberof PetInfo
     */
    public init17009(data: S17009): void {
        this.active = true;
        this.isInitAll = true;
        this.PartnerNo = data.PartnerNo;
        this.PartnerId = data.PartnerId;
        this.Lv = data.Lv;
        this.Name = data.Name;
        this.Quality = data.Quality;
        this.Exp = data.Exp;
        this.ExpLim = Pet_exp_limitVo.get(this.Lv >= 1 ? this.Lv : 1).exp_lim;
        this.nextExp = Pet_exp_limitVo.get(this.Lv + 1);
        this.Hp = data.Hp;
        this.Mp = data.Mp;
        this.PhyAtt = data.PhyAtt;
        this.PhyDef = data.PhyDef;
        this.MagAtt = data.MagAtt;
        this.MagDef = data.MagDef;
        this.ActSpeed = data.ActSpeed;
        this.PhyComboAttProba = data.PhyComboAttProba;
        this.StrikebackProba = data.StrikebackProba;
        this.MagComboAttProba = data.MagComboAttProba;
        this.ResisHit = data.ResisHit;
        this.ResisSeal = data.ResisSeal;
        this.AbsorbHpCoef = data.AbsorbHpCoef;
        this.item_1 = data.item_1;
        this.ActSpeedState = data.ActSpeedState;
        this.NatureNo = data.NatureNo;
        this.HpLim = data.HpLim;
        this.MpLim = data.MpLim;
        this.Intimacy = data.Intimacy;
        this.IntimacyLv = data.IntimacyLv;
        this.EvolveLv = data.EvolveLv;
        this.Cultivate = data.Cultivate;
        this.CultivateLv = data.CultivateLv;
        this.BaseGrow = data.BaseGrow;
        this.BaseHpAptitude = data.BaseHpAptitude;
        this.BaseMagAptitude = data.BaseMagAptitude;
        this.BasePhyAttAptitude = data.BasePhyAttAptitude;
        this.BaseMagAttAptitude = data.BaseMagAptitude;
        this.BasePhyDefAptitude = data.BasePhyDefAptitude;
        this.BaseMagDefAptitude = data.BaseMagDefAptitude;
        this.BaseSpeedAptitude = data.BaseSpeedAptitude;
        this.MaxPostnatalSkillSlot = data.MaxPostnatalSkillSlot;
        this.Life = data.Life;
        this.BattlePower = data.BattlePower;
        this.MoodNo = data.MoodNo;
        this.Evolve = data.Evolve;
        this.Clothes = data.Clothes;
        this.Layer = data.Layer;
        this.DianhuaLv = data.DianhuaLv;
        this.DianhuaExp = data.DianhuaExp;
        this.SpiritLv = data.SpiritLv;
        this.SpiritExp = data.SpiritExp;
        this.IllustrateLv = data.IllustrateLv;
        this.IllustrateExp = data.IllustrateExp;
        this.item_4 = data.item_4;
        this.Crit = data.Crit;
        this.Ten = data.Ten;
        this.HealValue = data.HealValue;
        this.Str = data.Str;
        this.Con = data.Con;
        this.Sta = data.Sta;
        this.Spi = data.Spi;
        this.Agi = data.Agi;
        this.FeerPoint = data.FeerPoint;
        this.SoaringLv = data.SoaringLv;
        this.item_2 = data.item_2;
        this.Do_phy_dam_scaling = data.Do_phy_dam_scaling;
        this.Do_mag_dam_scaling = data.Do_mag_dam_scaling;
        this.Crit_coef = data.crit_coef;
        this.Neglect_seal_resis = data.Neglect_seal_resis;
        this.Neglect_phy_def = data.Neglect_phy_def;
        this.Revive_heal_coef = data.Revive_heal_coef;
        this.Order = data.Order;
        this.item_3 = data.item_3;
        this.natureVo = NatureVo.get(this.PartnerNo);
    }

    /**
     * 初始化 17028
     * @param {S17009} data
     * @memberof PetInfo
     */
    public init17028(data: S17028): void {
        this.active = false;
        this.isInitAll = true;
        this.PartnerNo = data.PartnerNo;
        this.PartnerId = data.PartnerId;
        this.Lv = data.Lv;
        this.Name = data.Name;
        this.Quality = data.Quality;
        this.Exp = data.Exp;
        this.ExpLim = Pet_exp_limitVo.get(this.Lv >= 1 ? this.Lv : 1).exp_lim;
        this.nextExp = Pet_exp_limitVo.get(this.Lv + 1);
        this.Hp = data.Hp;
        this.Mp = data.Mp;
        this.PhyAtt = data.PhyAtt;
        this.PhyDef = data.PhyDef;
        this.MagAtt = data.MagAtt;
        this.MagDef = data.MagDef;
        this.ActSpeed = data.ActSpeed;
        this.PhyComboAttProba = data.PhyComboAttProba;
        this.StrikebackProba = data.StrikebackProba;
        this.MagComboAttProba = data.MagComboAttProba;
        this.ResisHit = data.ResisHit;
        this.ResisSeal = data.ResisSeal;
        this.AbsorbHpCoef = data.AbsorbHpCoef;
        this.item_1 = data.item_1;
        this.ActSpeedState = data.ActSpeedState;
        this.NatureNo = data.NatureNo;
        this.HpLim = data.HpLim;
        this.MpLim = data.MpLim;
        this.Intimacy = data.Intimacy;
        this.IntimacyLv = data.IntimacyLv;
        this.EvolveLv = data.EvolveLv;
        this.Cultivate = data.Cultivate;
        this.CultivateLv = data.CultivateLv;
        this.BaseGrow = data.BaseGrow;
        this.BaseHpAptitude = data.BaseHpAptitude;
        this.BaseMagAptitude = data.BaseMagAptitude;
        this.BasePhyAttAptitude = data.BasePhyAttAptitude;
        this.BaseMagAttAptitude = data.BaseMagAptitude;
        this.BasePhyDefAptitude = data.BasePhyDefAptitude;
        this.BaseMagDefAptitude = data.BaseMagDefAptitude;
        this.BaseSpeedAptitude = data.BaseSpeedAptitude;
        this.MaxPostnatalSkillSlot = data.MaxPostnatalSkillSlot;
        this.Life = data.Life;
        this.BattlePower = data.BattlePower;
        this.MoodNo = data.MoodNo;
        this.Evolve = data.Evolve;
        this.Clothes = data.Clothes;
        this.Layer = data.Layer;
        this.DianhuaLv = data.DianhuaLv;
        this.DianhuaExp = data.DianhuaExp;
        this.SpiritLv = data.SpiritLv;
        this.SpiritExp = data.SpiritExp;
        this.IllustrateLv = data.IllustrateLv;
        this.IllustrateExp = data.IllustrateExp;
        this.item_4 = data.item_4;
        this.Crit = data.Crit;
        this.Ten = data.Ten;
        this.HealValue = data.HealValue;
        this.Str = data.Str;
        this.Con = data.Con;
        this.Sta = data.Sta;
        this.Spi = data.Spi;
        this.Agi = data.Agi;
        this.FeerPoint = data.FeerPoint;
        this.SoaringLv = data.SoaringLv;
        this.item_2 = data.item_2;
        this.Do_phy_dam_scaling = data.Do_phy_dam_scaling;
        this.Do_mag_dam_scaling = data.Do_mag_dam_scaling;
        this.Crit_coef = data.crit_coef;
        this.Neglect_seal_resis = data.Neglect_seal_resis;
        this.Neglect_phy_def = data.Neglect_phy_def;
        this.Revive_heal_coef = data.Revive_heal_coef;
        this.Order = data.Order;
        this.item_3 = data.item_3;
        this.natureVo = NatureVo.get(this.PartnerNo);
        this.otherEquip = data.item_5;
        this.vo = PetVo.get(data.PartnerNo);
    }

    /**
     * 修炼更新
     * @param {number} vate
     * @param {number} lv
     * @param {number} layer
     * @memberof PetInfo
     */
    public updateCultivate(vate: number, lv: number, layer: number): void {
        this.Cultivate = vate;
        this.CultivateLv = lv;
        this.Layer = layer;
    }

    public set active(bl: boolean) {
        this._active = bl;
    }

    public get active(): boolean {
        return this._active;
    }

    // /**
    //  * 初始化一个属性
    //  * @param {number} type
    //  * @param {number} value
    //  * @memberof PetInfo
    //  */
    // private initAttr(type:number,value:number):void
    // {
    //     var attr:Attribute = this.AllAttr.get(type);
    //     if(attr == null)
    //     {
    //         attr = new Attribute(type, value);
    //         this.AllAttr.set(type, attr);
    //     }
    // }

    public updateAttrs(data: S17011_1[]): void {
        for (let index = 0; index < data.length; index++) {
            const element = data[index];
            this.updateAttr(element.Key, element.NewValue);
        }
    }

    private updateAttr(type: number, value: number): void {
        switch (type) {
            case PropertyEnumCode.OI_CODE_HP:
                this.Hp = value;
                break;
            case PropertyEnumCode.OI_CODE_HP_LIM:
                this.HpLim = value;
                break;
            case PropertyEnumCode.OI_CODE_MP:
                this.Mp = value;
                break;
            case PropertyEnumCode.OI_CODE_MP_LIM:
                this.MpLim = value;
                break;
            case PropertyEnumCode.OI_CODE_PHY_ATT:
                this.PhyAtt = value;
                break;
            case PropertyEnumCode.OI_CODE_MAG_ATT:
                this.MagAtt = value;
                break;
            case PropertyEnumCode.OI_CODE_PHY_DEF:
                this.PhyDef = value;
                break;
            case PropertyEnumCode.OI_CODE_MAG_DEF:
                this.MagDef = value;
                break;
            case PropertyEnumCode.OI_CODE_TALENT_STR:
                this.Str = value;
                break;
            case PropertyEnumCode.OI_CODE_TALENT_CON:
                this.Con = value;
                break;
            case PropertyEnumCode.OI_CODE_TALENT_STA:
                this.Sta = value;
                break;
            case PropertyEnumCode.OI_CODE_TALENT_SPI:
                this.Spi = value;
                break;
            case PropertyEnumCode.OI_CODE_TALENT_AGI:
                this.Agi = value;
                break;
            case PropertyEnumCode.OI_CODE_ACT_SPEED:
                this.ActSpeed = value;
                break;
            case PropertyEnumCode.OI_CODE_SEAL_HIT:
                this.ResisHit = value;
                break;
            case PropertyEnumCode.OI_CODE_SEAL_RESIS:
                this.ResisSeal = value;
                break;
            case PropertyEnumCode.OI_CODE_PHY_COMBO_ATT_PROBA:
                this.PhyComboAttProba = value;
                break;
            case PropertyEnumCode.OI_CODE_MAG_COMBO_ATT_PROBA:
                this.MagComboAttProba = value;
                break;
            case PropertyEnumCode.OI_CODE_MAG_COMBO_ATT_PROBA:
                this.MagComboAttProba = value;
                break;
            case PropertyEnumCode.OI_CODE_STRIKEBACK_PROBA:
                this.StrikebackProba = value;
                break;
            case PropertyEnumCode.OI_CODE_ABSORB_HP_COEF:
                this.AbsorbHpCoef = value;
                break;
            case PropertyEnumCode.OI_CODE_EXP:
                this.Exp = value;
                break;
            case PropertyEnumCode.OI_CODE_PAR_STATE:
                this.State = value;
                if (this.State == 110) {
                    this.Position = 1;
                }
                else {
                    this.Position = 0;
                }
                break;
            case PropertyEnumCode.OI_CODE_PAR_FOLLOW:
                this.Follow = value;
                break;
            case PropertyEnumCode.OI_CODE_PAR_INTIMACY:
                this.Intimacy = value;
                break;
            case PropertyEnumCode.OI_CODE_PAR_INTIMACY_LV:
                this.IntimacyLv = value;
                break;
            case PropertyEnumCode.OI_CODE_PAR_CULTIVATE:
                this.Cultivate = value;
                break;
            case PropertyEnumCode.OI_CODE_PAR_LIFE:
                this.Life = value;
                break;
            case PropertyEnumCode.OI_CODE_PAR_CULTIVATE_LV:
                this.CultivateLv = value;
                break;
            case PropertyEnumCode.OI_CODE_PAR_EVOLVE_LV:
                this.EvolveLv = value;
                break;
            case PropertyEnumCode.OI_CODE_PAR_EVOLVE:
                this.Evolve = value;
                break;
            case PropertyEnumCode.OI_CODE_PAR_LV:
                this.Lv = value;
                break;
            case PropertyEnumCode.OI_CODE_BATTLE_POWER:
                this.BattlePower = value;
                break;
            case PropertyEnumCode.OI_CODE_PAR_MOOD_NO:
                this.MoodNo = value;
                break;
            case PropertyEnumCode.OI_CODE_PAR_CLOTHES:
                this.Clothes = value;
                break;
            case PropertyEnumCode.OI_CODE_CRIT:
                this.Crit = value;
                break;
            case PropertyEnumCode.OI_CODE_TEN:
                this.Ten = value;
                break;
            case PropertyEnumCode.OI_CODE_HEAL_VALUE:
                this.HealValue = value;
                break;
            case PropertyEnumCode.OI_CODE_FREE_POINT:
                this.FeerPoint = value;
                break;
            case PropertyEnumCode.OI_CODE_DO_PHY_DAM_SCALING:
                this.Do_phy_dam_scaling = value;
                break;
            case PropertyEnumCode.OI_CODE_DO_MAG_DAM_SCALING:
                this.Do_mag_dam_scaling = value;
                break;
            case PropertyEnumCode.OI_CODE_CRIT_COEF:
                this.Crit_coef = value;
                break;
            case PropertyEnumCode.OI_NEGLECT_SEAL_RESIS:
                this.Neglect_seal_resis = value;
                break;
            case PropertyEnumCode.OI_NEGLECT_PHY_DEF:
                this.Neglect_phy_def = value;
                break;
            case PropertyEnumCode.OI_NEGLECT_MAG_DEF:
                this.Neglect_mag_def = value;
                break;
            case PropertyEnumCode.OI_REVIVE_HEAL_COEF:
                this.Revive_heal_coef = value;
                break;
            case PropertyEnumCode.OI_CODE_PAR_DEL_SKILL:
                this.deleteSkill(value);
                break;
            case PropertyEnumCode.OI_CODE_PAR_ADD_SKILL:
                this.addSkill(value);
                break;
            case PropertyEnumCode.OI_CODE_PHY_COMBO_ATT_PROBA:
                this.PhyComboAttProba = value;
                break;
            case PropertyEnumCode.OI_CODE_MAG_COMBO_ATT_PROBA:
                this.MagComboAttProba = value;
                break;
            case PropertyEnumCode.OI_CODE_ABSORB_HP_COEF:
                this.Revive_heal_coef = value;
                break;
            default:
                break;
        }
    }

    private deleteSkill(id: number): void {
        for (let index = 0; index < this.item_1.length; index++) {
            var element = this.item_1[index];
            if (element.SkillNo == id) {
                this.item_1.splice(index, 1);
                return;
            }
        }
    }

    private addSkill(id: number): void {
        var info: S17009_1 = new S17009_1();
        info.SkillType = 2;
        info.SkillNo = id;
        info.SkillLv = 1;
        this.item_1.push(info);
    }

    private isAddRefineProp(str: string): boolean {
        var vo: PropertyVo = PropertyVo.getByInfo(str);
        for (let index = 0; index < this.item_2.length; index++) {
            var element = this.item_2[index];
            if (element.Code == vo.no) {
                return true;
            }
        }
        return false;
    }

    /**
     * 修改精炼属性
     * @param {name} name 属性名字
     * @param {number} value
     * @memberof PetInfo
     */
    public updateRefineAttr(name: string, value: number): void {
        var vo: PropertyVo = PropertyVo.getByInfo(name);
        if (!this.isAddRefineProp(name)) {
            var prop: S17009_2 = new S17009_2();
            prop.Code = vo.no;
            prop.Value = value;
            this.item_2.push(prop);
        }
        else {
            for (let index = 0; index < this.item_2.length; index++) {
                var element = this.item_2[index];
                if (element.Code == vo.no) {
                    element.Value += value;
                }
            }
        }
    }

    /**
     * 通过名字获得精炼属性
     * @param {string} name
     * @returns {number}
     * @memberof PetInfo
     */
    public getRefineValueByName(name: string): number {
        var vo: PropertyVo = PropertyVo.getByInfo(name);
        for (let index = 0; index < this.item_2.length; index++) {
            var element = this.item_2[index];
            if (element.Code == vo.no) {
                return element.Value;
            }
        }
        return 0;
    }

    private goodVo: GoodsVo;
    private wayVo: From_sourceVo;
    /**
     * 激活类型
     * 1：去找人NPC 参数{场景id, NPC编号}
        2：打开xxx界面   参数：客户端自自定义参数解析
        3：弹出floattips 参数：一段文本
        4：去指定地图随机一个可走点  参数：地图编号                              
        5：找某个地图的某个坐标 参数：{地图编号，X,Y}
        6：兑换              参数：NPC兑换表的编号
     * @returns {number}
     * @memberof PetInfo
     */
    public get activeType(): number {
        this.goodVo = GoodsVo.get(this.vo.goods_no);
        if (this.goodVo) {
            this.wayVo = From_sourceVo.get(this.goodVo.from_source[0]);
            return this.wayVo.actionType;
        }
        alert("非装备表没有配置:" + this.Name + "得宠物道具,编号为：" + this.vo.goods_no);
        return -1;
    }

    public get action(): any {
        return this.wayVo.action;
    }

    /**
     * 获得激活需要得道具列表
     * @readonly
     * @type {Array<any>}
     * @memberof PetInfo
     */
    public get activeItems(): Array<any> {
        if (this.activeType == 6) {
            var vo: Npc_goods_exchangeVo = Npc_goods_exchangeVo.get(this.wayVo.action[0]);
            if (vo) {
                return vo.need_goods_list;
            }
            else {
                alert("npc对换表没有配置:" + this.Name + "得宠物兑换,编号为：" + this.wayVo.action);
            }
        }
        return null;
    }

    private _petSkills: Array<SkillVo>
    public get petSkills(): Array<SkillVo> {
        if (!this._petSkills) {
            this._petSkills = [];
            var vo: SkillVo;
            for (let index = 0; index < this.vo.inborn_skill_pool.length; index++) {
                const element = this.vo.inborn_skill_pool[index];
                vo = SkillVo.get(element);
                this._petSkills.push(vo);
            }
        }
        return this._petSkills;
    }

    public get skillSlots(): Array<any> {
        var _skillSlots: Array<any> = [];
        var slots: Array<Pet_cultivateVo> = Pet_cultivateVo.petSkillSlot;
        var arr: Array<S17009_1> = this.item_1;
        var len: number;
        var showNeedLen: number;
        len = slots.length + this.vo.max_postnatal_skill_slot;
        showNeedLen = this.vo.max_postnatal_skill_slot;
        var obj: object;
        var skillInfo: S17009_1;
        var vo: SkillVo;
        var element;
        var showNeedOnce: boolean = true;//只有一个格子需要显示文字
        for (let index = 0; index < len; index++) {
            skillInfo = arr[index];
            obj = {};
            if (skillInfo) {
                vo = SkillVo.get(skillInfo.SkillNo);
            }
            else {
                if (this.active == false) {
                    vo = this.petSkills[index];
                }
                else {
                    vo = null;
                }
            }
            obj["slot"] = index;
            obj["vo"] = vo;
            if (index >= showNeedLen) {
                element = slots[index - showNeedLen];
                obj["need"] = element;
                if (showNeedOnce && !(this.CultivateLv > element.lv || (this.CultivateLv == element.lv && this.Layer >= element.layer))) {
                    obj["showNeed"] = true;
                    showNeedOnce = false;
                }
                else {
                    obj["showNeed"] = false;
                }
            }
            else {
                obj["need"] = null;
            }
            _skillSlots.push(obj);
        }
        return _skillSlots;
    }

    public get layerName(): string {
        if (this.curCultivateVo && this.CultivateLv >= 1) {
            return this.curCultivateVo.title;
        }
        return "";
    }

    public get stateName(): string {
        if (this.curCultivateVo && this.CultivateLv >= 1) {
            return this.curCultivateVo.title;
        }
        return "";
    }

    public get curCultivateVo(): Pet_cultivateVo {
        if (this.nextCultivateVo) {
            return Pet_cultivateVo.get(this.nextCultivateVo.no - 1);
        }
        return null;
    }

    public get nextCultivateVo(): Pet_cultivateVo {
        var info: Pet_cultivateVo;
        var arr: Array<Pet_cultivateVo>
        if (this.Layer == 10) {
            arr = Pet_cultivateVo.getByLv(this.CultivateLv + 1);
            if (arr) {
                info = arr[0];
                return info;
            }
            else {
                return null;
            }
        }
        else {
            if (this.CultivateLv == 0) {
                info = Pet_cultivateVo.get(1);
                return info;
            }
            else {
                arr = Pet_cultivateVo.getByLv(this.CultivateLv);
                for (let index = 0; index < arr.length; index++) {
                    const element = arr[index];
                    if (element.layer == (this.Layer + 1)) {
                        return element;
                    }
                }
            }
        }
        return null;
    }

    private _maxValue: number = 0;
    /**
     * 获得修炼上限值
     * @readonly
     * @private
     * @type {number}
     * @memberof PetInfo
     */
    private get maxValue(): number {
        ///if(this._maxValue == 0)
        ///{
        ///    var vo:Pet_cultivateVo = Pet_cultivateVo.maxVo;
        ///    var lv:number = vo.lv;
        ///    var layer:number = vo.layer;
        ///    var arr:Array<Pet_cultivateVo>;
        ///    for (let index = 1; index <= lv; index++) {
        ///        arr = Pet_cultivateVo.getByLv(index)
        ///        for (var idx = 0; idx < arr.length; idx++) {
        ///            var element:Pet_cultivateVo = arr[idx];
        ///            if(element.lv < lv)
        ///            {
        ///                this._maxValue += element.result;
        ///            }
        ///            else
        ///            {
        ///                if(element.layer <= layer)
        ///                {
        ///                    this._maxValue += element.result;
        ///                }
        ///            }
        ///        }
        ///    }
        ///}
        return this._maxValue;
    }

    /**
     * 获得累加得修炼值效果
     * @readonly
     * @type {number}
     * @memberof PetInfo
     */
    private getValue(isNext: boolean = false): number {
        var arr: Array<Pet_cultivateVo>;
        var count: number = 0;
        // if(!isNext)
        // {
        //    if(this.CultivateLv > 0)
        //    {
        //        for (let index = 1; index <= this.CultivateLv; index++) {
        //            arr = Pet_cultivateVo.getByLv(index)
        //            for (let idx = 0; idx < arr.length; idx++) {
        //                var element:Pet_cultivateVo = arr[idx];
        //                if(element.lv < this.CultivateLv)
        //                {
        //                    count += element.result;
        //                }
        //                else
        //                {
        //                    if(element.layer <= this.Layer)
        //                    {
        //                        count += element.result;
        //                    }
        //                }
        //            }
        //        }
        //    }
        // }
        // else
        // {
        //    var lv:number = 0;
        //    var layer:number;
        //    if(this.Layer >= 10)
        //    {
        //        lv = this.CultivateLv + 1;
        //        layer = 1;
        //    }
        //    else
        //    {
        //        lv = this.CultivateLv;
        //        layer = this.Layer + 1;
        //    }
        //    for (var index = 1; index <= lv; index++) {
        //        arr = Pet_cultivateVo.getByLv(index)
        //        for (var idx = 0; idx < arr.length; idx++) {
        //            var element:Pet_cultivateVo = arr[idx];
        //            if(element.lv < lv)
        //            {
        //                count += element.result;
        //            }
        //            else
        //            {
        //                if(element.layer <= layer)
        //                {
        //                    count += element.result;
        //                }
        //            }
        //        }
        //    }
        // }
        return count;
    }

    public get curHpLim(): number {
        if (this.curCultivateVo) {
            return this.curCultivateVo.attrs_add[0][1];
        }
        return 0;
    }

    public get nextHpLim(): number {
        if (this.nextCultivateVo) {
            var cur: number = this.nextCultivateVo.attrs_add[0][1];
            return cur - this.curHpLim;
        }
        return 0;
    }

    public get maxHpLim(): number {
        return Pet_cultivateVo.maxVo.attrs_add[0][1];
    }

    public get curMpLim(): number {
        if (this.curCultivateVo) {
            return this.curCultivateVo.attrs_add[1][1];
        }
        return 0;
    }

    public get nextMpLim(): number {
        if (this.nextCultivateVo) {
            var cur: number = this.nextCultivateVo.attrs_add[1][1];
            return cur - this.curMpLim;
        }
        return 0;
    }

    public get maxMpLim(): number {
        return Pet_cultivateVo.maxVo.attrs_add[1][1];
    }

    public get curPhyAtt(): number {
        if (this.curCultivateVo) {
            return this.curCultivateVo.attrs_add[1][1];
        }
        return 0;
    }

    public get nextPhyAtt(): number {
        if (this.nextCultivateVo) {
            var cur: number = this.nextCultivateVo.attrs_add[1][1];
            return cur - this.curPhyAtt;
        }
        return 0;
    }

    public get maxPhyAtt(): number {
        return Pet_cultivateVo.maxVo.attrs_add[1][1];
    }


    public get curMagAtt(): number {
        if (this.curCultivateVo) {
            return this.curCultivateVo.attrs_add[2][1];
        }
        return 0;
    }

    public get nextMagAtt(): number {
        if (this.nextCultivateVo) {
            var cur: number = this.nextCultivateVo.attrs_add[2][1];
            return cur - this.curMagAtt;
        }
        return 0;
    }

    public get maxMagAtt(): number {
        return Pet_cultivateVo.maxVo.attrs_add[2][1];
    }

    public get curPhyDef(): number {
        if (this.curCultivateVo) {
            return this.curCultivateVo.attrs_add[3][1];
        }
        return 0;
    }

    public get nextPhyDef(): number {
        if (this.nextCultivateVo) {
            var cur: number = this.nextCultivateVo.attrs_add[3][1];
            return cur - this.curPhyDef;
        }
        return 0;
    }

    public get maxPhyDef(): number {
        return Pet_cultivateVo.maxVo.attrs_add[3][1];
    }

    public get curMagDef(): number {
        if (this.curCultivateVo) {
            return this.curCultivateVo.attrs_add[4][1];
        }
        return 0;
    }

    public get nextMagDef(): number {
        if (this.nextCultivateVo) {
            var cur: number = this.nextCultivateVo.attrs_add[4][1];
            return cur - this.curMagDef;
        }
        return 0;
    }

    public get maxMagDef(): number {
        return Pet_cultivateVo.maxVo.attrs_add[4][1];
    }

    public get curSpeed(): number {
        if (this.curCultivateVo) {
            return this.curCultivateVo.attrs_add[5][1];
        }
        return 0;
    }

    public get nextSpeed(): number {
        if (this.nextCultivateVo) {
            var cur: number = this.nextCultivateVo.attrs_add[5][1];
            return cur - this.curSpeed;
        }
        return 0;
    }

    public get maxSpeed(): number {
        return Pet_cultivateVo.maxVo.attrs_add[5][1];
    }

    public getMaxValueByType(type: number): number {
        var max: number = 0;
        switch (type) {
            case 1:
                max = this.maxHpLim;
                break;
            // case 2:
            //     max = this.maxMpLim;
            //     break
            case 2:
                max = this.maxPhyAtt;
                break
            case 3:
                max = this.maxMagAtt;
                break
            case 4:
                max = this.maxPhyDef;
                break
            case 5:
                max = this.maxMagDef;
                break
            case 6:
                max = this.maxSpeed;
                break
            default:
                break;
        }
        return max;
    }

    /**
     * 最大数量
     * @readonly
     * @type {number}
     * @memberof PetInfo
     */
    public get maxNeedNum(): number {
        var num: number = 0;
        var needExp: number;
        var step: number;
        var lvExp: Pet_exp_limitVo = Pet_exp_limitVo.get(this.Lv);
        var max: Pet_exp_limitVo = Pet_exp_limitVo.get(SRoleData.instance.info.Lv + 0);
        var data: ItemData = this.curLevelItem;
        if (!data) {
            return 0;
        }
        step = data.effectValue;
        if (!max) {
            max = Pet_exp_limitVo.get(1000);
        }
        if (this.Lv == 1) {
            needExp = max.exp_all - this.Exp;
        }
        else {
            needExp = max.exp_all - lvExp.exp_all - this.Exp;
        }
        if (needExp < 0) {
            return 0;
        }
        num = Math.ceil(needExp / step);
        if (num > data.Count) {
            return data.Count;
        }
        return num;
    }

    private get curLevelItem(): ItemData {
        var vo: ConstVo = ConstVo.get("PARTNER_ADD_EXP_GOODS_LIST");
        var arr: Array<number> = vo.val;
        for (let index = 0; index < arr.length; index++) {
            var element = arr[index];
            var itemdata: ItemData = SBagData.instance.prop.getItemDataByGoodsNo(element);
            if (itemdata && itemdata.Count > 0) {
                return itemdata;
            }
        }
        return null;
    }
    /**
     * 是否可以加点
     */
    public get canAddPoint(): boolean {
        if (this.active) {
            return this.FeerPoint > 0;
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
        if (this.active) {
            if (this.nextExp && (this.Lv < SRoleData.instance.info.Lv)) {
                var vo: ConstVo = ConstVo.get("PARTNER_ADD_EXP_GOODS_LIST");
                var arr: Array<number> = vo.val;
                for (let index = 0; index < arr.length; index++) {
                    var element = arr[index];
                    var itemdata: ItemData = SBagData.instance.prop.getItemDataByGoodsNo(element);
                    if (itemdata && itemdata.Count > 0) {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    /**
     * 是否可以修炼
     * @readonly
     * @type {boolean}
     * @memberof PetInfo
     */
    public get canTrain(): boolean {
        if (this.active) {
            if (this.nextCultivateVo && this.Lv >= this.nextCultivateVo.need_lv) {
                var num: number = SBagData.instance.prop.getItemCountByGoodsNo(this.nextCultivateVo.alchemy_no);
                if (num >= this.nextCultivateVo.alchemy_num) {
                    return true;
                }
            }
        }
        return false;
    }

    public get canRefine(): boolean {
        if (this.active) {
            var vo: PropertyVo;
            var _atrrName: string;
            var _curValue: number;
            var array: Array<any> = [PropertyEnumCode.OI_CODE_HP_LIM, PropertyEnumCode.OI_CODE_PHY_ATT, PropertyEnumCode.OI_CODE_MAG_ATT, PropertyEnumCode.OI_CODE_PHY_DEF, PropertyEnumCode.OI_CODE_MAG_DEF];
            for (let index = 0; index < array.length; index++) {
                var element = array[index];
                vo = PropertyVo.get(element);
                _atrrName = vo.sys_name;
                var num: number = 0;
                _curValue = this.getRefineValueByName(_atrrName);
                var arr: Array<any> = Pet_refineVo.getMListByName(_atrrName);
                var len: number = arr.length;
                for (let ind = 0; ind < len; ind++) {
                    const ele = arr[ind];
                    if (ele.num > 0) {
                        if (ele.add_top > _curValue) {
                            var allNum = SBagData.instance.prop.getItemCountByGoodsNo(ele.ele.no);
                            if (allNum >= 1) {
                                return true;
                            }
                        }
                    }
                }
                for (let inde = 0; inde < len; inde++) {
                    var elem = arr[inde];
                    if (elem.ele.add_top > _curValue) {
                        var allNum = SBagData.instance.prop.getItemCountByGoodsNo(elem.ele.no);
                        if (allNum >= 1) {
                            return true;
                        }
                    }
                }
            }
        }
        return false;
    }

    /**
     * 是否可以学习技能书
     * @readonly
     * @type {boolean}
     * @memberof PetInfo
     */
    public get canLearSkill(): boolean {
        for (let index = 0; index < this.skillSlots.length; index++) {
            var element = this.skillSlots[index];
            if (element.need) {
                if (this.CultivateLv >= element.need.lv && this.Layer >= element.need.layer) {
                    if (!element.vo) {
                        if (SBagData.instance.prop.petSkillList.length > 0) {
                            return true;
                        }
                    }
                }

            }
            else {
                if (!element.vo) {
                    if (SBagData.instance.prop.petSkillList.length > 0) {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    public get canActive(): boolean {
        var itemId = 0;
        var needNum = 0;
        var arr: Array<any> = this.activeItems;
        if (arr) {
            itemId = arr[0][0];
            needNum = arr[0][1];
        }
        var hadNum = SBagData.instance.prop.getItemCountByGoodsNo(itemId);
        return hadNum >= needNum;
    }

}