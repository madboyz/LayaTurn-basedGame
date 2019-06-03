import { DataManager } from "../../../../../../message/manager/DataManager";
import { S57024, S57023, S57024_2, S57024_2_1, S57026, S57027, S57028, S57029, S57029_2, C57029_1, S57031, S57032, C57033_1, S57033, S57035, S57033_2 } from "../../../../../../net/pt/pt_57";
import { BossProtocol } from "../protocol/BossProtocol";
import { Super_boss_chap_cfgVo } from "../../../../../../db/sheet/vo/Super_boss_chap_cfgVo";
import { S16009 } from "../../../../../../net/pt/pt_16";
import { CommonControl } from "../../../../../common/control/CommonControl";

export class SBossData extends Laya.EventDispatcher {
    private static _instance: SBossData;
    public protocol: BossProtocol;

    public static get instance(): SBossData {
        return SBossData._instance || (SBossData._instance = new SBossData());
    }
    constructor() {
        super();
        this.protocol = new BossProtocol;
    }

    public unRegisterEvent() {
        DataManager.cancel(PROTOCOL.E57023, this, this.on57023);
        DataManager.cancel(PROTOCOL.E57024, this, this.on57024);
        DataManager.cancel(PROTOCOL.E57026, this, this.on57026);
        DataManager.cancel(PROTOCOL.E57027, this, this.on57027);
        DataManager.cancel(PROTOCOL.E57028, this, this.on57028);
        DataManager.cancel(PROTOCOL.E57029, this, this.on57029);
        DataManager.cancel(PROTOCOL.E57031, this, this.on57031);
        DataManager.cancel(PROTOCOL.E57032, this, this.on57032);
        DataManager.cancel(PROTOCOL.E57033, this, this.on57033);
        DataManager.cancel(PROTOCOL.E57035, this, this.on57035);
        DataManager.cancel(PROTOCOL.E16009, this, this.on16009);

    }

    public registerEvent() {
        DataManager.listen(PROTOCOL.E57023, this, this.on57023);
        DataManager.listen(PROTOCOL.E57024, this, this.on57024);
        DataManager.listen(PROTOCOL.E57026, this, this.on57026);
        DataManager.listen(PROTOCOL.E57027, this, this.on57027);
        DataManager.listen(PROTOCOL.E57028, this, this.on57028);
        DataManager.listen(PROTOCOL.E57029, this, this.on57029);
        DataManager.listen(PROTOCOL.E57031, this, this.on57031);
        DataManager.listen(PROTOCOL.E57032, this, this.on57032);
        DataManager.listen(PROTOCOL.E57033, this, this.on57033);
        DataManager.listen(PROTOCOL.E57035, this, this.on57035);
        DataManager.listen(PROTOCOL.E16009, this, this.on16009);
    }

    //组尊BOSS相关处理==================================================================================
    public superBossShowingChap: number;//打开面板的章节

    public superBossChapInfo: S57023;//至尊BOSS章节信息
    public superBossInfo: S57024;//至尊BOSS
    public on57023(data: S57023) {
        this.superBossChapInfo = data;
        this.event(SBossEvent.SUPER_BOSS_INFO);
    }
    public on57024(data: S57024) {
        if (!this.superBossInfo) {
            this.superBossInfo = data;
        } else {
            for (let i = 0; i < data.item_2.length; i++) {
                const element = data.item_2[i];
                var cacheData = this.getSuperBossChap(element.ChapterID);
                if (!cacheData) {
                    this.superBossInfo.item_2.push(element);
                } else {
                    cacheData.ChapterID = element.ChapterID;
                    cacheData.FirstKillName = element.FirstKillName;
                    cacheData.item_1 = element.item_1;
                }
            }
        }
        this.event(SBossEvent.SUPER_BOSS_INFO);
    }
    public on57026(data: S57026) {
        for (let i = 0; i < this.superBossInfo.item_2.length; i++) {
            const element = this.superBossInfo.item_2[i];
            for (let j = 0; j < element.item_1.length; j++) {
                const element2 = element.item_1[j];
                if (element2.DunNo == data.DunNo) {
                    element2.RwdState = 3;
                }
            }
        }
        this.event(SBossEvent.SUPER_BOSS_INFO);
    }
    public on57027(data: S57027) {
        var nowData = this.getSuperBossChap(data.ChapterID);
        nowData && (nowData.FKState = 1);
        this.event(SBossEvent.SUPER_BOSS_INFO);
    }

