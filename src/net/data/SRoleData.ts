import { PropertyEnumCode } from './../../game/property/RoleProperty';
import { PlayerView } from './../../game/battle/role/PlayerView';
import { S12002_1 } from './../pt/pt_12';
import { S13001, S13002, S13081, S13120, S13013, S13012, S13012_1, S13010, S13011, C13001, S13008, S13047, S13048, S13046, S13045, S13117, S13030, S13034, S13300, S13301, S13302 } from './../pt/pt_13';
import { S10002, S10003, S10005, S10011, C10011, S10002_1, C10004 } from './../pt/pt_10';
import { Debug } from './../../debug/Debug';
import { MsgManager } from './../../game/ui/manager/MsgManager';
import { DataManager } from './../../message/manager/DataManager';
import { SocketManager } from './../SocketManager';
import { SGameEvent, SGameData } from './SGameData';
import { SelectRoleProtocol } from '../../game/ui/view/selectRole/protocol/SelectRoleProtocol';
import { S15060, S15061 } from '../pt/pt_15';
import { ItemData } from '../../game/ui/compent/data/ItemData';
import { SBagData } from './SBagData';
import { S17003 } from '../pt/pt_17';
import { PetInfo } from '../../game/ui/compent/data/PetInfo';
import { SPetData } from './SPetData';
import { SLogin, ServerMarkNO } from './SLogin';
import { STeamData } from '../../game/team/STeamData';
import { CommonControl } from '../../game/common/control/CommonControl';
import { SSkillData } from '../../game/skill/SSkillData';
import { RoleInfo } from '../../game/ui/compent/data/RoleInfo';
import { Jingmai_configVo } from '../../db/sheet/vo/Jingmai_configVo';
import { ConstVo } from '../../db/sheet/vo/ConstVo';
import { Heart_cfgVo } from '../../db/sheet/vo/Heart_cfgVo';
import { GameUtils } from '../../game/utils/GameUtils';
import { SdkManager } from '../SdkManager';
import { AchieveVo } from '../../db/sheet/vo/AchieveVo';
import { Fashion_cfgVo } from '../../db/sheet/vo/Fashion_cfgVo';
import { SGuildData } from '../../game/ui/view/guild/data/SGuildData';
export class SRoleData extends Laya.EventDispatcher {
    private roleList: Array<any> = [];
    private _roleId: number = 0;//角色id
    public info:RoleInfo = new RoleInfo();
    public achieveLv: number;//成就等级
    public CanAutoMove:boolean = true;//是否允许挂机
    public FoceStopMove:boolean = false;//强制停止挂机移动
    public IsNewRole:boolean = false;
    public NewCreateRoleTime:number = -1;
    public isWabaoing:boolean = false;//是否正在进行挖宝

    public get Titles()//所有称号
    {
        var list = this.allTitle.values.slice();
        var curNo = SRoleData.instance.info.GraphTitle;
        var table = this.allTitle.get(curNo);
        if(table)
        table.isHave = true;
        list.sort((a,b):number=>{
            if(a.sheet.no == curNo && b.sheet.no != curNo)
            {
                return -1;
            }
            else if(a.sheet.no != curNo && b.sheet.no == curNo)
            {
                return 1;
            }
            else
            {
                if(a.isHave && !b.isHave)
                {
                    return -1;
                }
                else if(!a.isHave && b.isHave)
                {
                    return 1;
                }
            }
            
        });
        return list;
    }
    public get Fashions()//所有时装
    {
        var list = [];
        var curNo = SRoleData.instance.info.Clothes;
        var table = this.allFashion.get(curNo);
        if(table)
        table.isHave = true;
        var dic = new Laya.Dictionary();
        for (let i = 0; i < this.allFashion.values.length; i++) {
            const element = this.allFashion.values[i];
            var _table = dic.get(element.sheet.type);
            if(_table)
            {
                if(element.isHave)
                {
                    dic.set(element.sheet.type,element);
                }
            }
            else
            {
                dic.set(element.sheet.type,element);
            }
        }
        list = dic.values;
        list.sort((a,b):number=>{
            if(a.sheet.no == curNo && b.sheet.no != curNo)
            {
                return -1;
            }
            else if(a.sheet.no != curNo && b.sheet.no == curNo)
            {
                return 1;
            }
            else
            {
                if(a.isHave && !b.isHave)
                {
                    return -1;
                }
                else if(!a.isHave && b.isHave)
                {
                    return 1;
                }
            }
            
        });
        return list;
    }
    public allTitle = new Laya.Dictionary();

    public allFashion = new Laya.Dictionary();
    private static _instance: SRoleData;
    public static get instance(): SRoleData {
        return SRoleData._instance || (SRoleData._instance = new SRoleData());
    }

    constructor() {
        super();
    }

