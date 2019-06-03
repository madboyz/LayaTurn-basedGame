import { HtmlUtils } from './../../../../utils/HtmlUtils';
import { ChatInfo } from '../../../compent/data/ChatInfo';
import { ChatUtil } from '../ChatUtil';
import { ChatCellData } from '../data/ChatCellData';
import { Debug } from '../../../../../debug/Debug';
import { NoticeVo } from '../../../../../db/sheet/vo/NoticeVo';
import { FucManager } from '../../../manager/FucManager';
import { GoodsVo } from '../../../../../db/sheet/vo/GoodsVo';
import { ToolTipsManager } from '../../../manager/ToolTipsManager';
import { ToolTipsBaseItem } from '../../../compent/ToolTipsBaseItem';
import { ItemData } from '../../../compent/data/ItemData';
import { ToolTipsEquipment } from '../../../compent/ToolTipsEquipment';
import { Chat_emotion_cfgVo } from '../../../../../db/sheet/vo/Chat_emotion_cfgVo';
export class ChatLine extends ui.main.ChatLineUI {
    constructor() {
        super();
        this.init();
    }

    private init(): void {
        HtmlUtils.setHtml(this.txt.style, 6, 20, "left", "top");
        this.txt.width = 530;
        this.txt.color = "#ffffff";
        // this.txt['isLine'] = true;//去掉下划线标签   对应laya.html.js href方法undeline = this.line?1:0
        this.txt.on(Laya.Event.LINK, this, this.onLinkClick);
    }

    public mData: ChatInfo
    public set dataSource(data: ChatInfo) {
        if (!data) {
            this.timer.clear(this, this.loopFuc);
            return;
        }
        this.mData = data;
        this.refresh();

        this.haveEmo = this.mData.Msg.match(this.emoRe) != null;
        if (this.haveEmo) {
            this.emoLoop();
            this.timer.loop(100, this, this.loopFuc);
        } else {
            this.timer.clear(this, this.loopFuc);
        }
    }

    private refresh(): void {
        var re = new RegExp("^#[0-9a-fA-F]");
        var clientName: string = "";
        var clientInfo: string = "";
        var hrefStr: string = "";
        clientName = this.channelName + this.roleName
        if (this.mData.Msg.match(re)) {
            var all: Array<ChatCellData> = [];
            ChatUtil.getCellDatasByAnalyzeRumor(all, this.mData.Msg);
            for (let index = 0; index < all.length; index++) {
                var element = all[index];
                clientInfo += element.msg;
            }
            // clientInfo = ChatUtil.getReplaceTips(this.mData.Msg,null);
        }
        else {
            clientInfo = this.mData.Msg
            // clientInfo = HtmlUtils.addColor(this.mData.Msg, "#ffffff", 20, "黑体");
        }

        var cfg = NoticeVo.get(this.mData.NoticeVo);
        if (this.mData.channel == ChatChannel.SYSTEM && cfg && cfg.action.length > 0) {
            hrefStr = HtmlUtils.addColor("马上前往", "#11ff00", 22, "黑体", "notice:" + cfg.no);
        }

        this.txt.innerHTML = clientName + clientInfo + hrefStr;

        this.txt._height = this.txt.contextHeight + 10;
    }

    private emoLoop(): void {
        var clientName: string = "";
        var contentStr: string = this.mData.Msg;
        clientName = this.channelName + this.roleName;

        var EmoList = this.mData.Msg.match(this.emoRe);
        for (let i = 0; i < EmoList.length; i++) {
            const element = EmoList[i];
            var id = Number(element.substr(2, 2));
            var cfg = Chat_emotion_cfgVo.get(id);
            contentStr = contentStr.replace(element,
                HtmlUtils.addImage("chatEmotion/" + cfg.res + ChatUtil.getEmoSubStr((this.loopTime % cfg.total_num + 1)),22,22)
            )
        }

        this.txt.innerHTML = clientName + contentStr;

        this.txt._height = this.txt.contextHeight + 10;
    }

    public get dataSource(): ChatInfo {
        return this.mData;
    }

    public get height(): number {
        return this.txt.contextHeight + 7;
    }

