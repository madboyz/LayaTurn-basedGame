//import { MarqueeManager } from './../../../manager/MarqueeManager';
import { FliterManager } from './../../../manager/FliterManager';
import { TabBar } from './../../../compent/TabBar';
import { SChatEvent, SChatData } from './../../../../../net/data/SChatData';
import { GameUtils } from './../../../../utils/GameUtils';
import { ChatLine } from './ChatLine';
import { ModuleType } from '../../../compent/data/ModuleType';
import { ChatInfo } from '../../../compent/data/ChatInfo';
import { MsgManager } from '../../../manager/MsgManager';
import { RedDotManager } from '../../../../redDot/RedDotManager';
import { RedDotType } from '../../../../redDot/RedDotList';
import { Debug } from '../../../../../debug/Debug';
import { SRoleData } from '../../../../../net/data/SRoleData';
import { ChatUtil } from '../ChatUtil';
export class ChatPanel extends ui.main.ChatPanlUI {
    private mTab: TabBar;
    private chatLineArr: Array<any> = [];
    private msgTotalHeight: number = 0;
    private curType: number = 1;//当前频道
    private oldStr: string;
    private noti: Notice = new Notice();
    private timeList: Array<number> = [0, 0, 0];
    private cdList: Array<number> = [5000, 15000, 5000];
    constructor() {
        super();
        this.layer = UILEVEL.POP_1_1;
        this.sameLevelEliminate = false;
        this.mResouce = [
            { url: "res/atlas/chatEmotion.atlas", type: Laya.Loader.ATLAS },
        ];
    }

    public initComp() {
        super.initComp();
        this.centerX = this.centerY = NaN;
        this.initPanel();
        this.width = Laya.stage.width;
        this.msgPanel.mouseThrough = true;
        this.msgPanel._childs.forEach((value: any, index: number, arr: Array<any>) => {
            // value.mouseThrough = true;
        });
        this.btn_0.text.wordWrap = this.btn_1.text.wordWrap = this.btn_2.text.wordWrap = true;
        ModuleType.Pack.btn = this.btn_bag;
        this.showState();
    }

    public showState(): void {
        if (GameUtils.curBigState) {
            this.height = 435;
            this.btn_2.visible = true;
            this.btn_big.rotation = 90, this.btn_big.centerX = 40,//this.btn_big.x = 309,
                this.btn_big.y = 0;
            this.img_Bg.x = 0, this.img_Bg.y = 11, this.img_Bg.height = 435;
            this.msgPanel.y = 25, this.msgPanel.height = 353;
            this.btn_2.height = 125, this.btn_2.y = 22;
            this.btn_1.height = 125, this.btn_1.y = 140;
            this.btn_0.height = 125, this.btn_0.y = 258;
            this.btn_bag.y = 414, this.img_txtBg.y = 406, this.txt_input.y = 407, this.btn_look.y = 420, this.btn_send.y = 420;
            this.img_bagFull.y = 374;
            // this.btn_up.visible = false;
        }
        else {
            this.height = 214;
            this.btn_2.visible = false;
            this.btn_big.rotation = -90, this.btn_big.centerX = 0,//this.btn_big.x = 271,
                this.btn_big.y = 57;
            this.img_Bg.x = 0, this.img_Bg.y = 43, this.img_Bg.height = 188;
            this.msgPanel.y = 55, this.msgPanel.height = 118;
            this.btn_1.height = 68, this.btn_1.y = 45;
            this.btn_0.height = 68, this.btn_0.y = 108;
            this.btn_bag.y = 202, this.img_txtBg.y = 194, this.txt_input.y = 195, this.btn_look.y = 208, this.btn_send.y = 208;
            this.img_bagFull.y = 162;
            // this.btn_up.x = 20,this.btn_up.y = 33,this.btn_up.visible = true;
        }
        this.y = Laya.stage.height - 110 - this.height;
        this.noti.send(NotityData.create(NotityEvents.CHAT_STATE));
    }

    private initPanel(): void {
        this.msgPanel.vScrollBarSkin = "";
        this.msgPanel.vScrollBar.isVertical = true;
        this.msgPanel.vScrollBar.elasticBackTime = 600;
        this.msgPanel.vScrollBar.elasticDistance = 200;

        this.mTab = new TabBar([this.btn_0, this.btn_1, this.btn_2]);
        this.mTab.on(Laya.Event.CHANGE, this, this.onSelectType);
        this.mTab.select = this.curType;
        this.txt_input.text = "";
        this.txt_input.prompt = "请在此输入内容";
        this.event(SChatEvent.CHAT_REQUEST_BROADCASTIDLIST);
    }

