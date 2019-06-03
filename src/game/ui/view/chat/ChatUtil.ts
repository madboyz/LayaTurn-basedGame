import { GoodsVo } from "../../../../db/sheet/vo/GoodsVo";
import { STeamData } from "../../../team/STeamData";
import { HtmlUtils } from "../../../utils/HtmlUtils";
import { ChatCellData } from "./data/ChatCellData";
import { SPetData } from "../../../../net/data/SPetData";
import { SOtherPlayerData } from "../otherPlayer/data/SOtherPlayerData";
import { ToolTipsManager } from "../../manager/ToolTipsManager";
import { ItemData } from "../../compent/data/ItemData";
import { ToolTipsOtherEquipment } from "../otherPlayer/comp/ToolTipsOtherEquipment";
import { CommonControl } from "../../../common/control/CommonControl";

export class ChatUtil {
    constructor() {

    }

    public static openUI(type: string): void {
        switch (type) {
            case "Team":
                UIManager.instance.openUI(UIID.SYS_TEAM);//打开组队面板
                break;
            default:
                break;
        }
    }

    public static Event(type: string, param: any[]): void {
        switch (type) {
            case "joinTeam":
                //TODO加入队伍
                if (param[4]) {
                    try {
                        var leaderId = parseInt(param[4]);
                        STeamData.instance.protocol.JoinTeam(leaderId);
                    }
                    catch (e) {

                    }

                }
                break;
            case "showpet":
                if (param[2]) {
                    var petId = parseInt(param[2]);
                    SOtherPlayerData.instance.showOtherPet = true;
                    SOtherPlayerData.instance.protocol.send17028(petId);
                }
                break;
            case "showcomate":
                if (param[2]) {
                    var petId = parseInt(param[2]);
                    SOtherPlayerData.instance.showOtherComate = true;
                    SOtherPlayerData.instance.protocol.send37034(petId);
                }
                break;
            case "showequip":
                if (param[2]) {
                    var equipId = parseInt(param[2]);
                    SOtherPlayerData.instance.showOtherEquip = true;
                    CommonControl.instance.send15001(equipId);
                }
                break;
            default:
                break;
        }
    }

    private static startPos: number = 0;
    private static currentPos: number = 0;
    private static tempPos: number = 0;
    /**
     * 解析聊天数据
     * @static
     * @param {Array<ChatCellData>} arr
     * @param {string} msg
     * @memberof ChatUtil
     */
    public static getCellDatasByAnalyzeRumor(arr: Array<ChatCellData>, msg: string): void {
        var paramArray: Array<any>;
        this.startPos = 0;
        this.currentPos = 0;
        var tempPos2 = 0;
        //解析
        while (this.currentPos < msg.length - 17) {
            //查找标签
            this.currentPos = msg.indexOf("<MsgObj>", this.currentPos);
            tempPos2 = this.currentPos + 8;
            if (this.currentPos < 0) {
                break;
            }
            paramArray = [];
            this.tempPos = msg.indexOf("</MsgObj>", tempPos2);
            if (this.tempPos < 0) {
                break;
            }
            var strValue: string = msg.substring(tempPos2, this.tempPos);
            if (strValue.length < 0) {
                this.currentPos = this.tempPos + 9;
                continue;
            }
            paramArray = strValue.split(",");
            var strLabelName: string = paramArray.shift();
            this.handerOpenView(strLabelName, arr, paramArray, msg);
        }
    }

    private static handerOpenView(lable: string, all: Array<ChatCellData>, paramArray: Array<any>, msg: string): void {

        if (paramArray.length < 2) {
            this.currentPos = this.tempPos + 9;
            return;
        }
        var chatCellData: ChatCellData;
        var chatCellData2: ChatCellData;
        var fuc: string = lable;
        var type: string = paramArray[0];
        var text: string = paramArray[1];
        var color: string = paramArray[2] || "#00ff00";

        if (this.currentPos > this.startPos) {
            var txt = msg.substring(this.startPos, this.currentPos);
            chatCellData = Laya.Pool.getItemByClass("cellData", ChatCellData);
            chatCellData.type = "common";
            chatCellData.msg = this.replaceColorTips(msg.substring(this.startPos, this.currentPos));
            all.push(chatCellData);
        }

        chatCellData2 = Laya.Pool.getItemByClass("cellData", ChatCellData);
        chatCellData2.type = "link";
        chatCellData2.msg = HtmlUtils.addColor(text, color, 20, "黑体", fuc + ":" + type);
        chatCellData2.data = type; //数据
        all.push(chatCellData2);

        this.startPos = this.tempPos + 9;
        this.currentPos = this.startPos;
    }