    public unRegisterEvent()
    {
        this.roleList = [];
        this.achieveLv = 0;
        this.info.BattlePower = 0;
        this.CanAutoMove = true;
        this.FoceStopMove = false;
        this.allTitle.clear();
        this.allFashion.clear();
        DataManager.cancel(PROTOCOL.E10002, this, this.onGetRoleList);//获得角色列表
        DataManager.cancel(PROTOCOL.E10003, this, this.onCreateRoleSuc);//创建角色
        DataManager.cancel(PROTOCOL.E10005, this, this.onDeleteRoleSuc);//删除角色
        DataManager.cancel(PROTOCOL.E10011, this, this.onReName);//更改角色姓名
        DataManager.cancel(PROTOCOL.E13001, this, this.onGetRoleInfo);//获得角色简要信息
        DataManager.cancel(PROTOCOL.E13002, this, this.onGetOnlineRoleInfo);//获得在线玩家信息
        DataManager.cancel(PROTOCOL.E13010, this, this.onUpLevel);//玩家升级了
        DataManager.cancel(PROTOCOL.E13011, this, this.onUpdateMoney);//更新玩家货币
        DataManager.cancel(PROTOCOL.E13012, this, this.onUpdateRoleProp);//更新玩家属性
        DataManager.cancel(PROTOCOL.E13013, this, this.onJoinFaction);//获得加入门派
        DataManager.cancel(PROTOCOL.E13081, this, this.onGetVipInfo);//获得玩家vip信息
        DataManager.cancel(PROTOCOL.E13120, this, this.onChangeFaction);//玩家更换门派
        DataManager.cancel(PROTOCOL.E15060, this, this.onS15060);//穿装备
        DataManager.cancel(PROTOCOL.E15061, this, this.onS15061);//脱装备
        DataManager.cancel(PROTOCOL.E17003, this, this.onS17003);//设置主宠
        DataManager.cancel(PROTOCOL.E13008,this, this.onS13008);//角色加点
        DataManager.cancel(PROTOCOL.E13112,this, this.onS13112);//角色洗点
        DataManager.cancel(PROTOCOL.E13047,this, this.onS13047);//心法查询
        DataManager.cancel(PROTOCOL.E13048,this, this.onS13048);//心法升级
        DataManager.cancel(PROTOCOL.E13046,this, this.onS13046);//经脉查询
        DataManager.cancel(PROTOCOL.E13045,this, this.onS13045);//经脉升级
        DataManager.cancel(PROTOCOL.E13117,this, this.onSoarUpdate);//飞升更新 
        DataManager.cancel(PROTOCOL.E13030,this, this.onGetTitle);//已获得称号 
        DataManager.cancel(PROTOCOL.E13034,this, this.onUpdateTitle);//称号更新
        DataManager.cancel(PROTOCOL.E13300,this, this.onGetFahsion);// 自己拥有的所有时装列表 
        DataManager.cancel(PROTOCOL.E13301,this, this.onUpdateInstallFashion);//使用、停用时装
        DataManager.cancel(PROTOCOL.E13302,this, this.onUpdateFashion);//服务端主动推送时装
        
    }

    public registerEvent() {
        this.initAllTitle();
        DataManager.listen(PROTOCOL.E10002, this, this.onGetRoleList);//获得角色列表
        DataManager.listen(PROTOCOL.E10003, this, this.onCreateRoleSuc);//创建角色
        DataManager.listen(PROTOCOL.E10005, this, this.onDeleteRoleSuc);//删除角色
        DataManager.listen(PROTOCOL.E10011, this, this.onReName);//更改角色姓名
        DataManager.listen(PROTOCOL.E13001, this, this.onGetRoleInfo);//获得角色简要信息
        DataManager.listen(PROTOCOL.E13002, this, this.onGetOnlineRoleInfo);//获得在线玩家信息
        DataManager.listen(PROTOCOL.E13010, this, this.onUpLevel);//玩家升级了
        DataManager.listen(PROTOCOL.E13011, this, this.onUpdateMoney);//更新玩家货币
        DataManager.listen(PROTOCOL.E13012, this, this.onUpdateRoleProp);//更新玩家属性
        DataManager.listen(PROTOCOL.E13013, this, this.onJoinFaction);//获得加入门派
        DataManager.listen(PROTOCOL.E13081, this, this.onGetVipInfo);//获得玩家vip信息
        DataManager.listen(PROTOCOL.E13120, this, this.onChangeFaction);//玩家更换门派
        DataManager.listen(PROTOCOL.E15060, this, this.onS15060);//穿装备
        DataManager.listen(PROTOCOL.E15061, this, this.onS15061);//脱装备
        DataManager.listen(PROTOCOL.E17003, this, this.onS17003);//设置主宠
        DataManager.listen(PROTOCOL.E13008,this, this.onS13008);//角色加点
        DataManager.listen(PROTOCOL.E13112,this, this.onS13112);//角色洗点
        DataManager.listen(PROTOCOL.E13047,this, this.onS13047);//心法查询
        DataManager.listen(PROTOCOL.E13048,this, this.onS13048);//心法升级
        DataManager.listen(PROTOCOL.E13046,this, this.onS13046);//经脉查询
        DataManager.listen(PROTOCOL.E13045,this, this.onS13045);//经脉升级
        DataManager.listen(PROTOCOL.E13117,this, this.onSoarUpdate);//飞升更新
        DataManager.listen(PROTOCOL.E13030,this, this.onGetTitle);//已获得称号 
        DataManager.listen(PROTOCOL.E13034,this, this.onUpdateTitle);//称号更新
        DataManager.listen(PROTOCOL.E13300,this, this.onGetFahsion);// 自己拥有的所有时装列表 
        DataManager.listen(PROTOCOL.E13301,this, this.onUpdateInstallFashion);//使用、停用时装
        DataManager.listen(PROTOCOL.E13302,this, this.onUpdateFashion);//服务端主动推送时装
    }