    public update(): void {

        if (this.arg && this.arg.length > 0)
            this.txt_input.text = this.arg[0];
        else
            //进入战斗，不重置文本，暂时屏蔽，有什么问题，再处理
            // this.txt_input.text = "";
            this.showState();
        this.mTab.select = this.curType;
    }

    public msgReceive(msgObj: ChatInfo): void {
        if (msgObj.channel == this.curType || this.curType == 1) {
            var chatLine: ChatLine = Laya.Pool.getItemByClass("ChatLine", ChatLine);
            chatLine.dataSource = msgObj;
            this.msgPanel.addChild(chatLine);
            if (this.chatLineArr.length > 30) {
                var deleteChatLine: ChatLine = this.chatLineArr.shift();
                deleteChatLine.removeSelf();
                deleteChatLine.clear();
                Laya.Pool.recover("ChatLine", deleteChatLine);
                this.reChatLinePos();
            }
            chatLine.y = this.msgTotalHeight;
            this.msgTotalHeight += chatLine.height + 3;
            this.chatLineArr.push(chatLine);
            this.msgPanel.vScrollBar.max = this.msgPanel.contentHeight;
            this.msgPanel.vScrollBar.value = this.msgPanel.vScrollBar.max;
        }
    }
    private reChatLinePos(): void {
        this.msgTotalHeight = 0;
        var chatLine: ChatLine
        for (var i: number = 0, sz: number = this.chatLineArr.length; i < sz; i++) {
            chatLine = this.chatLineArr[i] as ChatLine;
            chatLine.y = this.msgTotalHeight;
            this.msgTotalHeight += chatLine.height + 5;
        }
    }

    private clearChannel(): void {
        var arr: Array<ChatLine> = this.msgPanel._childs[0]._childs;
        while (arr.length > 0) {
            //需要删除的信息
            var deleteChatLine: ChatLine = arr.shift();
            //移除自己
            deleteChatLine.removeSelf();
            deleteChatLine.clear();
        }
        this.chatLineArr.length = 0;
        this.reChatLinePos();
    }

    private set curChannel(value: number) {
        this.clearChannel();
        this.curType = value;
        var arr: Array<any> = SChatData.instance.getMsgListByType(this.curType);
        if (arr) {
            for (let index = 0; index < arr.length; index++) {
                const element = arr[index];
                this.msgReceive(element);
            }
        }
    }

    public open(...args): void {
        super.open();
        this.showRed();
    }

    public initEvent(): void {
        RedDotManager.instance.on(RedDotType.RDBag, this, this.showRed);
        RedDotManager.instance.on(RedDotType.RDBagFull, this, this.showRed);
        SChatData.instance.on(SChatEvent.ADD_AN_EMOTION, this, this.addAnEmotion);//新增一条聊天
        SChatData.instance.on(SChatEvent.START_SENDBTN_COOL, this, this.sendBtnGray);//聊天按钮灰

        this.txt_input.on(Laya.Event.INPUT, this, this.onChange);
        this.btn_send.on(Laya.Event.CLICK, this, this.onSendMsg);
        this.btn_bag.on(Laya.Event.CLICK, this, this.onOpenBag);
        this.btn_big.on(Laya.Event.CLICK, this, this.changeState);
        this.btn_look.on(Laya.Event.CLICK, this, this.onBtn_lookClick);
        // this.btn_up.on(Laya.Event.CLICK,this,this.onShowGuid);
        this.on(Laya.Event.KEY_DOWN, this, this.keyDown);
    }
    public removeEvent(): void {
        RedDotManager.instance.off(RedDotType.RDBag, this, this.showRed);
        RedDotManager.instance.off(RedDotType.RDBagFull, this, this.showRed);
        SChatData.instance.off(SChatEvent.ADD_AN_EMOTION, this, this.addAnEmotion);//新增一条聊天
        SChatData.instance.off(SChatEvent.START_SENDBTN_COOL, this, this.sendBtnGray);//聊天按钮灰

        this.txt_input.off(Laya.Event.INPUT, this, this.onChange);
        this.btn_send.off(Laya.Event.CLICK, this, this.onSendMsg);
        this.mTab.off(Laya.Event.CHANGE, this, this.onSelectType);
        this.off(Laya.Event.KEY_DOWN, this, this.keyDown);
        this.btn_bag.off(Laya.Event.CLICK, this, this.onOpenBag);
        this.btn_big.off(Laya.Event.CLICK, this, this.changeState);
        this.btn_look.off(Laya.Event.CLICK, this, this.onBtn_lookClick);
        // this.btn_up.off(Laya.Event.CLICK,this,this.onShowGuid);
        this.off(Laya.Event.KEY_DOWN, this, this.keyDown);
    }

