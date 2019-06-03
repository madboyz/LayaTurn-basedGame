/**
 * ...
 * @author wangji
 * 滤镜工具;
 */
class WJFilterUtils {
    private static _instance:WJFilterUtils;
    public static get ins():WJFilterUtils{
        this._instance = this._instance || new WJFilterUtils();
        return this._instance; 
    }

    public emptyFilters: Array<any> = [];
    private grayFilter: Laya.ColorFilter = new Laya.ColorFilter([0.3086, 0.6094, 0.082, 0, 0, 0.3086, 0.6094, 0.082, 0, 0, 0.3086, 0.6094, 0.082, 0, 0, 0, 0, 0, 1, 0]);

    //道具默认的mouseOver滤镜;
    public propItemOverFilter: Laya.GlowFilter = new Laya.GlowFilter("#00FF00", 5);

    public cardItemSelectedFilter: Laya.GlowFilter = new Laya.GlowFilter("#00FF00", 20);
    //宝箱应用滤镜
    public boxFilter: Laya.GlowFilter = new Laya.GlowFilter("#00FF00", 5);

    //势力旗帜界面选中滤镜
    public HighLight: Laya.ColorFilter = new Laya.ColorFilter([1.20742, -0.18282, -0.0246, 0, 20, -0.09258, 1.11718, -0.0246, 0, 20, -0.09258, -0.18282, 1.2754, 0, 20, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1]);
    // new GlowFilter("#ffff00", 10, 0, 0)
    public YELLOW_GLOW: Laya.GlowFilter = new Laya.GlowFilter("#ffdd53", 20);

    public YELLOW_GLOW_THIN: Laya.GlowFilter = new Laya.GlowFilter("#FFDD53", 8);

    public GREEN_GLOW: Laya.GlowFilter = new Laya.GlowFilter("#00FF00", 5);

    public BLACK_GLOW: Laya.GlowFilter = new Laya.GlowFilter("#000000", 5, );

    public RED_GLOW: Laya.GlowFilter = new Laya.GlowFilter("#FF0000", 10,0,0);

    public YELLOW_STRONG_GLOW: Laya.GlowFilter = new Laya.GlowFilter("#FFDD53", 8, );

    /** 紫色颜色滤镜 **/
    public purpleColorFilter: Laya.ColorFilter = new Laya.ColorFilter([-0.45508, 2.86727, -1.41219, 0, 0, 0.12274, 0.25567, 0.62139, 0, 0, 1.68465, 0.46593, -1.15058, 0, 0, 0, 0, 0, 1, 0]);
    /** 国战傲气debuff 蓝 **/
    public debuffBlue: Laya.ColorFilter = new Laya.ColorFilter([-0.86506, 2.50343, -0.63838, 0, 0, 0.33899, 0.23978, 0.42124, 0, 0, 1.15274, 1.25219, -1.40493, 0, 0, 0, 0, 0, 1, 0]);
    /** 国战傲气debuff 紫 **/
    public debuffPurple: Laya.ColorFilter = new Laya.ColorFilter([0.85781, 1.67897, -1.53677, 0, 25, -0.19690, 0.68663, 0.51026, 0, 25, 1.37514, -0.73826, 0.36312, 0, 25, 0, 0, 0, 1, 0]);
    /** 国战傲气debuff 金 **/
    public debuffGold: Laya.ColorFilter = new Laya.ColorFilter([0.74104, -0.96860, 1.22756, 0, 75, 0.09340, 1.30247, -0.39587, 0, 75, -1.15333, 0.94843, 1.20491, 0, 75, 0, 0, 0, 1, 0]);
    /** 国战傲气debuff 红 **/
    public debuffRed: Laya.ColorFilter = new Laya.ColorFilter([1.51855, -0.45705, -0.06150, 0, 25, -0.23145, 1.29295, -0.06150, 0, 25, -0.23145, -0.45704, 1.68850, 0, 25, 0, 0, 0, 1, 0]);