    private initAllFashion()
    {
        var _allTitle = Fashion_cfgVo.getAllBySex(SRoleData.instance.info.Sex);
        for (let i = 0; i < _allTitle.length; i++) {
            const vo:Fashion_cfgVo = _allTitle[i];
            var table = {sheet:vo,isHave:false,expireTime:0};
            this.allFashion.set(vo.no,table);
        }
    }

    private initAllTitle()
    {
        var _allTitle = AchieveVo.getAll;
        for (let i = 0; i < _allTitle.length; i++) {
            const vo:AchieveVo = _allTitle[i];
            var table = {sheet:vo,isHave:false,expireTime:0};
            this.allTitle.set(vo.no,table);
        }
    }

    private onGetRoleList(data: S10002): void {
        if (data.RetCode == 0) {
            if (data.item_1.length <= 0) {
                this.IsNewRole = true;
                UIManager.instance.closeUI(UIID.START_GAME);
                UIManager.instance.openUI(UIID.CREATE_ROLE);//没有角色打开创角界面
                SLogin.instance.PostServerPoint(ServerMarkNO.CREATE_ROLE);
            }
            else {
                this.IsNewRole = false;
                UIManager.instance.closeUI(UIID.START_GAME);
                this.initRoleList(data.item_1);
                SLogin.instance.PostRoleInfoControl(data.item_1[0].Id,data.item_1[0].Name,data.item_1[0].Lv);
                SGameData.instance.requestEnterGame();
                //UIManager.instance.openUI(UIID.SELECT_ROLE, UILEVEL.POP_2);//有角色打开选角界面
            }
        }
        else {
            Debug.serverLog("没有玩家,请先创建玩家");
            UIManager.instance.openUI(UIID.CREATE_ROLE)

        }
    }

    private onCreateRoleSuc(data: S10003): void {
        if (data.RetCode == 0) {
            //创建角色成功
            this.roleId = data.NewRoleId;
            this.createRole(data);
            SLogin.instance.PostRoleInfoControl(data.NewRoleId,data.Name,1);
            UIManager.instance.closeUI(UIID.CREATE_ROLE);//关闭创建角色界面
            SGameData.instance.requestEnterGame();
            this.NewCreateRoleTime = data.TimeStamp;
            //this.event(SGameEvent.GAME_REQUEST_ENTERGAME);
            //UIManager.instance.openUI(UIID.SELECT_ROLE);//打开选角界面
        }
        else {
            var str: string;
            switch (data.RetCode) {
                case CreateRoleError.CR_FAIL_UNKNOWN:
                    str = "失败（未知错误）";
                    break;
                case CreateRoleError.CR_FAIL_ROLE_LIST_FULL:
                    str = "角色列表满了，不能再创建";
                    break;
                case CreateRoleError.CR_FAIL_NAME_EMPTY:
                    str = "角色名不能为空";
                    break;
                case CreateRoleError.CR_FAIL_NAME_TOO_SHORT:
                    str = "角色名太短";
                    break;
                case CreateRoleError.CR_FAIL_NAME_TOO_LONG:
                    str = "角色名太长";
                    break;
                case CreateRoleError.CR_FAIL_CHAR_ILLEGAL:
                    str = "角色名包含非法字符";
                    break;
                case CreateRoleError.CR_FAIL_NAME_CONFLICT:
                    str = "角色名已经被使用了，请重新输入名字";
                    break;
                case CreateRoleError.CR_FAIL_FACTION_ERROR:
                    str = "门派非法";
                    break;
                default:
                    break;
            }
            MsgManager.instance.showRollTipsMsg(str);
        }

    }

    private onDeleteRoleSuc(data: S10005): void {
        if (data.RetCode == 0) {
            this.event(SRoleEvent.ROLE_DELETEROLE_SUCCES);
        }
    }
    public newName: string;

    private onReName(data: S10011) {
        this.updateRoleInfo(this.newName);
        this.event(SRoleEvent.ROLE_NAME_CHANGE);
    }

    
    /**
     * 申请玩家简要信息
     * 
     */
    public requestRoleInfo():void
    {
        var msg:C13001 = new C13001();
        SocketManager.instance.send(msg);
    }

    private onGetFahsion(data:S13300)
    {
        this.info.Clothes = data.UsingFashion;
        for (let i = 0; i < data.item_1.length; i++) {
            const element = data.item_1[i];
            var table = this.allFashion.get(element.FashionID);
            if(table)
            {
                table.isHave = true;
                table.expireTime = element.ExpireTime;
            }
        }
        this.event(SRoleEvent.ROLE_FASHION_UPDATE);
    }

    private onUpdateInstallFashion(data:S13301)
    {
        this.info.Clothes = data.id;
        this.event(SRoleEvent.ROLE_FASHION_UPDATE);
    }

    private onUpdateFashion(data:S13302)
    {
        var table = this.allFashion.get(data.FashionID);
        if(!table)return;
        if(data.SyncType == 0)
        {
            if(this.info.Clothes == data.FashionID)
            {
                this.info.Clothes = 0;
            }
            table.isHave = false;
        }
        else
        {
            MsgManager.instance.showRollTipsMsg(`获得时装:${table.sheet.male_name}`);
            table.isHave = true;
        }
        table.expireTime = data.ExpireTime;
        this.event(SRoleEvent.ROLE_FASHION_UPDATE);
    }

