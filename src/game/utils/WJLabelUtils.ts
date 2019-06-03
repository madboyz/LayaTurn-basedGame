export class WJLabelUtils {

    /*颜色替换的字典类型值*/
    private static replaceMap: Laya.Dictionary;
    // = { item:"#F5A221", city:"#F5A221", npc:"#F5A221", func:"#F5A221" };
    /*讲字符串里面的颜色，替换成字*/
    private static initColorMap(): void {
        this.replaceMap = new Laya.Dictionary;
        var keyObj: Object = {
            red: "E93B3B", green: "5FCC29", blue: "b2e5f1", yellow: "fa9d2f", broun: "#CEB48B",
            pink: "FF00FF", cyan: "00FFFF", black: "000000", white: "dedede", gray: "77787b", purple: "d378f6", gold: "fa9d2f", orange: "#FF9900"
        };
        var key: string;
        for (key in keyObj) {
            this.replaceMap.set(key, keyObj[key])
        }
    }

    /*
    * 输入支持类里面的色值，快捷颜色，字号(大小写都可以)；
    * 如：     我很{red:无聊}    我很{#e93b3b:无聊}   我很{#dedede_20:无聊}
    * */
    public static parseColorHTML(str: string): string {
        if (!this.replaceMap) {
            this.initColorMap();
        }
        //格式:{颜色英文:文字},例如{red:吕布}或者{Red:吕布},不区分大小写; 或者{颜色值:文字}，如{FF0000:我是红色}
        var reg: RegExp = /{#?[a-z0-9_]+:[^\\{\\}]*?}/gi;
        var arr: RegExpMatchArray = str.match(reg);
        if (arr && arr.length > 0) {
            for (var i: number = arr.length - 1; i >= 0; i--) {
                var matchedStr: string = arr[i];
                var replacedStr: string = matchedStr.substring(1, matchedStr.length - 1);
                var splitIndex: number = replacedStr.indexOf(":");
                var fontStatusStr: string = replacedStr.substr(0, splitIndex);

                var colorStr: string, sizeStr: string;
                var fontStatusArr: string[] = fontStatusStr.split("_");
                if (fontStatusArr.length > 1) {
                    colorStr = fontStatusArr[0];
                    sizeStr = fontStatusArr[1];
                } else {
                    //
                    if (/^\d{1,2}$/.test(fontStatusStr)) {
                        sizeStr = fontStatusStr;
                    } else {
                        colorStr = fontStatusStr;
                    }
                }

                // 开始构造html字符串
                var wordsStr: string = replacedStr.substr(splitIndex + 1);
                var colorHtmlPart: String = "";
                if (colorStr) {
                    var color: string = this.replaceMap.get(colorStr);
                    var rgb: string = color ? color : colorStr;
                    if (rgb.indexOf("#") == 0) rgb = rgb.substr(1);
                    //不是颜色值,则不显示颜色;
                    if (isNaN(Number("0x" + rgb))) {
                        if (Laya.Browser.window.DEBUG) {
                            throw new Error("颜色值有误(此错误仅debug模式可见):" + str);
                        }
                    } else {
                        colorHtmlPart = " color='#" + rgb + "'";
                    }
                }
                var sizeHtmlPart: String = "";
                if (sizeStr) {
                    sizeHtmlPart = " size='" + sizeStr + "'";
                }

                wordsStr = "<font" + colorHtmlPart + sizeHtmlPart + ">" + wordsStr + "</font>";
                str = str.split(matchedStr).join(wordsStr);
            }
        }
        return str;
    }

}
