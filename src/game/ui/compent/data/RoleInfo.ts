import { S13001_1, S13001, S13002 } from "../../../../net/pt/pt_13";

export class RoleInfo {
  public SceneId:number = 0;//所在场景唯一ID
  public SceneNo:number = 0;//所在场景编号
  public X:number = 0;//X坐标
  public Y:number = 0;//Y坐标
  public Hp:number = 0;//血量
  public HpLim:number = 0;//血量上限
  public Mp:number = 0;//魔法值
  public MpLim:number = 0;//魔法值上限
  public Exp:number = 0;//当前经验
  public ExpLim:number = 0;//经验上限
  public Yuanbao:number = 0;//元宝
  public BindYuanbao:number = 0;//绑定的元宝
//   public GameMoney:number = 0;//游戏币  -----游戏里面的银币，不用他了，用绑定银币，叫银子，
  public BindGameMoney:number = 0;//绑定的游戏币
  public Feat:number = 0;//功勋值
  public MoveSpeed:number = 0;//移动速度
  public GuildName:string = "";//所属帮派的名字（如果没有加入帮派，则返回空字符串）
  public GraphTitle:number = 0;//图片称号
  public TextTitle:number = 0;//文字称号
  public UserDefTitle:string = "";//自定义称号
  public GraphTitleAttr:number = 0;//图片称号属性
  public TextTitleAttr:number = 0;//文字称号属性
  public BackWear:number = 0;//背饰编号
  public Weapon:number = 0;//武器编号
  public Headwear:number = 0;//头饰编号
  public Clothes:number = 0;//服饰编号
  public PartnerNo:number = 0;//主宠物编号
  public ParWeapon:number = 0;//主宠武器编号影响外形
  public EvolveLv:number = 0;//宠物进化等级影响外形
  public CultivateLv:number = 0;//主宠修炼等级
  public CultivateLayer:number = 0;//主宠修炼层数
  public ParQuality:number = 0;//主宠品质
  public ParClothes:number = 0;//主宠画皮即衣服
  public item_1 : S13001_1[] = [];
  public GuildContri:number = 0;//当前帮派贡献度
  public PartnerName:string = "";//主宠物名字
  public CurBattleId:number = 0;//当前的战斗id（如果不在战斗中，则返回0）
  public VipLv:number = 0;//当前vip等级
  public Literary:number = 0;//学分
  public IsLeader:number = 0;//是否是队长1是0不是
  public TeamId:number = 0;//队伍id，没有则为0
  public FPartnerNo:number = 0;//跟随宠物编号
  public FParWeapon:number = 0;//跟随武器编号
  public FParEvolveLv:number = 0;//跟随进化等级
  public FParCultivateLv:number = 0;//跟随修炼等级
  public FParCultivateLayer:number = 0;//跟随修炼等级
  public FParQuality:number = 0;//跟随品质
  public FParName:string = "";//跟随名字
  public FParClothes:number = 0;//跟随画皮即衣服
  public PrivLv:number = 0;//权限级别（0：普通玩家，1：指导员，2：GM）
  public GuildChiefId:number = 0;//所在帮派帮主id，如果还没有加入帮派则为0
  public SpouseId:number = 0;//配偶id（玩家id）
  public SpouseName:string;//配偶名字
  public FreeStrenCnt:number = 0;//今天剩余免费强化装备次数
  public Contri:number = 0;//玩家成就功绩值最大值
  public MagicKeyNo:number = 0;//法宝编号
  public MountNo:number = 0;//坐骑编号
  public MountStep:number = 0;//坐骑阶数
  public Copper:number = 0;//铜币
  public Vitality:number = 0;//体力值
  public Chivalrous:number = 0;//功德值
  public Popular:number = 0;//人气值
  public Chip:number = 0;//筹码
  public Soaring:number = 0;//飞升次数
  public TransfigurationNo:number = 0;//变身卡
  public GuildFeat:number = 0;//巧匠值
  public PaodianType:number = 0;//泡点类型
  public TransfigurationP:number = 0;//变身卡点数
  public PayPoint:number = 0;//充值积分
  public CurAchieve:number = 0;//玩家当前剩余成就功绩值
  public TimeStamp:number = 0;//unix时间戳
  public Credit:number = 0;//信用
  public StoreExp:number = 0;//存储经验
  public PlayerId:number = 0;//玩家id
  public Race:number = 0;//种族
  public Faction:number = 0;//门派
  public Sex:number = 0;//性别
  public Lv:number = 0;//等级
  public PhyAtt:number = 0;//物理攻击
  public MagAtt:number = 0;//法术攻击
  public PhyDef:number = 0;//物理防御
  public MagDef:number = 0;//法术防御
  public Hit:number = 0;//命中
  public Dodge:number = 0;//闪避
  public Crit:number = 0;//暴击
  public Ten:number = 0;//坚韧（抗暴击）
  public Anger:number = 0;//怒气
  public AngerLim:number = 0;//怒气上限
  public Luck:number = 0;//幸运
  public ActSpeed:number = 0;//战斗中的出手速度
  public Talent_Str:number = 0;//力量（strength）
  public Talent_Con:number = 0;//体质（constitution）
  public Talent_Sta:number = 0;//耐力（stamina）
  public Talent_Spi:number = 0;//灵力（spirit）
  public Talent_Agi:number = 0;//敏捷（agility）
  public FreeTalentPoints:number = 0;//自由（未分配的）天赋点数
  public BattlePower:number = 0;//战斗力
  public GuildId:number = 0;//帮派id，如果还没有加入帮派则为0
  public SealHit:number = 0;//封印命中
  public SealResis:number = 0;//封印抗性
  public FrozenHit:number = 0;//隔绝命中
  public FrozenResis:number = 0;//隔绝抗性
  public ChaosHit:number = 0;//混乱命中
  public ChaosResis:number = 0;//混乱抗性
  public TranceHit:number = 0;//昏睡命中
  public TranceResis:number = 0;//昏睡抗性
  public PhyCrit:number = 0;//物理暴击
  public PhyTen:number = 0;//抗物理暴击
  public MagCrit:number = 0;//法术暴击
  public MagTen:number = 0;//抗法术暴击
  public PhyCritCoef:number = 0;//物理暴击程度
  public MagCritCoef:number = 0;//法术暴击程度
  public HealValue:number = 0;//治疗强度
  public DO_PHY_DAM_SCALING:number = 0;//物理伤害
  public DO_MAG_DAM_SCALING:number = 0;//法术伤害
  public NEGLECT_SEAL_RESIS:number = 0;//忽视抗封
  public NEGLECT_PHY_DEF:number = 0;//忽视物理防御
  public NEGLECT_MAG_DEF:number = 0;//忽视法术防御
  public REVIVE_HEAL_COEF:number = 0;//复活治疗
  public PHY_COMBO_ATT_PROBA:number = 0;//
  public MAG_COMBO_ATT_PROBA:number = 0;//
  public ABSORB_HP_COEF:number = 0;//
  public STRIKEBACK_PROBA:number = 0;//
/**心法相关字段**/
  public HeartNo:number = 0;//当前心法编号
  public HeartExp:number = 0;//到期心法经验
/**经脉**/
  public JinmaiNo:number = 0;//当前经脉编号
  public Love:number = 0;//爱心值
    constructor() {
        
    }

    public initInfo(info:S13001|S13002):void
    {
        for (const key in info) {
            if (this.hasOwnProperty(key)) {
                this[key] = info[key];
            }
        }
    }
}