    /**
     * 获得新称号
     * @param data 
     */
    private onGetTitle(data:S13030)
    {
        for (let i = 0; i < data.item_1.length; i++) {
            const element = data.item_1[i];
            var table = this.allTitle.get(element.titleID);
            if(table)
            {
                table.isHave = true;
                table.expireTime = element.expireTime;
            }
        }
    }

    public onUpdateTitle(data:S13034)
    {
        var table = this.allTitle.get(data.TitleID);
        if(!table)return;
        if(data.SyncType == 1)
        {
            table.isHave = true;
            table.expireTime = data.expireTime;
            MsgManager.instance.showRollTipsMsg(`获得称号:${table.sheet.male_name}`);
            this.event(SRoleEvent.ROLE_NEW_TITLE,data.TitleID);
        }
        else
        {
            table.isHave = false;
            table.expireTime = 0;
        }
        this.event(SRoleEvent.ROLE_TITLE_UPDATE);
    }

    private onGetRoleInfo(data: S13001): void {

        if(this.info == null)
        {
            this.info = new RoleInfo();
            STeamData.instance.protocol.RequsetTeamInfo(); 
        }
        else if (this.info.TeamId != data.TeamId)
        {
            STeamData.instance.protocol.RequsetTeamInfo(); 
        }
        
        this.info.initInfo(data);
        
        this.event(SRoleEvent.INIT_ROLE_DATA, data);

    }

