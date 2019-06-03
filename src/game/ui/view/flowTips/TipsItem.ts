import { HtmlUtils } from "../../../utils/HtmlUtils";

export class TipsItem extends Laya.Sprite {

	public _textField: Laya.HTMLDivElement;
	public _skin: Laya.Image
	constructor() {
		super();
		this.init();
	}

	private init(): void {
		this._skin = new Laya.Image();
		this._skin.sizeGrid = "0,0,0,0";
		this._skin.height = 34;
		this._skin.y = -7;
		this._skin.skin = ResUtils.getCompUIUrl("img_di39");
		this.addChild(this._skin);

		this._textField = new Laya.HTMLDivElement();
		HtmlUtils.setHtml(this._textField.style, 6, 20, "center", "middle");
		this._textField.width = 300;
		this._textField._height = 24;
		this._textField.color = "#fffc00";
		this._textField.x = 0;
		this._textField.style.wordWrap = false;
		this.addChild(this._textField);
	}

    /**
     * 显示 
     * @param str
     * @param type
     * 
     */
	public updateData(str: string, color = "#fffc00"): void {
		try {
			this._textField.innerHTML = str;
		}
		catch (e) { }
		this._textField.alpha = 1;

		this._textField.color = color;
		this._skin.width = this._textField.contextWidth + 150;
		this._textField.width = this._skin.width;
		this._textField.x = (this._skin.width - this._textField.width) >> 1;

		this.x = (Laya.stage.width - this._skin.width) >> 1;
	}

    /**
     * 销毁 
     * 
     */
	public dispose(): void {
		this._textField.removeSelf();
		this._skin.removeSelf();
		this.removeSelf();
	}
}