    /** 按钮选中时，高亮滤镜 */
    public BTH_CHOOSE: Laya.ColorFilter = new Laya.ColorFilter([1.25, 0, 0, 0, 9.125, 0, 1.25, 0, 0, 9.125, 0, 0, 1.25, 0, 9.125, 0, 0, 0, 1, 0]);

    /** 受击时变红 */
    public beHitred: Laya.ColorFilter = new Laya.ColorFilter([1, 0, 0, 0, 0, 0.5, 0, 0, 0, 0, 0.55, 0, 0, 0, 0, 0, 0, 0, 1, 0]);


    /**
     * 获取灰度滤镜
     * @return
     */
    public getGrayFilter(): Laya.ColorFilter {
        // return WJFilterUtils.ins.grayFilter;
        return WJFilterUtils.getFiliter(-60,-60,0,0);
    }


    //=====================================调整颜色专用=====================================================================================
    private static colorMatrixArr: Array<any> = [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1];
    private static DELTA_INDEX: Array<any> = [0, 0.01, 0.02, 0.04, 0.05, 0.06, 0.07, 0.08, 0.1, 0.11, 0.12, 0.14, 0.15, 0.16, 0.17, 0.18, 0.20, 0.21, 0.22, 0.24, 0.25, 0.27, 0.28, 0.30, 0.32, 0.34, 0.36, 0.38, 0.40, 0.42, 0.44, 0.46, 0.48, 0.5, 0.53, 0.56, 0.59, 0.62, 0.65, 0.68, 0.71, 0.74, 0.77, 0.80, 0.83, 0.86, 0.89, 0.92, 0.95, 0.98, 1.0, 1.06, 1.12, 1.18, 1.24, 1.30, 1.36, 1.42, 1.48, 1.54, 1.60, 1.66, 1.72, 1.78, 1.84, 1.90, 1.96, 2.0, 2.12, 2.25, 2.37, 2.50, 2.62, 2.75, 2.87, 3.0, 3.2, 3.4, 3.6, 3.8, 4.0, 4.3, 4.7, 4.9, 5.0, 5.5, 6.0, 6.5, 6.8, 7.0, 7.3, 7.5, 7.8, 8.0, 8.4, 8.7, 9.0, 9.4, 9.6, 9.8, 10.0];

    /**
     * 调整颜色
     * @param disObj 要修改的显示对象
     * @param p_brightness 明亮度(-200 -- 200)
     * @param p_contrast 对比度(-200 -- 200)
     * @param p_saturation 饱和度(-200 -- 200)
     * @param p_hue 色调度(-200 -- 200)
     * 
     */
    public static adjustColor(disObj: laya.display.Sprite, p_brightness: number, p_contrast: number, p_saturation: number, p_hue: number): laya.display.Sprite {
        WJFilterUtils.colorMatrixArr = [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1];
        WJFilterUtils.adjustPrivateHue(p_hue);
        WJFilterUtils.adjustPrivateContrast(p_contrast);
        WJFilterUtils.adjustPrivateBrightness(p_brightness);
        WJFilterUtils.adjustPrivateSaturation(p_saturation);
        disObj.filters = [new Laya.ColorFilter(WJFilterUtils.colorMatrixArr)];
        return disObj;
    }

    public static getFiliter(p_brightness: number, p_contrast: number, p_saturation: number, p_hue: number): Laya.ColorFilter {
        WJFilterUtils.colorMatrixArr = [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1];
        WJFilterUtils.adjustPrivateHue(p_hue);
        WJFilterUtils.adjustPrivateContrast(p_contrast);
        WJFilterUtils.adjustPrivateBrightness(p_brightness);
        WJFilterUtils.adjustPrivateSaturation(p_saturation);
        return new Laya.ColorFilter(WJFilterUtils.colorMatrixArr);
    }