    public getSuperBossChap(chapId: number): S57024_2 {
        if (!this.superBossInfo) {
            return null
        }
        for (let i = 0; i < this.superBossInfo.item_2.length; i++) {
            const element = this.superBossInfo.item_2[i];
            if (element.ChapterID == chapId) {
                return element;
            }
        }
        return null;
    }

    public getSuperBossDunInfo(chapId: number, dunNo: number): S57024_2_1 {
        if (!this.superBossInfo) {
            return null
        }
        for (let i = 0; i < this.superBossInfo.item_2.length; i++) {
            const element = this.superBossInfo.item_2[i];
            if (element.ChapterID == chapId) {
                for (let j = 0; j < element.item_1.length; j++) {
                    const element2 = element.item_1[j];
                    if (element2.DunNo == dunNo) {
                        return element2;
                    }
                }
            }
        }
        return null;
    }

    public getNowCanFightMaxChap(): number {
        if (!this.superBossChapInfo) {
            return 1;
        }
        return this.superBossChapInfo.ChapterID;
    }

    //三界副本相关处理==================================================================================
    public sanjieDunChapInfo: S57028;//三界副本，最大信息
    public sanjieDunInfo: Laya.Dictionary;//三界副本数据
    public on57028(data: S57028) {
        this.sanjieDunChapInfo = data;
        if (!this.sanjieDunInfo) {
            //没有初始化，就请求所有副本
            this.sanjieDunInfo = new Laya.Dictionary;
            var askItemList: C57029_1[] = [];
            for (let i = 23001; i <= data.DunNo; i++) {
                var item = new C57029_1;
                item.DunNo = i;
                askItemList.push(item);
            }
            this.protocol.send57029(askItemList);
        } else {
            for (let i = 23001; i <= data.DunNo; i++) {
                var nowData = this.getSanjieDunInfo(i);
                if (!nowData) {
                    this.protocol.askSenjieDunnoInfo(i);
                }
            }
        }
        this.event(SBossEvent.SANJIE_COPY_INFO);
    }
    public on57029(data: S57029) {
        for (let i = 0; i < data.item_2.length; i++) {
            const element = data.item_2[i];
            var cacheData = this.getSanjieDunInfo(element.DunNo);
            if (!cacheData) {
                this.sanjieDunInfo.set(element.DunNo, element);
            } else {
                cacheData.DunNo = element.DunNo;
                cacheData.state = element.state;
                cacheData.times = element.times;
                cacheData.pass = element.pass;
                cacheData.RwdState = element.RwdState;
            }
        }
        this.event(SBossEvent.SANJIE_COPY_INFO);
    }
    public on57031(data: S57031) {
        var cacheData = this.getSanjieDunInfo(data.DunNo);
        cacheData.RwdState = 3;
        this.event(SBossEvent.SANJIE_COPY_INFO);
    }

    public getSanjieDunInfo(DunNo: number): S57029_2 {
        if (!this.sanjieDunInfo) {
            return null;
        }
        return this.sanjieDunInfo.get(DunNo);
    }

    public getMaxNoPassIndex(): number {
        for (let i = 0; i < this.sanjieDunInfo.values.length; i++) {
            const element: S57029_2 = this.sanjieDunInfo.get(23001 + i);
            if (element.pass == 1) {
                continue;
            } else {
                return i;
            }
        }
        return this.sanjieDunInfo.values.length;
    }
    public getMaxCanFightIndex(): number {
        for (let i = 0; i < this.sanjieDunInfo.values.length; i++) {
            const element: S57029_2 = this.sanjieDunInfo.get(23001 + i);
            if (element.times > 0) {
                continue;
            } else {
                return i;
            }
        }
        return this.sanjieDunInfo.values.length;
    }
    public getMaxCanFightDunNo(): number {
        var maxNum = 23001;
        for (let i = 0; i < this.sanjieDunInfo.values.length; i++) {
            const element: S57029_2 = this.sanjieDunInfo.get(23001 + i);
            if (element.times > 0) {
                maxNum = element.DunNo + 1;
                continue;
            } else {
                return element.DunNo;
            }
        }
        return maxNum;
    }

