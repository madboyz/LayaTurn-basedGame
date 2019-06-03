import { GoodsVo } from "../../../../../db/sheet/vo/GoodsVo";
import { DataManager } from "../../../../../message/manager/DataManager";
import { S31100, S31100_1, S31101 } from "../../../../../net/pt/pt_31";
import { PetChoujiangProtocol } from "../protocol/PetChoujiangProtocol";

export class SPetChoujiangData extends Laya.EventDispatcher {
    private static _instance: SPetChoujiangData;
    public protocol: PetChoujiangProtocol;

    public static get instance(): SPetChoujiangData {
        return SPetChoujiangData._instance || (SPetChoujiangData._instance = new SPetChoujiangData());
    }
    constructor() {
        super();
        this.protocol = new PetChoujiangProtocol;
    }

    public unRegisterEvent() {
        DataManager.cancel(PROTOCOL.E31100, this, this.on31100);
        DataManager.cancel(PROTOCOL.E31101, this, this.on31101);
    }

    public registerEvent() {
        DataManager.listen(PROTOCOL.E31100, this, this.on31100);
        DataManager.listen(PROTOCOL.E31101, this, this.on31101);
    }

    public getPanelInfo(type: number): S31100 {
        return this["panelInfo_" + type];
    }
    public getChoujiangTimes(type: number): number {
        return this["choujiangTimes_" + type];
    }
    public getChoujiangInfo(type: number): S31101 {
        return this["choujiangInfo_" + type];
    }

    public panelInfo_1: S31100;
    public panelInfo_2: S31100;
    public choujiangTimes_1: number = 0;//已经抽过多少次
    public choujiangTimes_2: number = 0;//已经抽过多少次

    public on31100(data: S31100): void {
        var panelInfo = data;
        //--------------以下整理位置
        panelInfo.item_1.sort((a: S31100_1, b: S31100_1): any => {
            var aQuilit = GoodsVo.get(a.gid).quality;
            var bQuilit = GoodsVo.get(b.gid).quality;
            if (aQuilit != bQuilit) {
                return bQuilit - aQuilit;
            }
            if (b.num != a.num) {
                return b.num - a.num;
            }
            return b.no - a.no;
        });
        //------------------
        var choujiangTimes = 0;
        for (let i = 0; i < panelInfo.item_1.length; i++) {
            var item: S31100_1 = panelInfo.item_1[i];
            if (item.get_flag == 1) {
                choujiangTimes += 1;
            }
        }
        if (data.act_id == 1) {
            this.panelInfo_1 = panelInfo;
            this.choujiangTimes_1 = choujiangTimes;
        } else if (data.act_id == 2) {
            this.panelInfo_2 = panelInfo;
            this.choujiangTimes_2 = choujiangTimes;
        }
        this.event(SPetChoujiangEvent.ANS_PANEL_INFO);
    }

    public choujiangInfo_1: S31101;
    public choujiangInfo_2: S31101;
    public on31101(data: S31101): void {
        var choujiangInfo = data;
        if (data.act_id == 1) {
            this.choujiangInfo_1 = choujiangInfo;
        } else if (data.act_id == 2) {
            this.choujiangInfo_2 = choujiangInfo;
        }
        this.event(SPetChoujiangEvent.ANS_CHOUJIANG);
    }
    public getRewardIndex(type: number): number {
        if (type == 1) {
            var panelInfo = this.panelInfo_1;
            var choujiangInfo = this.choujiangInfo_1;
        } else if (type == 2) {
            var panelInfo = this.panelInfo_2;
            var choujiangInfo = this.choujiangInfo_2;
        }
        for (let i = 0; i < panelInfo.item_1.length; i++) {
            var element = panelInfo.item_1[i];
            if (element.no == choujiangInfo.no) {
                return i;
            }
        }
    }

}


export enum SPetChoujiangEvent {
    ANS_PANEL_INFO = "ans_panel_info",
    ANS_CHOUJIANG = "ans_choujiang",
}