    public static replaceColorTips(str: string, size: number = 20): string {
        var newStr: string = "";
        if (str.indexOf("#") != -1) {
            var list: Array<any> = str.split("#");
            for (let idx = 0; idx < list.length; idx++) {
                var element = list[idx];
                if (element != "") {
                    var color: string = "#" + element.substr(0, 6);
                    var content: string = element.substr(6, element.length + 1);
                    var a: string = HtmlUtils.addColor(content, color, size);
                    newStr += a;
                }
            }
        }
        return newStr != "" ? newStr : str;
    }

    public static getReplaceTips(str: string, arr: Array<any>): string {
        var rex: RegExp;
        var newStr: string = "";
        if (str.indexOf("item") != -1) {
            var vo: GoodsVo;
            var nextVo: GoodsVo;
            var itemStr: string = "";
            var color: string;
            for (let index = 0; index < arr.length; index++) {
                const element = arr[index];
                vo = GoodsVo.get(element.Value);
                if (arr[index + 1]) {
                    nextVo = GoodsVo.get(arr[index + 1].Value);
                }
                else {
                    nextVo = null;
                }
                if (vo && vo.no) {
                    color = HtmlUtils.getColor(vo.quality);
                    if (nextVo && nextVo.no) {
                        itemStr += (color + vo.name + "、")
                    }
                    else {
                        itemStr += (color + vo.name + ".")
                    }
                }
            }
            rex = /\[(.+?)\]/;//替换【】内的内容
            str = str.replace(rex, itemStr);
        }
        else {
            if (arr) {
                for (let index = 0; index < arr.length; index++) {
                    var element = arr[index];
                    rex = /\[(.+?)\]/;//替换【】内的内容
                    str = str.replace(rex, element.Value);
                }
            }
        }
        if (str.indexOf("#") != -1) {
            var list: Array<any> = str.split("#");
            for (let idx = 0; idx < list.length; idx++) {
                var element = list[idx];
                if (element != "") {
                    var color: string = "#" + element.substr(0, 6);
                    var content: string = element.substr(6, element.length + 1);
                    var a: string = HtmlUtils.addColor(content, color, 20);
                    newStr += a;
                }
            }
        } else {
            newStr += str;
        }
        return newStr;
    }

    public static NoticeReplace(str: string, arr: Array<any>): string {
        var newStr: string = "";
        if (str.indexOf("#") != -1) {
            var list: Array<any> = str.split("#");
            for (let idx = 0; idx < list.length; idx++) {
                var element = list[idx];
                if (element != "") {
                    var color: string = "#" + element.substr(0, 6);
                    var content: string = element.substr(6, element.length + 1);
                    //进行替换
                    if (content.indexOf("item") != -1) {
                        var vo: GoodsVo;
                        var color: string;
                        vo = GoodsVo.get(arr[2].Value);
                        var quality = vo.quality;
                        if (vo.type == GoodsType.EQUIP) {
                            quality = parseInt(arr[3].Value);
                        }
                        color = HtmlUtils.getColor(quality);
                        var itemStr = vo.name;
                        var a: string = HtmlUtils.addColor(itemStr + (arr[4].Value > 1 ? "x" + arr[4].Value : ""), color, 20, "黑体", "itemClick:" +
                            "[" + arr[2].Value + "," + arr[3].Value + "," + arr[4].Value + "]");
                    } else if (content.indexOf("player") != -1) {
                        content = content.replace("[player]", arr[0].Value);
                        var a: string = HtmlUtils.addColor(content, color, 20);
                    } else {
                        var a: string = HtmlUtils.addColor(content, color, 20);
                    }
                    newStr += a;
                }
            }
        } else {
            newStr += str;
        }
        return newStr;
    }

    public static getEmoSubStr(index: number): string {
        if (index > 999) {
            return index + "";
        } else if (index > 99) {
            return "0" + index;
        } else if (index > 9) {
            return "00" + index;
        } else {
            return "000" + index;
        }
    }

}