    //勇闯天宫相关处理==================================================================================
    public chuangTiangongChapInfo: S57032;//勇闯天宫，最大信息
    public chuangTiangongInfo: Laya.Dictionary;//勇闯天宫数据
    public on57032(data: S57032) {
        this.chuangTiangongChapInfo = data;
        if (!this.chuangTiangongInfo) {
            //没有初始化，就请求所有副本
            this.chuangTiangongInfo = new Laya.Dictionary;
            var askItemList: C57033_1[] = [];
            for (let i = 25001; i <= data.DunNo; i++) {
                var item = new C57033_1;
                item.DunNo = i;
                askItemList.push(item);
            }
            this.protocol.send57033(askItemList);
        } else {
            for (let i = 25001; i <= data.DunNo; i++) {
                var nowData = this.getChuangTiangongInfo(i);
                if (!nowData) {
                    this.protocol.askChuangTiangongInfo(i);
                }
            }
        }
        this.event(SBossEvent.CHUANGTIANGONG_INFO);
    }
    public on57033(data: S57033) {
        for (let i = 0; i < data.item_2.length; i++) {
            const element = data.item_2[i];
            var cacheData = this.getChuangTiangongInfo(element.DunNo);
            if (!cacheData) {
                this.chuangTiangongInfo.set(element.DunNo, element);
            } else {
                cacheData.DunNo = element.DunNo;
                cacheData.state = element.state;
                cacheData.times = element.times;
                cacheData.pass = element.pass;
                cacheData.RwdState = element.RwdState;
            }
        }
        this.event(SBossEvent.CHUANGTIANGONG_INFO);
    }
    public on57035(data: S57035) {
        var cacheData = this.getChuangTiangongInfo(data.DunNo);
        cacheData.RwdState = 3;
        this.event(SBossEvent.CHUANGTIANGONG_INFO);
    }

    public getChuangTiangongInfo(DunNo: number): S57033_2 {
        if (!this.chuangTiangongInfo) {
            return null;
        }
        return this.chuangTiangongInfo.get(DunNo);
    }

    public getCTGMaxNoPassIndex(): number {
        for (let i = 0; i < this.chuangTiangongInfo.values.length; i++) {
            const element: S57033_2 = this.chuangTiangongInfo.get(25001 + i);
            if (element.pass == 1) {
                continue;
            } else {
                return i;
            }
        }
        return this.chuangTiangongInfo.values.length;
    }
    public getCTGMaxCanFightIndex(): number {
        for (let i = 0; i < this.chuangTiangongInfo.values.length; i++) {
            const element: S57033_2 = this.chuangTiangongInfo.get(25001 + i);
            if (element.times > 0) {
                continue;
            } else {
                return i;
            }
        }
        return this.chuangTiangongInfo.values.length;
    }
    public getCTGMaxCanFightDunNo(): number {
        var maxNum = 25001;
        for (let i = 0; i < this.chuangTiangongInfo.values.length; i++) {
            const element: S57033_2 = this.chuangTiangongInfo.get(25001 + i);
            if (element.times > 0) {
                maxNum = element.DunNo + 1;
                continue;
            } else {
                return element.DunNo;
            }
        }
        return maxNum;
    }

    //无尽试炼相关处理==================================================================================

    public askIngWJSSId: number = 0;
    public on16009(data: S16009): void {
        if (data.SkipWave > 1) {
            UIManager.instance.openUI(UIID.WUJINSHILIAN_ENTER_PANEL, [data]);
        } else {
            CommonControl.instance.EnterThreeCopy(this.askIngWJSSId);
        }

    }

}


export enum SBossEvent {
    SUPER_BOSS_INFO = "SUPER_BOSS_INFO",//至尊BOSS基本信息
    SANJIE_COPY_INFO = "SANJIE_COPY_INFO",//三界副本基本信息
    CHUANGTIANGONG_INFO = "CHUANGTIANGONG_INFO",//勇闯天宫基本信息
}