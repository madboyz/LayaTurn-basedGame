import { ItemData } from "../compent/data/ItemData";
import { ModuleType } from "../compent/data/ModuleType";
import { GameLayer } from "../../../GameLayer";
import { FlyImage } from "../compent/FlyImage";
import { Delay } from './../../../framework/utils/Delay';

export class FlyManager {
    constructor() {

    }


    private static items: any[] = [];
    /**
     * 物品飞到背包
     * @param itemData
     * 
     */
    public static flyToBackPackByItem(itemData: ItemData, startPoint: Laya.Point = null): void {
        this.items.push([itemData, startPoint]);
        !this.isFlying && (this.fly());
    }

    private static isFlying: boolean = false;

    private static async fly() {
        var item: any = this.items.shift();
        if (!item) {
            return;
        }
        this.isFlying = true;
        var itemData: ItemData = item[0], startPoint: Laya.Point = item[1];

        if (!itemData || !itemData.serverInfo) {
            return;
        }
        var icon: any = itemData.clientInfo.icon;
        var image: FlyImage = FlyImage.createFly();
        var pointHelp: Laya.Point;
        image.skin = ResUtils.getItemIcon(icon);
        image.width = 36;
        image.height = 36;
        GameLayer.instacne.uiLayer.addChild(image);
        if (startPoint) {
            pointHelp = new Laya.Point(startPoint.x ,startPoint.y);
            image.x = startPoint.x;
            image.y = startPoint.y;
        }
        else {
            pointHelp = new Laya.Point(Laya.stage.width / 2, Laya.stage.height / 2);
            image.x = pointHelp.x;
            image.y = pointHelp.y;
        }
        this.flyToBackPack(image, pointHelp);
        // Laya.timer.once(650,image,image.recover);
        await Delay.delay(80);
        this.isFlying = false;
        this.fly();
    }

    /**
     * 图标飞到背包 
     * @param texture
     * @param startPoint
     * @param callBack
     * @param isSine
     * 
     */
    public static flyToBackPack(image: FlyImage, startPoint: Laya.Point, callBack: Function = null): void {
        var toPoint: Laya.Point = ModuleType.Pack.btnGlobalPoint;
        image.tween(new Laya.Point(image.x, image.y), new Laya.Point(20, 0), new Laya.Point(toPoint.x - 60, toPoint.y + 10), 600);
    }
}