    private static adjustPrivateHue(p_val: number): void {
        p_val = WJFilterUtils.cleanValue(p_val, 180) / 180 * Math.PI;
        if (p_val == 0 || isNaN(p_val)) {
            return;
        }
        var cosVal: number = Math.cos(p_val);
        var sinVal: number = Math.sin(p_val);
        var lumR: number = 0.213;
        var lumG: number = 0.715;
        var lumB: number = 0.072;
        WJFilterUtils.multiplyMatrix([lumR + cosVal * (1 - lumR) + sinVal * (-lumR), lumG + cosVal * (-lumG) + sinVal * (-lumG), lumB + cosVal * (-lumB) + sinVal * (1 - lumB), 0, 0, lumR + cosVal * (-lumR) + sinVal * (0.143), lumG + cosVal * (1 - lumG) + sinVal * (0.140), lumB + cosVal * (-lumB) + sinVal * (-0.283), 0, 0, lumR + cosVal * (-lumR) + sinVal * (-(1 - lumR)), lumG + cosVal * (-lumG) + sinVal * (lumG), lumB + cosVal * (1 - lumB) + sinVal * (lumB), 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1]);
    }

    private static adjustPrivateBrightness(p_val: number): void {
        p_val = WJFilterUtils.cleanValue(p_val, 200);
        if (p_val == 0 || isNaN(p_val)) {
            return;
        }
        WJFilterUtils.multiplyMatrix([1, 0, 0, 0, p_val, 0, 1, 0, 0, p_val, 0, 0, 1, 0, p_val, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1]);
    }

    private static adjustPrivateContrast(p_val: number): void {
        p_val = WJFilterUtils.cleanValue(p_val, 200);
        if (p_val == 0 || isNaN(p_val)) {
            return;
        }
        var x: number;
        if (p_val < 0) {
            x = 127 + p_val / 200 * 127;
        } else {
            x = p_val % 1;
            if (x == 0) {
                x = WJFilterUtils.DELTA_INDEX[p_val];
            } else {
                x = WJFilterUtils.DELTA_INDEX[(p_val << 0)] * (1 - x) + WJFilterUtils.DELTA_INDEX[(p_val << 0) + 1] * x;
            }
            x = x * 127 + 127;
        }
        WJFilterUtils.multiplyMatrix([x / 127, 0, 0, 0, 0.5 * (127 - x), 0, x / 127, 0, 0, 0.5 * (127 - x), 0, 0, x / 127, 0, 0.5 * (127 - x), 0, 0, 0, 1, 0, 0, 0, 0, 0, 1]);
    }

    private static adjustPrivateSaturation(p_val: number): void {
        p_val = WJFilterUtils.cleanValue(p_val, 200);
        if (p_val == 0 || isNaN(p_val)) {
            return;
        }
        var x: number = 1 + ((p_val > 0) ? 3 * p_val / 200 : p_val / 200);
        var lumR: number = 0.3086;
        var lumG: number = 0.6094;
        var lumB: number = 0.0820;
        WJFilterUtils.multiplyMatrix([lumR * (1 - x) + x, lumG * (1 - x), lumB * (1 - x), 0, 0, lumR * (1 - x), lumG * (1 - x) + x, lumB * (1 - x), 0, 0, lumR * (1 - x), lumG * (1 - x), lumB * (1 - x) + x, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1]);
    }

    /**
     * 调整明亮度
     * 同上
     */
    public static adjustBrightness(disObj: laya.display.Sprite, p_val: number): laya.display.Sprite {
        WJFilterUtils.colorMatrixArr = [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1];
        p_val = WJFilterUtils.cleanValue(p_val, 200);
        if (p_val == 0 || isNaN(p_val)) {
            return disObj;
        }
        WJFilterUtils.multiplyMatrix([1, 0, 0, 0, p_val, 0, 1, 0, 0, p_val, 0, 0, 1, 0, p_val, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1]);
        disObj.filters = [new Laya.ColorFilter(WJFilterUtils.colorMatrixArr)];
        return disObj;
    }