    /**
     * 更新人物属性
     * @private
     * @param {S13012} data
     * @memberof SRoleData
     */
    private onUpdateRoleProp(data: S13012): void {
        var arr: Array<S13012_1> = data.item_1;
        var updateBattlePower = false;
        if (this.info) {
            for (let index = 0; index < arr.length; index++) {
                var element = arr[index];
                switch (element.Key) {
                    case PropertyEnumCode.OI_CODE_EXP:
                        this.info.Exp = element.NewValue;
                        break;
                    case PropertyEnumCode.OI_CODE_HP:
                        this.info.Hp = element.NewValue;
                        break;
                    case PropertyEnumCode.OI_CODE_HP_LIM:
                        this.info.HpLim = element.NewValue;
                        break;
                    case PropertyEnumCode.OI_CODE_MP:
                        this.info.Mp = element.NewValue;
                        break;
                    case PropertyEnumCode.OI_CODE_MP_LIM:
                        this.info.MpLim = element.NewValue;
                        break;
                    case PropertyEnumCode.OI_CODE_PHY_ATT:
                        this.info.PhyAtt = element.NewValue;
                        break;
                    case PropertyEnumCode.OI_CODE_MAG_ATT:
                        this.info.MagAtt = element.NewValue;
                        break;
                    case PropertyEnumCode.OI_CODE_PHY_DEF:
                        this.info.PhyDef = element.NewValue;
                        break;
                    case PropertyEnumCode.OI_CODE_MAG_DEF:
                        this.info.MagDef = element.NewValue;
                        break;
                    case PropertyEnumCode.OI_CODE_HIT:
                        this.info.Hit = element.NewValue;
                        break;
                    case PropertyEnumCode.OI_CODE_DODGE:
                        this.info.Dodge = element.NewValue;
                        break;
                    case PropertyEnumCode.OI_CODE_CRIT:
                        this.info.Crit = element.NewValue;
                        break;
                    case PropertyEnumCode.OI_CODE_TEN:
                        this.info.Ten = element.NewValue;
                        break;
                    case PropertyEnumCode.OI_CODE_ANGER:
                        this.info.Anger = element.NewValue;
                        break;
                    case PropertyEnumCode.OI_CODE_ANGER_LIM:
                        this.info.AngerLim = element.NewValue;
                        break;
                    case PropertyEnumCode.OI_CODE_LUCK:
                        this.info.Luck = element.NewValue;
                        break;
                    case PropertyEnumCode.OI_CODE_ACT_SPEED:
                        this.info.ActSpeed = element.NewValue;
                        break;
                    // case PropertyEnumCode.OI_CODE_ACT_SPEED://这里写错了移动速度不是攻击速度
                    //    this.info.MoveSpeed = element.NewValue;
                    //    break;
                    case PropertyEnumCode.OI_CODE_TALENT_STR:
                        this.info.Talent_Str = element.NewValue;
                        break;
                    case PropertyEnumCode.OI_CODE_TALENT_CON:
                        this.info.Talent_Con = element.NewValue;
                        break;
                    case PropertyEnumCode.OI_CODE_TALENT_STA:
                        this.info.Talent_Sta = element.NewValue;
                        break;
                    case PropertyEnumCode.OI_CODE_TALENT_SPI:
                        this.info.Talent_Spi = element.NewValue;
                        break;
                    case PropertyEnumCode.OI_CODE_TALENT_AGI:
                        this.info.Talent_Agi = element.NewValue;
                        break;
                    case PropertyEnumCode.OI_FREE_TALENT_POINTS:
                        this.info.FreeTalentPoints = element.NewValue;
                        break;
                    case PropertyEnumCode.OI_CODE_BATTLE_POWER:
                        {
                            if(this.info.BattlePower > 0)
                            {
                                var bt = this.info.BattlePower - element.NewValue;
                                if(bt != 0)
                                GameUtils.ShowBattlePower(this.info.BattlePower , element.NewValue);
                            }
                            this.info.BattlePower = element.NewValue;
                            updateBattlePower = true;
                            break;
                        }
                        
                    case PropertyEnumCode.OI_CODE_SEAL_HIT:
                        this.info.SealHit = element.NewValue;
                        break;
                    case PropertyEnumCode.OI_CODE_SEAL_RESIS:
                        this.info.SealResis = element.NewValue;
                        break;
                    case PropertyEnumCode.OI_CODE_FROZEN_HIT:
                        this.info.FrozenHit = element.NewValue;
                        break;
                    case PropertyEnumCode.OI_CODE_FROZEN_RESIS:
                        this.info.FrozenResis = element.NewValue;
                        break;
                    case PropertyEnumCode.OI_CODE_CHAOS_HIT:
                        this.info.ChaosHit = element.NewValue;
                        break;
                    case PropertyEnumCode.OI_CODE_RESIS_CHAOS:
                        this.info.ChaosResis = element.NewValue;
                        break;
                    case PropertyEnumCode.OI_CODE_TRANCE_HIT:
                        this.info.TranceHit = element.NewValue;
                        break;
                    case PropertyEnumCode.OI_CODE_TRANCE_RESIS:
                        this.info.TranceResis = element.NewValue;
                        break;
                    case PropertyEnumCode.OI_CODE_PHY_CRIT:
                        this.info.PhyCrit = element.NewValue;
                        break;
                    case PropertyEnumCode.OI_CODE_PHY_TEN:
                        this.info.PhyTen = element.NewValue;
                        break;
                    case PropertyEnumCode.OI_CODE_MAG_CRIT:
                        this.info.MagCrit = element.NewValue;
                        break;
                    case PropertyEnumCode.OI_CODE_MAG_TEN:
                        this.info.MagTen = element.NewValue;
                        break;
                    case PropertyEnumCode.OI_CODE_PHY_CRIT_COEF:
                        this.info.PhyCritCoef = element.NewValue;
                        break;
                    case PropertyEnumCode.OI_CODE_MAG_CRIT_COEF:
                        this.info.MagCritCoef = element.NewValue;
                        break;
                    case PropertyEnumCode.OI_CODE_HEAL_VALUE:
                        this.info.HealValue = element.NewValue;
                        break;
                    case PropertyEnumCode.OI_CODE_DO_PHY_DAM_SCALING:
                        this.info.DO_PHY_DAM_SCALING = element.NewValue;
                        break;
                    case PropertyEnumCode.OI_CODE_DO_MAG_DAM_SCALING:
                        this.info.DO_MAG_DAM_SCALING = element.NewValue;
                        break;
                    case PropertyEnumCode.OI_NEGLECT_SEAL_RESIS:
                        this.info.NEGLECT_SEAL_RESIS = element.NewValue;
                        break;
                    case PropertyEnumCode.OI_NEGLECT_PHY_DEF:
                        this.info.NEGLECT_PHY_DEF = element.NewValue;
                        break;
                    case PropertyEnumCode.OI_NEGLECT_MAG_DEF:
                        this.info.NEGLECT_MAG_DEF = element.NewValue;
                        break;
                    case PropertyEnumCode.OI_REVIVE_HEAL_COEF:
                        this.info.REVIVE_HEAL_COEF = element.NewValue;
                        break;
                    case PropertyEnumCode.OI_CODE_PHY_COMBO_ATT_PROBA:
                        this.info.PHY_COMBO_ATT_PROBA = element.NewValue;
                        break;
                    case PropertyEnumCode.OI_CODE_MAG_COMBO_ATT_PROBA:
                        this.info.MAG_COMBO_ATT_PROBA = element.NewValue;
                        break;
                    case PropertyEnumCode.OI_CODE_ABSORB_HP_COEF:
                        this.info.ABSORB_HP_COEF = element.NewValue;
                        break;
                    case PropertyEnumCode.OI_CODE_STRIKEBACK_PROBA:
                        this.info.STRIKEBACK_PROBA = element.NewValue;
                        break;
                    default:
                        break;
                }
                this.event(SRoleEvent.ROLE_CHANGE_PROP, [element.Key]);//人物属性改变
            }
        }

        this.event(SRoleEvent.ROLE_ALL_PROP_UPDATE);//人物总属性更新
        this.event(SRoleEvent.ROLE_BATTLE_POWER_UPDATE);//战力更新
    }

    private onGetOnlineRoleInfo(data: S13002): void {
        if (data.PlayerId == this.roleId) {
            this.info.initInfo(data);
            this.initAllFashion();
        }
        this.event(SRoleEvent.ROLE_GET_ONLINEROLEINFO, [data]);
    }

    private onUpLevel(data: S13010) {
        if (data.PlayerId == this.roleId) {
            this.info.Lv = data.NewLv;
            this.roleInfo.Lv = data.NewLv;
            SLogin.instance.PostRoleInfoControl(this.roleInfo.Id,this.roleInfo.Name,this.roleInfo.Lv);
            this.event(SRoleEvent.ROLE_CHANGE_LEVEL);//人物升级
            SdkManager.instance.SendLevelEvent();
        }
    }