    private showRed(): void {
        var bagRed = RedDotManager.instance.GetRD(RedDotType.RDBag)._isActiveSave;
        var bagFullRed = RedDotManager.instance.GetRD(RedDotType.RDBagFull)._isActiveSave;

        this.img_bagFull.visible = bagFullRed;
        this.btn_bag.refreshRed(bagFullRed ? false : bagRed);
    }

    private onSendMsg(): void {
        if (this.txt_input.text == "") return;
        Debug.serverLog(this.txt_input.text);
        GameConfig.GetClientGM(this.txt_input.text);

        // MarqueeManager.instance.showMsg(this.txt_input.text);
        this.event(SChatEvent.CHAT_REQUEST_SENDMSG, [[this.txt_input.text, this.curType]]);
        this.txt_input.text = "";
        this.oldStr = "";
        this.timeList[this.curType] = Date.now();
        // if (!GameConfig.GAME_DEBUG) 策划不要屏蔽，要灰
        // this.btn_send.startCoolDown();
    }

    private sendBtnGray(cdTime:number):void{
        this.btn_send.initCD(cdTime, "发送");
        this.btn_send.startCoolDown();
    }

    private keyDown(e: any): void {
        if (e.keyCode == Laya.Keyboard.ENTER) {
            if (this.btn_send.gray == false) {
                this.onSendMsg();
            }
            else {
                MsgManager.instance.showRollTipsMsg("你输入太快,请稍后再试！");
            }
        }
    }

    private onOpenBag(): void {
        UIManager.instance.openUI(UIID.SYS_BAG);
    }

    private changeState(): void {
        GameUtils.curBigState = !GameUtils.curBigState;
        this.showState();
    }

    private onShowGuid(): void {
        MsgManager.instance.showRollTipsMsg("功能暂未开放！");
    }

    public onBtn_lookClick(): void {
        UIManager.instance.openUI(UIID.CHAT_EMOTION_PANEL);
    }

    private onChange(): void {
        if (GameUtils.byteLenght(this.txt_input.text) < 100)//判断字符串字符长度
        {
            this.txt_input.text = FliterManager.instance.getFilterStr(this.txt_input.text);
            this.oldStr = this.txt_input.text;

        }
        else {
            this.txt_input.text = this.oldStr;
        }
    }

    private addAnEmotion(emotionId: number): void {
        this.txt_input.text += ("##" + (emotionId > 9 ? emotionId : "0" + emotionId) + "#");
    }

    private onSelectType(): void {
        var time: number;
        var nowTime: number;
        var leftTime: number;
        //切换状态
        var showBan: boolean = false;
        var banStr: string = "功能暂未开放!";
        var changeChannel: ChatChannel;
        var cdTime: number = 5000;
        if (this.mTab.select == 0 && SRoleData.instance.info.TeamId == 0) {
            //没有队伍
            showBan = true;
            banStr = "请先加入或创建一个队伍";
        } else if (this.mTab.select == 0 && SRoleData.instance.info.TeamId != 0) {
            changeChannel = ChatChannel.TEAM;
        } else if (this.mTab.select == 1) {
            changeChannel = ChatChannel.WORLD;
            cdTime = 15000;
        } else if (this.mTab.select == 2 && SRoleData.instance.info.GuildId == 0) {
            //没有帮派
            showBan = true;
            banStr = "请先加入一个帮派，方可使用帮派频道";
        } else if (this.mTab.select == 2 && SRoleData.instance.info.GuildId != 0) {
            changeChannel = ChatChannel.GUILD;
        }

        if (!showBan) {
            this.curChannel = changeChannel;
            time = this.timeList[changeChannel];
            this.btn_send.clearTime();
            if (time > 0) {
                nowTime = Date.now() - time;
                if (nowTime < this.cdList[changeChannel]) {
                    leftTime = this.cdList[changeChannel] - nowTime;
                    this.btn_send.initCD(leftTime, "发送");
                    this.btn_send.startCoolDown();
                }
                else {
                    this.btn_send.initCD(cdTime, "发送");
                }
            }
            else {
                this.btn_send.initCD(cdTime, "发送");
            }
        } else {
            MsgManager.instance.showRollTipsMsg(banStr);
            this.mTab.select = this.curType;
            this.btn_send.initCD(cdTime, "发送");
        }

        SChatData.instance.chatType = this.curType;
    }

    public close(): void {
        this.oldStr = "";
        this.mTab.select = -1;
        SChatData.instance.chatType = this.curType;
        super.close();

    }
}