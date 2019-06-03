import { ChatUtil } from "../ui/view/chat/ChatUtil";

export class HtmlUtils {
    constructor() {

    }

    public static creatHtml(x: number, y: number, w: number, size: number = 18, color: string = "#ffffff", leading: number = 6, align: string = "left", valign: string = "top"): Laya.HTMLDivElement {
        var txt: Laya.HTMLDivElement = new Laya.HTMLDivElement();
        txt.mouseEnabled = false;
        txt.width = w;
        txt.x = x;
        txt.y = y;
        txt.style.valign = valign;
        txt.style.align = align;
        txt.color = color;
        txt.style.fontSize = size;
        txt.style.leading = leading;
        txt.style.wordWrap = true;
        return txt;
    }

    public static setHtml(style: Laya.CSSStyle, leading: any = 6, size: number = 16, align: any = "left", valign: any = "top"): void {
        if (window && window.navigator && window.navigator.userAgent.indexOf("iPhone") > -1) {
            // style.font = size + "px 黑体-简";
            style.font = size + "px 黑体";
        }
        else {
            style.font = size + "px 黑体";
        }
        style.fontSize = size;
        style.align = align;
        style.valign = valign;
        style.leading = leading;
    }

    public static addColor(str: string, color: string, size: any = 24, fontName: string = "黑体", herf: string = ""): string {
        var her: string;
        var fontHead: string = "<span ";
        if (herf) {
            her = "href='" + herf + "' "
        }
        else {
            her = "";
        }
        var fontStyle: string = "style='";
        var fontColor: string = "color:" + color + ";";
        var topStlye: string = "valign:top;";
        var fontSize: string = "font-size:" + size + "px;";
        var fontFamily: string;
        if (window && window.navigator && window.navigator.userAgent.indexOf("iPhone") > -1) {
            // fontFamily = "font-family:" + fontName + "-简";
            fontFamily = "font-family:" + fontName + "";
        }
        else {
            fontFamily = "font-family:" + fontName + "";
        }
        var fontClose: string = "'>";
        var fontEnd: string = "</span>";
        var font: string = fontHead + her + fontStyle + fontColor + topStlye + fontSize + fontFamily + fontClose + str + fontEnd;
        return font;
    }

    public static addImage(str: string, w: number = 24, h: number = 23): string {
        var newStr: string;
        var imgHead: string = "<img src='";
        var imgSrc: string = str + ".png'";
        var imgStyle: string = " style='vertical-align:middle;";
        var imgW: string = w > 0 ? ("width:" + w + "px;") : "";
        var imgH: string = h > 0 ? ("height:" + h + "px;") : "";
        var imgClose: string = "'>";
        var imgEnd: string = "</img>";
        newStr = imgHead + imgSrc + imgStyle + imgW + imgH + imgClose + imgEnd;
        return newStr;
    }

    public static addImage2(str: string): string {
        var newStr: string;
        var imgHead: string = "<img src='";
        var imgSrc: string = str + ".png'";
        var imgStyle: string = " style='vertical-align:middle;";
        var imgClose: string = "'>";
        var imgEnd: string = "</img>";
        newStr = imgHead + imgSrc + imgStyle + imgClose + imgEnd;
        return newStr;
    }

    public static showReplaceTips(str: string): string {
        var newStr: string = "";
        if (str.indexOf("#") != -1) {
            var list: Array<any> = str.split("#");
            for (let idx = 0; idx < list.length; idx++) {
                var element: string = list[idx];
                var char = element.charAt(0);
                if (char >= 'a' && char <= 'z') {
                    var color: string = "#" + element.substr(0, 6);
                    var content: string = element.substr(6, element.length + 1);
                    var a: string = HtmlUtils.addColor(content, color, 20);
                    newStr += a;
                }
                else {
                    newStr += element;
                }
            }
        }
        return newStr ? newStr : str;
    }

    public static showColorStr(str: string, size: number = 20): string {
        return ChatUtil.replaceColorTips(str, size);
    }

    public static getColor(quality: number): string {
        var color: string
        switch (quality) {
            case 1:
                color = "#ffffff";//白色
                break;
            case 2:
                color = "#04a30a";//绿色
                break;
            case 3:
                color = "#00fff0";//蓝色
                break;
            case 4:
                color = "#c518c5";//紫色
                break;
            case 5:
                color = "#e29301";//橙色
                break;
            case 6:
                color = "#ff0000";//红色
                break;
            default:
                color = "#ffffff";
                break;
        }
        return color;
    }

    //深底使用额TIPS
    public static getTipsColor(quality: number): string {
        if (quality == 2) {
            return "#11ff00";
        } else if (quality == 4) {
            return "#f40df4";
        } else {
            return this.getColor(quality);
        }
    }
}