    private onUpdateMoney(data: S13011): void {
        switch (data.MoneyType) {
            // case MoneyType.GAMEMONEY:
            //     this.info.GameMoney = data.NewNum;
            //     break;
            case MoneyType.YUANBAO:
                this.info.Yuanbao = data.NewNum;
                break;
            case MoneyType.BIND_GAMEMONEY:
                this.info.BindGameMoney = data.NewNum;
                break;
            case MoneyType.BIND_YUANBAO:
                this.info.BindYuanbao = data.NewNum;
                break;
            //case MoneyType.FEAT:
            //    this.info.Feat = data.NewNum;
            //    break;
            case MoneyType.GUILD_CONTRI:
                this.info.GuildContri = data.NewNum;
                break;
            case MoneyType.EXP:
                this.info.Exp = data.NewNum;
                break;
            case MoneyType.LITERARY:
                this.info.Literary = data.NewNum;
                break;
            case MoneyType.COPPER:
                this.info.Copper = data.NewNum;
                break;
            case MoneyType.VITALITY:
                this.info.Vitality = data.NewNum;
                break;
            //case MoneyType.CHIP:
            //    this.info.Chip = data.NewNum;
            //    break;
            case MoneyType.FORGE:
                this.info.GuildFeat = data.NewNum;
                break;
            case MoneyType.PAY_POINT:
                this.info.PayPoint = data.NewNum;
                break;
            case MoneyType.ACCOMPLISH_LEVEL:
                this.achieveLv = data.NewNum;
                break;
            case MoneyType.ACCOMPLISH_POINT:
                this.info.Contri = data.NewNum;
                break;
            case MoneyType.CREDIT:
                this.info.Credit = data.NewNum;
                break;
            case MoneyType.LOVE:
                this.info.Love = data.NewNum;
                break;
            default:
                break;
        }
        this.event(SRoleEvent.ROLE_CHANGE_MONEY, [data.MoneyType]);//货币更新
    }

    public getMoneyStrByType(moneyType: MoneyType): string {
        var value = "金钱";
        switch (moneyType) {
            case MoneyType.GAMEMONEY:
                value = "银币";
                break;
            case MoneyType.YUANBAO:
                value = "元宝";
                break;
            case MoneyType.BIND_GAMEMONEY:
                value = "银子";//本来这边，是“绑定银币”，以后游戏里面都叫“银子”；
                break;
            case MoneyType.BIND_YUANBAO:
                value = "绑定元宝";
                break;
            //case MoneyType.FEAT:
            //    value = "竞技积分";
            //    break;
            case MoneyType.GUILD_CONTRI:
                value = "帮派贡献度";
                break;
            case MoneyType.EXP:
                value = "经验";
                break;
            case MoneyType.LITERARY:
                value = "学分";
                break;
            case MoneyType.COPPER:
                value = "金币";
                break;
            case MoneyType.VITALITY:
                value = "体力值";
                break;
            //case MoneyType.CHIP:
            //    value = "筹码";               
            //    break;
            case MoneyType.FORGE:
                value = "巧匠值";
                break;
            case MoneyType.PAY_POINT:
                value = "充值积分";
                break;
            case MoneyType.ACCOMPLISH_LEVEL:
                value = "成就等级";         
                break;
            case MoneyType.ACCOMPLISH_POINT:
                value = "成就点";
                break;
            case MoneyType.CREDIT:
                value = "信用";
                break;
            case MoneyType.LOVE:
                value = "爱心";
                break;
            default:
                break;
        }
        return value;
    }

    public getMoneyByType(moneyType: MoneyType): number {
        var value: number = 0;
        switch (moneyType) {
            // case MoneyType.GAMEMONEY:
            //     value = this.info.GameMoney;
            //     break;
            case MoneyType.YUANBAO:
                value = this.info.Yuanbao;
                break;
            case MoneyType.BIND_GAMEMONEY:
                value = this.info.BindGameMoney;
                break;
            case MoneyType.BIND_YUANBAO:
                value = this.info.BindYuanbao;
                break;
            //case MoneyType.FEAT:
            //    value = this.info.Feat;
            //    break;
            case MoneyType.GUILD_CONTRI:
                value = this.info.GuildContri;
                break;
            case MoneyType.EXP:
                value = this.info.Exp;
                break;
            case MoneyType.LITERARY:
                value = this.info.Literary;
                break;
            case MoneyType.COPPER:
                value = this.info.Copper;
                break;
            case MoneyType.VITALITY:
                value = this.info.Vitality;
                break;
            //case MoneyType.CHIP:
            //    value = this.info.Chip;
            //    break;
            case MoneyType.FORGE:
                value = this.info.GuildFeat;
                break;
            case MoneyType.PAY_POINT:
                value = this.info.PayPoint;
                break;
            case MoneyType.ACCOMPLISH_LEVEL:
                value = this.achieveLv;
                break;
            case MoneyType.ACCOMPLISH_POINT:
                value = this.info.Contri;
                break;
            case MoneyType.CREDIT:
                value = this.info.Credit;
                break;
            case MoneyType.LOVE:
                value = this.info.Love;
                break;
            default:
                break;
        }
        return value;
    }

    private onS15060(data:S15060): void {
        if(data.Location == BagType.LOC_PLAYER_EQP)
        {
            var equip:ItemData = new ItemData(data);
            if(equip.isWeapon)
            {
                this.info.Weapon = equip.GoodsNo;
                this.event(SRoleEvent.ROLE_WEAPON_CHANGE);
            }
        }
    }