    /**
     * 调整对比度
     */
    public static adjustContrast(disObj: laya.display.Sprite, p_val: number): laya.display.Sprite {
        WJFilterUtils.colorMatrixArr = [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1];
        p_val = WJFilterUtils.cleanValue(p_val, 200);
        if (p_val == 0 || isNaN(p_val)) {
            return disObj;
        }
        var x: number;
        if (p_val < 0) {
            x = 127 + p_val / 200 * 127;
        } else {
            x = p_val % 1;
            if (x == 0) {
                x = WJFilterUtils.DELTA_INDEX[p_val];
            } else {
                x = WJFilterUtils.DELTA_INDEX[(p_val << 0)] * (1 - x) + WJFilterUtils.DELTA_INDEX[(p_val << 0) + 1] * x;
            }
            x = x * 127 + 127;
        }
        WJFilterUtils.multiplyMatrix([x / 127, 0, 0, 0, 0.5 * (127 - x), 0, x / 127, 0, 0, 0.5 * (127 - x), 0, 0, x / 127, 0, 0.5 * (127 - x), 0, 0, 0, 1, 0, 0, 0, 0, 0, 1]);
        disObj.filters = [new Laya.ColorFilter(WJFilterUtils.colorMatrixArr)];
        return disObj;
    }

    /**
     * 调整饱和度
     */
    public static adjustSaturation(disObj: laya.display.Sprite, p_val: number): laya.display.Sprite {
        WJFilterUtils.colorMatrixArr = [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1];
        p_val = WJFilterUtils.cleanValue(p_val, 200);
        if (p_val == 0 || isNaN(p_val)) {
            return disObj;
        }
        var x: number = 1 + ((p_val > 0) ? 3 * p_val / 200 : p_val / 200);
        var lumR: number = 0.3086;
        var lumG: number = 0.6094;
        var lumB: number = 0.0820;
        WJFilterUtils.multiplyMatrix([lumR * (1 - x) + x, lumG * (1 - x), lumB * (1 - x), 0, 0, lumR * (1 - x), lumG * (1 - x) + x, lumB * (1 - x), 0, 0, lumR * (1 - x), lumG * (1 - x), lumB * (1 - x) + x, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1]);
        disObj.filters = [new Laya.ColorFilter(WJFilterUtils.colorMatrixArr)];
        return disObj;
    }

    /**
     * 调整色调
     */
    public static adjustHue(disObj: laya.display.Sprite, p_val: number): laya.display.Sprite {
        WJFilterUtils.colorMatrixArr = [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1];
        p_val = WJFilterUtils.cleanValue(p_val, 180) / 180 * Math.PI;
        if (p_val == 0 || isNaN(p_val)) {
            return disObj;
        }
        var cosVal: number = Math.cos(p_val);
        var sinVal: number = Math.sin(p_val);
        var lumR: number = 0.213;
        var lumG: number = 0.715;
        var lumB: number = 0.072;
        WJFilterUtils.multiplyMatrix([lumR + cosVal * (1 - lumR) + sinVal * (-lumR), lumG + cosVal * (-lumG) + sinVal * (-lumG), lumB + cosVal * (-lumB) + sinVal * (1 - lumB), 0, 0, lumR + cosVal * (-lumR) + sinVal * (0.143), lumG + cosVal * (1 - lumG) + sinVal * (0.140), lumB + cosVal * (-lumB) + sinVal * (-0.283), 0, 0, lumR + cosVal * (-lumR) + sinVal * (-(1 - lumR)), lumG + cosVal * (-lumG) + sinVal * (lumG), lumB + cosVal * (1 - lumB) + sinVal * (lumB), 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1]);
        disObj.filters = [new Laya.ColorFilter(WJFilterUtils.colorMatrixArr)];
        return disObj;
    }

    private static multiplyMatrix(p_matrix: Array<any>): void {
        var col: Array<any> = [];
        var j: number = 0;
        for (var i: number = 0; i < 5; i++) {
            for (j = 0; j < 5; j++) {
                col[j] = WJFilterUtils.colorMatrixArr[j + i * 5];
            }
            for (j = 0; j < 5; j++) {
                var val: number = 0;
                for (var k: number = 0; k < 5; k++) {
                    val += p_matrix[j + k * 5] * col[k];
                }
                WJFilterUtils.colorMatrixArr[j + i * 5] = val;
            }
        }
    }

    private static cleanValue(p_val: number, p_limit: number): number {
        return Math.min(p_limit, Math.max(-p_limit, p_val));
    }

}