import { BaseLayer } from "./BaseLayer";
import { CustomizeTexture } from "../comp/CustomizeTexture";
import { HtmlUtils } from "../../../utils/HtmlUtils";

export class BubbleLayer extends BaseLayer {
    private texts = new Laya.Dictionary();
    private images = new Laya.Dictionary();
    private offsetY: number = -145;
    constructor() {
        super();
    }

    public showBubble(id: number, msg: string, x: number, y: number, msgColor: string = "#ffffff", autoRemove: boolean = true) {
        var text: Laya.Text = this.texts.get(id);
        //msg = "告诉你个秘密，宠物和伙伴重生将返还100%资源，饶我一命可好？";
        if (!text) {
            text = Laya.Pool.getItemByClass("BubbleText", Laya.Text);
            text.align = "center";
            text.valign = "middle";
            text.fontSize = 16;
            text.width = 300;
            text._height = 24;
            text.color = msgColor;
            text.wordWrap = false;
            text.text = msg;

            var image: Laya.Image = Laya.Pool.getItemByClass("BubbleImage", Laya.Image);
            image.sizeGrid = "8,14,8,15";
            image.height = 24;
            image.skin = ResUtils.getCompUIUrl("img_di");
            image.anchorX = 0.5;
            this.addChild(image);
            this.addChild(text);
            this.texts.set(id, text);
            this.images.set(id, image);
            autoRemove && (Laya.timer.once(GameConfig.BATTLE_BUBBLE_TIME, this, this.removeBubble, [id]));
            this.updatePos(id, x, y);
        }
        else {
            if (msg != text.text) {
                text.text = msg;
                Laya.timer.clear(this, this.removeBubble);
                autoRemove && (Laya.timer.once(GameConfig.BATTLE_BUBBLE_TIME, this, this.removeBubble, [id]));
                this.updatePos(id, x, y);
            }
        }
    }

    public updatePos(id: number, x: number, y: number) {
        var text: Laya.Text = this.texts.get(id);
        var image: Laya.Image = this.images.get(id);
        if (text && image) {
            image.width = text.textWidth + 10;
            text.width = text.textWidth;

            text.pivotX = text.textWidth / 2;
            text.x = x;
            image.x = x - 3;
            image.y = text.y = this.offsetY + y;
        }
    }

    public removeBubble(id: number) {
        var text: Laya.Text = this.texts.get(id);
        var image: Laya.Image = this.images.get(id);
        if (text && image) {
            text.removeSelf();
            image.removeSelf();
            Laya.Pool.recover("BubbleImage", image);
            Laya.Pool.recover("BubbleText", text);
            this.texts.remove(id);
            this.images.remove(id);
            Laya.timer.clear(this, this.removeBubble);
        }
    }

    public clear() {
        Laya.timer.clear(this, this.removeBubble);
        for (var i: number = 0; i < this.texts.values.length; i++) {
            var text = this.texts.values[i];
            text.removeSelf();
            Laya.Pool.recover("BubbleText", text);
        }


        for (var i: number = 0; i < this.images.values.length; i++) {
            var image = this.images.values[i];
            image.removeSelf();
            Laya.Pool.recover("BubbleImage", image);
        }
        this.images.clear();
        this.texts.clear();
    }
}