    private onS15061(data:S15061): void {
        if(data.Location == BagType.LOC_PLAYER_EQP)
        {
            var equip:ItemData = SBagData.instance.role.getItemDataByGoodId(data.GoodsId);
            if(equip && equip.isWeapon)
            {
                this.info.Weapon = 0;
                this.event(SRoleEvent.ROLE_WEAPON_CHANGE);
            }
        }
    }

    private onS13046(data:S13046):void
    {
        this.info.JinmaiNo = data.No;
        this.event(SRoleEvent.ROLE_JING_MAI_CALL_BACK);
    }

    private onS13045(data:S13045):void
    {
        this.info.JinmaiNo = data.No;
        this.event(SRoleEvent.ROLE_JING_MAI_CALL_BACK);
    }
    /**
     * 心法升级
     * @param data 
     */
    private onS13048(data:S13048):void
    {
        this.info.HeartExp = data.CurExp;
        this.info.HeartNo = data.No;
        this.event(SRoleEvent.ROLE_HEART_CALL_BACK);
    }
    /**
     * 心法查询
     * @param data 
     */
    private onS13047(data:S13047):void
    {
        this.info.HeartExp = data.CurExp;
        this.info.HeartNo = data.No;
        this.event(SRoleEvent.ROLE_HEART_CALL_BACK);
    }

    private onS17003(data:S17003):void
    {
        if(data.RetCode == 0)
        {
            var info:PetInfo = SPetData.instance.getPetInfoByPartnerId(data.PartnerId);
            if(info)
            {
                this.info.PartnerNo = info.PartnerNo;
                this.event(SRoleEvent.ROLE_PARTERNER_CHANGE);
            }
        }
    }

    private onS13008(data:S13008):void
    {
        if(data.RetCode == 0)
        {
            this.event(SRoleEvent.ROLE_ADD_POINT);
        }
    }

    private onS13112(data:any):void
    {
        if(data.RetCode == 0)
        {
            this.event(SRoleEvent.ROLE_WASH_POINT);
        }
    }
    

    /**
     * 成就等级
     * @private
     * @param {number} value
     * @returns {number}
     * @memberof SRoleData
     */
    private getAchieveLv(value: number): number {
        if (this.achieveLv > 0) {
            return this.achieveLv;
        }
        return 1;
        // return Accomplish_levelVo.getData(this.playerInfo.Contri)?Accomplish_levelVo.getData(this.playerInfo.Contri).no:1;
    }

    private onGetVipInfo(data: S13081): void {
        this.updateVipInfo(data.VipLv);
        this.event(SRoleEvent.ROLE_CHANGE_VIPLEVEL);
    }

    private onJoinFaction(data: S13013): void {
        if (data.RetCode == 0) {
            this.roleInfo.Faction = data.Faction;
            this.event(SRoleEvent.ROLE_CHANGE_FACTION);
        }
    }

    private onChangeFaction(data: S13120): void {
        if (data.RetCode == 0) {
            this.roleInfo.Faction = data.Faction;
            this.event(SRoleEvent.ROLE_CHANGE_FACTION);
        }
    }

    private onSoarUpdate(data:S13117):void {
        if (data.Code == 0) {
            this.info.Soaring = data.SoaringLv;
            this.event(SRoleEvent.ROLE_SOAR_UPDARE);
        }
    }

    /**
     * 初始化角色列表
     * @static
     * @param {Array<S10002_1>} data 
     * @memberof SRoleData.instance
     */
    public initRoleList(data: Array<S10002_1>): void {
        this.roleList = data;
        if (this.roleList.length > 0) {
            this.roleId = this.roleList[0].Id;
        }
    }

    /**
     * 创建角色
     * @static
     * @param {S10003} data 
     * @memberof SRoleData.instance
     */
    public createRole(data: S10003): void {
        var role: S10002_1 = new S10002_1();
        role.Id = data.NewRoleId;
        role.LocalId = data.NewRoleLocalId;
        role.Lv = 1;
        role.IsBanned = 0;
        role.Race = data.Race;
        role.Faction = data.Faction;
        role.Sex = data.Sex;
        role.Name = data.Name;
        if (!this.roleList) {
            this.roleList = [];
        }
        this.roleList.push(role);
    }

    /**
     * 删除一个角色
     * @static
     * @param {number} id 
     * @memberof SRoleData.instance
     */
    public deleteRole(id: number): void {
        for (let index = 0; index < this.roleList.length; index++) {
            var element: S10002_1 = this.roleList[index];
            if (element.Id == id) {
                this.roleList.splice(index, 1);
            }
        }
    }

    /**
     * 更新玩家信息
     * @static
     * @param {string} name 
     * @param {number} [lv=-1] 
     * @memberof SRoleData.instance
     */
    public updateRoleInfo(name: string, lv: number = -1): void {
        name && (this.roleInfo.Name = name);
        if (lv > 0) {
            this.roleInfo.Lv = lv;
        }
    }

    private updateVipInfo(lv: number): void {
        this.info && (this.info.VipLv = lv);
    }

    /**
     * 获得角色信息
     * @readonly
     * @static
     * @type {S10002_1}
     * @memberof SRoleData.instance
     */
    public get roleInfo(): S10002_1 {
        for (let index = 0; index < this.roleList.length; index++) {
            var element: S10002_1 = this.roleList[index];
            if (element.Id == this._roleId) {
                return element;
            }
        }
        return new S10002_1();
    }

