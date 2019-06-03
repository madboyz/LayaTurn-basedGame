import { BaseLayer } from "./BaseLayer";
import { RoleIconImage } from "./BuffLayer";

/**
 * 名字层
 * 
 * @export
 * @class NameLayer
 * @extends {BaseLayer}
 */
export class NameLayer extends BaseLayer {
    private ids: number[] = [];
    private names: NameTexture[] = [];
    public showName(id: number, name: string, x: number, y: number,color = "#fff179"): void {
        if(id == 0 || name == null) return;
        if (this.ids.indexOf(id) == -1) {
            this.ids.push(id);
            var texture: NameTexture = Laya.Pool.getItemByClass("NameTexture", NameTexture);
            texture.color = color;
            this.names.push(texture);
            texture.graphics(id, this.graphics, name, x, y);
            return;
        }
        texture = this.getNameTexture(id);
        if (!texture) return;
        texture.updatePos(x, y);
    }

    public removeName(id: number): void {
        var texture: NameTexture = this.getNameTexture(id);
        texture && texture.dispose();
        var index: number = this.ids.indexOf(id);
        index != -1 && this.ids.splice(index, 1);
        index = this.names.indexOf(texture);
        index != -1 && this.names.splice(index, 1);
    }

    public clear(): void {
        for (var i: number = 0; i < this.names.length; i++) {
            this.names[i].dispose();
        }

        this.ids.length = 0;
        this.names.length = 0;
        this.graphics.clear();
    }


    private getNameTexture(id: number): NameTexture {
        for (var i: number = 0; i < this.names.length; i++) {
            if (this.names[i].id == id) {
                return this.names[i];
            }
        }
        return null;
    }
}
class NameTexture {
    public text: string;//文本
    public x: number;
    public y: number;
    public args: any[];
    public id: number;
    public mGraphics: Laya.Graphics;
    private offsetX: number = 0;
    private offsetY: number = -165;
    public color = "#fff179";
    public buildTexture(text: string, x: number, y: number): void {
        var defaultFont: string = "18px 黑体";
        // text, x, y, font || Font.defaultFont, fillColor, borderColor, lineWidth, textAlign
        this.args = [
            text,
            x + this.offsetX,
            y + this.offsetY,
            defaultFont,
            this.color,
            // "#00ff00",//描边颜色
            // 1,   //描边像素
            "center"
        ];
    }

    public graphics(id: number, graphics: Laya.Graphics, text: string, x: number, y: number): void {
        this.buildTexture(text, x, y);
        this.mGraphics = graphics;
        this.id = id;
        // this.mGraphics._saveToCmd(Laya.Render._context._fillBorderText, this.args);//描边写法
        this.mGraphics._saveToCmd(Laya.Render._context._fillText, this.args);
    }

    public updatePos(x: number, y: number): void {
        if (!this.args) return;
        this.args[1] = x + this.offsetX;
        this.args[2] = y + this.offsetY;
    }

    public dispose(): void {
        if (!this.mGraphics.cmds) {
            this.mGraphics.clear(); 
            return;//防止报错
        }
        if (this.mGraphics.cmds.length <= 1) {//防止残留清不悼
            this.mGraphics.clear();
        }
        else {
            var index = this.mGraphics.cmds.indexOf(this.args);
            if (index != -1)
                this.mGraphics.cmds.splice(index, 1);
        }

        this.text = "";
        this.x = 0;
        this.y = 0;
        this.args = null;
        this.id = null;
        this.mGraphics = null;
        Laya.Pool.recover("NameTexture", this);
    }
}