    public get channelName(): string {
        var str: string;
        if (this.mData.channel == ChatChannel.WORLD && this.mData.PrivLv != 2) {
            str = HtmlUtils.addColor("[综合] ", "#87faff", 20);
        }
        else if (this.mData.channel == ChatChannel.TEAM) {
            str = HtmlUtils.addColor("[队伍] ", "#d9e109", 20);
        }
        else if (this.mData.channel == ChatChannel.GUILD) {
            str = HtmlUtils.addColor("[帮会] ", "#d9e109", 20);
        }
        else if (this.mData.channel == ChatChannel.SYSTEM) {
            str = HtmlUtils.addColor("[系统] ", "#d9e109", 20);
        } else if (this.mData.channel == ChatChannel.WORLD && this.mData.PrivLv == 2) {
            str = HtmlUtils.addColor("[GM] ", "#eee635", 20);
        }
        return str;
    }

    public get roleName(): string {
        var str: string = "";
        if (this.mData.name && this.mData.Msg.indexOf(this.mData.name) == -1) {
            str = HtmlUtils.addColor("[ ", "#ffffff", 20) + HtmlUtils.addColor(this.mData.name, "#00fff0", 20, "黑体") + HtmlUtils.addColor(" ]", "#ffffff", 20);
        }
        // HtmlUtils.addColor("【 ","#ffffff",20) + HtmlUtils.addColor(this.mData.name,"#00fff0",20) + HtmlUtils.addColor(" 】","#ffffff",20);
        return str;
    }

    /**
     * 频道类型
     * @readonly
     * @type {string}
     * @memberof ChatLine
     */
    public get chatName(): string {
        var str: string;
        switch (this.mData.PrivLv) {
            case 0:
                str = "";
                break;
            case 1:
                str = "[指导员]";
                break;
            case 2:
                str = "[GM]";
                break;
            default:
                break;
        }
        return str;
    }

    public get vipInfo(): string {
        var str: string;
        // if(this.mData.vipLvl > 0)
        // {
        //     str = "【VIP】"//this.setImageStle("VIP");没资源，暂时先用字符串
        // }
        // else
        // {
        //     str = "";
        // }
        return str;
    }

    /**
     * 设置span标签
     * @private
     * @param {string} color 颜色
     * @param {string} content  内容
     * @returns {string} 
     * @memberof ChatLineItem
     */
    public setSpanStyle(color: string, content: string): string {
        var str: string;
        // str = "<span href='11' style='color:" + color + ";'>["+content+"]</span>";
        // "<span style='color:" + color + ";'>" + content + "</span>";
        return str;
    }

    /**
     * 设置image标签
     * @private
     * @param {string} str 
     * @returns {string} 
     * @memberof ChatLineItem
     */
    public setImageStle(str: string): string {
        var str: string;
        str = "<img src='chat/" + str + ".png' style='border-top-left-radius:20px;border-bottom-right-radius:20px;border-bottom-left-radius:20px'></img>";
        return str;
    }

    public onLinkClick(e: string): void {
        var arr: Array<any>;
        arr = e.split(":");
        if (e.indexOf("openView") != -1) {
            ChatUtil.openUI(arr[1]);//打开某个界面
        }
        else if (e.indexOf("event") != -1) {
            ChatUtil.Event(arr[1], arr);//派发事件
        }
        else if (e.indexOf("notice") != -1) {
            var cfg = NoticeVo.get(arr[1]);
            FucManager.doCfgAction(cfg.action);
        }
        else if (e.indexOf("itemClick") != -1) {
            var data = JSON.parse(arr[1]);
            var itemData = new ItemData(data[0]);
            itemData.serverInfo = { Quality: data[1], Count: data[2] };
            ToolTipsManager.instance.directShow(itemData.IsEquip ? ToolTipsEquipment : ToolTipsBaseItem, itemData);
        }
        Debug.serverLog(e);
    }


    //处理表情相关问题================================================
    private emoRe = new RegExp(/##(\w+)#/g);
    private haveEmo: boolean = false;
    private loopTime: number = 0;
    public loopFuc(): void {
        this.loopTime++;
        this.emoLoop();
    }

    public clear():void{
        this.timer.clear(this, this.loopFuc);
    }

}