import { Sys_openVo } from "../../../db/sheet/vo/Sys_openVo";
import { SGameData } from "../../../net/data/SGameData";
import { MsgManager } from "./MsgManager";
import { SChapterData } from "../../chapter/SChapterData";
import { AwardUtil } from "../../award/AwardUtil";
import { SChaosBattleData } from "../../activity/data/SChaosBattleData";
import { SceneManager } from "../../battle/scene/SceneManager";
import { SRoleData } from "../../../net/data/SRoleData";
import { FbVo } from "../../../db/sheet/vo/FbVo";
import { SGuildData } from "../view/guild/data/SGuildData";
import { ConstVo } from "../../../db/sheet/vo/ConstVo";
import { SAoiEvent, SAoiData } from "../../aoi/SAoiData";
import { Pve_activityVo } from "../../../db/sheet/vo/Pve_activityVo";
import { SBossData } from "../view/copy/BossCopy/data/SBossData";

export class FucManager {
    private vo: Sys_openVo;
    constructor() {

    }

    public isOpen(id: number): boolean {
        var needCheck = false;
        for (let i = 0; i < this.needCheckList.length; i++) {
            var ele = this.needCheckList[i];
            if (ele == id) {
                needCheck = true;
                break;
            }
        }
        if (needCheck == false) {
            return true;
        }
        this.vo = Sys_openVo.get(id);
        if (this.vo && this.vo.no) {
            if (SGameData.instance.hasOpen(id)) {
                return true;
            }
            MsgManager.instance.showRollTipsMsg(this.vo.sys_name + this.vo.lv_need + "级开启");
            return false;
        }
        return true;
    }

    public hasOpen(id: number): boolean {
        var needCheck = false;
        for (let i = 0; i < this.needCheckList.length; i++) {
            var ele = this.needCheckList[i];
            if (ele == id) {
                needCheck = true;
                break;
            }
        }
        if (needCheck == false) {
            return true;
        }
        this.vo = Sys_openVo.get(id);
        if (this.vo && this.vo.no) {
            if (SGameData.instance.hasOpen(id)) {
                return true;
            }
            return false;
        }
        return true;
    }

    private needCheckList = [
        UIID.PET, UIID.PET_UPGRADE, UIID.SYS_COPY_STUFF, UIID.SYS_COPY_BOSS, UIID.SYS_WORLD_BOSS, UIID.SYS_MOUNT,
        UIID.SYS_MATERIAL_DUNGEON, UIID.SYS_EQ_QILING, UIID.PET_SKILL, UIID.PET_XIULIAN, UIID.SYS_EQ_BAOSHI, UIID.SYS_RELATION,
        UIID.SYS_MOUNT_STAR, UIID.SYS_ROLE_JINGMAI, UIID.SYS_COMATE, UIID.SYS_COMATE_LVUP, UIID.SYS_TOWER, UIID.SYS_ACTIVITY,
        UIID.SYS_DAY_TASK, UIID.SYS_TEAM, UIID.SYS_COMATE_STAR, UIID.SYS_PET_DIANHUA, UIID.SYS_RANK, UIID.PET_LIANHUA,
        UIID.SYS_MOUNT_FEISHENG, UIID.SYS_ROLE_XINGFA, UIID.SYS_PET_SHOULING, UIID.SYS_COMATE_TALENT, UIID.SYS_OFFLINE_ARENA,
        UIID.SYS_DIG_TASK, UIID.SYS_GUILD,
    ];


    /**
     * 打开面板的跳转
     */
    private static openPanel(guideCfg: any) {
        if (!guideCfg || guideCfg.length <= 0) {
            return;
        }
        var sys_ui_name: string = guideCfg[0];
        var tabIndex: number = guideCfg[1] || 0;
        var arg = guideCfg[3];
        var hasShow = UIManager.instance.hasOpenUI(UIID[sys_ui_name]);
        if (hasShow) return;
        UIManager.instance.openUI(UIID[sys_ui_name], arg, tabIndex);
    }

    public static doCfgAction(guideCfg: any) {
        if (!guideCfg || guideCfg.length <= 0) {
            return;
        }
        var sys_ui_name: string = guideCfg[0];
        if (UIID[sys_ui_name] == UIID.SYS_CHALLENGE_BOSS && SChapterData.instance.chapter.IsCanGetAward) {
            //打开BOSS挑战界面
            MsgManager.instance.showRollTipsMsg("领取完章节奖励，方可继续挑战哦！");
            var awardId = SChapterData.instance.chapter.CurrentChapterAwardId;
            var goodsList = AwardUtil.GetNormalGoodsList(awardId);
            UIManager.instance.openUI(UIID.SYS_CHALLENGE_RESULT, [0, goodsList, false]);
        } else if (UIID[sys_ui_name] == UIID.CHAT) {
            //聊天界面
            var arg = guideCfg[1];
            var wordList = (arg as any).split("|");
            var showWord = wordList[Math.floor(Math.random() * wordList.length)];
            UIManager.instance.openUI(UIID[sys_ui_name], [showWord]);
        } else if (UIID[sys_ui_name] == UIID.FUNC_GOTO_SCENE) {
            //切换场景
            var arg = guideCfg[1];
            if (SRoleData.instance.info.SceneNo == arg) {
                MsgManager.instance.showRollTipsMsg("你已在该场景，无需跳转");
                return;
            }
            SceneManager.instance.enterScene(arg);
        } else if (UIID[sys_ui_name] == UIID.FUNC_GOTO_LUANDOU) {
            //进入欢乐大乱斗
            SChaosBattleData.instance.protocol.send28001();
        } else if (UIID[sys_ui_name] == UIID.FUNC_SHOW_WORD) {
            //显示tips
            var arg = guideCfg[1];
            MsgManager.instance.showRollTipsMsg(arg);
        } else if (UIID[sys_ui_name] == UIID.FUNC_GOTO_YZMG) {
            //前往月之迷宫
            var arg = guideCfg[1];
            var vos = FbVo.getListByType(CopyType.Grid);
            var nos = [];
            for (let i = 0; i < vos.length; i++) {
                const vo: FbVo = vos[i];
                nos.push(vo.no);
            }
            UIManager.instance.openUI(UIID.SYS_COPY_SELECT_PANEL, [nos]);
        }
        else if (UIID[sys_ui_name] == UIID.FUNC_GOTO_WJSL) {
            //前往无尽试炼
            var cfg = Pve_activityVo.get(1);
            SBossData.instance.askIngWJSSId = cfg.no;
            SBossData.instance.protocol.send16009(cfg.no);
        } else if (UIID[sys_ui_name] == UIID.FUNC_GOTO_WJSL2) {
            //前往无尽试炼2
            var cfg = Pve_activityVo.get(2);
            SBossData.instance.askIngWJSSId = cfg.no;
            SBossData.instance.protocol.send16009(cfg.no);
        } else if (UIID[sys_ui_name] == UIID.FUNC_GOTO_GUILD) {
            SGuildData.instance.gotoGuildPlace();
        } else {
            this.openPanel(guideCfg);
        }
    }



}