    /**
     * 主角id  在选择角色界面切换角色的时候需要重新赋值
     * @static
     * @memberof SRoleData.instance
     */
    public set roleId(value: number) {
        this._roleId = value;
    }
    public get roleId(): number {
        return this._roleId;
    }

    public get roleName(): string {
        if (this.roleInfo) {
            return this.roleInfo.Name;
        }
        return "";
    }

    // public get showRed():boolean
    // {
    //     if(SBagData.instance.equip.equipList.length > 0)
    //     {
    //         return true;
    //     }
    //     if(SSkillData.instance.SkillRedUpdate())
    //     {
    //         return true;
    //     }
    //     if(this.JinMaiRed)
    //     return true;
    //     if(this.HearMethodRed)
    //     return true;
    //     return false;
    // }

    public get HearMethodRed():boolean
    {
        var openFuc = UIManager.instance.fuc;
        if (openFuc && !openFuc.hasOpen(UIID.SYS_ROLE_XINGFA)) {
            return false;
        }
        var currentNo = this.info.HeartNo;
        if(currentNo == 0)
        currentNo = 1;
        else
        currentNo ++; 
        var sheet:Heart_cfgVo= Heart_cfgVo.get(currentNo);
        if(!sheet||(sheet&&!sheet.exp)) return false;
        var vos:Array<any> = ConstVo.get("GAME_XINFA_GOODS_TO_EXP").val
        var goodsId = vos[0];
        var num = SBagData.instance.prop.getItemCountByGoodsNo(goodsId);
        if(num > 0)
        return true;
        else
        return false;
    }

    public get JinMaiRed():boolean
    {
        var currentNo = this.info.JinmaiNo;
        if(currentNo == 0)
        currentNo = 1;
        else
        currentNo ++; 
        var sheet:Jingmai_configVo = Jingmai_configVo.get(currentNo);
        if(!sheet||(sheet&&!sheet.costs)) return false;
        var item = sheet.costs[0];
        var goodsId = item[0];
        var goodsNum = item[1];
        var num = SBagData.instance.prop.getItemCountByGoodsNo(goodsId);
        if(num >= goodsNum)
        return true;
        else
        return false;
    }
}

export enum SRoleEvent {
    ROLE_REQUEST_CREATEROLE = "role_request_createRole",//申请创建角色
    ROLE_REQUEST_ROLEINFO = "role_request_roleInfo",//申请角色简要信息
    ROLE_REQUEST_DELETEROLE = "role_request_deleteRole",//申请删除角色
    ROLE_CRETEROLE_SUCCES = "role_createRole_succes",//创建角色成功
    ROLE_DELETEROLE_SUCCES = "role_deleteRole_succes",//删除角色成功
    ROLE_NAME_CHANGE = "role_name_change",//角色改名
    ROLE_GET_ONLINEROLEINFO = "role_get_onlineRoleInfo",//在线玩家信息
    ROLE_CHANGE_VIPLEVEL = "role_change_vipLevel",//人物vip等级变化
    ROLE_CHANGE_FACTION = "role_change_faction",//人物更换门派
    ROLE_CHANGE_PROP = "role_change_prop",//人物属性改变
    ROLE_CHANGE_LEVEL = "role_change_level",//人物等级改变
    ROLE_CHANGE_MONEY = "role_changeMoney",//人物货币更新
    INIT_ROLE_DATA = "init_role_data",//初始化玩家的属性
    ROLE_WEAPON_CHANGE = "role_weapon_change",//武器更新
    ROLE_PARTERNER_CHANGE = "role_weapon_change",//主宠物更新
    ROLE_ALL_PROP_UPDATE = "role_all_prop_update",//人物属性有更新不管哪条
    ROLE_REQUEST_ADD_POINT = "role_request_add_point",//角色加点
    ROLE_REQUEST_WASH_POINT = "role_request_wash_point",//洗点
    ROLE_ADD_POINT = "role_add_point",//加点回调
    ROLE_WASH_POINT = "role_wash_point",//洗点回调
    ROLE_REQUEST_HEART_UPGRADE = "role_quest_heart_upgrade",//请求心法升级
    ROLE_HEART_CALL_BACK = "role_heart_call_back",//心法升级回调
    ROLE_REQUEST_JING_MAI_UPGRADE = "role_quest_jing_mai_upgrade",//请求经脉升级
    ROLE_JING_MAI_CALL_BACK = "role_jing_mai_call_back",//经脉
    ROLE_SOAR_UPDARE = "role_soar_update",//飞升更新
    ROLE_REQUEST_SOAR = "role_request_soar",//请求飞升
    ROLE_BATTLE_POWER_UPDATE = "role_battle_power_update",//更新战力
    ROLE_AUTO_MOVE_UPDATE = "role_auto_move_update",//自动挂机更新
    ROLE_LOCALPLAYER_MOVE_END = "role_localplayer_move_end",//本地玩家移动结束
    ROLE_TITLE_UPDATE = "role_title_update",//称号更新
    ROLE_NEW_TITLE = "role_new_title",//玩家获得新称号
    ROLE_USE_TITLE = "role_use_title",//玩家使用称号
    ROLE_USE_FASHION_UPDATE = "role_use_fashion_update",//正在使用的时装更新
    ROLE_FASHION_UPDATE = "role_fashion_update",//时装更新

}
