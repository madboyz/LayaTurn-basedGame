

class ResUtils {
    public static CompUI_Res_Root: string = "comp/";

    public static map: string = "art/scene/map/";

    public static role: string = "art/anim/";

    public static skill: string = "art/skill/"
    public static buff_anim: string = "art/buffAnim/";

    public static buff_icon: string = "art/buffIcon/";
    public static skill_icon: string = "art/skillIcon/";

    public static Relive: string = "art/skill/reborn.json";//复活特效

    public static Call: string = "art/skill/zhaohuan.json";//召唤

    public static item: string = "art/item/";

    public static ready: string = ResUtils.skill + 'ready.json';

    public static huihe: string = "res/atlas/battle/huiheshu.atlas";

    public static daojishi: string = "res/atlas/battle/daojishi.atlas";

    public static anim:string = "art/anim/";

    public static petHead:string = "art/pet_head/";

    public static uianim:string = "art/uiAnim/"

    public static itemBase:string = "itemBase/"


    /**
     * 公共资源路径
     * @static
     * @param {any} id 
     * @returns {String} 
     * @memberof ResUtils
     */
    public static getCompUIUrl(id): string {
        return `${this.CompUI_Res_Root}${id}.png`
    }

    public static getItemBg(id): string {
        return `${this.itemBase}equipBg_${id}.png`
    }

    /**
     * 
     * @param id 专门用于Item的小图，用于减少dc的
     */    
    public static getItemBase(id): string {
        return `${this.itemBase}${id}.png`
    }

    /**
     * 
     * 地图路径配置
     * @static
     * @param {number} mapId 
     * @returns {string} 
     * 
     * @memberOf ResUtils
     */
    public static getMapConfigUrl(mapId: number): string {
        return `${this.map}${mapId}/${mapId}.json`
    }

    public static getMapSmall(mapId: number): string {
        return `${this.map}${mapId}/small.jpg`;
    }
    /**
     * 通用png 后缀要陪全路径
     * @param path 
     */
    public static getCommonPng(path:string): string {
        return `art/${path}`;
    }


    /**
     * 
     * 地图块路径
     * @static
     * @param {number} mapId 
     * @param {number} index 
     * @returns {string} 
     * 
     * @memberOf ResUtils
     */
    public static getMapUrl(mapId: number, index: number): string {
        return `${this.map}${mapId}/${mapId}_${index}.jpg`
    }

    /**
     * 获得人物的路径
     * 
     * @static
     * @param {number} id 角色ID
     * @param {string} action 角色动作
     * @param {number} path 方向，只有两个方向，0和1
     * @returns {string} 
     * 
     * 
     * @memberOf ResUtils
     */
    public static getRoleUrl(resPath: any, action: string, path: number): string {
        var s: string = path == 1 ? "bei" : "";
        return `${this.role}${resPath}/${action}${s}.json`
    }

    public static getSceneSpecialBg(res:string): string
    {
        return `art/fightmap/${res}.jpg`;
    }

    public static getUIEffect(name:string ):string {
        return `${this.uianim}${name}.json`;
    }

    public static getSkillUrl(id: string): string {
        return `${this.skill}${id}.json`;
    }

    public static getBuffAnimationUrl(res: string): string {
        return `${this.buff_anim}${res}.json`
    }

    public static getBuffIcon(res: string): string {
        return `${this.buff_icon}${res}.png`
    }

    public static getSymbolIcon(type: number): string {
        return `battle/symbol_${type}.png`;
    }

    public static getItemIcon(id: number|string): string {
        return `${this.item}${id}`;
    }

    public static getSkillIcon(icon: string): string {//不需要加.png?
        return `${this.skill_icon}${icon}`
    }

    public static getGemImage(attrName: string): string {
        switch (attrName) {
            case "crit":
                return this.getItemIcon("s_10.png");
            case "phy_def":
                return this.getItemIcon("s_11.png");
            case "mag_def":
                return this.getItemIcon("s_12.png");
            case "hp_lim":
                return this.getItemIcon("s_13.png");
            case "ten":
                return this.getItemIcon("s_14.png");
            default:
                return "";
        }
    }

    public static readonly colorMatrix:any = 
            [
                0.3086, 0.6094, 0.0820, 0, 0,  //R
                0.3086, 0.6094, 0.0820, 0, 0, //G
                0.3086, 0.6094, 0.0820, 0, 0,  //B
                0, 0, 0, 1, 0, //A
            ];

}